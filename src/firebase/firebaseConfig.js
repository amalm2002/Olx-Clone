import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBd4TZwUCEdPlWI4m9bW6fMGIk0QvB95dI",
  authDomain: "olx-clone-f3609.firebaseapp.com",
  projectId: "olx-clone-f3609",
  storageBucket: "olx-clone-f3609.firebasestorage.app",
  messagingSenderId: "601278290949",
  appId: "1:601278290949:web:532cfcca1a82931225106c"
};


const app = initializeApp(firebaseConfig);
export default app