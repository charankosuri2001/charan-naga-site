import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import professionalPhoto from "@/assets/professional-photo.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Errors { name?: string; email?: string; message?: string }

const Index = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isDark, setIsDark] = useState<boolean>(() => document.documentElement.classList.contains("dark"));
  const [currentTheme, setCurrentTheme] = useState(1);

  // Initialize theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const shouldDark = saved ? saved === "dark" : false;
    document.documentElement.classList.toggle("dark", shouldDark);
    setIsDark(shouldDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const sections = ["home", "about", "skills", "projects", "resume", "contact"] as const;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
    
    // Change background theme when Home is clicked
    if (id === "home") {
      setCurrentTheme(prev => (prev % 4) + 1);
    }
  };

  const validate = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (!message) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (validate(form)) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <div className={`min-h-screen text-foreground dynamic-bg ${currentTheme > 1 ? `theme-${currentTheme}` : ''}`}>
      <Helmet>
        <title>Portfolio — Software Engineer</title>
        <meta name="description" content="Dynamic portfolio showcasing projects, skills, resume, and contact information." />
        <link rel="canonical" href="/" />
      </Helmet>
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/20 hero-content-overlay backdrop-blur">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-foreground">Skip to content</a>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="#home" onClick={(e)=>onNavClick(e, "home")} className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_20px_hsl(var(--neon))]"></span>
            <span className="text-base font-semibold tracking-wide">Portfolio</span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e)=>onNavClick(e, id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${active===id?"text-primary":"text-muted-foreground"}`}
              >
                {id.charAt(0).toUpperCase()+id.slice(1)}
              </a>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="mr-2 inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${open ? "animate-slide-in-right" : "hidden"} md:hidden border-t border-white/20 hero-content-overlay`}>
          <nav className="container mx-auto flex flex-col py-2" aria-label="Mobile navigation">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e)=>onNavClick(e, id)}
                className={`px-3 py-3 text-sm ${active===id?"text-primary":"text-muted-foreground"}`}
              >
                {id.charAt(0).toUpperCase()+id.slice(1)}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
          {/* Background photo integration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
            <img 
              src={professionalPhoto} 
              alt="Professional headshot" 
              className="absolute top-8 right-8 md:top-12 md:right-12 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-white/30 shadow-2xl opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
            {/* Glowing orbs */}
            <div className="pointer-events-none absolute -top-16 left-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[hsl(var(--neon))] opacity-10 blur-3xl animate-pulse" />
            <div className="pointer-events-none absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-[hsl(var(--neon-secondary))] opacity-8 blur-2xl animate-pulse" style={{animationDelay: '1s'}} />
            <div className="pointer-events-none absolute top-1/2 left-8 h-48 w-48 rounded-full bg-[hsl(var(--neon-tertiary))] opacity-6 blur-2xl animate-pulse" style={{animationDelay: '2s'}} />
          </div>

          <div className="container mx-auto px-4 py-20 md:py-28 animate-fade-in relative z-10">
            <div className="max-w-4xl">
              <div className="hero-content-overlay rounded-2xl p-8 md:p-12 shadow-2xl">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold">Software Engineer</p>
                <h1 className="mt-4 text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  Welcome to My Portfolio
                </h1>
                <p className="mt-6 max-w-2xl text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Turning complex problems into clean, scalable code with passion for innovation and excellence.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Button asChild variant="hero" size="lg" className="text-lg px-8 py-4 h-auto">
                    <a href="#projects" onClick={(e)=>onNavClick(e, "projects")}>View My Work</a>
                  </Button>
                  <Button asChild variant="neon" size="lg" className="text-lg px-8 py-4 h-auto">
                    <a href="#contact" onClick={(e)=>onNavClick(e, "contact")}>Let's Connect</a>
                  </Button>
                </div>
                
                <div className="mt-8 text-sm text-muted-foreground/80">
                  <p>💡 Click "Home" in the navigation to experience dynamic background themes!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative">
          <div className="hero-content-overlay mx-4 my-14 rounded-2xl">
            <div className="container mx-auto px-8 py-14">
              <h2 className="text-3xl font-bold">About</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                Software engineer with 1–2 years of experience. I focus on building scalable web applications with clean, maintainable code and a strong learning mindset.
              </p>
              <div className="mt-8">
                <h3 className="text-xl font-semibold">Education</h3>
                <ol className="mt-4 relative border-s border-border ps-6">
                  <li className="mb-8 ms-4">
                    <div className="absolute -start-1.5 mt-1 size-3 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_16px_hsl(var(--neon))]"></div>
                    <time className="text-xs uppercase tracking-wide text-muted-foreground">Aug 2024</time>
                    <h4 className="text-lg font-semibold">M.S., Texas A&M University, Kingsville</h4>
                    <p className="text-muted-foreground">Master of Science, graduated August 2024.</p>
                  </li>
                  <li className="mb-2 ms-4">
                    <div className="absolute -start-1.5 mt-1 size-3 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_16px_hsl(var(--neon))]"></div>
                    <time className="text-xs uppercase tracking-wide text-muted-foreground">B.Tech</time>
                    <h4 className="text-lg font-semibold">Andhra Loyola Institute of Engineering and Technology, India</h4>
                    <p className="text-muted-foreground">Bachelor of Technology.</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="relative">
          <div className="hero-content-overlay mx-4 my-14 rounded-2xl">
            <div className="container mx-auto px-8 py-14">
              <h2 className="text-3xl font-bold">Skills</h2>
              <p className="mt-2 text-muted-foreground">A snapshot of my current toolkit.</p>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {(() => {
                  const groups = [
                    { title: "Programming Languages", items: ["Java", "Python", "C", "JavaScript"] },
                    { title: "Databases", items: ["MySQL", "MongoDB"] },
                    { title: "Web Technologies", items: ["Node.js", "React", "HTML", "CSS", "REST"] },
                    { title: "Tools", items: ["Git", "AWS", "Apache", "Linux", "Android Studio"] },
                    { title: "Frameworks", items: ["Spring Boot", "Django"] },
                    { title: "Networking", items: ["TCP/IP", "DNS", "DHCP", "Network Troubleshooting"] },
                    { title: "Protocols", items: ["HTTP", "FTP", "SMTP"] },
                    { title: "Cloud", items: ["AWS"] },
                  ];

                  const iconMap: Record<string, string> = {
                    Java: "☕",
                    Python: "🐍",
                    C: "🧩",
                    JavaScript: "⚡",
                    MySQL: "🐬",
                    MongoDB: "🍃",
                    "Node.js": "🟢",
                    React: "⚛️",
                    HTML: "🌐",
                    CSS: "🎨",
                    REST: "🔗",
                    Git: "🌿",
                    AWS: "☁️",
                    Apache: "🪶",
                    Linux: "🐧",
                    "Android Studio": "🤖",
                    "Spring Boot": "🌱",
                    Django: "🐍",
                    "TCP/IP": "🔌",
                    DNS: "🧭",
                    DHCP: "📡",
                    "Network Troubleshooting": "🛠️",
                    HTTP: "🌐",
                    FTP: "📁",
                    SMTP: "✉️",
                  };

                  return groups.map((group) => (
                    <div key={group.title} className="animate-fade-in">
                      <h3 className="text-xl font-semibold">{group.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.items.map((i) => {
                          const icon = iconMap[i] ?? "•";
                          return (
                            <Badge key={i} variant="secondary" className="hover-scale">
                              <span aria-hidden="true" className="me-1">{icon}</span>
                              <span>{i}</span>
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="relative">
          <div className="hero-content-overlay mx-4 my-14 rounded-2xl">
            <div className="container mx-auto px-8 py-14">
              <h2 className="text-3xl font-bold">Projects</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "TaskFlow", desc: "A lightweight task management web app focusing on speed and accessibility.", stack: ["React", "TypeScript", "Tailwind", "Vite"] },
                  { name: "API Monitor", desc: "Dashboard to track API health and latency with realtime charts.", stack: ["Node.js", "Express", "PostgreSQL", "Recharts"] },
                  { name: "DevBlog", desc: "A developer blog with MDX support, SEO, and dark mode.", stack: ["React", "MDX", "SEO"] },
                ].map((p) => (
                  <Card key={p.name} className="transition-transform hover:scale-[1.01]">
                    <CardHeader>
                      <CardTitle>{p.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{p.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <Badge key={s} variant="secondary">{s}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-3">
                      <Button asChild variant="neon"><a href="#" aria-label={`GitHub repository for ${p.name}`}>GitHub</a></Button>
                      <Button asChild><a href="#" aria-label={`Live demo for ${p.name}`}>Live Demo</a></Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resume */}
        <section id="resume" className="relative">
          <div className="hero-content-overlay mx-4 my-14 rounded-2xl">
            <div className="container mx-auto px-8 py-14">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-3xl font-bold">Resume</h2>
                <Button asChild variant="neon"><a href="/assets/Charan-Kosuri-Resume.pdf" download>Download Resume (PDF)</a></Button>
              </div>
              <article className="mt-8 space-y-6">
                <section>
                  <h3 className="text-xl font-semibold">Summary</h3>
                  <p className="text-muted-foreground">Software Engineer with 1–2 years of experience. Passionate about scalable web applications, clean code, and continuous learning.</p>
                </section>
                <section aria-labelledby="education-heading">
                  <h3 id="education-heading" className="text-xl font-semibold">Education</h3>
                  <ul className="mt-2 list-disc ps-6 text-muted-foreground">
                    <li>M.S., Texas A&M University, Kingsville — Aug 2024</li>
                    <li>B.Tech, Andhra Loyola Institute of Engineering and Technology, India</li>
                  </ul>
                </section>
                <section aria-labelledby="skills-heading">
                  <h3 id="skills-heading" className="text-xl font-semibold">Skills</h3>
                  <p className="text-muted-foreground">JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, Docker, AWS</p>
                </section>
                <section aria-labelledby="experience-heading">
                  <h3 id="experience-heading" className="text-xl font-semibold">Experience</h3>
                  <div className="mt-2 space-y-6">
                    <article aria-labelledby="role-webdev-title">
                      <h4 id="role-webdev-title" className="text-lg font-semibold">Web Developer — Texas A&M University, Kingsville</h4>
                      <ul className="mt-2 list-disc ps-6 text-muted-foreground">
                        <li>Designed and implemented the official college website.</li>
                        <li>Enhanced website performance and integrated multimedia elements such as images, videos, and interactive features.</li>
                        <li>Executed testing and debugging processes to ensure stability.</li>
                        <li>Reduced downtime by 25% through performance optimization.</li>
                        <li>Applied responsive design principles for both mobile and laptop views, improving accessibility and user satisfaction by 30%.</li>
                      </ul>
                    </article>
                    <article aria-labelledby="role-ga-title">
                      <h4 id="role-ga-title" className="text-lg font-semibold">Graduate Assistant — Texas A&M University, Kingsville</h4>
                      <ul className="mt-2 list-disc ps-6 text-muted-foreground">
                        <li>Taught algorithms and data structures to undergraduate students.</li>
                        <li>Assisted students with assignments and guided them in problem-solving.</li>
                        <li>Helped the professor by grading and reviewing assignments.</li>
                      </ul>
                    </article>
                  </div>
                </section>
                <section aria-labelledby="certifications-heading">
                  <h3 id="certifications-heading" className="text-xl font-semibold">Certifications</h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_12px_hsl(var(--neon))]" aria-hidden="true"></span>
                      <span>[Add Certification Name] — [Issuer] ([Year])</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_12px_hsl(var(--neon))]" aria-hidden="true"></span>
                      <span>[Add Certification Name] — [Issuer] ([Year])</span>
                    </li>
                  </ul>
                </section>
              </article>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative">
          <div className="hero-content-overlay mx-4 my-14 rounded-2xl">
            <div className="container mx-auto px-8 py-14">
              <h2 className="text-3xl font-bold">Contact</h2>
              <p className="mt-2 text-muted-foreground">I'd love to hear from you.</p>
              <div className="mt-8 grid gap-10 md:grid-cols-2">
                <form onSubmit={onSubmit} noValidate aria-describedby="form-status" className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <Input id="name" name="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                    <p id="name-error" className="mt-1 text-sm text-destructive" role="alert">{errors.name}</p>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <Input id="email" name="email" type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                    <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">{errors.email}</p>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                    <Textarea id="message" name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
                    <p id="message-error" className="mt-1 text-sm text-destructive" role="alert">{errors.message}</p>
                  </div>
                  <div>
                    <Button type="submit">Send message</Button>
                  </div>
                  <div id="form-status" aria-live="polite" className="text-sm">
                    {status === "success" && <p className="text-[hsl(var(--neon))]">Thanks! Your message has been validated locally.</p>}
                    {status === "error" && <p className="text-destructive">Please fix the errors above and try again.</p>}
                  </div>
                </form>

                <aside>
                  <h3 className="text-xl font-semibold">Direct links</h3>
                  <ul className="mt-3 space-y-2 text-muted-foreground">
                    <li>LinkedIn: <a className="text-primary hover:underline" href="#">[PASTE LINKEDIN URL HERE]</a></li>
                    <li>GitHub: <a className="text-primary hover:underline" href="#">[PASTE GITHUB URL HERE]</a></li>
                    <li>Email: <a className="text-primary hover:underline" href="mailto:your.email@example.com">your.email@example.com</a></li>
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 hero-content-overlay">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#contact" onClick={(e)=>onNavClick(e, "contact")} className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">LinkedIn</a>
              <a href="#contact" onClick={(e)=>onNavClick(e, "contact")} className="text-muted-foreground hover:text-primary" aria-label="GitHub">GitHub</a>
              <a href="mailto:your.email@example.com" className="text-muted-foreground hover:text-primary" aria-label="Email">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;