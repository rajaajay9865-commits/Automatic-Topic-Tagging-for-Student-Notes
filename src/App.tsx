import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Share2,
  Download,
  Upload,
  Copy,
  Check,
  Plus,
  Search,
  Sparkles,
  RotateCcw,
  LogOut,
  ArrowRight,
  BookOpen,
  FileText,
  X,
  Compass,
  CheckCircle2,
  FileDown,
  Users,
  Award,
  HelpCircle,
  ChevronRight,
  CheckCircle,
  XCircle,
  Lightbulb,
  Layers
} from "lucide-react";

export interface Note {
  id: string;
  title: string;
  date: string;
  body: string;
  tags: string[];
  edited?: boolean;
}

export interface Topic {
  name: string;
  symbol: string;
  color: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const TOPICS: Topic[] = [
  { name: "Algebra", symbol: "📐", color: "#8c7ae6", description: "Equations, functions, variables, and mathematical relationships." },
  { name: "Biology", symbol: "🧬", color: "#36a77a", description: "Living organisms, cells, genetics, ecology, and life processes." },
  { name: "Chemistry", symbol: "⚗️", color: "#e39a48", description: "Elements, reactions, bonding, matter, and chemical calculations." },
  { name: "Computer Science", symbol: "💻", color: "#4f87d9", description: "Programming, algorithms, data structures, and computing systems." },
  { name: "Physics", symbol: "⚛️", color: "#d56a83", description: "Motion, forces, energy, waves, and physical laws." },
  { name: "History", symbol: "📜", color: "#ae8054", description: "Past events, societies, chronology, and historical interpretation." },
  { name: "Writing", symbol: "✍️", color: "#3a9ca3", description: "Composition, argument, grammar, and writing techniques." }
];

const INITIAL_NOTES: Note[] = [
  {
    id: "n1",
    title: "Linear equations: balancing both sides",
    date: "Oct 18, 2026",
    body: "ALGEBRA — Linear equations\n\nAn equation stays balanced when the same operation is applied to both sides.\n\nExample: 3x + 5 = 20\nSubtract 5: 3x = 15\nDivide by 3: x = 5\n\nCheck by substitution: 3(5) + 5 = 20.",
    tags: ["Algebra"]
  },
  {
    id: "n2",
    title: "Cell membranes and transport",
    date: "Oct 16, 2026",
    body: "BIOLOGY — Cell membrane\n\nThe phospholipid bilayer is selectively permeable. Diffusion moves particles down a concentration gradient. Osmosis is the diffusion of water across a partially permeable membrane.\n\nActive transport uses ATP to move substances against a concentration gradient.",
    tags: ["Biology"]
  },
  {
    id: "n3",
    title: "Balancing chemical equations",
    date: "Oct 14, 2026",
    body: "CHEMISTRY — Conservation of mass\n\nAtoms are conserved in a chemical reaction. Balance coefficients rather than changing subscripts.\n\n2H₂ + O₂ → 2H₂O\n\nThe coefficient 2 means two molecules of hydrogen; the subscript belongs to the molecule.",
    tags: ["Chemistry"]
  },
  {
    id: "n4",
    title: "Python loops and list iteration",
    date: "Oct 12, 2026",
    body: "COMPUTER SCIENCE — Iteration\n\nfor item in items:\n    print(item)\n\nA for loop visits each element in an iterable. A while loop repeats while its condition evaluates to True. Watch for off-by-one errors in range().",
    tags: ["Computer Science"]
  },
  {
    id: "n5",
    title: "Newton's second law in practice",
    date: "Oct 10, 2026",
    body: "PHYSICS — Forces\n\nNewton's second law: F = ma. The net force on an object equals its mass multiplied by its acceleration. SI units: force in newtons (N), mass in kilograms (kg), acceleration in m/s².\n\nIf m = 2 kg and a = 3 m/s², then F = 6 N.",
    tags: ["Physics", "Algebra"]
  },
  {
    id: "n6",
    title: "The causes of the French Revolution",
    date: "Oct 8, 2026",
    body: "HISTORY — 1789\n\nKey contributing factors included social inequality among the three estates, financial crisis and state debt, poor harvests, and Enlightenment ideas about popular sovereignty.\n\nThese causes interacted; no single factor alone explains the revolution.",
    tags: ["History"]
  },
  {
    id: "n7",
    title: "Building a clear thesis statement",
    date: "Oct 6, 2026",
    body: "WRITING — Argument structure\n\nA strong thesis makes a specific, arguable claim and previews the reasoning. Avoid a topic-only statement.\n\nTopic: renewable energy\nWeak: This essay is about solar power.\nStronger: Because it reduces operational emissions, solar power should be prioritised in new public buildings.",
    tags: ["Writing"]
  },
  {
    id: "n8",
    title: "Quadratic graphs and the vertex",
    date: "Oct 4, 2026",
    body: "ALGEBRA — Quadratic functions\n\nFor y = a(x - h)² + k, the vertex is (h, k) and the axis of symmetry is x = h. When a is positive the parabola opens upward; when negative it opens downward.",
    tags: ["Algebra"]
  },
  {
    id: "n9",
    title: "DNA, genes, and inheritance",
    date: "Oct 2, 2026",
    body: "BIOLOGY — Genetics\n\nDNA stores inherited information. A gene is a section of DNA that contributes to a functional product. Alleles are alternative forms of a gene. Genotype describes alleles; phenotype describes observable traits.",
    tags: ["Biology"]
  },
  {
    id: "n10",
    title: "Sorting algorithm comparison",
    date: "Sep 29, 2026",
    body: "COMPUTER SCIENCE — Algorithms\n\nBubble sort repeatedly swaps adjacent out-of-order values; its average time complexity is O(n²). Merge sort splits, sorts, and merges; its time complexity is O(n log n) with O(n) extra space.",
    tags: ["Computer Science", "Algebra"]
  },
  {
    id: "n11",
    title: "Energy conservation and pendulums",
    date: "Sep 26, 2026",
    body: "PHYSICS — Energy transfer\n\nAt the top of a swing, gravitational potential energy is greatest. As the pendulum descends, energy transfers into kinetic energy. In an ideal system total mechanical energy is conserved; friction transfers some energy to heat.",
    tags: ["Physics"]
  },
  {
    id: "n12",
    title: "Sources and evidence in history essays",
    date: "Sep 23, 2026",
    body: "HISTORY + WRITING\n\nUse provenance, context, and corroboration to assess a primary source. In an essay, make a claim, support it with evidence, and explain how that evidence answers the question.",
    tags: ["History", "Writing"]
  },
  {
    id: "n13",
    title: "Acids, bases, and pH",
    date: "Sep 20, 2026",
    body: "CHEMISTRY — Acids\n\nThe pH scale indicates acidity. A solution with pH below 7 is acidic; above 7 is basic. Neutralisation between an acid and a base can form salt and water.\n\nHCl + NaOH → NaCl + H₂O",
    tags: ["Chemistry"]
  },
  {
    id: "n14",
    title: "Short scratch note",
    date: "Sep 18, 2026",
    body: "F = ma. Check units.",
    tags: ["Physics", "Algebra"]
  },
  {
    id: "n15",
    title: "Code lab: parsing CSV rows",
    date: "Sep 15, 2026",
    body: "import csv\n\nwith open('scores.csv', newline='') as file:\n    for row in csv.DictReader(file):\n        print(row['student_id'], row['score'])\n\nA CSV parser handles quoted fields more reliably than splitting on commas.",
    tags: ["Computer Science"]
  },
  {
    id: "n16",
    title: "Photosynthesis overview",
    date: "Sep 12, 2026",
    body: "BIOLOGY — Photosynthesis\n\nChlorophyll in chloroplasts captures light energy. Carbon dioxide and water are converted into glucose and oxygen.\n\n6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
    tags: ["Biology", "Chemistry"]
  }
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    topic: "Algebra",
    question: "In the linear equation 3x + 5 = 20, what is the balanced value of x?",
    options: ["x = 5", "x = 15", "x = 3", "x = 7"],
    correctIndex: 0,
    explanation: "Subtract 5 from both sides: 3x = 15. Divide both sides by 3: x = 5. Checking: 3(5) + 5 = 20."
  },
  {
    id: "q2",
    topic: "Algebra",
    question: "For the quadratic function in vertex form y = a(x - h)² + k, what coordinates represent the vertex?",
    options: ["(h, k)", "(-h, -k)", "(a, h)", "(0, k)"],
    correctIndex: 0,
    explanation: "In vertex form y = a(x - h)² + k, the vertex coordinates are (h, k) and the axis of symmetry is x = h."
  },
  {
    id: "q3",
    topic: "Biology",
    question: "Which cellular transport mechanism consumes ATP to move molecules against a concentration gradient?",
    options: ["Active transport", "Simple diffusion", "Osmosis", "Passive filtration"],
    correctIndex: 0,
    explanation: "Active transport requires cellular energy (ATP) to pump molecules against their concentration gradient."
  },
  {
    id: "q4",
    topic: "Biology",
    question: "In photosynthesis, which organelle contains chlorophyll to capture light energy?",
    options: ["Chloroplast", "Mitochondria", "Ribosome", "Nucleus"],
    correctIndex: 0,
    explanation: "Chlorophyll located inside chloroplasts captures sunlight to convert CO₂ and H₂O into glucose and O₂."
  },
  {
    id: "q5",
    topic: "Chemistry",
    question: "When balancing a chemical reaction equation such as 2H₂ + O₂ → 2H₂O, what can you modify?",
    options: ["Balance coefficients only", "Change molecular subscripts", "Add or remove elements", "Modify charge states"],
    correctIndex: 0,
    explanation: "Atoms are conserved. You must balance stoichiometric coefficients rather than altering chemical subscripts."
  },
  {
    id: "q6",
    topic: "Chemistry",
    question: "On the standard pH scale, how is a chemical solution with a pH below 7 classified?",
    options: ["Acidic", "Basic / Alkaline", "Neutral", "Saturated"],
    correctIndex: 0,
    explanation: "pH below 7 indicates an acidic solution; pH 7 is neutral; pH above 7 is basic/alkaline."
  },
  {
    id: "q7",
    topic: "Computer Science",
    question: "What is the average time complexity of the Bubble Sort comparison algorithm?",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
    correctIndex: 0,
    explanation: "Bubble sort repeatedly passes through the list comparing and swapping adjacent items, resulting in O(n²) average time."
  },
  {
    id: "q8",
    topic: "Computer Science",
    question: "In Python, which loop construct is preferred when iterating directly over each element in an iterable sequence?",
    options: ["for item in items:", "while True:", "loop until items:", "switch items:"],
    correctIndex: 0,
    explanation: "A Python `for` loop directly iterates through elements of an iterable (lists, tuples, ranges) cleanly."
  },
  {
    id: "q9",
    topic: "Physics",
    question: "Which formula represents Newton's Second Law connecting Net Force (F), Mass (m), and Acceleration (a)?",
    options: ["F = ma", "F = m / a", "F = ½ma²", "F = m + a"],
    correctIndex: 0,
    explanation: "Newton's Second Law states that the net force equals mass multiplied by acceleration (F = ma, in Newtons)."
  },
  {
    id: "q10",
    topic: "Physics",
    question: "At the highest peak of a swinging pendulum, which energy form is at its maximum?",
    options: ["Gravitational Potential Energy", "Kinetic Energy", "Frictional Heat", "Elastic Energy"],
    correctIndex: 0,
    explanation: "At the peak apex, instantaneous velocity is zero (kinetic energy = 0), and gravitational potential energy is highest."
  },
  {
    id: "q11",
    topic: "History",
    question: "Which landmark year marks the start of the French Revolution triggered by social estate inequalities and debt?",
    options: ["1789", "1776", "1804", "1815"],
    correctIndex: 0,
    explanation: "1789 marks the outbreak of the French Revolution sparked by financial crisis, poor harvests, and Enlightenment ideals."
  },
  {
    id: "q12",
    topic: "History",
    question: "What type of historical evidence comes directly from the time period under study (e.g. letters, diaries, decrees)?",
    options: ["Primary source", "Secondary source", "Tertiary review", "Modern commentary"],
    correctIndex: 0,
    explanation: "A primary source originates directly from the historical period being researched, unlike secondary analyses written later."
  },
  {
    id: "q13",
    topic: "Writing",
    question: "What distinguishes a strong academic essay thesis statement from a weak one?",
    options: ["It makes a specific, arguable claim with reasoning", "It merely mentions the broad topic", "It asks an open-ended question", "It lists quotes without analysis"],
    correctIndex: 0,
    explanation: "A strong thesis makes an arguable claim and previews the reasoning, rather than merely stating a general topic."
  }
];

const KEYWORDS: Record<string, string[]> = {
  Algebra: ["algebra", "equation", "variable", "function", "quadratic", "parabola", "vertex", "coefficient", "x =", "graph", "ratio", "solve", "polynomial", "f = ma"],
  Biology: ["biology", "cell", "membrane", "dna", "gene", "allele", "genetics", "organism", "photosynthesis", "chloroplast", "osmosis", "diffusion", "phospholipid", "ecology"],
  Chemistry: ["chemistry", "chemical", "reaction", "atom", "molecule", "element", "acid", "base", "ph ", "neutralisation", "h₂o", "h2o", "co₂", "co2", "bond", "subscript"],
  "Computer Science": ["computer science", "python", "code", "algorithm", "loop", "iterable", "list", "complexity", "csv", "sorting", "program", "data structure", "range()"],
  Physics: ["physics", "newton", "force", "acceleration", "velocity", "energy", "pendulum", "friction", "motion", "kinetic", "gravitational", "f = ma", "m/s"],
  History: ["history", "revolution", "1789", "estate", "historical", "primary source", "provenance", "chronology", "sovereignty", "past events"],
  Writing: ["writing", "thesis", "essay", "argument", "claim", "evidence", "paragraph", "composition", "grammar", "corroboration"]
};

function suggestTags(text: string): string[] {
  if (!text) return [];
  const clean = text.toLowerCase().replace(/[#*_`]/g, " ").replace(/\s+/g, " ");
  const scores = Object.entries(KEYWORDS)
    .map(([topic, words]) => {
      const matches = words.reduce((total, word) => total + (clean.includes(word) ? 1 : 0), 0);
      return { topic, matches };
    })
    .filter(item => item.matches > 0)
    .sort((a, b) => b.matches - a.matches);

  if (scores.length === 0) return [];
  const topMatches = scores[0].matches;
  return scores
    .filter(item => item.matches >= Math.max(1, Math.ceil(topMatches * 0.32)))
    .map(item => item.topic);
}

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("notewise-authenticated") === "true";
  });
  const [email, setEmail] = useState("student@demo.com");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Notes & Filters State
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const stored = localStorage.getItem("notewise-notes-v1");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  // Note Selection and Active Topic
  // Only display notes for the selected subject (e.g. Algebra shows only Algebra notes).
  // Notes are filtered strictly by active topic.
  const [activeTopic, setActiveTopic] = useState<string | null>("Algebra"); // default to Algebra so user immediately sees topic notes, or can switch topics
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  // New Note Form State
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // Student Share & File Collaboration Modals
  const [shareNote, setShareNote] = useState<Note | null>(null);
  const [isCollaborationModalOpen, setIsCollaborationModalOpen] = useState(false);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1-Mark Quiz State
  const [quizFilterTopic, setQuizFilterTopic] = useState<string>("All");
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAttempts, setQuizAttempts] = useState(0);

  // Filtered Quiz Questions
  const filteredQuizQuestions = useMemo(() => {
    if (quizFilterTopic === "All") {
      return QUIZ_QUESTIONS;
    }
    return QUIZ_QUESTIONS.filter(q => q.topic.toLowerCase() === quizFilterTopic.toLowerCase());
  }, [quizFilterTopic]);

  const currentQuestion = filteredQuizQuestions[currentQuizIndex % filteredQuizQuestions.length] || QUIZ_QUESTIONS[0];

  // Save notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("notewise-notes-v1", JSON.stringify(notes));
    } catch (e) {
      console.error("Could not save to localStorage", e);
    }
  }, [notes]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() !== "student@demo.com" || password !== "learn123") {
      setLoginError("That demo email or password doesn't match. Try the credentials shown below.");
      return;
    }
    setLoginError("");
    setIsAuthenticated(true);
    sessionStorage.setItem("notewise-authenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("notewise-authenticated");
    setPassword("");
  };

  // Filtered Notes: ONLY show notes for the active topic!
  // If activeTopic is null, filteredNotes is empty (guaranteeing nothing is dumped until a topic is chosen)
  const filteredNotes = useMemo(() => {
    if (!activeTopic) return [];
    const q = searchQuery.trim().toLowerCase();
    return notes.filter(note => {
      const tags = note.tags || [];
      const matchesTopic = tags.includes(activeTopic);
      if (!matchesTopic) return false;
      if (!q) return true;
      const searchable = `${note.title || ""} ${note.body || ""} ${tags.join(" ")}`.toLowerCase();
      return searchable.includes(q);
    });
  }, [notes, searchQuery, activeTopic]);

  // Keep selectedId synchronized with visible list
  useEffect(() => {
    if (!isCreatingNote && activeTopic) {
      if (filteredNotes.length > 0 && !filteredNotes.some(n => n.id === selectedId)) {
        setSelectedId(filteredNotes[0].id);
      } else if (filteredNotes.length === 0) {
        setSelectedId(null);
      }
    } else if (!activeTopic) {
      setSelectedId(null);
    }
  }, [filteredNotes, selectedId, isCreatingNote, activeTopic]);

  const selectedNote = useMemo(() => {
    return notes.find(n => n.id === selectedId) || null;
  }, [notes, selectedId]);

  const handleSaveNewNote = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    const body = newBody.trim();
    if (!title || !body) return;

    const suggested = suggestTags(`${title}\n${body}`);
    const dateStr = new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date());

    const newNote: Note = {
      id: `note-${Date.now()}`,
      title,
      body,
      date: dateStr,
      tags: suggested.length > 0 ? suggested : (activeTopic ? [activeTopic] : ["General"])
    };

    setNotes(prev => [newNote, ...prev]);
    setIsCreatingNote(false);
    if (newNote.tags.length > 0) {
      setActiveTopic(newNote.tags[0]);
    }
    setSelectedId(newNote.id);
    setNewTitle("");
    setNewBody("");
    showToast("Note saved! Topic suggestions generated.");
  };

  const handleToggleTag = (tagName: string) => {
    if (!selectedNote) return;
    const currentTags = new Set(selectedNote.tags || []);
    if (currentTags.has(tagName)) {
      currentTags.delete(tagName);
    } else {
      currentTags.add(tagName);
    }

    const updatedTags = TOPICS.map(t => t.name).filter(name => currentTags.has(name));

    setNotes(prev =>
      prev.map(n =>
        n.id === selectedNote.id
          ? { ...n, tags: updatedTags, edited: true }
          : n
      )
    );
    showToast("Your topic correction is saved.");
  };

  const handleResetSuggestions = () => {
    if (!selectedNote) return;
    const restored = suggestTags(`${selectedNote.title}\n${selectedNote.body}`);
    setNotes(prev =>
      prev.map(n =>
        n.id === selectedNote.id
          ? { ...n, tags: restored, edited: false }
          : n
      )
    );
    showToast("Suggestions restored from keywords.");
  };

  // Student Note Sharing Utilities
  const handleCopyNoteContent = async (note: Note) => {
    const formatted = `# ${note.title}\nDate: ${note.date}\nTopics: ${(note.tags || []).join(", ") || "None"}\n\n${note.body}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedAction("copied");
      setTimeout(() => setCopiedAction(null), 2000);
      showToast("Note content copied to clipboard!");
    } catch {
      showToast("Could not copy to clipboard");
    }
  };

  const handleDownloadNoteFile = (note: Note, format: "md" | "txt") => {
    const header = format === "md"
      ? `# ${note.title}\n*Date: ${note.date}*\n*Topics: ${(note.tags || []).join(", ")}*\n\n---\n\n`
      : `${note.title.toUpperCase()}\nDate: ${note.date}\nTopics: ${(note.tags || []).join(", ")}\n========================================\n\n`;
    const content = header + note.body;
    const blob = new Blob([content], { type: format === "md" ? "text/markdown" : "text/plain" });
    const url = URL.createObjectURL(blob);
    const safeTitle = note.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30) || "note";
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeTitle}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded note as .${format} file!`);
  };

  const handleNativeShare = async (note: Note) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: note.title,
          text: `${note.title}\n\nTopics: ${(note.tags || []).join(", ")}\n\n${note.body}`,
          url: window.location.href
        });
        showToast("Note shared successfully!");
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyNoteContent(note);
    }
  };

  // Export All Notes for Classmates
  const handleExportAllNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notewise-study-notes-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded all notes as JSON file for student sharing!");
  };

  // Export Study Guide as Markdown
  const handleExportStudyGuide = () => {
    let guide = `# NoteWise Study Guide\n*Generated on ${new Date().toLocaleDateString()}*\n\n`;
    notes.forEach((n, idx) => {
      guide += `## ${idx + 1}. ${n.title}\n**Date:** ${n.date} | **Topics:** ${(n.tags || []).join(", ") || "General"}\n\n${n.body}\n\n---\n\n`;
    });
    const blob = new Blob([guide], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notewise-complete-study-guide.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported complete Study Guide (.md)!");
  };

  // Import Notes File from Peer / Classmate
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title && parsed[0].body) {
          const existingIds = new Set(notes.map(n => n.id));
          const newItems: Note[] = [];
          parsed.forEach((item: Partial<Note>, idx: number) => {
            const id = item.id && !existingIds.has(item.id) ? item.id : `imported-${Date.now()}-${idx}`;
            newItems.push({
              id,
              title: item.title || "Untitled Note",
              body: item.body || "",
              date: item.date || new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date()),
              tags: Array.isArray(item.tags) ? item.tags : suggestTags(`${item.title}\n${item.body}`),
              edited: item.edited ?? false
            });
          });

          setNotes(prev => [...newItems, ...prev]);
          if (newItems[0]?.tags?.[0]) {
            setActiveTopic(newItems[0].tags[0]);
          }
          setSelectedId(newItems[0]?.id || selectedId);
          setIsCollaborationModalOpen(false);
          showToast(`Successfully imported ${newItems.length} notes from student file!`);
        } else {
          showToast("Invalid note file format. Please upload a NoteWise JSON file.");
        }
      } catch {
        showToast("Error reading file. Please check the file contents.");
      }
    };
    reader.readAsText(file);
    if (event.target) event.target.value = "";
  };

  const getTopicSymbol = (topicName: string): string => {
    const found = TOPICS.find(t => t.name === topicName);
    return found?.symbol ?? "📌";
  };

  // Quiz Handling
  const handleSelectQuizAnswer = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(index);
    setIsAnswerSubmitted(true);
    setQuizAttempts(prev => prev + 1);
    if (index === currentQuestion.correctIndex) {
      setQuizScore(prev => prev + 1);
      showToast("Correct answer! +1 Mark 🎉");
    } else {
      showToast("Not quite right. Check the explanation below.");
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setCurrentQuizIndex(prev => (prev + 1) % filteredQuizQuestions.length);
  };

  const handleResetQuiz = () => {
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setQuizAttempts(0);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <section id="login-screen" className="login-screen">
        <div className="login-brand">
          <span className="brand-mark">N</span>
          <span>NoteWise</span>
        </div>
        <main className="login-card">
          <div className="eyebrow">YOUR STUDY SPACE</div>
          <h1>Find the thread<br />in your notes.</h1>
          <p className="login-intro">Helpful topic suggestions, always under your control.</p>
          <form id="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter the demo password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            {loginError && (
              <p id="login-error" className="login-error" role="alert" aria-live="polite">
                {loginError}
              </p>
            )}
            <button className="primary-button login-button" type="submit">
              <span>Sign in</span>
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="demo-hint">
            <span className="hint-icon">i</span>
            <div>
              <strong>Demo access</strong>
              <br />
              Use <code>student@demo.com</code> / <code>learn123</code>
            </div>
          </div>
          <p className="local-notice">Demo only · sign-in is checked in this browser and does not protect real data.</p>
        </main>
        <footer className="login-footer">A student capstone prototype · Your edits stay on this device</footer>
      </section>
    );
  }

  // Authenticated Main Workspace Screen
  return (
    <div id="app-screen" className="app-screen">
      {/* Sidebar */}
      <aside className="sidebar">
        <a className="sidebar-brand" href="#" aria-label="NoteWise home">
          <span className="brand-mark">N</span>
          <span>NoteWise</span>
        </a>

        <div className="workspace-label">WORKSPACE</div>
        
        {/* Dedicated Student Collaboration Navigation Item with Separate Icon */}
        <button
          className="nav-item"
          id="nav-collaboration"
          onClick={() => setIsCollaborationModalOpen(true)}
          style={{ background: "#f8f7ff", border: "1px solid #e7e4fb", marginBottom: "6px" }}
          title="Student Study Collaboration & File Exchange"
        >
          <span className="nav-icon" style={{ color: "#6758d8" }}>
            <Users size={16} />
          </span>
          <span style={{ fontWeight: 600, color: "#4f41be" }}>Student Collaboration</span>
          <span className="nav-count" style={{ background: "#ece8ff", color: "#6758d8" }}>Share</span>
        </button>

        {/* 1-Mark Quiz Navigation Item */}
        <button
          className="nav-item"
          id="nav-quiz"
          onClick={() => {
            const el = document.getElementById("quiz-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          style={{ marginBottom: "6px" }}
          title="Take 1-Mark Study Quiz"
        >
          <span className="nav-icon" style={{ color: "#e39a48" }}>
            <Award size={16} />
          </span>
          <span>1-Mark Knowledge Quiz</span>
          <span className="nav-count">{QUIZ_QUESTIONS.length} Qs</span>
        </button>

        <div className="sidebar-section">
          <div className="workspace-label">TOPICS</div>
          <div id="topic-list" className="topic-list">
            {TOPICS.map(topic => {
              const count = notes.filter(n => (n.tags || []).includes(topic.name)).length;
              const isSelected = activeTopic === topic.name;
              return (
                <button
                  key={topic.name}
                  className={`topic-button ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setIsCreatingNote(false);
                    setActiveTopic(topic.name);
                    setQuizFilterTopic(topic.name);
                  }}
                  title={topic.description}
                >
                  <span className="topic-symbol">{topic.symbol}</span>
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {topic.name}
                  </span>
                  <span className="nav-count" style={{ fontSize: "10px" }}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="privacy-card">
            <span style={{ fontSize: "14px" }}>✦</span>
            <div>
              <strong>Your notes, your call</strong>
              <p>Tags are suggestions. Your edits always win.</p>
            </div>
          </div>
          <button id="logout-button" className="logout-button" onClick={handleLogout}>
            <LogOut size={13} className="nav-icon" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="main-area">
        {/* Topbar */}
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>{activeTopic ? `${getTopicSymbol(activeTopic)} ${activeTopic}` : "Select a Subject"}</strong>
          </div>
          <div className="topbar-right">
            <button
              className="action-pill-btn"
              onClick={() => setIsCollaborationModalOpen(true)}
              style={{ fontSize: "11px", padding: "5px 11px" }}
            >
              <Users size={13} />
              <span>Student Share</span>
            </button>
            <span className="saved-status">
              <i></i> Saved locally
            </span>
            <div className="avatar">S</div>
            <span className="user-name">Student</span>
          </div>
        </header>

        {/* Content */}
        <section className="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">YOUR STUDY LIBRARY</div>
              <h1>Study notes</h1>
              <p>Select any subject on top to instantly open its specific study notes.</p>
            </div>
            <div className="page-heading-actions">
              <button
                id="new-note-button"
                className="primary-button"
                onClick={() => {
                  setIsCreatingNote(true);
                  setSelectedId(null);
                }}
              >
                <Plus size={16} />
                <span>New note</span>
              </button>
            </div>
          </div>

          {/* Topic Selector prominently at the TOP */}
          {/* Selecting a subject displays only the notes for that subject */}
          <div className="top-topic-bar-container">
            <div className="top-topic-header">
              <h2>
                <Layers size={16} style={{ color: "var(--purple)" }} />
                <span>Select Subject:</span>
              </h2>
              <span className="top-topic-hint">
                {activeTopic
                  ? `Showing notes for ${getTopicSymbol(activeTopic)} ${activeTopic} only`
                  : "Click any subject to display its notes"}
              </span>
            </div>
            <div className="top-topics-grid">
              {TOPICS.map(topic => {
                const count = notes.filter(n => (n.tags || []).includes(topic.name)).length;
                const isActive = activeTopic === topic.name;
                return (
                  <button
                    key={topic.name}
                    className={`topic-top-card ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setIsCreatingNote(false);
                      setActiveTopic(topic.name);
                      setQuizFilterTopic(topic.name);
                    }}
                  >
                    <span className="topic-top-symbol">{topic.symbol}</span>
                    <div className="topic-top-info">
                      <span className="topic-top-name">{topic.name}</span>
                      <span className="topic-top-count">{count} {count === 1 ? "note" : "notes"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-icon icon-violet"><BookOpen size={18} /></span>
              <div>
                <strong id="total-stat">{filteredNotes.length}</strong>
                <span>{activeTopic ? `${activeTopic} notes` : "Selected notes"}</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon icon-green"><Sparkles size={18} /></span>
              <div>
                <strong id="tagged-stat">{notes.length}</strong>
                <span>Total library notes</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon icon-amber">✎</span>
              <div>
                <strong id="edited-stat">{notes.filter(n => n.edited).length}</strong>
                <span>Your corrections</span>
              </div>
            </div>
          </div>

          {/* Main Library Layout */}
          {!activeTopic ? (
            <div className="select-topic-prompt">
              <span className="select-topic-prompt-icon">👆</span>
              <h3>Choose a Subject to View Notes</h3>
              <p>
                To keep your study space clean and focused, select any subject from the cards above (such as 📐 Algebra or 🧬 Biology).
              </p>
              <div className="prompt-topic-chips">
                {TOPICS.map(t => (
                  <button
                    key={t.name}
                    className="prompt-topic-chip"
                    onClick={() => setActiveTopic(t.name)}
                  >
                    <span>{t.symbol}</span>
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="library-layout">
              {/* Notes List Panel */}
              <section className="notes-panel">
                <div className="list-heading">
                  <h2>
                    <span>{getTopicSymbol(activeTopic)}</span> {activeTopic} Notes{" "}
                    <span id="result-count">({filteredNotes.length})</span>
                  </h2>
                  <p>Displaying only {activeTopic} notes. Search or select below to read.</p>
                </div>

                <div className="search-row">
                  <label className="search-box">
                    <span><Search size={16} /></span>
                    <input
                      id="search-input"
                      type="search"
                      placeholder={`Search in ${activeTopic} notes…`}
                      aria-label="Search notes"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </label>
                  {searchQuery && (
                    <button
                      id="clear-filter"
                      className="clear-filter"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear
                    </button>
                  )}
                </div>

                {filteredNotes.length === 0 ? (
                  <div id="empty-state" className="empty-state">
                    <span><Compass size={32} /></span>
                    <strong>No {activeTopic} notes found</strong>
                    <p>Try clearing your search query or add a new note under this topic.</p>
                  </div>
                ) : (
                  <div id="notes-list" className="notes-list">
                    {filteredNotes.map(note => {
                      const isSelected = selectedId === note.id && !isCreatingNote;
                      const tags = note.tags || [];
                      return (
                        <button
                          key={note.id}
                          className={`note-row ${isSelected ? "selected" : ""}`}
                          onClick={() => {
                            setIsCreatingNote(false);
                            setSelectedId(note.id);
                          }}
                        >
                          <span className="note-type">
                            <BookOpen size={15} />
                          </span>
                          <span className="note-row-body">
                            <span className="note-row-title">
                              {note.title}
                              {note.edited && (
                                <span className="edited-mark" title="Manually corrected">✎</span>
                              )}
                            </span>
                            <span className="note-row-preview">
                              {(note.body || "").replace(/\s+/g, " ").slice(0, 110)}
                            </span>
                            <span className="note-row-meta">
                              {tags.slice(0, 2).map(tag => (
                                <span key={tag} className="tag">
                                  <span>{getTopicSymbol(tag)}</span>
                                  <span>{tag}</span>
                                </span>
                              ))}
                              {tags.length > 2 && (
                                <span className="tag more">+{tags.length - 2}</span>
                              )}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Note Detail Panel / New Note Form */}
              <aside className="detail-panel">
                {isCreatingNote ? (
                  <div className="new-note-container">
                    <div className="eyebrow">ADD TO YOUR LIBRARY</div>
                    <h2>New note</h2>
                    <form id="new-note-form" className="new-note-form" onSubmit={handleSaveNewNote}>
                      <label htmlFor="new-title">Note title</label>
                      <input
                        id="new-title"
                        maxLength={100}
                        placeholder="e.g. Introduction to vectors and matrices"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        required
                      />
                      <label htmlFor="new-body">Note content</label>
                      <textarea
                        id="new-body"
                        maxLength={5000}
                        placeholder="Paste or write your study notes here…"
                        value={newBody}
                        onChange={e => setNewBody(e.target.value)}
                        required
                      />
                      <p className="suggestion-copy">
                        Topic suggestions will automatically be extracted from your title and note content. You can review and correct them next.
                      </p>
                      <div className="detail-actions">
                        <button className="primary-button" type="submit">
                          <Check size={14} />
                          <span>Save note</span>
                        </button>
                        <button
                          className="secondary-button"
                          id="cancel-note"
                          type="button"
                          onClick={() => {
                            setIsCreatingNote(false);
                            setSelectedId(filteredNotes[0]?.id || null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                ) : selectedNote ? (
                  <div id="note-detail" className="note-detail">
                    <div className="note-detail-header">
                      <div>
                        <div className="eyebrow">NOTE DETAILS</div>
                        <h2>{selectedNote.title}</h2>
                      </div>
                      <button
                        className="secondary-button share-button"
                        onClick={() => setShareNote(selectedNote)}
                        title="Share this note with a classmate or download file"
                      >
                        <Share2 size={13} />
                        <span>Share note</span>
                      </button>
                    </div>

                    <div className="detail-meta">
                      Added {selectedNote.date} · {selectedNote.body.trim() ? selectedNote.body.trim().split(/\s+/).length : 0} words
                    </div>

                    <div className="detail-body">
                      {selectedNote.body}
                    </div>

                    <div className="detail-section">
                      <div className="detail-section-head">
                        <h3>
                          <span>Topics</span>
                          {selectedNote.edited && (
                            <span className="manual-badge">
                              <CheckCircle2 size={11} /> Your correction
                            </span>
                          )}
                        </h3>
                        <span>{(selectedNote.tags || []).length} selected</span>
                      </div>

                      <div className="tag-editor">
                        {TOPICS.map(topic => {
                          const isTagSelected = (selectedNote.tags || []).includes(topic.name);
                          return (
                            <button
                              key={topic.name}
                              className={`tag-choice ${isTagSelected ? "active" : ""}`}
                              onClick={() => handleToggleTag(topic.name)}
                              aria-pressed={isTagSelected}
                            >
                              <span>{topic.symbol}</span>
                              <span>{isTagSelected ? "✓ " : "+ "}{topic.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      <p className="suggestion-copy">
                        {selectedNote.edited ? (
                          "Your selected topics override suggestions. Change them any time."
                        ) : (
                          (() => {
                            const suggested = suggestTags(`${selectedNote.title}\n${selectedNote.body}`);
                            return `Suggested by keyword baseline: ${
                              suggested.length ? suggested.map(t => `${getTopicSymbol(t)} ${t}`).join(", ") : "no confident match"
                            }. Select or remove topics to correct suggestions.`;
                          })()
                        )}
                      </p>
                    </div>

                    <div className="detail-actions">
                      <button
                        className="secondary-button"
                        id="reset-tags"
                        onClick={handleResetSuggestions}
                        title="Reset manual tags to baseline suggestions"
                      >
                        <RotateCcw size={13} />
                        <span>Reset to suggestions</span>
                      </button>
                      <button
                        className="secondary-button"
                        onClick={() => handleDownloadNoteFile(selectedNote, "md")}
                        title="Download as .md file"
                      >
                        <Download size={13} />
                        <span>Save as .md</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div id="detail-empty" className="detail-empty">
                    <span className="detail-empty-icon">↖</span>
                    <strong>Select a note</strong>
                    <p>Choose a note from the left to review its suggested topics and make corrections.</p>
                  </div>
                )}
              </aside>
            </div>
          )}

          {/* 1-Mark Knowledge Quiz Section at the Bottom */}
          {/* Quick single-mark assessment based on the student's study notes */}
          <div id="quiz-section" className="quiz-container">
            <div className="quiz-header">
              <div className="quiz-title-area">
                <div className="quiz-badge-icon">
                  <Award size={22} />
                </div>
                <div className="quiz-header-text">
                  <h3>1-Mark Knowledge Quiz · Self Assessment</h3>
                  <p>Test your understanding with instant 1-mark single choice questions based on your notes.</p>
                </div>
              </div>
              <div className="quiz-score-pill">
                <span>Score:</span>
                <strong>{quizScore} / {quizAttempts}</strong>
                {quizAttempts > 0 && (
                  <span style={{ color: "#15805d", fontSize: "11px" }}>
                    ({Math.round((quizScore / quizAttempts) * 100)}%)
                  </span>
                )}
              </div>
            </div>

            <div className="quiz-topic-nav" style={{ marginBottom: "14px" }}>
              <button
                className={`quiz-filter-chip ${quizFilterTopic === "All" ? "active" : ""}`}
                onClick={() => {
                  setQuizFilterTopic("All");
                  handleResetQuiz();
                }}
              >
                All Subjects ({QUIZ_QUESTIONS.length})
              </button>
              {TOPICS.map(t => (
                <button
                  key={t.name}
                  className={`quiz-filter-chip ${quizFilterTopic.toLowerCase() === t.name.toLowerCase() ? "active" : ""}`}
                  onClick={() => {
                    setQuizFilterTopic(t.name);
                    handleResetQuiz();
                  }}
                >
                  {t.symbol} {t.name}
                </button>
              ))}
            </div>

            <div className="quiz-card">
              <div className="quiz-meta-bar">
                <span className="quiz-question-tag">
                  {getTopicSymbol(currentQuestion.topic)} {currentQuestion.topic}
                </span>
                <span className="quiz-mark-label">1 MARK QUESTION</span>
                <span style={{ color: "#7a7e8e" }}>
                  Question {(currentQuizIndex % filteredQuizQuestions.length) + 1} of {filteredQuizQuestions.length}
                </span>
              </div>

              <div className="quiz-question-text">
                {currentQuestion.question}
              </div>

              <div className="quiz-options-list">
                {currentQuestion.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  let btnClass = "quiz-option-button";
                  if (isAnswerSubmitted) {
                    if (idx === currentQuestion.correctIndex) {
                      btnClass += " correct";
                    } else if (idx === selectedAnswerIndex) {
                      btnClass += " wrong";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      className={btnClass}
                      onClick={() => handleSelectQuizAnswer(idx)}
                      disabled={isAnswerSubmitted}
                    >
                      <span className="quiz-option-key">{letter}</span>
                      <span>{option}</span>
                      {isAnswerSubmitted && idx === currentQuestion.correctIndex && (
                        <CheckCircle size={16} style={{ marginLeft: "auto", color: "#15805d" }} />
                      )}
                      {isAnswerSubmitted && idx === selectedAnswerIndex && idx !== currentQuestion.correctIndex && (
                        <XCircle size={16} style={{ marginLeft: "auto", color: "#d32f2f" }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswerSubmitted && (
                <div className={`quiz-feedback-box ${selectedAnswerIndex === currentQuestion.correctIndex ? "correct" : "wrong"}`}>
                  <Lightbulb size={18} style={{ flex: "none", marginTop: "2px" }} />
                  <div>
                    <strong>
                      {selectedAnswerIndex === currentQuestion.correctIndex
                        ? "Correct! Well done (+1 Mark)"
                        : "Incorrect answer."}
                    </strong>
                    <div style={{ marginTop: "4px" }}>{currentQuestion.explanation}</div>
                  </div>
                </div>
              )}

              <div className="quiz-footer-actions">
                <button
                  className="secondary-button"
                  onClick={handleResetQuiz}
                  style={{ fontSize: "11px" }}
                >
                  <RotateCcw size={12} />
                  <span>Restart Quiz</span>
                </button>

                {isAnswerSubmitted && (
                  <button
                    className="primary-button"
                    onClick={handleNextQuizQuestion}
                    style={{ fontSize: "11px" }}
                  >
                    <span>Next Question</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* App Footer */}
          <footer className="app-footer">
            <span>
              Suggestions are a starting point—not a verdict. <strong>Your choices take precedence.</strong>
            </span>
            <span>NoteWise Student Prototype · local demo data</span>
          </footer>
        </section>
      </main>

      {/* Student Collaboration Hub Modal (Accessible via separate icon) */}
      {isCollaborationModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsCollaborationModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: "540px" }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <Users size={18} style={{ color: "var(--purple)" }} />
                <span>Student Collaboration Hub</span>
              </h3>
              <button className="modal-close-btn" onClick={() => setIsCollaborationModalOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "12.5px", color: "#616576", margin: "0 0 16px", lineHeight: "1.5" }}>
                Share your study notes with classmates, download markdown study guides, or import notes shared by fellow students.
              </p>

              <div className="modal-share-grid">
                <button
                  className="share-action-card"
                  onClick={handleExportStudyGuide}
                >
                  <strong>
                    <FileDown size={15} style={{ color: "#6758d8" }} />
                    Complete Study Guide (.md)
                  </strong>
                  <span>Download all your study notes compiled into one printable markdown guide.</span>
                </button>

                <button
                  className="share-action-card"
                  onClick={handleExportAllNotes}
                >
                  <strong>
                    <Download size={15} style={{ color: "#15805d" }} />
                    Export Notes Package (.json)
                  </strong>
                  <span>Export your entire notes collection so classmates can import it.</span>
                </button>

                <label
                  className="share-action-card"
                  style={{ cursor: "pointer", margin: 0 }}
                >
                  <strong>
                    <Upload size={15} style={{ color: "#e39a48" }} />
                    Import Peer Notes File (.json)
                  </strong>
                  <span>Load notes files received from study partners into your library.</span>
                  <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    onChange={handleFileImport}
                    style={{ display: "none" }}
                  />
                </label>

                <button
                  className="share-action-card"
                  onClick={() => {
                    const sample = notes.slice(0, 3).map(n => `• ${n.title} (${(n.tags || []).join(", ")})`).join("\n");
                    navigator.clipboard.writeText(`NoteWise Study Library (${notes.length} notes):\n${sample}\n\nStudy effectively with NoteWise!`);
                    showToast("Study summary copied to clipboard!");
                  }}
                >
                  <strong>
                    <Copy size={15} style={{ color: "#4f87d9" }} />
                    Copy Summary to Clipboard
                  </strong>
                  <span>Copy a quick summary of your study topics to send via WhatsApp or Discord.</span>
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-button" onClick={() => setIsCollaborationModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Single Note Modal */}
      {shareNote && (
        <div className="modal-backdrop" onClick={() => setShareNote(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <Share2 size={16} />
                <span>Share Note with Classmates</span>
              </h3>
              <button className="modal-close-btn" onClick={() => setShareNote(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-preview-box">
                {`# ${shareNote.title}\nDate: ${shareNote.date}\nTopics: ${(shareNote.tags || []).join(", ")}\n\n${shareNote.body.slice(0, 220)}${shareNote.body.length > 220 ? "..." : ""}`}
              </div>
              <div className="modal-share-grid">
                <button
                  className="share-action-card"
                  onClick={() => handleCopyNoteContent(shareNote)}
                >
                  <strong>
                    {copiedAction === "copied" ? <Check size={14} color="#15805d" /> : <Copy size={14} />}
                    {copiedAction === "copied" ? "Copied!" : "Copy to Clipboard"}
                  </strong>
                  <span>Formatted text ready to paste in WhatsApp, Discord, or Docs</span>
                </button>

                <button
                  className="share-action-card"
                  onClick={() => handleDownloadNoteFile(shareNote, "md")}
                >
                  <strong>
                    <FileText size={14} />
                    Download Markdown (.md)
                  </strong>
                  <span>Formatted note file for Obsidian, Notion, or text editors</span>
                </button>

                <button
                  className="share-action-card"
                  onClick={() => handleDownloadNoteFile(shareNote, "txt")}
                >
                  <strong>
                    <Download size={14} />
                    Download Plain Text (.txt)
                  </strong>
                  <span>Standard lightweight text file to share with any peer</span>
                </button>

                <button
                  className="share-action-card"
                  onClick={() => handleNativeShare(shareNote)}
                >
                  <strong>
                    <Share2 size={14} />
                    System Share Sheet
                  </strong>
                  <span>Send directly via AirDrop, Email, Messaging or Nearby Share</span>
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-button" onClick={() => setShareNote(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div
        id="toast"
        className={`toast ${toastMessage ? "show" : ""}`}
        role="status"
        aria-live="polite"
      >
        <Check size={15} color="#36a77a" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
