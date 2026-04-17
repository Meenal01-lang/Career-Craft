import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeft, Loader } from "lucide-react";
import api from "../configs/api";

const Preview = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/public/" + resumeId);

      setResumeData(data.resume);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  return resumeData ? (
    <div className="bg-cc-bg min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white rounded-lg shadow-xl"
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-cc-bg">
          <p className="text-center text-4xl sm:text-6xl text-white/40 font-medium">
            Resume not found
          </p>
          <a
            href="/"
            className="mt-6 bg-cc-accent hover:bg-cc-accent-light text-white rounded-full px-6 h-9 flex items-center transition-colors"
          >
            <ArrowLeft className="mr-2 size-4" /> got to home page
          </a>
        </div>
      )}
    </div>
  );
};

export default Preview;
