import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/ContextProvider';
import './navBar.css';


export default function NavBar() {
    const userContext = useContext(UserContext);
    console.log( 'CONTEXT-----',userContext);
    const { user } = userContext.data;
    console.log( 'USER----',user);

    return (
        <div className="nav">
            <div className="navLeft">
                <ul className="navList">
                    <li className="navListItem"><Link to="/" className="link">HOME</Link></li>
                    <li className="navListItem"><Link to="/all-blogs" className="link">ALL BLOGS</Link></li>
                    {user && <li className="navListItem"><Link to="/user-blogs" className="link">USER BLOGS</Link></li>}
                    {user && <li className="navListItem"><Link to="/write" className="link">WRITE</Link></li>}
                </ul>
            </div>
            <div className="navRight">
                { user ? (
                    <ul className="navList">
                        <li className="navListItem">Welcome <span className="username">{user}</span></li>
                        <li className="navListItem"><Link to="/logout" className="link">LOGOUT</Link></li>
                    </ul>

                ) : (
                    <ul className="navList">
                        <li className="navListItem"><Link to="/login" className="link">LOGIN</Link></li>
                        <li className="navListItem"><Link to="/register" className="link">REGISTER</Link></li>
                    </ul>
                )}
            </div>
        </div>
    )
}