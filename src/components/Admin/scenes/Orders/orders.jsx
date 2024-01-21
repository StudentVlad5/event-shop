import { tokens } from "theme";
import { useTheme } from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridEditInputCell
} from '@mui/x-data-grid';
import { useState } from "react";
import { updateOrderData, deleteOrderData } from 'services/APIservice';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { eventsComponent } from "../../../../redux/events/selectors";
import { ordersComponent } from "../../../../redux/orders/selectors";
import { getOrders } from "../../../../redux/orders/operation";

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const ordersList = useSelector(ordersComponent);
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

  const listOfOrders = [];
  for (const it in ordersList) {
    let data = {};
    data.id = ordersList[it]._id;
    data.eventId = ordersList[it].eventId;
    data.activeEventID = ordersList[it].activeEventID;
    data.event_Name = eventsIdForNames[ordersList[it].eventId];
    data.date = ordersList[it].date;
    data.time = ordersList[it].time;
    data.userName = ordersList[it].userName;
    data.userEmail = ordersList[it].userEmail;
    data.bookingSeats = ordersList[it].bookingSeats;
    data.priceTotal = ordersList[it].priceTotal;
    data.status = ordersList[it].status;
    listOfOrders.push(data)
};

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, editable: false },
    { field: "eventId", headerName: "Event Id", flex: 0.5, editable: false },
    { field: "activeEventID", headerName: "Active EventID", width: 10, editable: false },
    {
      field: "event_Name",
      headerName: "Event Name",
      width: 200,
      cellClassName: "name-column--cell",
      editable: false
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",      
      editable: false,
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: false,
      type: "singleSelect", valueOptions: validateTime,
    },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "userEmail",
      headerName: "User Email",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "bookingSeats",
      headerName: "Booking Seats",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "number",
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            max: 100,
            min: 0,
          }}
        />
      ),
    },
    {
      field: "priceTotal",
      headerName: "Total sum",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "number",
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            max: 10000,
            min: 0,
          }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      type: "singleSelect", 
      valueOptions: ["new", "accept", "reject"]
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
  
  const [rows, setRows] = useState(listOfOrders);
  const [rowModesModel, setRowModesModel] = useState({});

    async function updateData(list) {
      try {
        const { data } = await updateOrderData(`/orders/${list.id}`, list);
        dispatch(getOrders({...data}));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setOrders(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    async function deleteData(id) {
      setIsLoading(true);
      try {
        const { data } = await deleteOrderData(`/orders/${id}`);
        dispatch(getOrders(data));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setOrders(data);
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
          />
      </Box>
    </Box>
  );
};

export default Orders