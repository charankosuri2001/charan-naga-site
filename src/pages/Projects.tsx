import Layout from "@/components/site/Layout";
import SEO from "@/components/site/SEO";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    name: "TaskFlow",
    desc: "A lightweight task management web app focusing on speed and accessibility.",
    stack: ["React", "TypeScript", "Tailwind", "Vite"],
    github: "#",
    demo: "#",
  },
  {
    name: "API Monitor",
    desc: "Dashboard to track API health and latency with realtime charts.",
    stack: ["Node.js", "Express", "PostgreSQL", "Recharts"],
    github: "#",
    demo: "#",
  },
  {
    name: "DevBlog",
    desc: "A developer blog with MDX support, SEO, and dark mode.",
    stack: ["React", "MDX", "SEO"],
    github: "#",
    demo: "#",
  },
];

const Projects = () => {
  return (
    <Layout>
      <SEO
        title="Projects"
        description="Selected projects by Charan Naga Sai Kosuri — realistic samples with tech stacks, GitHub, and live demos."
        path="/projects"
      />

      <div className="container mx-auto px-4 py-14">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
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
                <Button asChild variant="neon">
                  <a href={p.github} aria-label={`GitHub repository for ${p.name}`}>GitHub</a>
                </Button>
                <Button asChild>
                  <a href={p.demo} aria-label={`Live demo for ${p.name}`}>Live Demo</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
