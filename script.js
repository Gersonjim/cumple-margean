// ========== CONFETI ==========
const confettiCanvas = document.getElementById('confetti');
const ctxConfetti = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiCount = 150;
const confetti = [];

for (let i = 0; i < confettiCount; i++) {
  confetti.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * confettiCount,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    tilt: Math.floor(Math.random() * 10) - 10,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05,
    tiltAngle: 0,
  });
}

function drawConfetti() {
  ctxConfetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((c) => {
    ctxConfetti.beginPath();
    ctxConfetti.lineWidth = c.r;
    ctxConfetti.strokeStyle = c.color;
    ctxConfetti.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctxConfetti.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
    ctxConfetti.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((c, i) => {
    c.tiltAngle += c.tiltAngleIncremental;
    c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
    c.x += Math.sin(c.d);

    if (c.y > confettiCanvas.height) {
      confetti[i] = {
        x: Math.random() * confettiCanvas.width,
        y: -20,
        r: c.r,
        d: c.d,
        color: c.color,
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: c.tiltAngleIncremental,
        tiltAngle: 0,
      };
    }
  });
}

setInterval(drawConfetti, 20);

// ========== FUEGOS ARTIFICIALES ==========
const fwCanvas = document.getElementById('fireworks');
const fwCtx = fwCanvas.getContext('2d');

fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;

let fireworks = [];

function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function Firework(x, y) {
  this.x = x;
  this.y = y;
  this.particles = [];

  for (let i = 0; i < 100; i++) {
    this.particles.push({
      x: x,
      y: y,
      vx: Math.cos((i * Math.PI * 2) / 100) * (Math.random() * 4),
      vy: Math.sin((i * Math.PI * 2) / 100) * (Math.random() * 4),
      alpha: 1,
      color: randomColor(),
    });
  }
}

Firework.prototype.update = function () {
  this.particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.015;
  });
  this.particles = this.particles.filter((p) => p.alpha > 0);
};

Firework.prototype.draw = function () {
  this.particles.forEach((p) => {
    fwCtx.globalAlpha = p.alpha;
    fwCtx.fillStyle = p.color;
    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    fwCtx.fill();
  });
  fwCtx.globalAlpha = 1;
};

function animateFireworks() {
  fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
  if (Math.random() < 0.05) {
    fireworks.push(new Firework(Math.random() * fwCanvas.width, Math.random() * fwCanvas.height / 2));
  }

  fireworks.forEach((fw, i) => {
    fw.update();
    fw.draw();
    if (fw.particles.length === 0) fireworks.splice(i, 1);
  });

  requestAnimationFrame(animateFireworks);
}

animateFireworks();

window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
});
