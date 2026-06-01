const glow = document.getElementById('cursorGlow');
window.addEventListener('pointermove', (event) => {
  if (!glow) return;
  glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach((item) => observer.observe(item));

const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (!header) return;
  header.style.background = window.scrollY > 40 ? 'rgba(2,3,10,.88)' : 'rgba(2,3,10,.66)';
});

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
let w = 0;
let h = 0;
let particles = [];

function resize() {
  w = canvas.width = window.innerWidth * devicePixelRatio;
  h = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  const count = Math.min(120, Math.floor(window.innerWidth / 12));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.28 * devicePixelRatio,
    vy: (Math.random() - 0.5) * 0.28 * devicePixelRatio,
    r: (Math.random() * 1.8 + 0.6) * devicePixelRatio,
    tone: Math.random()
  }));
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.fillStyle = p.tone > 0.66 ? 'rgba(0,245,160,.8)' : p.tone > 0.33 ? 'rgba(244,200,77,.65)' : 'rgba(74,134,255,.55)';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 130 * devicePixelRatio;
      if (dist < max) {
        ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / max) * 0.08})`;
        ctx.lineWidth = 1 * devicePixelRatio;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}

resize();
draw();
window.addEventListener('resize', resize);
