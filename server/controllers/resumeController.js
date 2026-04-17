import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

//controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;

    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });

    return res
      .status(201)
      .json({ message: "Resume create successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for deleting a resume
// POST: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    return res.status(201).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get user resume by id
// POST: /api/resumes/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get resume by id public
// POST: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOneAndUpdate(
      { public: true, _id: resumeId },
      { $inc: { viewCount: 1 } },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for updating a resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy;

    if (typeof resumeData === "string") {
      resumeDataCopy = await JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    // Never allow client to overwrite immutable/owned fields
    delete resumeDataCopy._id;
    delete resumeDataCopy.userId;
    delete resumeDataCopy.createdAt;
    delete resumeDataCopy.updatedAt;
    delete resumeDataCopy.__v;
    delete resumeDataCopy.viewCount;
    delete resumeDataCopy.downloadCount;

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.45" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });
      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      { $set: resumeDataCopy },
      { new: true }
    );

    if (image?.path) {
      fs.promises.unlink(image.path).catch(() => {});
    }

    return res.status(200).json({ message: "Saved successfully", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// POST: /api/resumes/public/:resumeId/view — increment public resume views
export const trackResumeView = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, public: true },
      { $inc: { viewCount: 1 } },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or not public" });
    }

    return res.status(200).json({ viewCount: resume.viewCount });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// POST: /api/resumes/track-download/:resumeId — owner download count
export const trackResumeDownload = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ downloadCount: resume.downloadCount });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
