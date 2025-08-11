import { FormEvent, useState } from "react";
import Layout from "@/components/site/Layout";
import SEO from "@/components/site/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Errors { name?: string; email?: string; message?: string; }

const Contact = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const newErrors: Errors = {};

    if (!name) newErrors.name = "Please enter your name.";
    if (!email) newErrors.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!message) newErrors.message = "Please enter a message.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    <Layout>
      <SEO
        title="Contact"
        description="Contact Charan Naga Sai Kosuri — Software Engineer. Reach out via form, LinkedIn, GitHub, or email."
        path="/contact"
      />

      <section className="container mx-auto px-4 py-14">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-2 text-muted-foreground">I’d love to hear from you.</p>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <form onSubmit={onSubmit} noValidate aria-describedby="form-status" className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <Input id="name" name="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
              <p id="name-error" className="mt-1 text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <Input id="email" name="email" type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
              <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">
                {errors.email}
              </p>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <Textarea id="message" name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
              <p id="message-error" className="mt-1 text-sm text-destructive" role="alert">
                {errors.message}
              </p>
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
            <h2 className="text-xl font-semibold">Direct links</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>
                LinkedIn: <a className="text-primary hover:underline" href="#">[PASTE YOUR LINKEDIN URL HERE]</a>
              </li>
              <li>
                GitHub: <a className="text-primary hover:underline" href="#">[PASTE YOUR GITHUB URL HERE]</a>
              </li>
              <li>
                Email: <a className="text-primary hover:underline" href="mailto:your.email@example.com">your.email@example.com</a>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
