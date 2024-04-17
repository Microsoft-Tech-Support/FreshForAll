import { Box, Button, Divider, TextField, Typography, styled } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
}));

export default function Login({ setLoggedIn, setName }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const emailPassSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then((result) => {
            if (result) {
                console.log("Signed In!");
                getDoc(doc(db, "users", result.user.uid)).then((snapshot) => {
                    console.log(snapshot.data());
                    setName(snapshot.data()["firstName"] + " " + snapshot.data()["lastName"]);
                });
                setLoggedIn(true);
                navigate('/dashboard', { replace: true });
            }
        }).catch(e => {
            console.error("Error signing in with email and password:", e);
        });
    }

    const oAuthSignIn = () => {
        signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
            if (result) {
                console.log("Signed In!");
                setName(result.user.displayName);
                setLoggedIn(true);
                navigate('/dashboard', { replace: true });
            }
        }).catch(e => {
            console.error("Error signing in with OAuth:", e);
        });
    }

    return (
        <div className={`w-screen h-screen flex justify-center items-center`}>
            <div className={`w-[900px] bg-[#5ebf97] h-[900px] rounded-full fixed -top-60 -left-60 -z-20`}></div>
            <div className={`w-[900px] bg-[#5ebf97] h-[900px] rounded-full fixed -bottom-40 -right-40 -z-20`}></div>
            <button className={`bg-black font-medium text-white p-2 px-3 fixed top-10 left-10 hover:bg-opacity-80 rounded-lg`} onClick={() => navigate("/", { replace: true })}><KeyboardBackspaceIcon/>&nbsp;Back</button>
            <div className={`shadow-xl w-2/6 bg-white rounded-xl p-7 border-2 border-gray-300`}>
                <p className={`text-4xl font-semibold`}>Welcome Back!</p>
                <div className={`my-2`}>
                    <input className={`border-2 border-gray-300 w-full px-3 text-lg py-2 focus:outline-none focus:border-blue-500 hover:border-black rounded-lg mt-3 mb-2`} value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email Address'/>
                    <input className={`border-2 border-gray-300 w-full px-3 text-lg py-2 focus:outline-none focus:border-blue-500 hover:border-black rounded-lg mt-2 mb-3`} value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Password'/>
                </div>
                <button className={`w-full px-5 py-2 bg-green-600 rounded-lg hover:bg-green-500 text-lg text-white`} onClick={emailPassSignIn}>Login</button>
                <Root>
                    <Divider sx={{ marginY: 2 }}>OR</Divider>
                </Root>
                <button className={`bg-blue-500 mb-1 hover:bg-blue-400 text-lg w-full rounded-lg px-2 py-2 flex flex-row items-center`} onClick={oAuthSignIn}><div className={`rounded-lg bg-white mr-auto`}><FcGoogle className={`m-2`} size={25}/></div><span className={`mr-auto text-white`}>Login with Google</span></button>
                <p className={`text-lg flex items-center`}>Don't Have an Account?&nbsp;<p onClick={() => navigate('/register')} className={`cursor-pointer text-blue-400 hover:text-blue-300`}>Join Now!</p></p>
            </div>
        </div>
    )
}