// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard.js';
import ProductManagement from './Components/ProductManagement';
import StockManagement from './Components/StockManagement';
import UserManagement from './Components/UserManagement';
import Login from './Components/Login';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch products when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetch('http://localhost:5000/api/products')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => {
          console.error('There was an error fetching products!', error);
        });
    }
  }, [isAuthenticated]);

  // Handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="container">
        <h1 className="title">Wings Cafe Inventory System</h1>
        
        {isAuthenticated && (
          <nav>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/product-management">Product Management</Link></li>
              <li><Link to="/user-management">User Management</Link></li>
              <li><Link to="/stock-management">Stock Management</Link></li>
              <li>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </nav>
        )}
        
        <Routes>
          <Route 
            path="/" 
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? 
              <Dashboard 
                products={products} 
              /> : <Navigate to="/" />} 
          />
          <Route 
            path="/product-management" 
            element={isAuthenticated ? 
              <ProductManagement 
                products={products} 
                setProducts={setProducts}
              /> : <Navigate to="/" />} 
          />
          <Route 
            path="/user-management" 
            element={isAuthenticated ? <UserManagement /> : <Navigate to="/" />} 
          />
          <Route 
            path="/stock-management" 
            element={isAuthenticated ? 
              <StockManagement 
                products={products} 
                setProducts={setProducts} 
              /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
