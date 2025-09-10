// ========== Page Animations ==========

    gsap.registerPlugin(ScrollTrigger);

    gsap.from("header", { opacity: 0, y: -30, duration: 0.8, ease: "power3.out" });

    // Header animation
    gsap.to(".dashboard-header", {
      scrollTrigger: {
        trigger: ".dashboard-header",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });


// Title & Subtitle
gsap.from(".upload-section h1", {
  opacity: 0,
  y: -50,
  duration: 1.5,
  ease: "power4.out"
});
gsap.from(".subtitle", {
  opacity: 0,
  y: 20,
  delay: 0.3,
  duration: 1.2
});

// Guidelines box
gsap.from(".guidelines-box", {
  opacity: 0,
  scale: 0.8,
  delay: 0.6,
  duration: 1.5,
  ease: "elastic.out(1, 0.6)"
});

// Guidelines list stagger
gsap.from(".guidelines-box li", {
  opacity: 0,
  x: -50,
  duration: 1,
  delay: 1.2,
  stagger: 0.3,
  ease: "back.out(1.5)"
});

// Upload Box animation
gsap.from(".upload-box", {
  opacity: 0,
  y: 100,
  delay: 1.5,
  duration: 1.5,
  ease: "power4.out"
});

// Upload icon floating
gsap.to(".upload-icon", {
  y: -10,
  duration: 1.5,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut"
});

// Drop zone glow
gsap.to(".drop-zone", {
  boxShadow: "0 0 25px #00ffff, 0 0 50px #00ffff",
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// ========== Background Animations ==========

// Floating particles (AI datapoints/plankton)
const particlesContainer = document.getElementById("particles");

for (let i = 0; i < 40; i++) {
  const particle = document.createElement("div");
  particle.classList.add("particle");
  particle.style.top = `${Math.random() * 100}vh`;
  particle.style.left = `${Math.random() * 100}vw`;
  particlesContainer.appendChild(particle);

  gsap.to(particle, {
    y: -50 - Math.random() * 100,
    x: "+=" + (Math.random() * 100 - 50),
    opacity: 0.2 + Math.random() * 0.8,
    duration: 5 + Math.random() * 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// Animate waves
gsap.to(".wave", {
  y: 20,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: 0.3
});

// ========== File Upload Logic ==========
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");

// Click = open file dialog
dropZone.addEventListener("click", () => fileInput.click());

// File selection
fileInput.addEventListener("change", () => {
  handleFiles(fileInput.files);
});

// Drag & Drop
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.background = "rgba(0,255,255,0.2)";
});
dropZone.addEventListener("dragleave", () => {
  dropZone.style.background = "transparent";
});
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.background = "transparent";
  handleFiles(e.dataTransfer.files);
});

// Display uploaded files
function handleFiles(files) {
  fileList.innerHTML = "";
  Array.from(files).forEach((file) => {
    let item = document.createElement("p");
    item.textContent = `📂 ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    fileList.appendChild(item);
  });
}
