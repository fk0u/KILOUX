<div align="center">
  <img width="120" src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=120&auto=format&fit=crop" alt="Kiloux Logo" style="border-radius: 20%;" />
  
  <h1 style="margin: 0;">Kiloux Studio</h1>
  
  <p>
    <strong>Indonesia's Leading IT & Design Agency</strong><br>
    <em>We craft digital realities. Immersive digital experiences, high-performance software, modern 3D assets, and interactive web solutions.</em>
  </p>

  <p>
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#license">License</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-19.0.0-blue?style=flat;&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=flat;&logo=vite;&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=flat;&logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/GSAP-3.14-88CE02?style=flat;&logo=greensock" alt="GSAP" />
    <img src="https://img.shields.io/badge/Firebase-12.x-FFCA28?style=flat;&logo=firebase;&logoColor=black" alt="Firebase" />
  </p>
</div>

---

## 🌌 About The Project

Kiloux Studio is a modern, visionary web platform demonstrating state-of-the-art interactive UI/UX mixed with powerful web technologies. By emphasizing 3D elements, fluid animations, and a dynamic bento-box grid layout, this project redefines the limits of what an IT & Design agency portfolio can deliver. 

Designed for scalability and visual immersion, the platform features a responsive glassmorphism aesthetic tailored to enhance user engagement.

## ✨ Features

- **Immersive 3D Integrations** – Powered by `@splinetool/react-spline` to render compelling 3D assets directly in the browser.
- **Fluid UI Animations** – Advanced timeline transitions, custom cursors, and layout interpolations leveraging **GSAP**, **Motion**, and **Lenis** (smooth scrolling).
- **Intelligent Chatbot / AI Integrations** – Ready integration with `@google/genai` to augment user interfaces and provide contextual, real-time feedback.
- **Bento UI Layouts** – Highly modular and responsive web layout utilizing specialized glassmorphic `BentoCard` components.
- **Internationalization (i18n)** – Seamless content translation support (English/Indonesia) using `react-i18next`.
- **Firebase Ready** – Realtime database/firestore architectures fully scaffolded via the Firebase V12 SDK.
- **Modern Routing & Tooling** – React Router v7 configured, and bundled at lightning speed through Vite.

## 🛠️ Tech Stack

This project is built using the most modern JavaScript ecosystem and libraries available:

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation Engine**: [GSAP](https://gsap.com/) & [Motion](https://motion.dev/)
- **3D Graphics**: [Spline React](https://spline.design/)
- **Database / Backend**: [Firebase V12](https://firebase.google.com/)
- **AI Models**: Google GenAI

## 🚀 Getting Started

Follow these instructions to set up the Kiloux Studio project on your local machine.

### Prerequisites

Ensure you have the following installed on your local environment:
- Node.js (v18.x or later)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/fk0u/kiloux.git
   cd kiloux
   \`\`\`

2. **Install all dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables**  
   Create a `.env.local` file in the root directory. You might need to set API keys as shown below:
   \`\`\`env
   # Example: Google Gemini API integration
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Add Firebase Configurations here if needed
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_PROJECT_ID=your_project_id
   \`\`\`

4. **Run the local development server**
   \`\`\`bash
   npm run dev
   \`\`\`

Your app should now be running locally on [http://localhost:5173/](http://localhost:5173/) or any adjacent port provided by Vite!

## 📜 Available Scripts

In the project directory, you can run:

| Script | Description |
|--------|-------------|
| `npm run dev` | Runs the app in development mode. |
| `npm run build` | Builds the app for production to the `dist` folder. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Performs TypeScript type-checking (`tsc --noEmit`). |
| `npm run clean` | Removes the compiled `dist` folder to ensure a clean build state. |

## 👨‍💻 Contributing

We welcome contributions to Kiloux Studio! Before opening a pull request, please make sure your feature seamlessly ties into the overall "Glassmorphism ;& Immersive 3D" aesthetic of the project.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Crafted with precision by the Kiloux Studio Team.*
