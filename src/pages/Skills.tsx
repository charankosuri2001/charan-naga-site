import Layout from "@/components/site/Layout";
import SEO from "@/components/site/SEO";
import { Badge } from "@/components/ui/badge";

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <section className="mt-8">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((i) => (
        <Badge key={i} variant="secondary" className="hover:scale-105 transition-transform">
          {i}
        </Badge>
      ))}
    </div>
  </section>
);

const Skills = () => {
  return (
    <Layout>
      <SEO
        title="Skills"
        description="Skills and technologies: languages, frameworks, tools, databases, and cloud for Charan Naga Sai Kosuri."
        path="/skills"
      />

      <div className="container mx-auto px-4 py-14">
        <h1 className="text-3xl font-bold">Skills</h1>
        <p className="mt-2 text-muted-foreground">A snapshot of my current toolkit.</p>

        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Section title="Languages" items={["JavaScript", "TypeScript", "Python", "Java"]} />
          <Section title="Frameworks" items={["React", "Node.js", "Express", "Tailwind CSS"]} />
          <Section title="Tools" items={["Git", "Docker", "Vite", "Jest"]} />
          <Section title="Databases" items={["PostgreSQL", "MongoDB", "SQLite"]} />
          <Section title="Cloud" items={["AWS", "Vercel", "Netlify"]} />
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
