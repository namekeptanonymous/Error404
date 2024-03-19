// App.jsx
import { useState } from 'react'
import './Login.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    // Login logic here
    console.log("Username:", username)
    console.log("Password:", password)
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    // Password reset logic here
    console.log("Username (Reset Password):", username)
    console.log("New Password:", password)
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="container text-center">
        <div className="row justify-center">
          <div className="col-md-5">
            <form onSubmit={handleLogin} id="login-form">
              <fieldset>
                <div className="card login-card">
                  <div className="card-body">
                    <h3 className="card-title">Login</h3>
                    <br />
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" className="input" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />

                    <label htmlFor="passw">Password:</label>
                    <input type="password" id="passw" name="passw" className="input" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />

                    <input type="submit" value="Submit" className="btn btn-success" id="submit-btn" />
                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>Forgot Password?</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>

      <footer className="footer text-center py-3">
        <div className="container-fluid text-center" data-bs-theme="dark">
          <div className="row mt-3">
            <span className="text-muted">Work done by the Error404 team. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {showModal && (
        <div className="modal-bg">
          <div className="modal">
            <h1 className="modal-title fs-5">Reset Password</h1>
            <form onSubmit={handleResetPassword} id="reset-password-form">
              <div className="modal-body">
                <fieldset>
                  <label htmlFor="username-forgot">Username:</label>
                  <input type="text" id="username-forgot" name="username-forgot" className="input" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />

                  <label htmlFor="passw-forgot">Password:</label>
                  <input type="password" id="passw-forgot" name="passw-forgot" className="input" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                </fieldset>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
                <input type="submit" value="Submit" className="btn btn-success" id="submit-btn" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
