import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/70">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Charan Naga Sai Kosuri. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
            <a href="mailto:your.email@example.com" className="text-muted-foreground hover:text-primary" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
