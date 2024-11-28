// src/components/ProductList.js
import React, { useEffect, useState } from 'react';

const ProductList = ({ onDelete }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:5001/api/products');
        const data = await response.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5001/api/products/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            onDelete(id);
            fetchProducts(); // Refresh the product list
        } else {
            console.error('Failed to delete product');
        }
    };

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - Quantity: {product.quantity} - Price: ${product.price}
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;