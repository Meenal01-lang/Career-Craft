import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Flame, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeRoast = () => {
  const { token } = useSelector((state) => state.auth);
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.title = "Resume Roast | CareerCraft";
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

  const runRoast = async (e) => {
    e.preventDefault();
    if (!resumeId) {
      toast.error("Select a resume.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post(
        "/api/ai/resume-roast",
        { resumeId },
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/app"
        className="inline-flex gap-2 items-center text-white/60 hover:text-cc-accent-light transition-colors mb-8"
      >
        <ArrowLeft className="size-4" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-orange-500/20 text-orange-300">
          <Flame className="size-7" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white">Resume Roast</h1>
          <p className="text-sm text-white/60">
            Honest (and humorous) feedback, then real fixes.
          </p>
        </div>
      </div>

      <form
        onSubmit={runRoast}
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
          {loading ? "Roasting…" : "Roast my resume"}
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="bg-cc-card border border-orange-500/30 rounded-xl p-6">
            <h2 className="text-sm font-medium text-orange-300 mb-2">The roast</h2>
            <p className="text-white/90 leading-relaxed italic">{result.roast}</p>
          </div>

          <div className="bg-cc-card border border-white/10 rounded-xl p-6">
            <h2 className="font-semibold text-white mb-4">
              5 actionable improvements
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-white/85">
              {result.tips?.map((tip, i) => (
                <li key={i} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeRoast;
