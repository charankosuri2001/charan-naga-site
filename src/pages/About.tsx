import Layout from "@/components/site/Layout";
import SEO from "@/components/site/SEO";

const About = () => {
  return (
    <Layout>
      <SEO
        title="About"
        description="About Charan Naga Sai Kosuri — Software Engineer with 1–2 years experience. MS from Texas A&M University, Kingsville (Aug 2024)."
        path="/about"
      />

      <section className="container mx-auto px-4 py-14">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Software engineer with 1–2 years of experience. I focus on building scalable web applications with clean, maintainable code and a strong learning mindset.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Education</h2>
        <ol className="mt-4 relative border-s border-border ps-6">
          <li className="mb-8 ms-4">
            <div className="absolute -start-1.5 mt-1 size-3 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_16px_hsl(var(--neon))]"></div>
            <time className="text-xs uppercase tracking-wide text-muted-foreground">Aug 2024</time>
            <h3 className="text-lg font-semibold">M.S., Texas A&M University, Kingsville</h3>
            <p className="text-muted-foreground">Master of Science, graduated August 2024.</p>
          </li>
          <li className="mb-8 ms-4">
            <div className="absolute -start-1.5 mt-1 size-3 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_16px_hsl(var(--neon))]"></div>
            <time className="text-xs uppercase tracking-wide text-muted-foreground">B.Tech</time>
            <h3 className="text-lg font-semibold">Andhra Loyola Institute of Engineering and Technology, India</h3>
            <p className="text-muted-foreground">Bachelor of Technology.</p>
          </li>
        </ol>
      </section>
    </Layout>
  );
};

export default About;
