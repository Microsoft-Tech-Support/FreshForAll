import { Box, Button, Typography } from "@mui/material";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TfiDashboard } from "react-icons/tfi";
import { MdOutlineSell } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

export default function SidebarNav({ setLoggedIn }) {
    const navigate = useNavigate();

    const signout = () => {
        auth.signOut().then(() => {
            setLoggedIn(false);
            navigate("/", { replace: true });
        });
    }

    return (
        <div className={`w-72 min-h-full border-r-2 border-r-gray-400 bg-[#0b2431] text-white py-3 flex flex-col`}>
            <p className={`text-2xl font-mono tracking-tighter font-semibold text-normal mb-4 text-center`}>Fresh For All</p>
            <button onClick={() => navigate('/dashboard', { replace: true})} className={`w-full font-mono text-gray-300 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl mb-4`}><TfiDashboard size={25} className={`fill-gray-300 mr-5`} />Dashboard</button>
            <p className={`text-lg font-mono font-semibold tracking-tight text-gray-400 px-3 mb-1`}>General</p>
            <button onClick={() => navigate('/sell', { replace: true })} className={`w-full font-mono text-gray-300 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl`}><MdOutlineSell size={25} className={`fill-gray-300 mr-5`} />Sell</button>
            <button onClick={() => navigate('/buy', { replace: true })} className={`w-full font-mono text-gray-300 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl mb-4`}><IoStorefrontOutline size={25} className={`fill-gray-300 mr-5`} />Buy</button>
            <p className={`text-lg font-mono font-semibold tracking-tight text-gray-400 px-3 mb-1`}>User</p>
            <button onClick={() => navigate('/settings', { replace: true })} className={`w-full font-mono text-gray-300 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl`}><IoSettingsOutline size={25} className={`fill-gray-300 mr-5`} />Settings</button>
            <button onClick={signout} className={`w-full font-mono text-red-400 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl`}><IoLogOutOutline size={25} className={`fill-gray-300 mr-5`} />Logout</button>
        </div>
    )
}