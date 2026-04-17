import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Analytics = () => {
  const { token } = useSelector((state) => state.auth);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    document.title = "Resume Analytics | CareerCraft";
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/api/users/resumes", {
          headers: { Authorization: token },
        });
        setResumes(data.resumes || []);
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message);
      }
    };
    load();
  }, [token]);

  const chartData = useMemo(
    () =>
      resumes.map((r) => ({
        name:
          r.title?.length > 18 ? `${r.title.slice(0, 18)}…` : r.title || "Untitled",
        views: r.viewCount ?? 0,
        downloads: r.downloadCount ?? 0,
      })),
    [resumes]
  );

  const totals = useMemo(() => {
    return resumes.reduce(
      (acc, r) => ({
        views: acc.views + (r.viewCount ?? 0),
        downloads: acc.downloads + (r.downloadCount ?? 0),
      }),
      { views: 0, downloads: 0 }
    );
  }, [resumes]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        to="/app"
        className="inline-flex gap-2 items-center text-white/60 hover:text-cc-accent-light transition-colors mb-8"
      >
        <ArrowLeft className="size-4" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-cc-accent/20 text-cc-accent-light">
          <BarChart3 className="size-7" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Resume Analytics
          </h1>
          <p className="text-sm text-white/60">
            Views and downloads across your resumes.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <div className="bg-cc-card border border-white/10 rounded-xl p-6">
          <p className="text-sm text-white/60">Total views</p>
          <p className="text-3xl font-bold text-cc-accent-light mt-1">
            {totals.views}
          </p>
        </div>
        <div className="bg-cc-card border border-white/10 rounded-xl p-6">
          <p className="text-sm text-white/60">Total downloads</p>
          <p className="text-3xl font-bold text-cc-accent-light mt-1">
            {totals.downloads}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-cc-card border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Per resume</h2>
        {chartData.length === 0 ? (
          <p className="text-white/50">Create a resume to see analytics.</p>
        ) : (
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff18" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={70}
                />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Bar dataKey="views" fill="#7c3aed" name="Views" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="downloads"
                  fill="#9f67ff"
                  name="Downloads"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
