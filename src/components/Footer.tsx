import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* GitHub Repositories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Project Repositories</h3>
            <div className="space-y-2">
              <a
                href="https://github.com/Snorman-zzz/final-project-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={16} />
                <span>Frontend Repository</span>
              </a>
              <a
                href="https://github.com/Snorman-zzz/final-project-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={16} />
                <span>Backend Repository</span>
              </a>
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
            <div className="space-y-1">
              <p className="text-muted-foreground">Yuki Feng</p>
              <p className="text-muted-foreground">Robert Gold</p>
              <p className="text-muted-foreground">Abhilash Singh</p>
              <p className="text-muted-foreground">Mingze Yuan</p>
            </div>
          </div>

          {/* Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Course Information</h3>
            <p className="text-muted-foreground">Section: 202560</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ContentHub. Built as a final project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;