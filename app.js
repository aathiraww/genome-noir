/* ============================================================
   GENOME NOIR — The Synthetic Pet Lab
   All biology herein is fictional, educational and non-operational.
   Creature images are prototype assets living in replaceable
   "render slots" (see [data-render-slot]) — swap the <img> src
   to replace them with commissioned/generated renders.
   ============================================================ */

"use strict";

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ============================================================
   SPECIES DATA — prototype render slots
   ============================================================ */
const SPECIES = {
  nova: {
    id: "nova", name: "Aathira\u2019s Nova", painted: "Nova", ghost: "NOVA",
    img: "assets/nova.jpg",
    alt: "Aathira's Nova — a photorealistic alpaca companion with pastel wool, glowing pink sensory visor and biotech collar",
    ac: "#ff2ea6", ac2: "#8b5cf6", ac3: "#46e6e6",
    specimen: "GN-0001",
    base: "OVINE-CAMELID HYBRID",
    inspiration: "SHEEP × ALPACA",
    surface: "PASTEL_CLOUD WOOL",
    fashion: "NOVA SENSORY VISOR MK-II",
    habitat: "Nocturnal botanical dome",
    temperament: "CALM / CURIOUS",
    adaptClass: "SENSORY-PRIME",
    stability: 94, rarity: "FLAGSHIP",
    status: "FLAGSHIP COMPANION",
    blurb: "The first icon of Genome Noir. Nova reads ultraviolet weather through her visor, hums when curious, and treats every stranger as a future friend.",
  },
  "void-claw": {
    id: "void-claw", name: "Shrujal\u2019s Void Claw", painted: "Void Claw", ghost: "VOID CLAW",
    img: "assets/void-claw.jpg",
    alt: "Shrujal's Void Claw — a photorealistic biotech-enhanced apex velociraptor with charcoal void-scale skin, black quill crest, venom-green neuro-visor and glossy shadow-bioplate fashion",
    ac: "#86f000", ac2: "#1f7a3d", ac3: "#d8ffb0",
    specimen: "GN-0092",
    base: "APEX RAPTOR",
    inspiration: "VELOCIRAPTOR × NEURO-STEALTH",
    origin: "EXPERIMENTAL_PREDATOR_LINE",
    surface: "VOID_SCALE",
    fashion: "NEURO_VISOR + SHADOW_BIOPLATE",
    habitat: "Nocturnal biozone",
    temperament: "SILENT / LETHAL / INTELLIGENT",
    adaptClass: "APEX_RAPTOR",
    stability: 91, rarity: "ULTRA RARE",
    status: "ACTIVE SPECIMEN",
    blurb: "A bio-engineered apex raptor built for shadow pursuit, stealth dominance and high-sensory precision. The silent apex of the Genome Noir collection.",
  },
  "code-red": {
    id: "code-red", name: "Code Red", painted: "Code Red", ghost: "CODE RED",
    img: "assets/code-red.jpg",
    alt: "Code Red — a photorealistic thermal canid in glossy red environmental armour with a red LED visor",
    ac: "#ff2222", ac2: "#ff6a00", ac3: "#ff9d9d",
    specimen: "GN-0666",
    base: "THERMAL CANID",
    inspiration: "DOBERMAN × THERMOGRAPH",
    surface: "MATTE_CARBON COAT",
    fashion: "RED_VINYL_GLOSS ENVIRO-ARMOUR",
    habitat: "Volcanic terrarium",
    temperament: "PROTECTIVE / INDEPENDENT",
    adaptClass: "THERMAL-SENTINEL",
    stability: 88, rarity: "RARE",
    status: "SENTINEL COMPANION",
    blurb: "Bred to read heat the way we read light. Code Red maps a room in infrared before entering it, and never lets its people out of sensor range.",
  },
  "pink-helix": {
    id: "pink-helix", name: "Pink Helix", painted: "Pink Helix", ghost: "HELIX",
    img: "assets/pink-helix.jpg",
    alt: "Pink Helix — a photorealistic couture canid wearing an extravagant hot pink fur coat, black sunglasses and a spiked choker",
    ac: "#ff2d78", ac2: "#c026d3", ac3: "#ffd1e0",
    specimen: "GN-0077",
    base: "COUTURE CANID",
    inspiration: "DOBERMAN × AXOLOTL",
    surface: "JET_BLACK DERMIS",
    fashion: "HOT_PINK COUTURE MANTLE [EPIC]",
    habitat: "Urban biosphere",
    temperament: "CONFIDENT / SOCIAL",
    adaptClass: "REGEN-SOCIAL",
    stability: 90, rarity: "EPIC",
    status: "SOCIAL COMPANION",
    blurb: "Carries axolotl-inspired regeneration pathways under a couture mantle. Heals fast, forgives faster, and expects to be photographed.",
  },
  "king-myco": {
    id: "king-myco", name: "King Myco", painted: "King Myco", ghost: "MYCO",
    img: "assets/king-myco.jpg",
    alt: "King Myco — a regal photorealistic canid in a black mink coat with gold-rimmed glasses and an ornate gold chain collar",
    ac: "#d9a441", ac2: "#8a6a1f", ac3: "#f3e3b8",
    specimen: "GN-0009",
    base: "FUNGAL-SYMBIOTIC CANID",
    inspiration: "DOBERMAN × MYCELIUM",
    surface: "OBSIDIAN GUARD-COAT",
    fashion: "GILDED_MANTLE [LEGENDARY]",
    habitat: "Fungal garden",
    temperament: "REGAL / PROTECTIVE",
    adaptClass: "SYMBIOTIC-REGAL",
    stability: 96, rarity: "LEGENDARY",
    status: "GUARDIAN COMPANION",
    blurb: "A living alliance: canid instinct above, a golden mycelial network below the skin. King Myco shares nutrients with its household plants and rules them gently.",
  },
  "velvet-signal": {
    id: "velvet-signal", name: "Velvet Signal", painted: "Velvet Signal", ghost: "VELVET",
    img: "assets/velvet-signal.jpg",
    alt: "Velvet Signal — a fluffy photorealistic winter feline in a pastel pink climate puffer jacket with retro ski goggles",
    ac: "#ffb0c4", ac2: "#3b4a7a", ac3: "#ffffff",
    specimen: "GN-0311",
    base: "WINTER FELINE",
    inspiration: "CAT × SNOW LEOPARD",
    surface: "CLOUD_FUR INSULATION",
    fashion: "CLIMATE-RESPONSE GOGGLES + THERMAL PUFFER",
    habitat: "Arctic bio-pod",
    temperament: "SOFT / TECHNICAL",
    adaptClass: "CLIMATE-ADAPTIVE",
    stability: 92, rarity: "RARE",
    status: "COMFORT COMPANION",
    blurb: "70% down, 30% attitude. Velvet Signal's goggles tint with the weather and its fur loft adjusts by the degree. Prefers laps at exactly 21°C.",
  },
  "acid-ghost": {
    id: "acid-ghost", name: "Acid Ghost", painted: "Acid Ghost", ghost: "GHOST",
    img: "assets/acid-ghost.jpg",
    alt: "Acid Ghost — a photorealistic sentinel canid with bioluminescent green vein patterning wearing a graffiti-print hoodie",
    ac: "#86f000", ac2: "#1f7a3d", ac3: "#d8ffb0",
    specimen: "GN-0808",
    base: "ENVIRO-SENTINEL CANID",
    inspiration: "DOBERMAN × DEEP-SEA BACTERIUM",
    surface: "TOXIC_VEINS BIO-PATTERN",
    fashion: "GRAFFITI_BIOSHELL HOODIE [EPIC]",
    habitat: "Neon freshwater cave",
    temperament: "NOCTURNAL / INDEPENDENT",
    adaptClass: "TOXIN-SENTINEL",
    stability: 82, rarity: "EPIC",
    status: "SENTINEL COMPANION",
    blurb: "Its veins glow brighter near pollutants — a walking water-quality report. Acid Ghost patrols at night and sleeps wherever the moss is thickest.",
  },
};
const SPECIES_ORDER = ["nova", "void-claw", "code-red", "pink-helix", "king-myco", "velvet-signal", "acid-ghost"];
const TURNTABLE_FRAMES = 8;
function turntableSrc(id, i) {
  return `assets/turntable/${id}-${((i % TURNTABLE_FRAMES) + TURNTABLE_FRAMES) % TURNTABLE_FRAMES}.jpg`;
}
function preloadTurntable(id) {
  for (let i = 0; i < TURNTABLE_FRAMES; i++) {
    const img = new Image();
    img.src = turntableSrc(id, i);
  }
}

/* ============================================================
   TRAIT CATALOG — deltas: st stability / ad adaptation / en energy
   cp compatibility / mu mutation / hb habitat / cm companion / ra rarity
   ============================================================ */
const TRAITS = {
  form: {
    label: "BASE FORM", single: true,
    items: {
      mammalian: { d: { cm: 4 } }, avian: { d: { ad: 4, en: 3 } }, reptilian: { d: { en: -4 } },
      amphibian: { d: { hb: 3 } }, aquatic: { d: { hb: 4 } }, insectoid: { d: { ra: 8, cm: -3, mu: 2 } },
      "mollusc-like": { d: { ra: 8, mu: 2 } }, fungal: { d: { ra: 10, en: -3, mu: 3 } },
      botanical: { d: { ra: 10, en: -6, mu: 3 } }, amorphous: { d: { ra: 16, st: -8, mu: 6 } },
      custom: { d: { ra: 12, mu: 4 } },
    },
  },
  surface: {
    label: "SURFACE", single: true,
    items: {
      fur: { d: { cm: 3 } },
      wool: { d: { cm: 3 }, note: "THICK WOOL IMPROVES COLD TOLERANCE BUT REDUCES HEAT TOLERANCE" },
      feathers: { d: { ad: 3 } }, scales: { d: { st: 2 } }, "smooth skin": { d: {} },
      "transparent membrane": { d: { ra: 10, st: -5 }, note: "TRANSPARENT TISSUE INCREASES UV SENSITIVITY" },
      exoskeleton: { d: { st: 3, ad: -4, en: 3, ra: 6 }, note: "ARMOUR INCREASES PROTECTION BUT REDUCES AGILITY" },
      "metallic shell": { d: { st: 4, ad: -6, en: 5, ra: 12 }, note: "ARMOUR INCREASES PROTECTION BUT REDUCES AGILITY" },
      mycelium: { d: { ra: 10, mu: 2 } }, petals: { d: { ra: 10, st: -3 } }, moss: { d: { ra: 8 } },
      "bioluminescent skin": { d: { en: 12, ra: 12 }, note: "BIOLUMINESCENCE INCREASES ENERGY DEMAND" },
    },
  },
  appendages: {
    label: "APPENDAGES", max: 4,
    items: {
      legs: { d: {} }, wings: { d: { ad: 5, en: 6, ra: 6 } }, fins: { d: { hb: 3 } },
      tentacles: { d: { ra: 8, mu: 2 } }, antennae: { d: { ad: 3 } }, horns: { d: { ra: 4 } },
      branches: { d: { ra: 8, mu: 2 } }, "petal fans": { d: { ra: 8 } }, tendrils: { d: { ra: 6, mu: 1 } },
    },
  },
  sensory: {
    label: "SENSORY SYSTEMS", max: 4,
    items: {
      "uv vision": { d: { ad: 4, en: 2 } }, "infrared sensing": { d: { ad: 4, en: 3 } },
      "vibration detection": { d: { ad: 3 } }, "magnetic orientation": { d: { ad: 3, ra: 4 } },
      "echo-sensing": { d: { ad: 4, en: 3 } }, "bioelectric sensing": { d: { ad: 4, ra: 4, en: 2 } },
      "pollution detection": { d: { ad: 3, cm: 2 } },
    },
  },
  adaptations: {
    label: "ADAPTATIONS", max: 4,
    items: {
      "cold tolerance": { d: { ad: 4 } }, "heat tolerance": { d: { ad: 4 } },
      "pressure tolerance": { d: { ad: 4, hb: 5 }, note: "PRESSURE ADAPTATION SUPPORTS DEEP-SEA SURVIVAL" },
      "low-oxygen survival": { d: { ad: 4 } },
      camouflage: { d: { ad: 4 } },
      "water conservation": { d: { ad: 3, en: -3 } },
      "rapid regeneration": { d: { st: 4, en: 10 }, note: "RAPID REGENERATION INCREASES NUTRIENT REQUIREMENTS" },
    },
  },
  microbiome: {
    label: "MICROBIOME SUPPORT", max: 3,
    items: {
      "digestive support": { d: { st: 2, en: -3, cm: 2 } }, "skin protection": { d: { st: 2 } },
      "vitamin synthesis": { d: { st: 2, en: -2 } }, "aquatic detoxification": { d: { hb: 3 } },
      "soil symbiosis": { d: { hb: 3, ra: 3 } },
    },
  },
  behaviour: {
    label: "BEHAVIOURAL TENDENCIES", max: 3,
    items: {
      curious: { d: { cm: 3 } }, calm: { d: { cm: 4 } }, playful: { d: { cm: 4, en: 2 } },
      protective: { d: { cm: 2 } }, independent: { d: { cm: -2 } }, social: { d: { cm: 5 } },
      nocturnal: { d: { ra: 2 } },
    },
  },
  fashion: {
    label: "FASHION BIOTECHNOLOGY", max: 3,
    items: {
      "neon sensory visor": { d: { ad: 2, ra: 4 } }, "genomic collar": { d: { st: 2, ra: 3 } },
      "transparent climate jacket": { d: { ad: 3, ra: 4 } }, "bioluminescent harness": { d: { en: 4, ra: 5 } },
      "metallic specimen tag": { d: { ra: 2 } }, "couture eyewear": { d: { cm: 2, ra: 4 } },
      "diagnostic halo": { d: { st: 3, ra: 6, en: 2 } },
    },
  },
};

const MODULES = [
  { id: "pigment", name: "PIGMENTATION MODULE", desc: "Conceptual chromatophore tuning — shifts surface hue and pattern intensity.", d: { ra: 4, mu: 1 } },
  { id: "fluoro", name: "FLUORESCENT PROTEIN MODULE", desc: "Fictional GFP-inspired glow expressed along markings.", d: { en: 8, ra: 8, mu: 2 }, note: "BIOLUMINESCENCE INCREASES ENERGY DEMAND" },
  { id: "regen", name: "REGENERATION PATHWAY", desc: "Axolotl-inspired tissue renewal concept.", d: { st: 5, en: 9, mu: 2 }, note: "RAPID REGENERATION INCREASES NUTRIENT REQUIREMENTS" },
  { id: "sensor", name: "SENSORY RECEPTOR MODULE", desc: "Broadens the perceptual band: UV, IR, vibration.", d: { ad: 6, en: 3, mu: 1 } },
  { id: "micro", name: "MICROBIOME SUPPORT MODULE", desc: "Curated symbiotic cultures improving recovery and digestion.", d: { st: 3, en: -4, cm: 3 }, note: "MICROBIAL SUPPORT IMPROVES RECOVERY AND DIGESTION" },
  { id: "biosensor", name: "ENVIRONMENTAL BIOSENSOR MODULE", desc: "Skin reads air and water quality as visible signal.", d: { ad: 4, ra: 5, mu: 1 } },
];

const HABITATS = [
  { id: "cave", name: "Neon freshwater cave", desc: "Cool, wet, lit by cultivated glow-algae.", env: { temperature: 30, humidity: 85, light: 20, oxygen: 60, salinity: 5, ph: 55, nutrients: 55 } },
  { id: "forest", name: "Bioluminescent forest", desc: "Warm dusk canopy, living light.", env: { temperature: 55, humidity: 75, light: 30, oxygen: 75, salinity: 5, ph: 50, nutrients: 70 } },
  { id: "volcano", name: "Volcanic terrarium", desc: "Basalt heat, mineral haze.", env: { temperature: 92, humidity: 25, light: 45, oxygen: 45, salinity: 10, ph: 35, nutrients: 40 } },
  { id: "deepsea", name: "Deep-sea chamber", desc: "Crushing dark, electric life.", env: { temperature: 12, humidity: 100, light: 5, oxygen: 40, salinity: 90, ph: 60, nutrients: 45 } },
  { id: "dome", name: "Nocturnal botanical dome", desc: "Moonlit gardens on a slow clock.", env: { temperature: 50, humidity: 65, light: 15, oxygen: 80, salinity: 0, ph: 50, nutrients: 75 } },
  { id: "arctic", name: "Arctic bio-pod", desc: "Sub-zero serenity, heated dens.", env: { temperature: 8, humidity: 40, light: 60, oxygen: 85, salinity: 15, ph: 50, nutrients: 45 } },
  { id: "fungal", name: "Fungal garden", desc: "Soft rot-light and spore mist.", env: { temperature: 45, humidity: 90, light: 12, oxygen: 55, salinity: 0, ph: 40, nutrients: 90 } },
  { id: "urban", name: "Urban biosphere", desc: "Rooftop jungles over neon streets.", env: { temperature: 60, humidity: 50, light: 70, oxygen: 65, salinity: 5, ph: 50, nutrients: 60 } },
  { id: "sky", name: "Floating sky habitat", desc: "Thin bright air above the weather.", env: { temperature: 35, humidity: 30, light: 95, oxygen: 35, salinity: 0, ph: 50, nutrients: 35 } },
  { id: "space", name: "Space bio-pod", desc: "Sealed orbit garden, engineered calm.", env: { temperature: 50, humidity: 45, light: 55, oxygen: 50, salinity: 0, ph: 50, nutrients: 55 } },
];
const ENV_LABELS = { temperature: "TEMPERATURE", humidity: "HUMIDITY", light: "LIGHT", oxygen: "OXYGEN", salinity: "SALINITY", ph: "pH BALANCE", nutrients: "NUTRIENTS" };

/* ============================================================
   GLOBAL STATE
   ============================================================ */
const state = {
  specimen: "nova",
  draft: null,
  mode: "species",
  habitat: "dome",
  habEnv: { ...HABITATS.find((h) => h.id === "dome").env },
  pendingPet: null,
  carePet: null,
};

function freshDraft(base = "nova") {
  return {
    base, hybridWith: null, description: "",
    form: "mammalian", surface: "wool",
    appendages: ["legs"], sensory: ["uv vision"], adaptations: [],
    microbiome: [], behaviour: ["curious", "calm"], fashion: ["neon sensory visor"],
    modules: [],
  };
}
state.draft = freshDraft("nova");

/* ============================================================
   THEME ENGINE
   ============================================================ */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function applyTheme(sp) {
  const r = document.documentElement.style;
  const [cr, cg, cb] = hexToRgb(sp.ac);
  r.setProperty("--ac", sp.ac);
  r.setProperty("--ac2", sp.ac2);
  r.setProperty("--ac3", sp.ac3);
  r.setProperty("--ac-dim", `rgba(${cr},${cg},${cb},0.14)`);
  r.setProperty("--ac-glow", `rgba(${cr},${cg},${cb},0.32)`);
  document.body.dataset.specimen = sp.id;
  $("#navMeta").textContent = `SPECIMEN ${sp.specimen} [\u25CF]`;
}

/* crossfade helper for render-slot images */
function swapImage(img, src, alt) {
  if (img.getAttribute("src") === src) { if (alt) img.alt = alt; return; }
  img.classList.add("img-swap");
  window.setTimeout(() => {
    img.src = src;
    if (alt !== undefined) img.alt = alt;
    const done = () => img.classList.remove("img-swap");
    if (img.complete) requestAnimationFrame(done);
    else img.addEventListener("load", done, { once: true });
  }, reduceMotion.matches ? 0 : 240);
}

/* ============================================================
   TOAST
   ============================================================ */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 3200);
}

/* ============================================================
   STATS ENGINE — biological trade-offs
   ============================================================ */
function computeStats(draft) {
  const s = { st: 92, ad: 42, en: 28, cp: 92, mu: 6, hb: 72, cm: 78, ra: 18 };
  const notes = new Set();
  const apply = (def) => {
    if (!def) return;
    for (const k in def.d || {}) s[k] += def.d[k];
    if (def.note) notes.add(def.note);
  };

  apply(TRAITS.form.items[draft.form]);
  apply(TRAITS.surface.items[draft.surface]);
  for (const key of ["appendages", "sensory", "adaptations", "microbiome", "behaviour", "fashion"]) {
    for (const t of draft[key]) apply(TRAITS[key].items[t]);
  }
  for (const m of draft.modules) apply(MODULES.find((x) => x.id === m));

  if (draft.hybridWith && draft.hybridWith !== draft.base) { s.ra += 14; s.mu += 6; s.st -= 5; notes.add("HYBRID GENOME — ELEVATED MUTATION LOAD, ELEVATED RARITY"); }

  const glowing = draft.surface === "bioluminescent skin" || draft.modules.includes("fluoro") || draft.fashion.includes("bioluminescent harness");
  if (glowing && draft.adaptations.includes("camouflage")) { s.cp -= 15; s.st -= 6; notes.add("FLUORESCENCE CONFLICTS WITH CAMOUFLAGE \u2014 STABILITY REDUCED"); }
  if (draft.appendages.includes("wings") && (draft.form === "aquatic" || draft.form === "mollusc-like")) { s.st -= 10; notes.add("WINGS ON A HEAVY AQUATIC FORM REDUCE STABILITY"); }
  if ((draft.surface === "wool" || draft.surface === "fur") && draft.adaptations.includes("heat tolerance")) { s.st -= 3; notes.add("THICK COAT LIMITS HEAT DISSIPATION \u2014 CONSIDER SHEDDING CYCLES"); }
  if (draft.surface === "transparent membrane" && draft.sensory.includes("uv vision")) { s.st += 3; notes.add("UV VISION PARTIALLY OFFSETS MEMBRANE UV SENSITIVITY"); }
  if (draft.microbiome.length) notes.add("MICROBIAL SUPPORT IMPROVES RECOVERY AND DIGESTION");

  const traitCount = draft.appendages.length + draft.sensory.length + draft.adaptations.length + draft.microbiome.length + draft.modules.length;
  s.mu += Math.max(0, traitCount - 5) * 1.5;
  s.st -= Math.max(0, traitCount - 7) * 2;
  s.ra += Math.min(24, traitCount * 1.6) + s.mu * 0.4;

  const out = {
    stability: clamp(Math.round(s.st)), adaptation: clamp(Math.round(s.ad)),
    energy: clamp(Math.round(s.en)), compatibility: clamp(Math.round(s.cp)),
    mutation: clamp(Math.round(s.mu)), habitat: clamp(Math.round(s.hb)),
    companion: clamp(Math.round(s.cm)), rarity: clamp(Math.round(s.ra)),
    notes: [...notes],
  };
  if (out.stability < 55) out.notes.unshift("EXPERIMENTAL MORPHOLOGY DETECTED \u2014 INCUBATE WITH CARE");
  if (out.energy > 60) out.notes.push("HIGH ENERGY DEMAND \u2014 SCHEDULE FREQUENT FEEDING");
  return out;
}

function rarityLabel(r) {
  if (r >= 80) return "SINGULARITY";
  if (r >= 62) return "LEGENDARY";
  if (r >= 46) return "EPIC";
  if (r >= 32) return "RARE";
  if (r >= 20) return "REFINED";
  return "STANDARD ISSUE";
}

/* habitat compatibility between a draft and an environment */
function habitatCompat(draft, env) {
  let score = 78;
  const why = [];
  if (env.temperature > 75) {
    if (draft.adaptations.includes("heat tolerance")) { score += 10; why.push("HEAT TOLERANCE ENGAGED"); }
    else { score -= 24; why.push("NO HEAT TOLERANCE \u2014 THERMAL STRESS LIKELY"); }
    if (draft.surface === "wool" || draft.surface === "fur") { score -= 10; why.push("THICK COAT TRAPS HEAT"); }
  }
  if (env.temperature < 20) {
    if (draft.adaptations.includes("cold tolerance") || draft.surface === "wool" || draft.surface === "fur") { score += 10; why.push("INSULATION ADEQUATE"); }
    else { score -= 22; why.push("NO COLD ADAPTATION \u2014 ADD INSULATION"); }
  }
  if (env.salinity > 60) {
    if (draft.form === "aquatic" || draft.adaptations.includes("pressure tolerance")) { score += 8; why.push("MARINE PHYSIOLOGY SUITED"); }
    else { score -= 20; why.push("SALINE ENVIRONMENT UNSUITED TO TERRESTRIAL FORM"); }
  }
  if (env.oxygen < 45 && !draft.adaptations.includes("low-oxygen survival")) { score -= 14; why.push("THIN ATMOSPHERE \u2014 LOW-OXYGEN SURVIVAL RECOMMENDED"); }
  if (env.light < 25 && (draft.behaviour.includes("nocturnal") || draft.sensory.includes("uv vision") || draft.surface === "bioluminescent skin")) { score += 8; why.push("LOW-LIGHT SENSES ENGAGED"); }
  if (env.light > 85 && draft.surface === "transparent membrane") { score -= 12; why.push("UV EXPOSURE RISK FOR TRANSPARENT TISSUE"); }
  if (env.humidity > 80 && draft.form === "amphibian") { score += 8; why.push("HUMIDITY IDEAL FOR AMPHIBIAN FORM"); }
  if (env.nutrients > 75 && draft.adaptations.includes("rapid regeneration")) { score += 8; why.push("NUTRIENT-RICH \u2014 SUPPORTS REGENERATION"); }
  if (env.ph < 40 && !draft.microbiome.includes("skin protection")) { score -= 8; why.push("ACIDIC MEDIUM \u2014 SKIN PROTECTION ADVISED"); }
  return { score: clamp(Math.round(score)), why: why.slice(0, 4) };
}

/* ============================================================
   HERO FLOAT — gentle presence (turntable handles the 360°)
   ============================================================ */
(function heroMotion() {
  const renders = [$("#heroRender"), $("#voidHeroRender")].filter(Boolean);
  if (!renders.length) return;
  function frame(t) {
    for (const render of renders) {
      if (reduceMotion.matches) { render.style.transform = ""; continue; }
      const phase = render.id === "voidHeroRender" ? 0.7 : 0;
      const float = Math.sin(t * 0.00055 + phase) * 6;
      const tilt = Math.sin(t * 0.00035 + phase) * (render.id === "voidHeroRender" ? 1.2 : 0.8);
      const breathe = 1 + Math.sin(t * 0.001 + phase) * 0.006;
      render.style.transform = `translateY(${float.toFixed(2)}px) rotateZ(${tilt.toFixed(2)}deg) scale(${breathe.toFixed(4)})`;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* ============================================================
   CONTINUOUS TURNTABLE — real multi-angle creature spin
   Uses 8 photoreal angle frames per species and crossfades
   between them so the animal itself turns — not the image card.
   ============================================================ */
function createTurntable({ a, b, periodMs = 16000, initialSpecies = "nova" }) {
  let speciesId = "nova";
  let angle = 0;
  let last = 0;
  let heldFloor = -1;
  let running = true;
  let paused = false;

  function setSpecies(id, { reset = true } = {}) {
    speciesId = id;
    preloadTurntable(id);
    if (reset) angle = 0;
    heldFloor = -1;
    a.src = turntableSrc(id, 0);
    b.src = turntableSrc(id, 1);
    a.style.opacity = "1";
    b.style.opacity = "0";
    a.classList.add("is-front");
    b.classList.remove("is-front");
  }

  function paint(t) {
    if (!running) return;
    if (paused) { last = t; requestAnimationFrame(paint); return; }
    if (!last) last = t;
    const dt = Math.min(50, t - last);
    last = t;

    if (!reduceMotion.matches) {
      angle = (angle + (dt / periodMs) * TURNTABLE_FRAMES) % TURNTABLE_FRAMES;
    }

    const floor = Math.floor(angle);
    const next = (floor + 1) % TURNTABLE_FRAMES;
    const blend = angle - floor;

    if (floor !== heldFloor) {
      a.src = turntableSrc(speciesId, floor);
      b.src = turntableSrc(speciesId, next);
      heldFloor = floor;
    }

    // Smooth ease across the blend so motion feels continuous
    const eased = blend * blend * (3 - 2 * blend);
    a.style.opacity = String(1 - eased);
    b.style.opacity = String(eased);

    requestAnimationFrame(paint);
  }

  setSpecies(initialSpecies);
  requestAnimationFrame(paint);
  return {
    setSpecies,
    setPaused(v) { paused = v; },
    stop() { running = false; },
  };
}

const showcaseTurntable = ($("#showImgA") && $("#showImgB")) ? createTurntable({
  a: $("#showImgA"),
  b: $("#showImgB"),
  periodMs: 16000,
  initialSpecies: "nova",
}) : null;
const heroTurntable = ($("#heroImgA") && $("#heroImgB")) ? createTurntable({
  a: $("#heroImgA"),
  b: $("#heroImgB"),
  periodMs: 18000,
  initialSpecies: "nova",
}) : null;
const voidHeroTurntable = ($("#voidHeroImgA") && $("#voidHeroImgB")) ? createTurntable({
  a: $("#voidHeroImgA"),
  b: $("#voidHeroImgB"),
  periodMs: 18000,
  initialSpecies: "void-claw",
}) : null;
SPECIES_ORDER.forEach(preloadTurntable);

/* Pause turntables while off-screen — saves battery and keeps scroll smooth */
(function pauseOffscreenTurntables() {
  if (!("IntersectionObserver" in window)) return;
  const map = new Map([
    [$("#heroRender"), heroTurntable],
    [$("#voidHeroRender"), voidHeroTurntable],
    [$("#showRender"), showcaseTurntable],
  ]);
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const tt = map.get(en.target);
      if (tt) tt.setPaused(!en.isIntersecting);
    }
  }, { rootMargin: "160px" });
  for (const [el, tt] of map.entries()) if (el && tt) io.observe(el);
})();

/* Genome Lab CTA lives under the creature on desktop, at the end on phones */
(function relocateLabCta() {
  const btn = $("#labIncubateBtn");
  const slot = $("#labCtaMobile");
  const stage = $(".lab-stage");
  if (!btn || !slot || !stage) return;
  const mq = window.matchMedia("(max-width: 860px)");
  const apply = () => {
    if (mq.matches) {
      slot.appendChild(btn);
      slot.hidden = false;
    } else {
      stage.appendChild(btn);
      slot.hidden = true;
    }
  };
  mq.addEventListener?.("change", apply);
  apply();
})();

/* magnetic buttons */
(function magnetic() {
  if (reduceMotion.matches || !window.matchMedia("(pointer: fine)").matches) return;
  $$(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });
})();

/* explore parallax — desktop pointer devices only */
(function exploreParallax() {
  const canvas = $("#exploreCanvas");
  if (!canvas) return;
  const cards = $$(".xcard", canvas);
  const wide = window.matchMedia("(min-width: 1181px)");
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const active = () => wide.matches && fine.matches && !reduceMotion.matches;
  let ticking = false;
  function update() {
    ticking = false;
    if (!active()) {
      cards.forEach((c) => { c.style.transform = ""; });
      return;
    }
    const r = canvas.getBoundingClientRect();
    const mid = r.top + r.height / 2 - window.innerHeight / 2;
    cards.forEach((c) => {
      const depth = parseFloat(c.dataset.depth || "0.5");
      c.style.transform = `translate3d(0, ${(-mid * depth * 0.12).toFixed(1)}px, 0)`;
    });
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  wide.addEventListener?.("change", update);
  update();
})();

/* ============================================================
   SPECIES SHOWCASE
   ============================================================ */
function renderShowcase() {
  const sp = SPECIES[state.specimen];
  applyTheme(sp);
  $("#showGhost").textContent = sp.ghost;
  $("#showName").textContent = sp.painted;
  if (showcaseTurntable) showcaseTurntable.setSpecies(sp.id);
  const showA = $("#showImgA");
  if (showA) showA.alt = sp.alt;
  swapImage($("#showCardImg"), sp.img, "");
  $("#showCardName").textContent = sp.name.toUpperCase();
  $("#showCardBlurb").textContent = sp.blurb;
  $("#showSpec").innerHTML = `
    <p>ID: <b>#${sp.specimen}</b></p>
    <p>NAME: <b>${esc(sp.name.toUpperCase().replace(/\s/g, "_").replace(/’/g, "").replace(/'/g, ""))}</b></p>
    <p>BASE: <b>${sp.base}</b></p>
    ${sp.origin ? `<p>ORIGIN: <b>${sp.origin}</b></p>` : ""}
    <p>SURFACE: <b>${sp.surface}</b></p>
    <p>FASHION-TECH: <b>${sp.fashion}</b></p>
    <p>TEMPERAMENT: <b>${sp.temperament}</b></p>`;
  $("#showCardData").innerHTML = `
    <dt>ADAPTATION CLASS</dt><dd>${sp.adaptClass}</dd>
    <dt>BIOLOGICAL INSPIRATION</dt><dd>${sp.inspiration}</dd>
    ${sp.origin ? `<dt>ORIGIN</dt><dd>${sp.origin}</dd>` : ""}
    <dt>HABITAT</dt><dd>${sp.habitat.toUpperCase()}</dd>
    <dt>RARITY</dt><dd>${sp.rarity}</dd>
    <dt>COMPANION STATUS</dt><dd>${sp.status}</dd>`;
  $("#showStabVal").textContent = sp.stability + "%";
  $("#showStabFill").style.width = sp.stability + "%";
  $$("#showThumbs button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.id === sp.id)));
}

function selectSpecimen(id) {
  if (!SPECIES[id]) return;
  state.specimen = id;
  state.draft.base = id;
  renderShowcase();
  renderCreate();
  renderPreview();
  renderLab(`SPECIMEN ${SPECIES[id].specimen} LOADED \u2014 PHENOTYPE UPDATED`);
  renderHabitatPanel();
}

(function buildThumbs() {
  const wrap = $("#showThumbs");
  wrap.innerHTML = SPECIES_ORDER.map((id) => {
    const sp = SPECIES[id];
    return `<button role="tab" data-id="${id}" aria-selected="${id === state.specimen}" aria-label="Select ${esc(sp.name)}">
      <img src="${sp.img}" alt="" loading="lazy" /></button>`;
  }).join("");
  wrap.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-id]");
    if (b) selectSpecimen(b.dataset.id);
  });
})();

/* ============================================================
   CREATE — modes, chips, description parsing
   ============================================================ */
const MODES = [
  { id: "species", label: "START WITH A SPECIES" },
  { id: "hybrid", label: "CREATE A HYBRID" },
  { id: "nothing", label: "BUILD FROM NOTHING" },
  { id: "describe", label: "DESCRIBE YOUR ORGANISM" },
  { id: "unknown", label: "GENERATE UNKNOWN LIFE" },
];

(function buildModes() {
  const wrap = $("#createModes");
  wrap.innerHTML = MODES.map((m) =>
    `<button role="tab" data-mode="${m.id}" aria-selected="${m.id === state.mode}">${m.label}</button>`).join("");
  wrap.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-mode]");
    if (!b) return;
    setMode(b.dataset.mode);
  });
})();

function setMode(mode) {
  state.mode = mode;
  $$("#createModes button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.mode === mode)));
  if (mode === "nothing") {
    state.draft = { ...freshDraft(state.draft.base), form: "custom", surface: "smooth skin", appendages: [], sensory: [], behaviour: [], fashion: [], modules: [] };
    toast("BLANK GENOME INITIALISED");
  } else if (mode === "unknown") {
    randomiseDraft();
    toast("UNKNOWN LIFE SEQUENCE GENERATED");
  } else if (mode === "describe") {
    $("#describeInput").focus();
  } else if (mode === "hybrid" && !state.draft.hybridWith) {
    state.draft.hybridWith = rand(SPECIES_ORDER.filter((s) => s !== state.draft.base));
  }
  if (mode === "species" || mode === "describe") state.draft.hybridWith = null;
  renderCreate();
  renderPreview();
  renderLab("PHENOTYPE UPDATED");
}

function randomiseDraft() {
  const pick = (obj, n) => {
    const keys = Object.keys(obj);
    const out = [];
    while (out.length < n && keys.length) out.push(keys.splice(Math.floor(Math.random() * keys.length), 1)[0]);
    return out;
  };
  const base = rand(SPECIES_ORDER);
  state.draft = {
    base, hybridWith: Math.random() > 0.5 ? rand(SPECIES_ORDER.filter((s) => s !== base)) : null,
    description: "",
    form: rand(Object.keys(TRAITS.form.items)),
    surface: rand(Object.keys(TRAITS.surface.items)),
    appendages: pick(TRAITS.appendages.items, 2),
    sensory: pick(TRAITS.sensory.items, 2),
    adaptations: pick(TRAITS.adaptations.items, 2),
    microbiome: pick(TRAITS.microbiome.items, 1),
    behaviour: pick(TRAITS.behaviour.items, 2),
    fashion: pick(TRAITS.fashion.items, 2),
    modules: MODULES.filter(() => Math.random() > 0.6).map((m) => m.id),
  };
  state.specimen = base;
  renderShowcase();
}

function renderCreate() {
  const d = state.draft;
  const wrap = $("#createControls");
  let html = "";

  html += `<div class="trait-group"><h3>BASE CREATURE <span class="count">RENDER SLOT</span></h3><div class="chips">`;
  for (const id of SPECIES_ORDER) {
    const sp = SPECIES[id];
    html += `<button class="chip chip-thumb" data-cat="base" data-val="${id}" aria-pressed="${d.base === id}">
      <img src="${sp.img}" alt="" loading="lazy" />${esc(sp.name)}</button>`;
  }
  html += `</div></div>`;

  if (state.mode === "hybrid") {
    html += `<div class="trait-group"><h3>SPLICE WITH <span class="count">HYBRID</span></h3><div class="chips">`;
    for (const id of SPECIES_ORDER.filter((s) => s !== d.base)) {
      html += `<button class="chip chip-thumb" data-cat="hybridWith" data-val="${id}" aria-pressed="${d.hybridWith === id}">
        <img src="${SPECIES[id].img}" alt="" loading="lazy" />${esc(SPECIES[id].name)}</button>`;
    }
    html += `</div></div>`;
  }

  for (const cat of ["form", "surface", "appendages", "sensory", "adaptations", "microbiome", "behaviour", "fashion"]) {
    const group = TRAITS[cat];
    const selCount = group.single ? "" : `<span class="count">${d[cat].length}${group.max ? " / " + group.max : ""}</span>`;
    html += `<div class="trait-group"><h3>${group.label} ${selCount}</h3><div class="chips">`;
    for (const t in group.items) {
      const pressed = group.single ? d[cat] === t : d[cat].includes(t);
      html += `<button class="chip" data-cat="${cat}" data-val="${esc(t)}" aria-pressed="${pressed}">${esc(t)}</button>`;
    }
    html += `</div></div>`;
  }
  wrap.innerHTML = html;
}

$("#createControls").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-cat]");
  if (!b) return;
  const { cat, val } = b.dataset;
  const d = state.draft;
  let msg = "TRAIT EXPRESSION ACTIVE";
  if (cat === "base") {
    selectSpecimen(val);
    return;
  } else if (cat === "hybridWith") {
    d.hybridWith = d.hybridWith === val ? null : val;
    msg = "HYBRID GENOME SPLICED";
  } else if (TRAITS[cat].single) {
    d[cat] = val;
  } else {
    const list = d[cat];
    const i = list.indexOf(val);
    if (i >= 0) { list.splice(i, 1); msg = "TRAIT EXPRESSION SUPPRESSED"; }
    else {
      if (TRAITS[cat].max && list.length >= TRAITS[cat].max) { toast(`LIMIT REACHED \u2014 ${TRAITS[cat].label} MAX ${TRAITS[cat].max}`); return; }
      list.push(val);
    }
  }
  renderCreate();
  renderPreview();
  renderLab(msg);
});

/* description interpreter */
const KEYWORDS = [
  [/wool|sheep|alpaca|lamb/i, (d) => { d.base = "nova"; d.surface = "wool"; }],
  [/moth|butterfly|insect|beetle/i, (d) => { d.form = "insectoid"; add(d, "appendages", "antennae"); add(d, "appendages", "wings"); }],
  [/wing/i, (d) => add(d, "appendages", "wings")],
  [/glow|luminous|biolumin|neon/i, (d) => { d.surface = "bioluminescent skin"; }],
  [/ultraviolet|uv/i, (d) => add(d, "sensory", "uv vision")],
  [/infrared|thermal|heat[- ]?sens/i, (d) => add(d, "sensory", "infrared sensing")],
  [/transparent|glass|see[- ]?through/i, (d) => { d.surface = "transparent membrane"; }],
  [/visor|eyewear|goggles/i, (d) => add(d, "fashion", "neon sensory visor")],
  [/nocturnal|night/i, (d) => add(d, "behaviour", "nocturnal")],
  [/cat|feline/i, (d) => { d.base = "velvet-signal"; }],
  [/dog|canid|wolf|hound/i, (d) => { d.base = "code-red"; }],
  [/deep[- ]?sea|ocean|jelly|octopus|shark|fish|coral/i, (d) => { d.form = "aquatic"; add(d, "adaptations", "pressure tolerance"); add(d, "appendages", "fins"); }],
  [/tentacle/i, (d) => add(d, "appendages", "tentacles")],
  [/fungus|fungal|mushroom|mycelium|spore/i, (d) => { d.form = "fungal"; d.base = "king-myco"; }],
  [/toxin|pollution|acid/i, (d) => { d.base = "acid-ghost"; add(d, "sensory", "pollution detection"); }],
  [/gold|regal|royal|king|queen/i, (d) => { d.base = "king-myco"; }],
  [/arctic|snow|winter|cold|ice/i, (d) => { add(d, "adaptations", "cold tolerance"); d.base = "velvet-signal"; }],
  [/volcan|fire|heat|lava|desert/i, (d) => { add(d, "adaptations", "heat tolerance"); d.base = "code-red"; }],
  [/regenerat|heal/i, (d) => add(d, "adaptations", "rapid regeneration")],
  [/camouflage|stealth|invisible/i, (d) => add(d, "adaptations", "camouflage")],
  [/plant|flower|petal|botanic/i, (d) => { d.form = "botanical"; d.surface = "petals"; }],
  [/feather|bird|avian|owl|raven/i, (d) => { d.form = "avian"; d.surface = "feathers"; }],
  [/reptile|lizard|snake|scale/i, (d) => { d.form = "reptilian"; d.surface = "scales"; }],
  [/raptor|velociraptor|dinosaur|dino|void\s*claw/i, (d) => { d.base = "void-claw"; d.form = "reptilian"; d.surface = "scales"; add(d, "adaptations", "camouflage"); add(d, "sensory", "infrared sensing"); }],
  [/axolotl|amphibian|frog|newt/i, (d) => { d.form = "amphibian"; add(d, "adaptations", "rapid regeneration"); }],
  [/pink/i, (d) => { if (d.base !== "nova") d.base = "pink-helix"; }],
  [/collar/i, (d) => add(d, "fashion", "genomic collar")],
  [/halo/i, (d) => add(d, "fashion", "diagnostic halo")],
];
function add(d, cat, val) {
  if (!d[cat].includes(val)) {
    if (TRAITS[cat].max && d[cat].length >= TRAITS[cat].max) d[cat].shift();
    d[cat].push(val);
  }
}

$("#interpretBtn").addEventListener("click", () => {
  const text = $("#describeInput").value.trim();
  const note = $("#interpretNote");
  if (!text) { note.textContent = "ENTER A DESCRIPTION FIRST \u2014 OR USE GENERATE UNKNOWN LIFE"; return; }
  const before = JSON.stringify(state.draft);
  state.draft.description = text;
  let hits = 0;
  for (const [re, fn] of KEYWORDS) if (re.test(text)) { fn(state.draft); hits++; }
  state.mode = "describe";
  $$("#createModes button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.mode === "describe")));
  if (state.draft.base !== state.specimen) { state.specimen = state.draft.base; renderShowcase(); }
  renderCreate();
  renderPreview();
  renderLab(hits ? "DESCRIPTION SEQUENCED \u2014 TRAIT EXPRESSION ACTIVE" : "DESCRIPTION RECORDED");
  note.textContent = hits
    ? `DESCRIPTION INTERPRETED \u2014 ${hits} TRAIT SIGNAL${hits > 1 ? "S" : ""} MAPPED TO GENOME`
    : "RECORDED IN PROFILE \u2014 NO KNOWN TRAIT SIGNALS FOUND, EXPRESSED AS EXPERIMENTAL MORPHOLOGY";
  if (before === JSON.stringify(state.draft)) note.textContent = "GENOME ALREADY EXPRESSES THIS DESCRIPTION";
});

/* ============================================================
   PREVIEW
   ============================================================ */
function renderPreview() {
  const d = state.draft;
  const sp = SPECIES[d.base];
  const stats = computeStats(d);
  swapImage($("#previewImg"), sp.img, sp.alt);

  /* photorealistic grading only — no cartoon overlays */
  const img = $("#previewImg");
  let filter = "";
  if (d.surface === "bioluminescent skin" || d.modules.includes("fluoro")) filter += " brightness(1.07) saturate(1.16)";
  if (d.adaptations.includes("cold tolerance")) filter += " hue-rotate(-6deg)";
  if (d.adaptations.includes("heat tolerance")) filter += " sepia(0.08) saturate(1.08)";
  if (d.form === "amorphous" || d.form === "custom") filter += " contrast(1.05)";
  img.style.filter = filter.trim();

  const tags = [];
  if (d.hybridWith) tags.push(`HYBRID \u00D7 ${SPECIES[d.hybridWith].name.toUpperCase()}`);
  tags.push(`FORM: ${d.form.toUpperCase()}`);
  tags.push(`SURFACE: ${d.surface.toUpperCase()}`);
  for (const a of d.appendages.filter((x) => x !== "legs")) tags.push(a.toUpperCase() + " [RECORDED]");
  for (const sMod of d.sensory) tags.push(sMod.toUpperCase());
  for (const a of d.adaptations) tags.push(a.toUpperCase());
  $("#traitTags").innerHTML = tags.slice(0, 8).map((t) => `<li>${esc(t)}</li>`).join("");

  $("#previewMeta").innerHTML = `
    <p>BASE RENDER: <b>${esc(sp.name.toUpperCase())}</b> &nbsp;\u2022&nbsp; CLASS: <b>${sp.adaptClass}</b></p>
    <p>STABILITY <b>${stats.stability}%</b> &nbsp;\u2022&nbsp; ENERGY DEMAND <b>${stats.energy}%</b> &nbsp;\u2022&nbsp; RARITY <b>${rarityLabel(stats.rarity)}</b></p>`;
}

/* ============================================================
   GENOME LAB
   ============================================================ */
const STAT_DEFS = [
  ["stability", "GENOME STABILITY", false], ["adaptation", "ADAPTATION SCORE", false],
  ["energy", "ENERGY DEMAND", true], ["compatibility", "TRAIT COMPATIBILITY", false],
  ["mutation", "MUTATION LOAD", true], ["habitat", "HABITAT SUITABILITY", false],
  ["companion", "COMPANION POTENTIAL", false], ["rarity", "RARITY", false],
];
const labLogLines = ["GENOME LAB ONLINE \u2014 AWAITING INPUT"];

function pushLog(msg) {
  labLogLines.unshift(msg);
  if (labLogLines.length > 40) labLogLines.pop();
  $("#labLog").innerHTML = labLogLines.map((l) => `<p>${esc(l)}</p>`).join("");
}

function renderModules() {
  $("#labModules").innerHTML = MODULES.map((m) => `
    <button class="module" data-module="${m.id}" aria-pressed="${state.draft.modules.includes(m.id)}">
      <span class="module-name"><span>${m.name}</span><span class="state">${state.draft.modules.includes(m.id) ? "ACTIVE" : "DORMANT"}</span></span>
      <span class="module-desc">${m.desc}</span>
    </button>`).join("");
}

$("#labModules").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-module]");
  if (!b) return;
  const id = b.dataset.module;
  const list = state.draft.modules;
  const i = list.indexOf(id);
  const mod = MODULES.find((m) => m.id === id);
  if (i >= 0) { list.splice(i, 1); renderLab(`${mod.name} EJECTED \u2014 PHENOTYPE UPDATED`); }
  else {
    list.push(id);
    const st = computeStats(state.draft);
    renderLab(`MODULE INSERTED \u2014 ${mod.name}`);
    setTimeout(() => pushLog(st.compatibility >= 80 ? "COMPATIBILITY VERIFIED" : "STABILITY REDUCED"), reduceMotion.matches ? 0 : 500);
  }
  renderPreview();
});

function renderLab(logMsg) {
  const d = state.draft;
  const sp = SPECIES[d.base];
  const stats = computeStats(d);
  swapImage($("#labImg"), sp.img, sp.alt);
  $("#labImg").style.filter = $("#previewImg").style.filter;
  $("#labStageMeta").innerHTML =
    `SPECIMEN ${sp.specimen}-X &nbsp;\u2022&nbsp; ${esc(d.form.toUpperCase())} / ${esc(d.surface.toUpperCase())}` +
    (d.hybridWith ? ` &nbsp;\u2022&nbsp; HYBRID \u00D7 ${esc(SPECIES[d.hybridWith].name.toUpperCase())}` : "");

  $("#labStats").innerHTML = STAT_DEFS.map(([key, label, inverse]) => {
    const v = stats[key];
    const worry = inverse ? v : 100 - v;
    const cls = worry > 70 ? "crit" : worry > 45 ? "warn" : "";
    return `<div class="stat">
      <div class="stat-head"><span>${label}</span><b class="${cls}">${key === "rarity" ? rarityLabel(v) : v + "%"}</b></div>
      <div class="meter"><div class="meter-fill" style="width:${v}%"></div></div>
    </div>`;
  }).join("");

  $("#labNotes").innerHTML = stats.notes.length
    ? stats.notes.map((n) => `<p>${esc(n)}</p>`).join("")
    : "<p>ALL TRAIT PATHWAYS NOMINAL \u2014 COMPATIBILITY VERIFIED</p>";

  renderModules();
  if (logMsg) pushLog(logMsg);
}

/* ============================================================
   HABITATS
   ============================================================ */
(function buildHabitats() {
  $("#habList").innerHTML = HABITATS.map((h) => `
    <button role="tab" data-hab="${h.id}" aria-selected="${h.id === state.habitat}">
      <h4>${h.name}</h4><span class="mono">${h.desc}</span>
    </button>`).join("");
  $("#habList").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-hab]");
    if (!b) return;
    state.habitat = b.dataset.hab;
    state.habEnv = { ...HABITATS.find((h) => h.id === state.habitat).env };
    $$("#habList button").forEach((x) => x.setAttribute("aria-selected", String(x.dataset.hab === state.habitat)));
    renderHabitatPanel();
  });
})();

function renderHabitatPanel() {
  const h = HABITATS.find((x) => x.id === state.habitat);
  $("#habName").textContent = h.name.toUpperCase();
  $("#habDesc").textContent = h.desc;
  $("#habSliders").innerHTML = Object.keys(ENV_LABELS).map((k) => `
    <div class="hab-slider">
      <label for="env-${k}"><span>${ENV_LABELS[k]}</span><b id="envval-${k}">${state.habEnv[k]}%</b></label>
      <input type="range" id="env-${k}" data-env="${k}" min="0" max="100" value="${state.habEnv[k]}" />
    </div>`).join("");
  updateHabCompat();
}

$("#habSliders").addEventListener("input", (e) => {
  const r = e.target.closest("input[data-env]");
  if (!r) return;
  state.habEnv[r.dataset.env] = Number(r.value);
  $("#envval-" + r.dataset.env).textContent = r.value + "%";
  updateHabCompat();
});

function updateHabCompat() {
  const { score, why } = habitatCompat(state.draft, state.habEnv);
  $("#habCompatVal").textContent = score + "%";
  $("#habCompatFill").style.width = score + "%";
  $("#habCompatNote").innerHTML = why.length
    ? why.map((w) => `\u25B8 ${esc(w)}`).join("<br/>")
    : "\u25B8 CONDITIONS NOMINAL FOR CURRENT GENOME";
}

/* ============================================================
   INCUBATION
   ============================================================ */
const INC_STAGES = [
  ["GENOME VALIDATION", "SEQUENCE ALIGNED \u2014 NO FORBIDDEN PATHWAYS"],
  ["CELL SIMULATION", "DIVISION CASCADE STABLE"],
  ["TRAIT EXPRESSION", "TRAIT EXPRESSION ACTIVE"],
  ["MICROBIOME INTEGRATION", "SYMBIOTIC CULTURES SETTLING"],
  ["PHENOTYPE STABILISATION", "PHENOTYPE UPDATED \u2014 MORPHOLOGY LOCKED"],
  ["COMPANION BONDING", "IMPRINTING ON CREATOR SIGNATURE"],
  ["LIFE CONFIRMED", "LIFE SIGN CONFIRMED"],
];
let incTimer = null;

function beginIncubation() {
  const d = state.draft;
  const sp = SPECIES[d.base];
  const stats = computeStats(d);
  state.pendingPet = {
    base: d.base, draft: JSON.parse(JSON.stringify(d)), stats,
    specimenId: "GN-" + String(Math.floor(1000 + Math.random() * 9000)) + "-" + String(Math.floor(Math.random() * 90 + 10)),
  };
  const inc = $("#incubator");
  inc.hidden = false;
  inc.classList.remove("revealed");
  document.body.style.overflow = "hidden";
  swapImage($("#incImg"), sp.img, sp.alt);
  $("#incStages").innerHTML = INC_STAGES.map(([n]) => `<li>${n}</li>`).join("");

  const per = reduceMotion.matches ? 260 : 2150;
  let i = 0;
  const items = $$("#incStages li");
  function step() {
    if (i > 0) { items[i - 1].classList.remove("active"); items[i - 1].classList.add("done"); }
    if (i >= INC_STAGES.length) return finish();
    items[i].classList.add("active");
    $("#incStageNo").textContent = `STAGE ${i + 1} / 7`;
    $("#incStageName").textContent = INC_STAGES[i][0];
    $("#incMsg").textContent = INC_STAGES[i][1];
    $("#incFill").style.width = Math.round(((i + 1) / INC_STAGES.length) * 100) + "%";
    if (i >= 4) inc.classList.add("revealed");
    i++;
    incTimer = setTimeout(step, per);
  }
  function finish() {
    $("#incMsg").textContent = "LIFE SIGN CONFIRMED";
    incTimer = setTimeout(() => {
      inc.hidden = true;
      openAdopt();
    }, reduceMotion.matches ? 200 : 1400);
  }
  step();
}

$("#incSkip").addEventListener("click", () => {
  clearTimeout(incTimer);
  $("#incubator").hidden = true;
  openAdopt();
});
$("#labIncubateBtn").addEventListener("click", beginIncubation);
$("#navIncubate").addEventListener("click", (e) => {
  e.preventDefault();
  closeMenu();
  beginIncubation();
});

/* ============================================================
   NAMING / ADOPTION
   ============================================================ */
const NAME_BANK = ["Nova", "Vesper", "Lumen", "Oracle", "Mira", "Kaon", "Seraph", "Nyx", "Halcyon", "Aurelia", "Cinder", "Echo", "Sable", "Iris", "Onyx", "Rune", "Solace", "Vanta", "Zephyr", "Quill", "Marrow", "Fable", "Prism", "Velour", "Tempo"];
const CODE_WORDS = ["GHOSTWOOL", "REDSHIFT", "SOFTSTORM", "GOLDROOT", "NIGHTBLOOM", "STATIC", "HALOGEN", "PALEFIRE", "UNDERGLOW", "SIGNALFADE"];
const GENUS = { mammalian: "Mammira", avian: "Avionis", reptilian: "Sauryx", amphibian: "Amphelia", aquatic: "Abyssia", insectoid: "Entomera", "mollusc-like": "Mollara", fungal: "Mycora", botanical: "Florenta", amorphous: "Amorpha", custom: "Chimera" };
const EPITHET = ["luminara", "noctis", "velutina", "aurea", "borealis", "spectra", "cardinalis", "mirabilis", "umbra", "solara", "helicis", "signata"];
const TITLES = ["Prime Specimen", "First of Its Line", "Companion-Grade Icon", "Guardian of the Lab", "Nocturne Royal", "Field Sentinel", "Apex Sweetheart", "Keeper of Quiet Hours"];
const STORY_BITS = [
  "It opened its eyes during a power flicker, and the whole lab glowed {ac} for a second.",
  "It was designed on a rainy night from a single sentence and three cups of tea.",
  "The first thing it ever did was rearrange its habitat moss into a perfect spiral.",
  "Its genome carries one unexplained sequence the lab has agreed not to question.",
  "It hums at a frequency that makes the incubation rings spin a little slower.",
  "It refused every name until this one was spoken aloud.",
];

function makeSci(draft) {
  return `${GENUS[draft.form] || "Chimera"} ${rand(EPITHET)}`;
}

function openAdopt() {
  const p = state.pendingPet;
  if (!p) return;
  const sp = SPECIES[p.base];
  const adopt = $("#adopt");
  adopt.hidden = false;
  document.body.style.overflow = "hidden";
  swapImage($("#adoptImg"), sp.img, sp.alt);
  $("#petName").value = "";
  $("#adoptSci").textContent = "";
  $("#petTitle").innerHTML = TITLES.map((t) => `<option>${t}</option>`).join("");
  $("#petHabitat").innerHTML = HABITATS.map((h) => `<option value="${h.id}" ${h.id === state.habitat ? "selected" : ""}>${h.name}</option>`).join("");
  $("#originStory").value = "";
  setTimeout(() => $("#petName").focus(), 60);
}

$(".adopt-gen").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-gen]");
  if (!b) return;
  const kind = b.dataset.gen;
  if (kind === "pet") $("#petName").value = rand(NAME_BANK);
  if (kind === "code") $("#petName").value = `${rand(["VX", "GN", "KY", "OB"])}-${Math.floor(Math.random() * 90 + 10)} \u201C${rand(CODE_WORDS)}\u201D`;
  if (kind === "sci") {
    const sci = makeSci(state.pendingPet.draft);
    $("#adoptSci").textContent = sci;
    if (!$("#petName").value) $("#petName").value = sci.split(" ")[1][0].toUpperCase() + sci.split(" ")[1].slice(1);
  }
});

$("#genStory").addEventListener("click", () => {
  const p = state.pendingPet;
  const sp = SPECIES[p.base];
  const habName = HABITATS.find((h) => h.id === $("#petHabitat").value)?.name || sp.habitat;
  $("#originStory").value =
    `Grown in the ${habName.toLowerCase()} wing of Genome Noir from a ${p.draft.form} base with ${p.draft.surface}. ` +
    rand(STORY_BITS).replace("{ac}", sp.painted.toLowerCase());
});

$("#adoptCancel").addEventListener("click", () => {
  $("#adopt").hidden = true;
  document.body.style.overflow = "";
  document.getElementById("lab").scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" });
});

$("#adoptForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const p = state.pendingPet;
  if (!p) return;
  const name = $("#petName").value.trim() || rand(NAME_BANK);
  const sci = $("#adoptSci").textContent || makeSci(p.draft);
  const habitatId = $("#petHabitat").value;
  const habCompatScore = habitatCompat(p.draft, HABITATS.find((h) => h.id === habitatId).env).score;
  const pet = {
    id: "pet-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name, sci,
    title: $("#petTitle").value,
    habitat: habitatId,
    story: $("#originStory").value.trim(),
    base: p.base,
    specimenId: p.specimenId,
    draft: p.draft,
    stats: p.stats,
    created: Date.now(),
    care: { health: 92, mood: 84, energy: 76, hunger: 25, hydration: 80, microbiome: 85, habitatFit: habCompatScore, bond: 12, last: Date.now() },
  };
  saveArchive([...loadArchive(), pet]);
  $("#adopt").hidden = true;
  document.body.style.overflow = "";
  renderArchive();
  showIdCard(pet);
  toast(`${name.toUpperCase()} ADOPTED \u2014 FILED IN LIVING ARCHIVE`);
});

/* ============================================================
   IDENTITY CARD
   ============================================================ */
let idCardPet = null;
function showIdCard(pet) {
  idCardPet = pet;
  const sp = SPECIES[pet.base];
  const hab = HABITATS.find((h) => h.id === pet.habitat);
  const d = pet.draft;
  $("#idcard").innerHTML = `
    <figure class="idcard-portrait render-slot"><img src="${sp.img}" alt="${esc(sp.alt)}" /></figure>
    <div class="idcard-body">
      <p class="idcard-stamp">GENOME NOIR \u2014 SPECIMEN DOSSIER \u2014 ${esc(pet.specimenId)}</p>
      <h2 class="painted">${esc(pet.name)}</h2>
      <p class="idcard-sci mono">${esc(pet.sci)} \u2014 ${esc(pet.title)}</p>
      <dl class="idcard-data mono">
        <dt>BASE FORM</dt><dd>${esc(d.form.toUpperCase())}</dd>
        <dt>BIOLOGICAL INSPIRATION</dt><dd>${esc(sp.inspiration)}${d.hybridWith ? " \u00D7 " + esc(SPECIES[d.hybridWith].name.toUpperCase()) : ""}</dd>
        <dt>PRIMARY TRAIT</dt><dd>${esc((d.adaptations[0] || d.sensory[0] || d.surface).toUpperCase())}</dd>
        <dt>SECONDARY TRAIT</dt><dd>${esc((d.sensory[0] || d.behaviour[0] || "curious").toUpperCase())}</dd>
        <dt>FASHION TECHNOLOGY</dt><dd>${esc((d.fashion[0] || "none").toUpperCase())}</dd>
        <dt>HABITAT</dt><dd>${esc((hab?.name || "unassigned").toUpperCase())}</dd>
        <dt>GENOME STABILITY</dt><dd>${pet.stats.stability}%</dd>
        <dt>RARITY</dt><dd>${rarityLabel(pet.stats.rarity)}</dd>
      </dl>
      ${pet.story ? `<p class="idcard-story">\u201C${esc(pet.story)}\u201D</p>` : ""}
    </div>`;
  $("#idcardWrap").hidden = false;
  document.body.style.overflow = "hidden";
  $("#idcardClose").focus();
}
$("#idcardClose").addEventListener("click", () => {
  $("#idcardWrap").hidden = true;
  document.body.style.overflow = "";
});
$("#idcardExport").addEventListener("click", () => {
  if (!idCardPet) return;
  const blob = new Blob([JSON.stringify({ label: "GENOME NOIR \u2014 SPECIMEN DOSSIER", exported: new Date().toISOString(), pet: idCardPet }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `genome-noir-${idCardPet.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast("DOSSIER EXPORTED");
});

/* ============================================================
   LIVING ARCHIVE — LocalStorage
   ============================================================ */
const STORE_KEY = "genomeNoir.archive.v1";
function loadArchive() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
  catch { return []; }
}
function saveArchive(list) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); }
  catch { /* storage unavailable (private mode) — session only */ }
}

function renderArchive() {
  const pets = loadArchive();
  const grid = $("#archiveGrid");
  $("#archiveEmpty").hidden = pets.length > 0;
  grid.innerHTML = pets.map((pet) => {
    const sp = SPECIES[pet.base] || SPECIES.nova;
    const hab = HABITATS.find((h) => h.id === pet.habitat);
    return `<article class="acard panel" style="--ac-solid:${sp.ac}">
      <figure class="acard-img render-slot"><img src="${sp.img}" alt="${esc(sp.alt)}" loading="lazy" /><div class="render-vignette"></div></figure>
      <h3>${esc(pet.name)}</h3>
      <p class="mono dim sci">${esc(pet.sci)}</p>
      <dl class="acard-data mono">
        <dt>SPECIMEN</dt><dd>${esc(pet.specimenId)}</dd>
        <dt>SIGNATURE TRAIT</dt><dd>${esc((pet.draft.adaptations[0] || pet.draft.sensory[0] || pet.draft.surface).toUpperCase())}</dd>
        <dt>HABITAT</dt><dd>${esc((hab?.name || "unassigned").toUpperCase())}</dd>
        <dt>STABILITY</dt><dd>${pet.stats.stability}%</dd>
        <dt>RARITY</dt><dd>${rarityLabel(pet.stats.rarity)}</dd>
        <dt>BOND LEVEL</dt><dd>${Math.round(pet.care.bond)}%</dd>
      </dl>
      <div class="acard-actions">
        <button data-act="open" data-id="${pet.id}">Open</button>
        <button data-act="care" data-id="${pet.id}">Continue caring</button>
        <button data-act="rename" data-id="${pet.id}">Rename</button>
        <button data-act="dupe" data-id="${pet.id}">Duplicate</button>
        <button data-act="export" data-id="${pet.id}">Export</button>
        <button data-act="delete" data-id="${pet.id}" class="danger">Delete</button>
      </div>
    </article>`;
  }).join("");
}

$("#archiveGrid").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-act]");
  if (!b) return;
  const pets = loadArchive();
  const pet = pets.find((p) => p.id === b.dataset.id);
  if (!pet) return;
  const act = b.dataset.act;
  if (act === "open") showIdCard(pet);
  if (act === "care") openCare(pet.id);
  if (act === "rename") {
    const name = prompt("Rename companion:", pet.name);
    if (name && name.trim()) { pet.name = name.trim().slice(0, 28); saveArchive(pets); renderArchive(); toast("COMPANION RENAMED"); }
  }
  if (act === "dupe") {
    const copy = JSON.parse(JSON.stringify(pet));
    copy.id = "pet-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    copy.name = pet.name + " II";
    copy.specimenId = pet.specimenId.replace(/-\d+$/, "") + "-" + Math.floor(Math.random() * 90 + 10);
    copy.created = Date.now();
    copy.care.bond = 5;
    saveArchive([...pets, copy]);
    renderArchive();
    toast("GENOME DUPLICATED \u2014 NEW SPECIMEN FILED");
  }
  if (act === "export") { idCardPet = pet; $("#idcardExport").click(); }
  if (act === "delete") {
    if (confirm(`Release ${pet.name} from the archive? This cannot be undone.`)) {
      saveArchive(pets.filter((p) => p.id !== pet.id));
      renderArchive();
      toast("SPECIMEN RECORD RELEASED");
    }
  }
});

/* ============================================================
   PET CARE
   ============================================================ */
const CARE_METERS = [
  ["health", "HEALTH"], ["mood", "MOOD"], ["energy", "ENERGY"], ["hunger", "HUNGER"],
  ["hydration", "HYDRATION"], ["microbiome", "MICROBIOME BALANCE"], ["habitatFit", "HABITAT COMPATIBILITY"], ["bond", "BOND LEVEL"],
];
const CARE_ACTIONS = [
  ["feed", "Feed"], ["play", "Play"], ["hydrate", "Hydrate"], ["scan", "Scan"],
  ["clean", "Clean habitat"], ["rest", "Rest"], ["train", "Train"], ["accessory", "Add accessory"],
];
const ACCESSORIES = ["holographic ear cuff", "mini diagnostic halo", "reflective rain cape", "gilded specimen tag", "soft ultraviolet scarf"];

function decayCare(pet) {
  const hrs = Math.min(72, (Date.now() - (pet.care.last || Date.now())) / 3.6e6);
  if (hrs < 0.05) return;
  pet.care.hunger = clamp(pet.care.hunger + hrs * 1.6);
  pet.care.hydration = clamp(pet.care.hydration - hrs * 1.2);
  pet.care.energy = clamp(pet.care.energy - hrs * 0.8);
  pet.care.mood = clamp(pet.care.mood - hrs * 0.5);
  pet.care.last = Date.now();
}

function openCare(id) {
  const pets = loadArchive();
  const pet = pets.find((p) => p.id === id);
  if (!pet) return;
  decayCare(pet);
  saveArchive(pets);
  state.carePet = id;
  const sp = SPECIES[pet.base] || SPECIES.nova;
  applyTheme(sp);
  $("#care").hidden = false;
  document.body.style.overflow = "hidden";
  swapImage($("#careImg"), sp.img, sp.alt);
  $("#careName").textContent = pet.name;
  $("#careActions").innerHTML = CARE_ACTIONS.map(([a, l]) => `<button data-care="${a}">${l}</button>`).join("");
  $("#careNote").textContent = "";
  renderCareMeters(pet);
  $("#careClose").focus();
}

function moodWord(pet) {
  const c = pet.care;
  const wellness = (c.health + c.mood + c.energy + (100 - c.hunger) + c.hydration) / 5;
  if (c.energy < 22) return "DEPLETED \u2014 NEEDS REST";
  if (c.hunger > 75) return "HUNGRY \u2014 NUTRIENT BLEND ADVISED";
  if (wellness > 82) return "RADIANT";
  if (wellness > 60) return "CONTENT";
  if (wellness > 40) return "RESTLESS";
  return "LOW \u2014 NEEDS ATTENTION";
}

function renderCareMeters(pet) {
  $("#careMeters").innerHTML = CARE_METERS.map(([k, label]) => `
    <div class="care-meter">
      <div class="stab-head mono"><span>${label}</span><span>${Math.round(pet.care[k])}%</span></div>
      <div class="meter"><div class="meter-fill" style="width:${clamp(pet.care[k])}%"></div></div>
    </div>`).join("");
  $("#careMood").textContent = "STATUS: " + moodWord(pet);
  $("#careRender").classList.toggle("react-rest", pet.care.energy < 22);
}

function careReact(cls, ms = 1100) {
  if (reduceMotion.matches) return;
  const r = $("#careRender");
  r.classList.add(cls);
  setTimeout(() => r.classList.remove(cls), ms);
}

$("#careActions").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-care]");
  if (!b) return;
  const pets = loadArchive();
  const pet = pets.find((p) => p.id === state.carePet);
  if (!pet) return;
  const c = pet.care;
  const name = pet.name.toUpperCase();
  let note = "";
  switch (b.dataset.care) {
    case "feed":
      c.hunger = clamp(c.hunger - 32); c.energy = clamp(c.energy + 8); c.microbiome = clamp(c.microbiome + 4); c.bond = clamp(c.bond + 2);
      note = `${name} ACCEPTS THE NUTRIENT BLEND \u2014 MICROBIOME SETTLING`; careReact("react-pulse"); break;
    case "play":
      c.mood = clamp(c.mood + 14); c.energy = clamp(c.energy - 12); c.hunger = clamp(c.hunger + 8); c.bond = clamp(c.bond + 4);
      note = `${name} TILTS ITS HEAD \u2014 PLAY LOOP ENGAGED`; careReact("react-tilt"); break;
    case "hydrate":
      c.hydration = clamp(c.hydration + 26); c.health = clamp(c.health + 2); c.bond = clamp(c.bond + 1);
      note = `HYDRATION RESTORED \u2014 ${name} GLOWS FAINTLY`; careReact("react-pulse"); break;
    case "scan":
      c.bond = clamp(c.bond + 1);
      note = `SCAN COMPLETE \u2014 HEALTH ${Math.round(c.health)}% / MICROBIOME ${Math.round(c.microbiome)}% / NO ANOMALIES`; careReact("react-pulse"); break;
    case "clean":
      c.habitatFit = clamp(c.habitatFit + 12); c.mood = clamp(c.mood + 5); c.health = clamp(c.health + 3);
      note = `HABITAT CYCLED \u2014 ${name} INSPECTS THE FRESH SUBSTRATE`; careReact("react-lift"); break;
    case "rest":
      c.energy = clamp(c.energy + 30); c.mood = clamp(c.mood + 4); c.health = clamp(c.health + 2);
      note = `${name} ENTERS REST MODE \u2014 VITALS SLOWING GENTLY`; careReact("react-rest", 2200); break;
    case "train":
      c.bond = clamp(c.bond + 6); c.energy = clamp(c.energy - 14); c.hunger = clamp(c.hunger + 9); c.mood = clamp(c.mood + 3);
      note = `TRAINING SEQUENCE LOGGED \u2014 BOND STRENGTHENED`; careReact("react-lift"); break;
    case "accessory": {
      const acc = rand(ACCESSORIES);
      c.mood = clamp(c.mood + 9); c.bond = clamp(c.bond + 2);
      note = `COUTURE ACCESSORY EQUIPPED \u2014 ${acc.toUpperCase()}`; careReact("react-pulse"); break;
    }
  }
  c.last = Date.now();
  saveArchive(pets);
  renderCareMeters(pet);
  $("#careNote").textContent = note;
  renderArchive();
});

$("#careClose").addEventListener("click", () => {
  $("#care").hidden = true;
  document.body.style.overflow = "";
  state.carePet = null;
});

/* ============================================================
   NAVIGATION
   ============================================================ */
const burger = $("#navBurger");
function closeMenu() {
  document.body.classList.remove("nav-open");
  burger.setAttribute("aria-expanded", "false");
}
burger.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  burger.setAttribute("aria-expanded", String(open));
});
$$("[data-navlink]").forEach((a) => {
  a.addEventListener("click", () => {
    closeMenu();
    if (a.hasAttribute("data-nova-link")) selectSpecimen("nova");
    if (a.hasAttribute("data-void-link")) selectSpecimen("void-claw");
  });
});

/* Escape closes overlays */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!$("#idcardWrap").hidden) $("#idcardClose").click();
  else if (!$("#care").hidden) $("#careClose").click();
  else if (!$("#adopt").hidden) $("#adoptCancel").click();
  else if (!$("#incubator").hidden) $("#incSkip").click();
  else if (document.body.classList.contains("nav-open")) closeMenu();
});

/* ============================================================
   INIT
   ============================================================ */
$("#footYear").textContent = "MMXXVI \u2014 " + new Date().getFullYear();
renderShowcase();
renderCreate();
renderPreview();
renderLab();
renderHabitatPanel();
renderArchive();
