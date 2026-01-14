import { useState, useEffect, useRef } from "react";

/**
 * - Camera + Mic permission gate (HARD BLOCK)
 * - 10 MCQs
 * - Question navigation
 * - Timer
 * - End Exam flow
 */

const QUESTIONS = [
  {
    q: "What does HTML stand for?",
    options: [
      "Hyper Trainer ML",
      "HyperText Markup Language",
      "High Text ML",
      "None",
    ],
    answer: 1,
  },
  {
    q: "Which hook manages state in React?",
    options: ["useData", "useState", "useRef", "useEffect"],
    answer: 1,
  },
  {
    q: "JS is ___ typed?",
    options: ["Statically", "Strongly", "Dynamically", "Loosely"],
    answer: 2,
  },
  {
    q: "Which runs first?",
    options: ["useEffect", "Render", "Constructor", "DOM paint"],
    answer: 1,
  },
  {
    q: "CSS Flexbox axis default?",
    options: ["Column", "Row", "Grid", "Inline"],
    answer: 1,
  },
  {
    q: "HTTP status for success?",
    options: ["404", "500", "301", "200"],
    answer: 3,
  },
  {
    q: "Which is NOT a JS framework?",
    options: ["React", "Vue", "Angular", "Django"],
    answer: 3,
  },
  {
    q: "What is JSX?",
    options: ["HTML", "JS + XML", "Template engine", "Compiler"],
    answer: 1,
  },
  {
    q: "Which keyword blocks scope?",
    options: ["var", "let", "const", "static"],
    answer: 1,
  },
  {
    q: "npm is used for?",
    options: ["Styling", "Packaging", "Database", "Hosting"],
    answer: 1,
  },
];

export default function DemoExam() {
  const videoRef = useRef(null);

  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [stream, setStream] = useState(null);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [submitted, setSubmitted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Added for mobile navigation

  /* ================= PERMISSION CHECK ================= */

  const requestPermissions = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(mediaStream);
      setPermissionsGranted(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      alert("Camera and microphone access is mandatory to start the exam.");
    }
  };

  /* ================= TIMER ================= */

  useEffect(() => {
    if (!permissionsGranted || submitted) return;

    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }

    const t = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, permissionsGranted, submitted]);

  /* ================= SUBMIT ================= */

  const score = QUESTIONS.reduce(
    (acc, q, idx) => acc + (answers[idx] === q.answer ? 1 : 0),
    0
  );

  if (!permissionsGranted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="bg-zinc-900 p-6 sm:p-10 rounded-2xl w-full max-w-lg text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Pre-Exam Check
          </h1>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Camera and microphone access is required to continue.
          </p>

          <div className="aspect-video bg-black rounded-xl mb-6 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={requestPermissions}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
          >
            Enable Camera & Mic
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <div className="bg-zinc-900 p-6 sm:p-10 rounded-2xl w-full max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Exam Finished</h1>
          <p className="text-gray-300 mb-6">
            Score: <span className="font-semibold">{score}</span> /{" "}
            {QUESTIONS.length}
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
          >
            Exit Exam
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[current];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* MOBILE HEADER */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-zinc-800 bg-black sticky top-0 z-20">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-sm bg-zinc-800 px-3 py-1 rounded-lg"
        >
          {isSidebarOpen ? "Close Map" : "Question Map"}
        </button>
        <div className="text-sm font-mono text-red-500">
          ⏱ {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>

      {/* SIDEBAR (Responsive) */}
      <aside
        className={`
        fixed inset-0 z-10 bg-black md:relative md:block md:w-72 border-r border-zinc-800 p-6 transition-transform duration-300
        ${
          isSidebarOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0"
        }
      `}
      >
        <h2 className="font-semibold mb-4 mt-16 md:mt-0 text-gray-400">
          Questions
        </h2>

        <div className="grid grid-cols-5 gap-3">
          {QUESTIONS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrent(idx);
                setIsSidebarOpen(false);
              }}
              className={`h-10 rounded-lg text-sm font-medium transition
                ${
                  current === idx
                    ? "bg-white text-black"
                    : answers[idx] !== undefined
                    ? "bg-green-600/80 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-gray-400"
                }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="mt-8 w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
        >
          End Exam
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full">
        <div className="hidden md:flex justify-between items-center mb-10">
          <h1 className="font-semibold text-gray-400">
            Question {current + 1} / {QUESTIONS.length}
          </h1>
          <div className="text-lg font-mono bg-zinc-900 px-6 py-2 rounded-full border border-zinc-800">
            ⏱ {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>

        <div className="mb-8">
          <span className="md:hidden text-xs uppercase tracking-widest text-blue-500 font-bold mb-2 block">
            Question {current + 1}
          </span>
          <h2 className="text-xl md:text-2xl font-medium leading-snug">
            {q.q}
          </h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          {q.options.map((opt, idx) => (
            <label
              key={idx}
              className={`block p-4 rounded-xl border cursor-pointer transition select-none
                ${
                  answers[current] === idx
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-zinc-800 hover:bg-zinc-900/50"
                }`}
            >
              <input
                type="radio"
                className="hidden"
                name="mcq"
                checked={answers[current] === idx}
                onChange={() => setAnswers({ ...answers, [current]: idx })}
              />
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    answers[current] === idx
                      ? "border-blue-500"
                      : "border-zinc-600"
                  }`}
                >
                  {answers[current] === idx && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                  )}
                </div>
                <span className="text-sm md:text-base">{opt}</span>
              </div>
            </label>
          ))}
        </div>

        {/* NAVIGATION CONTROLS */}
        <div className="flex justify-between items-center mt-12 gap-4">
          <button
            disabled={current === 0}
            onClick={() => setCurrent((c) => c - 1)}
            className="flex-1 md:flex-none px-8 py-3 rounded-xl bg-zinc-800 disabled:opacity-20 hover:bg-zinc-700 transition font-medium"
          >
            Prev
          </button>

          <div className="hidden md:block text-zinc-600 text-sm">
            Selection saved automatically
          </div>

          <button
            disabled={current === QUESTIONS.length - 1}
            onClick={() => setCurrent((c) => c + 1)}
            className="flex-1 md:flex-none px-8 py-3 rounded-xl bg-white text-black disabled:opacity-20 hover:bg-gray-200 transition font-bold"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
