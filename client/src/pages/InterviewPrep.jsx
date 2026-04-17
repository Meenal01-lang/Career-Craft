import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Loader2, MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const Section = ({ title, items, openId, setOpenId, prefix }) => (
  <div className="space-y-3">
    <h2 className="text-lg font-semibold text-cc-accent-light">{title}</h2>
    <ul className="space-y-2">
      {(items || []).map((item, i) => {
        const id = `${prefix}-${i}`;
        const isOpen = openId === id;
        return (
          <li
            key={id}
            className="border border-white/10 rounded-lg overflow-hidden bg-[#0A0F1E]/80"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : id)}
              className="w-full flex items-start justify-between gap-3 text-left px-4 py-3 text-white/90 hover:bg-white/5 transition-colors"
            >
              <span className="text-sm">{item.question}</span>
              <ChevronDown
                className={`size-5 shrink-0 text-cc-accent-light transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-0 text-sm text-white/70 leading-relaxed border-t border-white/5">
                {item.suggestedAnswer}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

const InterviewPrep = () => {
  const { token } = useSelector((state) => state.auth);
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    document.title = "Interview Prep | CareerCraft";
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: res } = await api.get("/api/users/resumes", {
          headers: { Authorization: token },
        });
        setResumes(res.resumes || []);
        if (res.resumes?.[0]) setResumeId(res.resumes[0]._id);
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message);
      }
    };
    load();
  }, [token]);

  const generate = async (e) => {
    e.preventDefault();
    if (!resumeId) {
      toast.error("Select a resume.");
      return;
    }
    setLoading(true);
    setData(null);
    setOpenId(null);
    try {
      const { data: out } = await api.post(
        "/api/ai/interview-prep",
        { resumeId },
        { headers: { Authorization: token } }
      );
      setData(out);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/app"
        className="inline-flex gap-2 items-center text-white/60 hover:text-cc-accent-light transition-colors mb-8"
      >
        <ArrowLeft className="size-4" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-cc-accent/20 text-cc-accent-light">
          <MessageCircle className="size-7" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Interview Question Generator
          </h1>
          <p className="text-sm text-white/60">
            10 tailored questions with suggested answers.
          </p>
        </div>
      </div>

      <form
        onSubmit={generate}
        className="mt-8 space-y-6 bg-cc-card border border-white/10 rounded-xl p-6"
      >
        <div>
          <label className="block text-sm text-white/70 mb-2">Resume</label>
          <select
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
            className="w-full py-2.5 px-4 rounded-lg bg-[#0A0F1E] border border-white/15 text-white"
          >
            <option value="">Select a resume</option>
            {resumes.map((r) => (
              <option key={r._id} value={r._id}>
                {r.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 rounded-lg bg-cc-accent hover:bg-cc-accent-light text-white font-medium transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Generating…" : "Generate questions"}
        </button>
      </form>

      {data && (
        <div className="mt-10 space-y-10">
          <Section
            title="Technical"
            items={data.technical}
            openId={openId}
            setOpenId={setOpenId}
            prefix="t"
          />
          <Section
            title="Behavioral"
            items={data.behavioral}
            openId={openId}
            setOpenId={setOpenId}
            prefix="b"
          />
          <Section
            title="HR"
            items={data.hr}
            openId={openId}
            setOpenId={setOpenId}
            prefix="h"
          />
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
