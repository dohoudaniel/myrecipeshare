// signup.js

document.addEventListener('DOMContentLoaded', () => {
    // THEME TOGGLE FUNCTIONALITY
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  
    // MOBILE MENU TOGGLE
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
      });
    }
  
    // PASSWORD VISIBILITY TOGGLE FOR SIGNUP PAGE
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      const passwordToggle = document.querySelector('.password-toggle');
      if (passwordToggle) {
        const toggleIcon = passwordToggle.querySelector('.toggle-icon');
        passwordToggle.addEventListener('click', () => {
          const type = passwordInput.type === 'password' ? 'text' : 'password';
          passwordInput.type = type;
          toggleIcon.textContent = type === 'password' ? '👀' : '🙈';
        });
      }
    }
  
    // REAL-TIME VALIDATION (EXAMPLE: PREVENT WHITESPACE-ONLY NAMES)
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        let errorMessage = "";
        if (firstName.length < 2) {
          errorMessage = "First name must be at least 2 characters long.";
        } else if (lastName.length < 2) {
          errorMessage = "Last name must be at least 2 characters long.";
        } else {
          const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
          if (!emailRegex.test(email)) {
            errorMessage = "Please enter a valid email address.";
          } else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(password)) {
              errorMessage = "Password must be at least 8 characters long and include a number, a lowercase letter, and an uppercase letter.";
            }
          }
        }
        if (errorMessage) {
          e.preventDefault();
          const errorContainer = document.getElementById('error-message');
          errorContainer.textContent = errorMessage;
          errorContainer.style.display = "block";
        }
      });
    }

    // JavaScript Check
    if (!document.cookie.includes('js_enabled=true')) {
      document.cookie = "js_enabled=true; path=/";
      location.reload();
    }
  });
  