const products = [
    { name: "Banano", price: 2000, image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Bananas_white_background.jpg", category: "frutas" },
    { name: "Lechuga", price: 1500, image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Lettuce_Mini_Romaine.jpg", category: "verduras" },
    { name: "Cereal", price: 8000, image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Cornflakes_bowl.jpg", category: "cereales" },
    { name: "Papa", price: 3000, image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Potatoes.jpg", category: "tuberculos" },
    { name: "Pollo", price: 12000, image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Chicken_meat.jpg", category: "proteinas" },
    { name: "Yogurt", price: 3500, image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Yogurt_plain.jpg", category: "lacteos" },
    { name: "Fresa", price: 1200, image: "https://es.dreamstime.com/fondo-real-de-fresas-fresa-alimentario-image268431953, category: "frutas"}
];

let cart = [];

function renderProducts(category = "all") {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products
        .filter(p => category === "all" || p.category === category)
        .forEach(product => {
            const div = document.createElement("div");
            div.classList.add("product");
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()} COP</p>
                <button onclick="addToCart('${product.name}')">Agregar al carrito</button>
            `;
            productList.appendChild(div);
        });
}

function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    const item = cart.find(i => i.name === productName);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ${item.quantity} x ${item.price.toLocaleString()} COP
            <button onclick="changeQuantity('${item.name}', 1)">+</button>
            <button onclick="changeQuantity('${item.name}', -1)">-</button>
        `;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toLocaleString();
}

function changeQuantity(productName, amount) {
    const item = cart.find(i => i.name === productName);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== productName);
        }
        updateCart();
    }
}

// Modal PSE
document.getElementById("pse-button").addEventListener("click", () => {
    document.getElementById("modal-total").textContent = document.getElementById("cart-total").textContent;
    document.getElementById("pse-modal").style.display = "block";
});
document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("pse-modal").style.display = "none";
});
window.addEventListener("click", e => {
    if (e.target === document.getElementById("pse-modal")) {
        document.getElementById("pse-modal").style.display = "none";
    }
});

// Filtrado por categoría
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        renderProducts(btn.dataset.category);
    });
});

// Render inicial
renderProducts();
