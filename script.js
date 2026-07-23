document.addEventListener("DOMContentLoaded", function () {
  const profiles = [
    {
      name: "Su Su",
      age: 23,
      city: "Yangon",
      hobby: "Coffee ☕ | Travel ✈️ | Music 🎵",
      photo: "https://picsum.photos/seed/susu/500/600"
    },
    {
      name: "Aye Aye",
      age: 25,
      city: "Mandalay",
      hobby: "Reading 📚 | Movies 🎬",
      photo: "https://picsum.photos/seed/ayeaye/500/600"
    },
    {
      name: "May May",
      age: 22,
      city: "Bago",
      hobby: "Food 🍜 | Singing 🎤",
      photo: "https://picsum.photos/seed/maymay/500/600"
    }
  ];

  let currentProfile = 0;

  const profilePhoto = document.getElementById("profilePhoto");
  const profileName = document.getElementById("profileName");
  const profileCity = document.getElementById("profileCity");
  const profileHobby = document.getElementById("profileHobby");
  const likeBtn = document.getElementById("likeBtn");
  const passBtn = document.getElementById("passBtn");

  function showProfile() {
    const profile = profiles[currentProfile];

    profilePhoto.src = profile.photo;
    profileName.textContent = profile.name + " • " + profile.age;
    profileCity.textContent = "📍 " + profile.city;
    profileHobby.textContent = profile.hobby;
  }

  function nextProfile() {
    currentProfile++;

    if (currentProfile >= profiles.length) {
      currentProfile = 0;
    }

    showProfile();
  }

  likeBtn.addEventListener("click", nextProfile);
  passBtn.addEventListener("click", nextProfile);

  showProfile();

  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const user = {
        name: document.getElementById("registerName").value.trim(),
        age: document.getElementById("registerAge").value,
        phone: document.getElementById("registerPhone").value.trim(),
        password: document.getElementById("registerPassword").value
      };

      localStorage.setItem("ccykUser", JSON.stringify(user));
      alert("Account Created Successfully");
      window.location.href = "login.html";
    });
  }

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const phone = document.getElementById("phone").value.trim();
      const password = document.getElementById("password").value;
      const savedUser = JSON.parse(localStorage.getItem("ccykUser"));

      if (
        savedUser &&
        savedUser.phone === phone &&
        savedUser.password === password
      ) {
        alert("Welcome " + savedUser.name);
        window.location.href = "index.html";
      } else {
        alert("Wrong Phone or Password");
      }
    });
  }
});
const registerForm = document.getElementById("registerForm");

if (registerForm) {

registerForm.addEventListener("submit", function(e) {

e.preventDefault();

const user = {
name: document.getElementById("registerName").value,
age: document.getElementById("registerAge").value,
phone: document.getElementById("registerPhone").value,
password: document.getElementById("registerPassword").value,
city: document.getElementById("registerCity").value,
hobby: document.getElementById("registerHobby").value,
photo: document.getElementById("registerPhoto").value
};

localStorage.setItem("ccykUser", JSON.stringify(user));

document.getElementById("registerMessage").innerHTML =
"✅ Account Created Successfully";

setTimeout(() => {
window.location.href = "index.html";
}, 1500);

});

}
