import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance với config mặc định
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Lấy danh sách users
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/user');
    console.log('Users response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error('Failed to fetch users');
  }
};

// Lấy thông tin một user
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user details');
  }
};

// Thêm user mới
export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/user', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

// Cập nhật user
export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

// Xóa user
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};

// Interceptor để xử lý token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Xử lý khi token hết hạn
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
