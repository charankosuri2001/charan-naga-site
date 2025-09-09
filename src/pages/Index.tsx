import { Helmet } from "react-helmet-async";
import Layout from "@/components/site/Layout";
import professionalPhoto from "/lovable-uploads/68bd7391-e4b9-46f3-aef1-bd196e2447a2.png";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Charan Naga Sai Kosuri — Software Engineer</title>
        <meta name="description" content="Software engineer passionate about building scalable web applications with modern technologies and clean code." />
        <link rel="canonical" href="/" />
      </Helmet>
      
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-widest text-primary font-semibold">Software Engineer</p>
            
            <h1 className="mt-4 text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Charan Naga Sai Kosuri
            </h1>
            
            {/* Photo positioned under the name */}
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
              <Button asChild variant="default" size="lg" className="text-lg px-8 py-4 h-auto">
                <a href="/projects">View My Work</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                <a href="/contact">Let's Connect</a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-4 h-auto">
                <a href="/resume.pdf" download>Download Resume</a>
              </Button>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-16 border-t border-border">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                I'm a software engineer who believes in the power of clean, scalable code to solve real-world problems. 
                My journey in technology started with curiosity and has evolved into a passion for creating applications 
                that not only function flawlessly but also provide exceptional user experiences.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
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
        </section>
      </main>
    </Layout>
  );
};

export default Index;