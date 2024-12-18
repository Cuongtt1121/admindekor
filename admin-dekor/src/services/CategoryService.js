import axios from 'axios';
import { API_BASE_URL } from '../config/config';

const CategoryService = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default CategoryService; 