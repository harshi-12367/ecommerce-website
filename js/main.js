// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const searchBtn = document.getElementById('search-btn');
const closeSearch = document.querySelector('.close-search');
const searchBoxContainer = document.querySelector('.search-box-container');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPrice = document.querySelector('.total-price');

// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 99.99,
        oldPrice: 129.99,
        image: "images/wireless.png",
        rating: 4,
        badge: "Sale"
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 199.99,
        oldPrice: 249.99,
        image: "images/smart watch.jpg",
        rating: 5,
        badge: "Popular"
    },
    {
        id: 3,
        title: "Bluetooth Speaker",
        price: 79.99,
        image: "images/bluetooth.jpg",
        rating: 4
    },
    {
        id: 4,
        title: "Laptop Backpack",
        price: 49.99,
        image: "images/Laptop Backpack.jpg",
        rating: 3
    },
    {
        id: 5,
        title: "Fitness Tracker",
        price: 59.99,
        oldPrice: 79.99,
        image: "images/Fitness Tracker.jpeg",
        rating: 4,
        badge: "Sale"
    },
    {
        id: 6,
        title: "Wireless Earbuds",
        price: 129.99,
        image: "images/Wireless Earbuds.jpg",
        rating: 5
    },
    {
        id: 7,
        title: "Portable Charger",
        price: 29.99,
        image: "images/Portable Charger.jpg",
        rating: 4
    },
    {
        id: 8,
        title: "Gaming Mouse",
        price: 45.99,
        oldPrice: 59.99,
        image: "images/Gaming Mouse.jpeg",
        rating: 4,
        badge: "Sale"
    }
];

// Cart array
let cart = [];

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Search box toggle
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchBoxContainer.classList.add('active');
});

closeSearch.addEventListener('click', () => {
    searchBoxContainer.classList.remove('active');
});

// Cart sidebar toggle
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        let badge = '';
        if (product.badge) {
            badge = `<span class="product-badge">${product.badge}</span>`;
        }
        
        let oldPrice = '';
        if (product.oldPrice) {
            oldPrice = `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>`;
        }
        
        let ratingStars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= product.rating) {
                ratingStars += '<i class="fas fa-star"></i>';
            } else {
                ratingStars += '<i class="far fa-star"></i>';
            }
        }
        
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}">
                ${badge}
                <div class="product-wishlist">
                    <i class="far fa-heart"></i>
                </div>
            </div>
            <div class="product-content">
                <div class="product-rating">
                    ${ratingStars}
                </div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <div>
                        <span class="price">$${product.price.toFixed(2)}</span>
                        ${oldPrice}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(button.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification();
}

// Update cart function
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <i class="fas fa-times remove-item" data-id="${item.id}"></i>
            `;
            
            cartItems.appendChild(cartItem);
        });
    }
    
    // Update total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(button.getAttribute('data-id'));
            const isPlus = button.classList.contains('plus');
            updateQuantity(productId, isPlus);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(button.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Update quantity function
function updateQuantity(productId, isPlus) {
    const item = cart.find(item => item.id === productId);
    
    if (isPlus) {
        item.quantity += 1;
    } else {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
    }
    
    updateCart();
}

// Remove from cart function
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Show cart notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Initialize the app
function init() {
    displayProducts();
    updateCart();
}

// Run the app
init();