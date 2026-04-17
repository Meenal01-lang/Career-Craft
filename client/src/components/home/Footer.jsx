import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-white/55 bg-cc-card border-t border-white/10 mt-40">
        <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
          <Link to="/" className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="h-11 w-11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="4"
                width="56"
                height="56"
                rx="16"
                stroke="#7C3AED"
                strokeWidth="2.5"
                opacity="0.35"
              />
              <path
                d="M26 20a12 12 0 1 0 0 24"
                stroke="#7C3AED"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M44 20a12 12 0 1 0 0 24"
                stroke="#7C3AED"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path d="M36 10l-5 10h5l-4 9 11-13h-6l5-6z" fill="#7C3AED" />
            </svg>
            <span className="font-semibold text-white">CareerCraft</span>
          </Link>
          <div>
            <p className="text-white font-semibold">Product</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="hover:text-cc-accent-light transition">
                  Home
                </a>
              </li>
              <li>
                <Link
                  to="/app/ats-checker"
                  className="hover:text-cc-accent-light transition"
                >
                  ATS checker
                </Link>
              </li>
              <li>
                <Link
                  to="/app/analytics"
                  className="hover:text-cc-accent-light transition"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  to="/app/interview-prep"
                  className="hover:text-cc-accent-light transition"
                >
                  Interview prep
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold">Resources</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="hover:text-cc-accent-light transition">
                  Company
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-cc-accent-light transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-cc-accent-light transition">
                  Community
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-cc-accent-light transition">
                  Careers
                  <span className="text-xs text-white bg-cc-accent rounded-md ml-2 px-2 py-1">
                    We’re hiring!
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold">Legal</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="hover:text-cc-accent-light transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-cc-accent-light transition">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
          <p className="max-w-60">
            CareerCraft helps you build resumes that open doors—with AI that
            understands hiring.
          </p>
          <div className="flex items-center gap-4 mt-3">
            <a
              href="https://www.linkedin.com/in/meenal-rao-a68b88284"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin size-5 hover:text-cc-accent-light"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
          <p className="mt-3 text-center">© 2026 CareerCraft</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
