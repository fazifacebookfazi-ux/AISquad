export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  /** URL segment — must be unique and lowercase. */
  slug: string;
  title: string;
  /** One line for cards and search results. */
  summary: string;
  category: ProjectCategory;
  year: string;
  tags: string[];
  /** Two hex stops for the generated cover. Ignored when `cover` is set. */
  gradient: [string, string];
  /** Optional real screenshot, e.g. "/projects/ezclipper.png" in /public. */
  cover?: string;
  featured?: boolean;

  // ---- Case study fields ----
  client: string;
  role: string;
  duration: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Lead paragraph on the case study page. */
  intro: string;
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: ProjectMetric[];
  stack: string[];
};

export const projectCategories = [
  "Web platform",
  "SaaS platform",
  "Marketing site",
  "AI product",
  "MVP sprint",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/**
 * Replace these with your real work. Every field is used somewhere on
 * /projects or /projects/[slug], so filling them all in gives you a complete
 * case study with no component changes.
 */
export const projects: Project[] = [
  {
    slug: "startupai-tools",
    title: "StartupAI Tools",
    summary:
      "A directory of 100+ free browser-based utilities — developer tools, SEO helpers and AI assistants, with no signup and no ads.",
    category: "Web platform",
    year: "2025",
    tags: ["Next.js", "AI-built", "Vercel"],
    gradient: ["#5b63f5", "#22c1cf"],
    featured: true,
    client: "In-house product",
    role: "Solo build — product, design, development & SEO",
    duration: "Ongoing",
    liveUrl: "https://aitoolspro.tech",
    intro:
      "Every free tool site on the internet asks the same thing of you: sit through a popup, make an account, then wait while your file uploads to someone else's server just to format some JSON. StartupAI Tools exists because none of that is necessary.",
    challenge:
      "The problem with a hundred-tool directory isn't building any single tool — it's that a hundred of anything usually means a hundred inconsistencies. Different layouts, different quality, pages that take seconds to load, and a structure search engines can't make sense of. On top of that, tools handling people's text and images can't credibly promise privacy while quietly uploading everything to a backend.",
    approach: [
      "Built the whole platform on Next.js with pages prerendered as static HTML, so every tool loads instantly from the edge instead of waiting on a server.",
      "Ran the processing client-side wherever it was possible — the JSON formatter, Base64 encoder and converters never send data anywhere, which turns the privacy claim into a fact rather than a promise.",
      "Organised 100+ tools into six clear categories — text and content, SEO, developer utilities, calculators, generators and number conversion — so the directory stays navigable as it grows.",
      "Used AI-assisted development to build tools in parallel rather than sequentially, which is the only reason a catalogue this size is maintainable by one person.",
      "Went further than utilities with flagship builds: ZenNote AI turns unstructured brain-dumps into action plans, TradingFEST streams live rates across 18 exchanges, and the resume studio exports vector PDFs with no watermark.",
      "Treated SEO as architecture — semantic markup, per-tool metadata and an llms.txt generator that configures how AI search engines crawl the site.",
    ],
    outcome:
      "The site now runs over a hundred tools from a single directory, serving developers, marketers and students without a single signup wall or ad unit. It's deployed on Vercel with pages served from cache, and new tools ship continuously based on what people actually ask for.",
    metrics: [
      { value: "100+", label: "Tools live in one directory" },
      { value: "6", label: "Categories, from dev to finance" },
      { value: "18", label: "Exchange feeds in TradingFEST" },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "AI-assisted development",
      "Vercel",
    ],
  },
  {
    slug: "ezclipper",
    title: "EzClipper",
    summary:
      "An AI clipping studio that turns long videos into vertical shorts — transcribing, finding the highlights, reframing to 9:16 and captioning them automatically.",
    category: "AI product",
    year: "2026",
    tags: ["Python", "Whisper", "FFmpeg"],
    gradient: ["#3b82f6", "#22c1cf"],
    cover: "/projects/ezclipper.png",
    featured: true,
    client: "In-house product",
    role: "Solo build — video pipeline, AI features & interface",
    duration: "Ongoing",
    intro:
      "Anyone sitting on a podcast archive or a back catalogue of long YouTube videos has the same backlog: hours of footage that should be a few dozen vertical clips, and no realistic amount of time to cut them by hand.",
    challenge:
      "Finding the good bits is the part that resists automation. Cutting on fixed intervals gives you clips that open mid-sentence, and cutting on audio peaks just finds the loudest moments rather than the most interesting ones. Landscape footage then has to become 9:16 without decapitating whoever is speaking. And the transcription driving all of it has to fit inside an upload limit that any long video blows past immediately.",
    approach: [
      "Transcribe the whole video once with Groq's Whisper turbo model and slice that transcript by timestamp for each clip — transcribing clips individually was both slower and less accurate, because the model lost the surrounding context.",
      "Compress the audio to mono 16 kHz before upload so long videos stay under the 24 MB API ceiling, with a local faster-whisper model as the fallback when they don't.",
      "Rank candidate moments by speech density across the transcript rather than volume, fall back to audio energy when a video has no clear speech, and enforce a minimum gap between clips so they don't overlap.",
      "Reframe to vertical by sampling frames through MediaPipe face detection and driving the FFmpeg crop from the median face position, which keeps the speaker centred instead of cropping to the middle and hoping.",
      "Encode clips in parallel and stream results back as NDJSON, so the first clip is watchable while the rest are still rendering.",
      "Build the creator tooling on top of that pipeline: twelve caption styles, AI keyword highlighting, virality scoring, hook generation, and a brand kit for logo, intro and outro.",
    ],
    outcome:
      "The pipeline runs end to end — paste a YouTube link, get back finished vertical clips with captions burned in, roughly a minute of processing for a short video. It currently runs as a local studio rather than a hosted product, but the interface already talks to the backend over HTTP, so the video pipeline is a service away from being multi-tenant.",
    metrics: [
      { value: "30", label: "Clips from one upload" },
      { value: "12", label: "Caption styles built in" },
      { value: "7", label: "Languages for captions" },
    ],
    stack: [
      "Python",
      "Flask",
      "FFmpeg",
      "yt-dlp",
      "Groq Whisper",
      "MediaPipe",
    ],
  },
  {
    slug: "local-voice-enhancer",
    title: "Local Voice Enhancer",
    summary:
      "Studio-grade speech cleanup that runs entirely on your own machine — no API keys, no uploads, no subscription.",
    category: "AI product",
    year: "2026",
    tags: ["Python", "PyTorch", "FastAPI"],
    gradient: ["#7c5cff", "#5b8def"],
    cover: "/projects/local-voice-enhancer.png",
    client: "In-house product",
    role: "Solo build — audio pipeline, model integration & interface",
    duration: "One build session",
    intro:
      "The cloud tools that clean up recorded speech are genuinely good, and they also want your unreleased audio, an account and a monthly fee. This does the same job on your own machine, with nothing leaving the building.",
    challenge:
      "The models that do this well are research code, and research code assumes Linux and a GPU. Resemble Enhance pulls in DeepSpeed, which doesn't build on Windows at all. Recent versions of TorchAudio route every file read through TorchCodec, which expects FFmpeg libraries that aren't there. DeepFilterNet imports a class those same versions no longer export. None of that is the interesting part of the problem, but all of it stands between the idea and something you can actually run.",
    approach: [
      "Chained two models instead of picking one — DeepFilterNet3 strips the room tone and hiss first, then Resemble Enhance reconstructs the voice, which it does noticeably better on already-clean input.",
      "Sidestepped the TorchAudio decoding stack by patching load, save and info onto soundfile and librosa, which removed the FFmpeg dependency and with it the most common reason a local install fails on someone else's machine.",
      "Stubbed out DeepSpeed and rewrote Resemble's inference imports so it never reaches for its training modules — the only reason it runs on Windows at all.",
      "Exposed the speed-versus-quality tradeoff rather than hiding it: three presets map to 32, 64 or 128 flow-matching steps with different solvers.",
      "Added a broadcast mode that normalises to −16 LUFS, so the file is ready to publish instead of needing another pass in an editor.",
      "Wrapped it in a FastAPI job queue with a polling progress UI and A/B playback, so you can hear the original against the enhanced version before committing to the download.",
    ],
    outcome:
      "It runs as a local web app — drop a file in the browser, choose a mode, get a 16-bit WAV back, with the denoised intermediate saved alongside it so you can hear what each stage contributed. It falls back to CPU and picks up CUDA automatically where it exists. The whole thing came together in a single build session, and most of that went on making research code survive Windows rather than on the audio itself.",
    metrics: [
      { value: "100%", label: "Offline — no cloud, no API keys" },
      { value: "3", label: "Enhancement modes" },
      { value: "−16 LUFS", label: "Broadcast loudness target" },
    ],
    stack: [
      "Python",
      "FastAPI",
      "PyTorch",
      "Resemble Enhance",
      "DeepFilterNet3",
      "pyloudnorm",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Cycles to the next project so case studies always link onward. */
export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
