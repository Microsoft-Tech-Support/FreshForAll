import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZDdedktj5NGfhOrTngfCpIrrb3Gg4i-M",
  authDomain: "freshforall-d3edb.firebaseapp.com",
  projectId: "freshforall-d3edb",
  storageBucket: "freshforall-d3edb.appspot.com",
  messagingSenderId: "327292123986",
  appId: "1:327292123986:web:b60a28c4396b5be115d88b",
  measurementId: "G-MQ39E56W0F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };