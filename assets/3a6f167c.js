// Reliquary — Press Wall + draggable Witnessed strip
const { Reveal, Rule, Eyebrow, PressMark } = window.ReliquaryAtoms;
const { useViewportScroll } = window.ReliquaryMotion;

const PRESS_WALL = [
  { name: "REUTERS",          url: "https://www.reuters.com/article/fact-check/images-purporting-to-show-ancient-alien-artifacts-unearthed-during-world-war-two-idUSL1N36K1Y1/" },
  { name: "FAST COMPANY",     url: "https://www.fastcompany.com/90924460/situation-deepfakes-are-the-next-frontier-of-political-misinformation" },
  { name: "ESQUIRE",          url: "https://www.esquire.com/es/actualidad/cine/a42095549/como-serian-superheroes-siglo-xix-ia-capitan-america-iron-man-batman-flash/" },
  { name: "FUTURISM",         url: "https://futurism.com/sci-fi-magazine-generated-ai-interview" },
  { name: "BOING BOING",      url: "https://boingboing.net/2023/01/09/infinite-oddyssey-is-the-first-sci-fi-magazine-created-completely-with-ai.html" },
  { name: "AMAZING STORIES",  url: "https://amazingstories.com/2023/01/clubhouse-review-infinite-odyssey-magazine-1/" },
  { name: "INDEPENDENT",      url: "https://www.indyturk.com/node/612306" },
  { name: "FAIR OBSERVER",    url: "https://www.fairobserver.com/interview/from-fiction-to-reality-ai-telling-its-story/" },
  { name: "DePaul University",url: "https://condor.depaul.edu/jmoore/tech/ai/" },
  { name: "HACKER NEWS",      url: "https://news.ycombinator.com/item?id=34887478" },
  { name: "TWEAKTOWN",        url: "https://www.tweaktown.com/news/90106/ai-creates-1980s-matrix-starring-jeff-goldblum-as-morpheus/index.html" },
  { name: "LEW LATER",        url: "https://youtu.be/u_8XZjTE1KM?t=3089" },
];

/* ────────────────────────────────────────────────────────────
   PressWall — 3×4 grid of outlets, all clickable.
   Each cell animates IN when it actually enters the viewport
   (per-cell IntersectionObserver) — so the cascade plays out
   for the user no matter the screen size. Once a cell is lit
   it stays lit (no un-reveal on scroll back).
   ──────────────────────────────────────────────────────────── */
function PressCell({ p, i }){
  const ref = React.useRef(null);
  const [lit, setLit] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // small stagger by column for a wave-like cascade
        const col = i % 3;
        setTimeout(() => setLit(true), col * 90);
        io.disconnect();
      }
    }, { threshold: 0.55, rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [i]);

  const optical = OPTICAL_SIZE[p.name] || 16;
  return (
    <a ref={ref} href={p.url} target="_blank" rel="noopener noreferrer"
      className={`press-wall-cell ${lit ? 'lit' : ''}`}
      onDragStart={(e) => e.preventDefault()}
      draggable={false}
    >
      {['tl','tr','bl','br'].map(k => (
        <span key={k} aria-hidden className="pwc-tick" style={{
          ...(k[0]==='t' ? {top:-3} : {bottom:-3}),
          ...(k[1]==='l' ? {left:-3} : {right:-3})
        }}/>
      ))}
      {/* one-shot gold flash painted across the cell when it lights up */}
      <span aria-hidden className="pwc-flash"/>
      <PressMark name={p.name} size={optical}/>
    </a>
  );
}

function PressWall(){
  // Track when the LAST cell has been seen so we can fire the big sweep.
  const lastRef = React.useRef(null);
  const [allLit, setAllLit] = React.useState(false);
  React.useEffect(() => {
    const el = lastRef.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setAllLit(true), 400);
        io.disconnect();
      }
    }, { threshold: 0.6, rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="v-press-wall" data-screen-label="II½ · As Seen On"
      style={{padding:'40px 22px 90px', maxWidth: 980, margin:'0 auto', position:'relative'}}>

      <div style={{textAlign:'center', marginBottom: 36}}>
        <Reveal style={{marginBottom: 14}}>
          <Eyebrow>✦ &nbsp; AS SEEN ON &nbsp; ✦</Eyebrow>
        </Reveal>
        <Reveal delay={120} style={{
          fontFamily:'"Cormorant Garamond","EB Garamond",serif', fontStyle:'italic',
          fontSize:'clamp(22px, 4.4vw, 30px)', color:'rgba(236,225,196,.78)',
          textWrap:'balance', maxWidth: 620, margin:'0 auto'
        }}>
          Twelve rooms watched the first cycle.
        </Reveal>
      </div>

      <div className={`press-wall-grid ${allLit ? 'all-lit' : ''}`}>
        <span className="press-wall-sweep" aria-hidden/>
        {PRESS_WALL.map((p, i) => (
          <div key={p.name} ref={i === PRESS_WALL.length - 1 ? lastRef : null} style={{display:'contents'}}>
            <PressCell p={p} i={i}/>
          </div>
        ))}
      </div>

      <Reveal delay={320} style={{textAlign:'center', marginTop: 26}}>
        <span style={{
          fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(10px, 0.95vw, 12px)',
          letterSpacing:'.32em', color:'rgba(236,225,196,.45)'
        }}>
          12 · WITNESSES &nbsp;·&nbsp; CLICK ANY TO READ
        </span>
      </Reveal>

      <style>{`
        .press-wall-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          position: relative;
        }
        .press-wall-cell {
          position: relative;
          display:flex; align-items:center; justify-content:center;
          min-height: 96px; padding: 18px 12px;
          border: 1px solid rgba(214,170,90,.18);
          background: rgba(12,8,5,.35);
          color: rgba(236,225,196,.82);
          text-align: center;
          overflow: hidden;
          opacity: 0;
          transform: translateY(34px) rotate(-1.6deg) scale(.94);
          filter: blur(8px);
          transition:
            opacity 900ms cubic-bezier(.22,.61,.36,1),
            transform 900ms cubic-bezier(.22,.61,.36,1),
            filter 900ms cubic-bezier(.22,.61,.36,1),
            border-color 320ms ease,
            background 320ms ease,
            box-shadow 320ms ease;
          -webkit-user-drag: none;
        }
        .press-wall-cell.lit {
          opacity: 1;
          transform: none;
          filter: blur(0);
          border-color: rgba(214,170,90,.42);
          box-shadow: 0 0 28px -10px rgba(214,170,90,.35);
        }
        .pwc-flash {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,233,170,.55) 50%, transparent 70%);
          transform: translateX(-110%);
          pointer-events: none;
          opacity: 0;
        }
        .press-wall-cell.lit .pwc-flash {
          animation: pwcFlash 900ms cubic-bezier(.22,.61,.36,1) 120ms forwards;
        }
        @keyframes pwcFlash {
          0%   { transform: translateX(-110%); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translateX(110%);  opacity: 0; }
        }
        .pwc-tick {
          position:absolute; width:5px; height:5px; background:#d6aa5a;
          transform:rotate(45deg);
          opacity: 0; transition:opacity 280ms ease;
        }

        /* Big diagonal gold sweep — fires once the last cell is lit */
        .press-wall-sweep {
          position: absolute; inset: -10px;
          background: linear-gradient(120deg,
            transparent 38%,
            rgba(214,170,90,.30) 47%,
            rgba(255,233,170,.55) 50%,
            rgba(214,170,90,.30) 53%,
            transparent 62%);
          transform: translateX(-110%);
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 2;
          opacity: 0;
        }
        .press-wall-grid.all-lit .press-wall-sweep {
          animation: pwSweep 1500ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        @keyframes pwSweep {
          0%   { transform: translateX(-110%); opacity: 0; }
          18%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translateX(110%);  opacity: 0; }
        }

        .press-wall-cell:hover {
          border-color: rgba(214,170,90,.6) !important;
          background: rgba(214,170,90,.07) !important;
        }
        .press-wall-cell:hover .pwc-tick { opacity: 1; }

        /* Mobile: keep 3 columns. Tighten tracking so long names fit. */
        @media (max-width: 720px) {
          .press-wall-grid { gap: 6px; }
          .press-wall-cell { min-height: 72px; padding: 8px 4px; }
          .press-wall-cell > span:last-child { letter-spacing: .01em !important; }
        }
        @media (max-width: 420px) {
          .press-wall-cell { min-height: 62px; padding: 6px 2px; }
          .press-wall-cell > span:last-child { letter-spacing: 0 !important; }
        }
      `}</style>
    </section>
  );
}

// Per-outlet optical sizes for the AS-SEEN-ON grid: chosen so each wordmark
// reads at the same visual mass, regardless of name length or font.
// (Long names like "AMAZING STORIES" / "DePaul University" must come down;
// short, dense ones like "REUTERS" can be a touch larger.)
const OPTICAL_SIZE = {
  "REUTERS":          'clamp(13px, 1.5vw, 18px)',
  "FAST COMPANY":     'clamp(10px, 1.25vw, 16px)',
  "ESQUIRE":          'clamp(14px, 1.7vw, 22px)',
  "FUTURISM":         'clamp(14px, 1.7vw, 22px)',
  "BOING BOING":      'clamp(11px, 1.35vw, 17px)',
  "AMAZING STORIES":  'clamp(9px, 1.05vw, 14px)',
  "INDEPENDENT":      'clamp(13px, 1.55vw, 19px)',
  "FAIR OBSERVER":    'clamp(10px, 1.2vw, 14px)',
  "DePaul University":'clamp(10px, 1.2vw, 16px)',
  "HACKER NEWS":      'clamp(10.5px, 1.25vw, 16px)',
  "TWEAKTOWN":        'clamp(11px, 1.35vw, 17px)',
  "LEW LATER":        'clamp(13px, 1.55vw, 19px)',
};

/* ────────────────────────────────────────────────────────────
   WitnessedDrag — auto-scrolls slowly to the left forever.
   Pauses while the user grabs the strip, resumes on release.
   Releases keep the momentum from the user's drag.
   ──────────────────────────────────────────────────────────── */
function WitnessedDrag(){
  const ref = React.useRef(null);
  // doubled list so the auto-scroll can loop seamlessly
  const loop = React.useMemo(() => [...PRESS_WALL, ...PRESS_WALL], []);

  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    let isDown = false, startX = 0, startScroll = 0, lastX = 0, lastT = 0, velocity = 0, moved = 0;
    let momentumRaf = 0;
    let autoRaf = 0;
    // Internal float accumulator — browsers may round scrollLeft to integers,
    // so we keep the true position here and only assign once per frame.
    let pos = 0;
    const AUTO_SPEED = 0.6; // px/frame ≈ 36 px/s — slow drift

    const stopMomentum = () => { if (momentumRaf) { cancelAnimationFrame(momentumRaf); momentumRaf = 0; } };
    const stopAuto     = () => { if (autoRaf)     { cancelAnimationFrame(autoRaf);     autoRaf = 0;     } };

    // Half the total scrollable width — when we cross it, wrap back to 0.
    const halfWidth = () => el.scrollWidth / 2;

    const autoStep = () => {
      if (!isDown && !momentumRaf) {
        pos += AUTO_SPEED;
        const h = halfWidth();
        if (h > 0 && pos >= h) pos -= h; // seamless wrap
        el.scrollLeft = pos;
      }
      autoRaf = requestAnimationFrame(autoStep);
    };
    // Wait one tick for content to lay out so scrollWidth is correct
    setTimeout(() => { autoRaf = requestAnimationFrame(autoStep); }, 50);

    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      stopMomentum();
      isDown = true; moved = 0;
      startX = lastX = e.pageX;
      startScroll = pos;
      lastT = performance.now();
      velocity = 0;
      el.style.cursor = 'grabbing';
    };
    const onMove = (e) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 3) {
        e.preventDefault();
        moved = Math.abs(dx);
        const now = performance.now();
        const dt = Math.max(1, now - lastT);
        const instV = (e.pageX - lastX) / dt;
        velocity = velocity * 0.7 + instV * 0.3;
        lastX = e.pageX; lastT = now;
        const h = halfWidth();
        let next = startScroll - dx;
        if (h > 0) {
          // mod into [0, h)
          next = ((next % h) + h) % h;
        }
        pos = next;
        el.scrollLeft = pos;
      }
    };
    const endDrag = () => {
      if (!isDown) return;
      isDown = false; el.style.cursor = 'grab';
      let v = velocity * 16;
      if (Math.abs(v) < 0.3) return; // auto-scroll takes over immediately
      const step = () => {
        const h = halfWidth();
        let next = pos - v;
        if (h > 0) next = ((next % h) + h) % h;
        pos = next;
        el.scrollLeft = pos;
        v *= 0.94;
        if (Math.abs(v) > 0.4) {
          momentumRaf = requestAnimationFrame(step);
        } else {
          momentumRaf = 0;
        }
      };
      momentumRaf = requestAnimationFrame(step);
    };
    const onClick = (e) => {
      if (moved > 4) { e.stopPropagation(); e.preventDefault(); moved = 0; }
    };

    el.style.cursor = 'grab';
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('mouseleave', endDrag);
    el.addEventListener('click', onClick, true);

    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('mouseleave', endDrag);
      el.removeEventListener('click', onClick, true);
      stopMomentum();
      stopAuto();
    };
  }, []);

  return (
    <section style={{padding:'60px 0 50px', borderTop:'1px solid rgba(214,170,90,.18)', borderBottom:'1px solid rgba(214,170,90,.18)', overflow:'hidden'}}>
      <div style={{textAlign:'center', padding:'0 22px', marginBottom: 22}}>
        <Reveal><Eyebrow>✦ &nbsp; WITNESSED BY &nbsp; ✦</Eyebrow></Reveal>
        <Reveal delay={120} style={{
          marginTop: 8, fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic',
          fontSize:'clamp(18px, 4.6vw, 24px)', color:'rgba(236,225,196,.7)'
        }}>
          drag to pause the procession
        </Reveal>
      </div>

      <Reveal variant="rv-fade" delay={180}>
        <div
          ref={ref}
          className="witnessed-drag"
          style={{
            display:'flex', gap: 48, alignItems:'center',
            padding:'12px 30px',
            overflowX:'auto', overflowY:'hidden',
            scrollbarWidth:'none', WebkitOverflowScrolling:'touch',
            maskImage:'linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)',
            WebkitMaskImage:'linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)',
            userSelect: 'none'
          }}
        >
          {loop.map((p, i) => (
            <React.Fragment key={i}>
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="witnessed-cell"
                style={{
                  flex:'0 0 auto', padding:'10px 8px',
                  color:'rgba(236,225,196,.78)', transition:'color 280ms ease, transform 280ms ease',
                  borderBottom:'1px solid transparent',
                  userSelect:'none', WebkitUserDrag:'none'
                }}>
                <PressMark name={p.name}/>
              </a>
              {i < loop.length - 1 && (
                <span aria-hidden style={{color:'#d6aa5a', fontSize:11, opacity:.5}}>✦</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Reveal>

      <style>{`
        .witnessed-drag::-webkit-scrollbar { display:none; }
        .witnessed-cell { -webkit-user-drag: none; }
        .witnessed-cell * { -webkit-user-drag: none; pointer-events: none; }
        .witnessed-cell:hover {
          color: #d6aa5a !important;
          border-bottom-color: rgba(214,170,90,.55) !important;
        }
      `}</style>
    </section>
  );
}

window.ReliquaryPressWall = { PressWall, WitnessedDrag, PRESS_WALL };
