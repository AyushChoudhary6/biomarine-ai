const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  // Use GSAP for smoother animation
  gsap.to(cursorGlow, {
    duration: 0.3,
    x: e.clientX,
    y: e.clientY,
    ease: "power2.out"
  });
}); 

gsap.registerPlugin(ScrollTrigger);

/* ===== Hero entry (keep yours if you like) ===== */
gsap.from("header", { opacity: 0, y: -30, duration: 0.8, ease: "power3.out" });
gsap.from("main h1", { opacity: 0, y: 40, duration: 1, ease: "power3.out", delay: 0.2 });
gsap.from("main p",  { opacity: 0, y: 20, duration: 0.8, ease: "power2.out", delay: 0.45 });

/* ===== Stacked card panels ===== */
const panels = gsap.utils.toArray(".card");

// Entrance scrub for each card
panels.forEach((panel, i) => {
  // entrance (before pin)
  gsap.fromTo(panel,
    { y: 80, scale: 0.94, opacity: 0 },
    {
      y: 0, scale: 1, opacity: 1, ease: "none",
      scrollTrigger: {
        trigger: panel,
        start: "top 85%",
        end: "top 65%",
        scrub: true
      }
    }
  );

  // pin each panel for slide-like effect
  if (panel.id !== "sec3") {
    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      end: "+=100%",     // stay pinned for one viewport
      pin: true,
      pinSpacing: true,
      scrub: true,
      // markers: true
    });
  }
});

/* ===== Stats cards inside sec1 ===== */
gsap.from(".stat-card", {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.15,
  scrollTrigger: {
    trigger: "#sec1 .stats-section",
    start: "top 80%",
    scrub:1,
  }
});

/* ===== Special final panel: expand to full screen while pinned ===== */
gsap.to("#sec3", {
  width: "100vw",
  height: "100vh",
  borderRadius: 0,
  background: "linear-gradient(150deg, #031d3cff 0%, #04162d 70%)",
  boxShadow: "0 0 0 rgba(0,0,0,0)",
  ease: "none",
  scrollTrigger: {
    trigger: "#sec3",
    start: "top top",
    end: "+=120%",
    scrub: true,
    pin: true,
    pinSpacing: true,
    // markers: true
  }
});

document.getElementById("year").textContent = new Date().getFullYear();