document.addEventListener("DOMContentLoaded", () => {

  console.log("CCYK V3 Started");

  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      alert("ဒီ Feature ကို နောက်အဆင့်မှာ ထည့်သွင်းပါမယ် ❤️");
    });
  });

});
