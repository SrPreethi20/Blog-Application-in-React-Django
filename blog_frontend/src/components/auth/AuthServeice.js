import axios from "axios";

const LOGIN_URL = 'http://localhost:8000/login/';
const REGISTER_URL = 'http://localhost:8000/register/';
const ALL_BLOGS_URL = 'http://localhost:8000/all-blogs/';
const USER_BLOGS_URL = 'http://localhost:8000/user-blogs/';
const REFRESH_TOKEN_URL = 'http://localhost:8000/refresh/';
const GET_USERS_URL = 'http://localhost:8000/users/';
const CREATE_BLOG_URL = 'http://localhost:8000/add-blog/';

async function Login(data) {
    try {
        const res = await axios.post(LOGIN_URL, data)
        if(res.status == 200) {
            console.log(res.data);
            SetAccessToken(res.data.access);
            SetRefreshToken(res.data.refresh);
        }
        // Dont forget to return
        return res.data;
    }
    catch (err) {
        console.log(err);
        window.location = "/login";
    }
}   

async function Register(data) {
    const res = await axios.post(REGISTER_URL, data)
    if (res.data.msg == "Create user is failed") {
        console.log(res.data);
        alert('User Creation failed');
        window.location = "/register";
    } else {
        console.log(res.data);
    }
    // Dont forget to return
    return res.data;
}

async function GetAllBlogs() {
    const res = await axios.get(ALL_BLOGS_URL)
    return res.data;
}

async function GetUserBlogs() {
    try {
        const res = await axios.get(USER_BLOGS_URL, {
            headers: {
                Authorization: `Bearer ${GetAccessToken()}`
            }
        })
        console.log('get user blogs success response - ', res.data);
        return res.data;
    } catch (err) {
        console.log('get user blogs error response - ', err);
        if (err.response.status == 401) {
            GetAccessTokenFromRefreshToken()
            .then(res => console.log('Response with new token', res));
            GetUserBlogs();
        }
    }
}

async function GetUsers() {
    const res = await axios.get(GET_USERS_URL);
    return res.data;
}

async function EditBlog(blog_id, formData) {
    const editBlogUrl = `http://localhost:8000/blog/${blog_id}/`
    const header_config = {headers: {
                            Authorization: `Bearer ${GetAccessToken()}`,
                            'content-type': 'multipart/form-data' }}
    
    try {
        const res = await axios.put(editBlogUrl, formData, header_config)
        console.log('Updated blog successfully - ',res.data);
        return res.data
    } catch(err) {
        if(err.response.status == 401) {
            GetAccessTokenFromRefreshToken();
            EditBlog(blog_id, formData);   
        }
    }
}

async function CreateBlog(formData) {
    const header_config = {headers: {
        Authorization: `Bearer ${GetAccessToken()}`,
        'content-type': 'multipart/form-data',
    }}
    try {
        const res = await axios.post(CREATE_BLOG_URL, formData, header_config)
        console.log('Create blog Response - ',res.data);
        return res.data
    } catch(err) {
        if(err.response.status == 401) {
            GetAccessTokenFromRefreshToken();
        }
        CreateBlog(formData);
    }
}

async function DeleteBlog(blogId) {
    const url = `http://localhost:8000/blog/${blogId}/`
    const header_config = {headers: {Authorization: `Bearer ${GetAccessToken()}`}}
    try {
        const res = await axios.delete(url, header_config)
        console.log('Delete Blog Response - ', res.data);
        return res.data;
    } catch(err) {
        console.log('Delete Blog request failed with error - ', err)
        if(err.response.status == 401) {
            GetAccessTokenFromRefreshToken();
            DeleteBlog(blogId);
        }
    }
}

async function GetAccessTokenFromRefreshToken() {
    console.log('Get new Access Token from Server -');
    const res = await axios.post(REFRESH_TOKEN_URL, {
        refresh: GetRefreshToken()
    })
    console.log('After RT', res, res.data);
    SetAccessToken(res.data.access);
}

function GetAccessToken() {
    return localStorage.getItem('access_token');
}

function GetRefreshToken() {
    return localStorage.getItem('refresh_token');
}

function SetAccessToken(token) {
    localStorage.setItem('access_token', token)
}

function SetRefreshToken(token) {
    localStorage.setItem('refresh_token', token)
}

const Auth = {
    GetAccessToken,
    GetRefreshToken,
    SetAccessToken,
    SetRefreshToken,
    Login,
    Register,
    GetAllBlogs,
    GetUserBlogs,
    GetUsers,
    EditBlog,
    CreateBlog,
    DeleteBlog,
}

export default Auth;