# Marium Tabassum — Personal Portfolio Website
## Project Architecture, Implementation Log & Configuration Guide

This document provides a comprehensive architectural overview, summary of recent changes and updates, and configuration guidelines for Marium Tabassum’s personal MERN-stack portfolio web application.

---

## 1. Project Workflow & Architecture

### A. Core Stack & Architecture
- **Frontend Architecture**: Built using **React 18**, **Vite**, and **TypeScript**, styled with **Tailwind CSS** and enhanced with **Lucide React** icons.
- **Backend Architecture**: A lightweight Express/Node.js server (`server.ts`) configured to handle API requests and production asset serving.
- **Styling & Theme Engine**: Supports instantaneous Light and Dark mode toggling via Tailwind CSS `dark:` variant classes and `localStorage` persistence, ensuring seamless user preference retention across sessions.
- **Responsive Design**: Mobile-first design system utilizing Tailwind's responsive breakpoints (`sm`, `md`, `lg`, `xl`) with dedicated mobile navigation drawers and collapsible interactive menus.

### B. System & Data Flow
1. **Client-Side Routing & Navigation**: The `Navbar` component manages smooth section scrolling with dynamic offset calculation and active section detection via scroll listeners.
2. **Component Modularization**: The application is structured into discrete, highly maintainable functional components:
   - `Navbar`: Branding, smooth navigation links, theme switcher, and Quick Contact CTA.
   - `Hero`: Introductory headline, student bio, developer dashboard preview card, academic badge, and CV viewer trigger.
   - `About`: Interactive tabbed interface detailing My Journey, Education & Aptech milestones, and Core Vision/Principles.
   - `Skills`: Filterable skill grid focusing strictly on core web fundamentals and languages (HTML, CSS, JavaScript, Bootstrap, jQuery, Python, Generative AI).
   - `Projects`: Showcase of verified portfolio projects (Portfolio Website, Olive Grove Restaurant, Intelligent Knowledge Chatbot, RAG Document) with purging of legacy items.
   - `Services`: Professional offerings showcasing Responsive Web Development, Website Redesign, Custom Landing Pages, and AI Chatbot & Tool Exploration.
   - `LearningJourney`: Chronological timeline reflecting academic milestones (Aptech Semester 1, Python Foundations, Bano Qabil GenAI, and upcoming roadmap semesters).
   - `Certificates`: In-progress and completed formal statuses.
   - `Contact`: Interactive contact form with submission state management, email copy helper, response time guarantee ("Within 24 Hours"), and LinkedIn profile links.
   - `Footer`: Copyright, social links, and quick jump navigation.
3. **Environment & Security**: Sensitive keys and credentials are securely managed through `.env` configuration files.

---

## 2. Summary of Changes & Implementation Log

All updates have been strictly executed in accordance with the project reference instructions, CV details, and UI/UX design standards:

1. **Content & Bio Refinement**:
   - Updated all student biography references across `Hero`, `About`, and `Navbar` to accurately reflect Marium Tabassum's status as a Software Engineering student at **Aptech Computer Education** (Semester 1 complete, continuing upcoming semesters) and Generative AI learner at **Bano Qabil**.
2. **Project Portfolio Curations**:
   - **Removed**: "Daily Design" and "Caffe".
   - **Added / Updated**:
     - *Portfolio Website*: Modern React/Tailwind portfolio.
     - *Olive Grove Restaurant*: Fully responsive restaurant web application with interactive menus and clean UI layout.
     - *Intelligent Knowledge Chatbot*: Conversational AI interface exploring LLM prompt flows.
     - *RAG Document*: Document retrieval and AI-assisted query exploration tool.
3. **Services Section Addition**:
   - Created `src/components/Services.tsx` and integrated it into `src/App.tsx` and `Navbar.tsx`, featuring 4 professional offerings:
     - Responsive Website Development
     - Website Redesign & Modernization
     - Custom Landing Pages
     - AI Chatbot & Tool Exploration
4. **Skills Streamlining**:
   - Filtered skills strictly to core competencies requested: HTML5, CSS3, JavaScript ES6+, Bootstrap 5, jQuery, Python, and Generative AI.
5. **UI & Design Consistency**:
   - Preserved the existing sophisticated dark/light color palette, typography, gradients, and micro-interactions without any unauthorized redesigns.

---

## 3. Configuration & Maintenance Guidelines

### A. Environment Variables (`.env`)
The project utilizes an `.env` file at the root directory for secure configuration:
```env
# Example Environment Configuration
VITE_APP_TITLE=Marium Tabassum - Portfolio
PORT=5000
```
Ensure sensitive API credentials or deployment endpoints are added to `.env` and kept out of version control.

### B. Updating the CV File
To replace the CV placeholder with your actual CV:
1. Place your PDF file in the `public/` directory and name it `cv.pdf` (e.g., `public/cv.pdf`).
2. Update the anchor tag in `src/components/Hero.tsx` from `#cv-placeholder` to `/cv.pdf` with `target="_blank" rel="noopener noreferrer"`:
   ```tsx
   <a
     href="/cv.pdf"
     target="_blank"
     rel="noopener noreferrer"
     className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all hover:scale-[1.02] flex items-center gap-2"
   >
     <FileText className="w-4 h-4 text-cyan-500" />
     <span>View CV</span>
   </a>
   ```

---
*Generated for Marium Tabassum Portfolio Project.*
