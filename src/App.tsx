import { FormEvent, useEffect, useRef, useState } from 'react';
import { Code2, Users, ChevronDown, Github, Linkedin, Eye, ChevronUp, Phone, MapPin, Mail, Rocket, Pencil } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import Events from './pages/Events';
import { NavLink } from './components/NavLink';
import EventDetails from './pages/EventDetails';
import HallOfFame from './pages/HallOfFame';
import { Navbar } from './components/Navbar';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { Gallery } from './pages/Gallery';
import { LoadingScreen } from './components/LoadingScreen';
import { VideoCard } from './components/VideoCard';
import { ScrollProgress } from './components/ScrollProgress';
import { BackToTop } from './components/BackToTop';
import { ThemeToggle } from './components/ThemeToggle';
import { AnimatedCounter } from './components/AnimatedCounter';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { GlassCard } from './components/GlassCard';
import { FloatingActionMenu } from './components/FloatingActionMenu';
import { AchievementBadges } from './components/AchievementBadges';
import { InteractiveCursor } from './components/InteractiveCursor';
import { ParallaxSection } from './components/ParallaxSection';
import { ThreeScene } from './components/ThreeScene';
import { StaggerAnimation } from './components/StaggerAnimation';




const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success('Message sent successfully!');
      formRef.current.reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Your form fields here */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-white mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400"
            placeholder="How can we help?"
          />
        </div>
        <div>
          <label className="block text-white mb-2">Message</label>
          <textarea
            name="message"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 h-32"
            placeholder="Your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <ScrollProgress />
      <BackToTop />
      <ThemeToggle />
      <FloatingActionMenu />
      {/* Temporarily disabled InteractiveCursor to fix initialization error */}
      {/* <InteractiveCursor /> */}
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/hall-of-fame" element={<HallOfFame />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );

}






function MainApp() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {

    const animateOnScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;

          const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (isMobile && reducedMotion) {
            element.style.opacity = '1';
            return;
          }
          const animationType = element.getAttribute('data-animation') || 'fade';
          const delay = element.getAttribute('data-delay') || '0';

          element.classList.add('animate__animated');

          switch (animationType) {
            case 'fade':
              element.classList.add('animate__fadeIn');
              break;
            case 'slide-up':
              element.classList.add('animate__fadeInUp');
              break;
            case 'slide-left':
              element.classList.add('animate__fadeInLeft');
              break;
            case 'slide-right':
              element.classList.add('animate__fadeInRight');
              break;
            case 'zoom':
              element.classList.add('animate__zoomIn');
              break;
            case 'rotate':
              element.classList.add('animate__rotateIn');
              break;
            default:
              element.classList.add('animate__fadeIn');
          }

          if (delay !== '0') {
            element.style.animationDelay = `${delay}ms`;
          }

          observer.unobserve(element);
        }
      });
    };



    const observer = new IntersectionObserver(animateOnScroll, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => observer.observe(el));

    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }



    const mentorSlider = document.getElementById('mentor-slider');
    const mentorDots = document.querySelectorAll('.mentor-dot');

    if (mentorSlider && mentorDots.length) {
      let currentIndex = 0;
      const mentorCount = 3;

      const updateSlider = () => {
        const offset = -currentIndex * 100;
        mentorSlider.style.transform = `translateX(${offset}%)`;

        mentorDots.forEach((dot, index) => {
          if (index === currentIndex) {
            dot.classList.add('bg-indigo-600');
            dot.classList.remove('bg-gray-300');
          } else {
            dot.classList.remove('bg-indigo-600');
            dot.classList.add('bg-gray-300');
          }
        });
      };

      const autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % mentorCount;
        updateSlider();
      }, 3000);

      mentorDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          currentIndex = index;
          updateSlider();
        });
      });

      return () => {
        clearInterval(autoSlide);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-br from-purple-50 via-white to-pink-50 transition-colors duration-300">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />

      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}
      </style>

      <Navbar />


      {/* Hero Section with Video Background */}
      <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-20 min-h-screen flex items-center relative overflow-hidden">
        
          <div className="absolute inset-0 w-full h-full z-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
              // poster="vid/poster.jpg" // Add poster frame
            >
              {/* <source src="vid/mobile-optimized.mp4" media="(max-width: 768px)" /> */}
              <source src="vid/7989454-hd_1920_1080_25fps.mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500"


              data-animate
              data-animation="zoom">
              TIT Developer{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Community
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed"
              data-animate
              data-animation="slide-up"
              data-delay="300">
              A vibrant community of passionate developers, innovators, and tech enthusiasts
              coming together to learn, grow, and build the future of technology.<br /><br />
              "Empowering Juniors, Led by Seniors – Join the Revolution!"
            </p>


            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              data-animate
              data-animation="slide-up"
              data-delay="300">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 duration-300 font-medium flex items-center"
              >
                Join Community <Users className="ml-2 w-5 h-5" />
              </button>
              <NavLink href="#about" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-white hover:text-white font-medium flex items-center justify-center">
                Learn More <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" ref={aboutRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div
              data-animate
              data-animation="slide-right"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 md:mb-8">
                About Our Community
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
                TIT Developer Community is a student-led initiative bridging the gap
                between juniors and seniors through free mentorship. Our community brings together
                students passionate about technology, creating an environment where creativity meets technical expertise.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Empower students with real-world knowledge, industry
                insights, and hands-on learning.
                We organize regular workshops, hackathons, and coding competitions that challenge our members
                to push their boundaries and develop practical skills.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We offer guidance through mentorship programs, hackathons, and
                workshops to help students succeed in the tech industry.
              </p>
            </div>
            <div
              className="relative mt-8 lg:mt-0"
              data-animate
              data-animation="slide-left"
              data-delay="300"
            >
              <img
                src="vid/About.jpg"
                alt="Community meetup"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/20">
                <div className="text-2xl font-bold text-white mb-2">100+</div>
                <div className="text-gray-300">Active Members</div>
              </div>
            </div>
          </div>
          
          {/* Animated Stats Row */}
          <div className="mt-24">
            <StaggerAnimation className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <GlassCard className="p-6 text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                  <AnimatedCounter end={100} suffix="+" />
                </div>
                <p className="text-gray-300">Members</p>
              </GlassCard>
              
              <GlassCard className="p-6 text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 mb-2">
                  <AnimatedCounter end={50} suffix="+" />
                </div>
                <p className="text-gray-300">Events</p>
              </GlassCard>
              
              <GlassCard className="p-6 text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <p className="text-gray-300">Mentors</p>
              </GlassCard>
              
              <GlassCard className="p-6 text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 mb-2">
                  <AnimatedCounter end={200} suffix="+" />
                </div>
                <p className="text-gray-300">Projects</p>
              </GlassCard>
            </StaggerAnimation>
          </div>
        </div>
      </section>

      {/* 3D Interactive Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-3 sm:mb-4">
              Experience Innovation
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-3 sm:mb-4">Interact with our 3D visualization</p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-400 px-4">
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs sm:text-base">🖱️</span>
                <span className="hidden sm:inline">Drag to rotate</span>
                <span className="sm:hidden">Drag</span>
              </span>
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs sm:text-base">🎯</span>
                <span className="hidden sm:inline">Click objects</span>
                <span className="sm:hidden">Click</span>
              </span>
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs sm:text-base">🔍</span>
                <span className="hidden sm:inline">Scroll to zoom</span>
                <span className="sm:hidden">Zoom</span>
              </span>
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs sm:text-base">👆</span>
                <span className="hidden sm:inline">Hover for effects</span>
                <span className="sm:hidden">Tap</span>
              </span>
            </div>
          </div>
          
          <div className="h-[300px] sm:h-[400px] md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 shadow-2xl shadow-purple-500/10 touch-none">
            <ThreeScene className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* MVP Section */}
      <section id="mvp" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16"
            data-animate
            data-animation="fade"
          >
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-300">The principles that guide our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mission",
                icon: Rocket,
                gradient: "from-blue-400 to-blue-600",
                description: "To empower students with cutting-edge development skills, bridging the gap between theory and real-world innovation. We cultivate a dynamic, collaborative ecosystem where creativity thrives, ideas transform into solutions, and technical excellence becomes second nature. Together, we build the future—one line of code, one breakthrough, and one visionary at a time.",
                animation: "slide-up",
                delay: "200"
              },
              {
                title: "Vision",
                icon: Eye,
                gradient: "from-purple-400 to-purple-600",
                description: "To become the leading student-led tech community—a launchpad for the next generation of innovators. We don’t just follow trends; we set them. By fostering a culture of curiosity, collaboration, and relentless problem-solving, we empower students to push boundaries, build transformative tech, and leave their mark on the digital world. Recognized for excellence, driven by passion, and united by code, we are the architects of tomorrow’s technology.",
                animation: "slide-up",
                delay: "400"
              },
              {
                title: "Passion",
                icon: Pencil,
                gradient: "from-pink-400 to-pink-600",
                description: "Driven by our love for technology and an insatiable thirst for learning, we don’t just write code—we craft solutions that change the game. Every line we write is a step toward a smarter, bolder future. Innovation is our language, collaboration is our foundation, and impact is our mission. Together, we turn passion into progress, ideas into reality, and challenges into breakthroughs—because the world doesn’t just need coders, it needs visionaries.",
                animation: "slide-up",
                delay: "200"
              }
            ].map(({ title, icon: Icon, gradient, description, animation, delay }, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20"
                data-animate
                data-animation={animation}
                data-delay={delay}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                <p className="text-gray-300 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Section */}

      <section id="mentors" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-pink-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div
              className="lg:pr-12"
              data-animate
              data-animation="slide-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                Meet Our <span className="text-white">Mentors</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Our TIT DEVELOPER team has very passionate Teaching Assistants. Each of them are having their own capability to develop new things everyday.
              </p>

            </div>

            <div
              className="relative h-auto min-h-[400px] md:min-h-[500px]"
              data-animate
              data-animation="slide-right"
              data-delay="300"
            >
              <div className="flex h-full overflow-hidden relative group">
                {/* Navigation arrows */}


                <div className="w-full h-full flex transition-transform duration-500 ease-in-out" id="mentor-slider">
                  {[
                    {
                      name: "ANAND SONI",
                      role: "Mentor TIT DEVELOPER",
                      image: "vid/1712473487552.jpeg",
                      bio: "Placed in Capgemini• TCS(Digital)• Accenture• KPIT• Acmegrade• 8+ Job offers• 2+ AICTE Internships• 5X Microsoft Certified• 2X GitHub Certified• TITE'25.",
                      linkedin: "https://www.linkedin.com/in/anandsoni992/",
                      github: "https://github.com/Anandsoni992",
                      // skills: ["JavaScript", "React", "Node.js", "Azure"]
                    },
                    {
                      name: "ANKIT KUMAR",
                      role: "Mentor TIT DEVELOPER",
                      image: "vid/ankit.jpeg",
                      bio: "Engineer Intern at Ramraj Technology Solutions | Python, Java, AWS, AI Fundamentals",
                      linkedin: "https://www.linkedin.com/in/ankitkumar0905/",
                      github: "https://github.com/ankit95001"

                    },
                    {
                      name: "ANKIT PATEL",
                      role: "Mentor TIT DEVELOPER",
                      image: "vid/untitled folder/WhatsApp Image 2025-03-31 at 14.55.31.jpeg",
                      bio: "Passionate Engineering Student | Seeking Internships & Networking Opportunities | Problem-Solver and Innovator | Committed to Sustainable Solutions |Eager to Solve Complex Problems",
                      linkedin: "https://www.linkedin.com/in/ankit-patel-563b9927b/",


                    }
                  ].map((mentor, index) => (
                    <div key={index} className="min-w-full h-full px-2 sm:px-4 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden w-full max-w-md border border-white/20 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/30">
                        <div className="h-72 w-full relative overflow-hidden group">
                          <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="absolute w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            style={{ objectPosition: 'center top' }}
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/600x400?text=Profile+Image";
                              e.currentTarget.className = "absolute w-full h-full object-contain bg-gray-100";
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                            <p className="text-purple-300 text-sm">{mentor.role}</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-gray-300 mb-4">{mentor.bio}</p>



                          <div className="flex justify-between items-center mt-6">
                            <div className="flex space-x-4">
                              <a
                                href={mentor.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-white transition-colors"
                                aria-label={`${mentor.name}'s LinkedIn`}
                              >
                                <Linkedin className="w-5 h-5" />
                              </a>
                              {mentor.github && (
                                <a
                                  href={mentor.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-300 hover:text-white transition-colors"
                                  aria-label={`${mentor.name}'s GitHub`}
                                >
                                  <Github className="w-5 h-5" />
                                </a>
                              )}
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {[0, 1, 2].map((dot) => (
                  <button
                    key={dot}
                    className={`w-3 h-3 rounded-full transition-all mentor-dot ${dot === 0 ? 'bg-purple-500 w-6' : 'bg-gray-600 hover:bg-gray-500'}`}
                    data-index={dot}
                    aria-label={`Go to slide ${dot + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Wall of Impact */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 md:py-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 md:mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-3 md:mb-4 animate-gradient">
            Wall of Impact
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 animate-fade-in">
            Showcasing our journey through innovation
          </p>
        </div>

        {/* Card Rows */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 md:space-y-8">
          {/* First Row - 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <VideoCard
              title="Web Developers"
              description="Guided 15+ Web Developers – Crafting sleek & responsive websites"
              videoUrl="/vid/7989454-hd_1920_1080_25fps.mp4"
              isMobile={isMobile}
              imageUrl="/vid/untitled folder/WhatsApp Image 2025-04-01 at 01.02.00.jpeg"
            />
            <VideoCard
              title="Future App Developers"
              description="Trained 20+ Future App Developers – Shaping the next-gen mobile innovators."
              videoUrl="/vid/7989454-hd_1920_1080_25fps.mp4"
              isMobile={isMobile}
              imageUrl="/vid/untitled folder/WhatsApp Image 2025-04-01 at 01.06.51.jpeg"
            />
            <VideoCard
              title="Machine Learning"
              description="Empowered 15+ Students in Machine Learning – Building AI-powered solutions."
              videoUrl="/vid/7989454-hd_1920_1080_25fps.mp4"
              isMobile={isMobile}
              imageUrl="/vid/untitled folder/WhatsApp Image 2025-04-01 at 01.08.31.jpeg"
            />
          </div>

          {/* Second Row - 3 Cards with Videos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <VideoCard
              title="Cybersecurity Enthusiasts"
              description="Mentored 30+ Cybersecurity Enthusiasts – Strengthening digital defense skills."
              videoUrl="/vid/7989454-hd_1920_1080_25fps.mp4"
              isMobile={isMobile}
            />
            <VideoCard
              title="Resume"
              description="90%+ ATS-Friendly Resumes Crafted – Helping students stand out in job applications."
              videoUrl="/vid/7989454-hd_1920_1080_25fps.mp4"
              isMobile={isMobile}
            />
            <VideoCard
              title="Project"
              description="20+ Projects by community."
              videoUrl="/vid/7989454-hd_1920_1080_25fps.mp4"
              isMobile={isMobile}
            />
          </div>

          {/* Third Row - Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                title: "Domain",
                label: "ATS-Friendly Resumes Crafted – Helping students stand out in job applications."
              },
              {
                title: "Event",
                label: "Organized Events: Workshops, Hackathons, Presentations."
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 sm:p-8 md:p-12 bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 h-[300px] sm:h-[350px] md:h-[400px] flex flex-col items-center justify-center transform hover:scale-[1.02]"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 sm:mb-6 animate-pulse">
                  {stat.title}
                </div>
                <div className="text-lg sm:text-xl md:text-2xl text-gray-300 px-2 sm:px-0">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>






      {/* Interactive Timeline Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-300">From inception to innovation - see how we've grown</p>
          </div>
          <ParallaxSection speed={0.3}>
            <InteractiveTimeline />
          </ParallaxSection>
        </div>
      </section>

      {/* Achievement Badges Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              Achievement Badges
            </h2>
            <p className="text-xl text-gray-300">Unlock badges as you contribute and grow</p>
          </div>
          <AchievementBadges />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              What Our Members Say
            </h2>
            <p className="text-xl text-gray-300">Hear from those who've experienced our community</p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Alumni Section */}
      <section id="alumni" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          
          <div className="text-center mb-12 md:mb-16" data-animate data-animation="fade">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-3 md:mb-4">
              Our Distinguished Alumni
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Meet our successful graduates making waves in the tech industry
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            
            {[
              {
                name: "Sarthak Kumar",
                role: "Web Developer",
                image: "img/1.jpeg",
                batch: "2024"
              },
              {
                name: "Prince Kumar",
                role: "Web Developer",
                image: "img/WhatsApp Image 2025-03-30 at 00.51.47.jpeg",
                batch: "2024"
              },
              {
                name: "Dipu Kumar",
                role: "Android Developer,Cyber Security",
                image: "vid/Hall1.jpeg",
                batch: "2024"
              },
              {
                name: "Mohd Meraaz",
                role: "Android Developer,Cyber Security",
                image: "vid/Hall8.jpeg",
                batch: "2024"
              },
              {
                name: "Siddharth Kumar",
                role: "Android Developer",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.49 (2).jpeg",
                batch: "2024"
              },
              {
                name: "Nikhil Kumar Gupta",
                role: "Machine Learing,Cyber Security",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.49 (1).jpeg",
                batch: "2024"
              },
              {
                name: "Rishabh Raj",
                role: "Web Developer",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.51 (2).jpeg",
                batch: "2024"
              },
              {
                name: "Naman Kumar",
                role: "Web Developer",
                image: "vid/Hall6.jpeg",
                batch: "2024"
              },
              {
                name: "Om Prakesh Mehta",
                role: "Cyber Security",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.50 (3).jpeg",
                batch: "2024"
              },
              {
                name: "Anikesh Sharma",
                role: "Machine Learning",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.51.jpeg",
                batch: "2024"
              },
              {
                name: "Sheetal Kawadkar",
                role: "Web Developer",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.50.jpeg",
                batch: "2024"
              },
              {
                name: "Shaloni Mishra",
                role: "Machine Learning,Web Developer",
                image: "vid/WhatsApp Image 2025-03-31 at 00.22.17.jpeg",
                batch: "2024"
              },
              {
                name: "Aditi Gupta",
                role: "Android Developer,Web Developer",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.52.jpeg",
                batch: "2024"
              },
              {
                name: "Neetesh Chaurasia",
                role: "Web Developer",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.50 (1).jpeg",
                batch: "2024"
              },
              {
                name: "Harshita Anandd",
                role: "Android Developer,Web Developer,Cyber Security",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.49 (3).jpeg",
                batch: "2024"
              },
              {
                name: "Akash Kumar ",
                role: "Cyber Security",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.49.jpeg",
                batch: "2024"
              },
              {
                name: "Sejal Tiwari",
                role: "Android Developer,Web Developer,Cyber Security,Machine Learning",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.51 (1).jpeg",
                batch: "2024"
              },
              {
                name: "Aman Mishra",
                role: "Machine Learning",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.48.jpeg",
                batch: "2024"
              },
              {
                name: "Prakhar Shrivastava",
                role: "Machine Learning,Web Developer,Cyber Security",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.50 (2).jpeg",
                batch: "2024"
              },
              {
                name: "Deepaka Deshmukh",
                role: "Machine Learning,Web Develope",
                image: "img/WhatsApp Image 2025-03-30 at 00.52.51 (3).jpeg",
                batch: "2024"
              }
            ].map((alumni, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300 group"
                data-animate
                data-animation="fade"
                data-delay={`${index * 100}`}
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-3 md:mb-4">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-full h-full rounded-full object-cover border-2 md:border-3 lg:border-4 border-purple-500 group-hover:border-pink-500 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="px-1">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 line-clamp-1">
                    {alumni.name}
                  </h3>
                  <p className="text-purple-300 text-xs sm:text-sm mb-1 md:mb-2 line-clamp-2">
                    {alumni.role}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm">Batch of {alumni.batch}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}

      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Contact Section */}
        <div id="contact" className="max-w-4xl mx-auto mb-8 md:mb-16 scroll-mt-24">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 md:mb-8">
            Get in Touch
          </h1>
          <h2 className='text-base md:text-lg font-bold text-white mb-4 md:mb-6 text-center px-2'>
            To get more updates about our events & workshops, follow our social media handles.
            Also for any kind of queries, you can simply write us an e-mail.
          </h2>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-2 sm:px-0">
            {/* Email Card */}
            <div className="bg-white/10 backdrop-blur-lg p-4 md:p-6 rounded-xl border border-white/20">
              <Mail className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Email Us</h3>
              <p className="text-sm md:text-base text-gray-300 break-all">krsarthak1011@gmail.com</p>
            </div>

            {/* Phone Card */}
            <div className="bg-white/10 backdrop-blur-lg p-4 md:p-6 rounded-xl border border-white/20">
              <Phone className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Call Us</h3>
              <p className="text-sm md:text-base text-gray-300">7488764922</p>
            </div>

            {/* Address Card - This will span full width on small screens */}
            <div className="bg-white/10 backdrop-blur-lg p-4 md:p-6 rounded-xl border border-white/20 sm:col-span-2 md:col-span-1">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Visit Us</h3>
              <p className="text-sm md:text-base text-gray-300">
                Technocrats Institute of technology (Excellence)<br />
                Anand Nagar, BHEL Opposite Hathaikheda Dam,<br />
                Bhopal, Madhya Pradesh 462022
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="px-2 sm:px-0">
            <ContactForm />
          </div>
        </div>
      </div>

      <div>
        {/* FAQ Section */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
          <section className="py-12 md:py-24 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 md:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-3 md:mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-base md:text-xl text-gray-300">
                  Find answers to common questions about our community
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
                {[
                  {
                    question: "How can I join the TIT Developer Community?",
                    answer: "Joining our community is easy! Simply click on the 'Join Community' button at the top of the page and fill out the registration form. Once submitted, you'll receive a welcome email with further instructions."
                  },
                  {
                    question: "What kind of events do you organize?",
                    answer: "We organize a variety of events including technical workshops, hackathons, coding competitions, tech talks, and networking sessions. Our events are designed to enhance both technical skills and professional development."
                  },
                  {
                    question: "Do I need to be an experienced developer to join?",
                    answer: "Not at all! We welcome members of all skill levels, from beginners to experienced developers. Our community is built on learning and growing together, and we have resources and mentorship programs for newcomers."
                  },
                  {
                    question: "Are there any membership fees?",
                    answer: "No, membership in the TIT Developer Community is completely free. We believe in making technology education and networking accessible to everyone."
                  },
                  {
                    question: "Can I become a mentor in the community?",
                    answer: "Yes! If you have expertise in specific technical areas and want to give back to the community, you can apply to become a mentor. Contact our team through the website, and we'll guide you through the process."
                  },
                  {
                    question: "How can I stay updated about upcoming events?",
                    answer: "There are several ways to stay updated: join our Discord server, follow us on social media, subscribe to our newsletter, or regularly check our events page on the website."
                  },
                  {
                    question: "What opportunities are available for members?",
                    answer: "Members have access to numerous opportunities including internships, job placements, project collaborations, mentorship programs, networking events, and chances to lead community initiatives."
                  }
                ].map((faq, index) => {
                  const [isOpen, setIsOpen] = useState(false);

                  return (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-lg rounded-lg md:rounded-xl overflow-hidden border border-white/20"
                    >
                      <button
                        className="w-full px-4 py-3 md:px-6 md:py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <span className="text-base md:text-lg font-medium text-white text-left">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0 ml-2" />
                        ) : (
                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-purple-400 flex-shrink-0 ml-2" />
                        )}
                      </button>

                      <div
                        className={`px-4 md:px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-3 md:pb-4 pt-1' : 'max-h-0'
                          }`}
                      >
                        <p className="text-sm md:text-base text-gray-300">{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-black-900 text-white py-12 md:py-16 border-t border-white/10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {/* Brand/Logo Section */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Code2 className="w-6 h-6 text-purple-400" />
                  <span className="text-xl font-bold">TIT Dev Community</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Empowering the next generation of developers.
                </p>
                <div className="flex space-x-4">
                  <a href="https://github.com/Anandsoni992" className="text-gray-400 hover:text-white transition-colors">
                    <Github className="w-6 h-6" />
                  </a>

                  <a href="https://www.linkedin.com/in/anandsoni992/" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Navigation Links */}
              {['Community', 'Resources', 'Connect'].map((section) => (
                <div key={section} className="mt-6 sm:mt-0">
                  <h3 className="text-lg sm:text-xl font-bold mb-4">{section}</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {['Home'].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
              <h2>Powered by TIT Excellence</h2>
              <p>© 2025 TIT Developer Community. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

    </div>
  )

}


export default App;