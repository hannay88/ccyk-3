document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.textContent.trim();

      if (action === "Login") {
        alert("Login Page ကို နောက်အဆင့်မှာ ထည့်ပါမယ်။");
      } else if (action === "Register") {
        alert("Register Page ကို နောက်အဆင့်မှာ ထည့်ပါမယ်။");
      } else if (action === "Find Match") {
        alert("Dating Match System ကို နောက်အဆင့်မှာ ထည့်ပါမယ်။");
      } else if (action === "Open Marketplace") {
        alert("Marketplace ကို နောက်အဆင့်မှာ ထည့်ပါမယ်။");
      } else if (action === "Advertise") {
        alert("Advertisement တင်ရန်စနစ်ကို နောက်အဆင့်မှာ ထည့်ပါမယ်။");
      }
    });
  });
});
