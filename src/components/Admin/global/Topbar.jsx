
import { Box, IconButton} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch } from 'react-redux';
import { logOut } from "../../../redux/auth/operations";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


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
            <Link to="messages">
            <IconButton onClick={(e)=>{document.querySelector(".messages")?.click()}}>
                    <EmailIcon/>
                    <p>{messagesNewList.length}</p>
            </IconButton>
        </Link>
        <Link to="orders">
            <IconButton onClick={(e)=>{document.querySelector(".orders")?.click()}}>
                <NotificationsOutlinedIcon/>
                <p>{ordersNewList.length}</p>
            </IconButton>
        </Link>
        <Link to="activate_events">
            <IconButton onClick={(e)=>{document.querySelector(".activate_events")?.click()}}>
                <EventAvailableIcon/>
                <p>{active_events.length}</p>
            </IconButton>
        </Link>
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