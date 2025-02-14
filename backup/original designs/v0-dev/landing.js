document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".theme-toggle")
    const body = document.body
  
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme")
      localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light")
    })
  
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      body.classList.add("dark-theme")
    }
  })
  
  