import firebase from "firebase/app";

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
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };