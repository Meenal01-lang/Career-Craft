import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Target } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const AtsChecker = () => {
  const { token } = useSelector((state) => state.auth);
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.title = "ATS Score Checker | CareerCraft";
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/api/users/resumes", {
          headers: { Authorization: token },
        });
        setResumes(data.resumes || []);
        if (data.resumes?.[0]) setResumeId(data.resumes[0]._id);
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message);
      }
    };
    load();
  }, [token]);

  const runCheck = async (e) => {
    e.preventDefault();
    if (!resumeId || !jobDescription.trim()) {
      toast.error("Select a resume and paste a job description.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post(
        "/api/ai/ats-check",
        { resumeId, jobDescription },
        { headers: { Authorization: token } }
      );
      setResult(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/app"
        className="inline-flex gap-2 items-center text-white/60 hover:text-cc-accent-light transition-colors mb-8"
      >
        <ArrowLeft className="size-4" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-cc-accent/20 text-cc-accent-light">
          <Target className="size-7" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white">ATS Score Checker</h1>
          <p className="text-sm text-white/60">
            Compare your resume to a job posting and see keyword gaps.
          </p>
        </div>
      </div>

      <form
        onSubmit={runCheck}
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

        <div>
          <label className="block text-sm text-white/70 mb-2">
            Job description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here…"
            rows={12}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 rounded-lg bg-cc-accent hover:bg-cc-accent-light text-white font-medium transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Analyzing…" : "Run ATS check"}
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="bg-cc-card border border-white/10 rounded-xl p-6">
            <p className="text-sm text-white/60 mb-2">Match score</p>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold text-cc-accent-light">
                {result.score}
              </span>
              <span className="text-xl text-white/50 mb-1">/ 100</span>
            </div>
            <div className="mt-4 h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-cc-accent to-cc-accent-light transition-all"
                style={{ width: `${result.score}%` }}
              />
            </div>
            {result.summary && (
              <p className="mt-6 text-white/85 leading-relaxed">{result.summary}</p>
            )}
          </div>

          {result.missingKeywords?.length > 0 && (
            <div className="bg-cc-card border border-white/10 rounded-xl p-6">
              <h2 className="font-semibold text-white mb-3">
                Keywords to add or strengthen
              </h2>
              <ul className="flex flex-wrap gap-2">
                {result.missingKeywords.map((kw, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 rounded-full text-sm bg-cc-accent/25 text-cc-accent-light border border-cc-accent/40"
                  >
                    {kw}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AtsChecker;
