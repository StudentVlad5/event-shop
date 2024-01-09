
import { Box, IconButton} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useDispatch } from 'react-redux';
import { logOut } from "../../../redux/auth/operations";
import PropTypes from 'prop-types';


const Topbar = ({orders, active_events}) => {
    const dispatch = useDispatch();

        // робимо ряд з новими замовленнями
        let ordersNewList = [];
        for(const it in orders){
        if(orders[it].status === "new") {ordersNewList.push(orders[it])}
        }

    return <Box display="flex" justifyContent="end" p={2}>
        {/* ICONS */}
        <Box display="flex">
        <IconButton>
            <NotificationsOutlinedIcon/>
            <p>{ordersNewList.length}</p>
        </IconButton>
        <IconButton>
            <SettingsOutlinedIcon/>
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
};