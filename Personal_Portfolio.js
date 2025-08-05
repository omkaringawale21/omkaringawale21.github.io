document.addEventListener("DOMContentLoaded", function () {
  // Navigation menu functionality
  let homeImg = document.querySelector(".home .home-img");
  let menuBtn = document.querySelector("#menu-btn");
  let navbar = document.querySelector(".navbar");
  let navbarImg = document.querySelector(".navbar-img");

  // Mouse move effect for home image
  document.querySelector(".home").onmousemove = (e) => {
    homeImg.style.top = e.pageY + "px";
    homeImg.style.left = e.pageX + "px";
  };

  // Navbar image change on hover
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.onmouseenter = () => {
      document.querySelector(".navbar-img img").src =
        link.getAttribute("data-src");
    };
    link.onmouseleave = () => {
      document.querySelector(".navbar-img img").src = "img1.jpg";
    };
  });

  // Toggle navbar on menu button click
  menuBtn.onclick = () => {
    navbar.classList.toggle("active");
    navbarImg.classList.toggle("active");
  };

  // Close navbar when clicking on a link
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.onclick = () => {
      navbar.classList.remove("active");
      navbarImg.classList.remove("active");
    };
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Form submission handling
  const contactForm = document.querySelector(".contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Here you would typically send the form data to a server
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    });
  }
});

document
  .getElementById("downloadResume")
  .addEventListener("click", function () {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = "Omkar_Ingawale_Resume.pdf";
    link.download = "Omkar_Ingawale_Resume.pdf"; // This forces download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Fallback in case the above doesn't work
    window.open("Omkar_Ingawale_Resume.pdf", "_blank");
  });
