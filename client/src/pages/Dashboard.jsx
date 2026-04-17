import {
  BarChart3,
  FilePenLineIcon,
  Flame,
  LoaderCircleIcon,
  MessageCircle,
  PencilIcon,
  PlusIcon,
  Target,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]);
  const [showCreteResume, setShowCreteResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const colors = ["#7c3aed", "#9f67ff", "#a78bfa", "#8b5cf6", "#6d28d9"];

  const totals = useMemo(() => {
    return allResumes.reduce(
      (acc, r) => ({
        views: acc.views + (r.viewCount ?? 0),
        downloads: acc.downloads + (r.downloadCount ?? 0),
      }),
      { views: 0, downloads: 0 }
    );
  }, [allResumes]);

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreteResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!resume) {
        toast.error("Please choose a PDF file to upload.");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", resume);

      const { data } = await api.post("/api/ai/upload-resume", formData, {
        headers: { Authorization: token },
      });
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();

      const ok = window.confirm("Update this resume title?");
      if (ok) {
        const { data } = await api.put(
          "/api/resumes/update",
          { resumeId: editResumeId, resumeData: { title } },
          {
            headers: { Authorization: token },
          }
        );
        setAllResumes((prev) =>
          prev.map((r) => (r._id === editResumeId ? { ...r, title } : r))
        );
        loadAllResumes();
        setTitle("");
        setEditResumeId("");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume"
      );

      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    document.title = "Dashboard | CareerCraft";
    loadAllResumes();
  }, []);

  const toolCards = [
    {
      to: "/app/ats-checker",
      icon: Target,
      label: "ATS Checker",
      desc: "Match score vs. job posts",
    },
    {
      to: "/app/analytics",
      icon: BarChart3,
      label: "Analytics",
      desc: "Views & downloads",
    },
    {
      to: "/app/resume-roast",
      icon: Flame,
      label: "Resume Roast",
      desc: "Honest AI feedback",
    },
    {
      to: "/app/interview-prep",
      icon: MessageCircle,
      label: "Interview Prep",
      desc: "Questions & answers",
    },
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-2 text-white">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </p>
        <p className="text-white/50 text-sm mb-8">
          Build and optimize your career story with CareerCraft.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {toolCards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="bg-cc-card border border-white/10 rounded-xl p-4 hover:border-cc-accent/50 transition-colors group"
            >
              <c.icon className="size-6 text-cc-accent-light mb-2 group-hover:scale-105 transition-transform" />
              <p className="font-medium text-white">{c.label}</p>
              <p className="text-xs text-white/50 mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-cc-card border border-white/10 rounded-xl p-5">
            <p className="text-sm text-white/60">Total resume views</p>
            <p className="text-2xl font-semibold text-cc-accent-light mt-1">
              {totals.views}
            </p>
          </div>
          <div className="bg-cc-card border border-white/10 rounded-xl p-5">
            <p className="text-sm text-white/60">Total downloads</p>
            <p className="text-2xl font-semibold text-cc-accent-light mt-1">
              {totals.downloads}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowCreteResume(true)}
            className="w-full bg-cc-card sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg text-white/80 border border-dashed border-white/25 group hover:border-cc-accent hover:shadow-lg hover:shadow-cc-accent/10 transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-cc-accent/30 text-cc-accent-light rounded-full" />
            <p className="text-sm group-hover:text-cc-accent-light transition-all mt-2">
              Create resume
            </p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-cc-card sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg text-white/80 border border-dashed border-white/25 group hover:border-cc-accent-light hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-cc-accent/20 text-cc-accent-light rounded-full" />
            <p className="text-sm group-hover:text-cc-accent-light transition-all mt-2">
              Upload existing
            </p>
          </button>
        </div>

        <hr className="border-white/10 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}12, ${baseColor}35) `,
                  borderColor: baseColor + "55",
                }}
              >
                <FilePenLineIcon
                  className="size-11 group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center text-white"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-8 text-[10px] text-white/50 px-2 text-center w-full"
                  style={{ color: baseColor + "cc" }}
                >
                  {resume.viewCount ?? 0} views · {resume.downloadCount ?? 0}{" "}
                  downloads
                </p>

                <p
                  className="absolute bottom-1 text-[11px] text-white/40 px-2 text-center"
                  style={{
                    color: baseColor + "90",
                  }}
                >
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-white/10 rounded text-white/80 transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/10 rounded text-white/80 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showCreteResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreteResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-cc-card border border-white/10 shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-white">
                Create a resume
              </h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Resume title"
                className="w-full py-2 mb-4 px-4"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-cc-accent text-white rounded-lg hover:bg-cc-accent-light transition-colors"
              >
                Create resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-white/40 hover:text-white cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreteResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-cc-card border border-white/10 shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-white">
                Upload resume
              </h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Resume title"
                className="w-full py-2 mb-4 px-4"
                required
              />

              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-white/70"
                >
                  PDF file
                  <div className="flex flex-col items-center justify-center gap-2 border border-white/20 border-dashed rounded-md p-4 py-10 my-4 hover:border-cc-accent cursor-pointer transition-colors text-white/50">
                    {resume ? (
                      <p className="text-cc-accent-light">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Choose file</p>
                      </>
                    )}
                  </div>
                </label>

                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-2 bg-cc-accent text-white rounded-lg hover:bg-cc-accent-light transition-colors flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <LoaderCircleIcon className="animate-spin size-4 text-white" />
                )}
                {isLoading ? "Uploading…" : "Upload"}
              </button>
              <XIcon
                className="absolute top-4 right-4 text-white/40 hover:text-white cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-cc-card border border-white/10 shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-white">
                Edit resume title
              </h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Resume title"
                className="w-full py-2 mb-4 px-4"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-cc-accent text-white rounded-lg hover:bg-cc-accent-light transition-colors"
              >
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 text-white/40 hover:text-white cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
