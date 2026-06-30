# PrepAI — Full-Stack AI Interview & Resume Optimization Platform

PrepAI is a high-fidelity, production-ready SaaS application designed to help students and job seekers streamline their career preparation. Built with an elite Apple-style minimal aesthetic, the platform integrates structural resume text processing, dynamic algorithmic ATS matching, interactive learning roadmaps, and a real-time conversational AI interview simulator.

## 🔗 Live Links
- **🚀 Live Production Deployment:** [Paste your Vercel/Netlify link here]
- **🔑 Fast Track Demo Credentials:** `Email: demo@prepai.dev` | `Password: password`

---

## ⚡ Key Core Features

### 1. 📄 Algorithmic ATS Score Checker & Parser
- **Mechanism:** Implements a localized string-tokenization algorithm that evaluates text density maps between an uploaded resume and a target job description.
- **Output:** Returns mathematical match scores alongside detailed granular analysis buckets (`Matched Keywords`, `Missing Gaps`, `Impact Verb Suggestions`).

### 2. 🧭 Interactive Domain Mapping & Stepped Roadmaps
- **Flow:** Dynamically bifurcates career roadmaps between **Core Engineering** and **IT/Software Ecosystems** based on responsive user state profiling.
- **Structure:** Generates progressive learning visual check-nodes tracking Foundational, Intermediate, and Advanced milestones with indexed external learning references.

### 3. 🎙️ AI Mock Interview Simulator & Feedback Hub
- **UI Physics:** Features a simulated audio/video interface container utilizing real-time mic amplitude visualization parameters.
- **Evaluation Loop:** Submits structural user dialogue response tokens to a secure backend route handler, returning synchronized performance metrics categorized by `Technical Accuracy`, `Communication Clarity`, and `STAR Framework Compliance`.

---

## 🛠️ System Architecture & Tech Stack

```text
├── src/
│   ├── app/             # Next.js App Routing and API Proxy Layer
│   │   └── api/         # Secure external LLM gateway gateways (Masked API Keys)
│   ├── components/      # Apple-grade glassmorphic and neomorphic layout panels
│   ├── data/            # High-fidelity company interview repositories (Google, Tesla, Meta)
│   └── utils/           # Keyword text-heuristic parsing engines
