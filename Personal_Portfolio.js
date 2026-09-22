(function() { emailjs.init("ybYie7tmzy7N_57V7"); })();

document.addEventListener("DOMContentLoaded", () => {
  // ===== NAVIGATION =====
  const menuBtn = document.getElementById("menu-btn");
  const navbar = document.querySelector(".navbar");
  const navbarImg = document.querySelector(".navbar-img");
  const resumeModal = document.getElementById("resumeModal");

  function closeNav() {
    navbar?.classList.remove("active");
    navbarImg?.classList.remove("active");
  }

  function closeModal() {
    if (resumeModal && resumeModal.classList.contains("active")) {
      resumeModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (menuBtn) menuBtn.onclick = () => {
    navbar.classList.toggle("active");
    navbarImg?.classList.toggle("active");
  };

  document.querySelectorAll(".navbar a").forEach(link => {
    link.onclick = () => {
      closeNav();
      closeModal();
    };
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== HOME IMAGE PARALLAX =====
  const homeImg = document.querySelector(".home-img");
  if (homeImg) {
    document.querySelector(".home").addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      homeImg.style.transform = `translate(${x / 6}px, ${y / 6}px)`;
    });
  }

  // ===== CONTACT FORM =====
  const form = document.getElementById("contactForm");
  if (form) {
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

  // ===== VIEW RESUME (opens Resume.html in new tab) =====
  const viewResumeBtn = document.getElementById("viewResume");
  if (viewResumeBtn) {
    viewResumeBtn.addEventListener("click", () => {
      window.open("./Resume.html", "_blank", "noopener,noreferrer");
    });
  }

  // ===== DOWNLOAD PDF (real file download with fallback) =====
  const downloadBtn = document.getElementById("downloadResume");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const pdfUrl = "./Omkar_Ingawale_Resume.pdf";

      try {
        // Check if PDF exists (HEAD request)
        const res = await fetch(pdfUrl, { method: "HEAD" });
        if (!res.ok) throw new Error("PDF not found");

        // Trigger download
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Omkar_Ingawale_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.warn("PDF not available, opening printable Resume.html instead.");
        window.open("./Resume.html", "_blank", "noopener,noreferrer");
      }
    });
  }

  // ===== RESUME MODAL (kept for internal quick view if used) =====
  const closeModalBtn = document.getElementById("closeResumeModal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

// ===== CURRENT YEAR =====
const yearSpan = document.getElementById("currentYear");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();