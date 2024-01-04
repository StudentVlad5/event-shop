
import { tokens } from "theme";
import { useTheme } from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import { categoryComponent } from "../../../../redux/category/selectors";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import uuid4 from "uuid4";
import PropTypes from 'prop-types';
import { useState } from "react";
import { createCategoryData, updateCategoryData, deleteCategoryData } from 'services/APIservice';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { getCategory, addCategory, deleteCategory } from '../../../../redux/category/operation';

function EditToolbar({ setRows, setRowModesModel }) {

  const handleClick = () => {
    const id = uuid4();
    setRows((oldRows) => [...oldRows, { id, nameFr: '',  nameUa: '', nameRu: '',isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nameFr' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
    setRows: PropTypes.any.isRequired,
    setRowModesModel: PropTypes.any.isRequired,
};


const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const categories = useSelector(categoryComponent);
  const listOfCategories = [];
  for (const it in categories) {
    let data = {};
    data.id = categories[it].categoryId;
    data.nameFr = categories[it].fr.title;
    data.nameUa = categories[it].ua.title;
    data.nameRu = categories[it].ru.title;
    listOfCategories.push(data)};

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, editable: false },
    {
      field: "nameFr",
      headerName: "Name FR",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true
    },
    {
      field: "nameUa",
      headerName: "Name UA",
      flex: 1,
      cellClassName: "name-column--cell",      
      editable: true
    },
    {
      field: "nameRu",
      headerName: "Name RU",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  
  const [rows, setRows] = useState(listOfCategories);
  const [rowModesModel, setRowModesModel] = useState({});

    async function updateData(list) {
      setIsLoading(true);
      try {
        const { data } = await updateCategoryData(`/categories/${list.id}`, list);
        dispatch(getCategory({...data}));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setCategory(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    async function deleteData(id) {
      setIsLoading(true);
      try {
        const { data } = await deleteCategoryData(`/categories/${id}`);
        dispatch(deleteCategory(data));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        // setCategory(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    async function createData(list) {
      setIsLoading(true);
      try {
        const { data } = await createCategoryData(`/categories`, list);
        dispatch(addCategory({...data}));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        // setCategory(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
   };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    deleteData(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    if(newRow.isNew){createData(newRow)} else {updateData(newRow)};
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <Box m="20px" width="100%">
      {isLoading ? onLoading() : onLoaded()}
      {error && onFetchError('Whoops, something went wrong')}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          />
      </Box>
    </Box>
  );
};

export default Categories;