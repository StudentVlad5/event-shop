
import { Box, IconButton} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch } from 'react-redux';
import { logOut } from "../../../redux/auth/operations";
import PropTypes from 'prop-types';


const Topbar = ({orders, active_events, messages}) => {
    const dispatch = useDispatch();

        // робимо ряд з новими замовленнями
        let ordersNewList = [];
        for(const it in orders){
        if(orders[it].status === "new") {ordersNewList.push(orders[it])}
        }
        // робимо ряд з новими листами
        let messagesNewList = [];
        for(const it in messages){
        if(messages[it].status === "new") {messagesNewList.push(messages[it])}
        }

    return <Box display="flex" justifyContent="end" p={2}>
        {/* ICONS */}
        <Box display="flex">
        <IconButton>
            <EmailIcon/>
            <p>{messagesNewList.length}</p>
        </IconButton>
        <IconButton>
            <NotificationsOutlinedIcon/>
            <p>{ordersNewList.length}</p>
        </IconButton>
        <IconButton>
            <EventAvailableIcon/>
            <p>{active_events.length}</p>
        </IconButton>
        <IconButton onClick={()=>{ dispatch(logOut());}}>
            <PersonOutlinedIcon/>
        </IconButton>
        </Box>
    </Box>
}

export default Topbar

Topbar.propTypes = {
    orders: PropTypes.any.isRequired,
    active_events: PropTypes.any.isRequired,
    messages: PropTypes.any.isRequired,
};