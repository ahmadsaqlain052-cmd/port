/* ========================================================
   HAMZA KHAN PORTFOLIO — CENTRAL DATA STORE & CMS ENGINE
   Supports real-time localStorage persistence, import & export
   ======================================================== */

const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Hamza Khan",
    initials: "HK",
    badge: "Video Editor · Motion Designer · Logo Animator",
    headline: "I edit stories.<br>I animate identities.",
    subhead: "I turn raw footage into polished, engaging content — and bring static logos to life with clean, memorable motion.",
    email: "hamzakhan.edits@gmail.com",
    location: "Worldwide / Remote Collaboration",
    focus: "Video Editing + Logo Animation",
    availability: "Available for freelance & remote projects",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
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
      title: "Cinematic Long-Form Reel",
      dur: "02:15",
      num: "01",
      cat: "Video Editing",
      company: "Commercial Reel",
      desc: "Dynamic narrative pacing, high-impact cuts, sound design, and color grading for commercial productions.",
      poster: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=800&auto=format&fit=crop",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      id: 2,
      title: "Brand Logo Reveal Animation",
      dur: "00:15",
      num: "02",
      cat: "Logo Animation",
      company: "Identity Motion",
      desc: "2D kinetic motion, sleek transitions, and custom brand stingers crafted in Adobe After Effects.",
      poster: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4"
    },
    {
      id: 3,
      title: "Full Podcast Production",
      dur: "04:30",
      num: "03",
      cat: "Podcast Editing",
      company: "Studio Podcast",
      desc: "Multi-cam sync, audio enhancement, filler word removal, engaging B-roll overlays, and graphic inserts.",
      poster: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    {
      id: 4,
      title: "Social Media Short-Form Viral Cuts",
      dur: "00:45",
      num: "04",
      cat: "Short-Form",
      company: "TikTok & Reels",
      desc: "Fast-paced hooks, animated captions, kinetic sound effects, and retention-focused visual pacing.",
      poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
      id: 5,
      title: "2D Geometric Logo Motion",
      dur: "00:20",
      num: "05",
      cat: "Motion Graphics",
      company: "Brand Systems",
      desc: "Vector animation, fluid shape morphing, and polished intros that elevate brand identity.",
      poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
      id: 6,
      title: "Custom Title & Lower Thirds Package",
      dur: "01:10",
      num: "06",
      cat: "Visual Effects",
      company: "Post Production",
      desc: "Custom animated lower thirds, clean transition stingers, and title cards for YouTube and broadcast.",
      poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
    }
  ],
  projects: [
    {
      id: 1,
      videoId: 1,
      company: "Video Production",
      name: "Long-Form Storytelling & Finishing",
      desc: "High-retention editing, cinematic color pass, narrative sound design, and clean transitions designed for maximum audience engagement.",
      typeBadge: "Long-Form · Pacing · B-Roll",
      countBadge: "01",
      tags: ["Premiere Pro", "Color Grading", "Sound Design"],
      mainImg: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=800&auto=format&fit=crop",
      stripImages: [
        "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: 2,
      videoId: 2,
      company: "Motion Design",
      name: "Brand Logo Reveals & Animation",
      desc: "Transforming static vectors and typography into memorable, fluid brand statements with custom sound synchronization.",
      typeBadge: "2D Motion · Stings · Identity",
      countBadge: "02",
      tags: ["After Effects", "Illustrator", "Kinetic Motion"],
      mainImg: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
      stripImages: [
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
      ]
    },
    {
      id: 3,
      videoId: 3,
      company: "Content Production",
      name: "Full Podcast Series & Micro-Snippets",
      desc: "Clean episodic cutting, audio noise gating, multicam switching, and high-impact micro-clips optimized for TikTok and YouTube Shorts.",
      typeBadge: "Full Episodes · Multi-Cam · Audio",
      countBadge: "03",
      tags: ["Multicam", "Audio Polish", "Shorts Conversion"],
      mainImg: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
      stripImages: [
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=800&auto=format&fit=crop"
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
      desc: "Directing full post-production on long-form YouTube series, studio podcasts, viral vertical reels, B-roll grading, kinetic captions, and promotional video campaigns with international creators and production collaborators.",
      color: "#E8451A"
    },
    {
      id: 2,
      period: "2025—2026",
      role: "Logo Animator & Video Editor",
      company: "SN Solution",
      desc: "Delivered custom 2D logo animations, brand identity reveal stingers, and short-form marketing content built directly from brand guidelines and client production notes.",
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

const STORAGE_KEY = 'hamza_khan_portfolio_data_v1';

function getPortfolioData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      savePortfolioData(DEFAULT_PORTFOLIO_DATA);
      return DEFAULT_PORTFOLIO_DATA;
    }
    const parsed = JSON.parse(raw);
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
