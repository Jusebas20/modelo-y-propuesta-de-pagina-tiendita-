// Lista de productos
const products = [
    { id: 1, name: "Banano", price: 2000, image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" },
    { id: 2, name: "Tomate", price: 3500, image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg" },
    { id: 3, name: "Arroz (1kg)", price: 5000, image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rice_white.jpg" },
    { id: 4, name: "Leche (1L)", price: 3800, image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Milk_glass.jpg" },
    { id: 5, name: "Pan Tajado", price: 4500, image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Sliced_Bread.jpg" }
];

let cart = [];

// Renderizar productos
const productsContainer = document.getElementById("products");
products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
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
