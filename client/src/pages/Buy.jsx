import { Box } from '@mui/material';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { db, storage } from '../firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

export default function Buy() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const getProducts = async () => {
        const snapshot = await getDocs(query(collection(db, "orders")));
        const data = [];
    
        await Promise.all(snapshot.docs.map(async (doc) => {
            const imagesRef = ref(storage, `${doc.id}/`);
            const images = await listAll(imagesRef);
            const imageUrls = await Promise.all(images.items.map(async (item) => {
                return await getDownloadURL(item);
            }));
            
            data.push({
                id: doc.id,
                street: doc.data().street,
                amtInStock: doc.data().amtInStock,
                minAmtPerPurchase: doc.data().minAmtPerPurchase,
                pricePerPound: doc.data().pricePerPound,
                city: doc.data().city,
                zipcode: doc.data().zipcode,
                name: doc.data().name,
                sellerName: doc.data().sellerName,
                description: doc.data().description,
                imageUrls: imageUrls
            });
        }));
    
        console.log(data);
        setProducts(data);
    }    

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={`h-screen bg-[#0b2431] text-white px-10 py-10`}>
            <div className={`mb-4 flex items-center w-11/12 mx-auto`}>
                <h1 className={`text-3xl font-mono font-bold text-white mr-auto`}>Store</h1>
                <div className={`relative w-2/6 mr-auto`}>
                    <input id='searchInput' className={`rounded-full bg-gray-600 px-10 py-2 w-full focus:outline-none focus:border-blue-400 border-2 border-gray-600`} placeholder="Search by seller's username or product name" />
                    <IoSearch size={25} fill='white' color='white' className={`w-fit absolute inset-y-3 inset-x-2`} />
                </div>
            </div>
            <div className={`flex flex-wrap px-10 py-3`}>
                {products.map((product, index) => {
                    return (
                        <div onClick={() => navigate(`/buy/${product.id}`, { state: { productData: product }, replace: true })} key={index} className={`mr-4 border-2 border-gray-600 rounded-md h-96 w-80 overflow-hidden hover:scale-105 cursor-pointer`}>
                            <img src={product.imageUrls[0]} alt={product.name} className={`h-1/2 w-full shadow-inner`} />
                            <div className={`px-5 py-3 `}>
                                <p className={`text-xl font-semibold line-clamp-2 mb-2`}>{product.name} - <span className={`text-lg font-normal`}>{product.description}</span></p>
                                <p className={`text-2xl text-green-500 mb-2`}>${product.pricePerPound}/lb</p>
                                <p className={`font-medium text-xl`}>Seller: {product.sellerName}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}