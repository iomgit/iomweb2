// Reliquary — atoms / small reusable bits
const { useInView } = window.ReliquaryHooks;

// Reveal wrapper that toggles a class when in view
function Reveal({ children, delay = 0, variant = 'rv', as: Tag = 'div', style, className = '', threshold }) {
  const [ref, v] = useInView({ threshold });
  return (
    <Tag ref={ref}
      className={`${variant} ${v ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

// Line-by-line reveal for poetic blocks. `lines` = array of strings or nodes.
function LineReveal({ lines, gap = 4, lineDelay = 220, startDelay = 0, size = 22, italic = true, color }) {
  return (
    <div style={{display:'flex', flexDirection:'column', gap, color: color || 'rgba(236,225,196,.88)'}}>
      {lines.map((l, i) => (
        <Reveal key={i} delay={startDelay + i * lineDelay} style={{
          fontFamily:'"Cormorant Garamond", serif',
          fontStyle: italic ? 'italic' : 'normal',
          fontSize: size, lineHeight: 1.35, textWrap:'balance'
        }}>{l}</Reveal>
      ))}
    </div>
  );
}

// Word-by-word reveal — used for the hero title only
function WordsReveal({ text, size = 64, italic = false, color, weight = 400, ls = '-.02em', perWord = 90, startDelay = 0, gold = false, style }) {
  const words = text.split(' ');
  const [ref, v] = useInView({ threshold: 0.1 });
  return (
    <span ref={ref} style={{
      display:'inline-block', fontFamily:'"Cormorant Garamond","EB Garamond",serif',
      fontStyle: italic ? 'italic' : 'normal', fontWeight: weight, fontSize: size,
      letterSpacing: ls, lineHeight: .92, color: color || 'inherit',
      textShadow: gold ? '0 0 50px rgba(214,170,90,.5)' : 'none',
      ...style
    }}>
      {words.map((w, i) => (
        <span key={i} style={{display:'inline-block', marginRight: '.28em', overflow:'hidden'}}>
          <span style={{
            display:'inline-block',
            transform: v ? 'translateY(0)' : 'translateY(120%)',
            opacity: v ? 1 : 0,
            transition: `transform 900ms cubic-bezier(.22,.61,.36,1) ${startDelay + i*perWord}ms, opacity 900ms cubic-bezier(.22,.61,.36,1) ${startDelay + i*perWord}ms`
          }}>{w}</span>
        </span>
      ))}
    </span>
  );
}

// Ornamental gold rule
function Rule({ glyph = '✦ ✦ ✦', margin = '24px auto', maxWidth = 380 }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:12, margin, maxWidth, width:'100%', opacity:.7}}>
      <div style={{flex:1, height:1, background:'linear-gradient(90deg, transparent, #d6aa5a 60%, transparent)'}}/>
      <span style={{color:'#d6aa5a', fontSize:13, letterSpacing:'.4em', whiteSpace:'nowrap'}}>{glyph}</span>
      <div style={{flex:1, height:1, background:'linear-gradient(90deg, transparent, #d6aa5a 40%, transparent)'}}/>
    </div>
  );
}

// Tiny eyebrow tag
function Eyebrow({ children, color = '#d6aa5a' }) {
  return (
    <div style={{
      fontFamily:'"JetBrains Mono", monospace',
      fontSize:'clamp(11px, 1.05vw, 13px)',
      letterSpacing:'.34em', color, opacity:.9, textTransform:'uppercase'
    }}>{children}</div>
  );
}

// Press wordmark — styled type per outlet. Single gold tone so they read as one wall.
// Pass `size` to override the per-outlet default font-size — useful in the AS-SEEN-ON
// grid where every cell must read at the same optical weight regardless of name length.
function PressMark({ name, color, size }) {
  const styleFor = (n) => {
    switch (n) {
      case "REUTERS":          return { f:'"Inter",sans-serif',           w:800, ls:'.06em',  s:18, t:'none' };
      case "MSN":              return { f:'"Inter",sans-serif',           w:400, ls:'0',      s:26, t:'lowercase' };
      case "BOING BOING":      return { f:'"JetBrains Mono",monospace',   w:800, ls:'-.02em', s:17, t:'lowercase' };
      case "FUTURISM":         return { f:'"Cormorant Garamond",serif',   w:700, ls:'-.01em', s:28, t:'lowercase', i:true };
      case "ESQUIRE":          return { f:'"Cormorant Garamond",serif',   w:600, ls:'-.01em', s:28, t:'none',      i:true };
      case "DePaul University":return { f:'"EB Garamond",serif',          w:600, ls:'.04em',  s:19, t:'none' };
      case "AMAZING STORIES":  return { f:'"Inter",sans-serif',           w:900, ls:'-.02em', s:18, t:'uppercase', i:true };
      case "TheSciFi.net":     return { f:'"JetBrains Mono",monospace',   w:700, ls:'.02em',  s:14, t:'none' };
      case "FAST COMPANY":     return { f:'"Inter",sans-serif',           w:900, ls:'-.04em', s:19, t:'uppercase' };
      case "INDEPENDENT":      return { f:'"Cormorant Garamond",serif',   w:700, ls:'-.01em', s:24, t:'none' };
      case "FAIR OBSERVER":    return { f:'"Inter",sans-serif',           w:600, ls:'.04em',  s:14, t:'uppercase' };
      case "HACKER NEWS":      return { f:'"Inter",sans-serif',           w:800, ls:'-.01em', s:17, t:'none' };
      case "TWEAKTOWN":        return { f:'"Inter",sans-serif',           w:900, ls:'-.03em', s:18, t:'uppercase', i:true };
      case "LEW LATER":        return { f:'"Cormorant Garamond",serif',   w:600, ls:'.02em',  s:24, t:'none',      i:true };
      default:                 return { f:'"Inter",sans-serif',           w:700, ls:'.05em',  s:17, t:'uppercase' };
    }
  };
  const s = styleFor(name);
  const display = s.t === 'lowercase' ? name.toLowerCase()
                : s.t === 'uppercase' ? name.toUpperCase() : name;
  return (
    <span style={{
      fontFamily:s.f, fontWeight:s.w, letterSpacing:s.ls,
      fontSize: size != null ? size : s.s,
      fontStyle:s.i?'italic':'normal', color: color || 'rgba(236,225,196,.82)',
      whiteSpace:'nowrap', display:'inline-block'
    }}>{display}</span>
  );
}

window.ReliquaryAtoms = { Reveal, LineReveal, WordsReveal, Rule, Eyebrow, PressMark };
