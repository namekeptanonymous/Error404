import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import './Register.css'

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userExists, setUserExists] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyDl-f0Ql_8m61ldg593Vbhxfq-n7OKGt38",
    authDomain: "cosc-310-project---error404.firebaseapp.com",
    databaseURL: "https://cosc-310-project---error404-default-rtdb.firebaseio.com",
    projectId: "cosc-310-project---error404",
    storageBucket: "cosc-310-project---error404.appspot.com",
    messagingSenderId: "863240973704",
    appId: "1:863240973704:web:657a8cda993f7833191e3d"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userDataRef = ref(database, 'users');

    get(child(userDataRef, username)).then((snapshot) => {
      if (snapshot.exists()) {
        setUserExists(true);
        alert("A user with that username already exists! Please use a different username.");
      } else {
        set(child(userDataRef, username), {
          email: email,
          password: password
        }).then(() => {
          alert("User registered successfully with username: " + username);
        }).catch((error) => {
          console.error("Error registering user: ", error);
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div>
      <div id="main">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <form onSubmit={handleFormSubmit}>
                <fieldset>
                  <div className="card register-card">
                    <div className="card-body">
                      <h3 className="card-title">Register</h3><br />
                      <label htmlFor="username">Username:</label>
                      <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />

                      <label htmlFor="email">Email:</label>
                      <input type="text" id="email" name="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />

                      <label htmlFor="passw">Password:</label>
                      <input type="password" id="passw" name="passw" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />

                      <input type="submit" value="Submit" className="btn btn-success" id="submit-btn" />
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <br />
      </div>

      <footer className="footer text-center py-3">
        <div className="container-fluid text-center" data-bs-theme="dark">
          <div className="row mt-3">
            <span className="text-muted">Work done by the Error404 team. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;