document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // DEMO DATING PROFILES
  // =========================

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


  // =========================
  // PHOTO COMPRESS
  // =========================

  function compressImage(file, maxWidth = 700, quality = 0.72) {

    return new Promise(function (resolve, reject) {

      const reader = new FileReader();

      reader.onload = function (event) {

        const img = new Image();

        img.onload = function () {

          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round(
              height * maxWidth / width
            );

            width = maxWidth;
          }

          const canvas =
            document.createElement("canvas");

          canvas.width = width;
          canvas.height = height;

          const ctx =
            canvas.getContext("2d");

          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );

          const compressed =
            canvas.toDataURL(
              "image/jpeg",
              quality
            );

          resolve(compressed);
        };

        img.onerror = function () {
          reject("Image load error");
        };

        img.src = event.target.result;
      };

      reader.onerror = function () {
        reject("File read error");
      };

      reader.readAsDataURL(file);
    });
  }


  // =========================
  // HOME DATING PROFILE
  // =========================

  const profilePhoto =
    document.getElementById("profilePhoto");

  const profileName =
    document.getElementById("profileName");

  const profileCity =
    document.getElementById("profileCity");

  const profileHobby =
    document.getElementById("profileHobby");

  const likeBtn =
    document.getElementById("likeBtn");

  const passBtn =
    document.getElementById("passBtn");


  function showProfile() {

    if (
      !profilePhoto ||
      !profileName ||
      !profileCity ||
      !profileHobby
    ) {
      return;
    }

    const profile =
      profiles[currentProfile];

    profilePhoto.src =
      profile.photo;

    profileName.textContent =
      profile.name +
      " • " +
      profile.age;

    profileCity.textContent =
      "📍 " +
      profile.city;

    profileHobby.textContent =
      profile.hobby;
  }


  function nextProfile() {

    currentProfile++;

    if (
      currentProfile >=
      profiles.length
    ) {
      currentProfile = 0;
    }

    showProfile();
  }


  if (likeBtn) {
    likeBtn.addEventListener(
      "click",
      nextProfile
    );
  }

  if (passBtn) {
    passBtn.addEventListener(
      "click",
      nextProfile
    );
  }


  // =========================
  // REGISTER
  // =========================

  const registerForm =
    document.getElementById(
      "registerForm"
    );


  if (registerForm) {

    registerForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();

        const photoInput =
          document.getElementById(
            "registerPhotoFile"
          );

        const file =
          photoInput &&
          photoInput.files
            ? photoInput.files[0]
            : null;


        let photoData = "";


        if (file) {

          try {

            photoData =
              await compressImage(file);

          } catch (error) {

            alert(
              "Photo ကို ပြင်ဆင်မရပါ။ နောက်တစ်ပုံရွေးပါ။"
            );

            return;
          }
        }


        const user = {

          name:
            document
              .getElementById(
                "registerName"
              )
              .value.trim(),

          age:
            document
              .getElementById(
                "registerAge"
              )
              .value,

          city:
            document
              .getElementById(
                "registerCity"
              )
              .value.trim(),

          hobby:
            document
              .getElementById(
                "registerHobby"
              )
              .value.trim(),

          phone:
            document
              .getElementById(
                "registerPhone"
              )
              .value.trim(),

          password:
            document
              .getElementById(
                "registerPassword"
              )
              .value,

          photo:
            photoData
        };


        try {

          localStorage.setItem(
            "ccykUser",
            JSON.stringify(user)
          );

        } catch (error) {

          alert(
            "Photo file ကြီးနေသေးပါတယ်။ တခြားပုံတစ်ပုံရွေးကြည့်ပါ။"
          );

          return;
        }


        const message =
          document.getElementById(
            "registerMessage"
          );


        if (message) {

          message.textContent =
            "✅ Account Created Successfully";

        }


        setTimeout(function () {

          window.location.href =
            "index.html";

        }, 700);

      }
    );
  }


  // =========================
  // LOGIN
  // =========================

  const loginForm =
    document.getElementById(
      "loginForm"
    );


  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const phone =
          document
            .getElementById("phone")
            .value.trim();


        const password =
          document
            .getElementById(
              "password"
            )
            .value;


        const savedUser =
          JSON.parse(
            localStorage.getItem(
              "ccykUser"
            )
          );


        if (
          savedUser &&
          savedUser.phone === phone &&
          savedUser.password === password
        ) {

          alert(
            "Welcome " +
            savedUser.name
          );

          window.location.href =
            "index.html";

        } else {

          alert(
            "Wrong Phone or Password"
          );

        }

      }
    );
  }


  // =========================
  // EDIT PROFILE
  // =========================

  const editProfileForm =
    document.getElementById(
      "editProfileForm"
    );


  if (editProfileForm) {

    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "ccykUser"
        )
      ) || {};


    const editName =
      document.getElementById(
        "editName"
      );

    const editAge =
      document.getElementById(
        "editAge"
      );

    const editCity =
      document.getElementById(
        "editCity"
      );

    const editHobby =
      document.getElementById(
        "editHobby"
      );

    const editPhotoPreview =
      document.getElementById(
        "editPhotoPreview"
      );

    const editPhotoFile =
      document.getElementById(
        "editPhotoFile"
      );

    const editMessage =
      document.getElementById(
        "editMessage"
      );


    if (editName) {
      editName.value =
        savedUser.name || "";
    }

    if (editAge) {
      editAge.value =
        savedUser.age || "";
    }

    if (editCity) {
      editCity.value =
        savedUser.city || "";
    }

    if (editHobby) {
      editHobby.value =
        savedUser.hobby || "";
    }

    if (
      editPhotoPreview &&
      savedUser.photo
    ) {

      editPhotoPreview.src =
        savedUser.photo;
    }


    if (editPhotoFile) {

      editPhotoFile.addEventListener(
        "change",
        async function () {

          const file =
            editPhotoFile.files[0];

          if (!file) {
            return;
          }

          try {

            const preview =
              await compressImage(file);

            if (editPhotoPreview) {

              editPhotoPreview.src =
                preview;
            }

          } catch (error) {

            alert(
              "Photo preview မလုပ်နိုင်ပါ။"
            );
          }

        }
      );
    }


    editProfileForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        let photoData =
          savedUser.photo || "";


        const newPhoto =
          editPhotoFile &&
          editPhotoFile.files
            ? editPhotoFile.files[0]
            : null;


        if (newPhoto) {

          try {

            photoData =
              await compressImage(
                newPhoto
              );

          } catch (error) {

            alert(
              "Photo ကို Save မလုပ်နိုင်ပါ။"
            );

            return;
          }
        }


        const updatedUser = {

          ...savedUser,

          name:
            editName
              ? editName.value.trim()
              : "",

          age:
            editAge
              ? editAge.value
              : "",

          city:
            editCity
              ? editCity.value.trim()
              : "",

          hobby:
            editHobby
              ? editHobby.value.trim()
              : "",

          photo:
            photoData
        };


        try {

          localStorage.setItem(
            "ccykUser",
            JSON.stringify(
              updatedUser
            )
          );

        } catch (error) {

          alert(
            "Photo file ကြီးနေသေးပါတယ်။ နောက်တစ်ပုံရွေးပါ။"
          );

          return;
        }


        if (editMessage) {

          editMessage.textContent =
            "✅ Profile Saved";
        }


        setTimeout(function () {

          window.location.href =
            "index.html";

        }, 600);

      }
    );
  }


  // =========================
  // START
  // =========================
const bgMusic = document.getElementById("bgMusic");

if (bgMusic) {
  bgMusic.volume = 0.25;

  bgMusic.play().catch(function () {
    document.addEventListener("click", function startMusic() {
      bgMusic.play();
      document.removeEventListener("click", startMusic);
    });
  });
}
  showProfile();

});
