import axios from 'axios';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://wanderers-blog-api.herokuapp.com/api/v1/'
    : 'http://localhost:3000/api/v1';

const API = axios.create({
  baseURL: 'https://wanderers-blog-api.herokuapp.com/api/v1/',
});

// Auth
export const login = (loginUser) => API.post('/auth/login', loginUser);
export const register = (registerUser) =>
  API.post('/auth/register', registerUser);
export const forgotPassword = (resetUser) =>
  API.post('/auth/forgot-password', resetUser);
export const resetPassword = (resetUser) =>
  API.post('/auth/reset-password', resetUser);
export const verifyEmail = (formData) =>
  API.post('/auth/verify-email', formData);
export const isLoggedIn = () => API.get('/auth/isLoggedIn');
export const logout = () => API.delete('/auth/logout');

// ========== User ==========
export const deleteUser = (id) => API.delete('/user/' + id);
export const getUser = (id) => API.get('/user/' + id);
export const editUser = (id, updatedUser) =>
  API.patch('/user/' + id, updatedUser);

// ========== Blogs ==========
export const deleteBlog = (id) => API.delete('/blogs/' + id);
export const getAllBlogs = (searchText) =>
  API.get('/blogs?search=' + searchText);
export const getBlog = (id) => API.get('/blogs/' + id);
export const createBlog = (blogData) => API.post('/blogs/create', blogData);
