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

// Thêm các service functions mới
export const SizeService = {
  getAllSizes: async () => {
    try {
      const response = await axiosInstance.get('/sizes');
      console.log('Sizes response:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching sizes:', error);
      return [];
    }
  }
};

export const ColorService = {
  getAllColors: async () => {
    try {
      const response = await axiosInstance.get('/colors');
      console.log('Colors response:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching colors:', error);
      return [];
    }
  }
};

export const MaterialService = {
  getAllMaterials: async () => {
    try {
      const response = await axiosInstance.get('/materials');
      console.log('Materials response:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching materials:', error);
      return [];
    }
  }
};

export const RoomService = {
  getAllRooms: async () => {
    try {
      const response = await axiosInstance.get('/rooms');
      console.log('Rooms response:', response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching rooms:', error);
      return [];
    }
  }
};

// Function để thêm sản phẩm mới
export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/product/add', productData);
    return response.data;
  } catch (error) {
    console.error('Create product error:', {
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

// Function để lấy danh sách sản phẩm
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get('/product/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function để lấy chi tiết một sản phẩm
export const getProductById = async (id) => {
  try {
    console.log('Fetching product with ID:', id);
    const response = await axiosInstance.get(`/product/${id}`);
    console.log('Product details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: `/product/${id}`
    });
    throw new Error('Failed to fetch product details');
  }
};

// Function để cập nhật sản phẩm
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`/product/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/product/${id}`);
    console.log('Delete response:', response);
    return response.data;
  } catch (error) {
    console.error('Delete request failed:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

// Add CategoryService functions
export const CategoryService = {
  getAllCategories: async () => {
    try {
      const response = await axiosInstance.get('/category');
      console.log('Categories response:', response.data);
      // Đảm bảo trả về một mảng
      return Array.isArray(response.data) ? response.data : response.data.content || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
};
