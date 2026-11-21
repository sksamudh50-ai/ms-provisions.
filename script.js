
// MS PROVISIONS - Grocery Store

// Replace with your shop WhatsApp number
const WHATSAPP_NUMBER = "919963013953";

const SHOP_NAME = "MS PROVISIONS";
const SHOP_LOCATION = "Nellore,Samgam";

const products = [
    {id:1,name:"Basmati Rice",category:"Rice & Dals",price:90,unit:"1 kg",image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"},
    {id:2,name:"Sona Masoori Rice",category:"Rice & Dals",price:60,unit:"1 kg",image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"},
    {id:3,name:"Toor Dal",category:"Rice & Dals",price:120,unit:"1 kg",image:"https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400"},
    {id:4,name:"Moong Dal",category:"Rice & Dals",price:110,unit:"1 kg",image:"https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400"},
    {id:5,name:"Sunflower Oil",category:"Oils",price:150,unit:"1 litre",image:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"},
    {id:6,name:"Groundnut Oil",category:"Oils",price:180,unit:"1 litre",image:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"},
    {id:7,name:"Tomatoes",category:"Vegetables",price:30,unit:"1 kg",image:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400"},
    {id:8,name:"Potatoes",category:"Vegetables",price:35,unit:"1 kg",image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400"},
    {id:9,name:"Onions",category:"Vegetables",price:40,unit:"1 kg",image:"https://images.unsplash.com/photo-1508747703725-719777637510?w=400"},
    {id:10,name:"Carrots",category:"Vegetables",price:50,unit:"1 kg",image:"https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400"},
    {id:11,name:"Biscuits",category:"Snacks",price:20,unit:"1 pack",image:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400"},
    {id:12,name:"Potato Chips",category:"Snacks",price:20,unit:"1 pack",image:"https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400"},
    {id:13,name:"Noodles",category:"Snacks",price:15,unit:"1 pack",image:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400"},
    {id:14,name:"Milk",category:"Dairy",price:30,unit:"500 ml",image:"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"},
    {id:15,name:"Butter",category:"Dairy",price:60,unit:"100 g",image:"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400"},
    {id:16,name:"Bath Soap",category:"Personal Care",price:40,unit:"1 piece",image:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400"},
    {id:17,name:"Shampoo",category:"Personal Care",price:120,unit:"1 bottle",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400"},
    {id:18,name:"Toothpaste",category:"Personal Care",price:55,unit:"1 tube",image:"https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400"},
    {id:19,name:"Sugar",category:"Rice & Dals",price:45,unit:"1 kg",image:"https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400"},
    {id:20,name:"Salt",category:"Rice & Dals",price:25,unit:"1 kg",image:"https://images.unsplash.com/photo-1518110925495-5fe2fda0442b?w=400"}
];

let cart = [];

function displayProducts(items) {
    const list = document.getElementById("product-list");

    if (!items.length) {
        list.innerHTML = "<p>No products found.</p>";
        return;
    }

    list.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <h3>${p.name}</h3>
            <p>₹${p.price} / ${p.unit}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join("");
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(p => p.id === id);

    if (existing) existing.quantity++;
    else cart.push({...product, quantity:1});

    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum,p) => sum + p.quantity, 0);
    const total = cart.reduce((sum,p) => sum + p.price*p.quantity, 0);

    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-total").textContent = total;

    document.getElementById("cart-items").innerHTML =
        cart.length ? cart.map(p => `
            <div class="cart-row">
                <span>${p.name}<br>₹${p.price} × ${p.quantity}</span>
                <div>
                    <button onclick="changeQuantity(${p.id},-1)">−</button>
                    <button onclick="changeQuantity(${p.id},1)">+</button>
                    <button onclick="removeItem(${p.id})">Remove</button>
                </div>
            </div>
        `).join("") : "<p>Your cart is empty.</p>";
}

function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }
    updateCart();
}

function removeItem(id) {
    cart = cart.filter(p => p.id !== id);
    updateCart();
}

function showCart() {
    updateCart();
    document.getElementById("cart-modal").style.display = "flex";
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

function filterCategory(category) {
    const items = category === "All"
        ? products
        : products.filter(p => p.category === category);

    displayProducts(items);
    document.getElementById("products").scrollIntoView();
}

function searchProducts() {
    const term = document.getElementById("search").value.toLowerCase();

    displayProducts(products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    ));
}

function orderWhatsApp() {
    if (!cart.length) {
        alert("Your cart is empty!");
        return;
    }

    if (!/^91\d{10}$/.test(WHATSAPP_NUMBER)) {
        alert("Add your correct WhatsApp number in script.js first.");
        return;
    }

    const name = prompt("Please enter your name:");
    if (!name || !name.trim()) return;

    const method = prompt(
        "Choose delivery method:\n1 = Home Delivery\n2 = Shop Pickup"
    );

    if (method !== "1" && method !== "2") {
        alert("Please choose 1 or 2.");
        return;
    }

    let deliveryDetails = "";

    if (method === "1") {
        const address = prompt("Enter your complete home delivery address:");
        if (!address || !address.trim()) return;
        deliveryDetails = "Home Delivery\nAddress: " + address.trim();
    } else {
        deliveryDetails = "Shop Pickup\nPickup location: " + SHOP_LOCATION;
    }

    const total = cart.reduce(
        (sum,p) => sum + p.price*p.quantity, 0
    );

    let message =
        "NEW ORDER - " + SHOP_NAME + "\n\n" +
        "Customer: " + name.trim() + "\n" +
        deliveryDetails + "\n\n" +
        "ORDER DETAILS:\n";

    cart.forEach(p => {
        message += p.name + " x " + p.quantity +
            " = Rs. " + (p.price*p.quantity) + "\n";
    });

    message += "\nTOTAL: Rs. " + total;
    message += "\nPlease confirm my order.";

    window.open(
        "https://wa.me/" + WHATSAPP_NUMBER +
        "?text=" + encodeURIComponent(message),
        "_blank"
    );
}

function contactShop() {
    if (!/^91\d{10}$/.test(WHATSAPP_NUMBER)) {
        alert("Add your correct WhatsApp number in script.js first.");
        return;
    }

    window.open("https://wa.me/" + WHATSAPP_NUMBER, "_blank");
}

displayProducts(products);
updateCart();
