import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';
import './Dashboard.css'; // Import the CSS file

// Import images
import kImage from '../image/k.jpeg';
import lImage from '../image/l.jpeg';
import sImage from '../image/s.jpeg';
import RImage from '../image/R.jpeg';
import mImage from '../image/m.jpeg';
import uImage from '../image/u.jpeg';
import image from '../image/image.jpg';

const images = [kImage, lImage, sImage, RImage, mImage, uImage, image];

const Dashboard = ({ products }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Change this according to your storage method
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="dashboard" style={{ padding: '20px' }}>
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <nav id="targetdash">
          <Link to="/products" className="nav-link">Product Management</Link>
          <Link to="/users" className="nav-link">User Management</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>

      <section className="product-images" style={{ marginTop: '20px' }}>
        <h3>Featured Products</h3>
        <div className="image-gallery">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Featured product ${index + 1}`} className="product-image" />
          ))}
        </div>
      </section>

      <section className="products-added" style={{ marginTop: '20px' }}>
        <h3>Products Added</h3>
        {products.length === 0 ? (
          <p>No products have been added yet.</p>
        ) : (
          <div>
            <ProductBarChart products={products} />
            <table className="product-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${formatPrice(product.price)}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;