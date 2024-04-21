import { Box, Button, Typography } from "@mui/material";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TfiDashboard } from "react-icons/tfi";
import { MdOutlineSell } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";
import { Avatar } from "@mui/material";
import { deepOrange, deepPurple, red, blue } from "@mui/material/colors";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function SidebarNav({ setLoggedIn, username }) {
    const navigate = useNavigate();
    const [dontShow, setDontShow] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const signout = () => {
        auth.signOut().then(() => {
            setLoggedIn(false);
            navigate("/", { replace: true });
        });
    }

    return (
        <div className={`w-72 min-h-full border-r-2 border-r-gray-400 bg-[#0b2431] text-white py-3 flex flex-col`}>
            <p className={`text-2xl font-mono tracking-tighter font-semibold text-normal text-center`}>Fresh For All</p>
            <div className={`my-4 rounded-xl bg-gray-600 p-4 py-2 w-10/12 mx-auto flex items-center`}>
                <Avatar sx={{ bgcolor: blue[500] }} src={""} alt="Profile">{username.substring(0, 1).toUpperCase()}</Avatar>
                <p className={`text-lg font-mono ml-4`}>{username}</p>
            </div>
            <button onClick={() => navigate('/dashboard', { replace: true})} className={`w-full font-mono text-gray-300 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl mb-4`}><TfiDashboard size={25} className={`fill-gray-300 mr-5`} />Dashboard</button>
            <p className={`text-lg font-mono font-semibold tracking-tight text-gray-400 px-3 mb-1`}>General</p>
            <button onClick={() => navigate('/sell', { replace: true })} className={`w-full font-mono text-gray-300 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl`}><MdOutlineSell size={25} className={`fill-gray-300 mr-5`} />Sell</button>
            <button onClick={() => navigate('/buy', { replace: true })} className={`w-full font-mono text-gray-300 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl`}><IoStorefrontOutline size={25} className={`fill-gray-300 mr-5`} />Buy</button>
            <button onClick={null} className={`w-full font-mono text-gray-300 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl mb-4`}><IoCartOutline size={25} className={`fill-gray-300 mr-5`} />Cart</button>
            <p className={`text-lg font-mono font-semibold tracking-tight text-gray-400 px-3 mb-1`}>User</p>
            <button onClick={() => navigate('/settings', { replace: true })} className={`w-full font-mono text-gray-300 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl`}><IoSettingsOutline size={25} className={`fill-gray-300 mr-5`} />Settings</button>
            <button onClick={() => setModalOpen(true)} className={`w-full font-mono text-red-400 flex items-center hover:bg-gray-500 hover:bg-opacity-75 text-left px-5 py-3 text-xl`}><IoLogOutOutline size={25} className={`fill-gray-300 mr-5`} />Logout</button>
            { modalOpen && <div id="logout-modal" className={`fixed top-0 left-0 w-screen h-screen overflow-hidden flex justify-center items-center bg-opacity-85 bg-gray-800`}>
                <div className={`w-3/12 rounded-xl bg-white p-10 text-black`}>
                    <div className={`bg-red-200 w-fit bg-opacity-75 rounded-full p-4 mx-auto mb-4`}><IoLogOutOutline size={35} className={`text-red-600`} /></div>
                    <p className={`mx-auto w-11/12 font-normal text-2xl mb-4`}>Are you sure you want to log out?</p>
                    <div className={`flex items-center w-11/12 mx-auto justify-center mb-4`}>
                        <div className={`h-6 w-6 border border-black rounded-md cursor-pointer ${dontShow && `bg-black`}`} onClick={() => setDontShow(!dontShow)}>{dontShow && <IoIosCheckmark color="white" className={`h-6 w-6`} />}</div>
                        <p className={`bg-white ml-3 text-lg`}>Don't show this again</p>
                    </div>
                    <div className={`flex justify-between w-10/12 mx-auto`}>
                        <button onClick={() => setModalOpen(false)} className={`w-[48%] text-lg border border-red-400 rounded-lg px-5 py-1 text-red-400 hover:bg-red-300 hover:border-red-300 transition-all duration-200 ease-in-out hover:text-white`}>Cancel</button>
                        <button onClick={signout} className={`w-[48%] text-lg border border-red-400 bg-red-400 rounded-lg px-5 py-1 text-white hover:bg-red-300 hover:border-red-300 transition-all duration-200 ease-in-out`}>Continue</button>
                    </div>
                </div>
            </div> }
        </div>
    )
}