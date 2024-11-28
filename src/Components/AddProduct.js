import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        name,
        price,
        quantity,
      });

      // Call the onAddProduct prop to update the UI
      onAddProduct({ id: response.data.productId, name, price, quantity });

      // Reset form fields
      setName('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      console.error('There was an error adding the product!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;