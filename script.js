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
    if (!profilePhoto || !profileName || !profileCity || !profileHobby) {
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("ccykUser"));

    if (savedUser && currentProfile === 0) {
      profilePhoto.src =
        savedUser.photo ||
        "https://picsum.photos/seed/myprofile/500/600";

      profileName.textContent =
        savedUser.name + " • " + savedUser.age;

      profileCity.textContent =
        "📍 " + savedUser.city;

      profileHobby.textContent =
        savedUser.hobby;

      return;
    }

    const index = savedUser
      ? currentProfile - 1
      : currentProfile;

    const profile = profiles[index % profiles.length];

    profilePhoto.src = profile.photo;
    profileName.textContent =
      profile.name + " • " + profile.age;
    profileCity.textContent =
      "📍 " + profile.city;
    profileHobby.textContent =
      profile.hobby;
  }

  function nextProfile() {
    const savedUser = JSON.parse(localStorage.getItem("ccykUser"));
    const totalProfiles = profiles.length + (savedUser ? 1 : 0);

    currentProfile++;

    if (currentProfile >= totalProfiles) {
      currentProfile = 0;
    }

    showProfile();
  }

  if (likeBtn) {
    likeBtn.addEventListener("click", nextProfile);
  }

  if (passBtn) {
    passBtn.addEventListener("click", nextProfile);
  }

  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const photoInput =
        document.getElementById("registerPhotoFile");

      const file =
        photoInput && photoInput.files
          ? photoInput.files[0]
          : null;

      function saveUser(photoData) {
        const user = {
          name:
            document.getElementById("registerName").value.trim(),
          age:
            document.getElementById("registerAge").value,
          city:
            document.getElementById("registerCity").value.trim(),
          hobby:
            document.getElementById("registerHobby").value.trim(),
          photo:
            photoData || "",
          phone:
            document.getElementById("registerPhone").value.trim(),
          password:
            document.getElementById("registerPassword").value
        };

        localStorage.setItem("ccykUser", JSON.stringify(user));

        const message =
          document.getElementById("registerMessage");

        if (message) {
          message.textContent =
            "✅ Account Created Successfully";
        }

        setTimeout(function () {
          window.location.href = "index.html";
        }, 800);
      }

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          saveUser(e.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        saveUser("");
      }
    });
  }

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const phone =
        document.getElementById("phone").value.trim();

      const password =
        document.getElementById("password").value;

      const savedUser =
        JSON.parse(localStorage.getItem("ccykUser"));

      if (
        savedUser &&
        savedUser.phone === phone &&
        savedUser.password === password
      ) {
        window.location.href = "index.html";
      } else {
        alert("Wrong Phone or Password");
      }
    });
  }

  const editProfileForm =
    document.getElementById("editProfileForm");

  if (editProfileForm) {
    const savedUser =
      JSON.parse(localStorage.getItem("ccykUser"));

    const editName = document.getElementById("editName");
    const editAge = document.getElementById("editAge");
    const editCity = document.getElementById("editCity");
    const editHobby = document.getElementById("editHobby");
    const editPhotoPreview =
      document.getElementById("editPhotoPreview");
    const editPhotoFile =
      document.getElementById("editPhotoFile");
    const editMessage =
      document.getElementById("editMessage");

    if (savedUser) {
      editName.value = savedUser.name || "";
      editAge.value = savedUser.age || "";
      editCity.value = savedUser.city || "";
      editHobby.value = savedUser.hobby || "";

      if (savedUser.photo) {
        editPhotoPreview.src = savedUser.photo;
      }
    }

    if (editPhotoFile) {
      editPhotoFile.addEventListener("change", function () {
        const file = editPhotoFile.files[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = function (e) {
            editPhotoPreview.src = e.target.result;
          };

          reader.readAsDataURL(file);
        }
      });
    }

    editProfileForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const oldUser =
        JSON.parse(localStorage.getItem("ccykUser")) || {};

      function saveEditedProfile(photoData) {
        const updatedUser = {
          ...oldUser,
          name: editName.value.trim(),
          age: editAge.value,
          city: editCity.value.trim(),
          hobby: editHobby.value.trim(),
          photo: photoData || oldUser.photo || ""
        };

        localStorage.setItem(
          "ccykUser",
          JSON.stringify(updatedUser)
        );

        if (editMessage) {
          editMessage.textContent = "✅ Profile Saved";
        }

        setTimeout(function () {
          window.location.href = "index.html";
        }, 600);
      }

      const newPhoto =
        editPhotoFile && editPhotoFile.files
          ? editPhotoFile.files[0]
          : null;

      if (newPhoto) {
        const reader = new FileReader();

        reader.onload = function (e) {
          saveEditedProfile(e.target.result);
        };

        reader.readAsDataURL(newPhoto);
      } else {
        saveEditedProfile(oldUser.photo || "");
      }
    });
  }

  showProfile();

});
