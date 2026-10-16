/* ========================================================
   HAMZA IRFAN PORTFOLIO — CENTRAL DATA STORE & CMS ENGINE
   Supports real-time localStorage persistence, import & export
   ======================================================== */

const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Hamza Irfan",
    initials: "HI",
    badge: "Video Editor · Motion Designer · Logo Animator",
    headline: "I edit stories.<br>I animate identities.",
    subhead: "I turn raw footage into polished, engaging content — and bring static logos to life with clean, memorable motion.",
    email: "hamzairfan.edits@gmail.com",
    location: "Worldwide / Remote Collaboration",
    focus: "Video Editing + Logo Animation",
    availability: "Available for freelance & remote projects",
    avatar: "pic/hub.jpg",
    hireText: "Ready to turn raw ideas into scroll-stopping video content?",
    stats: [
      { num: "6+", label: "Years Video Editing" },
      { num: "2+", label: "Years Logo Animation" },
      { num: "100+", label: "Projects Delivered" }
    ]
  },
  marquee: [
    "VIDEO EDITING", "LOGO ANIMATION", "PODCAST EDITING", "MOTION GRAPHICS",
    "SHORT-FORM", "B-ROLL & SOUND", "AFTER EFFECTS", "PREMIERE PRO"
  ],
  servicesPills: [
    "Video Editing", "Logo Animation", "Podcast Production", "Motion Graphics", "Short-Form Reels"
  ],
  videos: [
    {
      id: 1,
      title: "Beth Wood — YouTube Short & Viral Reel",
      dur: "01:26",
      num: "01",
      cat: "Short-Form Video",
      company: "Beth Wood",
      desc: "High-retention mobile short edit with punchy hook pacing, custom sound design, dynamic zooms, and kinetic subtitles.",
      poster: "pic/beth-wood.jpg",
      src: ""
    },
    {
      id: 2,
      title: "Guga Gotsadze — Viral Short-Form Edit",
      dur: "00:45",
      num: "02",
      cat: "Short-Form Video",
      company: "Guga Gotsadze",
      desc: "Fast-paced visual storytelling, seamless B-roll cut-ins, motion graphic accents, and animated captions optimized for YouTube Shorts.",
      poster: "pic/guga-gotsadze.jpg",
      src: ""
    },
    {
      id: 3,
      title: "Hub — 3D & 2D Animated Logo Reveal",
      dur: "00:07",
      num: "03",
      cat: "Logo Animation",
      company: "Hub Identity",
      desc: "Fluid vector logo reveal with smooth kinetic motion and brand audio synchronization crafted in Adobe After Effects.",
      poster: "pic/hub.jpg",
      src: ""
    },
    {
      id: 4,
      title: "Jeffrey Bowers — Podcast & Short-Form Cut",
      dur: "00:40",
      num: "04",
      cat: "Podcast & Shorts",
      company: "Jeffrey Bowers",
      desc: "Episodic podcast clipping, filler word removal, clear audio mixing, and engaging vertical framing for viral social sharing.",
      poster: "pic/jeffrey-bowers.jpg",
      src: ""
    },
    {
      id: 5,
      title: "Joseph Lee — Narrative Storytelling Reel",
      dur: "00:39",
      num: "05",
      cat: "Short-Form Video",
      company: "Joseph Lee",
      desc: "Retention-first narrative editing, smooth transitions, atmospheric soundscapes, and bold graphic callouts.",
      poster: "pic/joseph-lee.jpg",
      src: ""
    },
    {
      id: 6,
      title: "Roddy Kok — High-Retention Reel",
      dur: "00:32",
      num: "06",
      cat: "Short-Form Video",
      company: "Roddy Kok",
      desc: "Dynamic hook construction, fast rhythm cuts, animated captions, and sound effects built to maximize viewer completion rate.",
      poster: "pic/roddy-kok.jpg",
      src: ""
    },
    {
      id: 7,
      title: "Kinetic Brand Stinger & Motion Reveal",
      dur: "00:07",
      num: "07",
      cat: "Logo Animation",
      company: "Brand Systems",
      desc: "Energetic 2D motion graphics stinger with custom sound effects designed for video intros and YouTube branding.",
      poster: "pic/whatsapp-logo-1.jpg",
      src: ""
    },
    {
      id: 8,
      title: "2D Vector Identity Reveal",
      dur: "00:04",
      num: "08",
      cat: "Logo Animation",
      company: "Motion Identity",
      desc: "Minimalist vector logo animation with elegant easing curves, shape morphs, and clean brand delivery.",
      poster: "pic/whatsapp-logo-2.jpg",
      src: ""
    },
    {
      id: 9,
      title: "Dynamic Social Stinger Sting",
      dur: "00:03",
      num: "09",
      cat: "Brand Motion",
      company: "Social Branding",
      desc: "Short-form brand stinger for Instagram Reels, YouTube Shorts, and corporate digital presentations.",
      poster: "pic/whatsapp-logo-3.jpg",
      src: ""
    },
    {
      id: 10,
      title: "Micro Logo Accent Bump",
      dur: "00:01",
      num: "10",
      cat: "Motion Graphics",
      company: "Micro Branding",
      desc: "Ultra-fast kinetic logo bumper for rapid video transitions and channel watermarks.",
      poster: "pic/whatsapp-logo-4.jpg",
      src: ""
    }
  ],
  projects: [
    {
      id: 1,
      videoId: 1,
      company: "Short-Form Video Production",
      name: "Viral Social Media & YouTube Shorts",
      desc: "High-retention client edits engineered for YouTube Shorts and Instagram Reels with kinetic subtitles, fast pacing, B-roll overlays, and custom sound design.",
      typeBadge: "Short-Form · Retention · Captions",
      countBadge: "01",
      tags: ["YouTube Shorts", "Pacing & Retention", "Sound Design", "Captions"],
      mainImg: "pic/beth-wood.jpg",
      stripImages: [
        "pic/beth-wood.jpg",
        "pic/guga-gotsadze.jpg",
        "pic/roddy-kok.jpg"
      ]
    },
    {
      id: 2,
      videoId: 3,
      company: "Motion Design & 2D Animation",
      name: "2D & 3D Brand Logo Reveals",
      desc: "Transforming static identity marks into memorable kinetic moments. Fluid shape morphs, vector reveals, and synchronized audio stingers crafted in After Effects.",
      typeBadge: "2D Motion · Stings · Identity",
      countBadge: "02",
      tags: ["After Effects", "Logo Reveals", "2D Motion", "Stingers"],
      mainImg: "pic/hub.jpg",
      stripImages: [
        "pic/hub.jpg",
        "pic/whatsapp-logo-1.jpg",
        "pic/whatsapp-logo-2.jpg"
      ]
    },
    {
      id: 3,
      videoId: 4,
      company: "Podcast & Narrative Editing",
      name: "Podcast Micro-Content & Storytelling",
      desc: "Full episode post-production and short-form snippet extraction. Filler removal, multi-camera rhythm, audio noise gating, and mobile-optimized visual framing.",
      typeBadge: "Podcasts · Storytelling · Audio",
      countBadge: "03",
      tags: ["Podcast Editing", "Storytelling", "Color Grading", "Multicam"],
      mainImg: "pic/jeffrey-bowers.jpg",
      stripImages: [
        "pic/jeffrey-bowers.jpg",
        "pic/joseph-lee.jpg",
        "pic/roddy-kok.jpg"
      ]
    }
  ],
  skills: [
    {
      id: 1,
      icon: "Ae",
      name: "Adobe After Effects",
      desc: "Strongest for 2D logo animation, visual stingers, motion graphics, and vector reveals.",
      percent: 95
    },
    {
      id: 2,
      icon: "Pr",
      name: "Adobe Premiere Pro",
      desc: "Long-form narrative, multi-camera podcasts, B-roll assembly, and master audio finishing.",
      percent: 95
    },
    {
      id: 3,
      icon: "Ai",
      name: "Adobe Illustrator",
      desc: "Vector logo breakdown, shape layer prep, and graphic assets for fluid keyframe animation.",
      percent: 88
    },
    {
      id: 4,
      icon: "Ps",
      name: "Adobe Photoshop",
      desc: "Asset cutouts, thumbnail design, texture overlays, and background matte extension.",
      percent: 85
    },
    {
      id: 5,
      icon: "Cc",
      name: "CapCut Pro",
      desc: "Ultra-fast social media turnaround, auto-caption kinetic formatting, and viral hook pacing.",
      percent: 92
    },
    {
      id: 6,
      icon: "✦",
      name: "2D Motion & Kinetic Type",
      desc: "Custom subtitle typography, transition packages, audio reactive waveforms, and lower thirds.",
      percent: 90
    }
  ],
  experience: [
    {
      id: 1,
      period: "CURRENT",
      role: "Lead Video Editor & Motion Designer",
      company: "Freelance Collaboration",
      desc: "Directing full post-production on long-form YouTube series, client shorts (Beth Wood, Guga Gotsadze, Roddy Kok), viral reels, B-roll grading, kinetic captions, and promotional video campaigns.",
      color: "#E8451A"
    },
    {
      id: 2,
      period: "2025—2026",
      role: "Logo Animator & Video Editor",
      company: "SN Solution",
      desc: "Delivered custom 2D logo animations, brand identity reveal stingers (Hub Logo, Kinetic Stings), and short-form marketing content built directly from brand guidelines.",
      color: "#E8451A"
    },
    {
      id: 3,
      period: "ONGOING",
      role: "Motion Design & Digital Content Creator",
      company: "Independent Studio",
      desc: "End-to-end visual content workflow — footage ingestion, rough cut assembly, sound design, logo branding, and final publishing optimization.",
      color: "#FF8C5A"
    }
  ]
};

const STORAGE_KEY = 'hamza_irfan_portfolio_data_v2';

function getPortfolioData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      savePortfolioData(DEFAULT_PORTFOLIO_DATA);
      return DEFAULT_PORTFOLIO_DATA;
    }
    const parsed = JSON.parse(raw);
    // If the stored data is still pointing to old Unsplash video placeholders, upgrade it to the new real videos
    if (parsed.videos && parsed.videos.length > 0 && parsed.videos[0].poster && parsed.videos[0].poster.includes('unsplash')) {
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
  a.download = `hamza-khan-portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
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
