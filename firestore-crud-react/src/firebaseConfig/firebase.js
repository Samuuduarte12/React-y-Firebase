import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC7s-z4Pv_ylEJEbiJ7tddAVVkkqPzu7EI",
  authDomain: "fb-crud-react-5166c.firebaseapp.com",
  projectId: "fb-crud-react-5166c",
  storageBucket: "fb-crud-react-5166c.appspot.com",
  messagingSenderId: "470452439304",
  appId: "1:470452439304:web:cc75bef2f2e6cbecf804bd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
