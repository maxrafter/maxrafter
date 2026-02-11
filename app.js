const products = [
  {
    id: 1,
    name: "LARIANSA 2L",
    category: "Detergentes",
    price: 38.0,
    image:
      "https://images.unsplash.com/photo-1610552050890-fe99536c2619?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "LARIANSA 10L",
    category: "Detergentes",
    price: 172.0,
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "LARIANSA 18L",
    category: "Detergentes",
    price: 285.0,
    image:
      "https://images.unsplash.com/photo-1632324343640-86af9827dbeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Harina Oro Maya",
    category: "Abarrotes",
    price: 145.0,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "Pack limpieza hogar",
    category: "Productos de limpieza",
    price: 115.0,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 6,
    name: "Abarrotes surtidos",
    category: "Abarrotes",
    price: 220.0,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80",
  },
];

const cart = [];
const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const whatsappOrder = document.getElementById("whatsapp-order");
const clearCartBtn = document.getElementById("clear-cart");
const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();

const iconsByCategory = {
  Detergentes: "🧴",
  Abarrotes: "🛒",
  "Productos de limpieza": "🧼",
};

function formatPrice(value) {
  return `Q${value.toFixed(2)}`;
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
      <article class="product-card">
        <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" />
        <div>
          <h3 class="product-name">${iconsByCategory[product.category] ?? "📦"} ${product.name}</h3>
          <p class="product-category">${product.category}</p>
          <p class="product-price">Precio mayoreo: ${formatPrice(product.price)}</p>
          <button class="btn btn--secondary btn--small" data-id="${product.id}">Agregar al pedido</button>
        </div>
      </article>
    `
    )
    .join("");
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<li class="cart__item"><span>Tu carrito está vacío.</span></li>';
    cartTotal.textContent = "Total: Q0.00";
    whatsappOrder.href = `https://wa.me/50279263694?text=${encodeURIComponent(
      "Hola Mercados JEHOSUA, quiero realizar un pedido."
    )}`;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <li class="cart__item">
        <span>${item.name} <small>x${item.quantity}</small></span>
        <strong>${formatPrice(item.price * item.quantity)}</strong>
      </li>
    `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: ${formatPrice(total)}`;

  const detail = cart
    .map((item) => `• ${item.name} x${item.quantity} (${formatPrice(item.price * item.quantity)})`)
    .join("\n");

  const whatsappMessage = `Hola Mercados JEHOSUA, deseo confirmar este pedido:%0A${encodeURIComponent(
    detail
  )}%0A%0ATotal: ${encodeURIComponent(formatPrice(total))}`;

  whatsappOrder.href = `https://wa.me/50279263694?text=${whatsappMessage}`;
}

productGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;

  const id = Number(target.dataset.id);
  const selected = products.find((product) => product.id === id);
  if (!selected) return;

  const existing = cart.find((item) => item.id === selected.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...selected, quantity: 1 });
  }

  renderCart();
});

clearCartBtn.addEventListener("click", () => {
  cart.length = 0;
  renderCart();
});

renderProducts();
renderCart();
