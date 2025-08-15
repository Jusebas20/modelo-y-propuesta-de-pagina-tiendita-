// Lista de productos actualizada
const products = [
    { id: 1, name: "Banano", price: 2500, image: "https://images.unsplash.com/photo-1615484477905-4c3a4551d26c" },
    { id: 2, name: "Tomate", price: 4000, image: "https://images.unsplash.com/photo-1582515073490-dc0c4a30c0a6" },
    { id: 3, name: "Arroz (1kg)", price: 5200, image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc" },
    { id: 4, name: "Leche (1L)", price: 4200, image: "https://images.unsplash.com/photo-1580910051074-7cdd31b9f54e" },
    { id: 5, name: "Pan Tajado", price: 4800, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a" },
    { id: 6, name: "Cereal", price: 9500, image: "https://images.unsplash.com/photo-1604908177079-6b4d7d479708" },
    { id: 7, name: "Yogurt", price: 6500, image: "https://images.unsplash.com/photo-1580910051074-7cdd31b9f54e" }
];

let cart = [];

// Renderizar productos
const productsContainer = document.getElementById("products");
products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <img src="${product.image}?auto=format&fit=crop&w=400&q=80" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price.toLocaleString()} COP</p>
        <button onclick="addToCart(${product.id})">Agregar al carrito</button>
    `;
    productsContainer.appendChild(div);
});

// Agregar producto
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Cambiar cantidad
function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== id);
        }
    }
    updateCart();
}

// Eliminar producto
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Actualizar carrito
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ${item.price.toLocaleString()} COP x ${item.quantity}
            <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
            <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    document.getElementById("total").textContent = total.toLocaleString();
}

// Modal PSE
const pseButton = document.getElementById("pse-button");
const modal = document.getElementById("pse-modal");
const closeModal = document.querySelector(".close-button");
const confirmPayment = document.getElementById("confirm-payment");

pseButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    document.getElementById("modal-total").textContent = document.getElementById("total").textContent;
    modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

confirmPayment.addEventListener("click", () => {
    alert("Pago simulado con PSE. ¡Gracias por tu compra en MercadoPereira's! 🛒");
    cart = [];
    updateCart();
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
