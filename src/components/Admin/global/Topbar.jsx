
import { Box, IconButton} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useDispatch } from 'react-redux';
import { logOut } from "../../../redux/auth/operations";



const Topbar = () => {
    const dispatch = useDispatch();
    return <Box display="flex" justifyContent="end" p={2}>
  
        {/* ICONS */}
        <Box display="flex">
        <IconButton>
            <NotificationsOutlinedIcon/>
        </IconButton>
        <IconButton>
            <SettingsOutlinedIcon/>
        </IconButton>
        <IconButton onClick={()=>{ dispatch(logOut());}}>
            <PersonOutlinedIcon/>
        </IconButton>
        </Box>
    </Box>
}

export default Topbar