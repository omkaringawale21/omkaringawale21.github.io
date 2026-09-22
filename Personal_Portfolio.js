(function() { emailjs.init("ybYie7tmzy7N_57V7"); })();

document.addEventListener("DOMContentLoaded", () => {
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
    link.onclick = () => { closeNav(); closeModal(); };
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const homeImg = document.querySelector(".home-img");
  if (homeImg) {
    document.querySelector(".home").addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      homeImg.style.transform = `translate(${x / 6}px, ${y / 6}px)`;
    });
  }

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

  // ===== VIEW RESUME (opens modal) =====
  const viewResumeBtn = document.getElementById("viewResume");
  if (viewResumeBtn) {
    viewResumeBtn.addEventListener("click", () => {
      resumeModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  // ===== DOWNLOAD PDF (html2pdf.js — no external file needed) =====
  const downloadBtn = document.getElementById("downloadResume");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      if (typeof html2pdf === "undefined") {
        alert("PDF library not loaded. Please refresh the page.");
        return;
      }
      const element = document.querySelector(".resume-paper");
      if (!element) { alert("Resume content not found."); return; }

      const originalHTML = downloadBtn.innerHTML;
      downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
      downloadBtn.disabled = true;

      // Temporarily show the modal (hidden) so html2canvas can render it
      const wasActive = resumeModal.classList.contains("active");
      if (!wasActive) {
        resumeModal.style.visibility = "hidden";
        resumeModal.style.display = "block";
      }

      const opt = {
        margin: 0,
        filename: "Omkar_Ingawale_Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      };

      html2pdf().set(opt).from(element).save()
        .then(() => {
          if (!wasActive) {
            resumeModal.style.visibility = "";
            resumeModal.style.display = "";
          }
          downloadBtn.innerHTML = originalHTML;
          downloadBtn.disabled = false;
        })
        .catch((err) => {
          console.error("PDF generation failed:", err);
          alert("PDF generation failed. Please use 'View Resume' → browser Print → Save as PDF.");
          if (!wasActive) {
            resumeModal.style.visibility = "";
            resumeModal.style.display = "";
          }
          downloadBtn.innerHTML = originalHTML;
          downloadBtn.disabled = false;
        });
    });
  }

  const closeModalBtn = document.getElementById("closeResumeModal");
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

const yearSpan = document.getElementById("currentYear");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();