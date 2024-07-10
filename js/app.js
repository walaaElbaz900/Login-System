
let signInOverelay = document.getElementById("signInOverelay");
let signUpOverelay = document.getElementById("signUpOverelay");
let container = document.getElementById("container");


signUpOverelay.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});


signInOverelay.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

  function togglePasswordVisibility(event) {
      let passwordInput = event.target.previousElementSibling;
      let toggleButton = event.target;
      if (passwordInput.type === "password") {
          passwordInput.type = "text";
          toggleButton.classList.remove("fa-eye");
          toggleButton.classList.add("fa-eye-slash");
      } else {
          passwordInput.type = "password";
          toggleButton.classList.remove("fa-eye-slash");
          toggleButton.classList.add("fa-eye");
      }
  }

  let toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach(function (button) {
      button.addEventListener("click", togglePasswordVisibility);
  });