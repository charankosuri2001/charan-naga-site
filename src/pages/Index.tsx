import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import professionalPhoto from "/lovable-uploads/68bd7391-e4b9-46f3-aef1-bd196e2447a2.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  const sections = ["home", "about", "education", "skills", "projects", "contact"] as const;

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
        <title>Charan Naga Sai Kosuri — Software Engineer</title>
        <meta name="description" content="Software engineer passionate about building scalable web applications with modern technologies and clean code." />
        <link rel="canonical" href="/" />
      </Helmet>
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/20 hero-content-overlay backdrop-blur">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-foreground">Skip to content</a>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="#home" onClick={(e)=>onNavClick(e, "home")} className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_20px_hsl(var(--neon))]"></span>
            <span className="text-base font-semibold tracking-wide">Charan N. S. Kosuri</span>
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
        {/* Hero - No card wrapper, direct content */}
        <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
            <div className="pointer-events-none absolute -top-16 left-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[hsl(var(--neon))] opacity-10 blur-3xl animate-pulse" />
            <div className="pointer-events-none absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-[hsl(var(--neon-secondary))] opacity-8 blur-2xl animate-pulse" style={{animationDelay: '1s'}} />
            <div className="pointer-events-none absolute top-1/2 left-8 h-48 w-48 rounded-full bg-[hsl(var(--neon-tertiary))] opacity-6 blur-2xl animate-pulse" style={{animationDelay: '2s'}} />
          </div>

          <div className="container mx-auto px-4 py-20 md:py-28 animate-fade-in relative z-10">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-widest text-primary font-semibold">Software Engineer</p>
              
              <h1 className="mt-4 text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Charan Naga Sai Kosuri
              </h1>
              
              {/* Photo positioned under the name - rectangular */}
              <div className="mt-8 flex justify-center md:justify-start">
                <img 
                  src={professionalPhoto} 
                  alt="Charan Naga Sai Kosuri - Professional headshot" 
                  className="w-40 h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 rounded-lg object-cover border-2 border-primary/40 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:border-primary/60 transition-all duration-300"
                />
              </div>
              
              <p className="mt-8 max-w-2xl text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Passionate about crafting elegant solutions through code and building applications that make a difference.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild variant="hero" size="lg" className="text-lg px-8 py-4 h-auto">
                  <a href="#projects" onClick={(e)=>onNavClick(e, "projects")}>View My Work</a>
                </Button>
                <Button asChild variant="neon" size="lg" className="text-lg px-8 py-4 h-auto">
                  <a href="#contact" onClick={(e)=>onNavClick(e, "contact")}>Let's Connect</a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-4 h-auto">
                  <a href="/resume.pdf" download>Download Resume</a>
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-muted-foreground/80">
                <p>💡 Click "Home" in the navigation to experience dynamic background themes!</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Me - Personal description */}
        <section id="about" className="relative">
          <div className="hero-content-overlay mx-4 my-14 rounded-2xl">
            <div className="container mx-auto px-8 py-14">
              <h2 className="text-3xl font-bold">About Me</h2>
              <div className="mt-6 max-w-3xl space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  I'm a software engineer who believes in the power of clean, scalable code to solve real-world problems. 
                  My journey in technology started with curiosity and has evolved into a passion for creating applications 
                  that not only function flawlessly but also provide exceptional user experiences.
                </p>
                
                <p className="text-lg leading-relaxed">
                  I specialize in full-stack development, with a particular love for modern web technologies. 
                  Whether I'm architecting cloud-native solutions, implementing AI-powered features, or optimizing 
                  database performance, I approach every project with attention to detail and a commitment to excellence.
                </p>
                
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or mentoring fellow developers. I believe in continuous learning and sharing knowledge with the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education - Separate section */}
        <section id="education" className="relative">
          <div className="hero-content-overlay mx-4 my-14 rounded-2xl">
            <div className="container mx-auto px-8 py-14">
              <h2 className="text-3xl font-bold">Education</h2>
              
              <div className="mt-8">
                <ol className="relative border-s border-border ps-6">
                  <li className="mb-10 ms-4">
                    <div className="absolute -start-1.5 mt-1 size-3 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_16px_hsl(var(--neon))]"></div>
                    <time className="text-xs uppercase tracking-wide text-muted-foreground">Aug 2024</time>
                    <h3 className="text-xl font-semibold">Master's in Computer Science</h3>
                    <p className="text-muted-foreground">Texas A&M University Kingsville | GPA: 3.7/4.0</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Coursework:</strong> Database Systems, Analysis of Algorithms, Data Mining, Cloud Computing, Artificial Intelligence, Operating Systems
                    </p>
                  </li>
                  <li className="mb-10 ms-4">
                    <div className="absolute -start-1.5 mt-1 size-3 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_16px_hsl(var(--neon))]"></div>
                    <time className="text-xs uppercase tracking-wide text-muted-foreground">B.Tech</time>
                    <h3 className="text-xl font-semibold">Bachelor of Technology</h3>
                    <p className="text-muted-foreground">Andhra Loyola Institute of Engineering and Technology, India</p>
                  </li>
                </ol>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-semibold">Leadership</h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block mt-2 h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_12px_hsl(var(--neon))]" aria-hidden="true"></span>
                    <div>
                      <h4 className="font-semibold">President - Association of Indian Students</h4>
                      <p className="text-muted-foreground">Led student organization and community engagement initiatives.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block mt-2 h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_12px_hsl(var(--neon))]" aria-hidden="true"></span>
                    <div>
                      <h4 className="font-semibold">Chairman - Institution of Electronics and Telecommunication Engineers</h4>
                      <p className="text-muted-foreground">Managed technical events and student development programs.</p>
                    </div>
                  </li>
                </ul>
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
                    { title: "Cloud Services", items: ["AWS S3", "IAM", "Lambda", "CloudFormation", "CloudWatch"] },
                    { title: "Machine Learning", items: ["Supervised Learning", "Unsupervised Learning", "Algorithms"] },
                    { title: "DevOps", items: ["Docker", "Kubernetes", "Jenkins", "CI/CD"] },
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
                    Apache: "🪶",
                    Linux: "🐧",
                    "Android Studio": "🤖",
                    "Spring Boot": "🌱",
                    Django: "🐍",
                    "AWS S3": "☁️",
                    IAM: "🔐",
                    Lambda: "⚡",
                    CloudFormation: "📋",
                    CloudWatch: "👁️",
                    "Supervised Learning": "🧠",
                    "Unsupervised Learning": "🤖",
                    Algorithms: "🔢",
                    Docker: "🐳",
                    Kubernetes: "⚙️",
                    Jenkins: "🔧",
                    "CI/CD": "🚀",
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
              <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                {[
                  { 
                    name: "AI-Powered Job Recommender Portal", 
                    desc: "Full-stack job portal with AI-powered resume matching using TF-IDF and cosine similarity, improving job alignment accuracy by 80%.",
                    stack: ["Spring Boot", "React.js", "PostgreSQL", "JWT", "AWS EC2", "GitHub Actions"]
                  },
                  { 
                    name: "RAG Knowledge Assistant", 
                    desc: "End-to-end Generative AI application using Retrieval-Augmented Generation to answer PDF-based queries with cited sources.",
                    stack: ["Spring Boot", "React", "PostgreSQL", "LangChain", "OpenAI API", "AWS Bedrock", "Docker", "Kubernetes"]
                  },
                  { 
                    name: "Credit Card Fraud Detection", 
                    desc: "ML model to detect fraudulent transactions achieving over 92% recall on imbalanced real-world datasets using advanced preprocessing techniques.",
                    stack: ["Python", "Scikit-learn", "XGBoost", "Pandas", "NumPy", "SMOTE"]
                  },
                  { 
                    name: "CRUD Web Application", 
                    desc: "Full-stack web application with user authentication, data management, and responsive design using modern web technologies.",
                    stack: ["React", "Node.js", "MongoDB", "Express", "JWT", "Tailwind CSS"]
                  }
                ].map((project) => (
                  <div key={project.name} className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:-translate-y-1">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="mt-2 text-muted-foreground">{project.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative">
          <div className="hero-content-overlay mx-4 my-14 rounded-2xl">
            <div className="container mx-auto px-8 py-14">
              <h2 className="text-3xl font-bold">Contact</h2>
              <p className="mt-2 text-muted-foreground">Get in touch and let's discuss your next project.</p>
              
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold">Let's connect</h3>
                  <p className="mt-2 text-muted-foreground">
                    I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                  </p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_12px_hsl(var(--neon))]" aria-hidden="true"></span>
                      <span className="text-muted-foreground">charan.kosuri@example.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_12px_hsl(var(--neon))]" aria-hidden="true"></span>
                      <span className="text-muted-foreground">LinkedIn: /in/charan-kosuri</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input 
                      id="name" 
                      name="name" 
                      className="mt-1" 
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      className="mt-1" 
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      className="mt-1" 
                      placeholder="Tell me about your project..."
                      rows={4}
                    />
                    {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
                  </div>
                  
                  <Button type="submit" variant="neon" className="w-full">
                    Send Message
                  </Button>
                  
                  {status === "success" && (
                    <p className="text-sm text-green-600">Thank you! I'll get back to you soon.</p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-destructive">Please fix the errors above.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;