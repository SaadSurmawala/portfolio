// ===== Terminal typing effect =====
(function () {
  const typedEl = document.getElementById('typed-line');
  const outputEl = document.getElementById('terminal-output');
  if (!typedEl) return;

  const command = 'whoami --role=backend-developer';
  const outputs = [
    { text: 'name:      <span class="kw">Muhammad Saad Surmawala</span>', delay: 0 },
    { text: 'role:      <span class="kw">Backend Developer / Systems Support</span>', delay: 260 },
    { text: 'stack:     C#, .NET, PHP, Laravel, SQL Server, MySQL', delay: 520 },
    { text: 'status:    <span class="kw">open to work</span>', delay: 780 },
  ];

  let i = 0;
  function typeChar() {
    if (i <= command.length) {
      typedEl.textContent = command.slice(0, i);
      i++;
      setTimeout(typeChar, 45);
    } else {
      setTimeout(showOutputs, 300);
    }
  }

  function showOutputs() {
    outputs.forEach((line) => {
      const p = document.createElement('div');
      p.className = 'out-line';
      p.innerHTML = line.text;
      p.style.animationDelay = line.delay + 'ms';
      outputEl.appendChild(p);
    });
  }

  typeChar();
})();

// ===== Scroll reveal =====
(function () {
  const targets = document.querySelectorAll(
    '.col-label, .col-content, .timeline-item, .skill-group, .project-card, .edu-item, .contact-head, .contact-grid'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => io.observe(el));
})();

// ===== Contact form via EmailJS =====
// SETUP REQUIRED (all free):
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. connect your Gmail) -> copy the "Service ID"
// 3. Create an Email Template with variables: from_name, reply_to, message -> copy the "Template ID"
// 4. Go to Account > General -> copy your "Public Key"
// 5. Paste all three values below.
(function () {
  const EMAILJS_PUBLIC_KEY = 'f6GonHl4g7o5EtOit';
  const EMAILJS_SERVICE_ID = 'service_fs3drt4';
  const EMAILJS_TEMPLATE_ID = 'template_klu1f3e';

  if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const btn = document.getElementById('submit-btn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      // Fallback: EmailJS not configured yet -> open mail client instead.
      const name = form.from_name.value;
      const email = form.reply_to.value;
      const message = form.message.value;
      const subject = encodeURIComponent('Portfolio message from ' + name);
      const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = `mailto:saadsurmawala11@gmail.com?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email client — EmailJS not yet connected (see js/main.js).';
      status.className = 'form-status';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.textContent = '';
    status.className = 'form-status';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        status.textContent = "Message sent — thanks, I'll reply soon.";
        status.className = 'form-status success';
        form.reset();
      })
      .catch((err) => {
        status.textContent = 'Something went wrong. Please try the email link instead.';
        status.className = 'form-status error';
        console.error(err);
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = 'Send message';
      });
  });
})();
