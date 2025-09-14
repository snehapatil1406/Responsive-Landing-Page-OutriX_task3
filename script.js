document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const eyeIcon = document.getElementById("eyeIcon");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const formFeedback = document.getElementById("formFeedback");
  const oauthBtns = document.querySelectorAll(".oauth-btn");
  let passwordVisible = false;

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Email validation regex
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Password validation (min 6 chars)
  function isValidPassword(password) {
    return password.length >= 6;
  }

  // Toggle password visibility
  togglePasswordBtn.addEventListener("click", function () {
    passwordVisible = !passwordVisible;
    passwordInput.type = passwordVisible ? "text" : "password";
    togglePasswordBtn.setAttribute(
      "aria-label",
      passwordVisible ? "Hide password" : "Show password"
    );
    eyeIcon.innerHTML = passwordVisible
      ? `<path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.06M1 1l22 22" 
         stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47" 
         stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
         <circle cx="12" cy="12" r="3"></circle>`;
  });

  // Real-time validation
  emailInput.addEventListener("input", function () {
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required.";
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
    } else {
      emailError.textContent = "";
    }
  });

  passwordInput.addEventListener("input", function () {
    if (!passwordInput.value) {
      passwordError.textContent = "Password is required.";
    } else if (!isValidPassword(passwordInput.value)) {
      passwordError.textContent = "Password must be at least 6 characters.";
    } else {
      passwordError.textContent = "";
    }
  });

  // Form submission
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;
    formFeedback.textContent = "";
    formFeedback.classList.remove("error");

    // Validate email
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required.";
      valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    // Validate password
    if (!passwordInput.value) {
      passwordError.textContent = "Password is required.";
      valid = false;
    } else if (!isValidPassword(passwordInput.value)) {
      passwordError.textContent = "Password must be at least 6 characters.";
      valid = false;
    } else {
      passwordError.textContent = "";
    }

    if (valid) {
      formFeedback.textContent = "Signed in successfully!";
      formFeedback.classList.remove("error");
      setTimeout(() => {
        formFeedback.textContent = "";
        loginForm.reset();
        passwordInput.type = "password";
        passwordVisible = false;
        togglePasswordBtn.setAttribute("aria-label", "Show password");
        eyeIcon.innerHTML =
          '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>' +
          '<circle cx="12" cy="12" r="3"></circle>';
      }, 1500);
    } else {
      formFeedback.textContent = "Please fix the errors above.";
      formFeedback.classList.add("error");
    }
  });

  // Keyboard accessibility for OAuth buttons
  oauthBtns.forEach((btn) => {
    btn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        btn.click();
      }
    });
  });
});
