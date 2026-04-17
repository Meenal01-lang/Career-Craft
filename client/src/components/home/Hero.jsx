import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const logos = ["Microsoft", "Google", "Amazon", "Stripe", "Spotify"];

  return (
    <>
      <div className="min-h-screen pb-20">
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
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
            <span className="font-semibold text-white hidden sm:inline">
              CareerCraft
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 transition duration-500 text-white/80">
            <a href="/" className="hover:text-cc-accent-light transition">
              Home
            </a>
            <a href="#features" className="hover:text-cc-accent-light transition">
              Features
            </a>
            <a href="#testimonials" className="hover:text-cc-accent-light transition">
              Testimonials
            </a>
            <a href="#cta" className="hover:text-cc-accent-light transition">
              Contact
            </a>
          </div>

          <div className="flex gap-2">
            <Link
              to="/app?state=register"
              className="hidden md:block px-6 py-2 bg-cc-accent hover:bg-cc-accent-light active:scale-95 transition-all rounded-full text-white"
              hidden={user}
            >
              Get started
            </Link>
            <Link
              to="/app?state=login"
              className="hidden md:block px-6 py-2 border border-white/25 active:scale-95 hover:bg-white/10 transition-all rounded-full text-white"
              hidden={user}
            >
              Login
            </Link>
            <Link
              to="/app"
              className="hidden md:block px-8 py-2 bg-cc-accent hover:bg-cc-accent-light active:scale-95 transition-all rounded-full text-white"
              hidden={!user}
            >
              Dashboard
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden active:scale-90 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-menu"
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-100 bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <a href="/" className="text-white">
            Home
          </a>
          <a href="#features" className="text-white">
            Features
          </a>
          <a href="#testimonials" className="text-white">
            Testimonials
          </a>
          <a href="#contact" className="text-white">
            Contact
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="active:ring-3 active:ring-cc-accent aspect-square size-10 p-1 items-center justify-center bg-cc-accent hover:bg-cc-accent-light transition text-white rounded-md flex"
          >
            X
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-white">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-cc-accent blur-[100px] opacity-25"></div>

          {/* Avatars + Stars */}
          <div className="flex items-center mt-24">
            <div className="flex -space-x-3 pr-3">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                alt="user3"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-1"
              />
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="user1"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="user2"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-3"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                alt="user3"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-4"
              />
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="user5"
                className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-5"
              />
            </div>

            <div>
              <div className="flex ">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star text-transparent fill-cc-accent"
                      aria-hidden="true"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                  ))}
              </div>
              <p className="text-sm text-white/60">Used by 10,000+ users</p>
            </div>
          </div>

          {/* Headline + CTA */}
          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
            Land your dream job with{" "}
            <span className="bg-linear-to-r from-cc-accent-light to-cc-accent bg-clip-text text-transparent text-nowrap">
              AI-powered{" "}
            </span>{" "}
            resumes.
          </h1>

          <p className="max-w-md text-center text-base my-7 text-white/70">
            CareerCraft helps you build, roast, and optimize resumes—with ATS
            checks and interview prep built in.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 ">
            <Link
              to="/app"
              className="bg-cc-accent hover:bg-cc-accent-light text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-offset-cc-bg ring-1 ring-cc-accent/60 flex items-center transition-colors"
            >
              Get started
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
                className="lucide lucide-arrow-right ml-1 size-4"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
            <button
              type="button"
              className="flex items-center gap-2 border border-white/25 hover:bg-white/10 transition rounded-full px-7 h-12 text-white/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-video size-5"
                aria-hidden="true"
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                <rect x="2" y="6" width="14" height="12" rx="2"></rect>
              </svg>
              <span>Try demo</span>
            </button>
          </div>

          <p className="py-6 text-white/50 mt-14">
            Trusted by teams who hire with confidence, including
          </p>

          <div
            className="flex flex-wrap justify-center gap-3 max-w-3xl w-full mx-auto py-4"
            id="logo-container"
          >
            {logos.map((logo) => (
              <span
                key={logo}
                className="px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/75 text-xs tracking-wide"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
