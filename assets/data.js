/* ========================================================
   HAMZA IRFAN PORTFOLIO — CENTRAL DATA STORE & CMS ENGINE
   Dedicated Master Showreel Theater + 20 Client Project Videos
   Supports real-time localStorage persistence, import & export
   ======================================================== */

const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Hamza Irfan",
    initials: "HI",
    badge: "Video Editor & Motion Designer · Freelance Editor at Fame (fame.so)",
    headline: "I edit stories.<br>I animate identities.",
    subhead: "Freelance video editor for Fame (fame.so) for more than 2+ years. I turn raw footage into high-retention commercial content, viral vertical reels, and bring brand marks to life with fluid 2D/3D motion graphics.",
    email: "hamzairfan.edits@gmail.com",
    fiverr: "https://www.fiverr.com/hamzairfaan",
    fame: "https://fame.so",
    location: "Worldwide / Remote Collaboration",
    focus: "Commercial Editing · Fame (fame.so) Editor · Logo Animation",
    availability: "Available for freelance & remote contracts (Direct & Fiverr)",
    avatar: "pic/intro-showreel.jpg",
    hireText: "Ready to turn raw ideas into scroll-stopping video content? Order on Fiverr or reach out directly.",
    stats: [
      { num: "2+ Yrs", label: "Editor at Fame (fame.so)" },
      { num: "6+", label: "Years Video Editing" },
      { num: "150+", label: "Videos Delivered" }
    ]
  },
  marquee: [
    "FREELANCE VIDEO EDITOR FOR FAME (FAME.SO)", "2+ YEARS AT FAME.SO", "ORDER ON FIVERR: FIVERR.COM/HAMZAIRFAAN",
    "COMMERCIAL EDITING", "LOGO ANIMATION", "VIRAL SHORTS & REELS", "PODCAST PRODUCTION",
    "MOTION GRAPHICS", "HIGH-IMPACT HOOKS", "AFTER EFFECTS", "PREMIERE PRO"
  ],
  servicesPills: [
    "Fame (fame.so) Video Partner", "Commercial Editing", "Fiverr Verified Editor", "Logo Animation", "Viral Vertical Shorts", "Podcast Production", "Motion Graphics", "Sound Design"
  ],
  // DEDICATED MASTER INTRO SHOWREEL (CINEMA THEATER)
  showreel: {
    id: "master-showreel",
    badge: "2026 OFFICIAL SHOWREEL",
    title: "Hamza Irfan — Master Video & Motion Showreel",
    dur: "01:01",
    aspect: "16:9",
    orientation: "landscape",
    desc: "A 60-second high-octane montage showcasing commercial video editing, kinetic motion graphics, high-impact sound design, and viral retention pacing.",
    poster: "pic/intro-showreel.jpg",
    src: "vid/intro-showreel.mp4",
    highlights: ["16:9 Cinema 1080p 60fps", "Master Montage", "Commercial & Viral Formats"]
  },
  categories: [
    { key: "all", label: "All Works (20)" },
    { key: "shorts", label: "Vertical Shorts (9:16)" },
    { key: "logo", label: "Logo Animations" },
    { key: "hooks", label: "Commercial Hooks" },
    { key: "podcast", label: "Podcast Production" },
    { key: "motion", label: "Motion Graphics" }
  ],
  videos: [
    // 1-3. Motion Graphics & Typography (16:9 Landscape)
    {
      id: 1,
      title: "Charles Buingey — Organic Motion Identity",
      dur: "00:08",
      num: "01",
      cat: "Motion Graphics",
      categoryKey: "motion",
      aspect: "16:9",
      orientation: "landscape",
      company: "Charles Buingey",
      desc: "Cinematic 2D/3D organic foliage motion graphics and smooth visual transitions crafted for brand campaigns.",
      poster: "pic/anim-charles-buingey.jpg",
      src: "vid/anim-charles-buingey.mp4",
      featured: false
    },
    {
      id: 2,
      title: "Kinetic Typography & Circular Motion",
      dur: "00:06",
      num: "02",
      cat: "Motion Graphics",
      categoryKey: "motion",
      aspect: "16:9",
      orientation: "landscape",
      company: "Creative Studio",
      desc: "Rhythmic typography animation with fluid circular path tracking, custom easing curves, and audio synchronization.",
      poster: "pic/anim-circle-text.jpg",
      src: "vid/anim-circle-text.mp4",
      featured: true
    },
    {
      id: 3,
      title: "Violet — Abstract Brand Motion Graphic",
      dur: "00:08",
      num: "03",
      cat: "Motion Graphics",
      categoryKey: "motion",
      aspect: "16:9",
      orientation: "landscape",
      company: "Violet Studio",
      desc: "Contemporary gradient-mesh logo animation and futuristic atmospheric motion graphic ident.",
      poster: "pic/anim-violet-brand.jpg",
      src: "vid/anim-violet-brand.mp4",
      featured: false
    },
    // 4-9. Logo Animations (9:16 Vertical)
    {
      id: 4,
      title: "Fox Logo — Kinetic Brand Reveal",
      dur: "00:07",
      num: "04",
      cat: "Logo Animation",
      categoryKey: "logo",
      aspect: "9:16",
      orientation: "vertical",
      company: "Fox Interactive",
      desc: "Vibrant vector character animation, organic tail whip reveal, and playful brand personality motion.",
      poster: "pic/anim-fox-logo.jpg",
      src: "vid/anim-fox-logo.mp4",
      featured: true
    },
    {
      id: 5,
      title: "Hub — 3D & 2D Vector Identity Reveal",
      dur: "00:07",
      num: "05",
      cat: "Logo Animation",
      categoryKey: "logo",
      aspect: "9:16",
      orientation: "vertical",
      company: "Hub Technologies",
      desc: "Fluid architectural letterform reveal with kinetic particle motion and sound synchronization.",
      poster: "pic/anim-hub-logo.jpg",
      src: "vid/anim-hub-logo.mp4",
      featured: true
    },
    {
      id: 6,
      title: "Mobius — Infinite Ribbon Logo Ident",
      dur: "00:05",
      num: "06",
      cat: "Logo Animation",
      categoryKey: "logo",
      aspect: "9:16",
      orientation: "vertical",
      company: "Mobius Studio",
      desc: "Smooth continuous loop ribbon reveal with glossy gradient shading and minimal brand elegance.",
      poster: "pic/anim-mobius-logo.jpg",
      src: "vid/anim-mobius-logo.mp4",
      featured: false
    },
    {
      id: 7,
      title: "Panda — Mascot Morph & Scale Reveal",
      dur: "00:04",
      num: "07",
      cat: "Logo Animation",
      categoryKey: "logo",
      aspect: "9:16",
      orientation: "vertical",
      company: "Panda Brand",
      desc: "Dynamic vector scale anticipation, clean bouncy easing, and memorable mascot stinger.",
      poster: "pic/anim-panda-logo.jpg",
      src: "vid/anim-panda-logo.mp4",
      featured: false
    },
    {
      id: 8,
      title: "Cyberpunk — Glitch Distortion Bumper",
      dur: "00:01",
      num: "08",
      cat: "Logo Animation",
      categoryKey: "logo",
      aspect: "9:16",
      orientation: "vertical",
      company: "Neon Grid",
      desc: "High-energy chromatic aberration, digital glitch distortions, and cyberpunk brand sound fx.",
      poster: "pic/anim-cyberpunk-stinger.jpg",
      src: "vid/anim-cyberpunk-stinger.mp4",
      featured: false
    },
    {
      id: 9,
      title: "Bingo — Playful Mascot Bump",
      dur: "00:04",
      num: "09",
      cat: "Logo Animation",
      categoryKey: "logo",
      aspect: "9:16",
      orientation: "vertical",
      company: "Bingo Media",
      desc: "Snappy kinetic pop-in logo stinger engineered for high-retention video watermarks.",
      poster: "pic/anim-bingo-logo.jpg",
      src: "vid/anim-bingo-logo.mp4",
      featured: false
    },
    // 10-14. Commercial Hooks (16:9 Landscape)
    {
      id: 10,
      title: "Tina Gavel — Viral Commercial Video Hook",
      dur: "00:27",
      num: "10",
      cat: "Commercial Hooks",
      categoryKey: "hooks",
      aspect: "16:9",
      orientation: "landscape",
      company: "Tina Gavel",
      desc: "High-conversion opening hook with dynamic sound design, split-second B-roll cuts, and kinetic titles.",
      poster: "pic/hook-tina-gavel.jpg",
      src: "vid/hook-tina-gavel.mp4",
      featured: true
    },
    {
      id: 11,
      title: "Commercial Hook #1 — Retention Driver",
      dur: "00:38",
      num: "11",
      cat: "Commercial Hooks",
      categoryKey: "hooks",
      aspect: "16:9",
      orientation: "landscape",
      company: "Apex Media",
      desc: "Scroll-stopping commercial hook engineered to capture audience attention in the first 3 seconds.",
      poster: "pic/hook-commercial-1.jpg",
      src: "vid/hook-commercial-1.mp4",
      featured: false
    },
    {
      id: 12,
      title: "Commercial Hook #2 — Cinematic Narrative",
      dur: "00:51",
      num: "12",
      cat: "Commercial Hooks",
      categoryKey: "hooks",
      aspect: "16:9",
      orientation: "landscape",
      company: "Venture Vision",
      desc: "Atmospheric visual pacing with tension-building soundscapes and dramatic typography reveals.",
      poster: "pic/hook-commercial-2.jpg",
      src: "vid/hook-commercial-2.mp4",
      featured: false
    },
    {
      id: 13,
      title: "Commercial Hook #3 — High-Impact Story",
      dur: "01:23",
      num: "13",
      cat: "Commercial Hooks",
      categoryKey: "hooks",
      aspect: "16:9",
      orientation: "landscape",
      company: "Prime Motion",
      desc: "Rapid-fire visual sequencing, multi-layered SFX, and seamless transitions for commercial impact.",
      poster: "pic/hook-commercial-3.jpg",
      src: "vid/hook-commercial-3.mp4",
      featured: false
    },
    {
      id: 14,
      title: "Commercial Hook #4 — Modern Brand Teaser",
      dur: "00:26",
      num: "14",
      cat: "Commercial Hooks",
      categoryKey: "hooks",
      aspect: "16:9",
      orientation: "landscape",
      company: "NextGen",
      desc: "Clean modern product teaser cut with sleek motion graphics and engaging musical sync.",
      poster: "pic/hook-commercial-4.jpg",
      src: "vid/hook-commercial-4.mp4",
      featured: false
    },
    // 15-17. Podcast Editing (16:9 Landscape)
    {
      id: 15,
      title: "Podcast Edit #1 — Studio Multi-Cam Cut",
      dur: "00:10",
      num: "15",
      cat: "Podcast Editing",
      categoryKey: "podcast",
      aspect: "16:9",
      orientation: "landscape",
      company: "Talk Studio",
      desc: "Multi-camera speaker switching, noise removal, dynamic sound mixing, and engaging lower thirds.",
      poster: "pic/podcast-studio-1.jpg",
      src: "vid/podcast-studio-1.mp4",
      featured: true
    },
    {
      id: 16,
      title: "Podcast Edit #2 — Bite-Sized Conversation",
      dur: "00:06",
      num: "16",
      cat: "Podcast Editing",
      categoryKey: "podcast",
      aspect: "16:9",
      orientation: "landscape",
      company: "Audio Wave",
      desc: "Concise conversational clipping, zoom-punches, animated speaker tags, and high audio fidelity.",
      poster: "pic/podcast-highlight-2.jpg",
      src: "vid/podcast-highlight-2.mp4",
      featured: false
    },
    {
      id: 17,
      title: "Podcast Edit #3 — Episodic Showcase",
      dur: "00:07",
      num: "17",
      cat: "Podcast Editing",
      categoryKey: "podcast",
      aspect: "16:9",
      orientation: "landscape",
      company: "Dialogue Hub",
      desc: "Long-form pacing mastery with seamless interstitial B-roll and branded episode graphics.",
      poster: "pic/podcast-deepdive-3.jpg",
      src: "vid/podcast-deepdive-3.mp4",
      featured: false
    },
    // 18-20. Short-Form Video & Viral Reels (9:16 Vertical)
    {
      id: 18,
      title: "Viral Reel #1 — High-Retention Short-Form",
      dur: "01:05",
      num: "18",
      cat: "Short-Form Video",
      categoryKey: "shorts",
      aspect: "9:16",
      orientation: "vertical",
      company: "Viral Reel",
      desc: "Dynamic auto-captions, fast zoom punches, sound effects on every beat, and maximum retention framing.",
      poster: "pic/snippet-vertical-1.jpg",
      src: "vid/snippet-vertical-1.mp4",
      featured: true
    },
    {
      id: 19,
      title: "Viral Reel #2 — Storytelling Short",
      dur: "00:42",
      num: "19",
      cat: "Short-Form Video",
      categoryKey: "shorts",
      aspect: "9:16",
      orientation: "vertical",
      company: "Creator Studio",
      desc: "Emotional storytelling arc compressed into 40 seconds with cinematic color grading and pacing.",
      poster: "pic/snippet-vertical-2.jpg",
      src: "vid/snippet-vertical-2.mp4",
      featured: false
    },
    {
      id: 20,
      title: "Viral Reel #3 — Kinetic Hook & Climax",
      dur: "01:02",
      num: "20",
      cat: "Short-Form Video",
      categoryKey: "shorts",
      aspect: "9:16",
      orientation: "vertical",
      company: "Growth Media",
      desc: "Bold visual overlays, sticker pop-ins, and fast-paced editing designed for TikTok and Instagram Reels.",
      poster: "pic/snippet-vertical-3.jpg",
      src: "vid/snippet-vertical-3.mp4",
      featured: false
    }
  ],
  projects: [
    {
      id: 1,
      videoId: "master-showreel",
      isMasterShowreel: true,
      company: "Master Portfolio Showcase",
      name: "Commercial & Narrative Master Showreel",
      desc: "Comprehensive portfolio centerpiece demonstrating commercial post-production, multi-cam rhythm, kinetic sound design, and color grading across high-tier brand campaigns.",
      typeBadge: "Master Showreel · 16:9 Widescreen",
      countBadge: "01",
      tags: ["Commercial Reel", "Sound Design", "Color Grading", "Cinematic"],
      mainImg: "pic/intro-showreel.jpg",
      stripImages: [
        "pic/intro-showreel.jpg",
        "pic/hook-tina-gavel.jpg",
        "pic/hook-commercial-2.jpg"
      ]
    },
    {
      id: 2,
      videoId: 18,
      company: "Viral Social Media",
      name: "Short-Form Reels & YouTube Shorts",
      desc: "High-retention client edits engineered for TikTok, YouTube Shorts, and Instagram Reels with kinetic subtitles, fast pacing, B-roll overlays, and custom sound design.",
      typeBadge: "Short-Form · 9:16 Vertical",
      countBadge: "02",
      tags: ["YouTube Shorts", "Pacing & Retention", "Sound Design", "Captions"],
      mainImg: "pic/snippet-vertical-1.jpg",
      stripImages: [
        "pic/snippet-vertical-1.jpg",
        "pic/snippet-vertical-2.jpg",
        "pic/snippet-vertical-3.jpg"
      ]
    },
    {
      id: 3,
      videoId: 4,
      company: "2D/3D Kinetic Identity",
      name: "Brand Logo Reveals & Motion Stingers",
      desc: "Transforming static identity marks into memorable kinetic moments. Fluid shape morphs, vector character reveals, and synchronized audio stingers crafted in After Effects.",
      typeBadge: "Logo Animation · 9:16 Vertical",
      countBadge: "03",
      tags: ["After Effects", "Logo Reveals", "2D Motion", "Stingers"],
      mainImg: "pic/anim-fox-logo.jpg",
      stripImages: [
        "pic/anim-fox-logo.jpg",
        "pic/anim-hub-logo.jpg",
        "pic/anim-mobius-logo.jpg"
      ]
    },
    {
      id: 4,
      videoId: 10,
      company: "Commercial Advertising",
      name: "High-Conversion Video Hooks & Social Ads",
      desc: "First-3-seconds retention hooks designed to stop the scroll. Punchy audio drops, visual intrigue, split-screen wipes, and dynamic graphic overlays for direct-response marketing.",
      typeBadge: "Commercial Hooks · 16:9 Widescreen",
      countBadge: "04",
      tags: ["Ad Hooks", "Direct Response", "Fast Pacing", "Sound FX"],
      mainImg: "pic/hook-tina-gavel.jpg",
      stripImages: [
        "pic/hook-tina-gavel.jpg",
        "pic/hook-commercial-1.jpg",
        "pic/hook-commercial-3.jpg"
      ]
    },
    {
      id: 5,
      videoId: 18,
      company: "Fame (fame.so)",
      name: "Fame.so — B2B Podcast Production & Commercial Video Suite",
      desc: "Working for Fame (fame.so) for more than 2+ years as a freelance video editor. Full episode post-production, multi-camera synchronicity, vocal noise gating, narrative trimming, and retention-optimized social cutdowns.",
      typeBadge: "Fame (fame.so) Partner · 2+ Years",
      countBadge: "05",
      tags: ["Fame.so", "2+ Years", "Podcast Production", "Multi-Cam", "Retention Sound"],
      mainImg: "pic/podcast-studio-1.jpg",
      stripImages: [
        "pic/podcast-studio-1.jpg",
        "pic/podcast-highlight-2.jpg",
        "pic/podcast-deepdive-3.jpg"
      ]
    },
    {
      id: 6,
      videoId: 2,
      company: "Motion Design Studio",
      name: "Kinetic Typography & Abstract Brand Motion",
      desc: "Rhythmic typography animation, path-constrained title dynamics, and futuristic atmospheric visual design for modern digital brands.",
      typeBadge: "Motion Graphics · 16:9 Widescreen",
      countBadge: "06",
      tags: ["Kinetic Type", "Abstract 3D", "After Effects", "Transitions"],
      mainImg: "pic/anim-circle-text.jpg",
      stripImages: [
        "pic/anim-circle-text.jpg",
        "pic/anim-charles-buingey.jpg",
        "pic/anim-violet-brand.jpg"
      ]
    }
  ],
  skills: [
    {
      id: 1,
      icon: "Ae",
      name: "Adobe After Effects",
      desc: "2D & 3D logo animation, visual stingers, motion graphics, and vector character reveals.",
      percent: 95
    },
    {
      id: 2,
      icon: "Pr",
      name: "Adobe Premiere Pro",
      desc: "Master narrative pacing, multi-camera podcast editing, commercial hooks, and B-roll cutting.",
      percent: 95
    },
    {
      id: 3,
      icon: "Ai",
      name: "Adobe Illustrator",
      desc: "Vector logo preparation, character rigging breakdowns, and motion asset styling.",
      percent: 88
    },
    {
      id: 4,
      icon: "Ps",
      name: "Adobe Photoshop",
      desc: "Keyframe asset cutouts, high-conversion thumbnail design, and visual textures.",
      percent: 85
    },
    {
      id: 5,
      icon: "Cc",
      name: "CapCut Pro",
      desc: "Rapid social turnaround, kinetic auto-captions, and viral short-form retention pacing.",
      percent: 92
    },
    {
      id: 6,
      icon: "✦",
      name: "Sound Design & Kinetic Type",
      desc: "Impactful whooshes, risers, custom typography animation, and audio sweetening.",
      percent: 92
    }
  ],
  experience: [
    {
      id: 1,
      period: "2+ YEARS (CURRENT)",
      role: "Freelance Video Editor & Podcast Specialist",
      company: "Fame (fame.so)",
      companyUrl: "https://fame.so",
      desc: "Working for Fame (fame.so) for more than 2+ years as a dedicated freelance video editor. Directing end-to-end post-production across high-impact B2B podcast episodes, dynamic commercial video hooks, multi-cam rhythm assemblies, audio sweetening, and viral multi-platform cutdowns.",
      color: "#1dbf73"
    },
    {
      id: 2,
      period: "CURRENT",
      role: "Lead Video Editor & Motion Designer",
      company: "Fiverr Freelance & Remote Contracts",
      companyUrl: "https://www.fiverr.com/hamzairfaan",
      desc: "Delivering commercial video hooks, viral reels, master showreels, kinetic logo animations, and YouTube episodic content with 5-star client ratings on Fiverr.",
      color: "#E8451A"
    },
    {
      id: 3,
      period: "2025—2026",
      role: "Logo Animator & Video Editor",
      company: "SN Solution",
      desc: "Delivered custom 2D logo animations, brand identity reveal stingers (Hub Logo, Fox Animation, Mobius Ident), and short-form marketing content.",
      color: "#E8451A"
    },
    {
      id: 4,
      period: "ONGOING",
      role: "Motion Design & Digital Content Creator",
      company: "Independent Studio",
      desc: "End-to-end visual content workflow — footage ingestion, rough cut assembly, sound design, logo branding, and multi-platform publishing optimization.",
      color: "#FF8C5A"
    }
  ]
};

const STORAGE_KEY = 'hamza_irfan_portfolio_data_v5';

function getPortfolioData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      savePortfolioData(DEFAULT_PORTFOLIO_DATA);
      return DEFAULT_PORTFOLIO_DATA;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.showreel || !parsed.videos || parsed.videos.length < 20) {
      savePortfolioData(DEFAULT_PORTFOLIO_DATA);
      return DEFAULT_PORTFOLIO_DATA;
    }
    return { ...DEFAULT_PORTFOLIO_DATA, ...parsed };
  } catch (e) {
    console.warn("Could not load from localStorage, falling back to defaults.", e);
    return DEFAULT_PORTFOLIO_DATA;
  }
}

function savePortfolioData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { detail: data }));
    return true;
  } catch (e) {
    console.error("Failed to save portfolio data to localStorage", e);
    return false;
  }
}

function resetPortfolioData() {
  savePortfolioData(DEFAULT_PORTFOLIO_DATA);
  return DEFAULT_PORTFOLIO_DATA;
}

function exportPortfolioData() {
  const data = getPortfolioData();
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hamza-irfan-portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importPortfolioData(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || !parsed.profile) throw new Error("Invalid portfolio data structure");
    savePortfolioData(parsed);
    return true;
  } catch (err) {
    alert("Invalid JSON data: " + err.message);
    return false;
  }
}
