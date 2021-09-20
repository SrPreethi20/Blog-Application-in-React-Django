import './allBlogs.css';
import { UserContext } from '../../components/context/ContextProvider';
import Auth from '../../components/auth/AuthServeice';
import { useEffect, useState, useContext } from "react";

export default function AllBlogs(props) {
    const [allBlogs, setAllBlogs] = useState([]);

    const userContext = useContext(UserContext);
    const { user } = userContext.data;

    useEffect(() => {
        console.log('inside AllBlogs useeffect');
        Auth.GetAllBlogs()
        .then(res => {
            console.log('All blogs - ', res);
            res && setAllBlogs(res);
        })
    }, []);

    return (
        <div>
            {allBlogs.length > 0 ?
                allBlogs.map((blog, index) =>
                    <div key={index} className="post">
                        <img className="postImg" src={`http://localhost:8000${blog.img}`} alt="postImg1"></img>
                        <div className="postInfo">
                            <span className="postTitle">
                                {blog.title}
                            </span>
                            <hr />
                        </div>
                        <p className="postDesc">
                            {blog.content}
                        </p>
                        <br></br>
                        <br></br>
                        <hr></hr>
                    </div>
                )
                : !allBlogs && 
                <div>
                    <p className="displayMsg">No Blogs to Display !!!</p>
                    {!user && <p className="displayMsg">Login to Create new Blog !!!</p>}
                </div>
            }
        </div>
    )
}