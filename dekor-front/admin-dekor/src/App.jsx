import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ProductList from './components/ProductList';
import ProductComponent from './components/ProductComponent';
import FooterComponent from './components/FooterComponents';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <HeaderComponent />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<div>Welcome to Dashboard</div>} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<ProductComponent />} />
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
            <Route path="/categories" element={<div>Categories Page</div>} />
            <Route path="/orders" element={<div>Orders Page</div>} />
            <Route path="/customers" element={<div>Customers Page</div>} />
            <Route path="/products/update/:id" element={<ProductComponent />} />
            <Route path="/products/edit/:id" element={<ProductComponent />} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
