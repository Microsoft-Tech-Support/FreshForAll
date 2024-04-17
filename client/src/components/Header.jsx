import { Avatar, Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import LogoutIcon from '@mui/icons-material/Logout';
import { deepOrange, deepPurple, red } from "@mui/material/colors";

export default function Header({ setLoggedIn, username }) {
    const location = useLocation();
    const navigate = useNavigate();

    const { h, f, pathname } = location;
    
    const signout = () => {
        auth.signOut().then(() => {
            setLoggedIn(false);
            navigate("/", { replace: true });
        });
    }

    return (
        <Box height={`5vh`} borderBottom={`3px solid darkgray`} width={`100%`} paddingY={1} bgcolor={`#0b2431`} color={`white`}>
            <Box width={`95%`} marginX={`auto`} display={`flex`} alignItems={`center`}>
                <Typography variant="h4" fontWeight={500}>{pathname.split("/")[1].substring(0, 1).toUpperCase() + pathname.split("/")[1].substring(1)}</Typography>
                <Avatar sx={{ marginLeft: 'auto', width: 36, height: 36, marginRight: 1, bgcolor: deepOrange[500] }} src={auth.currentUser.photoURL}>{username.substring(0, 1).toUpperCase()}</Avatar>
                <Typography variant="h6" fontWeight={500} marginRight={3}>{username}</Typography>
                <LogoutIcon sx={{ color: red[500], fontSize: 30, ":hover": { color: red[400] }, cursor: "pointer" }} onClick={signout} />
            </Box>
        </Box>
    )
}