import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance với config mặc định
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Function để thêm sản phẩm mới
export const createProduct = async (productData) => {
  try {
    // Log request data để debug
    console.log('Sending product data:', productData);

    const response = await axiosInstance.post('/products', productData);
    
    // Log response data
    console.log('Server response:', response.data);
    
    return response.data;
  } catch (error) {
    // Xử lý các loại lỗi khác nhau
    if (error.response) {
      // Lỗi từ server (status code không phải 2xx)
      console.error('Server error:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to create product');
    } else if (error.request) {
      // Không nhận được response từ server
      console.error('No response from server:', error.request);
      throw new Error('Server is not responding');
    } else {
      // Lỗi khi setup request
      console.error('Request error:', error.message);
      throw new Error('Error sending request');
    }
  }
};

// Function để lấy danh sách sản phẩm
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function để lấy chi tiết một sản phẩm
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Function để cập nhật sản phẩm
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    // Log URL đầy đủ để debug
    const fullUrl = `${API_BASE_URL}/products/${id}`; // Thay đổi từ products thành product
    console.log('Delete URL:', fullUrl);

    const response = await axiosInstance.delete(`/products/${id}`); // Thay đổi endpoint
    
    // Log response
    console.log('Delete response:', response);
    
    return response.data;
  } catch (error) {
    // Log chi tiết lỗi
    console.error('Delete request failed:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};
