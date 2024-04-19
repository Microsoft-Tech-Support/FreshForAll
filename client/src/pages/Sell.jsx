import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { doc, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

export default function Sell() {
    const [uploadedImage, setUploadedImage] = useState([]);
    const imageUploadRef = useRef();

    const publishProduce = async () => {
        
    }

    return (
        <div className={`min-h-screen bg-[#0b2431] text-white px-10 py-10`}>
            <h1 className={`text-3xl font-mono font-bold text-white w-11/12 mx-auto text-center mb-10`}>Upload a Product</h1>
            <div className={`p-7 rounded-xl border-2 border-gray-300 w-7/12 mx-auto`}>
                <p className={`text-gray-300 text-xl text-center w-full font-medium font-mono`}>Fill out the details of your product to add it to the marketplace.</p>
                <hr className={`my-5 border-t-2 border-gray-500 rounded-full`} />
                <div className={`flex justify-between mb-5`}>
                    <div className={`w-[48%]`}>
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1`}>Product Name</p>
                        <input className={`focus:outline-none focus:border-green-400 text-lg border-2 border-gray-500 text-gray-300 font-medium font-mono w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50 mb-3`} placeholder="Enter the product's name" />
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1`}>Product Price/Lb</p>
                        <input className={`focus:outline-none focus:border-green-400 text-lg border-2 border-gray-500 text-gray-300 font-medium font-mono w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50 mb-3`} placeholder="Enter the product's price/lb" />
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1`}>Minimum Lbs/Purchase</p>
                        <input className={`focus:outline-none focus:border-green-400 text-lg border-2 border-gray-500 text-gray-300 font-medium font-mono w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50 mb-3`} placeholder="Enter the minimum lbs/purchase" />
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1`}>Street</p>
                        <input className={`focus:outline-none focus:border-green-400 text-lg border-2 border-gray-500 text-gray-300 font-medium font-mono w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50 mb-3`} placeholder="Enter your street" />
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1`}>City</p>
                        <input className={`focus:outline-none focus:border-green-400 text-lg border-2 border-gray-500 text-gray-300 font-medium font-mono w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50 mb-3`} placeholder="Enter your city" />
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1`}>Zipcode</p>
                        <input className={`focus:outline-none focus:border-green-400 text-lg border-2 border-gray-500 text-gray-300 font-medium font-mono w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50`} placeholder="Enter your zipcode" />
                    </div>
                    <div className={`w-[48%]`}>
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1`}>Product Description</p>
                        <textarea rows={3} className={`focus:outline-none focus:border-green-400 text-lg border-2 border-gray-500 text-gray-300 font-medium font-mono mb-3 w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50`} placeholder='Enter a short description for the product'></textarea>
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1 w-full flex items-center justify-between`}><span>Product Images</span><span className={`${uploadedImage.length >= 5 ? `text-red-400` : `text-white`}`}>{uploadedImage.length}/5</span></p>
                        <div onClick={uploadedImage.length < 5 ? () => imageUploadRef.current.click() : null} className={`${uploadedImage.length < 5 ? `cursor-pointer` : `cursor-not-allowed`} hover:bg-gray-700 text-lg border-2 border-gray-500 flex-col text-gray-300 font-medium font-mono mb-3 w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50 min-h-32 flex justify-center items-center`} placeholder='Enter a short description for the product'>
                            <FaFileUpload size={60} fill='white' className={`mb-2`} />
                            <p className={`text-lg text-gray-300 font-medium font-mono`}>Click to upload images of your produce</p>
                        </div>
                        <div className={`flex flex-wrap`}>
                            {uploadedImage.map((image) => {
                                console.log(image)
                                return (
                                    <div onClick={() => {
                                        setUploadedImage(uploadedImage.filter((imageItem) => {
                                            return imageItem !== image;
                                        }));
                                    }} className={`w-20 h-20 mr-2 mb-2 border-2 border-gray-200 rounded-md group relative cursor-pointer`}>
                                        <img className={`w-full h-full rounded-sm`} key={image} src={URL.createObjectURL(image)} />
                                        <div className={`w-full h-full rounded-sm group-hover:z-50 -z-50 absolute inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center`}><FaRegTrashAlt size={35} className={`fill-red-400`} /></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={`w-full flex justify-center`}>
                    <button className={`w-fit px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-medium`}>Upload Product</button>
                </div>
            </div>
            <input onChange={(e) => {setUploadedImage([...uploadedImage, imageUploadRef.current.files[0]])}} className={`fixed top-0 left-0 hidden`} ref={imageUploadRef} type='file' accept='image/png, image/jpg, image/webp, image/jpeg' />
        </div>
    )
}