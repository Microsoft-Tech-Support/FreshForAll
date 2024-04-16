import { Button, Typography, ImageList, ImageListItem, Card, CardHeader, CardMedia, CardContent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import produce from '../assets/Fresh-Produce-Collage.jpg';
import apples from '../assets/apples.webp';
import oranges from '../assets/oranges.jpg';
import bluberries from '../assets/bluberries.avif';
import banana from '../assets/banana.jpg';
import carrots from '../assets/carrot.jpg';
import radish from '../assets/radish.jpg';
import veggies from '../assets/veggies.jpg';
import cardLayout from '../assets/card-layout.png';
import dashboard from '../assets/dashboard.png';
import oauth from '../assets/oauth.jpg';
import paypalProof from '../assets/paypal-proof.jpg';
import uploads from '../assets/uploads.png';
import ml from '../assets/images.jpg';
import { useState } from 'react';

const images = [
    {
        img: produce,
        cols: 2,
        rows: 2,
        title: "Fresh Produce"
    },
    {
        img: apples,
        title: "Apples"
    },
    {
        img: oranges,
        title: "Oranges"
    },
    {
        img: bluberries,
        title: "Blueberries",
        cols: 2,
        rows: 1
    }
]

const features = [
    {
        image: ml,
        title: "ML Trained Model",
        description: "Our trained ML model will suggest an accurate price of the product, based on the current Economy,  you are currently trying to sell"
    },
    {
        image: oauth,
        title: "Google OAuth",
        description: "With the powerful features of Google comes OAuth, a revolutionary authentication system providing easy login/signup integrations and a better UI/UX for users around the world."
    },
    {
        image: cardLayout,
        title: "Readable Data",
        description: "Using modern styling tools such as Bootstrap and TailwindCSS, we created easy understandable cards which each contain information for reading or preview purposes."
    },
    {
        image: paypalProof,
        title: "Paypal Integration",
        description: "Paypal makes integrating payments into our application twice as easy. Quick components already provided by Paypals developer application allowed us to easily connect users together and focus more on looks."
    },
    {
        image: uploads,
        title: "AI Price Suggestion",
        description: "Along with a seamless product uploads page, vendors can find a price with the click of  button through our application. Using an unsupervised model trained on a dataset of prices and produce, we predict the prices of produce the user has entered."
    },
    {
        image: dashboard,
        title: "Informational Analytics",
        description: "Our user's built-in dashboard page allows them to see analytics on what they're selling such as profits and sales. Also available are lists and charts on orders and their prices."
    }
]

function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
}
  
export default function Home() {
    const [cName, setCName] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [cMessage, setCMessage] = useState("");

    const navigate = useNavigate();

    return (
        <Box minHeight={`100%`} width={`100%`} sx={{ scrollBehavior: `smooth` }}>
            <Box id="home" width={`100%`} style={{ background: 'linear-gradient(to right bottom, #003329, #6ee8cf)' }} paddingBottom={15} paddingTop={10}>
                <Box width={`70%`} marginX={`auto`} display={`flex`} flexDirection={`row`} alignItems={`center`} marginBottom={10}>
                    <Typography variant='h3' color={`white`} sx={{ fontWeight: 600 }} marginRight={`auto`}>Fresh For All</Typography>
                    <Box display={`flex`} alignItems={`center`}>
                        <Typography component={`a`} href='#home' variant='h6' color={`white`} sx={{ fontWeight: 500, textDecoration: `none` }} marginRight={5}>Home</Typography>
                        <Typography component={`a`} href='#features' variant='h6' color={`white`} sx={{ fontWeight: 500, textDecoration: `none` }} marginRight={5}>Features</Typography>
                        <Typography component={`a`} href='#mission' variant='h6' color={`white`} sx={{ fontWeight: 500, textDecoration: `none` }} marginRight={5}>Our Mission</Typography>
                        <Typography component={`a`} href='#contact' variant='h6' color={`white`} sx={{ fontWeight: 500, textDecoration: `none` }}>Contact</Typography>
                    </Box>
                </Box>
                <Box width={`75%`} marginX={`auto`} display={`flex`} flexDirection={`row`} alignItems={`center`}>
                    <Box width={`50%`}>
                        <Typography variant='h3' fontWeight={500} color={`white`} marginBottom={2}>Fresh produce, delivered straight to your doorstep.</Typography>
                        <Typography variant='body1' fontSize={20} fontWeight={400} color={`white`} marginBottom={3}>Fresh For All aims to revolutionize the ecommerce industry by helping consumers around the world order healthy produce without added ingredients straight from the vendor.</Typography>
                        <Box display={`flex`} alignItems={`center`} justifyContent={`space-between`}>
                            <Button onClick={() => navigate("/register", { replace: true })} disableElevation size='large' variant='contained' color={`info`} sx={{ width: `48%`, height: '50px', borderRadius: '10px', fontSize: '18px' }}>Get Started Today!</Button>
                            <Button onClick={() => navigate("/login", { replace: true })} disableElevation size='large' variant='contained' color={`secondary`} sx={{ width: `48%`, height: '50px', borderRadius: '10px', fontSize: '18px' }}>Return to your Produce!</Button>
                        </Box>
                    </Box>
                    <Box width={`50%`}>
                        <ImageList sx={{ width: 500, marginX: `auto`, borderRadius: `15px`, boxShadow: '2px 2px 20px black', ":hover": { boxShadow: '2px 2px 40px black' }, transition: '0.2s all ease-in-out' }} variant='quilted' cols={4} rowHeight={121}>
                        {images.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                            <img
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                            </ImageListItem>
                        ))}
                        </ImageList>
                    </Box>
                </Box>
            </Box>
            <Box id="features" width={`100%`} paddingY={5}>
                <Typography width={`90%`} marginX={`auto`} variant='h3' fontWeight={500} marginBottom={5}>Features</Typography>
                <Box width={`80%`} marginX={`auto`} display={`flex`} flexWrap={`wrap`} justifyContent={`center`}>
                    {features.map((feature, index) => {
                        return (
                            <Card variant='elevation' sx={{ maxWidth: 420, marginRight: 5, marginBottom: index < 3 ? 4 : 0, borderRadius: 3 }} elevation={10} key={index}>
                                <CardMedia sx={{ height: 220 }} image={feature.image} />
                                <CardContent>
                                    <Typography variant='h5' gutterBottom>{feature.title}</Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Box>
            </Box>
            <Box id="mission" width={`100%`} paddingY={5} bgcolor={`#0b2431`} color={`white`}>
                <Typography width={`90%`} marginX={`auto`} variant='h3' fontWeight={500} marginBottom={5}>Our Mission</Typography>
                <Typography width={`80%`} marginX={`auto`} variant='body1' sx={{ fontSize: 20 }} fontWeight={400}>
                    Here at Fresh For All, we hope to shine a light into people, guiding them to healthy bodies and fresh produce delivered from local merchants.
                    By connecting people with nutritious food from nearby merchants, Fresh For All is not only promoting physical wellness but also strengthening
                    the fabric of neighborhoods. It's about empowering individuals to make healthy choices while simultaneously bolstering the vitality of local
                    businesses.
                </Typography>
            </Box>
            <Box id="contact" width={`100%`} paddingY={5} display={`flex`} justifyContent={`center`} flexDirection={`column`}>
                <Typography width={`90%`} marginX={`auto`} variant='h3' fontWeight={500} marginBottom={5}>Contact</Typography>
                <Box width={`25%`} marginX={`auto`} display={`flex`} justifyContent={`center`} flexDirection={`column`} alignItems={`center`}>
                    <Box width={`100%`} display={`flex`} justifyContent={`space-between`} marginBottom={2}>
                        <TextField value={cName} onChange={(e) => setCName(e.target.value)} variant='outlined' sx={{ width: `49%`, fontSize: '30px' }} label='Name' required color='secondary' />
                        <TextField value={cEmail} onChange={(e) => setCEmail(e.target.value)} type='email' variant='outlined' sx={{ width: `49%` }} label='Email' required color='secondary' />
                    </Box>
                    <TextField value={cMessage} onChange={(e) => setCMessage(e.target.value)} variant='outlined' fullWidth label="Message" required color='secondary' rows={3} multiline sx={{ marginBottom: 2 }} />
                    <Button fullWidth variant='contained' color='secondary'>Send</Button>
                </Box>
            </Box>
        </Box>
    )
}