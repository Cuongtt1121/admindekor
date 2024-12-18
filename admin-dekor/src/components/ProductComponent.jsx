import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createProduct, getProductById, updateProduct, CategoryService, SizeService, ColorService, MaterialService, RoomService } from '../services/ProductService';
import { ImageService } from '../services/ImageService';
import './ProductComponent.css';
import axios from 'axios';

const ProductComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    status: 'AVAILABLE',
    images: [],
    imagePreviews: [],
    size: {
      id: '',
      name: ''
    },
    color: {
      id: '',
      name: '',
      hexCode: ''
    },
    material: {
      id: '',
      name: ''
    },
    rooms: [],
    weight: 0,
    rating: 0,
    sale: 0,
    type: null
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    // Kiểm tra token khi component mount
    const token = localStorage.getItem('token');
    console.log('Current auth state:', {
      hasToken: !!token,
      tokenValue: token
    });
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await CategoryService.getAllCategories();
        console.log('Fetched categories:', categoriesData);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Failed to fetch categories');
        setCategories([]); // Set empty array on error
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      document.title = 'Edit Product';
      const fetchProduct = async () => {
        try {
          console.log('Fetching product with ID:', id);
          const product = await getProductById(id);
          console.log('Received product data:', product);
          
          if (!product) {
            throw new Error('Product not found');
          }

          setFormData({
            name: product.name || '',
            category: product.category?.id || '',
            price: product.price || '',
            quantity: product.quantity || '',
            description: product.description || '',
            status: product.status || 'AVAILABLE',
            images: [],
            imagePreviews: product.images || [],
            size: {
              id: product.size?.id || '',
              name: product.size?.name || ''
            },
            color: {
              id: product.color?.id || '',
              name: product.color?.name || '',
              hexCode: product.color?.hexCode || ''
            },
            material: {
              id: product.material?.id || '',
              name: product.material?.name || ''
            },
            rooms: product.rooms || [],
            weight: product.weight || 0,
            rating: product.rating || 0,
            sale: product.sale || 0,
            type: product.type
          });

        } catch (error) {
          console.error('Error in fetchProduct:', error);
          setError(error.message || 'Failed to fetch product details');
        }
      };
      fetchProduct();
    } else {
      document.title = 'Add New Product';
    }
  }, [id]);

  useEffect(() => {
    if (formData.quantity !== '') {
      const stockQuantity = parseInt(formData.quantity);
      setFormData(prevState => ({
        ...prevState,
        status: stockQuantity > 0 ? 'AVAILABLE' : 'OUT_OF_STOCK'
      }));
    }
  }, [formData.quantity]);

  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    const previews = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files],
      imagePreviews: [...prev.imagePreviews, ...previews]
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (files) => {
    try {
      console.log('Files to upload:', files);
      
      if (!files || files.length === 0) {
        console.log('No files to upload');
        return [];
      }

      const uploadedImages = await ImageService.uploadImages(files);
      console.log('Upload successful:', uploadedImages);
      return uploadedImages;
    } catch (error) {
      console.error('Upload error details:', error);
      throw new Error(`Failed to upload images: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrls = [];
      if (formData.images.length > 0) {
        const uploadedImages = await handleImageUpload(formData.images);
        imageUrls = uploadedImages.map(img => img.url);
      }

      const productData = {
        name: formData.name,
        categoryId: parseInt(formData.category),
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        description: formData.description,
        status: formData.status,
        images: imageUrls,
        size: {
          id: parseInt(formData.size.id),
          name: formData.size.name
        },
        color: {
          id: parseInt(formData.color.id),
          name: formData.color.name,
          hexCode: formData.color.hexCode
        },
        material: {
          id: parseInt(formData.material.id),
          name: formData.material.name
        },
        rooms: formData.rooms,
        weight: parseFloat(formData.weight),
        rating: formData.rating,
        sale: formData.sale,
        type: formData.type
      };
      
      console.log('Submitting product data:', productData);

      if (id) {
        await updateProduct(id, productData);
        alert('Product updated successfully!');
      } else {
        await createProduct(productData);
        alert('Product created successfully!');
      }
      navigate('/products');
    } catch (error) {
      console.error('Error details:', error);
      setError(error.message || 'Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (name === 'rooms') {
      const selectedRooms = Array.from(e.target.selectedOptions, option => ({
        id: parseInt(option.value),
        name: option.text
      }));
      setFormData(prev => ({
        ...prev,
        rooms: selectedRooms
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel? All changes will be lost.');
    if (confirmCancel) {
      navigate('/products');
    }
  };
  

  return (
    <div className="product-form-container">
      <h2>{id ? 'Edit Product' : 'Add New Product'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {Array.isArray(categories) && categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Price</label>
          <input 
            type="number" 
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Stock</label>
          <input 
            type="number" 
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Enter stock quantity" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          {formData.status}
          
        </div>
        
        <div className="form-group">
          <label>Product Images</label>
          <input 
            type="file"
            multiple    
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
          
          <div className="image-preview-container">
            {formData.imagePreviews.map((preview, index) => (
              <div key={index} className="image-preview-item">
                <img 
                  src={preview} 
                  alt={`Preview ${index + 1}`} 
                  className="image-preview"
                />
                <button 
                  type="button" 
                  className="remove-image"
                  onClick={() => handleRemoveImage(index)}
                >
                  ×
                </button> 
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Size</label>
            {formData.size.name}
          </div>

          <div className="form-group">
            <label>Color</label>
            {formData.color.name}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Material</label>
            {formData.material.name}
          </div>

          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Enter weight"
              step="0.1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Rooms</label>
          <div className="rooms-checkbox-group">
            {formData.rooms.map((room, index) => 
              <option key={index} value="room.id">{room.name}</option>
            )}
          </div>
        </div>
        
        <div className="form-buttons">
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : id ? 'Update Product' : 'Save Product'}
          </button>
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductComponent;