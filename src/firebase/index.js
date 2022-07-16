import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1x2t5TK5O7l9yMXynB3bfcIKNwm1X21Y",
  authDomain: "cooperative-system-a234d.firebaseapp.com",
  projectId: "cooperative-system-a234d",
  storageBucket: "cooperative-system-a234d.appspot.com",
  messagingSenderId: "1051568200477",
  appId: "1:1051568200477:web:dccf362a14890301ebdff4",
  measurementId: "G-BVE1KENP2N"
};


const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);
const storage = getStorage(fb);
const studentCollection = collection(db, "students");
const companyCollection = collection(db, "companys");
const usersProfileCollection = collection(db, "usersProfile");
const matchingCollection = collection(db, "matching");
const auth = getAuth(fb);

export {
  auth,
  studentCollection,
  companyCollection,
  usersProfileCollection,
  db,
  fb,
  matchingCollection,
  storage
};