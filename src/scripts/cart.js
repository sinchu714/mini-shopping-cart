document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    document.getElementById('checkout').addEventListener('click', checkout);
    updateCartCount();
  });
  
  function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';
  
    cart.forEach(itemId => {
      // Assuming we have a function to fetch item details by ID (not provided in this example)
      const item = fetchItemDetails(itemId);
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');
      itemDiv.innerHTML = `
        <h3>${item.title}</h3>
        <img src="${item.image}" alt="${item.title}">
        <p>Price: $${item.price}</p>
        <button class="remove" data-id="${item.id}">Remove</button>
      `;
      itemsContainer.appendChild(itemDiv);
    });
  
    document.querySelectorAll('.remove').forEach(button => {
      button.addEventListener('click', removeFromCart);
    });
  }
  
  function removeFromCart(event) {
    const itemId = event.target.dataset.id;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
  }
  
  function checkout() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    if (name && address) {
      alert(`${name}, your order is successful!`);
      localStorage.removeItem('cart');
      updateCartCount();
      displayCartItems();
    } else {
      alert('Please provide both name and address.');
    }
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart_count').textContent = cart.length;
  }
  
  function fetchItemDetails(itemId) {
    // Mock function to fetch item details by ID
    // In a real application, you would fetch the item details from the server
    return {
      id: itemId,
      title: `Item ${itemId}`,
      image: `https://via.placeholder.com/150`,
      price: (Math.random() * 100).toFixed(2)
    };
  }
  