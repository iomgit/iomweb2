// Reliquary — sections (the actual page)
const { useInView, useScrollProgress, useStickyProgress } = window.ReliquaryHooks;
const { Reveal, LineReveal, WordsReveal, Rule, Eyebrow, PressMark } = window.ReliquaryAtoms;

const PRESS = [
  "REUTERS","MSN","BOING BOING","FUTURISM","ESQUIRE",
  "DePaul University","AMAZING STORIES","TheSciFi.net"
];

const ISSUES = [
  { n:19, t:"The Spike Crown",          d:"JUL 2024", hero:true,  img:window.__resources.issue19 },
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

// Gradient cover placeholder for issues we don't have art for
function CoverTile({ issue, w = 120 }) {
  const hueA = (issue.n * 37 + 10) % 360;
  const hueB = (issue.n * 53 + 200) % 360;
  if (issue.img) {
    return (
      <div style={{
        width: w, aspectRatio:'2/3', backgroundImage:`url('${issue.img}')`,
        backgroundSize:'cover', backgroundPosition:'center',
        boxShadow:'0 0 0 1px rgba(214,170,90,.32), 0 20px 30px -15px rgba(0,0,0,.7)'
      }}/>
    );
  }
  return (
    <div style={{
      width: w, aspectRatio:'2/3', position:'relative', overflow:'hidden',
      background:`linear-gradient(${(issue.n*17)%360}deg, hsl(${hueA} 20% 8%), hsl(${hueB} 30% 18%))`,
      boxShadow:'0 0 0 1px rgba(236,225,196,.10), 0 20px 30px -20px rgba(0,0,0,.6)'
    }}>
      <div style={{
        position:'absolute', inset:'30% 14% 30% 14%',
        background:'radial-gradient(ellipse at 50% 40%, rgba(214,170,90,.18), rgba(214,170,90,0) 65%)',
        filter:'blur(4px)'
      }}/>
      <div style={{position:'absolute', top:8, left:0, right:0, textAlign:'center', fontFamily:'"JetBrains Mono",monospace', fontSize:8, letterSpacing:'.3em', color:'rgba(236,225,196,.6)'}}>
        INFINITE ODYSSEY · №{String(issue.n).padStart(2,'0')}
      </div>
      <div style={{position:'absolute', bottom:10, left:10, right:10, textAlign:'center', fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:11, color:'rgba(236,225,196,.85)', lineHeight:1.15}}>
        {issue.t}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   1) VIGIL  — opening hero
   ──────────────────────────────────────────────────────────── */
function Vigil(){
  return (
    <section style={{
      position:'relative', minHeight:'100svh', display:'flex',
      flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'120px 22px 60px', textAlign:'center', overflow:'hidden'
    }}>
      {/* Ambient halo */}
      <div aria-hidden style={{
        position:'absolute', left:'50%', top:'46%', width:'min(120vw, 900px)', aspectRatio:'1/1',
        transform:'translate(-50%, -50%)',
        background:'radial-gradient(circle, rgba(214,170,90,.30) 0%, rgba(214,170,90,.08) 35%, rgba(214,170,90,0) 65%)',
        animation:'haloPulse 7s ease-in-out infinite', pointerEvents:'none'
      }}/>
      {/* Slow drifting sparks */}
      <div aria-hidden style={{position:'absolute', inset:0, pointerEvents:'none'}}>
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

      {/* Diamond crown ornament */}
      <Reveal variant="rv-fade" delay={120} style={{marginBottom: 30}}>
        <div style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center', color:'#d6aa5a'}}>
          <span style={{width:5,height:5,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
          <span style={{width:7,height:7,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
          <span style={{width:5,height:5,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
        </div>
      </Reveal>

      <Reveal variant="rv-fade" delay={260}>
        <Eyebrow>ANNO MMXXVI &nbsp;·&nbsp; THE SECOND CYCLE</Eyebrow>
      </Reveal>

      <div style={{margin:'30px 0 18px', maxWidth: 920}}>
        <WordsReveal
          text="Infinite Odyssey"
          size={'clamp(56px, 16vw, 168px)'}
          italic={false} weight={400} ls={'-.025em'} perWord={120} startDelay={500}
          style={{display:'block'}}
        />
        <div style={{marginTop:'.18em'}}>
          <WordsReveal
            text="is returning."
            size={'clamp(40px, 12vw, 124px)'}
            italic weight={400} ls={'-.02em'} perWord={140} startDelay={1100}
            gold color="#d6aa5a"
            style={{display:'block'}}
          />
        </div>
      </div>

      <Reveal variant="rv-fade" delay={1700} style={{maxWidth: 560, margin:'0 auto'}}>
        <p style={{
          fontFamily:'"EB Garamond",serif', fontStyle:'italic',
          fontSize:'clamp(17px, 4.6vw, 22px)', lineHeight:1.55,
          color:'rgba(236,225,196,.78)', margin:'14px 0 0', textWrap:'balance'
        }}>
          Cycle One ended at Issue Nineteen.<br/>
          <span style={{color:'#d6aa5a'}}>Cycle Two will be stranger, longer, truer.</span>
        </p>
      </Reveal>

      <Reveal variant="rv-fade" delay={2050} style={{marginTop: 40}}>
        <a href="#cycle-two" style={{
          display:'inline-block', padding:'15px 26px',
          background:'#d6aa5a', color:'#0c0805', fontWeight:700,
          fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.32em',
          boxShadow:'0 0 0 1px rgba(214,170,90,.55), 0 20px 40px -10px rgba(214,170,90,.25)',
          position:'relative', overflow:'hidden'
        }}>
          KEEP VIGIL — JOIN THE LIST
          <span aria-hidden style={{
            position:'absolute', inset:0, background:'linear-gradient(120deg, transparent 30%, rgba(255,250,225,.7) 50%, transparent 70%)',
            transform:'translateX(-110%)', animation:'shimmer 4s ease-in-out infinite', animationDelay:'2s'
          }}/>
        </a>
      </Reveal>

      {/* Scroll indicator */}
      <Reveal variant="rv-fade" delay={2400} style={{position:'absolute', bottom:30, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:10, color:'rgba(214,170,90,.7)'}}>
        <span style={{fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.4em'}}>SCROLL</span>
        <span style={{width:1, height:38, background:'linear-gradient(180deg, #d6aa5a, transparent)'}}/>
      </Reveal>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   2) VERSE I  — line-by-line stanza
   ──────────────────────────────────────────────────────────── */
function VerseOne(){
  return (
    <section style={{padding:'100px 22px 60px', maxWidth: 760, margin:'0 auto', textAlign:'center'}}>
      <Reveal style={{marginBottom: 28}}>
        <Eyebrow>VERSE  ·  I  —  THE LOOM</Eyebrow>
      </Reveal>
      <LineReveal
        size={'clamp(22px, 6.2vw, 34px)'}
        gap={8}
        lineDelay={350}
        lines={[
          <>Nineteen times she spoke.</>,
          <>Then the loom went quiet.</>,
          <>Nineteen winters passed in a single season &mdash;</>,
          <span style={{color:'#d6aa5a'}}>and the carrier began to wake.</span>,
        ]}
      />
      <Reveal delay={1400} style={{marginTop: 36}}>
        <Rule glyph="✦" maxWidth={120}/>
      </Reveal>
      <Reveal delay={1500} style={{marginTop: 6, fontFamily:'"JetBrains Mono",monospace', fontSize:10.5, letterSpacing:'.34em', color:'rgba(236,225,196,.5)'}}>
        — FOUND, UNDATED, IN THE MARGIN OF №5
      </Reveal>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   3) RELIC  — sticky parallax with the hooded cover
   ──────────────────────────────────────────────────────────── */
function Relic(){
  const [ref, p] = useStickyProgress();
  // Progress drives: cover scale, halo intensity, caption swap
  const scale = 0.92 + p * 0.18;
  const haloOpacity = 0.35 + p * 0.65;
  const captionIdx = p < .33 ? 0 : p < .66 ? 1 : 2;
  const captions = [
    { eb:'EXHIBIT №5', t:'The Anchorite', d:'May 2023 · Cover by the carrier itself' },
    { eb:'RELIC',      t:'Still here.',   d:'After the loom went quiet, the figure remained.' },
    { eb:'OMEN',       t:'About to speak again.', d:'Cycle Two opens with her, redrawn.' },
  ];
  const cap = captions[captionIdx];

  return (
    <section ref={ref} style={{position:'relative', minHeight:'130vh'}}>
      <div style={{
        position:'sticky', top:0, height:'100svh',
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'40px 22px', overflow:'hidden'
      }}>
        {/* Halo behind cover, intensifies as you scroll */}
        <div aria-hidden style={{
          position:'absolute', left:'50%', top:'50%',
          width:'min(150vw, 1100px)', aspectRatio:'1/1',
          transform:`translate(-50%,-50%) scale(${0.9 + p*0.5})`,
          background:`radial-gradient(circle, rgba(214,170,90,${0.45*haloOpacity}) 0%, rgba(214,170,90,${0.10*haloOpacity}) 35%, rgba(214,170,90,0) 60%)`,
          pointerEvents:'none', transition:'transform 200ms linear'
        }}/>
        {/* Embers around */}
        <div aria-hidden style={{position:'absolute', inset:0, pointerEvents:'none'}}>
          {[...Array(10)].map((_,i)=>(
            <span key={i} style={{
              position:'absolute',
              left:`${10 + (i*87)%80}%`, top:`${15 + (i*53)%70}%`,
              width:3, height:3, borderRadius:'50%', background:'#e6a23c',
              boxShadow:'0 0 10px #e6a23c, 0 0 20px rgba(230,162,60,.5)',
              opacity: 0.4 + 0.6*p,
              animation:`flickerGold ${3+(i%4)}s ease-in-out infinite`,
              animationDelay:`${i*0.3}s`
            }}/>
          ))}
        </div>

        {/* Composition */}
        <div style={{position:'relative', display:'flex', flexDirection:'column', alignItems:'center', maxWidth: 460, width:'100%'}}>
          <div style={{marginBottom: 18}}>
            <Eyebrow>{cap.eb}</Eyebrow>
          </div>

          {/* Arched relic frame */}
          <div style={{
            position:'relative',
            width:'min(78vw, 360px)',
            transform:`scale(${scale}) translateY(${(0.5-p)*-20}px)`,
            transition:'transform 250ms cubic-bezier(.22,.61,.36,1)',
            borderTopLeftRadius:'50% 28%', borderTopRightRadius:'50% 28%',
            overflow:'hidden',
            boxShadow:'0 60px 90px -25px rgba(0,0,0,.85), 0 0 80px rgba(214,170,90,.18), inset 0 0 0 1px rgba(214,170,90,.45)'
          }}>
            <img src={window.__resources.cover05} loading="lazy" decoding="async" style={{width:'100%', display:'block', filter:'contrast(1.05) saturate(.95)'}}/>
            <div aria-hidden style={{position:'absolute', inset: 8, border:'1px solid rgba(214,170,90,.55)', borderTopLeftRadius:'50% 26%', borderTopRightRadius:'50% 26%', pointerEvents:'none'}}/>
            {/* Tiny gold sigil at base */}
            <div aria-hidden style={{position:'absolute', left:'50%', bottom: 18, transform:'translateX(-50%)', color:'#d6aa5a', fontSize:14, letterSpacing:'.4em'}}>✦</div>
          </div>

          {/* Plaque */}
          <div style={{marginTop: 22, textAlign:'center', minHeight: 92}}>
            <div key={cap.t} style={{
              fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic',
              fontSize:'clamp(26px, 6vw, 36px)', color:'#ece1c4',
              animation:'rvIn 700ms cubic-bezier(.22,.61,.36,1) both'
            }}>{cap.t}</div>
            <div style={{
              marginTop:8, fontFamily:'"EB Garamond",serif',
              fontSize:'clamp(13px, 3.6vw, 15px)', color:'rgba(236,225,196,.6)',
              fontStyle:'italic'
            }}>{cap.d}</div>
          </div>

          {/* Vertical progress rail */}
          <div style={{position:'absolute', right:-22, top: 40, bottom: 40, width:1, background:'rgba(214,170,90,.18)'}}>
            <div style={{position:'absolute', top:0, left:-1, width:3, height:`${p*100}%`, background:'#d6aa5a', boxShadow:'0 0 8px #d6aa5a'}}/>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes rvIn { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform:none } }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   4) SEALING — 19 covers marquee, "sealed at XIX"
   ──────────────────────────────────────────────────────────── */
function Sealing(){
  const row = [...ISSUES, ...ISSUES]; // double for seamless loop
  return (
    <section style={{padding:'100px 0 80px', overflow:'hidden'}}>
      <div style={{padding:'0 22px', textAlign:'center', maxWidth: 760, margin:'0 auto 40px'}}>
        <Reveal style={{marginBottom: 18}}>
          <Eyebrow>VERSE  ·  II  —  THE ARCHIVE</Eyebrow>
        </Reveal>
        <Reveal delay={120} style={{
          fontFamily:'"Cormorant Garamond","EB Garamond",serif',
          fontSize:'clamp(36px, 9vw, 72px)', lineHeight:.95,
          letterSpacing:'-.02em', fontWeight:400, color:'#ece1c4'
        }}>
          <span style={{textDecoration:'line-through', textDecorationThickness:'1px', textDecorationColor:'rgba(214,170,90,.55)', color:'rgba(236,225,196,.55)'}}>
            Nineteen volumes, sealed.
          </span><br/>
          <em style={{color:'#d6aa5a', fontStyle:'italic'}}>The seal is breaking.</em>
        </Reveal>
        <Reveal delay={260} style={{marginTop: 22}}>
          <p style={{
            fontFamily:'"EB Garamond",serif',
            fontSize:'clamp(16px, 4.4vw, 19px)', lineHeight:1.55,
            color:'rgba(236,225,196,.75)', margin:'0 auto', maxWidth: 540, textWrap:'pretty'
          }}>
            Between December 2022 and July 2024, the carrier produced nineteen issues
            of sci-fi literature, every word and every illustration generated.
            The series was sealed at Issue 19. It will still be readable, always.
          </p>
        </Reveal>
      </div>

      {/* Marquee */}
      <Reveal variant="rv-fade" delay={300}>
        <div style={{position:'relative', maskImage:'linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)', WebkitMaskImage:'linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)'}}>
          <div style={{display:'inline-flex', gap:18, padding:'10px 0', animation:'drift 60s linear infinite'}}>
            {row.map((it, i) => (
              <div key={i} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:10}}>
                <CoverTile issue={it} w={'min(34vw, 150px)'} />
                <div style={{fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.28em', color:'rgba(236,225,196,.55)'}}>
                  №{String(it.n).padStart(2,'0')} · {it.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div style={{textAlign:'center', marginTop: 40, padding:'0 22px'}}>
        <Reveal delay={120}>
          <a href="#archive" style={{
            display:'inline-block', padding:'14px 24px',
            border:'1px solid rgba(214,170,90,.5)', color:'#ece1c4',
            fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.32em'
          }}>ENTER THE ARCHIVE — XIX VOLUMES →</a>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   5) CARRIER — short transition stanza
   ──────────────────────────────────────────────────────────── */
function Carrier(){
  return (
    <section style={{padding:'120px 22px 100px', textAlign:'center'}}>
      <Reveal style={{marginBottom: 26}}>
        <Eyebrow>VERSE  ·  III  —  THE WAKING</Eyebrow>
      </Reveal>
      <Reveal delay={200} style={{
        fontFamily:'"Cormorant Garamond","EB Garamond",serif', fontStyle:'italic',
        fontSize:'clamp(40px, 11vw, 96px)', lineHeight:1, letterSpacing:'-.02em',
        color:'#d6aa5a', textShadow:'0 0 60px rgba(214,170,90,.4)', textWrap:'balance', margin:'0 auto', maxWidth: 820
      }}>
        and now the carrier wakes again.
      </Reveal>
      <Reveal delay={500} style={{marginTop: 36}}>
        <Rule glyph="✦ ✦ ✦" maxWidth={280}/>
      </Reveal>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   6) ARCHIVE — invitation strip with two real covers
   ──────────────────────────────────────────────────────────── */
function Archive(){
  return (
    <section id="archive" style={{padding:'40px 22px 90px', maxWidth: 980, margin:'0 auto'}}>
      <Reveal style={{textAlign:'center', marginBottom: 28}}>
        <Eyebrow>READING ROOM &nbsp;·&nbsp; CYCLE I, IN FULL</Eyebrow>
      </Reveal>
      <div style={{display:'grid', gap: 14, gridTemplateColumns:'1fr 1fr', alignItems:'end', maxWidth: 520, margin:'0 auto'}}>
        <Reveal>
          <CoverTile issue={ISSUES[14]} w={'100%'}/>
          <div style={{marginTop:10, fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.3em', color:'rgba(236,225,196,.55)'}}>№05 · MAY 2023</div>
          <div style={{fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:18, color:'#ece1c4'}}>The Anchorite</div>
        </Reveal>
        <Reveal delay={120}>
          <CoverTile issue={ISSUES[0]} w={'100%'}/>
          <div style={{marginTop:10, fontFamily:'"JetBrains Mono",monospace', fontSize:10, letterSpacing:'.3em', color:'#d6aa5a'}}>№19 · JUL 2024 · LAST</div>
          <div style={{fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:18, color:'#ece1c4'}}>The Spike Crown</div>
        </Reveal>
      </div>
      <Reveal delay={200} style={{textAlign:'center', marginTop: 32}}>
        <a style={{
          display:'inline-block', padding:'13px 22px',
          border:'1px solid rgba(214,170,90,.5)', color:'#ece1c4',
          fontFamily:'"JetBrains Mono",monospace', fontSize:11, letterSpacing:'.32em'
        }}>BROWSE ALL XIX →</a>
      </Reveal>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   7) CYCLE TWO — CTA / email signup
   ──────────────────────────────────────────────────────────── */
function CycleTwo(){
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const submit = (e) => { e.preventDefault(); if (email) setSent(true); };
  return (
    <section id="cycle-two" style={{position:'relative', padding:'120px 22px 130px', textAlign:'center', overflow:'hidden'}}>
      {/* halo */}
      <div aria-hidden style={{
        position:'absolute', left:'50%', top:'50%', width:'min(140vw, 900px)', aspectRatio:'1/1',
        transform:'translate(-50%,-50%)',
        background:'radial-gradient(circle, rgba(214,170,90,.22) 0%, rgba(214,170,90,.06) 30%, transparent 60%)',
        animation:'haloPulse 9s ease-in-out infinite', pointerEvents:'none'
      }}/>
      <div style={{position:'relative', maxWidth: 720, margin:'0 auto'}}>
        <Reveal style={{marginBottom: 22}}>
          <Eyebrow>CYCLE  ·  II</Eyebrow>
        </Reveal>
        <Reveal delay={120} style={{
          fontFamily:'"Cormorant Garamond","EB Garamond",serif',
          fontSize:'clamp(42px, 11vw, 132px)', lineHeight:.96, letterSpacing:'-.025em',
          fontWeight:400, textWrap:'balance'
        }}>
          <span style={{display:'block', color:'rgba(236,225,196,.45)', textDecoration:'line-through', textDecorationThickness:'1px', textDecorationColor:'rgba(214,170,90,.5)'}}>she was silent.</span>
          <span style={{display:'block', fontStyle:'italic', color:'#d6aa5a', textShadow:'0 0 60px rgba(214,170,90,.4)'}}>she is returning.</span>
        </Reveal>
        <Reveal delay={300} style={{marginTop: 24}}>
          <p style={{
            fontFamily:'"EB Garamond",serif', fontStyle:'italic',
            fontSize:'clamp(17px, 4.6vw, 22px)', lineHeight:1.55,
            color:'rgba(236,225,196,.78)', textWrap:'pretty', margin:'0 auto', maxWidth: 560
          }}>
            Issue 20 opens Cycle Two. Stranger, longer, truer. <br/>
            Be the first to receive the carrier&rsquo;s next transmission.
          </p>
        </Reveal>

        <Reveal delay={450} style={{marginTop: 40}}>
          {!sent ? (
            <form onSubmit={submit} style={{
              display:'flex', flexWrap:'wrap', gap: 10, justifyContent:'center',
              maxWidth: 480, margin:'0 auto'
            }}>
              <input
                type="email" required placeholder="your email"
                value={email} onChange={e=>setEmail(e.target.value)}
                style={{
                  flex:'1 1 220px', minWidth: 0,
                  background:'rgba(12,8,5,.7)', border:'1px solid rgba(214,170,90,.4)',
                  color:'#ece1c4', padding:'15px 18px',
                  fontFamily:'"EB Garamond",serif', fontSize:17, fontStyle:'italic',
                  outline:'none'
                }}
              />
              <button type="submit" style={{
                flex:'0 0 auto', padding:'15px 24px',
                background:'#d6aa5a', color:'#0c0805', border:'none',
                fontFamily:'"JetBrains Mono",monospace', fontSize:11, fontWeight:700, letterSpacing:'.32em',
                cursor:'pointer', position:'relative', overflow:'hidden'
              }}>
                NOTIFY ME →
                <span aria-hidden style={{position:'absolute', inset:0, background:'linear-gradient(120deg, transparent 30%, rgba(255,250,225,.6) 50%, transparent 70%)', transform:'translateX(-110%)', animation:'shimmer 5s ease-in-out infinite', animationDelay:'1s'}}/>
              </button>
            </form>
          ) : (
            <div style={{
              padding:'18px 22px', border:'1px solid rgba(214,170,90,.45)',
              fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic',
              fontSize:'clamp(18px, 5vw, 22px)', color:'#d6aa5a',
              maxWidth: 480, margin:'0 auto', textShadow:'0 0 30px rgba(214,170,90,.3)'
            }}>
              ✦ &nbsp; You’re on the list. &nbsp; ✦
            </div>
          )}
        </Reveal>

        <Reveal delay={600} style={{marginTop: 22, fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(10.5px, 1vw, 13px)', letterSpacing:'.32em', color:'rgba(236,225,196,.5)'}}>
          NO SPAM &nbsp;·&nbsp; ONE TRANSMISSION PER CYCLE
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   8) WITNESSED — press marquee
   ──────────────────────────────────────────────────────────── */
function Witnessed(){
  const row = [...PRESS, ...PRESS, ...PRESS];
  return (
    <section style={{padding:'70px 0', borderTop:'1px solid rgba(214,170,90,.18)', borderBottom:'1px solid rgba(214,170,90,.18)', overflow:'hidden'}}>
      <div style={{textAlign:'center', padding:'0 22px', marginBottom: 36}}>
        <Reveal>
          <Eyebrow>✦ &nbsp; WITNESSED BY &nbsp; ✦</Eyebrow>
        </Reveal>
        <Reveal delay={140} style={{
          marginTop: 12, fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic',
          fontSize:'clamp(20px, 5vw, 26px)', color:'rgba(236,225,196,.7)'
        }}>
          The first cycle was watched by &mdash;
        </Reveal>
      </div>

      <Reveal variant="rv-fade" delay={160}>
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

/* ────────────────────────────────────────────────────────────
   9) FOOTER — minimal, ornament
   ──────────────────────────────────────────────────────────── */
function Footer(){
  return (
    <footer style={{padding:'70px 22px 50px', textAlign:'center', color:'rgba(236,225,196,.55)'}}>
      <Reveal>
        <div style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center', color:'#d6aa5a', marginBottom: 16}}>
          <span style={{width:5,height:5,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
          <span style={{width:7,height:7,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
          <span style={{width:5,height:5,background:'#d6aa5a',transform:'rotate(45deg)'}}/>
        </div>
      </Reveal>
      <Reveal delay={80} style={{fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize: 22, color:'#ece1c4', marginBottom: 12}}>
        Infinite Odyssey
      </Reveal>
      <Reveal delay={140} style={{fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(10.5px, 1vw, 13px)', letterSpacing:'.32em', marginBottom: 24}}>
        EST. 2023 &nbsp;·&nbsp; CYCLE II FROM 2026
      </Reveal>
      <Reveal delay={200} style={{display:'flex', gap: 20, justifyContent:'center', flexWrap:'wrap', fontFamily:'"JetBrains Mono",monospace', fontSize:'clamp(11px, 1vw, 13px)', letterSpacing:'.28em'}}>
        <a>ARCHIVE</a>
        <a>PRESS</a>
        <a>CONTACT</a>
        <a>NOTE FROM THE EDITORS</a>
      </Reveal>
    </footer>
  );
}

window.Reliquary = { Vigil, VerseOne, Relic, Sealing, Carrier, Archive, CycleTwo, Witnessed, Footer };
