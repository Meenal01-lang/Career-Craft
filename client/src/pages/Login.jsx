import { Lock, Mail, User2Icon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../configs/api";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = useState(urlState || "login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);

      dispatch(login(data));

      localStorage.setItem("token", data.token);

      toast.success(data.message);
    } catch (error) {
      toast(error?.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cc-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[380px] w-full text-center border border-white/10 rounded-2xl px-8 bg-cc-card shadow-xl"
      >
        <h1 className="text-white text-3xl mt-10 font-medium">
          {state === "login" ? "Welcome back" : "Join CareerCraft"}
        </h1>
        <p className="text-white/50 text-sm mt-2">
          {state === "login" ? "Login" : "Sign up"} to continue
        </p>
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-[#0A0F1E] border border-white/15 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} className="text-white/40" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 w-full bg-transparent text-white"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="flex items-center w-full mt-4 bg-[#0A0F1E] border border-white/15 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} className="text-white/40" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-none outline-none ring-0 w-full bg-transparent text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-[#0A0F1E] border border-white/15 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={13} className="text-white/40" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0 w-full bg-transparent text-white"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-cc-accent hover:bg-cc-accent-light transition-colors font-medium"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-white/50 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span className="text-cc-accent-light hover:underline">
            {state === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
