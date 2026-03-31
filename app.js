const products = [
    { id: 1, name: "Nike Air Max", price: 129.99 * 83, category: "running", rating: 5, badge: "Best Seller", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop" },
    { id: 2, name: "Adidas Ultraboost", price: 179.99 * 83, category: "running", rating: 5, badge: "New", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=200&fit=crop" },
    { id: 3, name: "Converse Chuck Taylor", price: 89.99 * 83, category: "casual", rating: 4, badge: null, image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=300&h=200&fit=crop" },
    { id: 4, name: "Vans Old Skool", price: 79.99 * 83, category: "casual", rating: 4, badge: null, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=200&fit=crop" },
    { id: 5, name: "Clarks Desert Boot", price: 149.99 * 83, category: "formal", rating: 5, badge: "Premium", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=300&h=200&fit=crop" },
    { id: 6, name: "Puma RS-X", price: 119.99 * 83, category: "sports", rating: 4, badge: null, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9ea?w=300&h=200&fit=crop" },
    { id: 7, name: "Reebok Classic", price: 99.99 * 83, category: "casual", rating: 4, badge: null, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=200&fit=crop" },
    { id: 8, name: "New Balance 574", price: 109.99 * 83, category: "running", rating: 5, badge: "Popular", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=300&h=200&fit=crop" },
    { id: 9, name: "Timberland Boot", price: 189.99 * 83, category: "casual", rating: 5, badge: "Premium", image: "https://images.unsplash.com/photo-1605037853762-d7f64cde8c79?w=300&h=200&fit=crop" }
];

let cart = JSON.parse(localStorage.getItem('globusCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('globusWishlist')) || [];

function formatPrice(price) {
    return '₹' + Math.round(price).toLocaleString('en-IN');
}

function shoeSVG(product) {
    return `<img src="${product.image}" alt="${product.name}" class="product-img" />`;
}

function renderStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += `<svg viewBox="0 0 24 24" fill="${i < rating ? '#ffc107' : '#333'}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
    return stars;
}

function renderProductCard(product) {
    return `<div class="product-card" data-category="${product.category}">
        <div class="product-image">
            ${shoeSVG(product)}
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">${renderStars(product.rating)}</div>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                <button class="add-to-wishlist" data-id="${product.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>
        </div>
    </div>`;
}

function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (container) {
        container.innerHTML = products.slice(0, 6).map(renderProductCard).join('');
        attachProductListeners();
    }
}

function renderCatalogProducts(filter) {
    filter = filter || 'all';
    const container = document.getElementById('catalog-products');
    if (container) {
        const filtered = filter === 'all' ? products : products.filter(function(p) { return p.category === filter; });
        container.innerHTML = filtered.map(renderProductCard).join('');
        attachProductListeners();
    }
}

function attachProductListeners() {
    document.querySelectorAll('.add-to-cart').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var id = parseInt(this.getAttribute('data-id'));
            addToCart(id);
        });
    });

    document.querySelectorAll('.add-to-wishlist').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var id = parseInt(this.getAttribute('data-id'));
            addToWishlist(id);
        });
    });
}

function addToWishlist(productId) {
    var product = products.find(function(p) { return p.id === productId; });
    var exists = wishlist.find(function(item) { return item.id === productId; });
    
    if (!exists && product) {
        wishlist.push(product);
        localStorage.setItem('globusWishlist', JSON.stringify(wishlist));
        updateWishlistCount();
    }
}

function addToCart(productId) {
    var product = products.find(function(p) { return p.id === productId; });
    var existingItem = cart.find(function(item) { return item.id === productId; });

    if (existingItem) {
        existingItem.quantity++;
    } else if (product) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            rating: product.rating,
            color: product.color,
            quantity: 1,
            size: 'US 10'
        });
    }

    localStorage.setItem('globusCart', JSON.stringify(cart));
    updateCartCount();
    showCartAnimation();
}

function showCartAnimation() {
    var cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.classList.add('bounce');
        setTimeout(function() { cartCount.classList.remove('bounce'); }, 500);
    }
}

function updateCartCount() {
    var count = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
    var el = document.querySelector('.cart-count');
    if (el) el.textContent = count;
}

function updateWishlistCount() {
    var el = document.querySelector('.wishlist-count');
    if (el) el.textContent = wishlist.length;
}

function renderCartItems() {
    var container = document.getElementById('cart-items');
    var cartContainer = document.querySelector('.cart-container');
    var emptyCart = document.getElementById('empty-cart');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '';
        if (cartContainer) cartContainer.classList.add('hidden');
        if (emptyCart) emptyCart.classList.add('active');
        updateCartSummary();
        return;
    }

    if (cartContainer) cartContainer.classList.remove('hidden');
    if (emptyCart) emptyCart.classList.remove('active');

    container.innerHTML = cart.map(function(item, index) {
        return `<div class="cart-item">
            <div class="cart-item-image">${shoeSVG(item)}</div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-category">${item.category}</p>
                <p class="cart-item-size">Size: ${item.size}</p>
            </div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
            <button class="remove-btn" data-index="${index}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        </div>`;
    }).join('');

    attachCartListeners();
    updateCartSummary();
}

function attachCartListeners() {
    document.querySelectorAll('.quantity-btn.minus').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var index = parseInt(this.getAttribute('data-index'));
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            localStorage.setItem('globusCart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var index = parseInt(this.getAttribute('data-index'));
            cart[index].quantity++;
            localStorage.setItem('globusCart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
        });
    });

    document.querySelectorAll('.remove-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var index = parseInt(this.getAttribute('data-index'));
            cart.splice(index, 1);
            localStorage.setItem('globusCart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
        });
    });
}

function updateCartSummary() {
    var subtotal = cart.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0);
    var total = subtotal;
    
    var subtotalEl = document.querySelector('.subtotal');
    var totalEl = document.querySelector('.total-amount');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

function renderWishlistItems() {
    var container = document.getElementById('wishlist-items');
    var emptyWishlist = document.getElementById('empty-wishlist');

    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = '';
        if (emptyWishlist) emptyWishlist.classList.add('active');
        return;
    }

    if (emptyWishlist) emptyWishlist.classList.remove('active');

    container.innerHTML = wishlist.map(function(item, index) {
        return `<div class="product-card">
            <div class="product-image">${shoeSVG(item)}</div>
            <div class="product-info">
                <div class="product-category">${item.category}</div>
                <h3 class="product-name">${item.name}</h3>
                <div class="product-rating">${renderStars(item.rating)}</div>
                <div class="product-price">$${item.price.toFixed(2)}</div>
                <div class="wishlist-actions">
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                    <button class="remove-wishlist" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');

    attachWishlistListeners();
    attachProductListeners();
}

function attachWishlistListeners() {
    document.querySelectorAll('.remove-wishlist').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var index = parseInt(this.getAttribute('data-index'));
            wishlist.splice(index, 1);
            localStorage.setItem('globusWishlist', JSON.stringify(wishlist));
            updateWishlistCount();
            renderWishlistItems();
        });
    });
}

function navigateToPage(pageId) {
    document.querySelectorAll('.page').forEach(function(page) {
        page.classList.remove('active');
    });
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.classList.remove('active');
    });

    var targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    document.querySelectorAll('[data-page="' + pageId + '"]').forEach(function(el) {
        if (el.classList.contains('nav-links') || el.closest('.nav-links')) {
            el.classList.add('active');
        }
    });

    if (pageId === 'cart') {
        renderCartItems();
    }

    if (pageId === 'wishlist') {
        renderWishlistItems();
    }

    window.scrollTo(0, 0);
}

function setupNavigation() {
    document.querySelectorAll('[data-page]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            var page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });

    var menuToggle = document.querySelector('.menu-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            renderCatalogProducts(this.getAttribute('data-category'));
        });
    });
}

function animateStats() {
    var stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var target = parseInt(entry.target.getAttribute('data-count'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(function(stat) { observer.observe(stat); });
}

function animateNumber(element, target) {
    var current = 0;
    var increment = target / 50;
    var timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 30);
}

function init() {
    renderFeaturedProducts();
    renderCatalogProducts();
    renderCartItems();
    updateCartCount();
    updateWishlistCount();
    setupNavigation();
    setupFilters();
    animateStats();

    var homeLink = document.querySelector('[data-page="home"]');
    if (homeLink) homeLink.classList.add('active');
}

document.addEventListener('DOMContentLoaded', init);
