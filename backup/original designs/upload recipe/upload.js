// upload_recipe.js

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
  
    // FORM VALIDATION: Prevent submission if any required field is missing or invalid.
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
      uploadForm.addEventListener('submit', (e) => {
        const title = document.getElementById('title').value.trim();
        const ingredients = document.getElementById('ingredients').value.trim();
        const steps = document.getElementById('steps').value.trim();
        const cuisine = document.getElementById('cuisine').value.trim();
        const difficulty = document.getElementById('difficulty').value;
        // Optionally, you can also validate image_url if provided
  
        let errorMessage = "";
        if (!title || !ingredients || !steps || !cuisine || !difficulty) {
          errorMessage = "Please fill in all required fields.";
        }
        if (errorMessage) {
          e.preventDefault();
          const errorContainer = document.getElementById('error-message');
          if (errorContainer) {
            errorContainer.textContent = errorMessage;
            errorContainer.style.display = "block";
          }
        } else {
          // Prevent actual upload for demo purposes
          e.preventDefault();
          alert("Form validated, but upload is disabled for demo purposes.");
        }
      });
    }
  
    // JAVASCRIPT CHECK
    if (!document.cookie.includes('js_enabled=true')) {
      document.cookie = "js_enabled=true; path=/";
      location.reload();
    }
  });
  