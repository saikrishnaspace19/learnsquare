// Fetch grocery data from backend
// ✅ SmartGrocer script.js
// This file fetches grocery items from backend (server.js) and displays them in your webpage.

// ✅ SmartGrocer script.js
// ✅ SmartGrocer script.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Script.js active");

  const buttons = document.querySelectorAll(".add-btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".grocery");
      const name = item.querySelector("h3").textContent;
      const price = item.querySelector(".price").textContent.replace("₹", "");
      const desc = item.querySelector(".desc").textContent;
      const image = item.querySelector("img").src;

      const orderData = { name, price, desc, image };

      // Send to backend
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      })
        .then(res => res.json())
        .then(data => {
          console.log("✅ Order saved:", data);
          button.textContent = "Added ✅";
          button.disabled = true;
          button.style.backgroundColor = "#4CAF50";
        })
        .catch(err => {
          console.error("❌ Failed to save order:", err);
          alert("Error saving order!");
        });
    });
  });
});