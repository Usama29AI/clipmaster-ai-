
document.addEventListener("DOMContentLoaded", function () {

  const fileInput = document.querySelector(
    'input[type="file"]'
  );

  const video = document.querySelector("video");

  const message = document.querySelector("#message");

  const preview = document.querySelector("#preview");

  function showMessage(text) {
    if (message) {
      message.textContent = text;
    } else {
      alert(text);
    }
  }

  // VIDEO UPLOAD
  if (fileInput) {
    fileInput.accept = "video/*";

    fileInput.addEventListener("change", function () {
      const file = this.files[0];

      if (!file) return;

      if (!file.type.startsWith("video/")) {
        showMessage("Please select a video file.");
        this.value = "";
        return;
      }

      if (file.size > 500 * 1024 * 1024) {
        showMessage("Video size must be under 500 MB.");
        this.value = "";
        return;
      }

      const videoURL = URL.createObjectURL(file);

      if (video) {
        video.src = videoURL;
        video.load();
        video.style.display = "block";
      }

      if (preview) {
        preview.style.display = "block";
      }

      showMessage("Video uploaded successfully: " + file.name);
    });
  }

  // LANGUAGE SELECTION
  const languageSelect = document.querySelector(
    'select[name="language"], #language'
  );

  if (languageSelect) {
    languageSelect.addEventListener("change", function () {
      showMessage("Selected language: " + this.value);
    });
  }

  // GENERATE CLIPS BUTTON
  const buttons = document.querySelectorAll("button");

  buttons.forEach(function (button) {

    const text = button.textContent.toLowerCase();

    if (
      text.includes("generate clips") ||
      text.includes("create clips") ||
      text.includes("start clipping")
    ) {
      button.addEventListener("click", function () {

        if (!fileInput || !fileInput.files.length) {
          showMessage("Please upload a video first.");
          return;
        }

        showMessage(
          "Video received! AI clipping engine will be connected in Phase 3."
        );

      });
    }

  });

  // MOBILE MENU
  const menuButton = document.querySelector(".menu");
  const sidebar = document.querySelector("aside");

  if (menuButton && sidebar) {
    menuButton.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
  }

  // NAVIGATION
  const navButtons = document.querySelectorAll(".nav");

  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      navButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const target = button.dataset.target;

      if (target) {
        document.querySelectorAll(".page").forEach(function (page) {
          page.classList.remove("active");
        });

        const selectedPage = document.getElementById(target);

        if (selectedPage) {
          selectedPage.classList.add("active");
        }
      }

      if (sidebar) {
        sidebar.classList.remove("open");
      }

    });
  });

  console.log("ClipMaster AI initialized successfully!");

});
