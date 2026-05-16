function insertHeader() {
    const headerContainer = document.getElementById('header');
    if (!headerContainer) {
        return;
    }

    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            headerContainer.innerHTML = html;
            updateCartBadge();
        })
        .catch(error => {
            console.error('Error fetching header:', error);
        });
}

function createScrollButtons() {
    const topButton = document.createElement('button');
    const bottomButton = document.createElement('button');

    topButton.setAttribute('type', 'button');
    bottomButton.setAttribute('type', 'button');
    topButton.id = 'scroll-top-btn';
    bottomButton.id = 'scroll-bottom-btn';
    topButton.className = 'scroll-btn scroll-btn-top';
    bottomButton.className = 'scroll-btn scroll-btn-bottom';
    topButton.innerText = '↑';
    bottomButton.innerText = '↓';
    document.body.appendChild(topButton);
    document.body.appendChild(bottomButton);

    function updateScrollButtons() {
        if (window.scrollY > 250) {
            topButton.classList.add('show');
            bottomButton.classList.add('show');
        } else {
            topButton.classList.remove('show');
            bottomButton.classList.remove('show');
        }
    }

    window.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();

    topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    bottomButton.addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
}

let cart = JSON.parse(localStorage.getItem('luxury_cart')) || [];

function saveCart() {
    localStorage.setItem('luxury_cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const cartLink = document.querySelector('a[href="cart.html"]');
    if (cartLink) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartLink.textContent = `Cart (${totalItems})`;
    }
}

function initAddCartButtons() {
    const addBtns = document.querySelectorAll('.btn-add-cart');
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);
            const img = e.target.dataset.img;
            
            const existing = cart.find(i => i.name === name);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ name, price, img, quantity: 1 });
            }
            
            saveCart();
            updateCartBadge();
            alert(`${name} added to cart!`);
        });
    });
}

function formatPrice(price) {
    if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(2)} Crore`;
    } else if (price >= 100000) {
        return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
}

function renderCart() {
    const tbody = document.getElementById('cart-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const rowTotal = item.price * item.quantity;
        total += rowTotal;
        
        const tr = document.createElement('tr');
        tr.dataset.unitPrice = item.price;
        tr.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <img src="${item.img}" alt="${item.name}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 4px;">
                    <span>${item.name}</span>
                </div>
            </td>
            <td>${formatPrice(item.price)}</td>
            <td>
                <div class="quantity-control">
                    <button type="button" class="qty-btn" data-action="decrease" data-index="${index}">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                    <button type="button" class="qty-btn" data-action="increase" data-index="${index}">+</button>
                </div>
            </td>
            <td>${formatPrice(rowTotal)}</td>
            <td>
                <button type="button" class="btn remove-btn" data-index="${index}">Remove</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    const totalEl = document.getElementById('cart-total');
    if (totalEl) {
        totalEl.textContent = formatPrice(total);
    }
    
    tbody.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.dataset.index;
            const action = e.target.dataset.action;
            if (action === 'increase') {
                cart[idx].quantity += 1;
            } else if (action === 'decrease' && cart[idx].quantity > 1) {
                cart[idx].quantity -= 1;
            }
            saveCart();
            updateCartBadge();
            renderCart();
        });
    });
    
    tbody.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.dataset.index;
            cart.splice(idx, 1);
            saveCart();
            updateCartBadge();
            renderCart();
        });
    });
}

function setupFaqLoadMore() {
    const loadMore = document.getElementById('faq-load-more');
    if (!loadMore) return;

    loadMore.addEventListener('click', () => {
        const hiddenItems = Array.from(document.querySelectorAll('.faq-hidden'));
        hiddenItems.slice(0, 3).forEach(item => item.classList.remove('faq-hidden'));

        if (!document.querySelector('.faq-hidden')) {
            loadMore.style.display = 'none';
        }
    });
}

function renderCheckoutSummary() {
    const container = document.getElementById('checkout-items-container');
    if (!container) return;

    container.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const rowTotal = item.price * item.quantity;
        total += rowTotal;
        
        container.innerHTML += `
            <div class="summary-item">
                <span class="item-name">${item.quantity}x ${item.name}</span>
                <span class="item-price">${formatPrice(rowTotal)}</span>
            </div>
        `;
    });

    // Flat doc fee ₹10,000 as an example for cars
    const fees = cart.length > 0 ? 10000 : 0; 
    const tax = total * 0.18; // 18% GST example
    const grandTotal = total + fees + tax;

    const feesEl = document.getElementById('checkout-fees');
    const taxEl = document.getElementById('checkout-tax');
    const grandTotalEl = document.getElementById('checkout-grand-total');

    if (feesEl) feesEl.textContent = formatPrice(fees);
    if (taxEl) taxEl.textContent = formatPrice(tax);
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(grandTotal);
}

document.addEventListener('DOMContentLoaded', () => {
    insertHeader();
    createScrollButtons();
    initAddCartButtons();
    renderCart();
    renderCheckoutSummary();
    setupFaqLoadMore();
});
