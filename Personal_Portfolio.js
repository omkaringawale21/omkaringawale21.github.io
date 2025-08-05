document.addEventListener("DOMContentLoaded", function () {
  let homeImg = document.querySelector(".home .home-img");
  let menuBtn = document.querySelector("#menu-btn");
  let navbar = document.querySelector(".navbar");
  let navbarImg = document.querySelector(".navbar-img");

  document.querySelector(".home").onmousemove = (e) => {
    homeImg.style.top = e.pageY + "px";
    homeImg.style.left = e.pageX + "px";
  };

  document.querySelectorAll(".navbar a").forEach((link) => {
    link.onmouseenter = () => {
      document.querySelector(".navbar-img img").src =
        link.getAttribute("data-src");
    };
    link.onmouseleave = () => {
      document.querySelector(".navbar-img img").src = "img1.jpg";
    };
  });

  menuBtn.onclick = () => {
    navbar.classList.toggle("active");
    navbarImg.classList.toggle("active");
  };

  document.querySelectorAll(".navbar a").forEach((link) => {
    link.onclick = () => {
      navbar.classList.remove("active");
      navbarImg.classList.remove("active");
    };
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const contactForm = document.querySelector(".contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const now = new Date();
      const timeString = now.toLocaleString();

      const formData = {
        name: this.querySelector('[placeholder="Name"]').value,
        email: this.querySelector('[placeholder="Email"]').value,
        subject: this.querySelector('[placeholder="Subject"]').value,
        message: this.querySelector(".message").value,
        time: timeString,
      };

      emailjs.send("service_nzxlwge", "template_17v0o3b", formData).then(
        () => {
          alert("Thank you for your message!");
          this.reset();
        },
        (error) => {
          alert("Failed to send: " + error.text);
        }
      );
    });
  }
});

document
  .getElementById("downloadResume")
  .addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = "Omkar_Ingawale_Resume.pdf";
    link.download = "Omkar_Ingawale_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.open("Omkar_Ingawale_Resume.pdf", "_blank");
  });
