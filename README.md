# 🚀 Career Craft — AI-Powered Resume Builder

Career Craft is a full-stack web application that helps users create, optimize, and analyze resumes using AI. It goes beyond a basic resume builder by integrating intelligent features like ATS scoring, resume roasting, and interview question generation.

---

## ✨ Features

* 📄 **Resume Builder**
  Create and manage professional resumes with an intuitive UI.

* 📊 **ATS Score Checker**
  Analyze resumes against job descriptions and get a score based on keyword matching and relevance.

* 🤖 **AI Resume Enhancer**
  Improve professional summaries and job descriptions using AI.

* 🔥 **Resume Roast (Fun + Insightful)**
  Get humorous yet constructive feedback on your resume.

* 🎯 **Interview Question Generator**
  Generate personalized technical, behavioral, and HR questions based on your resume.

* 📈 **Analytics**
  Track resume views and downloads.

* ☁️ **File Upload Support**
  Upload resumes (PDF) and extract structured data.

---

## 🧠 AI/ML Integration

Career Craft integrates AI capabilities using **Google Gemini API** (via OpenAI-compatible interface).

### Key AI Functionalities:

* **Natural Language Processing (NLP)**
  Extracts structured information from raw resume text.

* **Content Enhancement**
  Improves resume sections using prompt-based AI generation.

* **Semantic Matching (ATS)**
  Compares resume content with job descriptions to evaluate alignment.

* **Context-Based Generation**
  Generates interview questions tailored to user resumes.

### How it works:

1. Resume data is converted into structured text.
2. Custom prompts are sent to the AI model.
3. AI returns optimized or analyzed results.
4. Results are parsed and displayed in the UI.

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Other Integrations

* ImageKit (file storage)
* PDF parsing (`pdf-parse`)
* JWT Authentication

---

## 📁 Project Structure

```
Career Craft/
│
├── client/        # Frontend (React)
├── server/        # Backend (Node.js + Express)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── configs/
│
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the `server` folder and add:

```
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

# AI
GEMINI_API_KEY=your_api_key

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/YOUR_USERNAME/career-craft.git
cd career-craft
```

---

### 2️⃣ Setup Backend

```
cd server
npm install
node server.js
```

---

### 3️⃣ Setup Frontend

```
cd client
npm install
npm run dev
```

---

## 🌐 Running the App

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:3000`

---

## 🚧 Future Improvements

* Deploy backend (Render/Railway)
* Improve AI response formatting
* Add resume templates
* Add user dashboard analytics
* Optimize ATS scoring algorithm

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📌 Note

This project is built for learning and demonstration purposes, showcasing full-stack development and AI integration in real-world applications.

---

## 👩‍💻 Author

**Meenal Rao**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and support the work!
