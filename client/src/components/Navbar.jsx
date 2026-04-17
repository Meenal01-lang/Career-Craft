import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const navLinkClass = ({ isActive }) =>
  `text-sm whitespace-nowrap transition-colors ${
    isActive
      ? "text-cc-accent-light font-medium"
      : "text-white/70 hover:text-white"
  }`;

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className="shadow-lg border-b border-white/10 bg-cc-card/90 backdrop-blur-sm">
      <nav className="flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto px-4 py-3.5 transition-all">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <svg
            aria-hidden="true"
            viewBox="0 0 64 64"
            className="h-10 w-10"
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
            <path
              d="M36 10l-5 10h5l-4 9 11-13h-6l5-6z"
              fill="#7C3AED"
            />
          </svg>
          <span className="font-semibold text-white hidden sm:inline">
            CareerCraft
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm max-w-full order-3 sm:order-2 w-full sm:w-auto">
          <NavLink to="/app" end className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/app/ats-checker" className={navLinkClass}>
            ATS Checker
          </NavLink>
          <NavLink to="/app/analytics" className={navLinkClass}>
            Analytics
          </NavLink>
          <NavLink to="/app/resume-roast" className={navLinkClass}>
            Resume Roast
          </NavLink>
          <NavLink to="/app/interview-prep" className={navLinkClass}>
            Interview Prep
          </NavLink>
        </div>

        <div className="flex items-center gap-3 shrink-0 order-2 sm:order-3 ml-auto sm:ml-0">
          <p className="max-sm:hidden text-sm text-white/80">Hi, {user?.name}</p>
          <button
            onClick={logoutUser}
            className="bg-cc-bg hover:bg-white/10 border border-white/20 text-white px-5 py-1.5 rounded-full active:scale-95 transition-all text-sm"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
