const glow = document.getElementById('cursorGlow');
window.addEventListener('pointermove', (event) => {
  if (!glow) return;
  glow.style.transform = `translate(${event.clientX - 215}px, ${event.clientY - 215}px)`;
});

const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (!header) return;
  const active = window.scrollY > 36;
  header.style.background = active ? 'rgba(5,2,4,.88)' : 'rgba(5,2,4,.62)';
  header.style.borderColor = active ? 'rgba(244,200,77,.22)' : 'rgba(255,255,255,.13)';
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
reveals.forEach((item) => observer.observe(item));

const magnets = document.querySelectorAll('.magnet');
magnets.forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px) translateY(-4px)`;
  });
  button.addEventListener('pointerleave', () => {
    button.style.transform = '';
  });
});

const canvas = document.getElementById('particleCanvas');
const ctx = canvas?.getContext('2d');
let width = 0;
let height = 0;
let particles = [];

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.width = Math.floor(window.innerWidth * ratio);
  height = canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  const count = Math.min(150, Math.max(58, Math.floor(window.innerWidth / 10)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.36 * ratio,
    vy: (Math.random() - 0.5) * 0.36 * ratio,
    r: (Math.random() * 1.8 + 0.55) * ratio,
    tone: Math.random(),
  }));
}

function drawParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
    ctx.beginPath();
    ctx.fillStyle = p.tone > 0.68 ? 'rgba(244,200,77,.78)' : p.tone > 0.36 ? 'rgba(0,245,160,.64)' : 'rgba(74,134,255,.55)';
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
      const max = 125 * Math.min(window.devicePixelRatio || 1, 2);
      if (dist < max) {
        ctx.strokeStyle = `rgba(244,200,77,${(1 - dist / max) * 0.08})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
drawParticles();
window.addEventListener('resize', resizeCanvas);
