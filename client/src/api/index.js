import axios from 'axios';

/*
const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id,postData) => axios.patch(`${url}/${id}`, postData);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
*/

//  Restructuring

const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts',newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id)  => API.delete(`/posts/${id}`);

// routes for sign in and sign up

export const signIn = (formData) => API.post('/users/signin', formData);

export const signUp = (formData) => API.post('/users/signup', formData);
