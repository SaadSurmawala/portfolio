# Muhammad Saad Surmawala — Portfolio

A 3D animated developer portfolio built from scratch with plain HTML, CSS, and JavaScript (Three.js for the animated background, no build tools required).

## What's inside

- `index.html` — all page content
- `css/style.css` — full design system (colors, type, layout)
- `js/background.js` — 3D animated node network (Three.js), hero background
- `js/skills-network.js` — 2D animated node graph, skills section
- `js/main.js` — terminal typing effect, scroll animations, contact form logic

No npm install, no build step. Just open `index.html` in a browser, or host it anywhere static (GitHub Pages, Netlify, Vercel).

---

## 1. Run it locally

Just double-click `index.html`, or from a terminal in this folder:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

---

## 2. Connect the contact form to your email (free, 5 minutes)

Right now the form falls back to opening the visitor's email app. To make messages land directly in your inbox without that step, connect **EmailJS** (free tier: 200 emails/month, no backend needed):

1. Go to **https://www.emailjs.com** and create a free account.
2. **Add an Email Service** → choose Gmail → connect `saadsurmawala11@gmail.com`. Copy the **Service ID**.
3. **Create an Email Template**. Use these variable names in the template body (they match the form fields):
   - `{{from_name}}`
   - `{{reply_to}}`
   - `{{message}}`

   Copy the **Template ID**.
4. Go to **Account → General** and copy your **Public Key**.
5. Open `js/main.js`, find this block near the top of the "Contact form" section, and paste your three values in:

   ```js
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```

6. Save, refresh the page, and test the form — messages will now arrive directly in your Gmail inbox.

Until you do this, the form still works: it opens the visitor's email client with your address pre-filled, so nothing is broken in the meantime.

---

## 3. Put it on GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

## 4. Host it for free with GitHub Pages

1. On GitHub, go to your repo → **Settings → Pages**
2. Under "Source", choose the `main` branch and `/ (root)` folder
3. Save — your site will be live at:
   `https://<your-username>.github.io/portfolio/`

---

## Editing content

- Text content: edit directly inside `index.html` — it's plain HTML, sections are labeled with comments (`<!-- HERO -->`, `<!-- PROJECTS -->`, etc.)
- Colors: all defined once at the top of `css/style.css` under `:root` — change `--accent` to swap the accent color site-wide
- Skills chips / project cards: duplicate the existing `<span>` or `<article class="project-card">` blocks and edit the text
