import { Box } from '@mui/material';

export default function Sell() {
    return (
        <div className={`min-h-screen bg-[#0b2431] text-white px-10 py-10`}>
            <h1 className={`text-3xl font-mono font-bold text-white w-11/12 mx-auto text-center mb-10`}>Upload a Product</h1>
            <div className={`p-7 rounded-xl border-2 border-gray-300 w-6/12 mx-auto`}>
                <p className={`text-gray-300 text-xl text-center w-full font-medium font-mono`}>Fill out the details of your product to add it to the marketplace.</p>
                <hr className={`my-5 border-t-2 border-gray-500 rounded-full`} />
                <div className={`flex justify-between`}>
                    <div className={`w-[48%]`}>
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1`}>Product Name</p>
                        <input className={`focus:outline-none focus:border-green-400 text-lg border-2 border-gray-500 text-gray-300 font-medium font-mono w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50 mb-3`} placeholder="Enter the product's name" />
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1`}>Product Price</p>
                        <input className={`focus:outline-none focus:border-green-400 text-lg border-2 border-gray-500 text-gray-300 font-medium font-mono w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50`} placeholder="Enter the product's price" />
                    </div>
                    <div className={`w-[48%]`}>
                        <p className={`text-lg text-gray-300 font-medium font-mono mb-1`}>Product Description</p>
                        <textarea rows={3} className={`focus:outline-none focus:border-green-400 text-lg border-2 border-gray-500 text-gray-300 font-medium font-mono w-full px-2 py-1 rounded-lg bg-gray-600 bg-opacity-50`} placeholder='Enter a short description for the product'></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}