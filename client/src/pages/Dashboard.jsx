import { Box } from '@mui/material';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [data, setData] = useState(undefined);

    useEffect(() => {
        function getData() {
            const docRef = doc(db, "users", auth.currentUser.uid);
            getDoc(docRef).then((snap) => {
                setData(snap.data());
            });
        }

        getData();
    });

    return (
        <div className={`h-screen bg-[#0b2431] px-10 py-10`}>
            <div className={`mb-4 flex justify-between w-11/12 mx-auto`}>
                <div className={`p-4 bg-white w-[24%] rounded-lg`}>
                    <h2 className={`text-lg font-semibold text-gray-500 mb-1`}>Total Profits</h2>
                    <h2 className={`text-2xl font-semibold text-black mb-3`}>{data ? "$" + data.earnings.toFixed(2) : "--"}</h2>
                </div>
                <div className={`p-4 bg-white w-[24%] rounded-lg`}></div>
                <div className={`p-4 bg-white w-[24%] rounded-lg`}></div>
                <div className={`p-4 bg-white w-[24%] rounded-lg`}></div>
            </div>
        </div>
    )
}