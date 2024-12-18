import React from 'react';
import './FooterComponent.css';

const FooterComponent = () => {
  return (
    <footer className="footer">
      
      <div className="footer-bottom">
        <p>&copy; 2024 Dekor Admin. All rights reserved.</p>
        <div className="social-links">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;