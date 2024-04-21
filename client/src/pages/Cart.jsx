import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { auth, db } from "../firebase";

export default function Cart() {
    const [cart, setCart] = useState(undefined);

    useEffect(() => {
        const collectCart = () => {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            getDoc(userDocRef).then(snapshot => {
                setCart(snapshot.data().cart);
            });
        }

        collectCart();
    }, []);
    return (
        <div className={`min-h-screen bg-[#0b2431] text-white p-10`}>
            <h1 className={`text-3xl w-11/12 text-center mx-auto mb-4 font-mono font-bold text-white`}>Cart {cart && `(${cart.length} Items)`}</h1>
            <div className={`w-7/12 mx-auto p-5 rounded-xl border-2 border-gray-300`}>
                {cart && cart.map((cartItem, index) => {
                    return (
                        <div key={index} className={`py-4 px-1 flex border-b-2 border-b-gray-300`}>
                            <img className="w-56 h-56 mr-5 rounded-lg" src={cartItem.imageUrls[0]} alt={cartItem.name} />
                            <div>
                                <p className={`text-2xl font-semibold line-clamp-2`}>{cartItem.name} - <span className={`font-normal text-xl`}>{cartItem.description}</span></p>
                                <p className={`my-4 text-3xl text-green-500`}>${parseFloat(cartItem.pricePerPound).toFixed(2)}/lb</p>
                                <p className={`text-xl font-medium`}>Sold By: <span className={`text-green-400 font-semibold hover:text-green-300 cursor-pointer`}>{cartItem.sellerName}</span></p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}