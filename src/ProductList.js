const handleAddProduct = (e) => {
  e.preventDefault();

  // Input validation
  if (!name || !description || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
      setMessage('Please fill in all fields with valid values.');
      return;
  }

  const newProduct = { 
    name, 
    description, 
    price: parseFloat(price), 
    quantity: parseInt(quantity) 
  };

  // Attempt to add the product
  const success = addProduct(currentUser, newProduct);
  
  if (success) {
      // Update the products state directly without fetching again
      setProducts(prevProducts => [...prevProducts, newProduct]);
      setMessage('Product added successfully!'); // Success message
  } else {
      setMessage('Error adding product. Please try again.'); 
  }

  // Reset the input fields
  setName(''); 
  setDescription(''); 
  setPrice(''); 
  setQuantity('');
};