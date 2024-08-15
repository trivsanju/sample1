document.addEventListener('DOMContentLoaded', () => {
  // Handle registration
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('newUsername').value;
      const password = document.getElementById('newPassword').value;
      const role = document.getElementById('role').value;

      let users = JSON.parse(localStorage.getItem('users')) || [];
      users.push({ username, password, role });
      localStorage.setItem('users', JSON.stringify(users));
      alert('User registered!');
      window.location.href = 'login.html';
    });
  }

  // Handle login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'products.html';
      } else {
        alert('Invalid credentials');
      }
    });
  }

  // Display products in a 3x3 grid
  const productList = document.getElementById('productList');
  if (productList) {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    const productGrid = document.createElement('div');
    productGrid.classList.add('product-grid');

    const productsPerRow = 3;
    const rows = Math.ceil(products.length / productsPerRow);

    for (let i = 0; i < rows; i++) {
      const row = document.createElement('div');
      row.classList.add('product-row');

      for (let j = 0; j < productsPerRow; j++) {
        const productIndex = i * productsPerRow + j;
        if (productIndex < products.length) {
          const product = products[productIndex];
          const productDiv = document.createElement('div');
          productDiv.classList.add('product');
          productDiv.innerHTML = `<h3><span class="math-inline">\{product\.name\}</h3\><p\></span>{product.description}</p><p>Price: $${product.price}</p>`;
          row.appendChild(productDiv);
        } else {
          const emptyDiv = document.createElement('div');
          emptyDiv.classList.add('product');
          row.appendChild(emptyDiv);
        }
      }

      productGrid.appendChild(row);
    }
