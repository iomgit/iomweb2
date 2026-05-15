// Reliquary v4 — hooks.
// useInView stays IntersectionObserver-based (very cheap, no scroll listener).
// useScrollProgress + useStickyProgress now share the central scroll hub from
// motion.jsx so they don't each spawn their own listener.

function useInView(opts = {}) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        if (opts.once !== false) io.disconnect();
      } else if (opts.once === false) {
        setInView(false);
      }
    }, {
      threshold: opts.threshold ?? 0.15,
      rootMargin: opts.rootMargin ?? '0px 0px -8% 0px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

// Element traversal progress 0..1 — shared scheduler version.
function useScrollProgress() {
  const ref = React.useRef(null);
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const Hub = window.__reliquaryScrollHub;
    if (!Hub) return; // motion.jsx not yet loaded — should not happen in practice
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

// Sticky section progress 0..1 — shared scheduler version.
function useStickyProgress() {
  const ref = React.useRef(null);
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const Hub = window.__reliquaryScrollHub;
    if (!Hub) return;
    return Hub.subscribe(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = r.height - vh;
      if (travel <= 0) { setP(prev => (prev === 0 ? prev : 0)); return; }
      const passed = -r.top;
      const v = Math.max(0, Math.min(1, passed / travel));
      setP(prev => (Math.abs(prev - v) > 0.001 ? v : prev));
    });
  }, []);
  return [ref, p];
}

window.ReliquaryHooks = { useInView, useScrollProgress, useStickyProgress };
