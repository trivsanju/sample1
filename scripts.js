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

    // Display products
    const productList = document.getElementById('productList');
    if (productList) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `<h3>${product.name}</h3><p>${product.description}</p><p>Price: $${product.price}</p>`;
            productList.appendChild(productDiv);
        });
    }

    // Add product
    const addProductButton = document.getElementById('addProductButton');
    if (addProductButton) {
        addProductButton.addEventListener('click', () => {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (loggedInUser && loggedInUser.role === 'farmer') {
                const name = prompt('Product name:');
                const description = prompt('Product description:');
                const price = prompt('Product price:');

                if (name && description && price) {
                    let products = JSON.parse(localStorage.getItem('products')) || [];
                    products.push({ name, description, price });
                    localStorage.setItem('products', JSON.stringify(products));
                    location.reload();
                }
            } else {
                alert('Only farmers can add products.');
            }
        });
    }
});
