(() => {
  "use strict";

  const DATA = window.GUT_GAME_DATA;
  const SAVE_KEY = "gut-microcosmos-six-stations-v1";
  const STATE_VERSION = 1;
  const app = document.querySelector("#appMain");
  const journeyList = document.querySelector("#journeyList");
  const sourceDialog = document.querySelector("#sourceDialog");
  const sourceDialogBody = document.querySelector("#sourceDialogBody");
  const toastEl = document.querySelector("#toast");
  const shareCanvas = document.querySelector("#shareCanvas");
  const saveStatus = document.querySelector("#saveStatus");

  let toastTimer = null;
  let currentAxis = "brain";
  let lastRenderScroll = 0;

  const ICONS = {
    leaf: '<path d="M20 4C11.5 5.8 5 11.1 5 18.1c0 3.4 2.3 5.9 5.6 5.9 7.1 0 11.5-7.3 12.4-20Z"/><path d="M4 28c3.8-7.2 8.4-11.5 14-14.5"/>',
    sun: '<circle cx="16" cy="16" r="5.5"/><path d="M16 2.5v3M16 26.5v3M2.5 16h3M26.5 16h3M6.5 6.5l2.1 2.1M23.4 23.4l2.1 2.1M25.5 6.5l-2.1 2.1M8.6 23.4l-2.1 2.1"/>',
    moon: '<path d="M24.9 22.8A11.1 11.1 0 0 1 9.2 7.1 11.1 11.1 0 1 0 24.9 22.8Z"/>',
    pill: '<rect x="4.5" y="8.5" width="23" height="15" rx="7.5" transform="rotate(-35 16 16)"/><path d="m11.2 11.4 9.4 9.4"/>',
    rotate: '<path d="M3 11a13 13 0 1 1 2.3 11.1"/><path d="M3 4v7h7"/>',
    type: '<path d="M4 6h24M16 6v22M9 28h14"/>',
    sparkles: '<path d="m16 3 1.7 5.3L23 10l-5.3 1.7L16 17l-1.7-5.3L9 10l5.3-1.7L16 3Z"/><path d="m5 19 .9 2.7L9 22.5l-3.1.9L5 26l-.9-2.6L1 22.5l3.1-.8L5 19ZM26 18l.8 2.2 2.2.8-2.2.8L26 24l-.8-2.2-2.2-.8 2.2-.8L26 18Z"/>',
    close: '<path d="m7 7 18 18M25 7 7 25"/>',
    "arrow-right": '<path d="M5 16h22M19 8l8 8-8 8"/>',
    "arrow-left": '<path d="M27 16H5M13 8l-8 8 8 8"/>',
    check: '<path d="m5 17 7 7L27 8"/>',
    alert: '<path d="M16 3 29 27H3L16 3Z"/><path d="M16 11v7M16 23h.01"/>',
    brain: '<path d="M12 5.2A5 5 0 0 0 6.3 10a5.5 5.5 0 0 0-1.2 9.2A5 5 0 0 0 12 27h1V5.2a4 4 0 0 0-1 0Z"/><path d="M20 5.2A5 5 0 0 1 25.7 10a5.5 5.5 0 0 1 1.2 9.2A5 5 0 0 1 20 27h-1V5.2a4 4 0 0 1 1 0Z"/><path d="M8 13c1.5 0 2.5-.8 3-2M24 18c-1.5 0-2.5.8-3 2M8 21c1.3 0 2.2-.5 3-1.5M24 10c-1.3 0-2.2.5-3 1.5"/>',
    shield: '<path d="M16 3 27 7v8c0 7-4.6 11.7-11 14-6.4-2.3-11-7-11-14V7l11-4Z"/><path d="m10.5 16 3.4 3.4 7.6-8"/>',
    flame: '<path d="M17.2 3c1 5.6-3.1 7.3-3.1 11.2 0 2 .8 3.3 2.3 4.4-.2-2.5.9-4.3 2.4-5.8.8 3.4 4.2 4.7 4.2 8.5 0 4.2-3.2 6.7-7 6.7-4.6 0-7.5-3-7.5-7.4 0-6.8 5.6-9 8.7-17.6Z"/>',
    orbit: '<circle cx="16" cy="16" r="4"/><ellipse cx="16" cy="16" rx="13" ry="6.5" transform="rotate(35 16 16)"/><circle cx="27" cy="10" r="1.4"/><circle cx="5.5" cy="21" r="1.4"/>',
    fingerprint: '<path d="M12.5 7.5a8 8 0 0 1 12 7.5c0 4.8-1.7 7.6-1.7 11.5"/><path d="M7 15a9 9 0 0 1 18 0c0 4.6-.9 8.1-2.2 11.5"/><path d="M11.3 13a5 5 0 0 1 9.7 2c0 5.3-1.2 7.5-1.2 10.5"/><path d="M5 14c0 6 2 10 5 14M14 28.2c1.2-3.4 1.6-6.4 1.6-10.2a3 3 0 0 0-2-3"/>',
    stethoscope: '<path d="M8 4v9a6 6 0 0 0 12 0V4M5 4h6M17 4h6"/><path d="M14 19v3a6 6 0 0 0 12 0v-4"/><circle cx="26" cy="15" r="3"/>',
    flask: '<path d="M11 4h10M13 4v9L5.5 25a2.3 2.3 0 0 0 2 3.5h17a2.3 2.3 0 0 0 2-3.5L19 13V4"/><path d="M9 22h14M11.5 17h9"/>',
    capsule: '<rect x="4.5" y="9" width="23" height="14" rx="7" transform="rotate(-35 16 16)"/><path d="m11.3 11.3 9.4 9.4"/>',
    wheat: '<path d="M16 29V9M16 16c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7ZM16 22c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7ZM16 12c4.5 0 7-2.5 7-7-4.5 0-7 2.5-7 7ZM16 18c4.5 0 7-2.5 7-7-4.5 0-7 2.5-7 7Z"/>',
    blend: '<circle cx="11" cy="16" r="7"/><circle cx="21" cy="16" r="7"/><path d="M16 9v14"/>',
    transfer: '<path d="M5 12h19M20 7l4 5-4 5M27 21H8M12 16l-4 5 4 5"/>',
    bubbles: '<circle cx="11" cy="19" r="4"/><circle cx="21" cy="12" r="5"/><circle cx="24" cy="23" r="3"/><path d="M5 10h.01M27 5h.01"/>',
    waves: '<path d="M3 12c4 0 4-3 8-3s4 3 8 3 4-3 8-3M3 20c4 0 4-3 8-3s4 3 8 3 4-3 8-3M3 28c4 0 4-3 8-3s4 3 8 3 4-3 8-3"/>',
    user: '<circle cx="16" cy="11" r="5"/><path d="M6 28c.8-6 4.2-9 10-9s9.2 3 10 9"/>',
    download: '<path d="M16 3v19M8 14l8 8 8-8M4 27h24"/>',
    copy: '<rect x="10" y="10" width="17" height="18" rx="2"/><path d="M22 10V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5"/>',
    map: '<path d="m3 7 8-4 10 4 8-4v22l-8 4-10-4-8 4V7ZM11 3v22M21 7v22"/>',
    activity: '<path d="M2 17h7l3-9 5 17 3-8h10"/>',
    book: '<path d="M5 5a4 4 0 0 1 4-2h17v25H9a4 4 0 0 0-4 4V5Z"/><path d="M5 25a4 4 0 0 1 4-4h17"/>',
    image: '<rect x="3" y="4" width="26" height="24" rx="2"/><circle cx="11" cy="11" r="2.5"/><path d="m5 24 7-7 5 4 4-4 6 7"/>',
    route: '<circle cx="7" cy="7" r="3"/><circle cx="25" cy="25" r="3"/><path d="M10 7h8a7 7 0 0 1 7 7v3M22 25H14a7 7 0 0 1-7-7v-3"/>'
  };

  function icon(name, className = "") {
    return `<svg class="${className}" viewBox="0 0 32 32" aria-hidden="true">${ICONS[name] || ICONS.sparkles}</svg>`;
  }

  function defaultState() {
    return {
      version: STATE_VERSION,
      currentLevel: 0,
      unlockedLevel: 1,
      finished: false,
      completed: [false, false, false, false, false, false],
      settings: {
        reducedMotion:
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        largeText: false
      },
      levels: {
        1: {
          selectedPart: null,
          placed: [],
          feedback: "",
          feedbackType: "",
          quizAnswer: null,
          quizCorrect: false
        },
        2: {
          step: 0,
          choices: [],
          metrics: { ...DATA.levels[1].initialMetrics }
        },
        3: {
          index: 0,
          answers: {}
        },
        4: {
          index: 0,
          drafts: {},
          submitted: {}
        },
        5: {
          phase: "match",
          matches: {},
          matchChecked: false,
          matchScore: 0,
          adIndex: 0,
          adAnswers: {}
        },
        6: {
          step: 0,
          choices: [],
          metrics: { ...DATA.levels[5].initialMetrics },
          mapStarted: false,
          axesSeen: []
        }
      },
      learnedMyths: [],
      completedAt: null
    };
  }

  function deepMerge(target, source) {
    if (!source || typeof source !== "object") return target;
    const output = Array.isArray(target) ? [...target] : { ...target };

    Object.keys(source).forEach((key) => {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key]) &&
        target[key] &&
        typeof target[key] === "object" &&
        !Array.isArray(target[key])
      ) {
        output[key] = deepMerge(target[key], source[key]);
      } else if (source[key] !== undefined) {
        output[key] = source[key];
      }
    });

    return output;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (parsed.version !== STATE_VERSION) return defaultState();
      return deepMerge(defaultState(), parsed);
    } catch (error) {
      return defaultState();
    }
  }

  const state = loadState();

  function saveState(showFeedback = false) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      if (showFeedback) {
        saveStatus.classList.add("saving");
        window.setTimeout(() => saveStatus.classList.remove("saving"), 500);
      }
    } catch (error) {
      showToast("浏览器未能写入本地进度，本次探索仍可继续。");
    }
  }

  function showToast(message, duration = 2600) {
    window.clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add("show");
    toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), duration);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  }

  function applyMetricDelta(metrics, delta) {
    const next = { ...metrics };
    Object.keys(delta).forEach((key) => {
      next[key] = clamp(next[key] + delta[key]);
    });
    Object.keys(metrics).forEach((key) => {
      next[key] = clamp(next[key]);
    });
    return next;
  }

  function applySettings() {
    document.body.dataset.reducedMotion = String(state.settings.reducedMotion);
    document.body.dataset.largeText = String(state.settings.largeText);
    const motionButton = document.querySelector('[data-action="toggle-motion"]');
    const textButton = document.querySelector('[data-action="toggle-text"]');
    if (motionButton) motionButton.setAttribute("aria-pressed", String(state.settings.reducedMotion));
    if (textButton) textButton.setAttribute("aria-pressed", String(state.settings.largeText));
  }

  function hydrateStaticIcons() {
    document.querySelectorAll("[data-icon]").forEach((el) => {
      if (!el.querySelector("svg")) el.innerHTML = icon(el.dataset.icon);
    });
  }

  function renderJourney() {
    journeyList.innerHTML = DATA.levels
      .map((level, index) => {
        const levelNumber = index + 1;
        const isActive = !state.finished && state.currentLevel === index;
        const isCompleted = state.completed[index];
        const isLocked = levelNumber > state.unlockedLevel;
        const classes = [
          "journey-button",
          isActive ? "active" : "",
          isCompleted ? "completed" : ""
        ]
          .filter(Boolean)
          .join(" ");

        return `
          <li class="journey-step">
            <button
              class="${classes}"
              type="button"
              data-action="navigate-level"
              data-level-index="${index}"
              ${isLocked ? "disabled" : ""}
              ${isActive ? 'aria-current="step"' : ""}
              aria-label="第 ${levelNumber} 关：${level.title}${isLocked ? "，尚未解锁" : ""}"
            >
              <span class="journey-number">${isCompleted ? icon("check") : levelNumber}</span>
              <span class="journey-label">${level.title}</span>
            </button>
          </li>
        `;
      })
      .join("");
  }

  function render(options = {}) {
    const preserveScroll = options.preserveScroll !== false;
    lastRenderScroll = preserveScroll ? window.scrollY : 0;
    renderJourney();

    if (state.finished) {
      renderResults();
    } else {
      const levelNumber = state.currentLevel + 1;
      if (levelNumber === 1) renderLevel1();
      if (levelNumber === 2) renderLevel2();
      if (levelNumber === 3) renderLevel3();
      if (levelNumber === 4) renderLevel4();
      if (levelNumber === 5) renderLevel5();
      if (levelNumber === 6) renderLevel6();
    }

    applySettings();

    window.requestAnimationFrame(() => {
      if (options.scrollTop) {
        window.scrollTo({ top: 0, behavior: state.settings.reducedMotion ? "auto" : "smooth" });
      } else if (preserveScroll) {
        window.scrollTo({ top: lastRenderScroll, behavior: "auto" });
      }

      if (options.focus) {
        const target = document.querySelector(options.focus);
        if (target) target.focus({ preventScroll: false });
      } else if (options.focusMain) {
        app.focus({ preventScroll: true });
      }
    });
  }

  function navigateToLevel(index, options = {}) {
    const levelNumber = index + 1;
    if (levelNumber > state.unlockedLevel) return;
    state.currentLevel = index;
    state.finished = false;
    saveState();
    render({ preserveScroll: false, scrollTop: true, focusMain: true, ...options });
  }

  function completeLevel(levelNumber) {
    const index = levelNumber - 1;
    if (!state.completed[index]) {
      state.completed[index] = true;
      state.unlockedLevel = Math.max(state.unlockedLevel, Math.min(6, levelNumber + 1));
      const level = DATA.levels[index];
      showToast(`徽章已收藏：${level.badge.name}`);
    }
    saveState(true);
  }

  function levelCompleteBlock(levelNumber) {
    const level = DATA.levels[levelNumber - 1];
    const label = levelNumber === 6 ? "查看六站观察档案" : "前往下一关";
    const action = levelNumber === 6 ? "finish-exploration" : "next-level";
    return `
      <section class="level-complete" aria-label="第 ${levelNumber} 关已完成">
        <span class="complete-seal">${icon(level.badge.icon)}</span>
        <div class="complete-copy">
          <h3>徽章解锁 · ${level.badge.name}</h3>
          <p>${level.scienceNote}</p>
        </div>
        <button class="primary-button" type="button" data-action="${action}" data-next="${levelNumber}">
          ${label}
          ${icon("arrow-right")}
        </button>
      </section>
    `;
  }

  function metricBars(metrics, dark = true) {
    return DATA.metrics
      .map((metric) => {
        const value = Math.round(metrics[metric.id] ?? 0);
        const colorClass = metric.color;
        const isPressure = metric.id === "pressure";
        return `
          <div class="metric-row">
            <div class="metric-label-row">
              <span class="metric-name">${metric.label}</span>
              <span class="metric-value">${value}</span>
            </div>
            <div class="metric-track" role="img" aria-label="${metric.label} ${value}，游戏内模拟">
              <div class="metric-fill ${colorClass}" style="width:${isPressure ? Math.min(100, value) : value}%"></div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function currentVisualMetrics(levelNumber) {
    if (levelNumber === 2) return state.levels[2].metrics;
    if (levelNumber === 6) return state.levels[6].metrics;
    return { diversity: 62, fermentation: 58, barrier: 61, pressure: 38 };
  }

  function seededRandom(seed) {
    let value = seed >>> 0;
    return () => {
      value += 0x6d2b79f5;
      let t = value;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function gardenSvg(levelNumber = 1, compact = false) {
    const metrics = currentVisualMetrics(levelNumber);
    const random = seededRandom(levelNumber * 97 + Math.round(metrics.diversity));
    const id = `g${levelNumber}${compact ? "c" : "f"}`;
    const palette = ["#a8db79", "#f3bd4b", "#69b4cf", "#f47763", "#bba6e9"];
    const microbeCount = 18 + Math.round(metrics.diversity / 4);
    const bubbleCount = 6 + Math.round(metrics.fermentation / 8);
    const pressureOpacity = 0.05 + metrics.pressure / 750;

    const microbes = Array.from({ length: microbeCount }, (_, index) => {
      const x = 124 + random() * 470;
      const y = 80 + random() * 145;
      const radius = 3 + random() * 5;
      const color = palette[index % palette.length];
      const type = index % 4;
      let shape = `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius.toFixed(1)}" fill="${color}" />`;

      if (type === 1) {
        shape = `<rect x="${(x - radius).toFixed(1)}" y="${(y - radius * 0.7).toFixed(
          1
        )}" width="${(radius * 2).toFixed(1)}" height="${(radius * 1.4).toFixed(
          1
        )}" rx="${radius}" fill="${color}" transform="rotate(${Math.round(random() * 80 - 40)} ${x} ${y})" />`;
      }
      if (type === 2) {
        shape = `<path d="M${x - radius * 1.6} ${y}c${radius * 0.5}-${radius * 1.7} ${
          radius * 2.7
        }-${radius * 1.7} ${radius * 3.2} 0c-${radius * 0.5} ${radius * 1.7}-${
          radius * 2.7
        } ${radius * 1.7}-${radius * 3.2} 0Z" fill="${color}" />`;
      }
      if (type === 3) {
        shape = `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius.toFixed(
          1
        )}" fill="none" stroke="${color}" stroke-width="2" />`;
      }

      return `<g class="microbe" style="animation-delay:${(-random() * 8).toFixed(
        1
      )}s">${shape}</g>`;
    }).join("");

    const bubbles = Array.from({ length: bubbleCount }, () => {
      const x = 146 + random() * 420;
      const y = 120 + random() * 105;
      const radius = 2 + random() * 4;
      return `<circle class="bubble" cx="${x.toFixed(1)}" cy="${y.toFixed(
        1
      )}" r="${radius.toFixed(1)}" fill="none" stroke="#f3bd4b" stroke-width="1" style="animation-delay:${(
        -random() * 5
      ).toFixed(1)}s" />`;
    }).join("");

    return `
      <svg
        class="garden-base"
        viewBox="0 0 720 480"
        role="img"
        aria-label="肠道生态剖面动态示意图。微生物分布在肠腔，黏液层、肠上皮与免疫区域共同构成边界。图形仅作游戏模拟。"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lumen-${id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#214938" />
            <stop offset="0.48" stop-color="#15382c" />
            <stop offset="1" stop-color="#10281f" />
          </linearGradient>
          <linearGradient id="villus-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#e3b755" />
            <stop offset="0.45" stop-color="#a57446" />
            <stop offset="1" stop-color="#5d4737" />
          </linearGradient>
          <linearGradient id="tissue-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#e88f76" />
            <stop offset="0.5" stop-color="#c96b59" />
            <stop offset="1" stop-color="#623b35" />
          </linearGradient>
          <radialGradient id="softglow-${id}">
            <stop offset="0" stop-color="#a8db79" stop-opacity=".22" />
            <stop offset="1" stop-color="#a8db79" stop-opacity="0" />
          </radialGradient>
          <filter id="blur-${id}">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <clipPath id="lumenclip-${id}">
            <path d="M52 224C74 91 205 34 378 43c169 9 285 72 291 190-6 71-147 91-311 81C183 304 65 287 52 224Z" />
          </clipPath>
        </defs>

        <rect width="720" height="480" fill="#0b211a" />
        <circle cx="330" cy="170" r="190" fill="url(#softglow-${id})" filter="url(#blur-${id})" />

        <path
          d="M52 224C74 91 205 34 378 43c169 9 285 72 291 190-6 71-147 91-311 81C183 304 65 287 52 224Z"
          fill="url(#lumen-${id})"
          stroke="rgba(242,244,235,.09)"
        />
        <g clip-path="url(#lumenclip-${id})">
          <path d="M78 214c93-75 193-68 281-31 87 37 177 43 273-8" class="tissue-line" />
          <path d="M65 250c89-67 185-66 286-21 97 43 187 45 286-8" class="tissue-line" />
          <path d="M89 284c119-47 221-39 305-7 76 29 142 28 217-4" class="tissue-line" />
          ${microbes}
          ${bubbles}
          <circle cx="588" cy="92" r="88" fill="#f47763" opacity="${pressureOpacity.toFixed(
            2
          )}" />
        </g>

        <path
          d="M43 307c94-8 128 23 208 12 103-14 163-43 286-24 44 7 86 4 138-11v65c-52 14-95 17-143 10-116-18-182 7-279 20-85 11-132-17-210-11v-61Z"
          fill="rgba(105,180,207,.20)"
        />
        <path
          d="M38 322c108-10 140 24 221 12 104-15 165-42 291-22 42 7 80 4 133-10"
          class="mucus-path"
        />
        <path
          d="M0 356c84-11 157 10 224 13 96 5 155-11 244-12 94-1 158 19 252 4v119H0V356Z"
          fill="url(#tissue-${id})"
          opacity=".92"
        />
        <g opacity=".95">
          <path class="villus" d="M43 380c1 35 26 52 55 39 19-9 27-30 20-52" />
          <path class="villus" d="M145 383c0 41 26 60 57 42 21-13 28-33 20-56" />
          <path class="villus" d="M253 383c1 42 25 62 57 43 20-12 26-33 18-57" />
          <path class="villus" d="M359 382c0 41 24 62 54 48 22-10 29-33 21-58" />
          <path class="villus" d="M462 379c0 41 25 61 55 44 19-11 26-32 19-57" />
          <path class="villus" d="M568 375c-1 38 24 57 55 40 17-10 23-29 17-52" />
          <path class="villus" d="M655 371c-1 30 17 47 39 36 13-7 18-22 13-40" />
        </g>
        <g>
          <path class="villus-core" d="M47 383c2 26 22 41 48 31M150 386c0 31 22 46 47 34M258 386c1 31 21 47 46 35M363 384c0 31 21 47 44 38M467 382c0 30 20 46 44 35M573 378c-1 28 18 43 43 32M658 374c0 21 13 35 30 29" />
        </g>
        <g>
          <circle class="immune-cell" cx="244" cy="346" r="10" />
          <circle class="immune-cell" cx="455" cy="341" r="8" />
          <circle class="immune-cell" cx="545" cy="350" r="12" />
          <path class="signal-line" d="M284 249c43-70 92-99 139-124M278 277c57 51 91 92 121 122" />
          <path class="signal-line" d="M439 286c33 31 49 67 57 105" />
        </g>
        <g>
          <text x="37" y="68">肠道花园 · 游戏模拟</text>
          <text class="garden-note" x="37" y="85">菌群 / 代谢 / 屏障 / 免疫</text>
          <text class="garden-note" x="678" y="455" text-anchor="end">非个人健康评分</text>
        </g>
      </svg>
    `;
  }

  function levelHeading(level, headingClass = "") {
    return `
      <header class="level-heading ${headingClass}">
        <div class="heading-copy">
          <span class="level-kicker ${level.id >= 3 && level.id <= 4 ? "coral" : level.id >= 5 ? "gold" : ""}">
            ${level.kicker}
          </span>
          <h1 class="hero-title" id="screenTitle" tabindex="-1">${level.title}<span class="soft"> / ${level.chapter}</span></h1>
          <p class="hero-lead">${level.lead}</p>
        </div>
        <div class="level-meta" aria-label="关卡信息">
          <span class="duration-pill">${DATA.meta.duration}</span>
          <span class="chapter-pill">第 ${level.id} / 6 关</span>
          <div class="progress-mini" aria-hidden="true">
            ${DATA.levels.map((_, index) => `<span class="${index < level.id ? "on" : ""}"></span>`).join("")}
          </div>
        </div>
      </header>
    `;
  }

  function renderLevel1() {
    const level = DATA.levels[0];
    const levelState = state.levels[1];
    const placedCount = levelState.placed.length;
    const allPlaced = placedCount === level.parts.length;
    const selectedPart = level.parts.find((part) => part.id === levelState.selectedPart);
    const feedbackText =
      levelState.feedback ||
      (selectedPart
        ? `已拿起“${selectedPart.label}”。${selectedPart.hint}`
        : "先选择一个生态部件，再把它放到剖面里的正确位置。");

    const partList = level.parts
      .map((part) => {
        const isPlaced = levelState.placed.includes(part.id);
        const isSelected = levelState.selectedPart === part.id;
        const partIcon =
          part.id === "fiber"
            ? "wheat"
            : part.id === "scfa"
              ? "bubbles"
              : part.id === "mucus"
                ? "waves"
                : part.id === "immunity"
                  ? "shield"
                  : "brain";
        return `
          <li>
            <button
              class="part-card ${isPlaced ? "placed" : ""} ${isSelected ? "selected" : ""}"
              type="button"
              data-action="select-part"
              data-part-id="${part.id}"
              ${isPlaced ? "disabled" : ""}
              aria-pressed="${isSelected}"
            >
              <span class="part-icon">${icon(partIcon)}</span>
              <span>
                <span class="part-name">${part.label}</span>
                <span class="part-trace">${part.trace}</span>
              </span>
              <span class="part-state">${isPlaced ? "已安放" : isSelected ? "已拿起" : "选择"}</span>
            </button>
          </li>
        `;
      })
      .join("");

    const zones = level.zones
      .map((zone) => {
        const part = level.parts.find((item) => item.target === zone.id);
        const isFilled = levelState.placed.includes(part.id);
        return `
          <button
            class="garden-hotspot zone-${zone.id} ${isFilled ? "filled" : ""} ${
              selectedPart && !isFilled ? "active" : ""
            }"
            type="button"
            data-action="place-part"
            data-zone-id="${zone.id}"
            data-zone-label="${zone.label}"
            ${isFilled || !selectedPart ? "disabled" : ""}
            aria-label="${
              isFilled ? `${zone.label}已安放${part.label}` : `把部件放入${zone.label}：${zone.sub}`
            }"
          >
            <span class="hotspot-main">${isFilled ? part.label : zone.label}</span>
            <span class="hotspot-sub">${isFilled ? "生产线已点亮" : zone.sub}</span>
          </button>
        `;
      })
      .join("");

    const recap =
      allPlaced && !state.completed[0]
        ? `
          <section class="recap-box" id="levelRecap" tabindex="-1">
            <div class="recap-head">
              <h3>四条生态生产线已接通</h3>
              <span class="game-tag">最后确认</span>
            </div>
            <p>${level.recapQuestion.prompt}</p>
            <div class="answer-grid">
              ${level.recapQuestion.options
                .map(
                  (option, index) => `
                    <button
                      class="answer-button ${
                        levelState.quizAnswer === option.id
                          ? option.correct
                            ? "correct"
                            : "incorrect"
                          : levelState.quizAnswer !== null && option.correct
                            ? "correct"
                            : ""
                      }"
                      type="button"
                      data-action="answer-recap"
                      data-option-id="${option.id}"
                      ${levelState.quizAnswer !== null ? "disabled" : ""}
                    >
                      ${String.fromCharCode(65 + index)}. ${option.text}
                    </button>
                  `
                )
                .join("")}
            </div>
            ${
              levelState.quizAnswer !== null
                ? `<p class="recap-feedback">${level.recapQuestion.feedback}</p>`
                : ""
            }
          </section>
        `
        : "";

    app.innerHTML = `
      <section class="screen" aria-labelledby="screenTitle">
        ${levelHeading(level)}
        <div class="mission-grid">
          <aside class="mission-panel">
            <div class="panel-heading">
              <div>
                <h2>组装生态剖面</h2>
                <p class="instruction">点击部件，再选择剖面中的正确区域。</p>
              </div>
              <span class="counter-pill">${placedCount} / ${level.parts.length} 已安放</span>
            </div>
            <ul class="part-list">${partList}</ul>
            <div class="inline-feedback ${levelState.feedbackType}" role="status">
              ${feedbackText}
            </div>
            ${recap}
          </aside>
          <div class="garden-frame">
            <div class="garden-topline">
              <span class="garden-label">肠道生态剖面</span>
              <span class="game-tag">交互图 · 非真实比例</span>
            </div>
            ${gardenSvg(1)}
            <div class="garden-zone-layer">${zones}</div>
            <div class="garden-caption">
              <span>菌群代谢物可能参与屏障、免疫和代谢交流。</span>
              <span class="caption-legend">
                <span class="legend-item"><span class="legend-dot" style="background:var(--mint)"></span>微生物</span>
                <span class="legend-item"><span class="legend-dot" style="background:var(--blue)"></span>屏障</span>
                <span class="legend-item"><span class="legend-dot" style="background:var(--gold)"></span>信号</span>
              </span>
            </div>
          </div>
        </div>
        ${state.completed[0] ? levelCompleteBlock(1) : ""}
      </section>
    `;
  }

  function renderLevel2() {
    const level = DATA.levels[1];
    const l2 = state.levels[2];
    const hasCurrentChoice = l2.choices.length > l2.step;
    const currentScene = level.scenes[l2.step] || level.scenes[level.scenes.length - 1];
    const currentChoice = hasCurrentChoice ? l2.choices[l2.step] : null;
    const chosenOption = currentChoice
      ? currentScene.options.find((option) => option.id === currentChoice.optionId)
      : null;

    const optionMarkup = currentScene.options
      .map((option, index) => {
        const selected = chosenOption?.id === option.id;
        return `
          <button
            class="choice-button ${selected ? "selected" : ""}"
            type="button"
            data-action="choose-life-option"
            data-option-id="${option.id}"
            ${hasCurrentChoice || state.completed[1] ? "disabled" : ""}
          >
            <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
            <span class="choice-copy">
              <strong>${option.label}</strong>
              <small>${option.detail}</small>
            </span>
            <span class="choice-arrow">${icon(selected ? "check" : "arrow-right")}</span>
          </button>
        `;
      })
      .join("");

    const feedbackMarkup = chosenOption
      ? `
        <div class="choice-feedback" id="stepFeedback" tabindex="-1">
          <strong>这一选择可能意味着</strong>
          ${chosenOption.feedback}
          <span class="body-link">${chosenOption.link}</span>
        </div>
      `
      : "";

    const actionButton =
      hasCurrentChoice && !state.completed[1]
        ? `
          <button class="primary-button" type="button" data-action="advance-life">
            ${l2.step === level.scenes.length - 1 ? "完成第 2 关" : "进入下一情境"}
            ${icon("arrow-right")}
          </button>
        `
        : "";

    app.innerHTML = `
      <section class="screen" aria-labelledby="screenTitle">
        ${levelHeading(level)}
        <div class="lifestyle-layout">
          <section class="scenario-panel">
            <div class="scene-stepper" aria-label="生活情境进度">
              ${level.scenes
                .map((_, index) => {
                  const complete = index < l2.step || (index === l2.step && hasCurrentChoice);
                  const current = index === l2.step && !hasCurrentChoice;
                  return `<span class="scene-step ${complete ? "complete" : ""} ${
                    current ? "current" : ""
                  }"></span>`;
                })
                .join("")}
            </div>
            <div class="scene-head">
              <span class="scene-icon">${icon(currentScene.icon)}</span>
              <div>
                <span class="level-kicker">${currentScene.kicker}</span>
                <h2>${currentScene.title}</h2>
                <p class="scene-description">${currentScene.description}</p>
              </div>
            </div>
            <p class="scene-context">${currentScene.context}</p>
            <div class="option-list">${optionMarkup}</div>
            ${feedbackMarkup}
            <div class="stage-actions">
              <span class="stage-note">已体验 ${Math.min(l2.choices.length, 3)} / 3 个生活情境</span>
              ${actionButton}
            </div>
          </section>

          <aside class="simulation-panel scene-visual">
            <div class="simulation-head">
              <h2>本局生态模拟</h2>
              <span class="simulation-badge">非健康评分</span>
            </div>
            <div class="garden-widget">
              ${gardenSvg(2, true)}
            </div>
            <div class="metric-list">${metricBars(l2.metrics)}</div>
            <p class="simulation-note">
              指标只记录本局选择带来的游戏变化。一次早餐、一晚作息或一次用药不能代表长期健康，也不用于评价个人。
            </p>
          </aside>
        </div>
        ${state.completed[1] ? levelCompleteBlock(2) : ""}
      </section>
    `;
  }

  function level3Score() {
    return Object.values(state.levels[3].answers).reduce(
      (sum, answer) => sum + (answer.correct ? 10 : 0),
      0
    );
  }

  function renderLevel3() {
    const level = DATA.levels[2];
    const l3 = state.levels[3];
    const claims = level.claims;

    if (state.completed[2] && l3.index >= claims.length) {
      const learned = Object.values(l3.answers).filter((answer) => answer.correct).length;
      app.innerHTML = `
        <section class="screen" aria-labelledby="screenTitle">
          ${levelHeading(level)}
          <section class="report-panel span-12" style="grid-column:span 12">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker coral">身份卡已归档</span>
                <h2>你完成了 ${claims.length} 张微生态身份卡</h2>
              </div>
              <span class="score-chip">判断 ${level3Score()} / ${claims.length * 10}</span>
            </div>
            <p class="source-note">
              其中 ${learned} 张第一次判断就识别出了正确边界。更重要的不是“记住好菌与坏菌”，而是检查菌株、数量、位置、检测方法和宿主情境。
            </p>
          </section>
          ${levelCompleteBlock(3)}
        </section>
      `;
      return;
    }

    const index = Math.min(l3.index, claims.length - 1);
    const claim = claims[index];
    const answer = l3.answers[claim.id];
    const isAnswered = Boolean(answer);
    const correctCategory = level.categories.find((item) => item.id === claim.category);

    const categoryButtons = level.categories
      .map((category) => {
        let stateClass = "";
        if (isAnswered) {
          if (category.id === claim.category) stateClass = "correct";
          else if (category.id === answer.category) stateClass = "incorrect";
        }
        return `
          <button
            class="category-button ${stateClass}"
            type="button"
            data-action="classify-claim"
            data-category-id="${category.id}"
            ${isAnswered ? "disabled" : ""}
          >
            ${category.label}
          </button>
        `;
      })
      .join("");

    app.innerHTML = `
      <section class="screen" aria-labelledby="screenTitle">
        ${levelHeading(level)}
        <div class="identity-layout">
          <aside class="identity-card">
            <div class="card-number">
              <span>MICROBE IDENTITY FILE</span>
              <strong>${String(index + 1).padStart(2, "0")}</strong>
            </div>
            <div class="microbe-stage">
              <span class="orb-ring" aria-hidden="true"></span>
              <div class="microbe-orb" aria-hidden="true"></div>
            </div>
            <div class="identity-copy">
              <span class="micro-tag">${claim.tag}</span>
              <h2>名称不是全部</h2>
              <p>菌株、数量、位置和宿主状态，会共同改变微生物在这句话里的角色。</p>
            </div>
          </aside>

          <section class="quiz-panel">
            <div class="quiz-panel-head">
              <div>
                <span class="level-kicker">第 ${index + 1} / ${claims.length} 张身份卡</span>
                <h2>这句话应该如何判断？</h2>
              </div>
              <span class="score-chip">${icon("fingerprint")} ${level3Score()} 分</span>
            </div>

            <div class="claim-card">
              <span class="claim-tag">常见说法 · 请判断</span>
              <blockquote class="claim-quote">“${claim.claim}”</blockquote>
              <div class="category-grid">${categoryButtons}</div>
              ${
                isAnswered
                  ? `
                    <div class="judgement-feedback" id="stepFeedback" tabindex="-1">
                      <strong>${answer.correct ? "判断正确" : "这张卡需要再校正"} · ${correctCategory.label}</strong>
                      ${claim.feedback}
                      <span class="correction"><b>更准确的说法：</b>${claim.correction}</span>
                    </div>
                  `
                  : ""
              }
            </div>

            <div class="stage-actions">
              <span class="stage-note">判断后会立即显示证据边界</span>
              ${
                isAnswered
                  ? `
                    <button class="primary-button" type="button" data-action="advance-claim">
                      ${index === claims.length - 1 ? "完成第 3 关" : "下一张身份卡"}
                      ${icon("arrow-right")}
                    </button>
                  `
                  : ""
              }
            </div>
          </section>
        </div>
      </section>
    `;
  }

  function level4Score() {
    return Object.values(state.levels[4].submitted).reduce(
      (sum, item) => sum + (item.issueCorrect ? 10 : 0) + (item.careCorrect ? 10 : 0),
      0
    );
  }

  function renderLevel4() {
    const level = DATA.levels[3];
    const l4 = state.levels[4];
    const cases = level.cases;

    if (state.completed[3] && l4.index >= cases.length) {
      app.innerHTML = `
        <section class="screen" aria-labelledby="screenTitle">
          ${levelHeading(level)}
          <div class="safety-strip">
            ${icon("alert")}
            <span>再次提醒：便血、黑便、持续发热、剧烈腹痛、脱水或不明原因体重下降等情况，需要及时就医。</span>
          </div>
          <section class="report-panel span-12" style="grid-column:span 12">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker coral">三个病例线索已分流</span>
                <h2>风险识别不是给自己下诊断</h2>
              </div>
              <span class="score-chip">分流 ${level4Score()} / ${cases.length * 20}</span>
            </div>
            <p class="source-note">
              你练习的是把线索、可能涉及的健康问题与合理就医路径连接起来。真正的诊断仍需医生结合病史、体检和必要检查。
            </p>
          </section>
          ${levelCompleteBlock(4)}
        </section>
      `;
      return;
    }

    const index = Math.min(l4.index, cases.length - 1);
    const caseItem = cases[index];
    const draft = l4.drafts[caseItem.id] || { issue: "", care: "" };
    const submitted = l4.submitted[caseItem.id];
    const issueCorrect = submitted?.issueCorrect;
    const careCorrect = submitted?.careCorrect;

    const issueOptions = caseItem.issues
      .map((issue) => {
        let classNames = "select-option";
        if (!submitted && draft.issue === issue.id) classNames += " selected";
        if (submitted && issue.id === caseItem.issueCorrect) classNames += " correct";
        if (submitted && draft.issue === issue.id && issue.id !== caseItem.issueCorrect) {
          classNames += " incorrect";
        }
        return `
          <button
            class="${classNames}"
            type="button"
            data-action="case-select-issue"
            data-issue-id="${issue.id}"
            ${submitted ? "disabled" : ""}
          >
            <span class="radio-dot"></span>
            <span class="select-copy"><strong>${issue.label}</strong></span>
          </button>
        `;
      })
      .join("");

    const careOptions = level.careLevels
      .map((care) => {
        let classNames = "select-option";
        if (!submitted && draft.care === care.id) classNames += " selected";
        if (submitted && care.id === caseItem.careCorrect) classNames += " correct";
        if (submitted && draft.care === care.id && care.id !== caseItem.careCorrect) {
          classNames += " incorrect";
        }
        return `
          <button
            class="${classNames}"
            type="button"
            data-action="case-select-care"
            data-care-id="${care.id}"
            ${submitted ? "disabled" : ""}
          >
            <span class="radio-dot"></span>
            <span class="select-copy">
              <strong>${care.label}</strong>
              <small>${care.detail}</small>
            </span>
          </button>
        `;
      })
      .join("");

    app.innerHTML = `
      <section class="screen" aria-labelledby="screenTitle">
        ${levelHeading(level)}
        <div class="safety-strip">
          ${icon("alert")}
          <span>便血、黑便、持续发热、剧烈腹痛、脱水或不明原因体重下降等，是需要尽快就医的危险信号。</span>
        </div>
        <div class="case-layout">
          <section class="case-clues">
            <div class="case-person">
              <span class="case-avatar">${icon(caseItem.avatar === "alert" ? "alert" : caseItem.avatar === "loop" ? "activity" : "user")}</span>
              <div>
                <span class="level-kicker coral">${caseItem.station}</span>
                <h2>线索站 ${index + 1} / ${cases.length}</h2>
                <p>${caseItem.person}</p>
              </div>
            </div>
            <ul class="clue-list">
              ${caseItem.clues.map((clue) => `<li class="clue-item">${clue}</li>`).join("")}
            </ul>
          </section>

          <section class="case-form">
            <div class="form-section">
              <div class="form-label">
                <span>1. ${caseItem.question}</span>
                <small>不构成诊断</small>
              </div>
              <div class="select-row">${issueOptions}</div>
            </div>

            <div class="form-section">
              <div class="form-label">
                <span>2. 当前更适合哪一级就医路径？</span>
                <small>风险分流</small>
              </div>
              <div class="select-row">${careOptions}</div>
            </div>

            ${
              submitted
                ? `
                  <div class="case-feedback" id="stepFeedback" tabindex="-1">
                    <strong>${issueCorrect && careCorrect ? "问题与路径均判断正确" : "已完成本题反馈"}</strong>
                    ${caseItem.feedback}
                    <small>${caseItem.evidence}</small>
                  </div>
                `
                : ""
            }

            <div class="case-actions">
              <span class="stage-note">病例 ${index + 1} / ${cases.length} · 风险分流不是诊断</span>
              ${
                submitted
                  ? `
                    <button class="primary-button" type="button" data-action="advance-case">
                      ${index === cases.length - 1 ? "完成第 4 关" : "下一病例"}
                      ${icon("arrow-right")}
                    </button>
                  `
                  : `
                    <button
                      class="primary-button"
                      type="button"
                      data-action="submit-case"
                      ${!draft.issue || !draft.care ? "disabled" : ""}
                    >
                      核对分流
                      ${icon("route")}
                    </button>
                  `
              }
            </div>
          </section>
        </div>
      </section>
    `;
  }

  function level5Score() {
    const l5 = state.levels[5];
    const adScore = Object.values(l5.adAnswers).reduce(
      (sum, answer) => sum + (answer?.correct ? 12 : 0),
      0
    );
    return (l5.matchScore || 0) + adScore;
  }

  function evidenceTabs(activePhase) {
    return `
      <div class="evidence-tabs" role="tablist" aria-label="证据局阶段">
        <button
          class="evidence-tab ${activePhase === "match" ? "active" : ""}"
          type="button"
          role="tab"
          aria-selected="${activePhase === "match"}"
          data-action="evidence-phase"
          data-phase="match"
        >
          01 · 机制配对
        </button>
        <button
          class="evidence-tab ${activePhase === "ads" ? "active" : ""}"
          type="button"
          role="tab"
          aria-selected="${activePhase === "ads"}"
          data-action="evidence-phase"
          data-phase="ads"
          ${state.levels[5].matchChecked ? "" : "disabled"}
        >
          02 · 产品宣传红牌
        </button>
      </div>
    `;
  }

  function renderLevel5() {
    const level = DATA.levels[4];
    const l5 = state.levels[5];

    if (state.completed[4] && l5.adIndex >= level.adQuestions.length) {
      app.innerHTML = `
        <section class="screen" aria-labelledby="screenTitle">
          ${levelHeading(level)}
          <section class="report-panel span-12" style="grid-column:span 12">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker gold">证据审查完成</span>
                <h2>先看证据，再看场景，最后看安全边界</h2>
              </div>
              <span class="score-chip">科学判断 ${level5Score()} / 100</span>
            </div>
            <p class="source-note">
              干预方式、菌株、适用人群、剂量、安全性和储存条件共同决定一条宣传是否值得信任。这里没有“最强产品”，只有更清楚的边界。
            </p>
          </section>
          ${levelCompleteBlock(5)}
        </section>
      `;
      return;
    }

    const phase = l5.phase;
    let phaseContent = "";

    if (phase === "match") {
      const mechanismRows = level.mechanisms
        .map((mechanism) => {
          const selected = l5.matches[mechanism.id] || "";
          const isCorrect = selected === mechanism.correct;
          const selectClass = l5.matchChecked
            ? isCorrect
              ? "correct"
              : "incorrect"
            : "";
          return `
            <div class="mechanism-row">
              <div class="mechanism-name">
                <span class="part-icon">${icon(mechanism.icon)}</span>
                <span>${mechanism.label}</span>
              </div>
              <select
                class="mechanism-select ${selectClass}"
                data-match-id="${mechanism.id}"
                aria-label="${mechanism.label}的核心思路"
                ${l5.matchChecked ? "disabled" : ""}
              >
                <option value="">选择一个核心思路</option>
                ${mechanism.options
                  .map(
                    (option) =>
                      `<option value="${option.id}" ${
                        selected === option.id ? "selected" : ""
                      }>${option.text}</option>`
                  )
                  .join("")}
              </select>
            </div>
          `;
        })
        .join("");

      const allSelected = level.mechanisms.every((mechanism) => l5.matches[mechanism.id]);

      phaseContent = `
        <div class="mechanism-layout">
          <aside class="lab-illustration">
            <span class="game-tag">EVIDENCE LAB · 01</span>
            <h2>机制不同，证据边界也不同。</h2>
            <p>把四种干预方式与核心思路配对。它们不是同一种“益生菌产品”的不同口味。</p>
            <div class="flask-visual" aria-hidden="true">
              <svg viewBox="0 0 420 280">
                <defs>
                  <linearGradient id="flask-liquid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#f3bd4b" stop-opacity=".8" />
                    <stop offset="1" stop-color="#f47763" stop-opacity=".55" />
                  </linearGradient>
                  <filter id="flask-glow">
                    <feGaussianBlur stdDeviation="10" />
                  </filter>
                </defs>
                <ellipse cx="210" cy="243" rx="145" ry="22" fill="#a8db79" opacity=".08" filter="url(#flask-glow)" />
                <path d="M164 32h92M178 32v88L87 246c-7 12 2 22 15 22h216c15 0 22-12 15-23l-91-125V32" fill="none" stroke="rgba(242,244,235,.54)" stroke-width="3" />
                <path d="M111 222c26-31 49-29 72-8 24 22 47 23 72-6 17-20 38-22 65-2l37 51c5 9-1 15-12 15H100c-12 0-16-8-11-16l22-34Z" fill="url(#flask-liquid)" opacity=".55" />
                <circle cx="167" cy="213" r="6" fill="#a8db79" />
                <circle cx="228" cy="225" r="4" fill="#69b4cf" />
                <circle cx="276" cy="204" r="7" fill="#f3bd4b" />
                <circle cx="319" cy="235" r="4" fill="#f47763" />
                <path d="M127 87h39M303 80h21M79 158h42M303 151h49" stroke="rgba(243,189,75,.35)" stroke-linecap="round" />
              </svg>
            </div>
          </aside>

          <section class="mechanism-form">
            <div class="quiz-panel-head">
              <div>
                <span class="level-kicker gold">第一阶段</span>
                <h2>四种干预，四种核心思路</h2>
              </div>
              <span class="score-chip">${l5.matchChecked ? l5.matchScore : 0} / 40</span>
            </div>
            ${mechanismRows}
            ${
              l5.matchChecked
                ? `
                  <div class="match-feedback" id="stepFeedback" tabindex="-1">
                    <strong>配对核对完成</strong>
                    ${level.mechanisms
                      .map((mechanism) => `<div>· <b>${mechanism.label}</b>：${mechanism.boundary}</div>`)
                      .join("")}
                  </div>
                `
                : ""
            }
            <div class="stage-actions">
              <span class="stage-note">组合不等于效果自动相加</span>
              ${
                l5.matchChecked
                  ? `
                    <button class="primary-button gold" type="button" data-action="start-ad-audit">
                      进入宣传红牌挑战
                      ${icon("arrow-right")}
                    </button>
                  `
                  : `
                    <button
                      class="primary-button gold"
                      type="button"
                      data-action="check-matches"
                      ${allSelected ? "" : "disabled"}
                    >
                      核对机制配对
                      ${icon("flask")}
                    </button>
                  `
              }
            </div>
          </section>
        </div>
      `;
    } else {
      const index = Math.min(l5.adIndex, level.adQuestions.length - 1);
      const ad = level.adQuestions[index];
      const answer = l5.adAnswers[ad.id];
      const options = ad.options
        .map((option) => {
          let classNames = "audit-option";
          if (answer) {
            if (option.id === ad.correct) classNames += " correct";
            else if (answer.optionId === option.id) classNames += " incorrect";
          }
          return `
            <button
              class="${classNames}"
              type="button"
              data-action="audit-ad"
              data-option-id="${option.id}"
              ${answer ? "disabled" : ""}
            >
              ${option.label}
            </button>
          `;
        })
        .join("");

      phaseContent = `
        <div class="ad-layout">
          <article class="ad-poster" aria-label="待审查广告文案">
            <span class="red-flag-stamp">红牌<br />审查</span>
            <span class="ad-brand">MICROBIOME PRODUCT · ADVERTISEMENT</span>
            <p class="ad-copy">${ad.ad}</p>
            <p class="ad-fineprint">
              这是一条用于教学的游戏内虚构广告。文案越确定，越应该追问：具体菌株是什么？对谁有效？证据是什么？风险和储存条件在哪里？
            </p>
          </article>

          <section class="ad-audit">
            <span class="level-kicker gold">第二阶段 · 文案 ${index + 1} / ${level.adQuestions.length}</span>
            <h2>这条文案最该补哪类信息？</h2>
            <p>${ad.tag}。选择你认为最关键的审查缺口。</p>
            <div class="audit-options">${options}</div>
            ${
              answer
                ? `
                  <div class="match-feedback" id="stepFeedback" tabindex="-1">
                    <strong>${answer.correct ? "审查准确" : "审查缺口已标出"}</strong>
                    ${ad.feedback}
                    <div class="checklist" aria-label="完整证据清单">
                      ${ad.checklist.map((item) => `<span>${item}</span>`).join("")}
                    </div>
                  </div>
                `
                : ""
            }
            <div class="stage-actions">
              <span class="stage-note">科学判断 ${level5Score()} / 100</span>
              ${
                answer
                  ? `
                    <button class="primary-button gold" type="button" data-action="advance-ad">
                      ${
                        index === level.adQuestions.length - 1
                          ? "完成第 5 关"
                          : "审查下一条文案"
                      }
                      ${icon("arrow-right")}
                    </button>
                  `
                  : ""
              }
            </div>
          </section>
        </div>
      `;
    }

    app.innerHTML = `
      <section class="screen" aria-labelledby="screenTitle">
        ${levelHeading(level)}
        ${evidenceTabs(phase)}
        ${phaseContent}
      </section>
    `;
  }

  function renderLevel6() {
    const level = DATA.levels[5];
    const l6 = state.levels[6];

    if (!l6.mapStarted) {
      const phaseIndex = Math.min(l6.step, level.phases.length - 1);
      const phase = level.phases[phaseIndex];
      const choice = l6.choices[phaseIndex];
      const chosenOption = choice
        ? phase.options.find((option) => option.id === choice.optionId)
        : null;
      const hasChoice = Boolean(chosenOption);

      const options = phase.options
        .map((option, index) => {
          const selected = chosenOption?.id === option.id;
          return `
            <button
              class="choice-button ${selected ? "selected" : ""}"
              type="button"
              data-action="choose-antibiotic-option"
              data-option-id="${option.id}"
              ${hasChoice ? "disabled" : ""}
            >
              <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
              <span class="choice-copy">
                <strong>${option.label}</strong>
                <small>${option.detail}</small>
              </span>
              <span class="choice-arrow">${icon(selected ? "check" : "arrow-right")}</span>
            </button>
          `;
        })
        .join("");

      app.innerHTML = `
        <section class="screen" aria-labelledby="screenTitle">
          ${levelHeading(level)}
          <div class="antibiotic-intro">
            <section class="antibiotic-story">
              <div class="timeline-strip" aria-label="恢复叙事进度">
                ${level.phases
                  .map((_, index) => {
                    const done = index < phaseIndex || (index === phaseIndex && hasChoice);
                    const active = index === phaseIndex && !hasChoice;
                    return `<span class="timeline-segment ${done ? "done" : ""} ${
                      active ? "active" : ""
                    }"></span>`;
                  })
                  .join("")}
              </div>
              <span class="story-icon">${icon(
                phase.id === "treatment" ? "pill" : phase.id === "recovery" ? "leaf" : "route"
              )}</span>
              <span class="level-kicker">${phase.kicker}</span>
              <h2>${phase.title}</h2>
              <p>${phase.description}</p>
              <p class="story-caveat">
                叙事时间不是真实恢复时间。不同人的菌群、屏障和症状轨迹可能不同；抗生素不是天然敌人，必要时应遵医嘱使用。
              </p>
            </section>

            <section class="antibiotic-options">
              <span class="phase-kicker">${phase.time} · 阶段 ${phaseIndex + 1} / 3</span>
              <h2>你会怎样选择？</h2>
              <p>这里没有固定“完美恢复路线”。本局会把选择连接到花园状态与全身联动。</p>
              <div class="option-list">${options}</div>
              ${
                chosenOption
                  ? `
                    <div class="choice-feedback" id="stepFeedback" tabindex="-1">
                      <strong>本局生态变化</strong>
                      ${chosenOption.note}
                      <span class="body-link">这些变化只是叙事模拟，不代表你的真实肠道健康。</span>
                    </div>
                  `
                  : ""
              }
              <div class="stage-actions">
                <span class="stage-note">当前花园：${metricSummaryText(l6.metrics)}</span>
                ${
                  hasChoice
                    ? `
                      <button class="primary-button coral" type="button" data-action="advance-antibiotic">
                        ${
                          phaseIndex === level.phases.length - 1
                            ? "进入全身联动地图"
                            : "进入下一阶段"
                        }
                        ${icon("arrow-right")}
                      </button>
                    `
                    : ""
                }
              </div>
            </section>
          </div>
        </section>
      `;
      return;
    }

    const seen = l6.axesSeen;
    const activeAxis =
      level.axes.find((axis) => axis.id === currentAxis) ||
      level.axes.find((axis) => !seen.includes(axis.id)) ||
      level.axes[0];
    const axisNodes = level.axes
      .map(
        (axis) => `
          <button
            class="axis-node ${seen.includes(axis.id) ? "seen" : ""}"
            type="button"
            data-action="view-axis"
            data-axis-id="${axis.id}"
            aria-pressed="${seen.includes(axis.id)}"
          >
            <span class="axis-node-head">
              ${axis.label}
              ${icon(axis.icon)}
            </span>
            <small>${axis.evidence}</small>
          </button>
        `
      )
      .join("");

    app.innerHTML = `
      <section class="screen" aria-labelledby="screenTitle">
        ${levelHeading(level)}
        <div class="map-layout">
          <section class="body-map" aria-label="肠脑免疫代谢全身联动地图">
            <svg class="map-lines" viewBox="0 0 720 560" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="mapLineGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#bba6e9" />
                  <stop offset=".5" stop-color="#69b4cf" />
                  <stop offset="1" stop-color="#f3bd4b" />
                </linearGradient>
                <filter id="lineGlow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path d="M360 280C245 188 162 128 130 72" fill="none" stroke="url(#mapLineGradient)" stroke-width="2" stroke-dasharray="6 8" filter="url(#lineGlow)" />
              <path d="M360 280c120 76 190 131 224 190" fill="none" stroke="url(#mapLineGradient)" stroke-width="2" stroke-dasharray="6 8" filter="url(#lineGlow)" />
              <path d="M360 280c120-80 196-131 237-198" fill="none" stroke="url(#mapLineGradient)" stroke-width="2" stroke-dasharray="6 8" filter="url(#lineGlow)" />
              <circle cx="130" cy="72" r="4" fill="#bba6e9" />
              <circle cx="584" cy="470" r="4" fill="#f47763" />
              <circle cx="597" cy="82" r="4" fill="#f3bd4b" />
            </svg>
            <div class="map-center">
              <div>
                <strong>肠道花园</strong>
                <span>本局生态模拟</span>
              </div>
            </div>
            ${axisNodes}
            <span class="map-caption">点击三个方向，查看关系与证据层级</span>
          </section>

          <aside class="axis-detail">
            <div class="axis-detail-head">
              <div>
                <span class="level-kicker blue">全身联动 · ${seen.length} / 3 已探索</span>
                <h2 id="axisDetailTitle" tabindex="-1">${activeAxis.label}</h2>
              </div>
              <span class="axis-detail-icon" style="background:var(--${activeAxis.color})">${icon(
                activeAxis.icon
              )}</span>
            </div>
            <p class="axis-summary">${activeAxis.summary}</p>
            <div class="evidence-level-box">
              <strong>证据层级：${activeAxis.evidence}</strong>
              ${activeAxis.evidenceText}
            </div>
            <p class="axis-detail-copy">${activeAxis.detail}</p>
            <div class="axis-progress" aria-label="联动地图探索进度">
              ${level.axes
                .map((axis) => `<span class="${seen.includes(axis.id) ? "on" : ""}"></span>`)
                .join("")}
            </div>
            <p class="simulation-note" style="color:#61796c;border-color:rgba(16,40,31,.12)">
              游戏把行为连接到三个方向，只用于科普。相关不等于因果，人体研究仍存在差异。
            </p>
          </aside>
        </div>
        ${
          state.completed[5]
            ? levelCompleteBlock(6)
            : `
              <div class="stage-actions">
                <span class="stage-note">还需探索 ${Math.max(0, 3 - seen.length)} 个全身联动方向</span>
                <button class="primary-button" type="button" data-action="complete-map" ${
                  seen.length === 3 ? "" : "disabled"
                }>
                  收藏全身联动徽章
                  ${icon("check")}
                </button>
              </div>
            `
        }
      </section>
    `;
  }

  function metricSummaryText(metrics) {
    return `多样性 ${Math.round(metrics.diversity)} · 发酵 ${Math.round(
      metrics.fermentation
    )} · 屏障 ${Math.round(metrics.barrier)} · 压力 ${Math.round(metrics.pressure)}`;
  }

  function scienceStats() {
    const level1 = state.levels[1].quizCorrect ? 20 : 0;
    const level3 = level3Score();
    const level4 = level4Score();
    const level5 = level5Score();
    const earned = level1 + level3 + level4 + level5;
    const possible = 20 + 60 + 60 + 100;
    return {
      earned,
      possible,
      percent: possible ? Math.round((earned / possible) * 100) : 0
    };
  }

  function explorationStats() {
    const completedCount = state.completed.filter(Boolean).length;
    const axisCount = state.levels[6].axesSeen.length;
    const percent = Math.round((completedCount / 6) * 85 + (axisCount / 3) * 15);
    return { completedCount, axisCount, percent: Math.min(100, percent) };
  }

  function strongestAngle() {
    const candidates = [
      { id: "identity", score: level3Score() / 60, name: "菌群辨伪员", icon: "fingerprint" },
      { id: "triage", score: level4Score() / 60, name: "症状侦探", icon: "stethoscope" },
      { id: "evidence", score: level5Score() / 100, name: "证据审查员", icon: "flask" }
    ];
    const sorted = candidates.sort((a, b) => b.score - a.score);
    return sorted[0].score > 0 ? sorted[0] : { id: "ecology", name: "生态观察员", icon: "leaf" };
  }

  function correctedMyths() {
    const fallback = [
      "微生态不是“好菌越多越好”的固定分数，而是一套随环境变化的动态系统。",
      ...DATA.defaultMyths
    ];
    return [...new Set([...state.learnedMyths, ...fallback])].slice(0, 3);
  }

  function nextActionFor(strength) {
    if (strength.id === "triage") return DATA.nextActions[1];
    if (strength.id === "evidence") return DATA.nextActions[2];
    return DATA.nextActions[0];
  }

  function sourceItemsMarkup() {
    return DATA.sources
      .map(
        (source) => `
          <li class="source-item">
            <strong>${source.org} · ${source.title}</strong>
            <span>${source.note}</span>
          </li>
        `
      )
      .join("");
  }

  function renderResults() {
    const stats = scienceStats();
    const exploration = explorationStats();
    const strength = strongestAngle();
    const metrics = state.levels[6].metrics;
    const myths = correctedMyths();
    const nextAction = nextActionFor(strength);

    const badges = DATA.badges
      .map(
        (badge, index) => `
          <div class="badge-item">
            <span class="badge-icon ${badge.color}">${icon(badge.icon)}</span>
            <span class="badge-copy">
              <strong>${badge.name}</strong>
              <span>第 ${index + 1} 关 · ${state.completed[index] ? "已收藏" : "待探索"}</span>
            </span>
          </div>
        `
      )
      .join("");

    const axisItems = DATA.levels[5].axes
      .map(
        (axis) => `
          <div class="axis-summary-item">
            <span class="badge-icon" style="background:var(--${axis.color})">${icon(axis.icon)}</span>
            <span>
              <strong>${axis.label}</strong>
              <small>${axis.summary}</small>
            </span>
            <span class="evidence-chip">${axis.evidence}</span>
          </div>
        `
      )
      .join("");

    const metricsMarkup = DATA.metrics
      .map((metric) => {
        const value = Math.round(metrics[metric.id]);
        return `
          <div class="ecosystem-metric">
            <div class="metric-label-row">
              <span class="metric-name">${metric.label}</span>
              <span class="metric-value">${value}</span>
            </div>
            <div class="metric-track">
              <div class="metric-fill ${metric.color}" style="width:${value}%"></div>
            </div>
          </div>
        `;
      })
      .join("");

    app.innerHTML = `
      <section class="screen report-screen" aria-labelledby="screenTitle">
        <header class="report-hero">
          <div>
            <span class="level-kicker">SIX-STATION MICROBIOME ARCHIVE</span>
            <h1 id="screenTitle" tabindex="-1">我的六站微生态观察档案</h1>
            <p>
              你完成了一座花园从认识、扰动、辨伪、分流、审查到全身联动的探索。
              这不代表某种“肠道健康分数”，而是你理解微生态证据的一次记录。
            </p>
          </div>
          <div class="report-scoreboard">
            <div class="report-score-row">
              <span>科学判断准确率</span>
              <strong>${stats.percent}%</strong>
            </div>
            <div class="report-score-row">
              <span>探索完成度</span>
              <strong>${exploration.percent}%</strong>
            </div>
            <div class="report-score-row">
              <span>本局擅长角度</span>
              <strong style="font-size:.9rem">${strength.name}</strong>
            </div>
          </div>
        </header>

        <div class="report-grid">
          <section class="report-panel dark">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker">生态模拟结果 · 非健康评分</span>
                <h2>本局花园状态</h2>
              </div>
              <span class="strength-stamp">${icon(strength.icon)}<br />${strength.name}</span>
            </div>
            <div class="ecosystem-metrics">${metricsMarkup}</div>
            <p class="simulation-note">
              这四项只记录本局选择如何改变游戏中的花园，不代表检测结果、疾病风险或个人健康水平。
            </p>
          </section>

          <section class="report-panel">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker gold">探索记录</span>
                <h2>六枚关卡徽章</h2>
              </div>
              <span class="score-chip">${exploration.completedCount} / 6</span>
            </div>
            <div class="badge-shelf">${badges}</div>
            <p class="source-note" style="margin-top:14px;margin-bottom:0">
              科学判断得分 ${stats.earned} / ${stats.possible}。不同玩法记录不同证据，不把模拟指标混入健康总分。
            </p>
          </section>

          <section class="report-panel dark">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker coral">认知校正</span>
                <h2>你纠正过的三个常见误区</h2>
              </div>
              ${icon("fingerprint")}
            </div>
            <div class="myth-list">
              ${myths
                .map(
                  (myth, index) => `
                    <div class="myth-item">
                      <span class="myth-number">${index + 1}</span>
                      <p>${myth}</p>
                    </div>
                  `
                )
                .join("")}
            </div>
          </section>

          <section class="report-panel">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker blue">全身联动地图</span>
                <h2>三条关系，不等于三个因果结论</h2>
              </div>
              <span class="score-chip">${exploration.axisCount} / 3 已探索</span>
            </div>
            <div class="axis-summary-list">${axisItems}</div>
          </section>

          <section class="report-panel dark span-12" style="grid-column:span 12">
            <div class="share-layout">
              <div class="share-card-preview">
                <span class="share-card-brand"><span class="legend-dot"></span>肠道小宇宙 · SIX STATIONS</span>
                <h2 class="share-card-title">我的六站<br />微生态观察档案</h2>
                <span class="share-identity">${strength.name}</span>
                <div class="share-metrics-mini">
                  ${DATA.metrics
                    .map(
                      (metric) =>
                        `<span>${metric.short}<strong>${Math.round(metrics[metric.id])}</strong></span>`
                    )
                    .join("")}
                </div>
                <p class="simulation-note">
                  科学判断 ${stats.percent}% · 探索完成度 ${exploration.percent}%<br />
                  游戏模拟指标，不是健康报告。
                </p>
              </div>
              <div class="share-controls">
                <span class="level-kicker">SHARE THE ARCHIVE</span>
                <h2>分享一份证据观察档案</h2>
                <p>
                  分享卡不使用“肠道健康报告”的表述。复制文本或生成图片，把游戏模拟、科学判断和证据边界一起带走。
                </p>
                <div class="share-buttons">
                  <button class="primary-button gold" type="button" data-action="download-share">
                    ${icon("image")} 生成分享图片
                  </button>
                  <button class="secondary-button on-dark" type="button" data-action="copy-report">
                    ${icon("copy")} 复制观察文本
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section class="report-panel span-4">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker gold">下一步</span>
                <h2>一个低门槛行动</h2>
              </div>
            </div>
            <div class="next-action">
              <span class="badge-icon">${icon("leaf")}</span>
              <span>${nextAction}</span>
            </div>
          </section>

          <section class="report-panel span-4">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker">证据说明</span>
                <h2>怎样理解相关性</h2>
              </div>
            </div>
            <p class="source-note" style="margin-bottom:0">
              本网页区分机制研究、观察性研究与临床证据，并使用“可能参与”“与……相关”等表述。
              相关不等于因果；人体研究受人群、剂量、结局和设计影响。所有内容不替代医生判断。
            </p>
          </section>

          <section class="report-panel span-4">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker blue">安全边界</span>
                <h2>何时尽快就医</h2>
              </div>
            </div>
            <p class="source-note" style="margin-bottom:0">
              便血、黑便、持续发热、剧烈腹痛、脱水、持续呕吐或不明原因体重下降等情况，应尽快就医。
              不自行选择抗生素，也不自行尝试粪菌移植。
            </p>
          </section>

          <section class="report-panel span-12" id="scienceSources" style="grid-column:span 12">
            <div class="report-panel-head">
              <div>
                <span class="level-kicker">科学来源</span>
                <h2>公开共识与指南方向</h2>
              </div>
              <button class="text-button" type="button" data-action="open-sources">
                查看证据说明 ${icon("book")}
              </button>
            </div>
            <ul class="source-list">${sourceItemsMarkup()}</ul>
            <p class="report-note" style="margin-top:14px">
              ${DATA.meta.disclaimer}
              本版本用于互动科普原型；正式上线前应由医学与科普专业人员逐条复核，并核对最新版指南与共识。
            </p>
          </section>
        </div>

        <div class="report-actions">
          <p class="report-note">
            本局记录仅保存在当前浏览器。你可以随时重新探索，观察不同选择如何让花园产生不同变化。
          </p>
          <button class="secondary-button" type="button" data-action="restart">
            ${icon("rotate")} 重新开始
          </button>
        </div>
      </section>
    `;
  }

  function buildReportText() {
    const strength = strongestAngle();
    const stats = scienceStats();
    const exploration = explorationStats();
    const metrics = state.levels[6].metrics;
    return [
      "我的六站微生态观察档案",
      `擅长角度：${strength.name}`,
      `科学判断准确率：${stats.percent}%`,
      `探索完成度：${exploration.percent}%`,
      `本局生态模拟：多样性 ${Math.round(metrics.diversity)} / 发酵 ${Math.round(
        metrics.fermentation
      )} / 屏障 ${Math.round(metrics.barrier)} / 压力 ${Math.round(metrics.pressure)}`,
      "三条联动：肠—脑轴、肠—免疫轴、肠—代谢轴。相关不等于因果。",
      "游戏模拟指标不代表真实健康或疾病风险。科普体验不构成医疗建议。"
    ].join("\n");
  }

  async function copyReport() {
    const text = buildReportText();
    try {
      await navigator.clipboard.writeText(text);
      showToast("观察文本已复制。");
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      showToast(copied ? "观察文本已复制。" : "复制失败，请稍后重试。");
    }
  }

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function wrapCanvasText(ctx, text, maxWidth) {
    const lines = [];
    let line = "";
    Array.from(text).forEach((char) => {
      const next = line + char;
      if (ctx.measureText(next).width > maxWidth && line) {
        lines.push(line);
        line = char;
      } else {
        line = next;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function downloadShareCard() {
    const ctx = shareCanvas.getContext("2d");
    const width = shareCanvas.width;
    const height = shareCanvas.height;
    const metrics = state.levels[6].metrics;
    const strength = strongestAngle();
    const stats = scienceStats();
    const exploration = explorationStats();

    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#10281f");
    gradient.addColorStop(0.55, "#15382c");
    gradient.addColorStop(1, "#0a1d17");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(243,189,75,.22)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(930, 1100, 290, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(930, 1100, 190, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#a8db79";
    ctx.beginPath();
    ctx.arc(82, 74, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#b9cbbf";
    ctx.font = '600 24px "Microsoft YaHei", sans-serif';
    ctx.fillText("肠道小宇宙 · 六站微生态观察档案", 110, 84);

    ctx.fillStyle = "#f2f4eb";
    ctx.font = '700 72px "Songti SC", "SimSun", serif';
    ctx.fillText("我的六站", 76, 210);
    ctx.fillText("微生态观察档案", 76, 302);

    roundRect(ctx, 76, 344, 280, 56, 28);
    ctx.fillStyle = "#a8db79";
    ctx.fill();
    ctx.fillStyle = "#10281f";
    ctx.font = '800 24px "Microsoft YaHei", sans-serif';
    ctx.fillText(strength.name, 104, 381);

    ctx.fillStyle = "#a8bdb0";
    ctx.font = '500 24px "Microsoft YaHei", sans-serif';
    ctx.fillText("游戏模拟指标，不是健康报告", 76, 448);

    const metricEntries = DATA.metrics.map((metric) => ({
      label: metric.label,
      value: Math.round(metrics[metric.id]),
      color:
        metric.color === "mint"
          ? "#a8db79"
          : metric.color === "gold"
            ? "#f3bd4b"
            : metric.color === "blue"
              ? "#69b4cf"
              : "#f47763"
    }));

    metricEntries.forEach((metric, index) => {
      const x = 76 + (index % 2) * 458;
      const y = 506 + Math.floor(index / 2) * 150;
      roundRect(ctx, x, y, 420, 116, 12);
      ctx.fillStyle = "rgba(242,244,235,.06)";
      ctx.fill();
      ctx.strokeStyle = "rgba(242,244,235,.12)";
      ctx.stroke();
      ctx.fillStyle = "#a8bdb0";
      ctx.font = '500 22px "Microsoft YaHei", sans-serif';
      ctx.fillText(metric.label, x + 24, y + 39);
      ctx.fillStyle = "#f2f4eb";
      ctx.font = '700 40px "Arial Narrow", "Microsoft YaHei", sans-serif';
      ctx.fillText(String(metric.value), x + 24, y + 88);
      ctx.fillStyle = metric.color;
      roundRect(ctx, x + 104, y + 70, 280 * (metric.value / 100), 8, 4);
      ctx.fill();
    });

    ctx.fillStyle = "#f2f4eb";
    ctx.font = '700 30px "Microsoft YaHei", sans-serif';
    ctx.fillText("六站徽章", 76, 860);
    DATA.badges.forEach((badge, index) => {
      const x = 76 + (index % 3) * 302;
      const y = 892 + Math.floor(index / 3) * 74;
      roundRect(ctx, x, y, 282, 56, 10);
      ctx.fillStyle = "rgba(242,244,235,.06)";
      ctx.fill();
      ctx.fillStyle = index < 3 ? "#a8db79" : "#f3bd4b";
      ctx.beginPath();
      ctx.arc(x + 29, y + 28, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#dce6df";
      ctx.font = '600 20px "Microsoft YaHei", sans-serif';
      ctx.fillText(badge.name, x + 51, y + 35);
    });

    ctx.strokeStyle = "rgba(242,244,235,.14)";
    ctx.beginPath();
    ctx.moveTo(76, 1072);
    ctx.lineTo(1004, 1072);
    ctx.stroke();

    ctx.fillStyle = "#a8bdb0";
    ctx.font = '500 22px "Microsoft YaHei", sans-serif';
    ctx.fillText("科学判断准确率", 76, 1125);
    ctx.fillText("探索完成度", 390, 1125);
    ctx.fillStyle = "#f2f4eb";
    ctx.font = '700 44px "Arial Narrow", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${stats.percent}%`, 76, 1178);
    ctx.fillText(`${exploration.percent}%`, 390, 1178);

    ctx.fillStyle = "#f3bd4b";
    ctx.font = '700 24px "Microsoft YaHei", sans-serif';
    ctx.fillText("三条联动", 76, 1244);
    ctx.fillStyle = "#c7d5cb";
    ctx.font = '500 20px "Microsoft YaHei", sans-serif';
    const axisText = "肠—脑轴  ·  肠—免疫轴  ·  肠—代谢轴    相关不等于因果";
    ctx.fillText(axisText, 196, 1244);
    ctx.fillStyle = "#7f9889";
    ctx.font = '500 18px "Microsoft YaHei", sans-serif';
    ctx.fillText("本图仅用于科普互动，不构成医疗建议。", 76, 1302);

    shareCanvas.toBlob(
      (blob) => {
        if (!blob) {
          showToast("分享图片生成失败，请稍后重试。");
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "我的六站微生态观察档案.png";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1500);
        showToast("分享图片已生成。");
      },
      "image/png",
      0.96
    );
  }

  function openSourcesDialog() {
    sourceDialogBody.innerHTML = `
      <p class="source-note">
        本互动把证据分成“机制研究”“观察性研究”“临床研究”等不同层级。页面中的生活方式反馈、四项生态指标和花园动画
        都是游戏内模拟，不是个人检测结果，也不用于诊断或预测疾病。
      </p>
      <ul class="dialog-source-list">
        ${DATA.sources
          .map(
            (source) => `
              <li>
                <strong>${source.org} · ${source.title}</strong>
                <span>${source.note}</span>
              </li>
            `
          )
          .join("")}
      </ul>
      <p class="source-note">
        益生菌、益生元、合生制剂与粪菌移植是不同类别的干预。产品是否适合某个人，需要结合具体菌株、剂量、临床证据、
        安全性和专业建议。上线前应由医学专业人员复核，并以最新版指南与共识为准。
      </p>
      <p class="source-note">${DATA.meta.disclaimer}</p>
    `;
    if (typeof sourceDialog.showModal === "function") {
      sourceDialog.showModal();
    } else {
      sourceDialog.setAttribute("open", "");
    }
  }

  function addLearnedMyth(text) {
    if (!text) return;
    if (!state.learnedMyths.includes(text)) state.learnedMyths.push(text);
  }

  function resetExploration() {
    if (!window.confirm("重新开始会清除当前浏览器里的本局进度，确定吗？")) return;
    const fresh = defaultState();
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, fresh);
    currentAxis = "brain";
    saveState();
    render({ preserveScroll: false, scrollTop: true, focusMain: true });
    showToast("已开始新的六站探索。");
  }

  function handleClick(event) {
    const control = event.target.closest("[data-action]");
    if (!control || control.disabled) return;
    const action = control.dataset.action;

    if (action === "open-sources") {
      event.preventDefault();
      openSourcesDialog();
      return;
    }

    if (action === "close-sources") {
      sourceDialog.close();
      return;
    }

    if (action === "toggle-motion") {
      state.settings.reducedMotion = !state.settings.reducedMotion;
      applySettings();
      saveState();
      showToast(state.settings.reducedMotion ? "已减少页面动态效果。" : "已恢复页面动态效果。");
      return;
    }

    if (action === "toggle-text") {
      state.settings.largeText = !state.settings.largeText;
      applySettings();
      saveState();
      showToast(state.settings.largeText ? "已切换为大字号。" : "已恢复标准字号。");
      return;
    }

    if (action === "restart") {
      resetExploration();
      return;
    }

    if (action === "go-home") {
      if (state.finished) {
        window.scrollTo({ top: 0, behavior: state.settings.reducedMotion ? "auto" : "smooth" });
      } else {
        render({ preserveScroll: false, scrollTop: true, focusMain: true });
      }
      return;
    }

    if (action === "navigate-level") {
      const index = Number(control.dataset.levelIndex);
      navigateToLevel(index);
      return;
    }

    if (action === "next-level") {
      navigateToLevel(Number(control.dataset.next));
      return;
    }

    if (action === "select-part") {
      const l1 = state.levels[1];
      if (state.completed[0] || l1.placed.includes(control.dataset.partId)) return;
      const part = DATA.levels[0].parts.find((item) => item.id === control.dataset.partId);
      l1.selectedPart = part.id;
      l1.feedback = `已拿起“${part.label}”。${part.hint}`;
      l1.feedbackType = "";
      saveState();
      render({ focus: ".part-card.selected", preserveScroll: true });
      return;
    }

    if (action === "place-part") {
      const l1 = state.levels[1];
      if (state.completed[0] || !l1.selectedPart) return;
      const part = DATA.levels[0].parts.find((item) => item.id === l1.selectedPart);
      const zoneId = control.dataset.zoneId;
      if (part.target === zoneId) {
        if (!l1.placed.includes(part.id)) l1.placed.push(part.id);
        l1.selectedPart = null;
        l1.feedbackType = "good";
        l1.feedback =
          l1.placed.length === DATA.levels[0].parts.length
            ? "四条生态生产线已接通。最后用一道判断题确认：微生态不是一种菌，也不是一个固定分数。"
            : `“${part.label}”已放入正确区域。继续组装下一条生态路径。`;
        saveState(true);
        render({
          focus:
            l1.placed.length === DATA.levels[0].parts.length
              ? "#levelRecap"
              : ".part-card:not(.placed)",
          preserveScroll: true
        });
      } else {
        l1.feedback = `这个位置暂不匹配。提示：${part.hint}`;
        l1.feedbackType = "warn";
        saveState();
        render({ focus: ".part-card.selected", preserveScroll: true });
      }
      return;
    }

    if (action === "answer-recap") {
      const l1 = state.levels[1];
      if (l1.quizAnswer !== null) return;
      const option = DATA.levels[0].recapQuestion.options.find(
        (item) => item.id === control.dataset.optionId
      );
      l1.quizAnswer = option.id;
      l1.quizCorrect = option.correct;
      completeLevel(1);
      render({ focus: ".level-complete .primary-button", preserveScroll: true });
      return;
    }

    if (action === "choose-life-option") {
      const l2 = state.levels[2];
      const level = DATA.levels[1];
      if (state.completed[1] || l2.choices.length > l2.step) return;
      const scene = level.scenes[l2.step];
      const option = scene.options.find((item) => item.id === control.dataset.optionId);
      l2.choices.push({ sceneId: scene.id, optionId: option.id });
      l2.metrics = applyMetricDelta(l2.metrics, option.delta);
      saveState(true);
      render({ focus: "#stepFeedback", preserveScroll: true });
      return;
    }

    if (action === "advance-life") {
      const l2 = state.levels[2];
      const level = DATA.levels[1];
      if (state.completed[1]) return;
      if (l2.step < level.scenes.length - 1 && l2.choices.length === l2.step + 1) {
        l2.step += 1;
        saveState();
        render({ focus: ".choice-button", preserveScroll: false });
        return;
      }
      if (l2.choices.length === level.scenes.length) {
        completeLevel(2);
        render({ focus: ".level-complete .primary-button", preserveScroll: true });
      }
      return;
    }

    if (action === "classify-claim") {
      const l3 = state.levels[3];
      const claim = DATA.levels[2].claims[l3.index];
      if (!claim || l3.answers[claim.id]) return;
      const category = control.dataset.categoryId;
      const correct = category === claim.category;
      l3.answers[claim.id] = { category, correct };
      if (!correct) addLearnedMyth(`“${claim.claim}” → ${claim.correction}`);
      saveState(true);
      render({ focus: "#stepFeedback", preserveScroll: true });
      return;
    }

    if (action === "advance-claim") {
      const l3 = state.levels[3];
      const claims = DATA.levels[2].claims;
      if (!l3.answers[claims[l3.index]?.id]) return;
      if (l3.index < claims.length - 1) {
        l3.index += 1;
        saveState();
        render({ focus: ".category-button", preserveScroll: false });
      } else {
        l3.index = claims.length;
        completeLevel(3);
        render({ focus: ".level-complete .primary-button", preserveScroll: true });
      }
      return;
    }

    if (action === "case-select-issue" || action === "case-select-care") {
      const l4 = state.levels[4];
      const caseItem = DATA.levels[3].cases[l4.index];
      if (!caseItem || l4.submitted[caseItem.id]) return;
      l4.drafts[caseItem.id] = l4.drafts[caseItem.id] || { issue: "", care: "" };
      if (action === "case-select-issue") l4.drafts[caseItem.id].issue = control.dataset.issueId;
      if (action === "case-select-care") l4.drafts[caseItem.id].care = control.dataset.careId;
      saveState();
      render({
        focus:
          action === "case-select-issue"
            ? `[data-action="case-select-issue"][data-issue-id="${control.dataset.issueId}"]`
            : `[data-action="case-select-care"][data-care-id="${control.dataset.careId}"]`,
        preserveScroll: true
      });
      return;
    }

    if (action === "submit-case") {
      const l4 = state.levels[4];
      const caseItem = DATA.levels[3].cases[l4.index];
      const draft = l4.drafts[caseItem.id];
      if (!draft?.issue || !draft?.care || l4.submitted[caseItem.id]) return;
      l4.submitted[caseItem.id] = {
        issueCorrect: draft.issue === caseItem.issueCorrect,
        careCorrect: draft.care === caseItem.careCorrect
      };
      saveState(true);
      render({ focus: "#stepFeedback", preserveScroll: true });
      return;
    }

    if (action === "advance-case") {
      const l4 = state.levels[4];
      const cases = DATA.levels[3].cases;
      if (!l4.submitted[cases[l4.index]?.id]) return;
      if (l4.index < cases.length - 1) {
        l4.index += 1;
        saveState();
        render({ focus: ".case-form", preserveScroll: false });
      } else {
        l4.index = cases.length;
        completeLevel(4);
        render({ focus: ".level-complete .primary-button", preserveScroll: true });
      }
      return;
    }

    if (action === "evidence-phase") {
      const l5 = state.levels[5];
      const phase = control.dataset.phase;
      if (phase === "ads" && !l5.matchChecked) return;
      l5.phase = phase;
      saveState();
      render({ focus: ".evidence-tab.active", preserveScroll: true });
      return;
    }

    if (action === "check-matches") {
      const l5 = state.levels[5];
      if (l5.matchChecked) return;
      const level = DATA.levels[4];
      if (!level.mechanisms.every((mechanism) => l5.matches[mechanism.id])) return;
      l5.matchScore = level.mechanisms.reduce(
        (sum, mechanism) =>
          sum + (l5.matches[mechanism.id] === mechanism.correct ? 10 : 0),
        0
      );
      l5.matchChecked = true;
      saveState(true);
      render({ focus: "#stepFeedback", preserveScroll: true });
      return;
    }

    if (action === "start-ad-audit") {
      const l5 = state.levels[5];
      if (!l5.matchChecked) return;
      l5.phase = "ads";
      l5.adIndex = 0;
      saveState();
      render({ focus: ".ad-audit h2", preserveScroll: false });
      return;
    }

    if (action === "audit-ad") {
      const l5 = state.levels[5];
      const ad = DATA.levels[4].adQuestions[l5.adIndex];
      if (!ad || l5.adAnswers[ad.id]) return;
      const optionId = control.dataset.optionId;
      const correct = optionId === ad.correct;
      l5.adAnswers[ad.id] = { optionId, correct };
      if (!correct) addLearnedMyth(`“${ad.ad}” → ${ad.feedback}`);
      saveState(true);
      render({ focus: "#stepFeedback", preserveScroll: true });
      return;
    }

    if (action === "advance-ad") {
      const l5 = state.levels[5];
      const ads = DATA.levels[4].adQuestions;
      if (!l5.adAnswers[ads[l5.adIndex]?.id]) return;
      if (l5.adIndex < ads.length - 1) {
        l5.adIndex += 1;
        saveState();
        render({ focus: ".audit-options", preserveScroll: false });
      } else {
        l5.adIndex = ads.length;
        completeLevel(5);
        render({ focus: ".level-complete .primary-button", preserveScroll: true });
      }
      return;
    }

    if (action === "choose-antibiotic-option") {
      const l6 = state.levels[6];
      const phases = DATA.levels[5].phases;
      const phase = phases[l6.step];
      if (!phase || l6.choices.length > l6.step || l6.mapStarted) return;
      const option = phase.options.find((item) => item.id === control.dataset.optionId);
      l6.choices.push({ phaseId: phase.id, optionId: option.id });
      l6.metrics = applyMetricDelta(l6.metrics, option.delta);
      saveState(true);
      render({ focus: "#stepFeedback", preserveScroll: true });
      return;
    }

    if (action === "advance-antibiotic") {
      const l6 = state.levels[6];
      const phases = DATA.levels[5].phases;
      if (!l6.choices[l6.step] || l6.mapStarted) return;
      if (l6.step < phases.length - 1) {
        l6.step += 1;
        saveState();
        render({ focus: ".choice-button", preserveScroll: false });
      } else {
        l6.mapStarted = true;
        currentAxis = DATA.levels[5].axes.find((axis) => !l6.axesSeen.includes(axis.id))?.id || "brain";
        saveState();
        render({ focus: "#axisDetailTitle", preserveScroll: false });
      }
      return;
    }

    if (action === "view-axis") {
      const l6 = state.levels[6];
      const axisId = control.dataset.axisId;
      currentAxis = axisId;
      if (!l6.axesSeen.includes(axisId)) l6.axesSeen.push(axisId);
      if (l6.axesSeen.length === 3) completeLevel(6);
      saveState(true);
      render({ focus: "#axisDetailTitle", preserveScroll: true });
      return;
    }

    if (action === "complete-map") {
      if (state.levels[6].axesSeen.length === 3) {
        completeLevel(6);
        render({ focus: ".level-complete .primary-button", preserveScroll: true });
      }
      return;
    }

    if (action === "finish-exploration") {
      if (!state.completed[5]) return;
      state.finished = true;
      state.completedAt = new Date().toISOString();
      saveState(true);
      render({ preserveScroll: false, scrollTop: true, focus: "#screenTitle" });
      return;
    }

    if (action === "download-share") {
      downloadShareCard();
      return;
    }

    if (action === "copy-report") {
      copyReport();
    }
  }

  function handleChange(event) {
    const select = event.target.closest("[data-match-id]");
    if (!select) return;
    const l5 = state.levels[5];
    if (l5.matchChecked) return;
    l5.matches[select.dataset.matchId] = select.value;
    saveState();
    render({
      preserveScroll: true,
      focus: `[data-match-id="${select.dataset.matchId}"]`
    });
  }

  function init() {
    if (!DATA) {
      app.innerHTML = '<p style="padding:30px">内容数据未能加载，请刷新页面。</p>';
      return;
    }

    state.currentLevel = Math.max(0, Math.min(5, Number(state.currentLevel) || 0));
    state.unlockedLevel = Math.max(1, Math.min(6, Number(state.unlockedLevel) || 1));
    currentAxis =
      DATA.levels[5].axes.find((axis) => !state.levels[6].axesSeen.includes(axis.id))?.id ||
      "brain";

    hydrateStaticIcons();
    document.addEventListener("click", handleClick);
    document.addEventListener("change", handleChange);
    sourceDialog.addEventListener("click", (event) => {
      if (event.target === sourceDialog) sourceDialog.close();
    });

    render({ preserveScroll: false, scrollTop: false });

    if (state.completed.some(Boolean) && !state.finished) {
      window.setTimeout(() => showToast("已恢复上次本地探索进度。"), 500);
    }
  }

  init();
})();
