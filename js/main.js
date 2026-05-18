// ─── THEME TOGGLE ────────────────────────────────────────────
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;
const saved = localStorage.getItem('sphinx-theme') || 'dark';
html.setAttribute('data-theme', saved);

toggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('sphinx-theme', next);
});

// ─── MOBILE MENU ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ─── SCROLL REVEAL ───────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// ─── NAV SCROLL STYLE ────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.borderBottomColor =
    window.scrollY > 40 ? 'var(--border-hi)' : 'var(--border)';
});

// ─── ROADMAP RESPONSIVE ──────────────────────────────────────
function checkRoadmapLayout() {
  const rc = document.querySelector('.roadmap-two-col');
  if (rc) rc.style.gridTemplateColumns = window.innerWidth < 800 ? '1fr' : '1fr 1fr';
}
window.addEventListener('resize', checkRoadmapLayout);
checkRoadmapLayout();

// ─── OPTIMIZED: QUANTUM NUANCE BACKGROUND (DEFERRED & REDUCED) ──────────
(function() {
  const canvas = document.getElementById('quantum-canvas');
  if (!canvas) return;
  
  let animationStarted = false;
  let animationFrameId = null;
  let ctx, W, H, particles = [], nodes = [], t = 0;
  
  function initAnimation() {
    if (animationStarted) return;
    animationStarted = true;
    
    ctx = canvas.getContext('2d');
    
    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    // OPTIMIZED: Reduced quantum nodes from 8 to 4 (50% reduction)
    for (let i = 0; i < 4; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 80 + Math.random() * 160,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        hue: Math.random() < 0.5 ? 195 : 265,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    // OPTIMIZED: Reduced particles from 120 to 60 (50% reduction)
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 2 + Math.random() * 4,
        opacity: 0.2 + Math.random() * 0.5,
        hue: Math.random() < 0.6 ? 195 : (Math.random() < 0.5 ? 265 : 45),
        life: Math.random() * Math.PI * 2
      });
    }
    
    function drawFrame() {
      ctx.clearRect(0, 0, W, H);
      t += 0.003;
      
      // Draw quantum orbs
      for (let nd of nodes) {
        nd.x += nd.vx + Math.sin(t + nd.phase) * 0.15;
        nd.y += nd.vy + Math.cos(t * 0.7 + nd.phase) * 0.12;
        if (nd.x < -nd.r) nd.x = W + nd.r;
        if (nd.x > W + nd.r) nd.x = -nd.r;
        if (nd.y < -nd.r) nd.y = H + nd.r;
        if (nd.y > H + nd.r) nd.y = -nd.r;
        
        const pulse = 1 + Math.sin(t * 1.5 + nd.phase) * 0.1;
        const grad = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, nd.r * pulse);
        const alpha = 0.04 + Math.sin(t + nd.phase) * 0.015;
        grad.addColorStop(0, `hsla(${nd.hue}, 80%, 60%, ${alpha})`);
        grad.addColorStop(0.5, `hsla(${nd.hue}, 70%, 50%, ${alpha * 0.4})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw quantum particle web
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.02;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        
        const op = p.opacity * (0.6 + Math.sin(p.life) * 0.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${op})`;
        ctx.fill();
        
        // Connect nearby particles - only if not too many
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const lineOp = (1 - dist / 100) * 0.06;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(195, 80%, 60%, ${lineOp})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      
      // Draw quantum interference grid
      ctx.strokeStyle = 'rgba(79,195,247,0.025)';
      ctx.lineWidth = 0.5;
      const gridSize = 70;
      const offset = (t * 8) % gridSize;
      for (let x = -gridSize + (offset % gridSize); x < W + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - gridSize * 0.5, H);
        ctx.stroke();
      }
      for (let y = -gridSize; y < H + gridSize; y += gridSize * 0.866) {
        ctx.beginPath();
        ctx.moveTo(0, y + ((t * 4) % gridSize));
        ctx.lineTo(W, y + ((t * 4) % gridSize));
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(drawFrame);
    }
    
    drawFrame();
  }
  
  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    animationStarted = false;
  }
  
  // OPTIMIZED: Start animation only when canvas is visible
  const canvasObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationStarted) {
        initAnimation();
      } else if (!entry.isIntersecting && animationStarted) {
        stopAnimation();
      }
    });
  }, { threshold: 0.1 });
  
  canvasObserver.observe(canvas);
})();

// ─── OPTIMIZED: SPIF ANATOMY ANIMATED ADDRESS (DEFERRED) ──────────
(function() {
  const spifAnatomy = document.querySelector('.spif-anatomy-wrap');
  if (!spifAnatomy) return;
  
  let animationActive = false;
  let rotateInterval = null;
  
  const addresses = [
    ['3234 1823 9EFE 3B5C 04FC 34CD 4F8F 3A61', 'B84D C3E9 6B92 4A22 7E77 642F 26AC AE8A'],
    ['8B2A 9F4C 2E71 5D8A 1C3E 7B92 0D5F 8A3B', '4C9E 2F6D 1A7B 3C8E 5F2A 9D4C 7E1B 6A3F'],
    ['C7F1 4A9B 3E8D 6C2F 5A1B 8E4C 9D2F 7B5A', '1C8E 4F3D 6A9B 2C7E 8D1F 5A4C 3B6E 7F2A'],
    ['2E9D 5F8A 1C4B 7E3F 6A2D 9C5B 8F1A 4C7E', '3B9D 6F2A 5C8B 1E4D 7A3F 9C6E 2B5D 8F1A'],
    ['9A4C 7F1B 5E3D 8C6A 2F9B 4E7C 1B8D 5A2F', '9C4E 7B3A 6D1F 8E5C 2A7B 4D9F 3C6E 1A8D'],
    ['4D1B 8E5C 2A7F 9C3B 6D4A 1E8F 7C2A 9F5D', '1B8E 4C6A 3F7D 9E2B 5A8C 1F4D 6B3E 7A9C'],
    ['F3A7 2C9E 8B4D 1F6A 5C3E 7B9A 2D8F 4C1E', '6A9B 3F7D 1C8E 5B2A 9F4C 7E3D 8A1B 6C4F'],
    ['A1E9 6F3C 8B2D 5A7E 9C4B 1F8D 3A6E 7C2B', '5D9F 1A4C 8E7B 3F6A 2C9D 5B8E 1F4A 7C3D'],
  ];
  
  const seg1El = document.getElementById('saSeg1');
  const seg2El = document.getElementById('saSeg2');
  if (!seg1El || !seg2El) return;
  
  let current = 0;
  
  function rotateAddress() {
    if (!animationActive) return;
    current = (current + 1) % addresses.length;
    seg1El.classList.add('flash');
    seg2El.classList.add('flash');
    setTimeout(() => {
      seg1El.textContent = addresses[current][0];
      seg2El.textContent = addresses[current][1];
      syncHashLine();
    }, 120);
    setTimeout(() => {
      seg1El.classList.remove('flash');
      seg2El.classList.remove('flash');
    }, 500);
  }
  
  function syncHashLine() {
    const seg1 = document.getElementById('saSeg1');
    const seg2 = document.getElementById('saSeg2');
    const labelEnd = document.querySelector('.sa-label-end');
    const line = document.querySelector('.sa-label-end .sa-label-line');
    const addr = document.querySelector('.spif-anatomy-address');
    if (!seg1 || !seg2 || !labelEnd || !line || !addr) return;
    
    const addrRect = addr.getBoundingClientRect();
    const r1 = seg1.getBoundingClientRect();
    const r2 = seg2.getBoundingClientRect();
    
    const hashLeft  = Math.min(r1.left, r2.left)  - addrRect.left;
    const hashRight = Math.max(r1.right, r2.right) - addrRect.left;
    
    labelEnd.style.left = hashLeft + 'px';
    line.style.width    = (hashRight - hashLeft) + 'px';
  }
  
  function buildInnerTicker() {
    const track = document.getElementById('spifInnerTicker');
    if (!track) return;
    const statuses = ['VERIFIED', 'ACTIVE', 'PENDING', 'ACTIVE', 'VERIFIED', 'ACTIVE', 'ACTIVE', 'PENDING'];
    let innerHTML = '';
    for (let r = 0; r < 2; r++) {
      for (let i = 0; i < addresses.length; i++) {
        const s = statuses[i];
        const sCol = s === 'VERIFIED' ? '#4caf50' : s === 'PENDING' ? '#ffd54f' : '#4fc3f7';
        innerHTML += `<span class="sit-item"><span class="sit-prefix">SPIF</span> <span class="sit-hash">${addresses[i][0]} ${addresses[i][1]}</span><span class="sit-sep">|</span><span style="color:${sCol};font-size:0.5rem;letter-spacing:0.12em">◉ ${s}</span></span><span class="sit-sep" style="color:#3a3a5a;padding:0 4px">///</span>`;
      }
    }
    track.innerHTML = innerHTML;
  }
  
  function startAnimation() {
    if (animationActive) return;
    animationActive = true;
    buildInnerTicker();
    syncHashLine();
    window.addEventListener('resize', syncHashLine);
    rotateInterval = setInterval(rotateAddress, 3200);
  }
  
  function stopAnimation() {
    if (rotateInterval) {
      clearInterval(rotateInterval);
      rotateInterval = null;
    }
    animationActive = false;
  }
  
  // OPTIMIZED: Start only when spif anatomy is visible
  const spifObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationActive) {
        startAnimation();
      } else if (!entry.isIntersecting && animationActive) {
        stopAnimation();
      }
    });
  }, { threshold: 0.2 });
  
  spifObserver.observe(spifAnatomy);
})();


// ─── OPTIMIZED: SPIF ENCODING ANIMATION (DEFERRED) ────────────
(function() {
  const encodingBlock = document.getElementById('spifEncodeBlock');
  if (!encodingBlock) return;
  
  let animationActive = false;
  let cycleTimeout = null;
  let arrowInterval = null;
  
  const HEX = '0123456789abcdef';
  
  function randomPubkey() {
    let s = '';
    for (let i = 0; i < 64; i++) s += HEX[Math.floor(Math.random() * 16)];
    return s;
  }
  
  function pubkeyToSpif(hex) {
    let encoded = '';
    for (let i = 0; i < hex.length; i++) {
      const charCode = parseInt(hex[i], 16);
      const newCode = (charCode + i * 3 + 7) % 16;
      encoded += newCode.toString(16);
    }
    const up = encoded.toUpperCase();
    const groups = [];
    for (let i = 0; i < 64; i += 4) groups.push(up.slice(i, i + 4));
    return {
      row1: groups.slice(0, 8).join(' '),
      row2: groups.slice(8, 16).join(' ')
    };
  }
  
  const pubkeyEl = document.getElementById('fpPubkeyVal');
  const arrowLine = document.getElementById('fpArrowLine');
  const arrowAnim = document.getElementById('fpArrowAnim');
  const spifOut   = document.getElementById('fpSpifOut');
  const spifLabel = document.getElementById('fpSpifLabel');
  if (!pubkeyEl || !spifOut) return;
  
  const ARROWS = [
    '▶ · · · · · · · · ·',
    '· ▶ · · · · · · · ·',
    '· · ▶ · · · · · · ·',
    '· · · ▶ · · · · · ·',
    '· · · · ▶ · · · · ·',
    '· · · · · ▶ · · · ·',
    '· · · · · · ▶ · · ·',
    '· · · · · · · ▶ · ·',
    '· · · · · · · · ▶ ·',
    '· · · · · · · · · ▶',
  ];
  
  function scrambleChar(c) {
    if (c === ' ') return ' ';
    return HEX[Math.floor(Math.random() * 16)].toUpperCase();
  }
  
  function revealSpif(target, onDone) {
    const full = target.row1 + '  ' + target.row2;
    let step = 0;
    
    const iv = setInterval(() => {
      const display = Array.from(full).map((ch, i) => {
        if (i <= step) return full[i];
        return ch === ' ' || ch === '\n' ? ch : scrambleChar(ch);
      }).join('');
      
      spifOut.textContent = display;
      step += 3;
      
      if (step >= full.length) {
        clearInterval(iv);
        spifOut.textContent = full;
        if (onDone) onDone();
      }
    }, 32);
  }
  
  function runCycle() {
    if (!animationActive) return;
    
    const pk = randomPubkey();
    const target = pubkeyToSpif(pk);
    
    pubkeyEl.classList.remove('active');
    pubkeyEl.textContent = pk;
    spifOut.textContent = '';
    arrowAnim.textContent = '';
    arrowLine.classList.remove('active');
    if (spifLabel) spifLabel.classList.remove('visible');
    if (spifOut) spifOut.classList.remove('visible');
    setTimeout(() => pubkeyEl.classList.add('active'), 40);
    
    let tick = 0;
    setTimeout(() => {
      if (!animationActive) return;
      arrowLine.classList.add('active');
      tick = 0;
      arrowInterval = setInterval(() => {
        if (!animationActive) {
          if (arrowInterval) clearInterval(arrowInterval);
          return;
        }
        arrowAnim.textContent = ARROWS[tick % ARROWS.length] + '  SPHINCS+ HASH  ' + ARROWS[(tick + 5) % ARROWS.length];
        tick++;
      }, 90);
    }, 500);
    
    setTimeout(() => {
      if (!animationActive) return;
      if (arrowInterval) clearInterval(arrowInterval);
      arrowAnim.textContent = '▶▶▶ ENCODED ▶▶▶';
      if (spifLabel) spifLabel.classList.add('visible');
      if (spifOut) spifOut.classList.add('visible');
      revealSpif(target, () => {
        if (!animationActive) return;
        arrowAnim.textContent = '✓  DONE';
        arrowLine.classList.remove('active');
        if (cycleTimeout) clearTimeout(cycleTimeout);
        cycleTimeout = setTimeout(runCycle, 2600);
      });
    }, 1000);
  }
  
  function startAnimation() {
    if (animationActive) return;
    animationActive = true;
    if (cycleTimeout) clearTimeout(cycleTimeout);
    runCycle();
  }
  
  function stopAnimation() {
    animationActive = false;
    if (cycleTimeout) {
      clearTimeout(cycleTimeout);
      cycleTimeout = null;
    }
    if (arrowInterval) {
      clearInterval(arrowInterval);
      arrowInterval = null;
    }
  }
  
  // OPTIMIZED: Start only when encoding block is visible
  const encodingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationActive) {
        startAnimation();
      } else if (!entry.isIntersecting && animationActive) {
        stopAnimation();
      }
    });
  }, { threshold: 0.3 });
  
  encodingObserver.observe(encodingBlock);
})();

// ─── OPTIMIZED: SPX STAT SCRAMBLE ANIMATION (ALREADY DEFERRED - KEEP AS IS) ───
(function() {
  const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?';
  const SKIP  = new Set([' ', '·', ',', '=', '.', ':', '-', '/', '+']);
  
  const stats = [
    { id: 'spx-symbol',  target: 'SPX',               delay: 0    },
    { id: 'spx-supply',  target: '5,000,000,000',      delay: 280  },
    { id: 'spx-base',    target: '1 SPX = 1e18 nSPX',  delay: 560  },
    { id: 'spx-denom',   target: 'nSPX · gSPX · SPX',  delay: 840  },
    { id: 'spx-network', target: 'Sphinx Chain',        delay: 1120 },
    { id: 'spx-ico',     target: 'Announced Soon',      delay: 1400 },
  ];
  
  function rnd() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  
  function scrambleTo(el, target, onDone) {
    const len = target.length;
    const totalSteps = len * 3;
    let step = 0;
    
    el.style.transition = 'color 0.15s';
    const origColor = el.style.color;
    el.style.color = 'var(--accent)';
    
    const iv = setInterval(() => {
      step++;
      const revealed = Math.floor((step / totalSteps) * len);
      let display = '';
      
      for (let i = 0; i < len; i++) {
        const ch = target[i];
        if (i < revealed || SKIP.has(ch)) {
          display += ch;
        } else {
          display += rnd();
        }
      }
      
      el.textContent = display;
      
      if (step >= totalSteps) {
        clearInterval(iv);
        el.textContent = target;
        el.style.color = origColor;
        if (onDone) onDone();
      }
    }, 28);
  }
  
  // Set initial scrambled state
  stats.forEach(({ id, target }) => {
    const el = document.getElementById(id);
    if (!el) return;
    let display = '';
    for (let i = 0; i < target.length; i++) {
      const ch = target[i];
      display += SKIP.has(ch) ? ch : rnd();
    }
    el.textContent = display;
  });
  
  // Fire when ico section scrolls into view (already deferred - good)
  const anchor = document.getElementById('ico');
  if (!anchor) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      stats.forEach(({ id, target, delay }) => {
        const el = document.getElementById(id);
        if (!el) return;
        setTimeout(() => scrambleTo(el, target), delay);
      });
    });
  }, { threshold: 0.25 });
  
  observer.observe(anchor);
})();

// ─── FEATURES TABS ─────────────────────────────────────────
(function() {
  const tabsContainer = document.querySelector('.feat-tabs');
  const tabs = document.querySelectorAll('.feat-tab');
  const grid = document.getElementById('featGrid');
  
  if (!tabs.length || !grid || !tabsContainer) return;
  
  function setActiveTab(activeTab) {
    tabs.forEach(t => t.classList.remove('active'));
    activeTab.classList.add('active');
    const audience = activeTab.dataset.tab;
    grid.dataset.active = audience;
  }
  
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveTab(tab);
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!tabsContainer.contains(e.target)) {
      tabs.forEach(t => t.classList.remove('active'));
      delete grid.dataset.active;
    }
  });
})();

// Dropdown expand/collapse functionality
document.addEventListener('DOMContentLoaded', function() {
  const expandableBadges = document.querySelectorAll('.funding-badge.expandable');
  
  expandableBadges.forEach(badge => {
    badge.addEventListener('click', function(e) {
      e.stopPropagation();
      const targetId = this.getAttribute('data-target');
      const dropdown = document.getElementById(targetId);
      
      if (dropdown) {
        document.querySelectorAll('.funding-dropdown.active').forEach(open => {
          if (open.id !== targetId) {
            open.classList.remove('active');
          }
        });
        dropdown.classList.toggle('active');
      }
    });
  });
  
  document.querySelectorAll('.dropdown-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = this.closest('.funding-dropdown');
      if (dropdown) {
        dropdown.classList.remove('active');
      }
    });
  });
  
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.funding-badge.expandable') && !e.target.closest('.funding-dropdown')) {
      document.querySelectorAll('.funding-dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
});

// Terms Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('termsModal');
  const modalRoundName = document.getElementById('modalRoundName');
  const closeModalBtn = document.querySelector('.terms-modal-close');
  const acceptBtn = document.querySelector('.terms-btn.accept');
  
  const viewTermsBtns = document.querySelectorAll('.view-terms-btn');
  
  viewTermsBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const roundName = this.getAttribute('data-round') || 'SPX';
      if (modalRoundName) {
        modalRoundName.textContent = roundName;
      }
      modal.classList.add('active');
    });
  });
  
  function closeModal() {
    modal.classList.remove('active');
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  if (acceptBtn) {
    acceptBtn.addEventListener('click', closeModal);
  }
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});