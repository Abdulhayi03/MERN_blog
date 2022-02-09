import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {

  const userRef = useRef()
  const passwordRef = useRef()
  const {dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type: 'LOGIN_START'})
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({type: 'LOGIN_SUCCESS', payload: res.data})

    } catch (err) {
      dispatch({type: 'LOGIN_FAILURE'})

    }
  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input ref={userRef} className="loginInput" type="text" placeholder="Enter your username..." />
        <label>Password</label>
        <input ref={passwordRef} className="loginInput" type="password" placeholder="Enter your password..." />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
        <button className="loginRegisterButton">Register</button>
    </div>
  );
}
