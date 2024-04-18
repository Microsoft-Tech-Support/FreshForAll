import { Button, Typography, ImageList, ImageListItem, Card, CardHeader, CardMedia, CardContent, TextField } from '@mui/material';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
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
        description: "Along with a seamless product uploads page, vendors can find a price with the click of  button through our application. We predict the prices of produce the user has entered."
    },
    {
        image: dashboard,
        title: "Informational Analytics",
        description: "Our user's built-in dashboard page allows them to see analytics on what they're selling such as profits and sales. Also available are lists and charts on orders and their prices."
    }
]
  
export default function Home() {
    const [cName, setCName] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [cMessage, setCMessage] = useState("");
    const [currentImage, setCurrentImage] = useState(0);

    const navigate = useNavigate();

    return (
        <div className={`min-h-screen w-full scroll-smooth`}>
            <div className={`w-full py-14 px-5 bg-gradient-to-br from-[#003329] to-[#6ee8cf]`} id="home">
                <div className={`w-4/6 mx-auto flex flex-row items-center mb-12`}>
                    <p className={`text-4xl text-white font-bold mr-auto`}>Fresh For All</p>
                    <div className={`flex items-center`}>
                        <a href="#home" className={`cursor-pointer text-white text-xl font-semibold mr-5`}>Home</a>
                        <a href="#features" className={`cursor-pointer text-white text-xl font-semibold mr-5`}>Features</a>
                        <a href="#mission" className={`cursor-pointer text-white text-xl font-semibold mr-5`}>Our Mission</a>
                        <a href="#contact" className={`cursor-pointer text-white text-xl font-semibold`}>Contact</a>
                    </div>
                </div>
                <div className={`w-3/4 mx-auto flex flex-row items-center`}>
                    <div className={`w-3/6`}>
                        <p className={`font-semibold text-white mb-4 text-3xl`}>Fresh produce, delivered straight to your doorstep.</p>
                        <p className={`text-xl mb-4 text-white font-medium`}>
                            Fresh For All aims to revolutionize the ecommerce industry by helping consumers around the world
                            order healthy produce without added ingredients straight from the vendor.
                        </p>
                        <div className={`flex items-center justify-between`}>
                            <button onClick={() => navigate("/register", { replace: true })} className={`text-white bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 ease-in-out w-[48%] h-12 rounded-lg text-xl`}>Get Started Today!</button>
                            <button onClick={() => navigate("/login", { replace: true })} className={`text-white bg-purple-500 hover:bg-purple-600 transition-all duration-200 ease-in-out w-[48%] h-12 rounded-lg text-xl`}>Return to your Produce!</button>
                        </div>
                    </div>
                    <div className={`w-3/6 px-5 py-5 flex justify-center items-center`}>
                        <div onClick={currentImage !== 0 ? () => setCurrentImage(cImage => cImage - 1) : null} className={`mr-5 ${currentImage !== 0 ? `bg-white cursor-pointer` : 'bg-gray-400 cursor-not-allowed'} rounded-full`}><FaArrowLeft className={`m-3`} size={25} /></div>
                        <img src={images[currentImage].img} alt={images[currentImage].title} className={`rounded-2xl w-96 h-56 shadow-lg shadow-white`}/>
                        <div onClick={currentImage !== images.length - 1 ? () => setCurrentImage(cImage => cImage + 1) : null} className={`ml-5 ${currentImage !== images.length - 1 ? `bg-white cursor-pointer` : 'bg-gray-300 cursor-not-allowed'} rounded-full`}><FaArrowRight className={`m-3`} size={25} /></div>
                    </div>
                </div>
            </div>
            <div className={`w-full py-7 px-10`} id="features">
                <p className={`mx-auto text-3xl font-semibold mb-5 w-fit`}>Features</p>
                <div className={`mx-auto w-4/6 flex flex-wrap justify-between`}>
                    {features.map((feature, index) => {
                        return (
                            <div className={`w-[32%] mb-5 rounded-xl shadow-xl`} key={index}>
                                <img className={`w-full h-3/6 rounded-t-xl shadow-md object-cover`} src={feature.image} alt={feature.title} />
                                <div className={`p-4`}>
                                    <p className={`text-2xl font-medium mb-1`}>{feature.title}</p>
                                    <p className={`text-md font-normal text-gray-500`}>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={`w-full py-7 px-10 bg-[#0b2431] text-white`} id="mission">
                <p className={`mx-auto text-3xl font-semibold mb-5 w-fit`}>Our Mission</p>
                <p className={`px-10 mx-auto text-xl`}>
                    Here at Fresh For All, we hope to shine a light into people, guiding them to healthy bodies and fresh produce delivered from local merchants.
                    By connecting people with nutritious food from nearby merchants, Fresh For All is not only promoting physical wellness but also strengthening
                    the fabric of neighborhoods. It's about empowering individuals to make healthy choices while simultaneously bolstering the vitality of local
                    businesses.
                </p>
            </div>
            <div className={`w-full py-7 px-10 flex justify-center flex-col`} id="contact">
                <p className={`mx-auto text-3xl font-semibold mb-5`}>Contact</p>
                <div className={`w-2/5 mx-auto flex justify-center flex-col items-center`}>
                    <div className={`w-full flex justify-between mb-4`}>
                        <input className={`border-gray-300 border-2 focus:outline-none hover:border-gray-800 focus:border-purple-500 rounded-lg text-lg w-[49%] px-2 py-2`} placeholder='Name' value={cName} onChange={(e) => setCName(e.target.value)} required />
                        <input className={`border-gray-300 border-2 focus:outline-none hover:border-gray-800 focus:border-purple-500 rounded-lg text-lg w-[49%] px-2 py-2`} placeholder='Email' type='email' required value={cEmail} onChange={(e) => setCEmail(e.target.value)}/>
                    </div>
                    <textarea rows={3} className={`w-full mb-4 px-2 py-2 border-gray-300 border-2 focus:outline-none hover:border-gray-800 focus:border-purple-500 rounded-lg text-lg`} placeholder='Message' value={cMessage} onChange={(e) => setCMessage(e.target.value)}></textarea>
                    <button className={`bg-purple-500 font-semibold w-full px-5 py-2 rounded-lg hover:bg-purple-400 text-gray-100`}>Send</button>
                </div>
            </div>
        </div>
    )
}