import { tokens } from "theme";
import { useTheme } from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
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
import { updateEventData, createEventData, deleteEventData, createImg } from 'services/APIservice';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { BASE_URL_IMG } from "helpers/constants";
import default_user_img from "images/No-image-available.webp";
import { getEvents } from "../../../../redux/events/slice";
import { eventsComponent } from "../../../../redux/events/selectors";
import { specialistsComponent } from "../../../../redux/specialists/selectors";
import { categoryComponent } from "../../../../redux/category/selectors";

function EditToolbar({ setRows, setRowModesModel }) {

  const handleClick = () => {
    const id = uuid4();
    setRows((oldRows) => [...oldRows, { id, nameFr: '', nameUa: '',nameRu: '',  specialistName: '', categoryName: '', categoryName_second: '', categoryName_third: '', duration: '', rating: '', descriptionFr: '', descriptionUa: '', descriptionRu: '', image:'', image_1:'', image_2:'', isNew: true }]);
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


const Events = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const events = useSelector(eventsComponent);
  const specialists = useSelector(specialistsComponent);
  const categories = useSelector(categoryComponent);

  // робимо ряд з іменами спеціалістів
  const specialistsNames = [];
  const specialistsIdForNames = {};
  for(const it in specialists){
    specialistsNames.push(specialists[it].ua.name);
    specialistsIdForNames[specialists[it].specialistId]=specialists[it].ua.name;
  }
// ========================>>>>>>>>>>>>>>>>>>>>>>>>
  // робимо ряд з іменами категорій
  const categoriesNames = [];
  const categoriesIdForNames = {};
  for(const it in categories){
    categoriesNames.push(categories[it].ua.title);
    categoriesIdForNames[categories[it].categoryId]=categories[it].ua.title;
  }
// ========================>>>>>>>>>>>>>>>>>>>>>>>>
  const listOfEvents = [];
  for (const it in events) {
    let data = {};
    events[it].article_event ? data.id = events[it].article_event : data.id = "";
    specialistsIdForNames[events[it].specialistId] ? data.specialistName = specialistsIdForNames[events[it].specialistId] : data.specialistName = "";
    categoriesIdForNames[events[it].category] ? data.categoryName = categoriesIdForNames[events[it].category] : data.categoryName = "";
    categoriesIdForNames[events[it].category_second] ? data.categoryName_second = categoriesIdForNames[events[it].category_second] : data.categoryName_second = "";
    categoriesIdForNames[events[it].category_third] ? data.categoryName_third = categoriesIdForNames[events[it].category_third] : data.categoryName_third = "";
    events[it].duration ? data.duration = events[it].duration : data.duration = "";
    events[it].image ? data.image = events[it].image : data.image= "";
    events[it].image_1 ? data.image_1 = events[it].image_1 : data.image_1= "";
    events[it].image_2 ? data.image_2 = events[it].image_2 : data.image_2 = "";
    events[it].rating ? data.rating = events[it].rating : data.rating = "";
    events[it].fr?.name ? data.nameFr = events[it].fr.name : data.nameFr = "";
    events[it].ua?.name ? data.nameUa = events[it].ua.name : data.nameUa = "";
    events[it].ru?.name ? data.nameRu = events[it].ru.name : data.nameRu = "";
    events[it].fr?.description ? data.descriptionFr = events[it].fr.description : data.descriptionFr = "";
    events[it].ua?.description ? data.descriptionUa = events[it].ua.description : data.descriptionUa = "";
    events[it].ru?.description ? data.descriptionRu = events[it].ru.description : data.descriptionRu = "";
    listOfEvents.push(data)};

    async function sendImg(e) {
      const file = e.target.files[0];
      const body = {name : e.target.dataset.name};
      if (file.type !== "image/png" && file.type !=="image/jpeg" && file.type !=="image/jpg" && file.type !=="image/webp" && file.type !=="image/.gif") {
        onFetchError("File does not support. You must use .png, .jpeg .webp .gif  or .jpg ");
          return false;
       }
       if (file.size > 500000) {
        onFetchError("Please upload a file smaller than 5 MB");
         return false;
       }
      setIsLoading(true);
      try {
        const { data } = await createImg(`/events/${e.target.dataset.info}`, body, file);
        dispatch(getEvents({...data}));
        const listOfEvents = [];
        for (const it in events) {
          let perem = {};
          data[it].article_event ? perem.id = data[it].article_event : perem.id= "";
          specialistsIdForNames[data[it].specialistId] ? perem.specialistName = specialistsIdForNames[data[it].specialistId] : perem.specialistName = "";
          categoriesIdForNames[data[it].category] ? perem.categoryName = categoriesIdForNames[data[it].category] : perem.categoryName = "";
          data[it].duration ? perem.duration = data[it].duration : perem.duration = "";
          data[it].image ? perem.image = data[it].image : perem.image ="";
          data[it].image_1 ? perem.image_1 = data[it].image_1 : perem.image_1 = "";
          data[it].image_2 ? perem.image_2 = data[it].image_2 : perem.image_2 = "";
          data[it].rating ? perem.rating = data[it].rating : perem.rating = "";
          data[it].fr.name ? perem.nameFr = data[it].fr.name : perem.nameFr = "";
          data[it].ua.name ? perem.nameUa = data[it].ua.name : perem.nameUa = "";
          data[it].ru.name ? perem.nameRu = data[it].ru.name : perem.nameRu = "";
          data[it].fr.description ? perem.descriptionFr = data[it].fr.description : perem.descriptionFr = "";
          data[it].ua.description ? perem.descriptionUa = data[it].ua.description : perem.descriptionUa = "";
          data[it].ru.description ? perem.descriptionRu = data[it].ru.description : perem.descriptionRu = "";
          listOfEvents.push(perem)};
          setRows(listOfEvents);
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
    { field: "specialistName", headerName: "Specialist Name", flex: 0.5, editable: true, type: "singleSelect", valueOptions: specialistsNames},
    { field: "categoryName", headerName: "Category", flex: 0.5, editable: true,type: "singleSelect", valueOptions: categoriesNames },
    { field: "categoryName_second", headerName: "Category 2", flex: 0.5, editable: true,type: "singleSelect", valueOptions: categoriesNames },
    { field: "categoryName_third", headerName: "Category 3", flex: 0.5, editable: true,type: "singleSelect", valueOptions: categoriesNames },
    { field: "duration", headerName: "Duration", flex: 0.5, editable: true },
    { field: "rating", headerName: "Rating", flex: 0.5, editable: true, type: "singleSelect", valueOptions: [1, 2, 3, 4, 5,6, 7, 8, 9, 10] },
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
    renderCell: (params) => <><label htmlFor={params.id}><img className="eventAvatar" src={(params.value === undefined || params.value === "") ? default_user_img : BASE_URL_IMG + params.value.split('/')[params.value.split('/').length - 1]} /></label><input className="inputEventAvatar" type="file" id={params.id} name={params.id} data-info={params.id} data-name="image" accept="image/png, image/jpeg, image/jpg, image/webp, image/.gif" onChange ={(e) => sendImg(e)}/></>, cellClassName: 'img-app-theme--cell'},
    { field: "image_1", headerName: "Image", editable: false,
    renderCell: (params) => <><label htmlFor={params.id + '1'}><img className="eventAvatar" src={(params.value === undefined || params.value === "") ? default_user_img : BASE_URL_IMG + params.value.split('/')[params.value.split('/').length - 1]} /></label><input className="inputEventAvatar" type="file" id={params.id  + '1'} name={params.id} data-info={params.id} data-name="image_1" accept="image/png, image/jpeg, image/jpg, image/webp, image/.gif" onChange ={(e) => sendImg(e)}/></>, cellClassName: 'img-app-theme--cell'},
    { field: "image_2", headerName: "Image", editable: false,
    renderCell: (params) => <><label htmlFor={params.id + '2'}><img className="eventAvatar" src={(params.value === undefined || params.value === "") ? default_user_img : BASE_URL_IMG + params.value.split('/')[params.value.split('/').length - 1]} /></label><input className="inputEventAvatar" type="file" id={params.id  + '2'} name={params.id} data-info={params.id} data-name="image_2" accept="image/png, image/jpeg, image/jpg, image/webp, image/.gif" onChange ={(e) => sendImg(e)}/></>, cellClassName: 'img-app-theme--cell'},
  ];
  
  const [rows, setRows] = useState(listOfEvents);
  const [rowModesModel, setRowModesModel] = useState({});

    async function updateData(list) {
      let updateIdSpecialist = '';
      for (const key in specialistsIdForNames){
        if(list.specialistName === specialistsIdForNames[key]){updateIdSpecialist = key}
      };
      list.specialistId =  updateIdSpecialist;

      let updateIdCategory = '';
      for (const key in categoriesIdForNames){
        if(list.categoryName === categoriesIdForNames[key]){updateIdCategory = key}
      };
      list.category =  updateIdCategory;

      let updateIdCategory2 = '';
      for (const key in categoriesIdForNames){
        if(list.categoryName_second === categoriesIdForNames[key]){updateIdCategory2 = key}
      };
      list.category_second =  updateIdCategory2;
      
      let updateIdCategory3 = '';
      for (const key in categoriesIdForNames){
        if(list.categoryName_third === categoriesIdForNames[key]){updateIdCategory3 = key}
      };
      list.category_third =  updateIdCategory3;

      setIsLoading(true);
      try {
        const { data } = await updateEventData(`/events/${list.id}`, list);
        dispatch(getEvents({...data}));
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
        const { data } = await deleteEventData(`/events/${id}`);
        dispatch(getEvents(data));
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
        let updateIdSpecialist = '';
        for (const key in specialistsIdForNames){
          if(list.specialistName === specialistsIdForNames[key]){updateIdSpecialist = key}
        };
        list.specialistId =  updateIdSpecialist;


        let updateIdCategory = '';
        for (const key in categoriesIdForNames){
          if(list.categoryName === categoriesIdForNames[key]){updateIdCategory = key}
        };
        list.category =  updateIdCategory;

        let updateIdCategory2 = '';
        for (const key in categoriesIdForNames){
          if(list.categoryName_second === categoriesIdForNames[key]){updateIdCategory2 = key}
        };
        list.category_second =  updateIdCategory2;
        
        let updateIdCategory3 = '';
        for (const key in categoriesIdForNames){
          if(list.categoryName_third === categoriesIdForNames[key]){updateIdCategory3 = key}
        };
        list.category_third =  updateIdCategory3;

      setIsLoading(true);
      try {
        const { data } = await createEventData(`/events`, list);
        dispatch(getEvents({...data}));
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
          '& .MuiDataGrid-row':{
            '&:hover': {
                backgroundColor: colors.primary[900],
                cursor: "pointer",
                }
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

export default Events;