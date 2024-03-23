import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDl-f0Ql_8m61ldg593Vbhxfq-n7OKGt38",
  authDomain: "cosc-310-project---error404.firebaseapp.com",
  databaseURL: "https://cosc-310-project---error404-default-rtdb.firebaseio.com",
  projectId: "cosc-310-project---error404",
  storageBucket: "cosc-310-project---error404.appspot.com",
  messagingSenderId: "863240973704",
  appId: "1:863240973704:web:657a8cda993f7833191e3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };