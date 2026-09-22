(function() { emailjs.init("ybYie7tmzy7N_57V7"); })();

document.addEventListener("DOMContentLoaded", () => {
  // ===== NAVIGATION =====
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

  // ===== HOME IMAGE PARALLAX =====
  const homeImg = document.querySelector(".home-img");
  if(homeImg) {
    document.querySelector(".home").addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      homeImg.style.transform = `translate(${x/6}px, ${y/6}px)`;
    });
  }

  // ===== CONTACT FORM =====
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

  // ===== RESUME MODAL (View Resume) =====
  const resumeModal = document.getElementById("resumeModal");
  const viewResumeBtn = document.getElementById("viewResume");
  const closeModalBtn = document.getElementById("closeResumeModal");

  if(viewResumeBtn) {
    viewResumeBtn.addEventListener("click", () => {
      resumeModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if(closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      resumeModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Close modal on outside click
  if(resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if(e.target === resumeModal) {
        resumeModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && resumeModal.classList.contains("active")) {
      resumeModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // ===== DOWNLOAD PDF =====
  const downloadBtn = document.getElementById("downloadResume");
  if(downloadBtn) {
    downloadBtn.addEventListener("click", (e) => {
      // The <a> tag with download attribute handles the actual PDF download.
      // This listener is just for feedback (optional).
      console.log("Downloading resume PDF...");
    });
  }
});

// ===== CURRENT YEAR =====
const yearSpan = document.getElementById("currentYear");
if(yearSpan) yearSpan.textContent = new Date().getFullYear();