const apiUrl = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products';
let currentPage = 1;
const limit = 10;

document.addEventListener('DOMContentLoaded', () => { //This ensures the code inside the function runs only after the entire HTML document is loaded and ready.
  fetchProducts(currentPage);

  document.getElementById('previous').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchProducts(currentPage);
    }
  });

  document.getElementById('next').addEventListener('click', () => {
    currentPage++;
    fetchProducts(currentPage);
  });

  updateCartCount();
});

async function fetchProducts(page) {
  const response = await fetch(`${apiUrl}?limit=${limit}&page=${page}`);
  const data = await response.json();

  const mainItems = document.getElementById('main_items');
  mainItems.innerHTML = '';

  data.data.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
      <h3>${item.title}</h3>
      <img src="${item.image}" alt="${item.title}">
      <p>Price: $${item.price}</p>
      <button class="add_to_cart" data-id="${item.id}">Add to Cart</button>
    `;
    mainItems.appendChild(itemDiv);
  });

  document.querySelectorAll('.add_to_cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });

  updateButtons(data.totalPages);
}

function addToCart(event) {
  const itemId = event.target.dataset.id;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(itemId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart_count').textContent = cart.length;
}

function updateButtons(totalPages) {
  document.getElementById('previous').disabled = currentPage === 1;
  document.getElementById('next').disabled = currentPage === totalPages;
}
