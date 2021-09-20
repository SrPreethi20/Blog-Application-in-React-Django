import './userBlogs.css';
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../components/context/ContextProvider";
import Auth from "../../components/auth/AuthServeice";

export default function UserBlogs(props) {
    const [userBlogs, setuserBlogs] = useState([]);
    const userContext = useContext(UserContext);
    const { setUserBlogs } = userContext;
    const { user } = userContext.data;
    const [reload, setReload] = useState(false);

    useEffect(() => {
        console.log('inside UserBlogs useeffect');
        Auth.GetUserBlogs()
        .then(res => {
            console.log(res);
            res && setuserBlogs(res);
        })
    }, [reload]);

    const handleEdit = (id) => {
        console.log('handle edit called with blog ID ', id);
        console.log('user blogs ****', userBlogs);
        setUserBlogs(userBlogs);

        props.history.push(`/blog/${id}`);
    }

    const handleDelete = (id) => {
        setUserBlogs(userBlogs.filter(blog => blog.id != id));
        console.log('handle delete called with id', id);
        Auth.DeleteBlog(id)
        .then(res => {
            console.log('Blog deleted successfully --', res)
            setReload(true);
        })
        .catch(err => {
            console.log('Failed to delete Blog', err);
            alert('Failed to delete Blog');
        })
    }

    return (
        <div>
            {userBlogs.length > 0 ?
                userBlogs.map((blog, index) =>
                    <div key={index} className="post">
                        <img className="postImg" src={`http://localhost:8000${blog.img}`} alt="postImg1"></img>
                        <div className="postInfo">
                            <span className="postTitle">
                                {blog.title}
                            </span>
                            <hr />
                            {/* <span className="postDate">{blog.created_on}</span> */}
                        </div>
                        <p className="postDesc">
                            {blog.content}
                        </p>
                        <div className="edit">
                            <button className="editButton" onClick={() => handleEdit(blog.id)}>Edit</button>
                            <button className="editButton" onClick={() => handleDelete(blog.id)}>Delete</button>
                        </div>
                        <br></br>
                        <br></br>
                        <hr></hr>
                    </div>
                )
                : !userBlogs &&
                <div>
                    <p className="displayMsg">No Blogs to Display !!!</p>
                    {!user && <p>Login to Create new Blog !!!</p>}
                </div>
            }
        </div>
    )
}