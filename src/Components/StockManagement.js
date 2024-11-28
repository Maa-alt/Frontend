import React, { useState } from 'react';

const StockManagement = ({ products, setProducts, onStockUpdate }) => {
  const [stockLevels, setStockLevels] = useState({});
  const [stockTransactions, setStockTransactions] = useState([]);
  const [transaction, setTransaction] = useState({ productId: '', quantity: '', type: 'add' });
  const [newProduct, setNewProduct] = useState({ id: '', name: '' });

  const handleAddProduct = () => {
    if (!newProduct.id || !newProduct.name) {
      alert("Both Product ID and Name are required.");
      return;
    }
    setProducts((prev) => [...prev, newProduct]); // Add to products list
    setStockLevels(prev => ({ ...prev, [newProduct.id]: 0 })); // Initialize stock level to 0
    setNewProduct({ id: '', name: '' }); // Reset input fields
  };

  const handleAddTransaction = () => {
    const qty = parseInt(transaction.quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      alert("Quantity must be a positive number");
      return;
    }

    const updatedStockLevels = { ...stockLevels };
    if (transaction.type === 'add') {
      updatedStockLevels[transaction.productId] = (updatedStockLevels[transaction.productId] || 0) + qty;
    } else if (transaction.type === 'deduct') {
      updatedStockLevels[transaction.productId] = Math.max((updatedStockLevels[transaction.productId] || 0) - qty, 0);
    }

    setStockLevels(updatedStockLevels);
    setStockTransactions([...stockTransactions, transaction]);
    setTransaction({ productId: '', quantity: '', type: 'add' });

    // Notify parent component about stock level update
    if (typeof onStockUpdate === 'function') {
      onStockUpdate(updatedStockLevels);
    } else {
      console.error('onStockUpdate is not a function');
    }
  };

  return (
    <div>
      <h2>Stock Management</h2>
      
      <h3>Add Product</h3>
      <input
        type="text"
        placeholder="Product ID"
        value={newProduct.id}
        onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <button onClick={handleAddProduct}>Add Product</button>

      <h3>Stock Transaction</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleAddTransaction(); }}>
        <select
          value={transaction.productId}
          onChange={(e) => setTransaction({ ...transaction, productId: e.target.value })}
        >
          <option value="" disabled>Select a Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={transaction.quantity}
          onChange={(e) => setTransaction({ ...transaction, quantity: e.target.value })}
        />
        <select
          value={transaction.type}
          onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
        >
          <option value="add">Add Stock</option>
          <option value="deduct">Deduct Stock</option>
        </select>
        <button type="button" onClick={handleAddTransaction}>Add Transaction</button>
      </form>

      <h3 style={{ fontWeight: 'bold', color: 'black' }}>Current Stock Levels</h3>
      <ul style={{ color: 'black', fontWeight: 'bold' }}>
        {Object.entries(stockLevels).map(([productId, quantity]) => (
          <li key={productId}>
            {products.find(product => product.id === productId)?.name}: {quantity}
          </li>
        ))}
      </ul>

      <h3 style={{ fontWeight: 'bold', color: 'black' }}>Transaction History</h3>
      <ul style={{ color: 'black', fontWeight: 'bold' }}>
        {stockTransactions.map((txn, index) => (
          <li key={index}>
            {products.find(product => product.id === txn.productId)?.name} - {txn.quantity} ({txn.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockManagement;