/* ========================================================
   HAMZA IRFAN — PORTFOLIO CORE SCRIPT & DYNAMIC RENDERER
   3D Motion Graphics, Curved Slider, Tilt, Lightbox & Live CMS Sync
   ======================================================== */

// Global State
let data = typeof getPortfolioData === 'function' ? getPortfolioData() : {};

// Render Dynamic Sections
function renderPortfolioDOM() {
  data = getPortfolioData();
  const p = data.profile;

  // 1. Branding & Navigation
  document.title = `${p.name} — ${p.focus || 'Video Editor & Logo Animator'}`;
  const brandInitials = document.getElementById('domBrandInitials');
  const brandName = document.getElementById('domBrandName');
  const loaderInitials = document.getElementById('domLoaderInitials');
  if (brandInitials) brandInitials.textContent = p.initials;
  if (brandName) brandName.textContent = p.name;
  if (loaderInitials) loaderInitials.textContent = p.initials;

  // 2. Hero Section
  const heroBadge = document.getElementById('domHeroBadge');
  const heroH1 = document.getElementById('domHeroH1');
  const heroSub = document.getElementById('domHeroSub');
  const servPills = document.getElementById('domServPills');

  if (heroBadge) heroBadge.innerHTML = `<b>●</b> ${p.badge}`;
  if (heroH1) {
    heroH1.innerHTML = p.headline;
    initHeroTitleAnimation();
  }
  if (heroSub) heroSub.textContent = p.subhead;

  if (servPills && data.servicesPills) {
    servPills.innerHTML = data.servicesPills.map(s => `<span>${s}</span>`).join('<i></i>');
  }

  // 3. Marquee Ticker
  const mqTrack = document.getElementById('domMqTrack');
  if (mqTrack && data.marquee) {
    const doubleList = [...data.marquee, ...data.marquee];
    mqTrack.innerHTML = doubleList.map(item => `<span>${item}</span>`).join('');
  }

  // 3.5 Dedicated Master Showreel Cinema Theater Stage
  renderShowreelTheater();

  // 4. Category Filters & Featured Videos Showcase Grid
  renderCategoryFilters();
  renderFilteredVideos();



  // 6. Skills & Toolkit Grid
  const skillsGrid = document.getElementById('domSkillsGrid');
  if (skillsGrid && data.skills) {
    skillsGrid.innerHTML = data.skills.map(s => `
      <div class="sk">
        <div class="sk-icon">${s.icon}</div>
        <div class="sk-name">${s.name}</div>
        <p class="sk-desc">${s.desc}</p>
        <div class="sk-bar-bg"><div class="sk-bar" style="width: ${s.percent}%;"></div></div>
      </div>
    `).join('');
  }

  // 7. Work History Timeline & Stats
  const expTimeline = document.getElementById('domExpTimeline');
  if (expTimeline && data.experience) {
    expTimeline.innerHTML = data.experience.map(e => `
      <div class="tl-item">
        <div class="tl-date">${e.period}</div>
        <div class="tl-line"><div class="tl-dot" style="${e.color ? `background:${e.color}` : ''}"></div></div>
        <div>
          <h3 class="tl-title">${e.role}</h3>
          <div class="tl-company">${e.company}</div>
          <p class="tl-desc">${e.desc}</p>
        </div>
      </div>
    `).join('');
  }

  const expStats = document.getElementById('domExpStats');
  if (expStats && p.stats) {
    expStats.innerHTML = p.stats.map(st => `
      <div>
        <div class="sn">${st.num}</div>
        <div class="sl">${st.label}</div>
      </div>
    `).join('');
  }

  // 8. Footer
  const ftHireText = document.getElementById('domFtHireText');
  const ftName = document.getElementById('ftName');
  const ftCopy = document.getElementById('domFtCopy');

  if (ftHireText) ftHireText.textContent = p.hireText || 'Ready to turn raw ideas into scroll-stopping video content?';
  if (ftName) {
    ftName.textContent = p.name || 'OpenView Creatives';
    initFooterNameAnimation();
  }
  if (ftCopy) ftCopy.textContent = `© 2026 ${p.name || 'OpenView Creatives'} — Video Production & Motion Design. All rights reserved.`;

  // Re-bind interactive events
  bindVideoCardClicks();
  initObserverAndBars();
  init3DCurvedSlider();
  init3DCurvedLandscapeSlider();
}

// Helper: Get fallback path between compressed/ and vid/
function getFallbackVideoSrc(src) {
  if (!src) return '';
  if (src.startsWith('compressed/')) {
    return src.replace(/^compressed\//, 'vid/');
  }
  if (src.startsWith('vid/')) {
    return src.replace(/^vid\//, 'compressed/');
  }
  return '';
}

// Helper: Attach Hover-to-Play (with Audio + Unmute/Mute toggle) / Leave-to-Pause inline video preview on any card
let userMutedHoverPreference = false;

function attachHoverVideoPreview(cardEl, thumbContainer, videoSrc, onHoverChange) {
  if (!cardEl || !thumbContainer || !videoSrc) return;

  const hoverVid = document.createElement('video');
  hoverVid.className = 'hover-preview-vid';
  hoverVid.muted = false;
  hoverVid.volume = 1.0;
  hoverVid.loop = true;
  hoverVid.playsInline = true;
  hoverVid.setAttribute('playsinline', '');
  hoverVid.preload = 'none';
  thumbContainer.appendChild(hoverVid);

  const audioBtn = document.createElement('button');
  audioBtn.type = 'button';
  audioBtn.className = 'hover-audio-btn';
  audioBtn.setAttribute('aria-label', 'Toggle Audio');
  audioBtn.innerHTML = '🔊 <span>Sound</span>';
  thumbContainer.appendChild(audioBtn);

  function updateAudioBtnUI() {
    if (hoverVid.muted) {
      audioBtn.innerHTML = '🔇 <span>Unmute</span>';
      audioBtn.classList.add('is-muted');
    } else {
      audioBtn.innerHTML = '🔊 <span>Sound On</span>';
      audioBtn.classList.remove('is-muted');
    }
  }

  audioBtn.addEventListener('click', e => {
    e.stopPropagation();
    hoverVid.muted = !hoverVid.muted;
    userMutedHoverPreference = hoverVid.muted;
    if (!hoverVid.muted) {
      hoverVid.volume = 1.0;
      const theaterVid = document.getElementById('theaterVideo');
      if (theaterVid && !theaterVid.paused) {
        theaterVid.pause();
      }
      hoverVid.play().catch(() => {});
    }
    updateAudioBtnUI();
  });

  function playHoverWithAudioFallback() {
    const theaterVid = document.getElementById('theaterVideo');
    if (theaterVid && !theaterVid.paused) {
      theaterVid.pause();
    }
    hoverVid.muted = userMutedHoverPreference;
    hoverVid.volume = 1.0;
    hoverVid.play().then(() => {
      updateAudioBtnUI();
    }).catch(() => {
      // Browser blocked unmuted autoplay prior to first user click -> play muted & show Unmute button
      hoverVid.muted = true;
      updateAudioBtnUI();
      hoverVid.play().catch(() => {});
    });
  }

  hoverVid.addEventListener('error', () => {
    if (hoverVid.dataset.fallbackTried === 'true') return;
    const currentSrc = hoverVid.getAttribute('src') || '';
    const fallbackSrc = getFallbackVideoSrc(currentSrc);
    if (fallbackSrc) {
      hoverVid.dataset.fallbackTried = 'true';
      hoverVid.src = fallbackSrc;
      hoverVid.load();
      if (cardEl.classList.contains('hover-playing')) {
        playHoverWithAudioFallback();
      }
    }
  });

  cardEl.addEventListener('mouseenter', () => {
    if (typeof onHoverChange === 'function') onHoverChange(true);
    if (!hoverVid.getAttribute('src')) {
      hoverVid.dataset.fallbackTried = 'false';
      hoverVid.src = videoSrc;
      hoverVid.load();
    }
    cardEl.classList.add('hover-playing');
    playHoverWithAudioFallback();
  });

  cardEl.addEventListener('mouseleave', () => {
    if (typeof onHoverChange === 'function') onHoverChange(false);
    cardEl.classList.remove('hover-playing');
    hoverVid.pause();
  });

  return hoverVid;
}

// Bind Video Click handlers to Lightbox (excluding .vid-card which binds its own filtered list)
function bindVideoCardClicks() {
  document.querySelectorAll('[data-video]:not(.vid-card)').forEach(btn => {
    if (btn.dataset.boundClick === 'true') return;
    btn.dataset.boundClick = 'true';
    btn.addEventListener('click', () => {
      const rawId = btn.dataset.video;
      const allIds = data.videos.map(v => v.id);
      const idx = allIds.findIndex(id => String(id) === String(rawId));
      if (idx !== -1) {
        openLightbox(allIds, idx);
      } else if (rawId === 'master-showreel') {
        openLightbox(['master-showreel'], 0);
      }
    });
  });
}

// Dedicated Master Showreel Cinema Theater Engine
function renderShowreelTheater() {
  const showreel = data.showreel || (typeof DEFAULT_PORTFOLIO_DATA !== 'undefined' ? DEFAULT_PORTFOLIO_DATA.showreel : null);
  if (!showreel) return;

  const badgeEl = document.getElementById('domShowreelBadge');
  const titleEl = document.getElementById('domShowreelTitle');
  const descEl = document.getElementById('domShowreelDesc');
  const highlightsEl = document.getElementById('domShowreelHighlights');
  const videoEl = document.getElementById('theaterVideo');

  if (badgeEl) badgeEl.textContent = showreel.badge || '2026 OFFICIAL SHOWREEL';
  if (titleEl) titleEl.textContent = showreel.title || 'MASTER EDITING & MOTION REEL';
  if (descEl) descEl.textContent = showreel.desc || '';

  if (highlightsEl && showreel.highlights) {
    highlightsEl.innerHTML = showreel.highlights.map(h => `<span class="tt-tag">${h}</span>`).join('');
  }

  if (videoEl) {
    if (showreel.poster) videoEl.poster = showreel.poster;
    const targetSrc = showreel.src || 'vid/intro-showreel.mp4';
    const sourceChild = videoEl.querySelector('source');
    if (sourceChild) sourceChild.remove();
    if (videoEl.getAttribute('src') !== targetSrc) {
      videoEl.dataset.fallbackTried = 'false';
      videoEl.src = targetSrc;
      videoEl.load();
    }
  }

  initShowreelTheater();
}

let theaterEventsBound = false;
let userManuallyPaused = false;
let userManuallyMutedShowreel = false;
let lastTheaterVolume = 1.0;
let controlsFadeTimeout = null;

function initShowreelTheater() {
  const screen = document.querySelector('.theater-screen');
  const video = document.getElementById('theaterVideo');
  const playBtn = document.getElementById('theaterPlayBtn');
  const centerAction = document.getElementById('theaterCenterAction');
  const muteBtn = document.getElementById('theaterMuteBtn');
  const muteIcon = document.getElementById('theaterMuteIcon');
  const muteTxt = document.getElementById('theaterMuteTxt');
  const volSlider = document.getElementById('theaterVolumeSlider');
  const fsBtn = document.getElementById('theaterFullscreenBtn');

  if (!screen || !video) return;

  function pingControls() {
    screen.classList.add('user-active');
    clearTimeout(controlsFadeTimeout);
    if (!video.paused) {
      controlsFadeTimeout = setTimeout(() => {
        screen.classList.remove('user-active');
      }, 2400);
    }
  }

  function updateTheaterMuteUI() {
    if (muteBtn) {
      muteBtn.classList.toggle('is-muted', video.muted || video.volume === 0);
    }
    if (muteIcon && muteTxt) {
      if (video.muted || video.volume === 0) {
        muteIcon.textContent = '🔇';
        muteTxt.textContent = 'Unmute';
      } else {
        muteIcon.textContent = '🔊';
        muteTxt.textContent = 'Sound On';
      }
    }
    if (volSlider) {
      volSlider.value = (video.muted || video.volume === 0) ? 0 : video.volume;
    }
  }

  video.loop = true;

  const startTheaterPlayback = () => {
    if (userManuallyPaused) return;
    video.muted = userManuallyMutedShowreel;
    video.volume = lastTheaterVolume;
    video.play().then(() => {
      updateTheaterMuteUI();
      screen.classList.add('playing');
      screen.classList.remove('user-paused');
      pingControls();
    }).catch(() => {
      // Browser requires muted autoplay until first interaction
      video.muted = true;
      updateTheaterMuteUI();
      video.play().then(() => {
        screen.classList.add('playing');
        screen.classList.remove('user-paused');
        pingControls();
      }).catch(() => {});
    });
  };
  startTheaterPlayback();

  function togglePlay() {
    if (video.paused || video.ended) {
      userManuallyPaused = false;
      const activeLbVideo = document.getElementById('lbVideo');
      if (activeLbVideo && !activeLbVideo.paused) {
        activeLbVideo.pause();
      }
      if (!userManuallyMutedShowreel) {
        video.muted = false;
        video.volume = lastTheaterVolume || 1.0;
      }
      video.play().then(() => {
        updateTheaterMuteUI();
        screen.classList.add('playing');
        screen.classList.remove('user-paused');
        pingControls();
      }).catch(err => {
        console.warn('Theater playback requires interaction:', err);
      });
    } else if (video.muted && !userManuallyMutedShowreel) {
      // First tap on a browser-muted autoplaying showreel unmutes it instead of pausing!
      video.muted = false;
      video.volume = lastTheaterVolume || 1.0;
      updateTheaterMuteUI();
      pingControls();
    } else {
      userManuallyPaused = true;
      video.pause();
      screen.classList.remove('playing');
      screen.classList.add('user-paused');
      screen.classList.add('user-active');
    }
  }

  if (!theaterEventsBound) {
    theaterEventsBound = true;

    // Fallback to vid/ if compressed/ fails to load (or vice versa)
    video.addEventListener('error', () => {
      if (video.dataset.fallbackTried === 'true') return;
      const currentSrc = video.getAttribute('src') || '';
      const fallbackSrc = getFallbackVideoSrc(currentSrc);
      if (fallbackSrc) {
        video.dataset.fallbackTried = 'true';
        video.src = fallbackSrc;
        video.load();
        startTheaterPlayback();
      }
    });

    // Auto-pause immediately when scrolled away or scrolled up
    if ('IntersectionObserver' in window) {
      const showreelObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.25) {
            if (!video.paused) {
              video.pause();
              screen.classList.remove('playing');
            }
          } else {
            if (video.paused && !userManuallyPaused) {
              startTheaterPlayback();
            }
          }
        });
      }, { threshold: [0, 0.25, 0.5, 0.75] });
      showreelObserver.observe(screen);
    }

    // Scroll listener fallback: if video is scrolled off screen, pause immediately
    window.addEventListener('scroll', () => {
      const rect = screen.getBoundingClientRect();
      if (rect.bottom < 50 || rect.top > (window.innerHeight - 50)) {
        if (!video.paused) {
          video.pause();
          screen.classList.remove('playing');
        }
      }
    }, { passive: true });

    // Tapping the screen or play button toggles play/pause (or unmutes on first click)
    screen.addEventListener('click', e => {
      if (e.target.closest('#theaterSoundPanel') || e.target.closest('#theaterMuteBtn') || e.target.closest('#theaterFullscreenBtn')) {
        return;
      }
      togglePlay();
    });

    // Hovering over the showreel attempts to enable audio if not manually muted
    screen.addEventListener('mouseenter', () => {
      pingControls();
      if (!video.paused && video.muted && !userManuallyMutedShowreel) {
        video.muted = false;
        video.volume = lastTheaterVolume || 1.0;
        video.play().then(() => {
          updateTheaterMuteUI();
        }).catch(() => {
          video.muted = true;
          updateTheaterMuteUI();
        });
      }
    });

    screen.addEventListener('mousemove', pingControls);
    screen.addEventListener('touchstart', pingControls, { passive: true });

    video.addEventListener('play', () => {
      screen.classList.add('playing');
      screen.classList.remove('user-paused');
      updateTheaterMuteUI();
      pingControls();
    });

    video.addEventListener('pause', () => {
      screen.classList.remove('playing');
    });

    video.addEventListener('ended', () => {
      screen.classList.remove('playing');
      screen.classList.add('user-paused');
      video.currentTime = 0;
    });

    if (muteBtn) {
      muteBtn.addEventListener('click', e => {
        e.stopPropagation();
        video.muted = !video.muted;
        userManuallyMutedShowreel = video.muted;
        if (!video.muted) {
          if (video.volume === 0) {
            video.volume = lastTheaterVolume || 1.0;
          }
          if (video.paused) {
            userManuallyPaused = false;
            video.play().catch(() => {});
          }
        }
        updateTheaterMuteUI();
        pingControls();
      });
    }

    if (volSlider) {
      volSlider.addEventListener('click', e => e.stopPropagation());
      volSlider.addEventListener('input', e => {
        e.stopPropagation();
        const val = parseFloat(volSlider.value);
        video.volume = val;
        if (val > 0) {
          lastTheaterVolume = val;
          video.muted = false;
          userManuallyMutedShowreel = false;
          if (video.paused) {
            userManuallyPaused = false;
            video.play().catch(() => {});
          }
        } else {
          video.muted = true;
          userManuallyMutedShowreel = true;
        }
        updateTheaterMuteUI();
        pingControls();
      });
    }

    // Clicking any "Watch Showreel" CTA button unmutes and plays the showreel
    document.querySelectorAll('a[href="#showreel"]').forEach(link => {
      link.addEventListener('click', () => {
        userManuallyPaused = false;
        userManuallyMutedShowreel = false;
        video.muted = false;
        video.volume = lastTheaterVolume || 1.0;
        video.play().then(() => {
          updateTheaterMuteUI();
          screen.classList.add('playing');
          screen.classList.remove('user-paused');
          pingControls();
        }).catch(() => {});
      });
    });

    if (fsBtn) {
      fsBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
          if (screen.requestFullscreen) {
            screen.requestFullscreen();
          } else if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
        pingControls();
      });
    }
  }
}

let activeCategory = 'all';

function renderCategoryFilters() {
  const filtersContainer = document.getElementById('domVidFilters');
  if (!filtersContainer) return;
  const cats = data.categories || [
    { key: "all", label: `All Works (${data.videos.length})` },
    { key: "hooks", label: "Commercial Hooks" },
    { key: "podcast", label: "Podcast Production" },
    { key: "motion", label: "Motion Graphics" },
    { key: "shorts", label: "Viral Shorts (9:16)" },
    { key: "logo", label: "Logo Animations" }
  ];

  filtersContainer.innerHTML = cats.map(c => `
    <button class="vid-filter-btn ${c.key === activeCategory ? 'active' : ''}" type="button" data-cat="${c.key}">
      ${c.label}
    </button>
  `).join('');

  filtersContainer.querySelectorAll('.vid-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderCategoryFilters();
      renderFilteredVideos();
    });
  });
}

function renderFilteredVideos() {
  const vidGrid = document.getElementById('domVidGrid');
  if (!vidGrid || !data.videos) return;

  const filtered = activeCategory === 'all' 
    ? data.videos 
    : data.videos.filter(v => v.categoryKey === activeCategory);

  vidGrid.innerHTML = filtered.map(v => `
    <button class="vid-card ${v.orientation || (v.aspect === '16:9' ? 'landscape' : 'vertical')}" type="button" data-video="${v.id}" aria-label="Play ${v.title}">
      <div class="vid-thumb">
        <img src="${v.poster}" alt="${v.title}" loading="lazy" />
        <span class="vid-aspect-badge">${v.aspect || (v.orientation === 'vertical' ? '9:16' : '16:9')}</span>
        <div class="vid-play"><i></i></div>
        <div class="vid-dur">${v.dur}</div>
        <div class="vid-info">
          <div class="vid-num">${v.num || '0' + v.id} / ${(v.cat || 'VIDEO').toUpperCase()}</div>
          <div class="vid-title">${v.title}</div>
        </div>
      </div>
    </button>
  `).join('');

  vidGrid.querySelectorAll('.vid-card').forEach(btn => {
    const vidId = btn.dataset.video;
    const videoObj = filtered.find(item => String(item.id) === String(vidId));
    const thumbEl = btn.querySelector('.vid-thumb');
    const hoverVid = videoObj ? attachHoverVideoPreview(btn, thumbEl, videoObj.src) : null;

    btn.addEventListener('click', () => {
      if (hoverVid) {
        btn.classList.remove('hover-playing');
        hoverVid.pause();
      }
      const allIds = filtered.map(item => String(item.id));
      const idx = allIds.indexOf(String(vidId));
      openLightbox(filtered.map(item => item.id), idx >= 0 ? idx : 0);
    });
  });
}

// Scroll progress, floating nav shrink, active section spy
const nav = document.getElementById('nav');
const progressBar = document.getElementById('progress');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section, .hz');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  
  if (progressBar && h > 0) {
    progressBar.style.width = (y / h * 100) + '%';
  }
  
  if (nav) {
    nav.classList.toggle('scrolled', y > 30);
  }
  
  navLinks.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const isActive = rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2;
    a.classList.toggle('active', isActive);
  });
}, { passive: true });

// Mobile Navigation Burger
const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav-links');
if (burger && navMenu) {
  burger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Scroll Reveal + Skill Bars + Counter Tickers
function initObserverAndBars() {
  document.querySelectorAll('.sec-lbl, .sec-title, .proj-card, .sk, .tl-item, .cc, .ct-main, .vid-card').forEach(el => {
    el.classList.add('reveal');
    const siblingIdx = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    el.style.transitionDelay = Math.min(siblingIdx, 6) * 90 + 'ms';
  });

  document.querySelectorAll('.sk-bar').forEach(bar => {
    bar.dataset.w = bar.style.width || '80%';
    bar.style.width = '0';
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      revealObserver.unobserve(entry.target);
      entry.target.classList.add('in');
      
      const bar = entry.target.querySelector('.sk-bar');
      if (bar) {
        bar.style.width = bar.dataset.w;
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Counter animation
  document.querySelectorAll('.sn').forEach(el => {
    const match = el.textContent.match(/^(\d+)(\+?)$/);
    if (!match) return;
    const num = +match[1];
    const suffix = match[2];
    let startTime = null;
    el.textContent = '0' + suffix;
    
    const step = time => {
      startTime = startTime || time;
      const progress = Math.min((time - startTime) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(num * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    
    setTimeout(() => requestAnimationFrame(step), 650);
  });
}

// Split hero headline into kinetic word elements (one-word animation keeping existing style)
function initHeroTitleAnimation() {
  const h1 = document.querySelector('.hz h1');
  if (!h1) return;
  let counter = 0;
  
  function walk(node) {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(token => {
          if (!token) return;
          if (/^\s+$/.test(token)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const word = document.createElement('span');
          word.className = 'wd';
          const wordAnim = document.createElement('i');
          wordAnim.className = 'ch';
          wordAnim.style.setProperty('--i', counter++);
          wordAnim.textContent = token;
          word.appendChild(wordAnim);
          frag.appendChild(word);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && child.tagName !== 'BR') {
        walk(child);
      }
    });
  }
  walk(h1);
}

// Giant Footer Name Word Slice & Responsive Auto-Fit
function initFooterNameAnimation() {
  const ft = document.getElementById('ftName');
  if (!ft) return;
  const rawText = ft.textContent.trim();
  const words = rawText.split(/\s+/);
  ft.innerHTML = words.map((word, idx) => {
    return `<span class="fc"><i style="--i:${idx}">${word}</i></span>`;
  }).join('<span class="sp"></span>');
  ft.setAttribute('aria-label', rawText);

  const fitName = () => {
    const parent = ft.parentElement;
    if (!parent) return;
    const cs = getComputedStyle(parent);
    const containerWidth = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    ft.style.display = 'inline-block';
    ft.style.fontSize = '100px';
    const testWidth = ft.offsetWidth || 1;
    ft.style.display = '';
    ft.style.fontSize = (100 * containerWidth / testWidth * 0.985) + 'px';
  };

  fitName();
  window.addEventListener('resize', fitName);
  window.addEventListener('load', fitName);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitName);
  }

  document.querySelectorAll('.ft-top, .ft-cta, .ft-copy').forEach(el => {
    el.classList.add('reveal');
  });
}

// Interactive Glow Tracker & 3D Hover Tilt
(function initPhysicsAndTilt() {
  if (!window.matchMedia('(hover:hover)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'glow';
  document.body.appendChild(glow);

  let gx = 0, gy = 0, tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  window.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
  });

  function loop() {
    gx += (tx - gx) * 0.1;
    gy += (ty - gy) * 0.1;
    glow.style.transform = `translate(${gx - 210}px, ${gy - 210}px)`;
    requestAnimationFrame(loop);
  }
  loop();

  // 3D card tilt
  const tilt = (element, maxAngle, extraTransform = '') => {
    element.addEventListener('mousemove', e => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      element.style.transform = `perspective(800px) rotateX(${-y * maxAngle}deg) rotateY(${x * maxAngle}deg)${extraTransform}`;
    });
    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  };

  document.querySelectorAll('.vid-thumb').forEach(el => tilt(el, 10, ' translateY(-5px)'));

  // Magnetic button attraction
  document.querySelectorAll('.pill-o, .pill-g, .btn-br, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * 0.25;
      const dy = (e.clientY - r.top - r.height / 2) * 0.35;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


// 3D Curved Infinity Slider (Hero Carousel)
let sliderAnimId = null;

function init3DCurvedSlider() {
  const container = document.getElementById('cf');
  if (!container) return;
  if (sliderAnimId) cancelAnimationFrame(sliderAnimId);
  container.innerHTML = '';

  const CARD_WIDTH = container.clientWidth < 440 ? 125 : (container.clientWidth < 768 ? 150 : (container.clientWidth < 1024 ? 170 : 190));
  const STEP = CARD_WIDTH + (container.clientWidth < 440 ? 12 : 20);

  // Build items array strictly with vertical reels & logo animations (NO intro video)
  const verticalItems = (data.videos || []).filter(v => v.orientation === 'vertical' && v.id !== 'master-showreel');
  const sliderItems = verticalItems.length ? verticalItems : (data.videos || []);
  const items = sliderItems.map(v => ({ id: v.id, src: v.poster, videoSrc: v.src, title: v.title }));

  const TOTAL_ITEMS = items.length;
  if (TOTAL_ITEMS === 0) return;
  const TOTAL_WIDTH = TOTAL_ITEMS * STEP;
  let offset = 0;
  let velocity = 0.95;
  let isCardHovered = false;
  let isDragging = false;
  let startX = 0;
  let startOffset = 0;
  let dragDistance = 0;

  const cardElements = items.map(item => {
    const card = document.createElement('div');
    card.className = 'cf-card';
    card.innerHTML = `
      <img alt="${item.title}" draggable="false" src="${item.src}">
      <span class="cf-play" title="Play"></span>
    `;

    const hoverVid = attachHoverVideoPreview(card, card, item.videoSrc, hovering => {
      isCardHovered = hovering;
    });

    card.addEventListener('click', () => {
      if (dragDistance < 10 && item.id) {
        if (hoverVid) {
          card.classList.remove('hover-playing');
          hoverVid.pause();
        }
        const allIds = data.videos.map(v => v.id);
        const idx = allIds.findIndex(id => String(id) === String(item.id));
        openLightbox(allIds, idx >= 0 ? idx : 0);
      }
    });

    container.appendChild(card);
    return card;
  });

  function renderFrame() {
    if (!isDragging && !isCardHovered) {
      offset += velocity;
    }
    const halfWidth = container.clientWidth / 2;
    const scaleFactor = container.clientWidth < 700 ? 0.82 : 1.0;

    cardElements.forEach((card, i) => {
      const rel = ((((i * STEP - offset) % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH) - TOTAL_WIDTH / 2;
      const d = rel / halfWidth;
      const absD = Math.min(Math.abs(d), 1);
      const x = rel * (0.5 + 0.5 * absD);
      const rot = -Math.max(-1.2, Math.min(1.2, d)) * 40;
      const scale = (0.5 + 0.62 * Math.pow(absD, 1.3)) * scaleFactor;

      card.style.transform = `translate3d(${x}px, 0, 0) rotateY(${rot}deg) scale(${scale})`;
      card.style.zIndex = card.classList.contains('hover-playing') ? 200 : Math.round(absD * 100);
    });

    sliderAnimId = requestAnimationFrame(renderFrame);
  }
  renderFrame();

  container.addEventListener('pointerdown', e => {
    isDragging = true;
    dragDistance = 0;
    startX = e.clientX;
    startOffset = offset;
    container.classList.add('drag');
  });

  window.addEventListener('pointermove', e => {
    if (!isDragging) return;
    dragDistance = Math.max(dragDistance, Math.abs(e.clientX - startX));
    offset = startOffset - (e.clientX - startX);
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
    container.classList.remove('drag');
    setTimeout(() => { dragDistance = 0; }, 50);
  });

  container.addEventListener('mouseenter', () => { velocity = 0.45; });
  container.addEventListener('mouseleave', () => { velocity = 0.95; });
}

// 3D Curved Infinity Landscape Slider (16:9 Commercial & Podcast Showcase)
let landscapeSliderAnimId = null;

function init3DCurvedLandscapeSlider() {
  const container = document.getElementById('cfLandscape');
  if (!container) return;
  if (landscapeSliderAnimId) cancelAnimationFrame(landscapeSliderAnimId);
  container.innerHTML = '';

  const CARD_WIDTH = container.clientWidth < 440 ? 230 : (container.clientWidth < 768 ? 270 : (container.clientWidth < 1024 ? 290 : 330));
  const STEP = CARD_WIDTH + (container.clientWidth < 440 ? 14 : 24);

  // Filter strictly 16:9 landscape videos (commercial hooks, podcasts, motion)
  const landscapeVideos = (data.videos || []).filter(v => v.aspect === '16:9' || v.orientation === 'landscape');
  const items = landscapeVideos.map(v => ({
    id: v.id,
    src: v.poster,
    videoSrc: v.src,
    title: v.title,
    cat: v.cat || 'Commercial Edit',
    dur: v.dur || '00:30',
    aspect: v.aspect || '16:9'
  }));

  const TOTAL_ITEMS = items.length;
  if (TOTAL_ITEMS === 0) return;
  const TOTAL_WIDTH = TOTAL_ITEMS * STEP;
  let offset = 0;
  let velocity = 0.85;
  let isCardHovered = false;
  let isDragging = false;
  let startX = 0;
  let startOffset = 0;
  let dragDistance = 0;

  const cardElements = items.map(item => {
    const card = document.createElement('div');
    card.className = 'cf-landscape-card';
    card.innerHTML = `
      <img alt="${item.title}" draggable="false" src="${item.src}">
      <span class="cfl-tag">${item.aspect}</span>
      <span class="cfl-dur">${item.dur}</span>
      <div class="cfl-play"><i></i></div>
      <div class="cfl-info">
        <span class="cfl-cat">${item.cat}</span>
        <span class="cfl-title">${item.title}</span>
      </div>
    `;

    const hoverVid = attachHoverVideoPreview(card, card, item.videoSrc, hovering => {
      isCardHovered = hovering;
    });

    card.addEventListener('click', () => {
      if (dragDistance < 10 && item.id) {
        if (hoverVid) {
          card.classList.remove('hover-playing');
          hoverVid.pause();
        }
        const allIds = data.videos.map(v => v.id);
        const idx = allIds.findIndex(id => String(id) === String(item.id));
        openLightbox(allIds, idx >= 0 ? idx : 0);
      }
    });

    container.appendChild(card);
    return card;
  });

  function renderLandscapeFrame() {
    if (!isDragging && !isCardHovered) {
      offset += velocity;
    }
    const halfWidth = container.clientWidth / 2;
    const scaleFactor = container.clientWidth < 700 ? 0.85 : 1.0;

    cardElements.forEach((card, i) => {
      const rel = ((((i * STEP - offset) % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH) - TOTAL_WIDTH / 2;
      const d = rel / halfWidth;
      const absD = Math.min(Math.abs(d), 1);
      const x = rel * (0.6 + 0.4 * absD);
      const rot = -Math.max(-1.1, Math.min(1.1, d)) * 32;
      const scale = (0.55 + 0.55 * Math.pow(absD, 1.25)) * scaleFactor;

      card.style.transform = `translate3d(${x}px, 0, 0) rotateY(${rot}deg) scale(${scale})`;
      card.style.zIndex = card.classList.contains('hover-playing') ? 200 : Math.round(absD * 100);
    });

    landscapeSliderAnimId = requestAnimationFrame(renderLandscapeFrame);
  }
  renderLandscapeFrame();

  container.addEventListener('pointerdown', e => {
    isDragging = true;
    dragDistance = 0;
    startX = e.clientX;
    startOffset = offset;
    container.classList.add('drag');
  });

  window.addEventListener('pointermove', e => {
    if (!isDragging) return;
    dragDistance = Math.max(dragDistance, Math.abs(e.clientX - startX));
    offset = startOffset - (e.clientX - startX);
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
    container.classList.remove('drag');
    setTimeout(() => { dragDistance = 0; }, 50);
  });

  container.addEventListener('mouseenter', () => { velocity = 0.40; });
  container.addEventListener('mouseleave', () => { velocity = 0.85; });
}

// Auto-recalculate 3D sliders on screen resize / phone orientation change
let carouselResizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(carouselResizeTimer);
  carouselResizeTimer = setTimeout(() => {
    init3DCurvedSlider();
    init3DCurvedLandscapeSlider();
  }, 180);
});

// Lightbox Video Player Modal
let currentLightboxList = [];
let currentLightboxIdx = 0;

const lb = document.getElementById('lightbox');
const lbVideo = document.getElementById('lbVideo');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

function openLightbox(list, index) {
  if (!lb || !lbVideo) return;
  const theaterVid = document.getElementById('theaterVideo');
  if (theaterVid && !theaterVid.paused) {
    theaterVid.pause();
  }
  currentLightboxList = list;
  currentLightboxIdx = index >= 0 ? index : 0;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  loadCurrentVideo();
}

function closeLightbox() {
  if (!lb || !lbVideo) return;
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  lbVideo.pause();
  lbVideo.removeAttribute('src');
  lbVideo.load();
  document.body.style.overflow = '';
}

if (lbVideo) {
  lbVideo.addEventListener('error', () => {
    if (lbVideo.dataset.fallbackTried === 'true') return;
    const currentSrc = lbVideo.getAttribute('src') || '';
    const fallbackSrc = getFallbackVideoSrc(currentSrc);
    if (fallbackSrc) {
      lbVideo.dataset.fallbackTried = 'true';
      lbVideo.src = fallbackSrc;
      lbVideo.load();
      lbVideo.play().catch(() => {});
    }
  });
}

function loadCurrentVideo() {
  const vidId = currentLightboxList[currentLightboxIdx];
  const videoData = (data.videos || []).find(v => String(v.id) === String(vidId))
    || ((data.showreel && (String(data.showreel.id) === String(vidId) || vidId === 'master-showreel')) ? data.showreel : null);
  if (!videoData) return;

  const lbInner = document.querySelector('.lb-inner');
  const orientation = videoData.orientation || (videoData.aspect === '16:9' ? 'landscape' : 'vertical');
  if (lbInner) {
    lbInner.className = `lb-inner ${orientation}`;
  }

  if (videoData.src && videoData.src.trim() !== '') {
    lbVideo.dataset.fallbackTried = 'false';
    lbVideo.muted = false;
    lbVideo.volume = 1.0;
    lbVideo.poster = videoData.poster || '';
    lbVideo.src = videoData.src;
    lbVideo.load();
    lbVideo.play().catch(() => {});
  } else {
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    lbVideo.poster = videoData.poster || '';
  }
  if (lbCaption) {
    const aspectTag = videoData.aspect ? `[${videoData.aspect}] ` : '';
    lbCaption.textContent = `${aspectTag}${videoData.title} — ${videoData.cat || 'Showreel'}`;
  }
}

function nextVideo() {
  if (!currentLightboxList.length) return;
  currentLightboxIdx = (currentLightboxIdx + 1) % currentLightboxList.length;
  loadCurrentVideo();
}

function prevVideo() {
  if (!currentLightboxList.length) return;
  currentLightboxIdx = (currentLightboxIdx - 1 + currentLightboxList.length) % currentLightboxList.length;
  loadCurrentVideo();
}

if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lbNext) lbNext.addEventListener('click', nextVideo);
if (lbPrev) lbPrev.addEventListener('click', prevVideo);

if (lb) {
  lb.addEventListener('click', e => {
    if (e.target === lb) closeLightbox();
  });
}

window.addEventListener('keydown', e => {
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextVideo();
  if (e.key === 'ArrowLeft') prevVideo();
});

// Real-Time Cross-Tab Synchronization with Admin Dashboard
window.addEventListener('storage', e => {
  if (e.key === 'openviewcreatives_portfolio_data_v6' || e.key === 'openviewcreatives_portfolio_data_v5' || e.key === 'openviewcreatives_portfolio_data_v4' || e.key === 'openviewcreatives_portfolio_data_v3' || e.key === 'openviewcreatives_portfolio_data_v2' || e.key === 'openviewcreatives_portfolio_data_v1' || e.key === 'hamza_irfan_portfolio_data_v9' || e.key === 'hamza_irfan_portfolio_data_v8' || e.key === 'hamza_irfan_portfolio_data_v7' || e.key === 'hamza_irfan_portfolio_data_v5' || e.key === 'hamza_irfan_portfolio_data_v4') {
    renderPortfolioDOM();
  }
});

window.addEventListener('portfolioDataUpdated', () => {
  renderPortfolioDOM();
});

// Floating Admin Dashboard Access Button
(function addFloatingDashboardBtn() {
  const btn = document.createElement('a');
  btn.href = 'admin.html';
  btn.className = 'floating-admin-btn';
  btn.innerHTML = '⚡ Dashboard';
  btn.title = 'Open Content Management Dashboard';
  btn.setAttribute('aria-label', 'Open Admin Dashboard');
  document.body.appendChild(btn);
})();

// Initial Render on Load
document.addEventListener('DOMContentLoaded', () => {
  renderPortfolioDOM();
});
