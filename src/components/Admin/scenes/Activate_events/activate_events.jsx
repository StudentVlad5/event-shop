import { tokens } from "theme";
import { useTheme } from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import { activate_eventsComponent } from "../../../../redux/activate_events/selectors";
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
  GridEditInputCell
} from '@mui/x-data-grid';
import uuid4 from "uuid4";
import PropTypes from 'prop-types';
import { useState } from "react";
import { deleteActiveEventData, updateActiveEventData, createActiveEventData } from 'services/APIservice';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { getActiveEvents } from '../../../../redux/activate_events/operation';
import { eventsComponent } from "../../../../redux/events/selectors";

function EditToolbar({ setRows, setRowModesModel }) {

  const handleClick = () => {
    const id = uuid4();
    setRows((oldRows) => [...oldRows, { id, date:'', name:'', time:'', language: '', language_secondary: '', language_third: '',seats:'', booking:'', price: '', location: '', address: '', status: '',isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
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

const Activate_events = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activate_events, setActivate_events] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const activeEvents = useSelector(activate_eventsComponent);
  const events = useSelector(eventsComponent);

  const validateTime = [
    "00:00", "00:30", 
    "01:00", "01:30", 
    "02:00", "02:30", 
    "03:00", "03:30", 
    "04:00", "04:30", 
    "05:00", "05:30", 
    "06:00", "06:30", 
    "07:00", "07:30", 
    "08:00", "08:30", 
    "09:00", "09:30", 
    "10:00", "10:30", 
    "11:00", "11:30", 
    "12:00", "12:30", 
    "13:00", "13:30", 
    "14:00", "14:30", 
    "15:00", "15:30", 
    "16:00", "16:30", 
    "17:00", "17:30", 
    "18:00", "18:30", 
    "19:00", "19:30", 
    "20:00", "20:30", 
    "21:00", "21:30", 
    "22:00", "22:30", 
    "23:00", "23:30", 
    "24:00", ];

    // робимо ряд з іменами івентів 
    const eventsNames = [];
    const eventsIdForNames = {};
    for(const it in events){
        eventsNames.push(events[it].ua.name);
        eventsIdForNames[events[it].article_event]=events[it].ua.name;
    }
  // =========


  const listOfActiveEvents = [];
  for (const it in activeEvents) {
     let data = {};
    data.id = activeEvents[it].article_eventID;
    data.name = eventsIdForNames[activeEvents[it].eventId];
    data.date = activeEvents[it].date;
    data.time = activeEvents[it].time;
    data.price = activeEvents[it].price;
    data.language = activeEvents[it].language;
    data.language_secondary = activeEvents[it].language_secondary;
    data.language_third = activeEvents[it].language_third;
    data.seats = activeEvents[it].seats;
    data.booking = activeEvents[it].booking;
    // data.vacancies = activeEvents[it].vacancies;
    data.location = activeEvents[it].location;
    data.address = activeEvents[it].address;
    data.status = activeEvents[it].status;
    listOfActiveEvents.push(data)
};

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, editable: false },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      cellClassName: "name-column--cell",
      editable: true,
      type: "singleSelect", 
      valueOptions: eventsNames
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",      
      editable: true,
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "singleSelect", valueOptions: validateTime,
    },
    {
      field: "language",
      headerName: "Language",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "singleSelect", valueOptions: ["Ru", "En", "Fr", "Uk"],
    },
    {
      field: "language_secondary",
      headerName: "Language secondary",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "singleSelect", valueOptions: ["Ru", "En", "Fr", "Uk"],
    },
    {
      field: "language_third",
      headerName: "Language third",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "singleSelect", valueOptions: ["Ru", "En", "Fr", "Uk"],
    },
    {
      field: "seats",
      headerName: "Seats",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "number",
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            max: 500,
            min: 0,
          }}
        />
      ),
    },
    {
      field: "booking",
      headerName: "Booking",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "number",
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            max: 500,
            min: 0,
          }}
        />
      ),
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "number",
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            max: 1000,
            min: 0,
          }}
        />
      ),
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "singleSelect", valueOptions: ["active", "blocked"],
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
  
  const [rows, setRows] = useState(listOfActiveEvents);
  const [rowModesModel, setRowModesModel] = useState({});

    async function updateData(list) {
      setIsLoading(true);
      let updateIdEvent = '';
      for (const key in eventsIdForNames){
        if(list.name === eventsIdForNames[key]){updateIdEvent = key}
      };
      list.eventId =  updateIdEvent;
      list.vacancies = list.seats - list.booking;
      try {
        const { data } = await updateActiveEventData(`/active_events/${list.id}`, list);
        dispatch(getActiveEvents({...data}));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setActivate_events(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    async function deleteData(id) {
      setIsLoading(true);
      try {
        const { data } = await deleteActiveEventData(`/active_events/${id}`);
        dispatch(getActiveEvents(data));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setActivate_events(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    async function createData(list) {
      setIsLoading(true);
      let updateIdEvent = '';
      for (const key in eventsIdForNames){
        if(list.name === eventsIdForNames[key]){updateIdEvent = key}
      };
      list.eventId =  updateIdEvent;
      list.vacancies = list.seats - list.booking;
      try {
        const { data } = await createActiveEventData(`/active_events`, list);
        dispatch(getActiveEvents({...data}));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setActivate_events(data);
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

export default Activate_events