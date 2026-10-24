const TOPICS = [
  { name: "Algebra", color: "#8c7ae6", description: "Equations, functions, variables, and mathematical relationships." },
  { name: "Biology", color: "#36a77a", description: "Living organisms, cells, genetics, ecology, and life processes." },
  { name: "Chemistry", color: "#e39a48", description: "Elements, reactions, bonding, matter, and chemical calculations." },
  { name: "Computer Science", color: "#4f87d9", description: "Programming, algorithms, data structures, and computing systems." },
  { name: "Physics", color: "#d56a83", description: "Motion, forces, energy, waves, and physical laws." },
  { name: "History", color: "#ae8054", description: "Past events, societies, chronology, and historical interpretation." },
  { name: "Writing", color: "#3a9ca3", description: "Composition, argument, grammar, and writing techniques." }
];

const INITIAL_NOTES = [
  { id: "n1", title: "Linear equations: balancing both sides", date: "Oct 18, 2026", body: "ALGEBRA — Linear equations\n\nAn equation stays balanced when the same operation is applied to both sides.\n\nExample: 3x + 5 = 20\nSubtract 5: 3x = 15\nDivide by 3: x = 5\n\nCheck by substitution: 3(5) + 5 = 20.", tags: ["Algebra"] },
  { id: "n2", title: "Cell membranes and transport", date: "Oct 16, 2026", body: "BIOLOGY — Cell membrane\n\nThe phospholipid bilayer is selectively permeable. Diffusion moves particles down a concentration gradient. Osmosis is the diffusion of water across a partially permeable membrane.\n\nActive transport uses ATP to move substances against a concentration gradient.", tags: ["Biology"] },
  { id: "n3", title: "Balancing chemical equations", date: "Oct 14, 2026", body: "CHEMISTRY — Conservation of mass\n\nAtoms are conserved in a chemical reaction. Balance coefficients rather than changing subscripts.\n\n2H₂ + O₂ → 2H₂O\n\nThe coefficient 2 means two molecules of hydrogen; the subscript belongs to the molecule.", tags: ["Chemistry"] },
  { id: "n4", title: "Python loops and list iteration", date: "Oct 12, 2026", body: "COMPUTER SCIENCE — Iteration\n\nfor item in items:\n    print(item)\n\nA for loop visits each element in an iterable. A while loop repeats while its condition evaluates to True. Watch for off-by-one errors in range().", tags: ["Computer Science"] },
  { id: "n5", title: "Newton's second law in practice", date: "Oct 10, 2026", body: "PHYSICS — Forces\n\nNewton's second law: F = ma. The net force on an object equals its mass multiplied by its acceleration. SI units: force in newtons (N), mass in kilograms (kg), acceleration in m/s².\n\nIf m = 2 kg and a = 3 m/s², then F = 6 N.", tags: ["Physics", "Algebra"] },
  { id: "n6", title: "The causes of the French Revolution", date: "Oct 8, 2026", body: "HISTORY — 1789\n\nKey contributing factors included social inequality among the three estates, financial crisis and state debt, poor harvests, and Enlightenment ideas about popular sovereignty.\n\nThese causes interacted; no single factor alone explains the revolution.", tags: ["History"] },
  { id: "n7", title: "Building a clear thesis statement", date: "Oct 6, 2026", body: "WRITING — Argument structure\n\nA strong thesis makes a specific, arguable claim and previews the reasoning. Avoid a topic-only statement.\n\nTopic: renewable energy\nWeak: This essay is about solar power.\nStronger: Because it reduces operational emissions, solar power should be prioritised in new public buildings.", tags: ["Writing"] },
  { id: "n8", title: "Quadratic graphs and the vertex", date: "Oct 4, 2026", body: "ALGEBRA — Quadratic functions\n\nFor y = a(x - h)² + k, the vertex is (h, k) and the axis of symmetry is x = h. When a is positive the parabola opens upward; when negative it opens downward.", tags: ["Algebra"] },
  { id: "n9", title: "DNA, genes, and inheritance", date: "Oct 2, 2026", body: "BIOLOGY — Genetics\n\nDNA stores inherited information. A gene is a section of DNA. Alleles are alternative forms of a gene. Genotype describes alleles; phenotype describes observable traits.", tags: ["Biology"] },
  { id: "n10", title: "Sorting algorithm comparison", date: "Sep 29, 2026", body: "COMPUTER SCIENCE — Algorithms\n\nBubble sort repeatedly swaps adjacent out-of-order values; its average time complexity is O(n²). Merge sort splits, sorts, and merges; its time complexity is O(n log n) with O(n) extra space.", tags: ["Computer Science", "Algebra"] },
  { id: "n11", title: "Energy conservation and pendulums", date: "Sep 26, 2026", body: "PHYSICS — Energy transfer\n\nAt the top of a swing, gravitational potential energy is greatest. As the pendulum descends, energy transfers into kinetic energy. In an ideal system total mechanical energy is conserved; friction transfers some energy to heat.", tags: ["Physics"] },
  { id: "n12", title: "Sources and evidence in history essays", date: "Sep 23, 2026", body: "HISTORY + WRITING\n\nUse provenance, context, and corroboration to assess a primary source. In an essay, make a claim, support it with evidence, and explain how that evidence answers the question.", tags: ["History", "Writing"] },
  { id: "n13", title: "Acids, bases, and pH", date: "Sep 20, 2026", body: "CHEMISTRY — Acids\n\nThe pH scale indicates acidity. A solution with pH below 7 is acidic; above 7 is basic. Neutralisation between an acid and a base can form salt and water.\n\nHCl + NaOH → NaCl + H₂O", tags: ["Chemistry"] },
  { id: "n14", title: "Short scratch note", date: "Sep 18, 2026", body: "F = ma. Check units.", tags: ["Physics", "Algebra"] },
  { id: "n15", title: "Code lab: parsing CSV rows", date: "Sep 15, 2026", body: "import csv\n\nwith open('scores.csv', newline='') as file:\n    for row in csv.DictReader(file):\n        print(row['student_id'], row['score'])\n\nA CSV parser handles quoted fields more reliably than splitting on commas.", tags: ["Computer Science"] },
  { id: "n16", title: "Photosynthesis overview", date: "Sep 12, 2026", body: "BIOLOGY — Photosynthesis\n\nChlorophyll in chloroplasts captures light energy. Carbon dioxide and water are converted into glucose and oxygen.\n\n6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", tags: ["Biology", "Chemistry"] }
];

const KEYWORDS = {
  Algebra: ["algebra", "equation", "variable", "function", "quadratic", "parabola", "vertex", "coefficient", "x =", "graph", "ratio", "solve", "polynomial", "f = ma"],
  Biology: ["biology", "cell", "membrane", "dna", "gene", "allele", "genetics", "organism", "photosynthesis", "chloroplast", "osmosis", "diffusion", "phospholipid", "ecology"],
  Chemistry: ["chemistry", "chemical", "reaction", "atom", "molecule", "element", "acid", "base", "ph ", "neutralisation", "h₂o", "h2o", "co₂", "co2", "bond", "subscript"],
  "Computer Science": ["computer science", "python", "code", "algorithm", "loop", "iterable", "list", "complexity", "csv", "sorting", "program", "data structure", "range()"],
  Physics: ["physics", "newton", "force", "acceleration", "velocity", "energy", "pendulum", "friction", "motion", "kinetic", "gravitational", "f = ma", "m/s"],
  History: ["history", "revolution", "1789", "estate", "historical", "primary source", "provenance", "chronology", "sovereignty", "past events"],
  Writing: ["writing", "thesis", "essay", "argument", "claim", "evidence", "paragraph", "composition", "grammar", "corroboration"]
};

let notes = loadNotes();
let selectedId = notes[0]?.id ?? null;
let activeTopic = null;
let isCreatingNote = false;
let toastTimer;

function loadNotes() {
  try {
    const stored = localStorage.getItem("notewise-notes-v1");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    return JSON.parse(JSON.stringify(INITIAL_NOTES));
  } catch (error) {
    console.error("Could not load saved notes:", error);
    return JSON.parse(JSON.stringify(INITIAL_NOTES));
  }
}

function saveNotes() {
  try {
    localStorage.setItem("notewise-notes-v1", JSON.stringify(notes));
    const savedStatus = document.querySelector(".saved-status");
    if (savedStatus) {
      savedStatus.innerHTML = "<i></i> Saved locally";
    }
  } catch (error) {
    console.error("Could not save notes:", error);
    showToast("Could not save changes in this browser.");
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function suggestTags(text) {
  if (!text) return [];
  const clean = text.toLowerCase().replace(/[#*_`]/g, " ").replace(/\s+/g, " ");
  const scores = Object.entries(KEYWORDS).map(([topic, words]) => {
    const matches = words.reduce((total, word) => total + (clean.includes(word) ? 1 : 0), 0);
    return { topic, matches };
  }).filter(item => item.matches > 0).sort((a, b) => b.matches - a.matches);
  
  if (scores.length === 0) return [];
  const topMatches = scores[0].matches;
  return scores.filter(item => item.matches >= Math.max(1, Math.ceil(topMatches * 0.32))).map(item => item.topic);
}

function orderedTopics() {
  return [...TOPICS].sort((a, b) => a.name.localeCompare(b.name));
}

function renderTopics() {
  const container = document.getElementById("topic-list");
  if (!container) return;
  container.innerHTML = orderedTopics().map(topic => `
    <button class="topic-button ${activeTopic === topic.name ? "selected" : ""}" data-topic="${escapeHtml(topic.name)}">
      <span class="topic-dot" style="background:${topic.color}"></span>${escapeHtml(topic.name)}
    </button>`).join("");
  container.querySelectorAll(".topic-button").forEach(button => button.addEventListener("click", () => {
    isCreatingNote = false;
    activeTopic = activeTopic === button.dataset.topic ? null : button.dataset.topic;
    renderAll();
  }));
}

function filteredNotes() {
  const searchInput = document.getElementById("search-input");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  return notes.filter(note => {
    const noteTags = note.tags || [];
    const searchable = `${note.title || ""} ${note.body || ""} ${noteTags.join(" ")}`.toLowerCase();
    return (!query || searchable.includes(query)) && (!activeTopic || noteTags.includes(activeTopic));
  });
}

function renderNotes() {
  const filtered = filteredNotes();
  const resultCount = document.getElementById("result-count");
  if (resultCount) resultCount.textContent = `(${filtered.length})`;

  const navCount = document.getElementById("nav-count");
  if (navCount) navCount.textContent = notes.length;

  const clearFilter = document.getElementById("clear-filter");
  if (clearFilter) clearFilter.classList.toggle("hidden", !activeTopic);

  const activeFilter = document.getElementById("active-filter");
  if (activeFilter) {
    activeFilter.classList.toggle("hidden", !activeTopic);
    activeFilter.innerHTML = activeTopic ? `Filtering by <span class="filter-pill">${escapeHtml(activeTopic)}</span>` : "";
  }

  const emptyState = document.getElementById("empty-state");
  if (emptyState) emptyState.classList.toggle("hidden", filtered.length > 0);

  const navNotes = document.getElementById("nav-notes");
  if (navNotes) navNotes.classList.toggle("active", !activeTopic);

  if (!isCreatingNote) {
    if (filtered.length > 0 && !filtered.some(note => note.id === selectedId)) {
      selectedId = filtered[0].id;
    } else if (filtered.length === 0) {
      selectedId = null;
    }
  }

  const notesList = document.getElementById("notes-list");
  if (!notesList) return;

  notesList.innerHTML = filtered.map(note => {
    const tags = note.tags || [];
    return `
    <button class="note-row ${selectedId === note.id && !isCreatingNote ? "selected" : ""}" data-id="${escapeHtml(note.id)}">
      <span class="note-type">▤</span><span class="note-row-body">
        <span class="note-row-title">${escapeHtml(note.title)}${note.edited ? '<span class="edited-mark" title="Manually corrected">✎</span>' : ""}</span>
        <span class="note-row-preview">${escapeHtml((note.body || "").replace(/\s+/g, " ").slice(0, 100))}</span>
        <span class="note-row-meta">${tags.slice(0, 2).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}${tags.length > 2 ? `<span class="tag more">+${tags.length - 2}</span>` : ""}</span>
      </span>
    </button>`;
  }).join("");

  notesList.querySelectorAll(".note-row").forEach(button => button.addEventListener("click", () => {
    isCreatingNote = false;
    selectedId = button.dataset.id;
    renderAll();
  }));
}

function renderDetail() {
  const detail = document.getElementById("note-detail");
  const empty = document.getElementById("detail-empty");
  if (!detail || !empty) return;

  if (isCreatingNote) {
    return;
  }

  const note = notes.find(item => item.id === selectedId);
  if (!note) {
    detail.classList.add("hidden");
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  detail.classList.remove("hidden");

  const noteTags = note.tags || [];
  const suggested = suggestTags(`${note.title}\n${note.body}`);
  const wordCount = note.body?.trim() ? note.body.trim().split(/\s+/).length : 0;

  detail.innerHTML = `
    <div class="eyebrow">NOTE DETAILS</div><h2>${escapeHtml(note.title)}</h2>
    <div class="detail-meta">Added ${escapeHtml(note.date)} · ${wordCount} words</div>
    <div class="detail-body">${escapeHtml(note.body)}</div>
    <div class="detail-section">
      <div class="detail-section-head"><h3>Topics <span class="manual-badge">${note.edited ? "✓ Your correction" : ""}</span></h3><span>${noteTags.length} selected</span></div>
      <div class="tag-editor">${orderedTopics().map(topic => `<button class="tag-choice ${noteTags.includes(topic.name) ? "active" : ""}" data-tag="${escapeHtml(topic.name)}" aria-pressed="${noteTags.includes(topic.name)}">${noteTags.includes(topic.name) ? "✓ " : "+ "}${escapeHtml(topic.name)}</button>`).join("")}</div>
      <p class="suggestion-copy">${note.edited ? "Your selected topics override suggestions. Change them any time." : `Suggested by keyword baseline: ${suggested.length ? suggested.map(escapeHtml).join(", ") : "no confident match"}. Select or remove topics to correct the suggestions.`}</p>
    </div>
    <div class="detail-actions"><button class="secondary-button" id="reset-tags">Reset to suggestions</button></div>`;

  detail.querySelectorAll(".tag-choice").forEach(button => button.addEventListener("click", () => {
    const selected = new Set(note.tags || []);
    selected.has(button.dataset.tag) ? selected.delete(button.dataset.tag) : selected.add(button.dataset.tag);
    note.tags = orderedTopics().map(topic => topic.name).filter(name => selected.has(name));
    note.edited = true;
    saveNotes();
    renderAll();
    showToast("Your topic correction is saved.");
  }));

  const resetBtn = document.getElementById("reset-tags");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      note.tags = suggestTags(`${note.title}\n${note.body}`);
      note.edited = false;
      saveNotes();
      renderAll();
      showToast("Suggestions restored.");
    });
  }
}

function renderStats() {
  const totalStat = document.getElementById("total-stat");
  const taggedStat = document.getElementById("tagged-stat");
  const editedStat = document.getElementById("edited-stat");
  if (totalStat) totalStat.textContent = notes.length;
  if (taggedStat) taggedStat.textContent = notes.filter(note => (note.tags || []).length > 0).length;
  if (editedStat) editedStat.textContent = notes.filter(note => note.edited).length;
}

function renderAll() {
  renderTopics();
  renderNotes();
  renderDetail();
  renderStats();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function showNewNoteForm() {
  isCreatingNote = true;
  selectedId = null;
  renderNotes();
  const detail = document.getElementById("note-detail");
  const empty = document.getElementById("detail-empty");
  if (empty) empty.classList.add("hidden");
  if (!detail) return;
  detail.classList.remove("hidden");
  detail.innerHTML = `<div class="eyebrow">ADD TO YOUR LIBRARY</div><h2>New note</h2>
    <form id="new-note-form" class="new-note-form">
      <label for="new-title">Note title</label><input id="new-title" maxlength="100" placeholder="e.g. Introduction to vectors" required>
      <label for="new-body">Note content</label><textarea id="new-body" maxlength="5000" placeholder="Paste or write your study notes here…" required></textarea>
      <p class="suggestion-copy">Topic suggestions will be generated from your title and note content. You can review and edit them next.</p>
      <div class="detail-actions"><button class="primary-button" type="submit">Save note</button><button class="secondary-button" id="cancel-note" type="button">Cancel</button></div>
    </form>`;

  const newNoteForm = document.getElementById("new-note-form");
  if (newNoteForm) {
    newNoteForm.addEventListener("submit", event => {
      event.preventDefault();
      const titleInput = document.getElementById("new-title");
      const bodyInput = document.getElementById("new-body");
      const title = titleInput ? titleInput.value.trim() : "";
      const body = bodyInput ? bodyInput.value.trim() : "";
      if (!title || !body) return;
      const note = {
        id: `custom-${Date.now()}`,
        title,
        body,
        date: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date()),
        tags: suggestTags(`${title}\n${body}`)
      };
      notes.unshift(note);
      isCreatingNote = false;
      activeTopic = null;
      selectedId = note.id;
      saveNotes();
      renderAll();
      showToast("Note saved. Review the suggested topics.");
    });
  }

  const cancelBtn = document.getElementById("cancel-note");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      isCreatingNote = false;
      const filtered = filteredNotes();
      selectedId = filtered[0]?.id ?? notes[0]?.id ?? null;
      renderAll();
    });
  }
}

// Event Listeners setup
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
    const password = passwordInput ? passwordInput.value : "";
    if (email !== "student@demo.com" || password !== "learn123") {
      const errorMsg = document.getElementById("login-error");
      if (errorMsg) {
        errorMsg.textContent = "That demo email or password doesn't match. Try the credentials shown below.";
      }
      return;
    }
    const errorMsg = document.getElementById("login-error");
    if (errorMsg) errorMsg.textContent = "";
    sessionStorage.setItem("notewise-authenticated", "true");
    document.getElementById("login-screen")?.classList.add("hidden");
    document.getElementById("app-screen")?.classList.remove("hidden");
    renderAll();
  });
}

const logoutBtn = document.getElementById("logout-button");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("notewise-authenticated");
    document.getElementById("app-screen")?.classList.add("hidden");
    document.getElementById("login-screen")?.classList.remove("hidden");
    const pwd = document.getElementById("password");
    if (pwd) pwd.value = "";
  });
}

const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    if (!isCreatingNote) {
      renderNotes();
      renderDetail();
    } else {
      renderNotes();
    }
  });
}

const clearFilterBtn = document.getElementById("clear-filter");
if (clearFilterBtn) {
  clearFilterBtn.addEventListener("click", () => {
    activeTopic = null;
    renderAll();
  });
}

const navNotesBtn = document.getElementById("nav-notes");
if (navNotesBtn) {
  navNotesBtn.addEventListener("click", () => {
    isCreatingNote = false;
    activeTopic = null;
    renderAll();
  });
}

const newNoteBtn = document.getElementById("new-note-button");
if (newNoteBtn) {
  newNoteBtn.addEventListener("click", showNewNoteForm);
}

// Auto restore session if already authenticated in this session
if (sessionStorage.getItem("notewise-authenticated") === "true") {
  document.getElementById("login-screen")?.classList.add("hidden");
  document.getElementById("app-screen")?.classList.remove("hidden");
  renderAll();
}
