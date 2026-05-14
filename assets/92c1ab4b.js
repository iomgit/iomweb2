// Reliquary v4 — motion utilities, all powered by a SINGLE scroll/resize listener
// + one shared rAF tick. Previous version spawned a fresh scroll listener and
// rAF loop for every hook, which became ~10 listeners on a fully-rendered page.
//
// Public hooks (same names + return shapes as before — no caller changes needed):
//   useElementScroll()                → [ref, p] 0..1 across element traversal
//   useViewportScroll({startVh,spanVh})→ [ref, p] 0..1 windowed by vh-distance
//   usePageProgress()                 → number 0..1 global scroll progress
//   useScrollVelocity()               → number, smoothed |dy|
//   useActiveSection(ids)             → string|null, id closest to centre
//   ScrollLines({...})                → JSX
//
// Anything that needs scroll position registers a subscriber via the internal
// _subscribe(fn) helper. The scheduler invokes every subscriber once per
// rAF-coalesced scroll/resize burst. Subscribers are cheap (pure DOM reads
// followed by setState) and React batches their state updates.

(function () {
  if (window.__reliquaryScrollHub) return;

  const subs = new Set();
  let raf = 0;
  let pending = false;

  const tick = () => {
    raf = 0;
    pending = false;
    // Snapshot to avoid mutation-during-iteration if a subscriber unsubs itself
    for (const fn of subs) {
      try { fn(); } catch (e) { /* keep going */ }
    }
  };

  const schedule = () => {
    if (pending) return;
    pending = true;
    raf = requestAnimationFrame(tick);
  };

  const onScroll = () => schedule();
  const onResize = () => schedule();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  window.__reliquaryScrollHub = {
    subscribe(fn) {
      subs.add(fn);
      // Prime the subscriber once on registration so initial state is correct
      try { fn(); } catch (e) { /* ignore */ }
      return () => subs.delete(fn);
    },
    pump: schedule,
  };
})();

const Hub = window.__reliquaryScrollHub;

// 0..1 traversal: 0 when element's top hits viewport bottom,
// 1 when element's bottom hits viewport top.
function useElementScroll() {
  const ref = React.useRef(null);
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    return Hub.subscribe(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const passed = vh - r.top;
      const v = Math.max(0, Math.min(1, passed / total));
      setP(prev => (Math.abs(prev - v) > 0.001 ? v : prev));
    });
  }, []);
  return [ref, p];
}

// Viewport-distance progress — independent of element height.
//   startVh: vh of scroll past entry before progress begins
//   spanVh : vh window over which progress runs from 0 → 1
function useViewportScroll({ startVh = 0.15, spanVh = 0.85 } = {}) {
  const ref = React.useRef(null);
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    return Hub.subscribe(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolledVh = (vh - r.top) / vh;
      const v = Math.max(0, Math.min(1, (scrolledVh - startVh) / spanVh));
      setP(prev => (Math.abs(prev - v) > 0.001 ? v : prev));
    });
  }, [startVh, spanVh]);
  return [ref, p];
}

function usePageProgress() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => Hub.subscribe(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const v = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
    setP(prev => (Math.abs(prev - v) > 0.0005 ? v : prev));
  }), []);
  return p;
}

// Scroll velocity (smoothed |dy| with decay). Runs its own rAF for decay,
// but ticks only while there is residual velocity — far cheaper than always-on.
function useScrollVelocity() {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    let lastY = window.scrollY;
    let current = 0;
    let decayRaf = 0;

    const decay = () => {
      current *= 0.86;
      if (current < 0.05) {
        current = 0;
        setV(0);
        decayRaf = 0;
        return; // stop ticking when we hit zero
      }
      setV(current);
      decayRaf = requestAnimationFrame(decay);
    };

    const unsub = Hub.subscribe(() => {
      const y = window.scrollY;
      const dy = Math.abs(y - lastY);
      lastY = y;
      if (dy === 0) return;
      current = Math.min(60, current + dy * 0.6);
      if (!decayRaf) decayRaf = requestAnimationFrame(decay);
    });

    return () => { unsub(); if (decayRaf) cancelAnimationFrame(decayRaf); };
  }, []);
  return v;
}

function useActiveSection(ids) {
  const [active, setActive] = React.useState(ids[0] ?? null);
  const key = ids.join('|');
  React.useEffect(() => {
    return Hub.subscribe(() => {
      const mid = window.innerHeight * 0.4;
      let best = null, bestDist = Infinity;
      for (const id of ids) {
        const el = document.getElementById(id); if (!el) continue;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - mid);
        if (r.bottom > 0 && r.top < window.innerHeight && d < bestDist) {
          bestDist = d; best = id;
        }
      }
      if (best) setActive(prev => (prev === best ? prev : best));
    });
  }, [key]);
  return active;
}

// Tied-to-scroll line reveal (uses useViewportScroll under the hood).
function ScrollLines({ lines, size, gap = 10, color, italic = true, startVh = 0.25, spanVh = 0.55 }) {
  const [ref, p] = useViewportScroll({ startVh, spanVh });
  const n = lines.length;
  return (
    <div ref={ref} style={{display:'flex', flexDirection:'column', gap, color: color || 'rgba(236,225,196,.88)'}}>
      {lines.map((l, i) => {
        const t = i / n;
        const slot = 1 / n;
        const local = Math.max(0, Math.min(1, (p - t) / (slot * 0.9)));
        return (
          <div key={i} style={{
            fontFamily:'"Cormorant Garamond","EB Garamond",serif',
            fontStyle: italic ? 'italic' : 'normal',
            fontSize: size, lineHeight: 1.3, textWrap:'balance',
            opacity: local,
            transform: `translateY(${(1-local)*22}px)`,
            filter: `blur(${(1-local)*6}px)`,
            willChange: local > 0 && local < 1 ? 'opacity, transform, filter' : 'auto',
            transition:'opacity 80ms linear, transform 80ms linear, filter 80ms linear'
          }}>{l}</div>
        );
      })}
    </div>
  );
}

window.ReliquaryMotion = {
  useElementScroll, useViewportScroll, usePageProgress, useScrollVelocity, useActiveSection,
  ScrollLines
};
