# 👶 Baby Name Reveal Website & GitHub Pages Deployment Guide

A beautiful, interactive, single-page web application to count down to your baby's name reveal on **August 16**! Includes live countdown timers, soft glassmorphism theme switcher, guest guessing poll, virtual guestbook, celebratory confetti reveal, and parent preview shortcut.

---

## 📁 Project File Structure

```
baby-name-reveal/
├── index.html          # Main HTML structure & semantic layout
├── style.css           # Modern design system, themes & animations
├── script.js           # Countdown timer, confetti, audio synthesizer & guest features
├── config.js           # Parent configuration file (Edit baby name, date, etc.)
├── assets/
│   └── baby_hero.png   # Hero banner image asset
└── README.md           # Step-by-step GitHub Pages hosting guide
```

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

Hosting your website on GitHub Pages is **100% Free** and takes less than 3 minutes! Follow these simple steps:

### Step 1: Create a New GitHub Repository
1. Log into [GitHub](https://github.com). (If you don't have an account, sign up for free at github.com).
2. Click the **`+`** icon in the top right corner and choose **`New repository`** (or visit [github.com/new](https://github.com/new)).
3. Enter a repository name (e.g. `baby-name-reveal`).
4. Keep the repository setting set to **`Public`**.
5. Do **not** check "Add a README file" (you already have this file in your project folder).
6. Click **`Create repository`**.

### Step 2: Upload Your Website Files
1. On the new repository page, click the link that says **`uploading an existing file`**.
2. Drag and drop all the files and folders from this project directory (`index.html`, `style.css`, `script.js`, `config.js`, `assets/` folder, `README.md`).
3. Scroll down to the bottom and click the green **`Commit changes`** button.

### Step 3: Turn On GitHub Pages
1. In your GitHub repository, click on **`Settings`** (the gear tab near the top).
2. On the left sidebar menu, click **`Pages`** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Choose **`Deploy from a branch`**.
   - **Branch**: Select **`main`** (or `master`), and leave the folder set to **`/ (root)`**.
4. Click **`Save`**.

### Step 4: Access Your Live Website! 🎉
- Wait about **1 to 2 minutes** for GitHub to build your site.
- Refresh the **Settings -> Pages** tab. You will see a banner at the top showing your live URL:
  👉 **`https://<your-username>.github.io/baby-name-reveal/`**
- Share this link with family and friends!

---

## ⚙️ How Parents Can Customize Settings (`config.js`)

You can edit all website details directly inside `config.js`:

```javascript
window.BabyRevealConfig = {
    // Set your exact date and time (August 16, 2026 at 12:00 PM)
    revealDate: "2026-08-16T12:00:00",

    // Parents Info & Titles
    parentNames: "Sarah & David",
    babyTitle: "Our Little Miracle",
    subtitle: "Something sweet is on the way...",

    // Baby Name Details (Revealed after countdown)
    babyName: "Aria Celeste",
    babyGender: "Girl", // "Girl", "Boy", or "Surprise"
    nameMeaning: "Aria means 'Melody / Gentle Breeze' and Celeste means 'Heavenly'.",

    // Themes: "neutral", "pink", or "blue"
    defaultTheme: "neutral",

    // Secret Admin Bypass Code
    secretCode: "reveal123"
};
```

---

## 🔑 Secret Preview Shortcut (Parent Admin Mode)

Want to preview what the reveal screen looks like before August 16 without waiting for the timer?

- **Keyboard Shortcut**: Press **`Shift + P`** on your keyboard anytime while viewing the site.
- **Footer Shortcut**: Scroll to the footer and click **`✨ Admin Preview`**, then type your secret code (default: `reveal123`).
