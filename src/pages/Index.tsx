import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[hsl(var(--neon))] opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-40 w-40 rounded-full bg-[hsl(var(--neon))] opacity-10 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">Software Engineer</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
          Charan Naga Sai Kosuri
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Building robust, scalable web applications — clean code, clear impact.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="hero">
            <a href="/projects">View Projects</a>
          </Button>
          <Button asChild variant="neon">
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Index;

