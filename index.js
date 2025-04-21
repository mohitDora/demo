const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// 🛒 In-memory mock product inventory
let products = [
  {
    productId: "PROD1001",
    name: "Bluetooth Speaker",
    price: 79.99,
    quantity: 10
  },
  {
    productId: "PROD1002",
    name: "Wireless Mouse",
    price: 25.99,
    quantity: 15
  },
  {
    productId: "PROD1003",
    name: "Keyboard",
    price: 45.0,
    quantity: 8
  }
];

// 🏷️ Inventory check endpoint
app.post("/inventory-check", (req, res) => {
  const { productId, quantity } = req.body;

  const product = products.find(p => p.productId === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const status = quantity <= product.quantity ? "Available" : "OutOfStock";

  if (status === "OutOfStock") {
    return res.status(400).json({ error: "Out of stock" });
  }

  res.json({
    productId,
    requested: quantity,
    available: product.quantity,
    status
  });
});

// 💳 Payment processing endpoint
app.post("/process-payment", (req, res) => {
  const { customerId, amount } = req.body;

  if (!customerId || !amount) {
    return res.status(400).json({ error: "Missing customerId or amount" });
  }

  // Simulate success
  res.json({
    status: "Success",
    transactionId: `txn_${Math.floor(Math.random() * 1000000)}`,
    amount,
    customerId
  });
});

// 📦 Order placement endpoint
app.post("/update-inventory", (req, res) => {
    const { productId, quantity } = req.body;
  
    const product = products.find(p => p.productId === productId);
  
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
  
    product.quantity -= quantity;
  
    res.json({
      productId,
      remainingStock: product.quantity
    });
  });

// 🧾 View all products (for testing)
app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`✅ Demo server running at http://localhost:${PORT}`);
});
