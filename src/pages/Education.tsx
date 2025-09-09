import Layout from "@/components/site/Layout";
import SEO from "@/components/site/SEO";

const Education = () => {
  return (
    <Layout>
      <SEO
        title="Education"
        description="Educational background of Charan Naga Sai Kosuri — Master's in Computer Science from Texas A&M University, Kingsville."
        path="/education"
      />

      <section className="container mx-auto px-4 py-14">
        <h1 className="text-3xl font-bold">Education</h1>
        
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
          <h2 className="text-2xl font-semibold">Leadership</h2>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start gap-3">
              <span className="inline-block mt-2 h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_12px_hsl(var(--neon))]" aria-hidden="true"></span>
              <div>
                <h3 className="font-semibold">President - Association of Indian Students</h3>
                <p className="text-muted-foreground">Led student organization and community engagement initiatives.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block mt-2 h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_12px_hsl(var(--neon))]" aria-hidden="true"></span>
              <div>
                <h3 className="font-semibold">Chairman - Institution of Electronics and Telecommunication Engineers</h3>
                <p className="text-muted-foreground">Managed technical events and student development programs.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Education;