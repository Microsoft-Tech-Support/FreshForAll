import { Box } from '@mui/material';
import { IoArrowBack, IoArrowBackCircleOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

export default function ShowProduct() {
    const location = useLocation();

    return (
        <div className={`h-screen bg-[#0b2431] text-white px-10 py-10`}>
            <div className={`w-11/12 mx-auto`}>
                <h1 className={`text-xl bg-green-400 text-black mb-8 flex items-center w-fit px-2 py-1 rounded-md`}><IoArrowBack size={25}/>&nbsp; Back</h1>
            </div>
            <div className={`flex w-11/12 mx-auto`}>
                <div className={`flex w-1/2`}>
                    <div className={`mr-7`}>
                        {location.state.productData.imageUrls.map((imageUrl) => {
                            return (
                                <img src={imageUrl} alt={imageUrl} className={`w-20 h-20 border-2 border-white rounded-md cursor-pointer hover:grayscale mb-2`} />
                            )
                        })}
                    </div>
                    <div className='w-[580px] h-80 rounded-xl overflow-hidden'><img className={`w-full h-full`} src={location.state.productData.imageUrls[0]} /></div>
                </div>
                <div className={`w-1/2`}>
                    <h2 className={`text-2xl font-semibold mb-1`}>{location.state.productData.name}</h2>
                    <p className={`text-xl`}>{location.state.productData.description}</p>
                    <p className={`text-3xl text-green-500`}>${parseFloat(location.state.productData.pricePerPound).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}