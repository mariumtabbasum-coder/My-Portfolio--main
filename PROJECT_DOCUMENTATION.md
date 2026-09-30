# Marium Tabassum Portfolio — Developer Documentation

## 1. Project Overview & Purpose
This repository contains the personal portfolio web application for **Marium Tabassum**, a Software Engineering Student at Aptech Computer Education (Diploma in Software Engineering, Semester 1 complete) and Generative AI Scholar at Bano Qabil.

The portfolio serves as an interactive showcase of her technical skills (HTML5, CSS3, JavaScript, Bootstrap 5, jQuery, Python, and Generative AI fundamentals), featured projects (Olive Grove Restaurant, Intelligent Knowledge Chatbot, RAG Document, etc.), learning journey, certifications, and professional services. It also includes an embedded CV/Resume viewer modal and a full-featured admin CMS dashboard for managing content dynamically.

---

## 2. Full Tech Stack

### Frontend
- **Framework & Runtime**: React 18 with TypeScript (`.tsx`)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (Vanilla CSS variables `--bg-primary`, `--bg-secondary`, `--text-primary`, etc., with dark/light mode toggle)
- **Icons**: Lucide React (`lucide-react`)
- **Typography**: Plus Jakarta Sans & JetBrains Mono (Google Fonts)

### Backend
- **Server Environment**: Node.js with TypeScript (`server.ts`)
- **Web Framework**: Express.js (`express`)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), bcrypt password hashing (`bcryptjs`)
- **File Uploads**: Multer (`multer`) for image and file attachments

### Database & Storage
- **Database**: File-based JSON store (`server/data/store.json`) with modular CRUD helper utilities (`server/data/store.ts` & `server/models/`)
- **Static Assets**: PDF resume serving (`public/cv.pdf`) and image uploads (`uploads/`)

### Hosting & Infrastructure
- **Deployment Platform**: Vercel / Node server host
- **SEO & Search Indexing**: Standard `sitemap.xml`, AI scraper filtering via `robots.txt`, structured JSON-LD schemas, and `llms.txt`

---

## 3. Complete Folder & File Structure

```
My-Portfolio--main/
├── .env.example                       # Template for environment variables
├── .gitattributes                     # Git attribute configurations
├── .gitignore                         # Ignored paths (node_modules, dist, etc.)
├── CHANGELOG.md                       # Historical log of all changes & updates
├── PROJECT_DOCUMENTATION.md           # Developer documentation & guide
├── PROJECT_ARCHITECTURE_AND_CHANGES.md# Architectural overview document
├── README.md                          # Repository summary & quick start
├── index.html                         # HTML entry point with meta tags & JSON-LD
├── llms.txt                           # AI answer engines portfolio summary
├── metadata.json                      # Workspace metadata configuration
├── package.json                       # Dependencies & scripts
├── tsconfig.json                      # TypeScript configuration
├── vite.config.ts                     # Vite build & dev server configuration
├── server.ts                          # Express backend server entry point
├── public/                            # Static assets root
│   ├── cv.pdf                         # Official downloadable PDF resume
│   ├── icon.svg                       # Website favicon & SVG branding
│   ├── llms.txt                       # Public AI answer engines summary
│   ├── resume.pdf                     # Resume document copy
│   ├── robots.txt                     # Crawler rules & AI bot disallow list
│   └── sitemap.xml                    # Search engine XML sitemap
├── uploads/                           # Uploaded project images & assets
├── server/                            # Backend logic & API endpoints
│   ├── config/                        # Server configurations
│   ├── data/                          # JSON data store (`store.json`)
│   ├── middleware/                    # Auth token verification middleware
│   ├── models/                        # Data entity models (skills, projects, etc.)
│   ├── routes/                        # Express API route handlers
│   └── utils/                         # Helper functions & auth helpers
└── src/                               # Frontend source code
    ├── App.tsx                        # Main application component & router
    ├── main.tsx                       # React application entry point
    ├── index.css                      # Global styles, Tailwind imports & CSS variables
    ├── types.ts                       # TypeScript interfaces & type definitions
    └── components/                    # Modular React components
        ├── Navbar.tsx                 # Top navigation header & theme toggle
        ├── Hero.tsx                   # Hero banner, bio, proof badges & CV modal
        ├── About.tsx                  # Tabbed about section & core vision
        ├── Skills.tsx                 # Filterable skill cards & progress bars
        ├── Projects.tsx               # Portfolio showcase & project detail modals
        ├── Services.tsx               # Professional service offerings grid
        ├── LearningJourney.tsx        # Academic timeline & milestone status
        ├── Certificates.tsx           # Verified certifications grid
        ├── Contact.tsx                # Interactive contact form & details
        ├── Footer.tsx                 # Footer branding & quick section links
        ├── AdminLogin.tsx             # Secure login screen for admin CMS
        └── AdminDashboard.tsx         # Content management panel
```

---

## 4. Public Pages & Sections

The single-page application (SPA) consists of the following public sections:

1. **Header / Navbar (`#home`)**:
   - Brand logo and name (`MT / Marium Tabassum`)
   - Navigation links (Home, About, Skills, Projects, Services, Journey, Certificates, Contact)
   - Dark / Light mode theme switcher button
   - Quick "Contact" action CTA button
   - Mobile responsive slide-out drawer menu

2. **Hero Section (`#home`)**:
   - Student & developer status badge (*Aptech Computer Education • Semester 1 Complete*)
   - Main headline (*Building Modern Frontend Experiences & Web Solutions*)
   - Summary bio and quick proof badges (*Aptech, Bano Qabil, Location*)
   - Interactive developer card preview with live skill level indicators and code snippet
   - "View Featured Projects" & "View CV / Resume" CTA buttons
   - **CV Viewer Modal**: Embedded PDF viewer tab and structured text view with download options

3. **About Section (`#about`)**:
   - Academic story and diploma background at Aptech Computer Education
   - Generative AI scholar details at Bano Qabil
   - Core philosophy: Clean code, responsive design, continuous learning

4. **Skills Section (`#skills`)**:
   - Filter tabs (*All Skills, Programming, Core Web / Frontend, Frameworks & AI*)
   - Skill cards displaying proficiency level percentage bars and badge levels (HTML5, CSS3, JavaScript, Bootstrap 5, jQuery, Python, Generative AI)

5. **Projects Section (`#projects`)**:
   - Category filtering (*All, Web Apps, AI & Tools, Design & UI*)
   - Detailed project cards with live demo & GitHub repository links, tags, and featured badges
   - Interactive modal popup with full project description and key features list

6. **Services Section (`#services`)**:
   - Responsive Website Development
   - Website Redesign & Modernization
   - Custom Landing Pages
   - AI Chatbot & Tool Exploration

7. **Learning Journey Section (`#journey`)**:
   - Chronological timeline featuring completed, active, and planned milestones (Aptech Semester 1, Bano Qabil GenAI, Python mastery, upcoming diploma semesters)

8. **Certifications Section (`#certificates`)**:
   - Verified credentials grid detailing issuer, date, skills covered, and credential IDs

9. **Contact Section (`#contact`)**:
   - Direct contact details (Phone, Email, Location)
   - Guaranteed response time badge ("Within 24 Hours")
   - Interactive contact form sending messages directly to backend storage
   - Copy email helper button

10. **Footer**:
    - Copyright information, quick jump links, and social profile links

---

## 5. Admin Panel Sections

Accessible via the `/admin` path (requires admin authentication):

1. **Home / Hero Manager**: Edit hero badges, main headline lines, primary & secondary CTA text and links.
2. **About Manager**: Update main about bio, heading, subtitle, Aptech diploma details, and learning philosophy.
3. **Skills Manager**: Add, edit, or delete technical skills, proficiency levels, categories, and badge levels.
4. **Projects Manager**: Create, update, or remove portfolio projects, including titles, descriptions, image URLs, tags, GitHub/Live links, and featured flags.
5. **Services Manager**: Manage offered services, descriptions, icon assignments, and key feature highlights.
6. **Journey Manager**: Manage chronological timeline milestones, periods, organizations, descriptions, statuses, and bullet highlights.
7. **Certificates Manager**: Add or edit formal certifications, credential IDs, dates, and associated skills.
8. **Contact & Social Manager**: Update email addresses, phone number, location string, response time text, and social links (GitHub, LinkedIn, Twitter, Facebook, Instagram).
9. **Messages Inbox**: View, inspect, mark as read, or delete contact form messages submitted by site visitors.

---

## 6. Required Environment Variables

When running locally or deploying, set up the following environment variable names in your `.env` file:

```env
# Server Port Configuration
PORT=5000

# Client Application Title
VITE_APP_TITLE=Marium Tabassum - Portfolio

# Admin Credentials & Security
ADMIN_PASSWORD=your_secure_admin_password
JWT_SECRET=your_random_jwt_secret_key
```

---

## 7. Developer Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Installation
1. Clone or navigate to the project root directory:
   ```bash
   cd My-Portfolio--main
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Environment
- Start Vite frontend dev server:
  ```bash
  npm run dev
  ```
- Start Node backend server:
  ```bash
  npx tsx server.ts
  ```

### Building for Production
- Create production bundle:
  ```bash
  npm run build
  ```
