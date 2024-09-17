const canvas = document.getElementById("animated-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Create particle
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1; // Random size between 1 and 6
    this.speedX = Math.random() * 3 - 1.5; // Random horizontal speed
    this.speedY = Math.random() * 3 - 1.5; // Random vertical speed
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off the edges of the screen
    if (this.size > 0.2) this.size -= 0.02; // Shrink over time
  }

  draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

// Create particle array
function init() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

// Animate particles
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle, index) => {
    particle.update();
    particle.draw();

    // Remove particles that are too small
    if (particle.size <= 0.2) {
      particlesArray.splice(index, 1);
      particlesArray.push(new Particle()); // Add new particles to replace them
    }
  });
  requestAnimationFrame(animate);
}

// Responsive canvas resizing
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Initialize and animate
init();
animate();
