// login.js

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
  
    // PASSWORD VISIBILITY TOGGLE FOR LOGIN PAGE
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
  
    // LIVE PASSWORD VALIDATION
    const passReqs = {
      length: {
        regex: /.{8,}/,
        element: document.getElementById('req-length')
      },
      number: {
        regex: /(?=.*\d)/,
        element: document.getElementById('req-number')
      },
      lower: {
        regex: /(?=.*[a-z])/,
        element: document.getElementById('req-lower')
      },
      upper: {
        regex: /(?=.*[A-Z])/,
        element: document.getElementById('req-upper')
      }
    };

    if (passwordInput) {
      passwordInput.addEventListener('input', () => {
        const value = passwordInput.value;
        Object.keys(passReqs).forEach(key => {
          const req = passReqs[key];
          if (req.regex.test(value)) {
            req.element.textContent = "✅ " + req.element.textContent.slice(2);
          } else {
            req.element.textContent = "❌ " + req.element.textContent.slice(2);
          }
        });
      });
    }

    // REAL-TIME FORM VALIDATION ON SUBMISSION
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        let errorMessage = "";

        // Validate Email
        const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
        if (!emailRegex.test(email)) {
          errorMessage = "Please enter a valid email address.";
        }

        // Validate Password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
          errorMessage = "Password must be at least 8 characters long and include a number, a lowercase letter, and an uppercase letter.";
        }

        if (errorMessage) {
          e.preventDefault();
          const errorContainer = document.getElementById('server-error');
          if (errorContainer) {
            errorContainer.textContent = errorMessage;
            errorContainer.style.display = "block";
          }
        }
      });
    }

    // JAVASCRIPT CHECK
    if (!document.cookie.includes('js_enabled=true')) {
      document.cookie = "js_enabled=true; path=/";
      location.reload();
    }
  });
