import { tokens } from "theme";
import { useTheme } from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import { specialistsComponent } from "../../../../redux/specialists/selectors";
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
import { updateSpecialistData, createSpecialistData, deleteSpecialistData, createImg } from 'services/APIservice';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { getSpecialists } from '../../../../redux/specialists/operation';
import { BASE_URL_IMG } from "helpers/constants";
import default_user_img from "images/defaultUserPhoto.jpg";

function EditToolbar({ setRows, setRowModesModel }) {

  const handleClick = () => {
    const id = uuid4();
    setRows((oldRows) => [...oldRows, { id, nameFr: '', nameUa: '',nameRu: '',  email: '', phone: '', status: '', descriptionFr: '', descriptionUa: '',descriptionRu: '', image:'', isNew: true }]);
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


const Specialists = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
//   const [specialists, setSpecialists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const specialists = useSelector(specialistsComponent);


  const listOfSpecialists = [];
  for (const it in specialists) {
    let data = {};
    data.id = specialists[it].specialistId;
    data.email = specialists[it].email;
    data.phone = specialists[it].phone;
    data.status = specialists[it].status;
    data.image = specialists[it].image;
    data.rating = specialists[it].rating;
    data.nameFr = specialists[it].fr.name;
    data.nameUa = specialists[it].ua.name;
    data.nameRu = specialists[it].ru.name;
    data.descriptionFr = specialists[it].fr.description;
    data.descriptionUa = specialists[it].ua.description;
    data.descriptionRu = specialists[it].ru.description;
    listOfSpecialists.push(data)};



    async function sendImg(e) {
      console.log('image', e.target.files[0]);
      console.log('image', e.target.dataset.info);
      const file = e.target.files[0];
      const body = {id : e.target.dataset.info};
      setIsLoading(true);
      try {
        const { data } = await createImg(`/specialists/${e.target.dataset.info}`, body, file);
        dispatch(getSpecialists({...data}));
        const listOfSpecialists = [];
        for (const it in specialists) {
          let perem = {};
          perem.id = data[it].specialistId;
          perem.email = data[it].email;
          perem.phone = data[it].phone;
          perem.status = data[it].status;
          perem.image = data[it].image;
          perem.rating = data[it].rating;
          perem.nameFr = data[it].fr.name;
          perem.nameUa = data[it].ua.name;
          perem.nameRu = data[it].ru.name;
          perem.descriptionFr = data[it].fr.description;
          perem.descriptionUa = data[it].ua.description;
          perem.descriptionRu = data[it].ru.description;
          listOfSpecialists.push(perem)};
          setRows(listOfSpecialists);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

  const columns = [
    { field: "id", headerName: "ID", editable: false },
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
    { field: "email", headerName: "Email", flex: 0.5, editable: true },
    { field: "phone", headerName: "Phone", flex: 0.5, editable: true },
    { field: "status", headerName: "Status", flex: 0.5, editable: true, type: "singleSelect", valueOptions: ["active", "blocked"],},
    { field: "rating", headerName: "Rating", flex: 0.5, editable: true, type: "singleSelect", valueOptions: ["1", "2", "3", "4", "5","6", "7", "8", "9", "10"], },
    {
      field: "descriptionFr",
      headerName: "Description FR",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true
    },
    {
      field: "descriptionUa",
      headerName: "Description UA",
      flex: 1,
      cellClassName: "name-column--cell",      
      editable: true
    },
    {
      field: "descriptionRu",
      headerName: "Description RU",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      dialogSize: "large",
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
    { field: "image", headerName: "Image", editable: false,
    renderCell: (params) => <><label htmlFor={params.id}><img className="specialistAvatar" src={(params.value === undefined || params.value === "") ? default_user_img : BASE_URL_IMG + 'avatars/' + params.value.split('/')[params.value.split('/').length - 1]} /></label><input className="inputSpecialistAvatar" type="file" id={params.id} name={params.id} data-info={params.id} accept="image/png, image/jpeg, image/jpg, image/webp, image/.gif" onChange ={(e) => sendImg(e)}/></>, cellClassName: 'img-app-theme--cell'},
  ];
  
  const [rows, setRows] = useState(listOfSpecialists);
  const [rowModesModel, setRowModesModel] = useState({});

    async function updateData(list) {
      setIsLoading(true);
      try {
        const { data } = await updateSpecialistData(`/specialists/${list.id}`, list);
        dispatch(getSpecialists({...data}));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    async function deleteData(id) {
      setIsLoading(true);
      try {
        const { data } = await deleteSpecialistData(`/specialists/${id}`);
        dispatch(getSpecialists(data));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    async function createData(list) {
      setIsLoading(true);
      try {
        const { data } = await createSpecialistData(`/specialists`, list);
        dispatch(getSpecialists({...data}));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
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
    console.log("newRow",newRow);
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

export default Specialists;