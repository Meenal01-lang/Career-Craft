import { useState } from "react";
import { Zap } from "lucide-react";
import Title from "./Title";

const Features = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      id="features"
      className="flex flex-col items-center my-10 scroll-mt-12 px-4"
    >
      <div className="flex items-center gap-2 text-sm text-cc-accent-light bg-cc-accent/15 rounded-full px-6 py-1.5 border border-cc-accent/30">
        <Zap width={14} />
        <span>Simple process</span>
      </div>

      <Title
        title="Craft your career story"
        description="Templates, AI enhancements, ATS checks, analytics, and interview prep—everything in one place."
      />
      <div className="flex flex-col md:flex-row items-center justify-center xl:-mt-10">
        <img
          className="max-w-2xl w-full xl:-ml-32 opacity-90"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt=""
        />
        <div
          className="px-4 md:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={
              "flex items-center justify-center gap-6 max-w-md group cursor-pointer"
            }
          >
            <div
              className={`p-6 group-hover:bg-cc-accent/15 border border-transparent group-hover:border-cc-accent/40 flex gap-4 rounded-xl transition-colors ${
                !isHover ? "border-cc-accent/40 bg-cc-accent/10" : ""
              }`}
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
                className="size-6 stroke-cc-accent-light"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white">
                  ATS keyword insights
                </h3>
                <p className="text-sm text-white/60 max-w-xs">
                  Paste any job description and see how well your resume matches.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-cc-accent/15 border border-transparent group-hover:border-cc-accent/40 flex gap-4 rounded-xl transition-colors">
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
                className="size-6 stroke-cc-accent-light"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white">
                  View & download analytics
                </h3>
                <p className="text-sm text-white/60 max-w-xs">
                  Know how often shared resumes are viewed and downloaded.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-cc-accent/15 border border-transparent group-hover:border-cc-accent/40 flex gap-4 rounded-xl transition-colors">
              <svg
                className="size-6 stroke-cc-accent-light"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white">
                  Interview prep & roast
                </h3>
                <p className="text-sm text-white/60 max-w-xs">
                  Practice questions from your resume and get honest feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
