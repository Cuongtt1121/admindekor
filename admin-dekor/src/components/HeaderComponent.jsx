import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComponent.css';

const HeaderComponent = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="logo">
            Dekor Admin
          </Link>
        </div>

        <div className="navbar-menu">
          <Link to="/dashboard" className="nav-item">
            <i className="fas fa-chart-line"></i>
            Dashboard
          </Link>
          
          <Link to="/products" className="nav-item">
            <i className="fas fa-box"></i>
            Products
          </Link>
          
          <Link to="/categories" className="nav-item">
            <i className="fas fa-list"></i>
            Categories
          </Link>
          
          <Link to="/orders" className="nav-item">
            <i className="fas fa-shopping-cart"></i>
            Orders
          </Link>
          
          <Link to="/customers" className="nav-item">
            <i className="fas fa-users"></i>
            Customers
          </Link>
        </div>

        <div className="navbar-end">
          <div className="user-profile">
            <img src="/avatar-placeholder.png" alt="User Avatar" className="avatar" />
            <span className="username">Admin</span>
          </div>
          <button className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
