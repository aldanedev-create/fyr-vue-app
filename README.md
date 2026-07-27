# Fyr + Vue.js Together ⚡💚

A tiny app demonstrating **Fyr and Vue.js working together** in the same page.

[![Made with Fyr](https://img.shields.io/badge/Made%20with-Fyr-6ee7ff?style=flat-square)](https://github.com/aldane-dev-create/fyr)
[![Vue.js](https://img.shields.io/badge/With-Vue.js-42b883?style=flat-square)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## ✨ What It Shows

- 🔥 **Fyr** handles: Layout, navigation, shared state
- 💚 **Vue.js** handles: Interactive counter, todo list
- 🤝 **Communication**: Both frameworks share state via custom events

---

## 🎯 Features

| Tab | What It Does |
|-----|--------------|
| **Fyr** | Fyr-only counter and list |
| **Vue** | Vue-only counter and todos |
| **Together** | Fyr and Vue share state in real-time |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Fyr | 0.1.2 | Reactive framework (CDN) |
| Vue.js | 3.x | Reactive framework (CDN) |
| Vanilla CSS | - | Styling |

---

## 🚀 Quick Start



```bash

Open in browser
bash
# Just open index.html in your browser
open index.html
Or serve with any static server:

bash
# Using Python
python -m http.server 8000

# Using Node
npx serve
3. Open browser
Navigate to http://localhost:8000

📁 Project Structure
text
fyr-vue-app/
├── index.html          # Single HTML with both frameworks
├── style.css           # All styles
├── app.js              # Fyr controllers + Vue apps
└── README.md           # Documentation
🔄 Communication Flow
text
┌─────────────────────────────────────────────────────────────────┐
│                    COMMUNICATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FYR updates sharedMessage                                     │
│                    ↓                                           │
│  Vue watches and updates its UI                               │
│                    ↓                                           │
│  Vue emits event (vue-to-fyr)                                 │
│                    ↓                                           │
│  Fyr listens and updates state                                │
│                    ↓                                           │
│  Both frameworks stay in sync ✅                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
💡 Key Takeaway
You can use Fyr and Vue.js together — great for:

Gradual migration from Vue to Fyr (or vice versa)

Using the best tool for each job

Legacy code integration

Progressive enhancement

📝 License
MIT

Built with ❤️ — Fyr + Vue working in harmony ⚡💚