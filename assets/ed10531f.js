// Reliquary v3 — refinements:
// • Smaller, snappier hero
// • Upper press strip (different style than the bottom marquee)
// • Compact "XIX sealed" replacing the 19-candle scroll trap
// • More micro-animations sprinkled throughout
const { useElementScroll, useViewportScroll, usePageProgress, useScrollVelocity, useActiveSection, ScrollLines } = window.ReliquaryMotion;
const { Reveal, LineReveal, WordsReveal, Rule, Eyebrow, PressMark } = window.ReliquaryAtoms;

/* ────────────────────────────────────────────────────────────
   Hero v3 — same DNA, smaller scale, tighter timing
   ──────────────────────────────────────────────────────────── */
function letterSpansV3(text, startDelay, perChar = 28, color){
  return text.split('').map((c, i) => (
    <span key={i} style={{
      display:'inline-block', whiteSpace: c===' ' ? 'pre' : 'normal',
      animation:`letterIn 760ms cubic-bezier(.22,.61,.36,1) ${startDelay + i*perChar}ms both`,
      color: color || 'inherit',
      transformOrigin:'50% 100%'
    }}>{c}</span>
  ));
}

function VigilV3(){
  const [ref, p] = useElementScroll();
  const haloScale = 1 + p * 0.5;
  const haloOpacity = Math.max(0, 1 - p * 1.2);
  return (
    <section id="v-vigil" data-screen-label="01 Vigil" ref={ref} style={{
      position:'relative', minHeight:'88svh', display:'flex',
      flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'72px 22px 92px', textAlign:'center', overflow:'hidden'
    }}>
      {/* Ambient halo, scroll-tied */}
      <div aria-hidden style={{
        position:'absolute', left:'50%', top:'46%',
        width:'min(110vw, 760px)', aspectRatio:'1/1',
        transform:`translate(-50%, -50%) scale(${haloScale})`,
        opacity: haloOpacity,
        background:'radial-gradient(circle, rgba(214,170,90,.30) 0%, rgba(214,170,90,.08) 32%, rgba(214,170,90,0) 65%)',
        animation:'haloPulse 7s ease-in-out infinite', pointerEvents:'none',
        transition:'transform 120ms linear, opacity 120ms linear'
      }}/>

      {/* Sparks layer with parallax */}
      <div aria-hidden style={{position:'absolute', inset:0, pointerEvents:'none', transform:`translateY(${p*-60}px)`}}>
        {[...Array(14)].map((_,i)=>(
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

      {/* Logo in center */}
      {window.__resources.logoHome && (
        <img src={window.__resources.logoHome} aria-hidden style={{
          position:'absolute', left:'50%', top:'46%',
          width:'min(28vw, 260px)', height:'min(28vw, 260px)',
          transform:'translate(-50%, -50%)', pointerEvents:'none',
          opacity:0.25, objectFit:'contain'
        }} alt=""/>
      )}

      {/* Slow-orbit ring */}
      <div aria-hidden style={{
        position:'absolute', left:'50%', top:'46%', width: 320, height: 320,
        transform:'translate(-50%, -50%)', pointerEvents:'none',
        border:'1px solid rgba(214,170,90,.10)', borderRadius:'50%',
        animation:'slowSpin 60s linear infinite'
      }}>
        <span style={{position:'absolute', top:-3, left:'50%', width:6, height:6, background:'#d6aa5a', transform:'translateX(-50%) rotate(45deg)', boxShadow:'0 0 10px #d6aa5a'}}/>
      </div>

      <Reveal variant="rv-fade" delay={120} style={{marginBottom: 22}}>
        <div style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center', color:'#d6aa5a'}}>
          <span style={{width:5,height:5,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
          <span style={{width:7,height:7,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
          <span style={{width:5,height:5,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
        </div>
      </Reveal>

      <Reveal variant="rv-fade" delay={240}>
        <Eyebrow>ANNO MMXXVI &nbsp;·&nbsp; THE SECOND CYCLE</Eyebrow>
      </Reveal>

      <div style={{margin:'18px 0 10px', maxWidth: 920, position:'relative'}}>
        <h1 style={{
          margin:0, fontFamily:'"Cormorant Garamond","EB Garamond",serif',
          fontSize:'clamp(56px, 13vw, 140px)', lineHeight:.94, fontWeight:400,
          letterSpacing:'-.025em', padding:'0.06em 0'
        }}>
          <span style={{display:'block', overflow:'hidden', padding:'0.04em 0'}}>{letterSpansV3('Infinite', 440, 40)}</span>
          <span style={{display:'block', overflow:'hidden', padding:'0.04em 0'}}>{letterSpansV3('Odyssey', 760, 42)}</span>
        </h1>
        <h2 style={{
          margin:'.05em 0 0', fontFamily:'"Cormorant Garamond","EB Garamond",serif',
          fontSize:'clamp(36px, 9.2vw, 96px)', lineHeight:1, fontWeight:400,
          fontStyle:'italic', letterSpacing:'-.02em', color:'#d6aa5a',
          filter:'drop-shadow(0 0 28px rgba(214,170,90,.45))',
          padding:'0.04em 0'
        }}>
          <span style={{display:'block', overflow:'hidden', padding:'0.06em 0'}}>{letterSpansV3('is returning.', 1200, 44, '#d6aa5a')}</span>
        </h2>
      </div>

      <Reveal variant="rv-fade" delay={1900} style={{maxWidth: 540, margin:'0 auto'}}>
        <p style={{
          fontFamily:'"EB Garamond",serif', fontStyle:'italic',
          fontSize:'clamp(17px, 4vw, 22px)', lineHeight:1.55,
          color:'rgba(236,225,196,.78)', margin:'10px 0 0', textWrap:'balance'
        }}>
          The World's First<br/>
          <span style={{color:'#d6aa5a'}}>Fully AI-Generated Sci-Fi Magazine</span>
        </p>
      </Reveal>

      <Reveal variant="rv-fade" delay={2200} style={{marginTop: 28, display:'flex', gap:12, alignItems:'center', justifyContent:'center', flexWrap:'wrap'}}>
        <a href="#cycle-two" style={{
          display:'inline-flex', alignItems:'center', gap:10,
          padding:'14px 24px',
          background:'#d6aa5a', color:'#0c0805',
          fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(11px, 1.1vw, 13px)', fontWeight:700, letterSpacing:'.32em',
          boxShadow:'0 0 0 1px rgba(214,170,90,.55), 0 18px 32px -10px rgba(214,170,90,.28)',
          position:'relative', overflow:'hidden'
        }}>
          <span style={{width:5,height:5,background:'#0c0805',transform:'rotate(45deg)'}}/>
          NOTIFY ME
          <span aria-hidden style={{
            position:'absolute', inset:0,
            background:'linear-gradient(120deg, transparent 35%, rgba(255,250,225,.7) 50%, transparent 65%)',
            transform:'translateX(-110%)', animation:'shimmer 5s ease-in-out infinite'
          }}/>
        </a>
        <a href="#v-archive" style={{
          fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(11px, 1.1vw, 13px)', letterSpacing:'.32em',
          color:'rgba(236,225,196,.7)', padding:'14px 6px',
          borderBottom:'1px solid rgba(214,170,90,.35)'
        }}>READ 19 VOLUMES →</a>
      </Reveal>

      {/* Scroll indicator */}
      <Reveal variant="rv-fade" delay={2500} style={{
        position:'absolute', bottom:18, left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:6, color:'rgba(214,170,90,.75)'
      }}>
        <span style={{fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(9.5px, 0.9vw, 11px)', letterSpacing:'.4em'}}>SCROLL</span>
        <span style={{position:'relative', width:1, height:28, background:'rgba(214,170,90,.25)', overflow:'hidden'}}>
          <span style={{
            position:'absolute', left:0, top:-12, width:1, height:12,
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
          0%   { top:-12px; opacity:0 }
          25%  { opacity:1 }
          80%  { opacity:1 }
          100% { top:46px;  opacity:0 }
        }
        @keyframes slowSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   PressTicker — upper press strip (DIFFERENT style than bottom):
   • Strip of pull-quotes on a thin gold-edged plate
   • Auto-rotates between outlets with a tape-deck index
   ──────────────────────────────────────────────────────────── */
const QUOTES = [
  { src:"REUTERS",            url:"https://www.reuters.com/article/fact-check/images-purporting-to-show-ancient-alien-artifacts-unearthed-during-world-war-two-idUSL1N36K1Y1/", q:"a generative sci-fi anthology unlike anything in print" },
  { src:"DePaul University",  url:"https://condor.depaul.edu/jmoore/tech/ai/",                                                                                              q:"the first sci-fi magazine entirely created by artificial intelligence" },
  { src:"ESQUIRE",            url:"https://www.esquire.com/es/actualidad/cine/a42095549/como-serian-superheroes-siglo-xix-ia-capitan-america-iron-man-batman-flash/",        q:"the carrier's voice is the surprise of the year" },
  { src:"FUTURISM",           url:"https://futurism.com/sci-fi-magazine-generated-ai-interview",                                                                              q:"strange, beautiful, and unsettlingly literary" },
  { src:"BOING BOING",        url:"https://boingboing.net/2023/01/09/infinite-oddyssey-is-the-first-sci-fi-magazine-created-completely-with-ai.html",                         q:"nineteen issues. zero ordinary." },
  { src:"AMAZING STORIES",    url:"https://amazingstories.com/2023/01/clubhouse-review-infinite-odyssey-magazine-1/",                                                          q:"a serious entry in machine-authored fiction" },
];

function PressTicker(){
  const sectionRef = React.useRef(null);
  const [i, setI] = React.useState(0);
  const [seen, setSeen] = React.useState(false); // becomes true once the strip enters view
  const [inView, setInView] = React.useState(false);

  // Start the cycle only after the strip first enters view, anchored on QUOTES[0]
  React.useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && !seen) {
        setSeen(true);
        setI(0);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  React.useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setI(v => (v+1) % QUOTES.length), 4400);
    return () => clearInterval(t);
  }, [inView]);

  const cur = QUOTES[i];

  return (
    <section ref={sectionRef} id="v-press-top" data-screen-label="02 Press · Witnessed"
      style={{padding:'22px 16px 14px'}}
    >
      <div className="press-plate" style={{
        maxWidth: 940, margin:'0 auto', position:'relative',
        borderTop:'1px solid rgba(214,170,90,.22)',
        borderBottom:'1px solid rgba(214,170,90,.22)',
        background:'linear-gradient(180deg, rgba(214,170,90,.05), rgba(214,170,90,0))'
      }}>
        {/* corner ticks */}
        {['tl','tr','bl','br'].map(k => (
          <span key={k} aria-hidden style={{
            position:'absolute', width:6, height:6, background:'#d6aa5a',
            transform:'rotate(45deg)',
            ...(k[0]==='t' ? {top:-4} : {bottom:-4}),
            ...(k[1]==='l' ? {left:-3} : {right:-3})
          }}/>
        ))}

        <div className="press-grid">
          {/* tape-deck index */}
          <div className="press-index">
            <span style={{fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(9.5px, 0.9vw, 11px)', letterSpacing:'.34em', color:'#d6aa5a'}}>
              PRESS · {String(i+1).padStart(2,'0')}/{String(QUOTES.length).padStart(2,'0')}
            </span>
            <span style={{
              display:'inline-flex', alignItems:'center', gap:5, fontFamily:'"JetBrains Mono",monospace',
              fontSize:'clamp(8.5px, 0.85vw, 10.5px)', letterSpacing:'.3em', color:'rgba(236,225,196,.55)'
            }}>
              <span style={{width:6, height:6, borderRadius:'50%', background:'#e6a23c', boxShadow:'0 0 8px #e6a23c', animation:'flickerGold 2.4s ease-in-out infinite'}}/>
              ON THE RECORD
            </span>
          </div>

          {/* rotating quote */}
          <div className="press-quote">
            <div key={i} className="press-quote-inner">
              <span style={{color:'#d6aa5a', marginRight: 6, fontSize:'1.4em', lineHeight:0, position:'relative', top:'.18em'}}>“</span>
              {cur.q}
              <span style={{color:'#d6aa5a', marginLeft: 4, fontSize:'1.4em', lineHeight:0, position:'relative', top:'.18em'}}>”</span>
              <span className="press-src">
                — <a href={cur.url} target="_blank" rel="noopener noreferrer" style={{color:'inherit', borderBottom:'1px solid rgba(214,170,90,.45)', paddingBottom:1}}>
                  <PressMark name={cur.src}/>
                </a>
              </span>
            </div>
          </div>

          {/* progress dots */}
          <div className="press-dots">
            {QUOTES.map((_, k) => (
              <button key={k} aria-label={`Press quote ${k+1}`} onClick={()=>setI(k)} style={{
                width: k===i ? 22 : 8, height: 3, padding: 0, border:'none',
                background: k===i ? '#d6aa5a' : 'rgba(214,170,90,.3)',
                transition:'width 360ms ease, background 360ms ease',
                cursor:'pointer'
              }}/>
            ))}
          </div>
        </div>

        {/* progress bar (auto-advance) */}
        <div aria-hidden style={{position:'absolute', left:0, right:0, bottom:-1, height:1}}>
          <div key={i} style={{
            width:'100%', height:'100%', transformOrigin:'0% 50%',
            background:'linear-gradient(90deg, rgba(214,170,90,0), #d6aa5a 60%, rgba(214,170,90,.4))',
            animation: inView ? 'qBar 4400ms linear both' : 'none'
          }}/>
        </div>
      </div>

      <style>{`
        .press-grid {
          display:grid; align-items:center; gap:16px;
          padding:16px 20px;
          grid-template-columns: minmax(140px, max-content) 1fr auto;
        }
        .press-index { display:flex; flex-direction:column; align-items:flex-start; gap:4px; }
        .press-quote {
          position:relative; overflow:hidden;
          min-height: 84px; display:flex; align-items:center;
        }
        .press-quote-inner {
          animation: qSlide 580ms cubic-bezier(.22,.61,.36,1) both;
          font-family:"Cormorant Garamond","EB Garamond",serif;
          font-style:italic;
          font-size: clamp(16px, 1.55vw, 21px);
          line-height:1.4;
          color:#ece1c4; text-wrap:balance; width:100%;
        }
        .press-src {
          margin-left: 12px; white-space: nowrap;
          font-family:"JetBrains Mono",monospace;
          font-size: clamp(10px, 1vw, 12px); letter-spacing:.28em;
          color: rgba(214,170,90,.9); font-style:normal;
        }
        .press-dots { display:flex; gap:5px; align-items:center; }

        /* MOBILE: stack vertically so quote gets full width and doesn't squeeze */
        @media (max-width: 720px) {
          .press-grid {
            grid-template-columns: 1fr;
            grid-template-areas: "idx" "quote" "dots";
            gap: 12px;
            padding: 14px 16px 16px;
          }
          .press-index   { grid-area: idx;   flex-direction: row; align-items: center; gap: 12px; justify-content: space-between; width:100%; }
          .press-quote   { grid-area: quote; min-height: 96px; }
          .press-dots    { grid-area: dots;  justify-content: center; }
          .press-quote-inner { font-size: clamp(17px, 4.4vw, 22px); }
          .press-src   {
            display: block; margin: 8px 0 0 0;
            font-size: 10.5px;
          }
        }

        @keyframes qSlide {
          from { opacity:0; transform: translateY(10px); filter: blur(6px); }
          to   { opacity:1; transform: translateY(0);    filter: blur(0); }
        }
        @keyframes qBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   SealXIX — compact replacement for the 19-candle scroll
   A single sealed plaque with 19 light-dots that animate on
   entry; one taller "FINAL" pillar.
   ──────────────────────────────────────────────────────────── */
function SealXIX(){
  // Use viewport-distance progress so the 19 dots light at the same pace on phone & desktop.
  // We want the LAST candle to light roughly when the seal sits at eye-level — i.e. after the user
  // has clearly scrolled the section into the middle of the viewport.
  // startVh 0.65 → don't start until the section is well into view.
  // spanVh  0.55 → lighting completes around scrolledVh ≈ 1.20 — that's where the seal sits centred.
  const [ref, light] = useViewportScroll({ startVh: 0.65, spanVh: 0.55 });
  const litCount = Math.floor(light * 19);

  return (
    <section id="v-candles" data-screen-label="03 Vigil · XIX Sealed" ref={ref}
      style={{padding:'70px 22px 80px', maxWidth: 760, margin:'0 auto', textAlign:'center'}}
    >
      <Reveal style={{marginBottom: 14}}>
        <Eyebrow>VERSE  ·  III  —  XIX, SEALED</Eyebrow>
      </Reveal>
      <Reveal delay={120} style={{
        fontFamily:'"Cormorant Garamond","EB Garamond",serif',
        fontSize:'clamp(28px, 7.4vw, 52px)', lineHeight:1.02, letterSpacing:'-.02em',
        fontWeight:400, color:'#ece1c4', textWrap:'balance'
      }}>
        Nineteen issues. <em style={{color:'#d6aa5a'}}>One cycle, lit and closed.</em>
      </Reveal>

      {/* the seal */}
      <Reveal variant="rv-fade" delay={260} style={{marginTop: 30}}>
        <div className="seal-plate" style={{
          position:'relative', display:'inline-block',
          padding:'22px 26px 18px',
          border:'1px solid rgba(214,170,90,.45)',
          background:'radial-gradient(ellipse at 50% 0%, rgba(214,170,90,.10), rgba(214,170,90,0) 70%), rgba(12,8,5,.4)'
        }}>
          {/* corner ticks */}
          {['tl','tr','bl','br'].map(k => (
            <span key={k} aria-hidden style={{
              position:'absolute', width:7, height:7, background:'#d6aa5a',
              transform:'rotate(45deg)',
              ...(k[0]==='t' ? {top:-4} : {bottom:-4}),
              ...(k[1]==='l' ? {left:-4} : {right:-4})
            }}/>
          ))}

          {/* 19 micro-candles in a row */}
          <div className="seal-row" style={{display:'flex', gap:'clamp(5px, 1.6vw, 12px)', alignItems:'flex-end', justifyContent:'center'}}>
            {[...Array(19)].map((_, i) => {
              const lit = i < litCount;
              const last = i === 18;
              return (
                <div key={i} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:2}}>
                  {/* flame */}
                  <span aria-hidden style={{
                    width: 7, height: 10,
                    borderRadius:'50% 50% 45% 45% / 60% 60% 40% 40%',
                    background:'radial-gradient(ellipse at 50% 75%, #fff6d5 0%, #ffd98a 25%, #e6a23c 55%, rgba(230,162,60,0) 78%)',
                    opacity: lit ? 1 : 0,
                    transform: lit ? 'scale(1)' : 'scale(.2)',
                    transformOrigin:'50% 100%',
                    boxShadow: lit ? '0 0 10px rgba(255,217,138,.9), 0 0 18px rgba(230,162,60,.55)' : 'none',
                    animation: lit ? 'flameFlicker 2.4s ease-in-out infinite' : 'none',
                    animationDelay: `${(i*0.13)%1.4}s`,
                    transition:'opacity 380ms ease, transform 380ms cubic-bezier(.22,.61,.36,1)'
                  }}/>
                  {/* stick */}
                  <span style={{
                    width: 3,
                    height: last ? 22 : 'clamp(20px, 5.6vw, 32px)',
                    background: last
                      ? 'linear-gradient(180deg, #c9a35a, #6b4a1d)'
                      : 'linear-gradient(180deg, #efe2bf 0%, #d4c389 35%, #b29957 75%, #6e5a2f 100%)',
                    boxShadow: lit ? '0 0 8px rgba(214,170,90,.45)' : 'none',
                    transition:'box-shadow 400ms ease'
                  }}/>
                  {/* base */}
                  <span style={{width: 9, height: 2, background:'#3a2a14'}}/>
                </div>
              );
            })}
          </div>

          {/* roman numeral + tally */}
          <div style={{
            marginTop: 14, display:'flex', justifyContent:'space-between', alignItems:'center', gap: 18,
            fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(10.5px, 1vw, 13px)', letterSpacing:'.32em',
            color:'rgba(214,170,90,.85)'
          }}>
            <span>19 · SEALED</span>
            <span style={{color:'rgba(236,225,196,.55)'}}>{String(litCount).padStart(2,'0')} / 19  ·  LIT</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={420} style={{marginTop: 18, fontFamily:'"EB Garamond",serif', fontStyle:'italic', fontSize:'clamp(14px, 3.8vw, 17px)', color:'rgba(236,225,196,.65)', textWrap:'pretty', maxWidth: 460, margin:'18px auto 0'}}>
        Every flame an issue. The last, taller and gilded, is the one that closed the cycle.
      </Reveal>

      <style>{`
        @keyframes flameFlicker {
          0%,100%{ transform: scale(1) skewX(-1deg); }
          25%   { transform: scale(1.08) skewX(2deg); }
          50%   { transform: scale(.92)  skewX(-2deg); }
          75%   { transform: scale(1.04) skewX(1deg); }
        }
        @media (max-width: 480px) {
          .seal-plate { padding: 18px 14px 14px !important; }
          .seal-row { gap: 5px !important; }
        }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Witnessed v3 — bottom marquee, gentler, line-with-counters
   (we keep the existing one but expose a v3 variant if needed)
   ──────────────────────────────────────────────────────────── */
function WitnessedV3(){
  const PRESS = [
    "REUTERS","MSN","BOING BOING","FUTURISM","ESQUIRE",
    "DePaul University","AMAZING STORIES","TheSciFi.net"
  ];
  const row = [...PRESS, ...PRESS, ...PRESS];
  return (
    <section style={{padding:'70px 0 60px', borderTop:'1px solid rgba(214,170,90,.18)', borderBottom:'1px solid rgba(214,170,90,.18)', overflow:'hidden'}}>
      <div style={{textAlign:'center', padding:'0 22px', marginBottom: 28}}>
        <Reveal><Eyebrow>✦ &nbsp; WITNESSED BY &nbsp; ✦</Eyebrow></Reveal>
        <Reveal delay={120} style={{
          marginTop: 10, fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic',
          fontSize:'clamp(18px, 4.6vw, 24px)', color:'rgba(236,225,196,.7)'
        }}>
          The first cycle was watched by &mdash;
        </Reveal>
      </div>

      <Reveal variant="rv-fade" delay={140}>
        <div style={{position:'relative', maskImage:'linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)', WebkitMaskImage:'linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)'}}>
          <div style={{display:'inline-flex', gap:54, alignItems:'center', padding:'0 30px', animation:'drift 45s linear infinite'}}>
            {row.map((p,i)=>(
              <span key={i} style={{display:'inline-flex', alignItems:'center', gap:54}}>
                <PressMark name={p}/>
                <span style={{color:'#d6aa5a', fontSize:10, opacity:.5}}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

window.ReliquaryV3 = {
  VigilV3, PressTicker, SealXIX, WitnessedV3
};
