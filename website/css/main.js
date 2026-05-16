function insertHeader() {
    const headerContainer = document.getElementById('header');
    if (!headerContainer) {
        return;
    }

    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            headerContainer.innerHTML = html;
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

function updateCartTotal() {
    const totalField = document.getElementById('cart-total');
    if (!totalField) return;

    const rows = document.querySelectorAll('tbody tr[data-unit-price]');
    let total = 0;

    rows.forEach(row => {
        const unitPrice = parseFloat(row.dataset.unitPrice) || 0;
        const quantityInput = row.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput?.value, 10) || 1;
        total += unitPrice * quantity;
    });

    totalField.textContent = total.toFixed(2);
}

function setupCartQuantityControls() {
    const quantityButtons = document.querySelectorAll('.qty-btn');
    if (!quantityButtons.length) return;

    quantityButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const row = button.closest('tr');
            const input = row.querySelector('.quantity-input');
            let value = parseInt(input.value, 10) || 1;

            if (action === 'increase') {
                value += 1;
            } else if (action === 'decrease' && value > 1) {
                value -= 1;
            }

            input.value = value;
            updateCartTotal();
        });
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            row?.remove();
            updateCartTotal();
        });
    });

    updateCartTotal();
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

document.addEventListener('DOMContentLoaded', () => {
    insertHeader();
    createScrollButtons();
    setupCartQuantityControls();
    setupFaqLoadMore();
});
