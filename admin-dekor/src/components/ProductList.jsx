import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/ProductService';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        setError('Failed to delete product');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Products</h2>
        <button onClick={() => navigate('/products/add')} className="add-button">
          Add New Product
        </button>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Size</th>
              <th>Color</th>
              <th>Material</th>
              <th>Rooms</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category?.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <span className={`status-badge ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </td>
                <td>{product.size?.name || 'N/A'}</td>
                <td>
                  <div className="color-info">
                    <span 
                      className="color-dot" 
                      style={{ backgroundColor: product.color?.hexCode }}
                    ></span>
                    {product.color?.name || 'N/A'}
                  </div>
                </td>
                <td>{product.material?.name || 'N/A'}</td>
                <td>
                  <div className="rooms-list">
                    {product.rooms?.map(room => (
                      <span key={room.id} className="room-tag">
                        {room.name}
                      </span>
                    )).slice(0, 2) || 'N/A'}
                    {product.rooms?.length > 2 && (
                      <span className="room-tag more">
                        +{product.rooms.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => handleEdit(product.id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList; 