/* ========================================================
   HAMZA KHAN — PORTFOLIO CORE SCRIPT & DYNAMIC RENDERER
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

  // 4. Featured Videos Showcase Grid
  const vidGrid = document.getElementById('domVidGrid');
  if (vidGrid && data.videos) {
    vidGrid.innerHTML = data.videos.map(v => `
      <button class="vid-card" type="button" data-video="${v.id}" aria-label="Play ${v.title}">
        <div class="vid-thumb">
          <img src="${v.poster}" alt="${v.title}" loading="lazy" />
          <div class="vid-play"><i></i></div>
          <div class="vid-dur">${v.dur}</div>
          <div class="vid-info">
            <div class="vid-num">${v.num || '0' + v.id} / ${v.cat ? v.cat.toUpperCase() : 'VIDEO'}</div>
            <div class="vid-title">${v.title}</div>
          </div>
        </div>
      </button>
    `).join('');
  }

  // 5. Selected Projects Grid
  const projGrid = document.getElementById('domProjGrid');
  if (projGrid && data.projects) {
    projGrid.innerHTML = data.projects.map(proj => `
      <article class="proj-card">
        <div class="proj-thumb" data-video="${proj.videoId || (data.videos[0] ? data.videos[0].id : 1)}">
          <img class="pt-img" src="${proj.mainImg}" alt="${proj.name}" />
          <div class="proj-play"><div class="proj-play-icon"></div></div>
          <div class="proj-type">${proj.typeBadge || 'Featured Project'}</div>
          <div class="pt-count">${proj.countBadge || '0' + proj.id}</div>
        </div>
        <div class="proj-body">
          <div class="proj-company">${proj.company}</div>
          <h3 class="proj-name">${proj.name}</h3>
          <p class="proj-desc">${proj.desc}</p>
          <div class="proj-tags">
            ${(proj.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>
          ${proj.stripImages && proj.stripImages.length > 1 ? `
            <div class="pt-strip">
              ${proj.stripImages.map(img => `
                <button type="button" data-video="${proj.videoId || 1}"><img src="${img}" alt="Thumbnail" /></button>
              `).join('')}
            </div>
          ` : ''}
          <button class="proj-link" type="button" data-video="${proj.videoId || 1}">Watch project showreel <span>↗</span></button>
        </div>
      </article>
    `).join('');
  }

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

  // 8. Contact Section
  const contactAvail = document.getElementById('domContactAvail');
  const contactEmailLink = document.getElementById('domContactEmailLink');
  const copyMailBtn = document.getElementById('copyMail');
  const contactCardEmail = document.getElementById('domContactCardEmail');
  const contactCardLoc = document.getElementById('domContactCardLoc');
  const contactCardFocus = document.getElementById('domContactCardFocus');

  if (contactAvail) contactAvail.innerHTML = `<i></i> ${p.availability}`;
  if (contactEmailLink) contactEmailLink.href = `mailto:${p.email}`;
  if (copyMailBtn) copyMailBtn.dataset.mail = p.email;
  if (contactCardEmail) {
    contactCardEmail.textContent = p.email;
    const parentA = contactCardEmail.closest('a');
    if (parentA) parentA.href = `mailto:${p.email}`;
  }
  if (contactCardLoc) contactCardLoc.textContent = p.location;
  if (contactCardFocus) contactCardFocus.textContent = p.focus;

  // 9. Footer
  const ftHireText = document.getElementById('domFtHireText');
  const ftEmailLink = document.getElementById('domFtEmailLink');
  const ftEmailTop = document.getElementById('domFtEmailTop');
  const ftName = document.getElementById('ftName');
  const ftCopy = document.getElementById('domFtCopy');

  if (ftHireText) ftHireText.textContent = p.hireText || 'Ready to turn raw ideas into scroll-stopping video content?';
  if (ftEmailLink) ftEmailLink.href = `mailto:${p.email}`;
  if (ftEmailTop) ftEmailTop.href = `mailto:${p.email}`;
  if (ftName) {
    ftName.textContent = p.name;
    initFooterNameAnimation();
  }
  if (ftCopy) ftCopy.textContent = `© 2026 ${p.name} — Video Editor & Motion Designer. All rights reserved.`;

  // Re-bind interactive events
  bindVideoCardClicks();
  initObserverAndBars();
  init3DCurvedSlider();
}

// Bind Video Click handlers to Lightbox
function bindVideoCardClicks() {
  document.querySelectorAll('[data-video]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.video, 10);
      const allIds = data.videos.map(v => v.id);
      if (!isNaN(id)) {
        openLightbox(allIds, allIds.indexOf(id));
      }
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

// Split hero headline into kinetic letter elements
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
          [...token].forEach(char => {
            const letter = document.createElement('i');
            letter.className = 'ch';
            letter.style.setProperty('--i', counter++);
            letter.textContent = char;
            word.appendChild(letter);
          });
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

// Giant Footer Name Letter Slice & Responsive Auto-Fit
function initFooterNameAnimation() {
  const ft = document.getElementById('ftName');
  if (!ft) return;
  const rawText = ft.textContent.trim();
  ft.innerHTML = [...rawText].map((char, idx) => {
    return char === ' ' 
      ? '<span class="sp"></span>' 
      : `<span class="fc"><i style="--i:${idx}">${char}</i></span>`;
  }).join('');
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

// Contact Spotlight Mouse-Tracking & Copy Email
document.querySelectorAll('.cc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  });
});

const copyBtn = document.getElementById('copyMail');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const email = copyBtn.dataset.mail || 'hamzakhan.edits@gmail.com';
    const originalText = copyBtn.textContent;
    const showCopied = () => {
      copyBtn.textContent = 'Copied ✓';
      setTimeout(() => { copyBtn.textContent = originalText; }, 1800);
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(showCopied, showCopied);
    } else {
      showCopied();
    }
  });
}

// 3D Curved Infinity Slider (Hero Carousel)
let sliderAnimId = null;

function init3DCurvedSlider() {
  const container = document.getElementById('cf');
  if (!container) return;
  if (sliderAnimId) cancelAnimationFrame(sliderAnimId);
  container.innerHTML = '';

  const CARD_WIDTH = 190;
  const STEP = CARD_WIDTH + 20;

  // Build items array with Hamza's identity card in center
  const items = (data.videos || []).map(v => ({ id: v.id, src: v.poster, title: v.title }));
  const centerPos = Math.min(2, items.length);
  items.splice(centerPos, 0, {
    me: true,
    src: data.profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    title: data.profile.name || "Hamza Khan"
  });

  const TOTAL_ITEMS = items.length;
  if (TOTAL_ITEMS === 0) return;
  const TOTAL_WIDTH = TOTAL_ITEMS * STEP;
  let offset = 0;
  let velocity = 0.55;
  let isDragging = false;
  let startX = 0;
  let startOffset = 0;
  let dragDistance = 0;

  const cardElements = items.map(item => {
    const card = document.createElement('div');
    card.className = 'cf-card';
    card.innerHTML = `
      <img alt="${item.title}" draggable="false" src="${item.src}">
      ${item.me 
        ? `<div class="cf-me"><b>${data.profile.name || 'Hamza Khan'}</b><span>Lead Editor & Motion</span></div>` 
        : `<span class="cf-play" title="Play"></span>`
      }
    `;

    card.addEventListener('click', () => {
      if (dragDistance < 6 && item.id) {
        const allIds = data.videos.map(v => v.id);
        openLightbox(allIds, allIds.indexOf(item.id));
      }
    });

    container.appendChild(card);
    return card;
  });

  function renderFrame() {
    if (!isDragging) {
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
      card.style.zIndex = Math.round(absD * 100);
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

  container.addEventListener('mouseenter', () => { velocity = 0.15; });
  container.addEventListener('mouseleave', () => { velocity = 0.55; });
}

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
  currentLightboxList = list;
  currentLightboxIdx = index >= 0 ? index : 0;
  loadCurrentVideo();
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lb || !lbVideo) return;
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  lbVideo.pause();
  lbVideo.src = '';
  document.body.style.overflow = '';
}

function loadCurrentVideo() {
  const vidId = currentLightboxList[currentLightboxIdx];
  const videoData = (data.videos || []).find(v => v.id === vidId);
  if (!videoData) return;

  lbVideo.src = videoData.src;
  lbVideo.poster = videoData.poster;
  lbVideo.play().catch(() => {});
  if (lbCaption) {
    lbCaption.textContent = `${videoData.title} — ${videoData.cat}`;
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
  if (e.key === 'hamza_khan_portfolio_data_v1') {
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
