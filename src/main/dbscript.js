document.querySelector(".btn-refresh").addEventListener("click", () => {
    location.reload(); // refreshes the current page
  });

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

    // Cards animation with stagger
    gsap.to(".card", {
      scrollTrigger: {
        trigger: ".stats",
        start: "top 85%",
        onEnter: () => startCounters() // Start counters when cards come into view
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2
    });

    // Counter function
    function startCounters() {
      document.querySelectorAll(".value").forEach(el => {
        let target = parseFloat(el.getAttribute("data-target"));
        let suffix = el.getAttribute("data-suffix") || "";
        gsap.fromTo(el, {innerText: 0}, {
          innerText: target,
          duration: 2,
          ease: "power1.out",
          snap: {innerText: 0.1},
          onUpdate: function () {
            el.innerText = el.innerText + suffix;
          }
        });
      });
    }

    // GSAP Animations
    gsap.from(".upload", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });

    gsap.from(".topic", {
      opacity: 0,
      x: 50,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.5,
      ease: "back.out(1.7)"
    });

    gsap.from(".actions button", {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.2,
      delay: 1,
      ease: "elastic.out(1, 0.7)"
    });
    // Animate Quick Actions card sliding in
gsap.from("#quick-actions", {
  opacity: 0,
  x: 100,   // slide in from right
  duration: 1,
  ease: "power3.out",
  delay: 0.5
});

// Button hover + click animations
document.querySelectorAll(".actions button").forEach(button => {
  // Hover in
  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      scale: 1.05,
      boxShadow: "0 6px 15px rgba(0,255,255,0.6)",
      duration: 0.3,
      ease: "power2.out"
    });
  });

  // Hover out
  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      scale: 1,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power2.inOut"
    });
  });

  // Click press down
  button.addEventListener("mousedown", () => {
    gsap.to(button, {
      scale: 0.95,
      duration: 0.15,
      ease: "power2.in"
    });
  });

  // Release click bounce back
  button.addEventListener("mouseup", () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.2,
      ease: "bounce.out"
    });
  });
});

// Animate section when it loads
gsap.from("#data-visual", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});

// Animate visual box
gsap.from(".visual-box", {
  scale: 0.9,
  opacity: 0,
  duration: 1,
  delay: 0.3,
  ease: "back.out(1.7)"
});

// Button animation on click
document.getElementById("load-btn").addEventListener("click", () => {
  gsap.to("#load-btn", {
    scale: 0.9,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut"
  });

  // Fake loading animation
  gsap.to(".icon", {
    rotation: "+=360",
    duration: 1.5,
    repeat: 1,
    ease: "power2.inOut"
  });
});
