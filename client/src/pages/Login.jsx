import { Box, Button, Divider, TextField, Typography, styled } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

export default function Login({ setLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const emailPassSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then((result) => {
            if (result) {
                console.log("Signed In!");
                console.log(auth.currentUser.displayName);
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
                console.log(auth.currentUser.displayName);
                setLoggedIn(true);
                navigate('/dashboard', { replace: true });
            }
        }).catch(e => {
            console.error("Error signing in with OAuth:", e);
        });
    }

    return (
        <Box width={`100vw`} height={`100vh`} display={`flex`} justifyContent={`center`} alignItems={`center`}>
            <Box bgcolor={`#5ebf97`} width={`50%`} height={`100%`} borderRadius={`50%`} position={`fixed`} top={-150} left={-150} zIndex={-20}></Box>
            <Box bgcolor={`#5ebf97`} width={`50%`} height={`100%`} borderRadius={`50%`} position={`fixed`} bottom={-150} right={-150} zIndex={-20}></Box>
            <Button onClick={() => navigate("/", { replace: true })} variant='contained' color='secondary' sx={{ padding: 1, position: 'fixed', top: 30, left: 30 }}><KeyboardBackspaceIcon/>&nbsp;Back</Button>
            <Box width={`25%`} boxShadow={`0 0 20px black`} bgcolor={`white`} padding={5} borderRadius={3}>
                <Typography variant='h3' fontWeight={500}>Welcome Back!</Typography>
                <Box marginY={2}>
                    <TextField value={email} onChange={e => setEmail(e.target.value)} label='Email Address' fullWidth variant='outlined' margin='normal' type='email' />
                    <TextField value={password} onChange={e => setPassword(e.target.value)} label='Password' fullWidth variant='outlined' margin='normal' type='password' />
                </Box>
                <Button variant='contained' color='success' size='large' fullWidth onClick={emailPassSignIn}>Login</Button>
                <Root>
                    <Divider sx={{ marginY: 2 }}>OR</Divider>
                </Root>
                <Button startIcon={<GoogleIcon />} variant='outlined' fullWidth size='large' onClick={oAuthSignIn}>Login with Google</Button>
                <Typography variant='subtitle1' sx={{ display: `flex`, alignItems: 'center' }} marginTop={0.5}>Don't Have an Account?&nbsp;&nbsp;<Typography onClick={() => navigate('/register')} sx={{ cursor: 'pointer', color: 'dodgerblue' }}>Join Now!</Typography></Typography>
            </Box>
        </Box>
    )
}