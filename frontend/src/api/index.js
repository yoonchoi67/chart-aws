import axios from 'axios';

const url = 'http://localhost:3001';
// const HOST = window.location.hostname + ':3001'

export const fetchPosts = () => axios.get(`${url}/getT`);
// export const fetchPosts = () => axios.get(`${HOST}/getT`);


// export const createPost = (newPost) => axios.post(url, newPost);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
