import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXXRKjtTQRvQuremKqeKaam4VyEBKCnn4",
  authDomain: "freshforall-8863b.firebaseapp.com",
  projectId: "freshforall-8863b",
  storageBucket: "freshforall-8863b.appspot.com",
  messagingSenderId: "154520455357",
  appId: "1:154520455357:web:37399fb4a1e49bc6f48fd4",
  measurementId: "G-TJ1P36WVJZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };