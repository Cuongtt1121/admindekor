import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../services/ProductService';
import './ProductComponent.css';

const ProductComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      document.title = 'Edit Product';
      const fetchProduct = async () => {
        try {
          const product = await getProductById(id);
          setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stockQuantity,
          });
        } catch (error) {
          setError('Failed to fetch product details');
        }
      };
      fetchProduct();
    } else {
      document.title = 'Add New Product';
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stock),
      };

      if (id) {
        await updateProduct(id, productData);
        alert('Product updated successfully!');
      } else {
        await createProduct(productData);
        alert('Product created successfully!');
      }
      navigate('/products');
    } catch (error) {
      setError('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(null);
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
          <input 
            type="text" 
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Enter category" 
            required 
          />
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
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Enter stock quantity" 
            required 
          />
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