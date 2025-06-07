document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI elements
    const shopProductGrid = document.getElementById('shop-product-grid');
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const priceFilterBtn = document.querySelector('.filter-btn');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const sortSelect = document.querySelector('.sort-by select');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const tagLinks = document.querySelectorAll('.tags a');
    const paginationLinks = document.querySelectorAll('.pagination a');

    // Sample product data (in a real app, this would come from an API)
    const products = [
        {
            id: 1,
            name: 'Traditional Handmade Rug',
            price: 89.99,
            oldPrice: 120.00,
            category: 'Traditional',
            tags: ['sale', 'new'],
            rating: 4.5,
            reviews: 24,
            image: 'src/product1.jpeg',
            badge: 'Sale'
        },
        {
            id: 2,
            name: 'Designer Silk Saree',
            price: 129.99,
            oldPrice: 150.00,
            category: 'Fashion',
            tags: ['trending', 'bestseller'],
            rating: 4.8,
            reviews: 42,
            image: 'src/traditional.jpg',
            badge: 'Popular'
        },
        {
            id: 3,
            name: 'Handcrafted Wooden Table',
            price: 249.99,
            oldPrice: null,
            category: 'Home & Garden',
            tags: ['new'],
            rating: 4.2,
            reviews: 15,
            image: 'src/product3.jpg',
            badge: null
        },
        {
            id: 4,
            name: 'Organic Face Cream',
            price: 29.99,
            oldPrice: 39.99,
            category: 'Beauty',
            tags: ['sale'],
            rating: 4.7,
            reviews: 36,
            image: 'src/product4.png',
            badge: 'Sale'
        },
        {
            id: 5,
            name: 'Wireless Headphones',
            price: 79.99,
            oldPrice: 99.99,
            category: 'Electronics',
            tags: ['sale', 'limited'],
            rating: 4.3,
            reviews: 28,
            image: 'images/Wireless Earbuds.jpg',
            badge: '30% Off'
        },
        {
            id: 6,
            name: 'Yoga Mat',
            price: 34.99,
            oldPrice: null,
            category: 'Sports',
            tags: ['new'],
            rating: 4.6,
            reviews: 19,
            image: 'src/product6.jpeg',
            badge: null
        }
    ];

    // Display products
    function displayProducts(productsToDisplay) {
        shopProductGrid.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            shopProductGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let badgeHTML = '';
            if (product.badge) {
                badgeHTML = `<div class="product-badge">${product.badge}</div>`;
            }
            
            let oldPriceHTML = '';
            if (product.oldPrice) {
                oldPriceHTML = `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>`;
            }
            
            const ratingStars = generateRatingStars(product.rating);
            
            productCard.innerHTML = `
                ${badgeHTML}
                <div class="product-thumb">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <button class="quick-view" data-id="${product.id}"><i class="fas fa-eye"></i></button>
                        <button class="add-to-wishlist" data-id="${product.id}"><i class="fas fa-heart"></i></button>
                        <button class="add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i></button>
                    </div>
                </div>
                <div class="product-details">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${oldPriceHTML}
                    </div>
                    <div class="product-rating">
                        ${ratingStars}
                        <span>(${product.reviews})</span>
                    </div>
                </div>
            `;
            
            shopProductGrid.appendChild(productCard);
        });
        
        // Add event listeners to new product buttons
        addProductEventListeners();
    }

    // Generate rating stars HTML
    function generateRatingStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }

    // Add event listeners to product buttons
    function addProductEventListeners() {
        // Quick view
        document.querySelectorAll('.quick-view').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                openQuickView(product);
            });
        });
        
        // Add to wishlist
        document.querySelectorAll('.add-to-wishlist').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToWishlist(productId);
            });
        });
        
        // Add to cart
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }

    // Quick view modal
    function openQuickView(product) {
        // In a real app, this would open a modal with more product details
        alert(`Quick view: ${product.name}\nPrice: $${product.price.toFixed(2)}\nRating: ${product.rating}/5`);
    }

    // Add to wishlist
    function addToWishlist(productId) {
        // In a real app, this would add to wishlist in local storage or via API
        const product = products.find(p => p.id === productId);
        alert(`Added to wishlist: ${product.name}`);
    }

    // Add to cart
    function addToCart(productId) {
        // In a real app, this would update the cart in local storage or via API
        const product = products.find(p => p.id === productId);
        
        // Update cart count in header
        const cartCount = document.querySelector('.cart-count');
        let count = parseInt(cartCount.textContent) || 0;
        count++;
        cartCount.textContent = count;
        
        alert(`Added to cart: ${product.name}`);
    }

    // Filter products by price
    function filterProductsByPrice(min, max) {
        return products.filter(product => {
            return product.price >= min && product.price <= max;
        });
    }

    // Sort products
    function sortProducts(productsToSort, sortBy) {
        switch(sortBy) {
            case 'price-low':
                return [...productsToSort].sort((a, b) => a.price - b.price);
            case 'price-high':
                return [...productsToSort].sort((a, b) => b.price - a.price);
            case 'newest':
                // Assuming newer products have higher IDs
                return [...productsToSort].sort((a, b) => b.id - a.id);
            case 'popular':
                return [...productsToSort].sort((a, b) => b.reviews - a.reviews);
            case 'rating':
                return [...productsToSort].sort((a, b) => b.rating - a.rating);
            default:
                return productsToSort;
        }
    }

    // Filter products by category
    function filterProductsByCategory(category) {
        if (category === 'all') return products;
        return products.filter(product => product.category === category);
    }

    // Filter products by tag
    function filterProductsByTag(tag) {
        return products.filter(product => product.tags.includes(tag));
    }

    // Initialize price range slider (using noUiSlider in a real app)
    function initPriceRangeSlider() {
        // In a real app, you would use a library like noUiSlider
        minPriceInput.value = 0;
        maxPriceInput.value = 500;
    }

    // Event listeners
    gridViewBtn.addEventListener('click', function() {
        this.classList.add('active');
        listViewBtn.classList.remove('active');
        shopProductGrid.classList.remove('list-view-active');
    });

    listViewBtn.addEventListener('click', function() {
        this.classList.add('active');
        gridViewBtn.classList.remove('active');
        shopProductGrid.classList.add('list-view-active');
    });

    priceFilterBtn.addEventListener('click', function() {
        const min = parseFloat(minPriceInput.value) || 0;
        const max = parseFloat(maxPriceInput.value) || 500;
        const filteredProducts = filterProductsByPrice(min, max);
        displayProducts(filteredProducts);
    });

    sortSelect.addEventListener('change', function() {
        const sortedProducts = sortProducts(products, this.value);
        displayProducts(sortedProducts);
    });

    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.textContent.trim();
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const filteredProducts = filterProductsByCategory(category);
            displayProducts(filteredProducts);
        });
    });

    tagLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tag = this.textContent.toLowerCase();
            
            const filteredProducts = filterProductsByTag(tag);
            displayProducts(filteredProducts);
        });
    });

    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            paginationLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would load the appropriate page of products
        });
    });

    // Initialize the page
    initPriceRangeSlider();
    displayProducts(products);
});