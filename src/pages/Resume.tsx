import Layout from "@/components/site/Layout";
import SEO from "@/components/site/SEO";
import { Button } from "@/components/ui/button";

const Resume = () => {
  return (
    <Layout>
      <SEO
        title="Resume"
        description="Resume for Charan Naga Sai Kosuri — Software Engineer. Download PDF and view accessible web version."
        path="/resume"
      />

      <section className="container mx-auto px-4 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Resume</h1>
          <Button asChild variant="neon">
            <a href="/assets/Charan-Kosuri-Resume.pdf" download>Download Resume (PDF)</a>
          </Button>
        </div>

        <article className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold">Charan Naga Sai Kosuri</h2>
            <p className="text-muted-foreground">Software Engineer</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold">Summary</h3>
            <p className="text-muted-foreground">
              Software Engineer with 1–2 years of experience. Passionate about scalable web applications, clean code, and continuous learning.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold">Education</h3>
            <ul className="mt-2 list-disc ps-6 text-muted-foreground">
              <li>M.S., Texas A&M University, Kingsville — Aug 2024</li>
              <li>B.Tech, Andhra Loyola Institute of Engineering and Technology, India</li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold">Skills</h3>
            <p className="text-muted-foreground">JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, Docker, AWS</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold">Experience</h3>
            <p className="text-muted-foreground">Available upon request or reference projects listed on this site.</p>
          </section>
        </article>
      </section>
    </Layout>
  );
};

export default Resume;
