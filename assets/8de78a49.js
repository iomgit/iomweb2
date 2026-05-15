// Reliquary v2 — new + enhanced sections
const { useInView, useScrollProgress, useStickyProgress } = window.ReliquaryHooks;
const { useElementScroll, usePageProgress, useScrollVelocity, useActiveSection, ScrollLines } = window.ReliquaryMotion;
const { Reveal, LineReveal, WordsReveal, Rule, Eyebrow, PressMark } = window.ReliquaryAtoms;

const ISSUE_LINKS = {
  1: "https://thescifi.net/collections/infinite-odyssey-magazine/products/copy-of-infinite-odyssey-magazine-issue-1-digital",
  2: "https://thescifi.net/collections/infinite-odyssey-magazine/products/copy-of-infinite-odyssey-magazine-issue-2-digital",
  3: "https://thescifi.net/collections/infinite-odyssey-magazine/products/copy-of-infinite-odyssey-magazine-issue-3-digital",
  4: "https://thescifi.net/collections/infinite-odyssey-magazine/products/copy-of-infinite-odyssey-magazine-issue-4-digital",
  5: "https://thescifi.net/collections/infinite-odyssey-magazine/products/copy-of-infinite-odyssey-magazine-issue-5-digital",
  6: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-6-digital_",
  7: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-7-digital",
  8: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-8-digital",
  9: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-9-digital",
  10: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-10-digital",
  11: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-11-digital",
  12: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-12-digital",
  13: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-13-digital",
  14: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-14-digital",
  15: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-15-digital",
  16: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-16-digital",
  17: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-issue-17-digital",
  19: "https://thescifi.net/collections/infinite-odyssey-magazine/products/infinite-odyssey-magazine-digital"
};

const ISSUES_V2 = [
  { n:19, t:"The Spike Crown",          d:"JUL 2024", img:window.__resources.issue19 },
  { n:18, t:"Saltlight Cathedral",      d:"JUN 2024", img:window.__resources.issue18 },
  { n:17, t:"After the Trial",          d:"MAY 2024", img:window.__resources.issue17 },
  { n:16, t:"Field of Ferns",           d:"APR 2024", img:window.__resources.issue16 },
  { n:15, t:"Carnival of Ash",          d:"MAR 2024", img:window.__resources.issue15 },
  { n:14, t:"Old Light",                d:"FEB 2024", img:window.__resources.issue14 },
  { n:13, t:"The Pale Procession",      d:"DEC 2023", img:window.__resources.issue13 },
  { n:12, t:"Heliotrope",               d:"NOV 2023", img:window.__resources.issue12 },
  { n:11, t:"Argentine Sky",            d:"OCT 2023", img:window.__resources.issue11 },
  { n:10, t:"Continuum",                d:"SEP 2023", img:window.__resources.issue10 },
  { n: 9, t:"Vespertine",               d:"AUG 2023", img:window.__resources.issue9 },
  { n: 8, t:"Veil & Vector",            d:"JUL 2023", img:window.__resources.issue8 },
  { n: 7, t:"Salt & Static",            d:"JUN 2023", img:window.__resources.issue7 },
  { n: 6, t:"The Spider Choir",         d:"MAY 2023", img:window.__resources.issue6 },
  { n: 5, t:"The Anchorite",            d:"APR 2023", img:window.__resources.issue5 },
  { n: 4, t:"Cathedral 7",              d:"MAR 2023", img:window.__resources.issue4 },
  { n: 3, t:"Ghost Mass",               d:"FEB 2023", img:window.__resources.issue3 },
  { n: 2, t:"The Auroral Engine",       d:"JAN 2023", img:window.__resources.issue2 },
  { n: 1, t:"Halls of the Hollow King", d:"DEC 2022", img:window.__resources.issue1 },
];

/* ────────────────────────────────────────────────────────────
   Top scroll progress rail — gold thread across the very top
   ──────────────────────────────────────────────────────────── */
function ProgressRail(){
  const p = usePageProgress();
  return (
    <div aria-hidden style={{position:'fixed', top:0, left:0, right:0, height:2, zIndex: 60, pointerEvents:'none'}}>
      <div style={{
        height:'100%',
        width: `${p*100}%`,
        background:'linear-gradient(90deg, rgba(214,170,90,0) 0%, #d6aa5a 50%, #f3d28a 100%)',
        boxShadow:'0 0 12px rgba(214,170,90,.7)'
      }}/>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Floating bottom CTA — thumb-zone, hides during hero/cycle-two
   ──────────────────────────────────────────────────────────── */
function ThumbCTA(){
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const Hub = window.__reliquaryScrollHub;
    if (!Hub) return;
    return Hub.subscribe(() => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const cta = document.getElementById('cycle-two');
      const showNow = y > vh * 0.7 && (!cta || cta.getBoundingClientRect().top > vh * 0.5);
      setShow(prev => prev === showNow ? prev : showNow);
    });
  }, []);
  return (
    <div style={{
      position:'fixed', left:0, right:0, bottom: 0, zIndex: 55,
      padding:'14px 16px calc(14px + env(safe-area-inset-bottom))',
      pointerEvents: show ? 'auto':'none',
      transform: show ? 'translateY(0)' : 'translateY(120%)',
      opacity: show ? 1 : 0,
      transition:'transform 700ms cubic-bezier(.22,.61,.36,1), opacity 700ms cubic-bezier(.22,.61,.36,1)',
      background:'linear-gradient(180deg, rgba(12,8,5,0) 0%, rgba(12,8,5,.85) 38%, rgba(12,8,5,.95) 100%)'
    }}>
      <a href="#cycle-two" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'15px 18px',
        background:'#d6aa5a', color:'#0c0805',
        fontFamily:'"JetBrains Mono",monospace', fontSize:11, fontWeight:700, letterSpacing:'.28em',
        boxShadow:'0 0 0 1px rgba(214,170,90,.55), 0 24px 40px -10px rgba(214,170,90,.35)',
        position:'relative', overflow:'hidden'
      }}>
        <span style={{display:'flex', alignItems:'center', gap:10}}>
          <span style={{width:6,height:6,background:'#0c0805',transform:'rotate(45deg)'}}/>
          NOTIFY ME
        </span>
        <span style={{opacity:.8}}>JOIN THE LIST →</span>
        <span aria-hidden style={{
          position:'absolute', inset:0,
          background:'linear-gradient(120deg, transparent 35%, rgba(255,250,225,.7) 50%, transparent 65%)',
          transform:'translateX(-110%)',
          animation:'shimmer 5s ease-in-out infinite'
        }}/>
      </a>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Right-edge verse rail — small ornaments, lights the active verse
   ──────────────────────────────────────────────────────────── */
function VerseRail(){
  const ids = ['v-vigil','v-loom','v-relic','v-archive','v-candles','v-waking','v-cycle'];
  const labels = { 'v-vigil':'PROEM', 'v-loom':'I · LOOM', 'v-relic':'II · RELIC', 'v-archive':'III · ARCHIVE', 'v-candles':'IV · SEAL', 'v-waking':'V · WAKING', 'v-cycle':'CYCLE II' };
  const active = useActiveSection(ids);
  const scrollTo = (id) => {
    const el = document.getElementById(id); if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 12;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  return (
    <div className="verse-rail" style={{
      position:'fixed', right:10, top:'50%', transform:'translateY(-50%)',
      zIndex: 40, display:'flex', flexDirection:'column', gap:14
    }}>
      {ids.map(id => {
        const on = active === id;
        return (
          <button key={id} onClick={() => scrollTo(id)}
            aria-label={`Jump to ${labels[id]}`}
            style={{
              all:'unset', cursor:'pointer',
              display:'flex', alignItems:'center', gap:8, justifyContent:'flex-end',
              padding:'6px 4px 6px 14px'
            }}>
            <span className="verse-rail-label" style={{
              fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(9px, 0.85vw, 11px)', letterSpacing:'.28em',
              color: on ? '#d6aa5a' : 'rgba(236,225,196,.55)',
              opacity: on ? 1 : 0, transform: on ? 'translateX(0)':'translateX(6px)',
              transition:'opacity 360ms ease, transform 360ms ease, color 360ms ease',
              whiteSpace:'nowrap', pointerEvents:'none',
              background:'rgba(12,8,5,.7)', padding:'4px 8px',
              backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)'
            }}>{labels[id]}</span>
            <span style={{
              width: on ? 10 : 6, height: on ? 10 : 6, borderRadius:'50%',
              background: on ? '#d6aa5a' : 'rgba(214,170,90,.45)',
              boxShadow: on ? '0 0 12px #d6aa5a' : '0 0 0 1px rgba(214,170,90,.25)',
              transition:'all 360ms cubic-bezier(.22,.61,.36,1)'
            }}/>
          </button>
        );
      })}
      <style>{`
        /* On phones, the rail labels overlap section content — hide labels, keep dots */
        @media (max-width: 720px) {
          .verse-rail-label { display: none !important; }
          .verse-rail { right: 8px !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Vigil hero v2 — letter-by-letter title, halo grows with scroll
   ──────────────────────────────────────────────────────────── */
function letterSpans(text, startDelay, perChar = 36, color){
  const chars = text.split('');
  return chars.map((c, i) => (
    <span key={i} style={{
      display:'inline-block', whiteSpace: c===' ' ? 'pre' : 'normal',
      animation:`letterIn 900ms cubic-bezier(.22,.61,.36,1) ${startDelay + i*perChar}ms both`,
      color: color || 'inherit',
      transformOrigin:'50% 100%'
    }}>{c}</span>
  ));
}

function VigilV2(){
  const [ref, p] = useElementScroll();
  // halo grows as you scroll out of the hero
  const haloScale = 1 + p * 0.6;
  const haloOpacity = Math.max(0, 1 - p * 1.2);
  return (
    <section id="v-vigil" data-screen-label="01 Vigil" ref={ref} style={{
      position:'relative', minHeight:'100svh', display:'flex',
      flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'110px 22px 80px', textAlign:'center', overflow:'hidden'
    }}>
      <div aria-hidden style={{
        position:'absolute', left:'50%', top:'46%',
        width:'min(140vw, 1000px)', aspectRatio:'1/1',
        transform:`translate(-50%, -50%) scale(${haloScale})`,
        opacity: haloOpacity,
        background:'radial-gradient(circle, rgba(214,170,90,.32) 0%, rgba(214,170,90,.10) 32%, rgba(214,170,90,0) 65%)',
        animation:'haloPulse 7s ease-in-out infinite', pointerEvents:'none',
        transition:'transform 120ms linear, opacity 120ms linear'
      }}/>
      {/* Sparks, scroll-parallax */}
      <div aria-hidden style={{position:'absolute', inset:0, pointerEvents:'none', transform:`translateY(${p*-80}px)`}}>
        {[...Array(18)].map((_,i)=>(
          <span key={i} style={{
            position:'absolute',
            left:`${(i*73)%100}%`, top:`${(i*47)%100}%`,
            width:2, height:2, borderRadius:'50%',
            background:'#d6aa5a', opacity:.55,
            boxShadow:'0 0 6px #d6aa5a',
            animation:`flickerGold ${4+(i%5)}s ease-in-out infinite`,
            animationDelay:`${(i*0.4)%3}s`
          }}/>
        ))}
      </div>

      <Reveal variant="rv-fade" delay={120} style={{marginBottom: 28}}>
        <div style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center', color:'#d6aa5a'}}>
          <span style={{width:5,height:5,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
          <span style={{width:7,height:7,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
          <span style={{width:5,height:5,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
        </div>
      </Reveal>

      <Reveal variant="rv-fade" delay={260}>
        <Eyebrow>ANNO MMXXVI &nbsp;·&nbsp; THE SECOND CYCLE</Eyebrow>
      </Reveal>

      <div style={{margin:'26px 0 16px', maxWidth: 920, position:'relative'}}>
        <h1 style={{
          margin:0, fontFamily:'"Cormorant Garamond","EB Garamond",serif',
          fontSize:'clamp(60px, 18vw, 168px)', lineHeight:.92, fontWeight:400,
          letterSpacing:'-.025em', overflow:'hidden', padding:'0.06em 0'
        }}>
          <span style={{display:'block'}}>{letterSpans('Infinite', 500, 50)}</span>
          <span style={{display:'block'}}>{letterSpans('Odyssey', 900, 55)}</span>
        </h1>
        <h2 style={{
          margin:'.05em 0 0', fontFamily:'"Cormorant Garamond","EB Garamond",serif',
          fontSize:'clamp(40px, 13vw, 124px)', lineHeight:.95, fontWeight:400,
          fontStyle:'italic', letterSpacing:'-.02em', color:'#d6aa5a',
          textShadow:'0 0 60px rgba(214,170,90,.5)', overflow:'hidden', padding:'0.06em 0'
        }}>
          <span style={{display:'block'}}>{letterSpans('is returning.', 1600, 60, '#d6aa5a')}</span>
        </h2>
      </div>

      <Reveal variant="rv-fade" delay={2400} style={{maxWidth: 540, margin:'0 auto'}}>
        <p style={{
          fontFamily:'"EB Garamond",serif', fontStyle:'italic',
          fontSize:'clamp(17px, 4.6vw, 22px)', lineHeight:1.55,
          color:'rgba(236,225,196,.78)', margin:'14px 0 0', textWrap:'balance'
        }}>
          Cycle One ended at Issue Nineteen.<br/>
          <span style={{color:'#d6aa5a'}}>Cycle Two will be stranger, longer, truer.</span>
        </p>
      </Reveal>

      {/* Scroll indicator with animated arrow */}
      <Reveal variant="rv-fade" delay={2800} style={{
        position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:8, color:'rgba(214,170,90,.75)'
      }}>
        <span style={{fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.4em'}}>SWIPE</span>
        <span style={{position:'relative', width:1, height:42, background:'rgba(214,170,90,.25)', overflow:'hidden'}}>
          <span style={{
            position:'absolute', left:0, top:-14, width:1, height:14,
            background:'linear-gradient(180deg, transparent, #d6aa5a)',
            animation:'scrollDot 2.4s ease-in-out infinite'
          }}/>
        </span>
      </Reveal>

      <style>{`
        @keyframes letterIn {
          from { opacity:0; transform: translateY(110%) rotate(2deg); filter: blur(8px); }
          to   { opacity:1; transform: translateY(0)    rotate(0);    filter: blur(0); }
        }
        @keyframes scrollDot {
          0%   { top:-14px; opacity:0 }
          25%  { opacity:1 }
          80%  { opacity:1 }
          100% { top:56px;  opacity:0 }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   VerseLoom v2 — scroll-tied line reveal (lines emerge as you scroll)
   ──────────────────────────────────────────────────────────── */
function VerseLoomV2(){
  const vel = useScrollVelocity();
  const skew = Math.min(8, vel * 0.25);
  return (
    <section id="v-loom" data-screen-label="02 Verse · Loom" style={{padding:'120px 22px 80px', maxWidth: 760, margin:'0 auto', textAlign:'center', minHeight:'70svh'}}>
      <Reveal style={{marginBottom: 28}}>
        <Eyebrow>VERSE  ·  I  —  THE LOOM</Eyebrow>
      </Reveal>
      <div style={{transform:`skewY(${-skew*0.15}deg)`, transition:'transform 200ms ease-out'}}>
        <ScrollLines
          size={'clamp(24px, 6.6vw, 36px)'}
          gap={10}
          startAt={0.08} endAt={0.46}
          lines={[
            <>Nineteen times she spoke.</>,
            <>Then the loom went quiet.</>,
            <>Nineteen winters passed in a single season &mdash;</>,
            <span style={{color:'#d6aa5a'}}>and the carrier began to wake.</span>,
          ]}
        />
      </div>
      <Reveal delay={200} style={{marginTop: 40}}>
        <Rule glyph="✦" maxWidth={120}/>
      </Reveal>
      <Reveal delay={280} style={{marginTop: 8, fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(10.5px, 1vw, 13px)', letterSpacing:'.34em', color:'rgba(236,225,196,.5)'}}>
        — FOUND, UNDATED, IN THE MARGIN OF №5
      </Reveal>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Vigil Candles — 19 candles light up as you scroll
   Each candle reveals issue №, title and date when it lights.
   ──────────────────────────────────────────────────────────── */
function VigilCandles(){
  const [ref, p] = useElementScroll();
  // Candles list in chronological order (1..19)
  const list = [...ISSUES_V2].reverse(); // 1 → 19
  const total = list.length;
  // Each candle lights at its own threshold. Compress lighting between 0.12..0.88
  const lightAt = (i) => 0.12 + (i / (total)) * 0.78;

  return (
    <section id="v-candles" data-screen-label="03 Vigil · XIX Candles" ref={ref} style={{padding:'80px 0 100px', overflow:'hidden'}}>
      <div style={{textAlign:'center', padding:'0 22px', marginBottom: 42, maxWidth: 720, margin:'0 auto 42px'}}>
        <Reveal style={{marginBottom: 16}}>
          <Eyebrow>VERSE  ·  III  —  XIX CANDLES</Eyebrow>
        </Reveal>
        <Reveal delay={120} style={{
          fontFamily:'"Cormorant Garamond","EB Garamond",serif',
          fontSize:'clamp(34px, 9vw, 64px)', lineHeight:1, letterSpacing:'-.02em',
          fontWeight:400, color:'#ece1c4', textWrap:'balance'
        }}>
          Nineteen candles. <em style={{color:'#d6aa5a'}}>Light them as you read.</em>
        </Reveal>
        <Reveal delay={240} style={{marginTop: 16, fontFamily:'"EB Garamond",serif', fontStyle:'italic', fontSize:'clamp(15px, 4.2vw, 18px)', color:'rgba(236,225,196,.7)', textWrap:'pretty'}}>
          Scroll down. One flame for every issue of the first cycle.
        </Reveal>
      </div>

      <div style={{maxWidth: 520, margin:'0 auto', padding:'0 22px'}}>
        <div style={{
          position:'relative', display:'grid', gridTemplateColumns:'1fr',
          gap: 'clamp(22px, 6vw, 32px)'
        }}>
          {/* vertical altar rail behind the candles */}
          <div aria-hidden style={{
            position:'absolute', left:'50%', top: 10, bottom: 10, width:1,
            background:'linear-gradient(180deg, transparent, rgba(214,170,90,.25) 8%, rgba(214,170,90,.25) 92%, transparent)'
          }}/>
          {list.map((it, i) => {
            const lit = p >= lightAt(i);
            const justLit = p >= lightAt(i) && p < lightAt(i) + 0.04;
            const isLast = i === total - 1; // issue 19, sealed
            // alternate sides for visual rhythm
            const side = i % 2 === 0 ? 'left' : 'right';
            return (
              <div key={it.n} style={{
                position:'relative',
                display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', gap:14,
                opacity: lit ? 1 : 0.35,
                transition:'opacity 600ms ease'
              }}>
                {/* left text */}
                <div style={{
                  textAlign:'right',
                  visibility: side === 'left' ? 'visible' : 'hidden',
                  opacity: lit ? 1 : 0,
                  transform: lit ? 'translateX(0)' : 'translateX(-12px)',
                  transition:'opacity 700ms ease, transform 700ms ease'
                }}>
                  <div style={{fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.32em', color:'#d6aa5a'}}>
                    №{String(it.n).padStart(2,'0')}
                  </div>
                  <div style={{fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:'clamp(17px, 4.6vw, 21px)', color:'#ece1c4', lineHeight:1.15, marginTop:2}}>
                    {it.t}
                  </div>
                  <div style={{fontFamily:'"JetBrains Mono",monospace', fontSize:9.5, letterSpacing:'.28em', color:'rgba(236,225,196,.5)', marginTop:4}}>
                    {it.d}
                  </div>
                </div>

                {/* candle */}
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:4}}>
                  {/* flame */}
                  <div style={{position:'relative', width:18, height: 26, marginBottom: -2}}>
                    <div style={{
                      position:'absolute', left:'50%', bottom: 0,
                      width: 10, height: 16,
                      transform:`translateX(-50%) scale(${lit ? 1 : 0.2})`,
                      transformOrigin:'50% 100%',
                      borderRadius:'50% 50% 45% 45% / 60% 60% 40% 40%',
                      background:'radial-gradient(ellipse at 50% 75%, #fff6d5 0%, #ffd98a 25%, #e6a23c 55%, rgba(230,162,60,0) 78%)',
                      filter:'blur(.3px)',
                      opacity: lit ? 1 : 0,
                      boxShadow: lit ? '0 0 14px rgba(255,217,138,.9), 0 0 30px rgba(230,162,60,.6)' : 'none',
                      transition:'opacity 600ms ease, transform 600ms cubic-bezier(.22,.61,.36,1)',
                      animation: lit ? 'flameFlicker 2.6s ease-in-out infinite' : 'none',
                      animationDelay: `${(i*0.13)%1.5}s`
                    }}/>
                    {/* wick */}
                    <div style={{
                      position:'absolute', left:'50%', bottom: -1, transform:'translateX(-50%)',
                      width: 1.5, height: 5, background: lit ? '#3a1a08' : '#1d120a'
                    }}/>
                    {/* halo when just lit */}
                    {lit && (
                      <div aria-hidden style={{
                        position:'absolute', left:'50%', bottom:0, transform:'translate(-50%, 25%)',
                        width: 60, height: 60, borderRadius:'50%',
                        background:'radial-gradient(circle, rgba(230,162,60,.4) 0%, rgba(230,162,60,0) 60%)',
                        pointerEvents:'none'
                      }}/>
                    )}
                  </div>
                  {/* candle stick */}
                  <div style={{
                    width: 12,
                    height: isLast ? 22 : 'clamp(36px, 11vw, 56px)',
                    background: isLast
                      ? 'linear-gradient(180deg, #c9a35a, #6b4a1d)'
                      : 'linear-gradient(180deg, #efe2bf 0%, #d4c389 30%, #b29957 70%, #6e5a2f 100%)',
                    boxShadow: lit ? '0 0 14px rgba(214,170,90,.4)' : 'none',
                    transition:'box-shadow 600ms ease',
                    position:'relative'
                  }}>
                    {/* drip */}
                    <div style={{position:'absolute', top:0, left:-2, width:2, height: lit ? 8 : 0, background:'#efe2bf', transition:'height 1200ms ease'}}/>
                  </div>
                  {/* base */}
                  <div style={{width: 22, height: 4, background:'#3a2a14', boxShadow:'0 2px 0 rgba(0,0,0,.4)'}}/>
                  {/* roman numeral plaque */}
                  <div style={{
                    marginTop: 6, fontFamily:'"JetBrains Mono",monospace', fontSize:9, letterSpacing:'.24em',
                    color: lit ? '#d6aa5a' : 'rgba(236,225,196,.32)', transition:'color 600ms ease'
                  }}>
                    {toRoman(it.n)}
                  </div>
                </div>

                {/* right text */}
                <div style={{
                  textAlign:'left',
                  visibility: side === 'right' ? 'visible' : 'hidden',
                  opacity: lit ? 1 : 0,
                  transform: lit ? 'translateX(0)' : 'translateX(12px)',
                  transition:'opacity 700ms ease, transform 700ms ease'
                }}>
                  <div style={{fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.32em', color:'#d6aa5a'}}>
                    №{String(it.n).padStart(2,'0')}
                  </div>
                  <div style={{fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:'clamp(17px, 4.6vw, 21px)', color:'#ece1c4', lineHeight:1.15, marginTop:2}}>
                    {it.t}
                  </div>
                  <div style={{fontFamily:'"JetBrains Mono",monospace', fontSize:9.5, letterSpacing:'.28em', color:'rgba(236,225,196,.5)', marginTop:4}}>
                    {it.d}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* tally */}
        <div style={{textAlign:'center', marginTop: 40, fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.32em', color:'rgba(214,170,90,.85)'}}>
          {(() => {
            const litCount = list.filter((_, i) => p >= lightAt(i)).length;
            return `${String(litCount).padStart(2,'0')} / XIX  ·  LIT`;
          })()}
        </div>
      </div>

      <style>{`
        @keyframes flameFlicker {
          0%,100%{ transform: translateX(-50%) scale(1) skewX(-1deg); }
          25%   { transform: translateX(-50%) scale(1.08) skewX(2deg); }
          50%   { transform: translateX(-50%) scale(.92)  skewX(-2deg); }
          75%   { transform: translateX(-50%) scale(1.04) skewX(1deg); }
        }
      `}</style>
    </section>
  );
}

function toRoman(n){
  const map = [['X',10],['IX',9],['V',5],['IV',4],['I',1]];
  let r=''; for (const [s,v] of map) while (n>=v){ r+=s; n-=v; } return r;
}

/* ────────────────────────────────────────────────────────────
   Horizontal swipe Archive (mobile-first) — scroll-snap covers
   ──────────────────────────────────────────────────────────── */
function HorizArchive(){
  const scrollerRef = React.useRef(null);
  const [idx, setIdx] = React.useState(0);
  const items = ISSUES_V2; // newest first
  React.useEffect(() => {
    const el = scrollerRef.current; if (!el) return;
    let raf = 0;
    const tick = () => {
      const children = [...el.children];
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      children.forEach((c, i) => {
        const cx = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cx - center);
        if (d < bestDist){ bestDist = d; best = i; }
      });
      setIdx(best);
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    el.addEventListener('scroll', on, { passive:true });
    tick();
    return () => { el.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  // Desktop drag-to-scroll with momentum (kinetic scroll)
  React.useEffect(() => {
    const el = scrollerRef.current; if (!el) return;
    let isDown = false, startX = 0, startScroll = 0, lastX = 0, lastT = 0, velocity = 0, moved = 0;
    let raf = 0;
    let momentumRaf = 0;

    const stopMomentum = () => { if (momentumRaf) { cancelAnimationFrame(momentumRaf); momentumRaf = 0; } };

    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      stopMomentum();
      isDown = true; moved = 0;
      startX = lastX = e.pageX;
      startScroll = el.scrollLeft;
      lastT = performance.now();
      velocity = 0;
      el.style.cursor = 'grabbing';
      el.style.scrollSnapType = 'none'; // disable snapping while dragging
    };
    const onMove = (e) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 3) {
        e.preventDefault();
        moved = Math.abs(dx);
        const now = performance.now();
        const dt = Math.max(1, now - lastT);
        // Smooth velocity with low-pass filter — px/ms
        const instV = (e.pageX - lastX) / dt;
        velocity = velocity * 0.7 + instV * 0.3;
        lastX = e.pageX;
        lastT = now;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { el.scrollLeft = startScroll - dx; });
      }
    };
    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = 'grab';
      // Apply momentum: keep scrolling, decay velocity, then re-enable snap.
      let v = velocity * 16; // px / frame at 60fps
      if (Math.abs(v) < 0.3) {
        el.style.scrollSnapType = 'x mandatory';
        return;
      }
      const step = () => {
        el.scrollLeft -= v;
        v *= 0.94;
        if (Math.abs(v) > 0.4 && el.scrollLeft > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth) {
          momentumRaf = requestAnimationFrame(step);
        } else {
          momentumRaf = 0;
          el.style.scrollSnapType = 'x mandatory';
        }
      };
      momentumRaf = requestAnimationFrame(step);
    };
    // suppress click after a drag so dots/links don't fire
    const onClickCapture = (e) => {
      if (moved > 4) { e.stopPropagation(); e.preventDefault(); moved = 0; }
    };
    // touch users also benefit from killing in-flight momentum when they grab the track
    const onTouchStart = () => stopMomentum();

    el.style.cursor = 'grab';
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('mouseleave', endDrag);
    el.addEventListener('click', onClickCapture, true);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('mouseleave', endDrag);
      el.removeEventListener('click', onClickCapture, true);
      el.removeEventListener('touchstart', onTouchStart);
      stopMomentum();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const cur = items[idx];

  return (
    <section id="v-archive" data-screen-label="04 Archive · Swipe" style={{padding:'90px 0 90px', overflow:'hidden'}}>
      <div style={{textAlign:'center', padding:'0 22px', maxWidth: 720, margin:'0 auto 28px'}}>
        <Reveal style={{marginBottom: 16}}>
          <Eyebrow>VERSE  ·  IV  —  THE ARCHIVE</Eyebrow>
        </Reveal>
        <Reveal delay={120} style={{
          fontFamily:'"Cormorant Garamond","EB Garamond",serif',
          fontSize:'clamp(34px, 9vw, 64px)', lineHeight:.98, letterSpacing:'-.02em',
          fontWeight:400, color:'#ece1c4', textWrap:'balance'
        }}>
          <span style={{textDecoration:'line-through', textDecorationThickness:'1px', textDecorationColor:'rgba(214,170,90,.5)', color:'rgba(236,225,196,.55)'}}>
            Sealed.
          </span>{' '}
          <em style={{color:'#d6aa5a', fontStyle:'italic'}}>Breaking.</em>
        </Reveal>
        <Reveal delay={220} style={{marginTop: 14, fontFamily:'"EB Garamond",serif', fontStyle:'italic', fontSize:'clamp(15px, 4.2vw, 18px)', color:'rgba(236,225,196,.7)'}}>
          Swipe through the nineteen volumes.
        </Reveal>
      </div>

      {/* horizontal snap scroller */}
      <div ref={scrollerRef} style={{
        display:'flex', gap:18, padding:'10px calc(50% - min(30vw, 120px)) 10px',
        overflowX:'auto', overflowY:'hidden',
        scrollSnapType:'x mandatory',
        scrollbarWidth:'none', WebkitOverflowScrolling:'touch',
        maskImage:'linear-gradient(90deg, transparent 0, #000 14%, #000 86%, transparent 100%)',
        WebkitMaskImage:'linear-gradient(90deg, transparent 0, #000 14%, #000 86%, transparent 100%)'
      }}>
        {items.map((it, i) => (
          <ArchiveCover key={it.n} item={it} active={i === idx}/>
        ))}
      </div>
      <style>{`
        section#v-archive > div::-webkit-scrollbar { display:none; }
      `}</style>

      {/* plaque */}
      <div style={{maxWidth: 460, margin:'24px auto 0', padding:'0 22px', textAlign:'center', minHeight: 92}}>
        <div key={cur.n} style={{
          fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.32em', color:'#d6aa5a',
          animation:'plaqueIn 500ms ease both'
        }}>
          №{String(cur.n).padStart(2,'0')} &nbsp;·&nbsp; {cur.d}
        </div>
        <div key={`t-${cur.n}`} style={{
          marginTop: 6, fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic',
          fontSize:'clamp(24px, 6vw, 32px)', color:'#ece1c4',
          animation:'plaqueIn 550ms ease both'
        }}>
          {cur.t}
        </div>
      </div>

      {/* progress dashes */}
      <div style={{display:'flex', justifyContent:'center', gap:4, marginTop: 22, padding:'0 22px', flexWrap:'wrap', maxWidth: 480, marginLeft:'auto', marginRight:'auto'}}>
        {items.map((it, i) => (
          <button key={it.n} aria-label={`Go to issue ${it.n}`} onClick={() => {
            const el = scrollerRef.current; if (!el) return;
            const c = el.children[i]; if (!c) return;
            el.scrollTo({ left: c.offsetLeft - (el.clientWidth - c.offsetWidth)/2, behavior:'smooth' });
          }} style={{
            flex:'0 0 auto', width: 16, height: 16, padding: 0, background:'transparent', border:'none',
            cursor:'pointer'
          }}>
            <span style={{display:'block', width:'100%', height: 2, background: i===idx ? '#d6aa5a' : 'rgba(214,170,90,.22)', transition:'background 300ms ease'}}/>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes plaqueIn { from { opacity:0; transform: translateY(6px) } to { opacity:1; transform:none } }
      `}</style>
    </section>
  );
}

function ArchiveCover({ item, active }){
  const hueA = (item.n * 37 + 10) % 360;
  const hueB = (item.n * 53 + 200) % 360;
  const buyLink = ISSUE_LINKS[item.n];
  return (
    <div style={{
      flex:'0 0 auto',
      width:'min(60vw, 240px)',
      scrollSnapAlign:'center',
      transform: active ? 'scale(1) translateY(0)' : 'scale(.84) translateY(8px)',
      opacity: active ? 1 : 0.5,
      transition:'transform 500ms cubic-bezier(.22,.61,.36,1), opacity 500ms ease',
      position:'relative'
    }}>
      <div style={{
        width:'100%', aspectRatio:'2/3', position:'relative', overflow:'hidden',
        background: item.img
          ? `url('${item.img}') center/cover no-repeat`
          : `linear-gradient(${(item.n*17)%360}deg, hsl(${hueA} 20% 8%), hsl(${hueB} 30% 18%))`,
        boxShadow: active
          ? '0 0 0 1px rgba(214,170,90,.55), 0 30px 50px -15px rgba(0,0,0,.8), 0 0 60px rgba(214,170,90,.25)'
          : '0 0 0 1px rgba(214,170,90,.18), 0 20px 30px -15px rgba(0,0,0,.7)',
        transition:'box-shadow 500ms ease'
      }}>
        {!item.img && (
          <>
            <div style={{
              position:'absolute', inset:'30% 14% 30% 14%',
              background:'radial-gradient(ellipse at 50% 40%, rgba(214,170,90,.20), rgba(214,170,90,0) 65%)',
              filter:'blur(4px)'
            }}/>
            <div style={{position:'absolute', top:10, left:0, right:0, textAlign:'center', fontFamily:'"JetBrains Mono",monospace', fontSize:9, letterSpacing:'.3em', color:'rgba(236,225,196,.65)'}}>
              INFINITE ODYSSEY · №{String(item.n).padStart(2,'0')}
            </div>
            <div style={{position:'absolute', bottom:14, left:14, right:14, textAlign:'center', fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:14, color:'rgba(236,225,196,.9)', lineHeight:1.15}}>
              {item.t}
            </div>
          </>
        )}
        {/* gold corner sigil for issue 19 */}
        {item.n === 19 && (
          <div style={{position:'absolute', top:8, right:8, fontFamily:'"JetBrains Mono",monospace', fontSize:9, letterSpacing:'.25em', color:'#d6aa5a', background:'rgba(12,8,5,.6)', padding:'3px 6px', border:'1px solid rgba(214,170,90,.45)'}}>
            FINAL
          </div>
        )}
      </div>
      {/* Buy button */}
      {buyLink && (
        <a href={buyLink} target="_blank" rel="noopener noreferrer" style={{
          display:'block', marginTop:14, padding:'11px 16px',
          fontFamily:'"EB Garamond",serif', fontSize:'clamp(13px, 2.5vw, 14px)', letterSpacing:'.08em',
          color:'#d6aa5a', background:'transparent', border:'1px solid rgba(214,170,90,.6)',
          textAlign:'center', textDecoration:'none', cursor:'pointer',
          transition:'all 400ms cubic-bezier(.22,.61,.36,1)',
          fontWeight:400, fontStyle:'italic', position:'relative', overflow:'hidden'
        }} onMouseEnter={(e) => {
          e.target.style.background = 'rgba(214,170,90,.08)';
          e.target.style.borderColor = '#d6aa5a';
          e.target.style.color = '#e6bb6a';
          e.target.style.boxShadow = '0 0 20px rgba(214,170,90,.2)';
        }} onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = 'rgba(214,170,90,.6)';
          e.target.style.color = '#d6aa5a';
          e.target.style.boxShadow = 'none';
        }}>
          <span style={{display:'flex', alignItems:'center', justifyContent:'center', gap:6}}>
            <span style={{fontSize:'1.1em'}}>✦</span>
            <span>Buy</span>
            <span style={{fontSize:'1.1em'}}>✦</span>
          </span>
        </a>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Wrappers so existing sections get section ids for the rail
   ──────────────────────────────────────────────────────────── */
function withId(Component, id, label){
  return function Wrapped(props){
    return (
      <div id={id} data-screen-label={label}>
        <Component {...props}/>
      </div>
    );
  };
}

window.ReliquaryV2 = {
  ProgressRail, ThumbCTA, VerseRail,
  VigilV2, VerseLoomV2, VigilCandles, HorizArchive,
  withId
};
