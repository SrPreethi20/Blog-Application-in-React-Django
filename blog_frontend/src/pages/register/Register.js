import './register.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../components/context/ContextProvider';
import Auth from '../../components/auth/AuthServeice';

export default function Register(props) {
    const [userData, setUserData] = useState({username: "", password: "", email: ""})
    const { handleUserData } = useContext(UserContext);

    const handleChange = e => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleRegister = e => {
        e.preventDefault();
        Auth.Register(userData)
        .then(res => {
            console.log('registration - ', res);
            props.history.push('/login');
            Auth.Login({username: userData.username, password: userData.password})
            .then(res => {
                console.log('user Login successful', res);
                handleUserData(userData.username);
                props.history.push('/');
            })
            .catch(err => console.log('login failed', err));
        })
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={(e) => handleRegister(e)}>
                <label>Username</label>
                <input 
                    type="text" 
                    className="registerInput" 
                    placeholder="Enter Your Username..."
                    value={userData.username}
                    name="username"
                    onChange={(e) => handleChange(e)}
                />
                <label>Email</label>
                <input 
                    type="email" 
                    className="registerInput" 
                    placeholder="Enter Your Email..."
                    value={userData.email}
                    name="email"
                    onChange={(e) => handleChange(e)}
                />
                <label>Password</label>
                <input 
                    type="password" 
                    className="registerInput" 
                    placeholder="Enter your Password..."
                    value={userData.password}
                    name="password"
                    onChange={(e) => handleChange(e)}
                />
                <button className="registerButton">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link to="/login" className="link">Login</Link>
            </button>
        </div>
    )
}
