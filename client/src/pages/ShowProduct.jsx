import { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { FaCartPlus } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFlag } from "react-icons/fa";
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import RetryReport from '../components/RetryReport';

export default function ShowProduct({ username }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [reportSelected, setReportSelected] = useState(0);
    const [addInfo, setAddInfo] = useState("");

    const reportProduct = () => {
        const reports = ["Innapropriate Media/Text", "Incomplete Information", "Offensive Media/Text", "Incorrect Information"];
        addDoc(collection(db, "reports"), {
            productData: location.state.productData,
            reportType: reports[reportSelected],
            additionalInfo: addInfo,
            reportedBy: username
        }).then(() => {
            toast("Successfully reported this offense! Thank you for keeping our site safe and valid!", { theme: 'colored', type: 'success' });
            setReportModalOpen(false);
        }).catch(e => {
            console.error("Error adding report:", e);
            toast(<RetryReport onRetry={reportProduct} />, { theme: "colored", type: 'error' });
        });
    }

    const addToCart = () => {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        updateDoc(userDocRef, {
            cart: arrayUnion(location.state.productData)
        }).then(() => {
            toast("Item successfully added to cart!", { theme: 'colored', type: 'success' });
        }).catch((e) => {
            toast("There was an error adding the item to your cart.", { theme: 'colored', type: 'error' });
        });
    }

    return (
        <div className={`min-h-screen bg-[#0b2431] text-white px-10 py-10`}>
            <div className={`w-11/12 mx-auto`}>
                <h1 onClick={() => navigate('/buy', { replace: true })} className={`text-xl cursor-pointer bg-green-400 text-black mb-8 flex items-center w-fit px-2 py-1 rounded-md`}><IoArrowBack size={25}/>&nbsp; Back</h1>
            </div>
            <div className={`flex w-11/12 mx-auto`}>
                    <div className={`flex w-1/2`}>
                        <div className={`mr-7`}>
                            {location.state.productData.imageUrls.map((imageUrl, index) => {
                                return (
                                    <img onClick={() => setSelectedImageIndex(index)} key={index} src={imageUrl} alt={imageUrl} className={`w-20 h-20 ${selectedImageIndex === index ? 'border-green-400' : `border-white`} border-4 rounded-md cursor-pointer hover:scale-105 mb-2`} />
                                )
                            })}
                        </div>
                        <div className='w-[580px] h-80 rounded-xl overflow-hidden'><img className={`w-full h-full`} src={location.state.productData.imageUrls[selectedImageIndex]} /></div>
                    </div>
                <div className={`w-1/2`}>
                    <h2 className={`text-2xl font-semibold mb-1 w-full flex items-center`}>{location.state.productData.name}<span onClick={() => setReportModalOpen(true)} className={`ml-auto flex items-center text-base font-normal text-red-400 cursor-pointer group hover:text-red-500`}><FaFlag size={16} className={`fill-red-400 group-hover:fill-red-500`} />&nbsp;&nbsp;Report</span></h2>
                    <p className={`text-xl`}>{location.state.productData.description}</p>
                    <p className={`text-4xl text-green-500 my-5`}>${parseFloat(location.state.productData.pricePerPound).toFixed(2)}/lb</p>
                    <p className={`text-xl mb-2`}>Minimum Lbs for a Purchase: {location.state.productData.minAmtPerPurchase} lbs</p>
                    <p className={`text-xl mb-3`}>Lbs Available for Purchase: {location.state.productData.amtInStock} lbs</p>
                    <p className={`text-xl text-green-300 font-semibold`}><span className={`text-white font-normal hover:text-white`}>See more produce by</span> <span className={`cursor-pointer hover:text-green-400`}>{location.state.productData.sellerName}</span></p>
                    <div className={`flex items-center w-full my-3 justify-between`}>
                        <div className='h-1 bg-gray-400 w-[45%] rounded-s-full'></div>
                        <p className={`w-[17%] text-center text-lg`}>Interested?</p>
                        <div className='h-1 bg-gray-400 w-[45%] rounded-s-full'></div>
                    </div>
                    <div className={`w-full flex justify-between`}>
                        <button onClick={() => navigate(`/buy/${location.state.productData.id}/checkout`, { replace: false, state: location.state })} className={`w-[49%] text-black text-lg px-5 py-1 rounded-lg bg-green-400 hover:bg-green-500 flex items-center justify-center`}><CiMoneyBill size={30} color='black' />&nbsp; Buy Now</button>
                        <button onClick={addToCart} className={`w-[49%] text-black text-lg px-5 py-1 rounded-lg bg-yellow-600 hover:bg-yellow-500 flex items-center justify-center`}><FaCartPlus size={30} fill='black' />&nbsp; Add to Cart</button>
                    </div>
                </div>
            </div>
            {reportModalOpen && (
                <div className={`fixed top-0 left-0 w-screen h-screen bg-gray-600 bg-opacity-50 flex justify-center items-center`}>
                    <div className={`w-1/3 rounded-xl bg-white px-5 py-5`}>
                        <div className={`mb-4 w-full`}>
                            <p className={`text-black text-lg mb-1`}>Why are you here today?:</p>
                            <div className={`w-full flex flex-wrap justify-between text-black mb-4`}>
                                <p onClick={() => setReportSelected(0)} className={`px-3 cursor-pointer transition-all ${reportSelected === 0 && `bg-blue-400`} py-1 rounded-lg w-[49%] border-2 border-blue-400 hover:bg-blue-300 hover:border-blue-300 text-center text-lg mb-3`}>Innapropriate Media/Text</p>
                                <p onClick={() => setReportSelected(1)} className={`px-3 cursor-pointer transition-all ${reportSelected === 1 && `bg-blue-400`} py-1 rounded-lg w-[49%] border-2 border-blue-400 hover:bg-blue-300 hover:border-blue-300 text-center text-lg mb-3`}>Incomplete Information</p>
                                <p onClick={() => setReportSelected(2)} className={`px-3 cursor-pointer transition-all ${reportSelected === 2 && `bg-blue-400`} py-1 rounded-lg w-[49%] border-2 border-blue-400 hover:bg-blue-300 hover:border-blue-300 text-center text-lg`}>Offensive Media/Text</p>
                                <p onClick={() => setReportSelected(3)} className={`px-3 cursor-pointer transition-all ${reportSelected === 3 && `bg-blue-400`} py-1 rounded-lg w-[49%] border-2 border-blue-400 hover:bg-blue-300 hover:border-blue-300 text-center text-lg`}>Incorrect Information</p>
                            </div>
                            <p className={`text-black text-lg mb-1`}>Add some Additional Details on your Report:</p>
                            <textarea value={addInfo} onChange={(e) => setAddInfo(e.target.value)} className={`text-black w-full rounded-lg border-2 border-gray-400 px-3 py-2 hover:border-blue-300 focus:outline-none focus:border-blue-400`} rows={2} placeholder='Enter some additional details here...'></textarea>
                        </div>
                        <div className={`flex justify-between`}>
                            <button onClick={() => setReportModalOpen(false)} className={`w-[49%] text-lg text-black border-2 border-red-500 rounded-lg hover:bg-red-400 hover:border-red-400 py-1 px-6 transition-all`}>Cancel</button>
                            <button onClick={reportProduct} className={`w-[49%] text-lg text-black border-2 border-green-400 bg-green-400 rounded-lg hover:bg-green-300 hover:border-green-300 transition-all py-1 px-6`}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}