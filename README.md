# About

A dark, Apple-inspired single-page portfolio built with React 19 and Vite, showcasing my work as a software developer. Designed for performance, interactivity, and a premium feel.

## Features

- **Cinematic loading screen** — dual-ring orbital animation with an eased progress bar
- **Interactive hero** — mouse-tracked aurora parallax, cursor spotlight, and typewriter role cycling
- **Floating pill navbar** — active section detection via `getBoundingClientRect`, mobile hamburger menu
- **5 full sections** — Home, About, Experience, Projects, Contact
- **Scroll-reveal animations** — `IntersectionObserver`-driven fade + slide on every section
- **Apple-style glassmorphism** — glass nav, glass cards, glass inputs throughout
- **Project cards** — hover glow, gradient overlay, and animated arrow via React state
- **Experience cards** — company logo/badge, achievements list, tech stack, hover lift effect
- **Contact form** — client-side validation, loading spinner, success state
- **Fully responsive** — mobile-first, CSS grid with `auto-fit` for fluid layouts
- **Accessibility** — `prefers-reduced-motion` support, ARIA labels, semantic HTML

## Tech Stack

| Layer          | Technology                                                     |
| -------------- | -------------------------------------------------------------- |
| Frontend       | React 19, Vite 8                                               |
| Styling        | Tailwind CSS v4 (`@tailwindcss/vite`)                          |
| Fonts          | Archivo (headings), Space Grotesk (body)                       |
| Animations     | CSS keyframes, `IntersectionObserver`, `requestAnimationFrame` |
| Future backend | ASP.NET Core Web API, PostgreSQL                               |

## Sections

| Section        | Description                                                |
| -------------- | ---------------------------------------------------------- |
| **Home**       | Aurora hero with parallax, typewriter role, CTA buttons    |
| **About**      | Photo placeholder, bio, stat cards, skill chips            |
| **Experience** | Co-op, part-time, and volunteer roles as Apple-style cards |
| **Projects**   | Enabled Talent Dashboard, Memory Battle, and more          |
| **Contact**    | Validated form, GitHub & LinkedIn links, footer            |

## Getting Started

```bash
# Clone
git clone https://github.com/Agcaoili4/Portfolio.git
cd Portfolio

# Install
npm install

# Develop
npm run dev
# → http://localhost:5173

# Build
npm run build
```

## Project Structure

```
src/
├── assets/                  # Company logos, images
├── Components/
│   ├── loadingScreen.jsx    # Orbital loading animation
│   ├── topnav.jsx           # Floating pill navbar
│   ├── heroSection.jsx      # Aurora + parallax + typewriter hero
│   ├── aboutSection.jsx     # Bio, stats, skills
│   ├── experienceSection.jsx # Work experience cards
│   ├── projectsSection.jsx  # Project showcase cards
│   ├── contactSection.jsx   # Contact form + socials
│   └── homeLayout.jsx       # Root layout wrapper
├── App.jsx                  # Loading gate + layout mount
├── index.css                # Global styles, CSS animations, theme
└── App.css
```

## Contact

- Email: ajagcaoili4@gmail.com
- LinkedIn: [linkedin.com/in/jansen-agcaoili](https://www.linkedin.com/in/jansen-agcaoili/)
- GitHub: [github.com/Agcaoili4](https://github.com/Agcaoili4)
