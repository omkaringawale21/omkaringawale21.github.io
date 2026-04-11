
  (function() { emailjs.init("ybYie7tmzy7N_57V7"); })();

  document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const navbar = document.querySelector(".navbar");
    const navbarImg = document.querySelector(".navbar-img");
    if(menuBtn) menuBtn.onclick = () => { navbar.classList.toggle("active"); navbarImg?.classList.toggle("active"); };
    document.querySelectorAll(".navbar a").forEach(link => {
      link.onclick = () => { navbar.classList.remove("active"); navbarImg?.classList.remove("active"); };
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
    const homeImg = document.querySelector(".home-img");
    if(homeImg) {
      document.querySelector(".home").addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        homeImg.style.transform = `translate(${x/6}px, ${y/6}px)`;
      });
    }
    const form = document.getElementById("contactForm");
    if(form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const templateParams = {
          name: document.getElementById("nameInput").value,
          email: document.getElementById("emailInput").value,
          subject: document.getElementById("subjectInput").value,
          message: document.getElementById("msgInput").value,
          time: new Date().toLocaleString()
        };
        emailjs.send("service_nzxlwge", "template_17v0o3b", templateParams)
          .then(() => { alert("✅ Message sent! I'll reach out soon."); form.reset(); })
          .catch((err) => { alert("❌ Failed: " + err.text); });
      });
    }
    const downloadBtn = document.getElementById("downloadResume");
    if(downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = "Omkar_Ingawale_Resume.pdf";
        link.download = "Omkar_Ingawale_Resume.pdf";
        link.click();
        window.open("Omkar_Ingawale_Resume.pdf", "_blank");
      });
    }
  });