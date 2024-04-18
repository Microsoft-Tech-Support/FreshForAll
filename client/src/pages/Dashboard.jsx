import { Box } from '@mui/material';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { RiNumbersFill } from "react-icons/ri";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { TbCalendarDollar } from "react-icons/tb";

export default function Dashboard() {
    const [data, setData] = useState(undefined);
    const timePeriods = ["Months", "Week", "Year", "Year to Date", "Days"];
    const [currentTimePeriod, setCurrentTimePeriod] = useState(0);

    useEffect(() => {
        function getData() {
            const docRef = doc(db, "users", auth.currentUser.uid);
            getDoc(docRef).then((snap) => {
                setData(snap.data());
            });
        }

        getData();
    });

    const data1 = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800
        },
        {
          "name": "Page D",
          "uv": 2780,
          "pv": 3908
        },
        {
          "name": "Page E",
          "uv": 1890,
          "pv": 4800
        },
        {
          "name": "Page F",
          "uv": 2390,
          "pv": 3800
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300
        }
    ]

    const sales = [
        {
            orderer: "Melinda Robertas",
            productPurchased: "Non GMO Apples",
            purchasePrice: 12.45,
            quantityPounds: 2
        },
        {
            orderer: "John Doe",
            productPurchased: "Organic Bananas",
            purchasePrice: 8.99,
            quantityPounds: 3
        },
        {
            orderer: "Emily Smith",
            productPurchased: "Grass-Fed Beef",
            purchasePrice: 24.99,
            quantityPounds: 1.5
        },
        {
            orderer: "David Johnson",
            productPurchased: "Free-Range Eggs",
            purchasePrice: 5.49,
            quantityPounds: 2
        },
        {
            orderer: "Sarah Williams",
            productPurchased: "Whole Grain Bread",
            purchasePrice: 3.75,
            quantityPounds: 1
        }
    ];
    

    return (
        <div className={`h-screen bg-[#0b2431] px-10 py-10`}>
            <div className={`mb-4 flex justify-between w-11/12 mx-auto`}>
                <div className={`p-4 bg-white w-[24%] rounded-lg flex justify-between`}>
                    <div>
                        <h2 className={`text-lg font-semibold text-gray-500 mb-1`}>Total Profits</h2>
                        <h2 className={`text-2xl font-semibold text-black mb-3`}>{data ? "$" + data.earnings.toFixed(2) : "--"}</h2>
                    </div>
                    <div className={`bg-yellow-400 rounded-full bg-opacity-80`}><FaMoneyBillTrendUp size={35} className={`m-5`} /></div>
                </div>
                <div className={`p-4 bg-white w-[24%] rounded-lg flex justify-between`}>
                    <div>
                        <h2 className={`text-lg font-semibold text-gray-500 mb-1`}>Total Sales</h2>
                        <h2 className={`text-2xl font-semibold text-black mb-3`}>{data ? data.sales : "--"}</h2>
                    </div>
                    <div className={`bg-green-500 rounded-full bg-opacity-80`}><RiNumbersFill size={35} className={`m-5`} /></div>
                </div>
                <div className={`p-4 bg-white w-[24%] rounded-lg flex justify-between`}>
                    <div>
                        <h2 className={`text-lg font-semibold text-gray-500 mb-1`}>Avg. Rating</h2>
                        <h2 className={`text-2xl font-semibold text-black mb-3`}>{4.36.toFixed(2)} Stars</h2>
                    </div>
                    <div className={`bg-blue-400 rounded-full bg-opacity-80`}><FaStar size={35} className={`m-5`} /></div>
                </div>
                <div className={`p-4 bg-white w-[24%] rounded-lg flex justify-between`}>
                    <div>
                        <h2 className={`text-lg font-semibold text-gray-500 mb-1`}>Monthly Profit</h2>
                        <h2 className={`text-2xl font-semibold text-black mb-3`}>{data ? "$" + (data.earnings / 4).toFixed(2) : "--"}</h2>
                    </div>
                    <div className={`bg-rose-400 rounded-full bg-opacity-80`}><TbCalendarDollar size={35} className={`m-5`} /></div>
                </div>
            </div>
            <div className={`mb-4 flex justify-between w-11/12 mx-auto`}>
                <div className={`w-[74.55%] p-5 bg-white rounded-xl flex flex-col justify-center items-center`}>
                    <div className={`flex items-center w-full justify-between mb-6`}>
                        <h1 className={`font-mono font-semibold text-2xl`}>Earnings</h1>
                        <h1 onClick={() => setCurrentTimePeriod((currIndex) => currIndex === timePeriods.length - 1 ? 0 : currIndex + 1)} className={`font-mono cursor-pointer font-medium text-xl p-1 px-2 bg-gray-300 rounded-lg`}>{timePeriods[currentTimePeriod]}</h1>
                    </div>
                    <ResponsiveContainer width={`100%`} height={300} className={`rounded-xl`}>
                        <LineChart data={data1} margin={{ right: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={`w-[23.95%] p-5 bg-white rounded-lg`}>
                    <div className={`flex items-center w-full justify-between mb-6`}>
                        <h1 className={`font-mono font-semibold text-2xl`}>Sale History</h1>
                        <h1 onClick={() => setCurrentTimePeriod((currIndex) => currIndex === timePeriods.length - 1 ? 0 : currIndex + 1)} className={`cursor-pointer font-medium text-lg rounded-lg text-blue-500 hover:bg-blue-200 hover:bg-opacity-70 px-2 py-1 transition-all duration-200 ease-in-out`}>See All</h1>
                    </div>
                    <div>
                        {sales.map((sale, index) => {
                            return (
                                <div className={`border-b-2 border-b-gray-400 px-3 py-2`} index={sale}>
                                    <p className={`flex items-center justify-between w-full`}><span className={`text-lg font-medium`}>{sale.orderer}</span><span className={`text-lg font-medium text-green-500`}>${sale.purchasePrice.toFixed(2)}</span></p>
                                    <p className={`flex items-center justify-between w-full`}><span>{sale.productPurchased}</span><span>{sale.quantityPounds.toFixed(2)} lbs</span></p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}