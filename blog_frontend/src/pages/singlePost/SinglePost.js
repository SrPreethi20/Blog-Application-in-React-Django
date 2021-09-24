import './singlePost.css';
import { Redirect, useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/context/ContextProvider';
import Auth from '../../components/auth/AuthServeice';
import NotFound from '../../components/notFound/NotFound';

export default function SinglePost(props) {
    const { id } = useParams();
    const context = useContext(UserContext);
    const { user_blogs } = context.data;
    const [users, setUsers] = useState([]);
    const [blog, setBlog] = useState(user_blogs.filter(blog => blog.id == id)[0]);
    const [editBlog, setEditBlog] = useState({});
    const [image, setImage] = useState();

    useEffect(() => {
        Auth.GetUsers()
        .then(res => {
            console.log('User data - ', res['user data']);
            setUsers(res['user data']);
        })
    },[])

    const handleInput = e => {
        setBlog({...blog, [e.target.name]: e.target.value})
        setEditBlog({...editBlog, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        image && formData.append('img',image);
        if(Object.keys(editBlog).indexOf('title') == -1) {
            formData.append('title', blog.title);
        }
        for(let key in editBlog) {
            formData.append(key, editBlog[key]);
        }

        if(Object.keys(editBlog)) {
            console.log('PUT request to be made');
            Auth.EditBlog(id, formData)
            .then(res => {
                console.log('resonse from put req', res);
                if(res) {
                    console.log('Edited Blog data successfully');
                    console.log('redirecting to user-blogssssss');
                } else {
                    alert('Failed to update Blog data');
                }
            })
        }
        else {
            console.log('No change in Blog data..');
            props.history.push('/user-blogs');
        }
        props.history.push('/user-blogs');
    }

    return (
        <div className="singlePost">
            { blog && <div>
            <form onSubmit={e => handleFormSubmit(e)}>
                <label className="singlePostWrapper"><span className="singlePostTitle">Title</span>:
                    <input className="singlePostTitle" type="text" value={blog.title} name="title" onChange={e => handleInput(e)}></input>
                </label>
                <br></br>
                <hr></hr>
                <label className="singlePostWrapper"><span className="singlePostTitle">Slug</span>:
                    <input className="singlePostTitle" type="text" value={blog.slug} name="slug" onChange={e => handleInput(e)}></input>
                </label>
                <br></br>
                <hr></hr>
                <label className="singlePostWrapper"><span className="singlePostTitle">Author</span>:
                    <select className="singlePostTitle" name="author" value={blog.author} onChange={e => handleInput(e)}>
                    {users.length > 0 && users.map((user, index) =>
                        <option key={index} value={user.id}>{user.username}</option>
                    )}
                    </select>
                </label>
                <br></br>
                <hr></hr>
                <label className="singlePostWrapper"><span className="singlePostTitle">Content</span>:
                    <textarea className="singlePostDesc" name="content" rows="10" clos="300" value={blog.content} onChange={e => handleInput(e)}></textarea>
                </label>
                <br></br>
                <hr></hr>
                <label className="singlePostWrapper"><span className="singlePostTitle">Status</span>:
                    <select className="singlePostTitle" name="status" value={blog.status} onChange={e => handleInput(e)}>
                        <option value="0">Draft</option>
                        <option value="1">Publish</option>
                    </select>
                </label>
                <br></br>
                <hr></hr>
                <label className="singlePostWrapper"><span className="singlePostTitle">Img</span>:
                    <label className="singlePostWrapper"><span className="singlePostTitle">Currently</span>: {blog.img}</label>
                    <br></br>
                    <input className="fileInput" type="file" onChange={e => setImage(e.target.files[0])}></input>
                </label>
                <br></br>
                <hr></hr>
                <div><button className="editButton">Update</button></div>
            </form>
            </div>}
        </div>
    )
}
