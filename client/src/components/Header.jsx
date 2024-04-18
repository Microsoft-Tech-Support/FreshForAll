import { Avatar, Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import LogoutIcon from '@mui/icons-material/Logout';
import { deepOrange, deepPurple, red } from "@mui/material/colors";

export default function Header({ setLoggedIn, username }) {
    const location = useLocation();

    const { h, f, pathname } = location;

    return (
        <div className={`h-14 border-b-2 border-b-gray-400 w-full py-3 px-10 bg-[#0b2431] text-white flex justify-center items-center`}>
            <p className={`text-3xl font-semibold font-mono`}>{pathname.split("/")[1].substring(0, 1).toUpperCase() + pathname.split("/")[1].substring(1)}</p>
            <Avatar sx={{ marginLeft: 'auto', width: 36, height: 36, marginRight: 1, bgcolor: deepOrange[500] }} src={auth.currentUser.photoURL}>{username.substring(0, 1).toUpperCase()}</Avatar>
            <p className={`text-xl font-mono tracking-tight font-semibold`}>{username}</p>
        </div>
    )
}