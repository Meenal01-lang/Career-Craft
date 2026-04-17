import { GoogleGenerativeAI } from "@google/generative-ai";
import Resume from "../models/Resume.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// helper to get model
const getModel = () => {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
  });
};

// helper to safely parse JSON
const parseJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      return JSON.parse(text.slice(start, end + 1));
    }
    throw new Error("Invalid JSON from AI");
  }
};

// convert resume to text
const resumeToText = (resume) => {
  let text = "";

  if (resume.personal_info?.full_name)
    text += `Name: ${resume.personal_info.full_name}\n`;

  if (resume.skills?.length)
    text += `Skills: ${resume.skills.join(", ")}\n`;

  if (resume.professional_summary)
    text += `Summary: ${resume.professional_summary}\n`;

  (resume.experience || []).forEach((exp) => {
    text += `Worked as ${exp.position} at ${exp.company}\n`;
  });

  return text;
};

//////////////////////////////////////////////////////////////
// 🔥 INTERVIEW PREP
//////////////////////////////////////////////////////////////
export const interviewPrep = async (req, res) => {
  try {
    const { resumeId } = req.body;
    const userId = req.userId;

    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const model = getModel();
    const resumeText = resumeToText(resume);

    const prompt = `
Based on this resume:
${resumeText}

Generate:
- 4 technical questions
- 3 behavioral questions
- 3 HR questions

Return ONLY JSON like:
{
  "technical":[{"question":"","suggestedAnswer":""}],
  "behavioral":[{"question":"","suggestedAnswer":""}],
  "hr":[{"question":"","suggestedAnswer":""}]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const parsed = parseJSON(text);

    res.json(parsed);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error generating questions" });
  }
};

//////////////////////////////////////////////////////////////
// 🔥 ATS SCORE
//////////////////////////////////////////////////////////////
export const atsScoreCheck = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;
    const userId = req.userId;

    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const model = getModel();
    const resumeText = resumeToText(resume);

    const prompt = `
Compare this resume with job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return JSON:
{
  "score": number,
  "missingKeywords": [],
  "summary": ""
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const parsed = parseJSON(text);

    res.json(parsed);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ATS check failed" });
  }
};

//////////////////////////////////////////////////////////////
// 🔥 RESUME ROAST
//////////////////////////////////////////////////////////////
export const resumeRoast = async (req, res) => {
  try {
    const { resumeId } = req.body;
    const userId = req.userId;

    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const model = getModel();
    const resumeText = resumeToText(resume);

    const prompt = `
Roast this resume in a funny way and give 5 tips.

Resume:
${resumeText}

Return JSON:
{
  "roast": "",
  "tips": []
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const parsed = parseJSON(text);

    res.json(parsed);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Roast failed" });
  }
};