import { useState } from "react"
import "./register.css"
import axios from 'axios'

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError(false)

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      })
      res.data && window.location.replace('/login')
    } catch (err) {
      setError(true)
    }
  }

    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input onChange={e=>setUsername(e.target.value)} className="registerInput" type="text" placeholder="Enter your username..." />
        <label>Email</label>
        <input onChange={e=>setEmail(e.target.value)} className="registerInput" type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input onChange={e=>setPassword(e.target.value)} className="registerInput" type="password" placeholder="Enter your password..." />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <button className="registerLoginButton">Login</button>
        <br />
        {error && <span>Username already exists, Please try a different one.</span>}
    </div>
    )
}
