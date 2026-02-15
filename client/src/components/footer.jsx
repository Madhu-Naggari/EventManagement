import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full  border-0 bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Logo + Copyright */}
          <div>
            <Link
              to="/"
              className="flex items-center space-x-2 text-lg font-semibold text-foreground"
            >
              <img
                alt="logo"
                width="30"
                height="30"
                src="https://assets.aceternity.com/logo-dark.png"
              />
              <span>Eventra</span>
            </Link>

            <p className="mt-4 text-sm text-muted-foreground">
              © 2026 Eventra. All rights reserved.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            {/* Pages */}
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Pages</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/my-events"
                    className="hover:text-foreground transition-colors"
                  >
                    My Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="hover:text-foreground transition-colors"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-foreground transition-colors"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Socials</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://www.linkedin.com/in/madhunaggari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Register */}
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Account</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/register"
                    className="hover:text-foreground transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-foreground transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Large Brand Text */}
        <p className="mt-20 bg-gradient-to-b from-foreground/10 to-transparent bg-clip-text text-center text-6xl font-bold text-transparent md:text-8xl lg:text-[10rem]">
          Eventra
        </p>
      </div>
    </footer>
  );
};

export default Footer;
