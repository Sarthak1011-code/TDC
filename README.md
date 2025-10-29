# TIT Developer Community 🚀

A modern, feature-rich website for the TIT Developer Community built with React, TypeScript, and Tailwind CSS.

![TIT Developer Community](https://img.shields.io/badge/Built%20with-React%20%2B%20TypeScript-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Core Features
- 🏠 **Home Page** - Engaging hero section with video background
- 📖 **About Section** - Community overview and mission
- 🎯 **MVP Section** - Mission, Vision, and Passion
- 👨‍🏫 **Mentors Section** - Meet our teaching assistants
- 🎉 **Events Page** - Browse past and upcoming events
- 🏆 **Hall of Fame** - Celebrate our achievers
- 🖼️ **Gallery** - Photo gallery of community events
- 📧 **Contact Form** - Get in touch (powered by EmailJS)

### New UI/UX Enhancements
- 🌓 **Dark/Light Mode Toggle** - Smooth theme switching with system preference detection
- ⏳ **Loading Screen** - Beautiful animated loading screen with progress bar
- 📊 **Scroll Progress Indicator** - Visual progress bar at the top
- ⬆️ **Back to Top Button** - Quick scroll to top functionality
- 📱 **Improved Mobile Navigation** - Slide-in hamburger menu with smooth animations

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **EmailJS** - Contact form functionality
- **React Hot Toast** - Beautiful notifications

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sarthak1011-code/TDC.git
cd "TIT Dev Community"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get your EmailJS credentials from [emailjs.com](https://www.emailjs.com/)

4. **Run the development server**
```bash
npm run dev
```

Visit `http://localhost:5173` to view the site.

## 🚀 Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar/         # Navigation bar with mobile menu
│   ├── NavLink/        # Custom navigation links
│   ├── ThemeToggle/    # Dark/Light mode toggle
│   ├── LoadingScreen/  # Initial loading animation
│   ├── ScrollProgress/ # Scroll progress indicator
│   └── BackToTop/      # Back to top button
├── contexts/           # React contexts
│   └── ThemeContext/   # Theme management
├── pages/              # Page components
│   ├── Events/         # Events listing page
│   ├── EventDetails/   # Individual event details
│   ├── HallOfFame/     # Hall of fame page
│   └── Gallery/        # Photo gallery
├── features/           # Feature-based modules
│   ├── events/         # Events feature
│   └── hallOfFame/     # Hall of fame feature
├── routes/             # Route configurations
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Theme System

The site supports both dark and light modes:

- **Auto-detection** of system preferences
- **Manual toggle** with persistent storage
- **Smooth transitions** between themes
- **Custom scrollbar** styled for both themes

## 📱 Responsive Design

Fully responsive design with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌟 Key Components

### ThemeToggle
Floating button that switches between light and dark modes.

### LoadingScreen
Animated loading screen with progress bar shown on initial page load.

### ScrollProgress
Thin progress bar at the top showing scroll position.

### BackToTop
Floating button that appears when scrolling down, allowing quick return to top.

### Mobile Navigation
Slide-in menu from the right with smooth animations and overlay backdrop.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

**TIT Developer Community**
- Empowering Juniors, Led by Seniors
- Building the future of technology together

## 📞 Contact

- **Email**: Use the contact form on the website
- **GitHub**: [Sarthak1011-code](https://github.com/Sarthak1011-code)

## 🙏 Acknowledgments

- All our amazing community members
- Our dedicated mentors and teaching assistants
- Everyone who contributed to making this community great

---

**© 2025 TIT Developer Community. All rights reserved.**

Powered by TIT Excellence 💜

