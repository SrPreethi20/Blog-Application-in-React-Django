import './login.css';
import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../components/context/ContextProvider';
import Auth from '../../components/auth/AuthServeice';

export default function Login(props) {
    const [userData, setUserData] = useState({username: "", password: ""});
    const [loginErrors, setLoginErrors] = useState("");
    const userContext = useContext(UserContext);
    const { handleUserData } = userContext;

    const handleChange = e => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleLoginForm = e => {
        e.preventDefault();
        Auth.Login(userData)
        .then(res => {
            console.log(res.data);
            handleUserData(userData.username);
            props.history.push('/');
        })
        .catch(err => {
            alert('Invalid User Credentials')
            console.log(err)
        })
    }

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={(e) => handleLoginForm(e)}>
                <label>Username</label>
                <input
                    type="text"
                    className="loginInput"
                    placeholder="Enter Your Username..."
                    value={userData.username}
                    name="username"
                    onChange={(e) => handleChange(e)}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="loginInput"
                    placeholder="Enter your Password..."
                    value={userData.password}
                    name="password"
                    onChange={(e) => handleChange(e)}
                />
                <button type="submit" className="loginButton">Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link to="/register" className="link">Register</Link></button>
            {loginErrors && <div>Invalid Credentials</div>}
        </div>
    )
}