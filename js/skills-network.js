(function () {
  const canvas = document.getElementById('skills-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const LABELS = ['C#', '.NET', 'SQL', 'PHP', 'Laravel', 'MySQL', 'Git', 'REST', 'EF', 'JS'];
  let nodes = [];

  function buildNodes() {
    nodes = LABELS.map((label, i) => ({
      label,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 3 + Math.random() * 2,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 20 || n.x > w - 20) n.vx *= -1;
      if (n.y < 20 || n.y > h - 20) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 160) {
          ctx.strokeStyle = `rgba(34, 48, 73, ${1 - d / 160})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.font = '11px JetBrains Mono, monospace';
    for (const n of nodes) {
      ctx.fillStyle = '#E0A458';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(154, 167, 189, 0.7)';
      ctx.fillText(n.label, n.x + 8, n.y + 4);
    }

    requestAnimationFrame(step);
  }

  function init() {
    resize();
    buildNodes();
    step();
  }

  window.addEventListener('resize', () => { resize(); });
  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);
})();
