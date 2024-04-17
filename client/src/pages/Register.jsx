import { Box, Button, Divider, TextField, Typography, styled } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link, useResolvedPath } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
}));

export default function Register({ setLoggedIn, setName }) {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const emailPassSignIn = () => {
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            if (user) {
                console.log("Signed In!");

                const ref = doc(db, "users", user.user.uid)
                const userData = {
                    email: user.user.email,
                    firstName: fName,
                    lastName: lName,
                    username: username,
                    earnings: 0.0
                };

                setDoc(ref, userData).then(() => {
                    setName(fName + " " + lName);
                    setLoggedIn(true);
                    navigate('/dashboard', { replace: true });
                }).catch(e => {
                    console.error("Error setting doc:", e);
                });
            }
        }).catch(e => {
            console.error("Error signing in with email and password:", e);
        });
    }

    const oAuthSignIn = () => {
        signInWithPopup(auth, new GoogleAuthProvider()).then((user) => {
            if (user) {
                console.log("Signed In!");
                setDoc(doc(db, "users", user.user.uid, {
                    email: user.user.email,
                    firstName: fName,
                    lastName: lName,
                    username: user.user.displayName,
                }, { merge: true })).then(() => {
                    setName(user.user.displayName);
                    setLoggedIn(true);
                    navigate('/dashboard', { replace: true });
                });
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
                <p className={`text-4xl font-semibold`}>Join Today!</p>
                <div className={`my-2 mt-5`}>
                    <div className={`flex justify-between mt-3 mb-2`}>
                        <input className={`border-2 border-gray-300 w-[49%] px-3 text-lg py-2 focus:outline-none focus:border-blue-500 hover:border-black rounded-lg`} value={fName} onChange={e => setFName(e.target.value)} type='text' placeholder='First Name'/>
                        <input className={`border-2 border-gray-300 w-[49%] px-3 text-lg py-2 focus:outline-none focus:border-blue-500 hover:border-black rounded-lg`} value={lName} onChange={e => setLName(e.target.value)} type='text' placeholder='Last Name'/>
                    </div>
                    <input className={`border-2 border-gray-300 w-full px-3 text-lg py-2 focus:outline-none focus:border-blue-500 hover:border-black rounded-lg mt-2 mb-2`} value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email Address'/>
                    <input className={`border-2 border-gray-300 w-full px-3 text-lg py-2 focus:outline-none focus:border-blue-500 hover:border-black rounded-lg mt-2 mb-2`} value={username} onChange={e => setUsername(e.target.value)} type='text' placeholder='Username'/>
                    <input className={`border-2 border-gray-300 w-full px-3 text-lg py-2 focus:outline-none focus:border-blue-500 hover:border-black rounded-lg mt-2 mb-3`} value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Password'/>
                </div>
                <button className={`w-full px-5 py-2 bg-green-600 rounded-lg hover:bg-green-500 text-lg text-white`} onClick={emailPassSignIn}>Register</button>
                <Root>
                    <Divider sx={{ marginY: 2 }}>OR</Divider>
                </Root>
                <button className={`bg-blue-500 mb-1 hover:bg-blue-400 text-lg w-full rounded-lg px-2 py-2 flex flex-row items-center`} onClick={oAuthSignIn}><div className={`rounded-lg bg-white mr-auto`}><FcGoogle className={`m-2`} size={25}/></div><span className={`mr-auto text-white`}>Register with Google</span></button>
                <p className={`text-lg flex items-center`}>Already Have an Account?&nbsp;<p onClick={() => navigate('/login')} className={`cursor-pointer text-blue-400 hover:text-blue-300`}>Login Now!</p></p>
            </div>
        </div>
    )
}