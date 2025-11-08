// server.js — SmartGrocer Project (by K. Sai Krishna Kumar)
// server.js — SmartGrocer Project (by K. Sai Krishna Kumar)

// SmartGrocer backend — final correct version
// ✅ SmartGrocer Backend - server.js
// server.js - SmartGrocer backend
// ✅ SmartGrocer Backend - server.js
// server.js - SmartGrocer backend
// ✅ SmartGrocer Backend - server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Paths for JSON data
const itemsFile = path.join(__dirname, "items.json");
const ordersFile = path.join(__dirname, "orders.json");

// ✅ GET items (frontend loads grocery list)
app.get("/api/items", (req, res) => {
  fs.readFile(itemsFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading items:", err);
      return res.status(500).json({ message: "Unable to load items" });
    }
    res.json(JSON.parse(data));
  });
});

// ✅ POST order (Add to Cart → save to backend)
app.post("/api/orders", (req, res) => {
  const order = req.body;

  // Read existing orders
  fs.readFile(ordersFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading orders:", err);
      return res.status(500).json({ message: "Unable to read orders" });
    }

    let orders = [];
    if (data) {
      try {
        orders = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing orders:", parseError);
      }
    }

    // Add new order
    orders.push(order);

    // Save updated orders
    fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), err => {
      if (err) {
        console.error("Error saving order:", err);
        return res.status(500).json({ message: "Unable to save order" });
      }
      res.status(201).json({ message: "Order saved successfully!" });
    });
  });
});

// ✅ Server Start
app.listen(PORT, () => {
  console.log(`SmartGrocer server running at: http://localhost:${PORT}`);
});