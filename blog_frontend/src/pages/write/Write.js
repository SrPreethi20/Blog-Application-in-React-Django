import { useState } from 'react';
import './write.css';
import Auth from '../../components/auth/AuthServeice';
import decode from 'jwt-decode';

export default function Write(props) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState();
    const [prevImg, setPrevImg] = useState();
    const token = Auth.GetAccessToken();
    const { user_id } = decode(token);

    const submitPost = (e) => {
        e.preventDefault();
        const formData = new FormData()
        image && formData.append('img',image);
        formData.append('title',title);
        formData.append('content',text);
        formData.append('author',user_id);

        Auth.CreateBlog(formData)
        .then(res => {
            console.log('Blog is created successfully --', res);
            props.history.push('/user-blogs');
        })
        .catch(err => {
            console.log('Failed to create new Blog --', err);
            alert('Failed to create Blog');
        })
    }

    return (
        <div className="write">
            {prevImg && <img 
                className="writeImg"
                src={prevImg}
                alt="preview"
            >
            </img>}
            <form className="writeForm" onSubmit={(e) => submitPost(e)}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display: "none"}}
                        onChange={(e) => {setPrevImg(URL.createObjectURL(e.target.files[0])); setImage(e.target.files[0])}}/>
                    <input type="text" value={title} placeholder="Title" className="writeInput" autoFocus={true}
                        onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="writeFormGroup">
                    <textarea 
                        placeholder="Tell your story..." 
                        type="text" 
                        className="writeInput writeText"
                        value={text}
                        onChange={e => setText(e.target.value)}    
                    >
                    </textarea>
                </div>
                <button className="writeSubmit">Publish</button>
            </form>
        </div>
    )
}