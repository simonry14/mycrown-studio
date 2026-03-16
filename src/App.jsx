import { useState, useRef, useCallback, useEffect } from "react";

const SCRIPTS = [
  {
    title: "The Glow-Up Reveal",
    duration: "15–20s",
    description: "One photo, one style, one jaw-dropping before/after. Your bread-and-butter format.",
    shots: [
      { time: "0–2s", action: "Show app home screen with your uploaded photo (natural hair, no styling)", overlay: "Watch this 👀", tip: "Pause here so viewers see the 'before'" },
      { time: "2–4s", action: "Slowly scroll through the hairstyle catalog — let viewers see the options", overlay: "", tip: "Scroll slow! Viewers need to read style names" },
      { time: "4–6s", action: "Tap on a bold style (e.g. Goddess Locs) — make the tap visible", overlay: "Goddess Locs 👑", tip: "Big visual contrast from original = more impact" },
      { time: "6–8s", action: "AI generating… show loading state (or pause here and add a flash transition in CapCut)", overlay: "AI is working…", tip: "If loading is slow, cut this in editing" },
      { time: "8–12s", action: "✨ REVEAL — AI result fills the screen. HOLD for 3–4 full seconds.", overlay: "She's HER 🔥", tip: "⚡ SYNC BEAT DROP HERE in CapCut" },
      { time: "12–15s", action: "Side-by-side: scroll between original and result (or create split in CapCut)", overlay: "Before → After", tip: "This is the screenshot moment — make it clean" },
      { time: "15–18s", action: "Linger on the result, then show the app URL / logo", overlay: "MyCrown AI 👑 Link in bio", tip: "Branding watermark stays visible throughout" },
    ],
  },
  {
    title: "5 Styles, 1 Face — Which Wins?",
    duration: "25–35s",
    description: "Rapid showcase of 5 styles synced to beats. Ends with a poll CTA for comments.",
    shots: [
      { time: "0–3s", action: "App open. Your uploaded photo — natural, unstyled.", overlay: "5 styles. 1 face. Which wins? 👑", tip: "Start with the question to hook viewers" },
      { time: "3–6s", action: "Tap Style 1 → AI generates → result fills screen", overlay: "1️⃣ Box Braids", tip: "Each style = one beat in the music" },
      { time: "6–10s", action: "Back to catalog → Tap Style 2 → result", overlay: "2️⃣ Bantu Knots", tip: "Pre-generate all results before recording!" },
      { time: "10–15s", action: "Tap Style 3 → result", overlay: "3️⃣ Cornrows", tip: "Keep the rhythm consistent" },
      { time: "15–20s", action: "Tap Style 4 → result", overlay: "4️⃣ Passion Twists", tip: "" },
      { time: "20–25s", action: "Tap Style 5 → result (hold slightly longer)", overlay: "5️⃣ Afro Puff", tip: "This is the 'favourite' — give it extra time" },
      { time: "25–30s", action: "Show all 5 results (grid or rapid scroll)", overlay: "Drop the number ⬇", tip: "This CTA drives comments for algorithm boost" },
      { time: "30–35s", action: "App home / logo screen", overlay: "Try yours FREE — link in bio", tip: "" },
    ],
  },
  {
    title: "What I Asked For vs. What AI Gave Me",
    duration: "20–30s",
    description: "Expectation vs. reality — but with a positive twist. AI actually nails it.",
    shots: [
      { time: "0–3s", action: "App home screen. Let the text overlay dominate.", overlay: "I described my dream hairstyle to AI…", tip: "Mysterious energy — don't reveal yet" },
      { time: "3–7s", action: "Show your inspo image: a screenshot of the target style from Pinterest/IG", overlay: "What I wanted →", tip: "Save inspo image to phone beforehand" },
      { time: "7–10s", action: "Switch to MyCrown AI → upload your selfie → browse catalog → tap the matching style", overlay: "Let's see if AI can match this…", tip: "Show the actual app interaction" },
      { time: "10–13s", action: "AI generates. Flash/swipe transition to the result.", overlay: "", tip: "⚡ BEAT DROP syncs with the reveal" },
      { time: "13–20s", action: "Side-by-side: Pinterest inspo (left) vs AI result on your face (right)", overlay: "…okay she ATE 🔥", tip: "Create split-screen in CapCut if needed" },
      { time: "20–25s", action: "Zoom into AI result — show the hair texture and natural blending", overlay: "The accuracy is INSANE", tip: "Slow zoom = cinematic feel" },
      { time: "25–30s", action: "Back to app home / logo", overlay: "See it before you commit 👑", tip: "" },
    ],
  },
  {
    title: "Style Roulette",
    duration: "15–25s",
    description: "Fast-scroll through styles and 'randomly' stop on one. Surprise reveal format.",
    shots: [
      { time: "0–2s", action: "Show yourself in the app with your photo uploaded", overlay: "Let the app decide my next hairstyle 😳", tip: "Act nervous/excited" },
      { time: "2–8s", action: "Rapidly scroll through the style catalog — fast, like spinning a wheel", overlay: "🎰 Spinning…", tip: "Scroll FAST — the motion is the content" },
      { time: "8–10s", action: "Slow the scroll… slower… STOP on a random style", overlay: "STOP! 🛑", tip: "Time this with a beat drop or sound effect" },
      { time: "10–14s", action: "Tap the style. AI generates. Result appears.", overlay: "", tip: "Let the reveal breathe — 3–4 seconds" },
      { time: "14–18s", action: "Show the result full screen. React (text overlay shows your verdict)", overlay: "Actually… I love it?? 😍", tip: "Genuine surprise works best" },
      { time: "18–22s", action: "Show before vs after side by side", overlay: "Before → After", tip: "" },
      { time: "22–25s", action: "CTA screen", overlay: "Try your luck 🎰 MyCrown AI — link in bio", tip: "Encourage: 'What style did YOU land on?'" },
    ],
  },
  {
    title: "POV: Choosing a Style for [Event]",
    duration: "20–35s",
    description: "Relatable scenario content — choosing hair for a wedding, date, job interview, etc.",
    shots: [
      { time: "0–3s", action: "App home screen with your photo", overlay: "POV: You have a wedding in 3 days and no hairstyle 😭", tip: "Change the event each time you remake this" },
      { time: "3–8s", action: "Browse styles with purpose — you're 'shopping' for the right one", overlay: "Let me find something…", tip: "Act like you're actually deciding" },
      { time: "8–12s", action: "Tap a formal/elegant style (e.g. sleek updo or goddess locs)", overlay: "Option 1: Elegant 💎", tip: "" },
      { time: "12–16s", action: "Go back, try a bolder option (e.g. cornrows with beads)", overlay: "Option 2: Bold 🔥", tip: "" },
      { time: "16–20s", action: "Try one more — something fun (e.g. coloured braids)", overlay: "Option 3: Main Character 💜", tip: "" },
      { time: "20–25s", action: "Show all 3 results. Circle/highlight your pick.", overlay: "I'm going with… #2! 👑", tip: "Ask viewers: 'Which would YOU pick?'" },
      { time: "25–30s", action: "Zoom into the winner", overlay: "Wedding READY 💍", tip: "" },
      { time: "30–35s", action: "CTA", overlay: "Try yours — MyCrown AI — link in bio", tip: "" },
    ],
  },
  {
    title: "Hair Glow-Up Through The Decades",
    duration: "25–40s",
    description: "Try hairstyles from each decade — 70s, 80s, 90s, 2000s, 2020s. Educational + fun.",
    shots: [
      { time: "0–3s", action: "App home screen with your photo uploaded", overlay: "Black hair through the decades 👑", tip: "Use a retro/throwback sound" },
      { time: "3–8s", action: "Pick a 70s-inspired style (e.g. big afro). Show the AI result.", overlay: "1970s ✌️ The Afro Era", tip: "Hold each decade for ~5 seconds" },
      { time: "8–13s", action: "Pick an 80s style (e.g. jheri curl or asymmetric cut). Show result.", overlay: "1980s 🎤 Bold & Iconic", tip: "" },
      { time: "13–18s", action: "Pick a 90s style (e.g. box braids, flat twists). Show result.", overlay: "1990s 💿 The Braid Renaissance", tip: "" },
      { time: "18–23s", action: "Pick a 2000s style (e.g. silk press, micro braids). Show result.", overlay: "2000s 📱 Sleek & Versatile", tip: "" },
      { time: "23–28s", action: "Pick a current 2020s style (e.g. knotless braids, locs). Show result.", overlay: "2020s 👑 The Natural Crown", tip: "This is the 'winner' — hold longest" },
      { time: "28–35s", action: "Rapid montage of all 5 results (scroll through them quickly)", overlay: "Which era is YOUR vibe?", tip: "Ask viewers to comment their decade" },
      { time: "35–40s", action: "CTA", overlay: "Try every era — MyCrown AI", tip: "" },
    ],
  },
  {
    title: "The 'Show Your Stylist' Tutorial",
    duration: "20–30s",
    description: "Practical how-to: use MyCrown AI to find your style, then show it to your hairdresser.",
    shots: [
      { time: "0–3s", action: "Start with a relatable text screen or your face in the app", overlay: "How to never get a bad haircut again ✂️", tip: "This is your evergreen/SEO video" },
      { time: "3–6s", action: "Upload your selfie into the app — show the full flow", overlay: "Step 1: Upload your photo", tip: "Show the actual upload process" },
      { time: "6–10s", action: "Browse the style catalog, try a few options", overlay: "Step 2: Try styles on YOUR face", tip: "Show 2–3 quick tries" },
      { time: "10–15s", action: "Pick your favourite — show the AI result full screen", overlay: "Step 3: Find THE ONE 👑", tip: "Let the result breathe" },
      { time: "15–20s", action: "Screenshot the result (show yourself pressing the screenshot button)", overlay: "Step 4: Screenshot it", tip: "Show the actual screenshot action!" },
      { time: "20–25s", action: "Show a mock text/WhatsApp message sending the screenshot to 'My Stylist 💇‍♀️'", overlay: "Step 5: Send to your stylist 📲", tip: "Create a fake text convo in CapCut or just show the share action" },
      { time: "25–30s", action: "Final result + CTA", overlay: "No more bad haircuts 💅 MyCrown AI — link in bio", tip: "" },
    ],
  },
  {
    title: "This Style or That Style?",
    duration: "15–25s",
    description: "Two contrasting styles side by side. A/B comparison that drives engagement.",
    shots: [
      { time: "0–2s", action: "App open, photo uploaded", overlay: "This or That? 👑", tip: "Works great as a repeatable series" },
      { time: "2–6s", action: "Try Style A (e.g. knotless braids). Hold the result.", overlay: "A: Knotless Braids 🤍", tip: "" },
      { time: "6–10s", action: "Try Style B (e.g. butterfly locs). Hold the result.", overlay: "B: Butterfly Locs 🦋", tip: "" },
      { time: "10–15s", action: "Show both results alternating back and forth (or split screen in CapCut)", overlay: "A or B? Comment below ⬇", tip: "Quick back-and-forth creates visual energy" },
      { time: "15–20s", action: "Pick your own winner — react", overlay: "I'm team B 🦋 but you tell me!", tip: "Having an opinion drives more comments" },
      { time: "20–25s", action: "CTA", overlay: "Try both — MyCrown AI — link in bio", tip: "" },
    ],
  },
];

const OVERLAY_POSITIONS = ["top-center", "center", "bottom-center", "top-left", "top-right", "bottom-left", "bottom-right"];
const OVERLAY_STYLES_LIST = ["bold", "subtle", "outline", "glow", "box"];
const PIP_POS_LIST = ["bottom-right", "bottom-left", "top-right", "top-left"];
const PIP_SHAPE_LIST = ["circle", "rounded", "square"];
const COLORS = ["#ffffff", "#d4a017", "#ff4444", "#44ff44", "#4488ff", "#ff44ff", "#000000"];

let overlayIdCounter = 0;
function makeOverlay(text = "Your text here", pos = "bottom-center", style = "bold", size = 28) {
  return { id: ++overlayIdCounter, text, position: pos, style, color: "#ffffff", size, visible: true };
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

export default function App() {
  const [view, setView] = useState("setup"); // setup | studio
  const [appUrl, setAppUrl] = useState("mycrown.ai");
  const [brandText, setBrandText] = useState("MyCrown AI 👑");
  const [showBrand, setShowBrand] = useState(true);
  const [brandPos, setBrandPos] = useState("top-right");

  const [mode, setMode] = useState("idle");
  const [elapsed, setElapsed] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [screenStream, setScreenStream] = useState(null);
  const [camStream, setCamStream] = useState(null);
  const [showCam, setShowCam] = useState(false);
  const [pipPos, setPipPos] = useState("bottom-right");
  const [pipShape, setPipShape] = useState("circle");
  const [pipSize, setPipSize] = useState(120);
  const [overlays, setOverlays] = useState([]);
  const [activeTab, setActiveTab] = useState("script");
  const [selectedScript, setSelectedScript] = useState(0);
  const [currentShot, setCurrentShot] = useState(0);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [audioOpt, setAudioOpt] = useState("none");
  const [sidePanel, setSidePanel] = useState(true);

  const screenRef = useRef(null);
  const camRef = useRef(null);
  const canvasRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const animRef = useRef(null);
  const overlaysRef = useRef(overlays);
  const brandRef = useRef({ showBrand, brandText, brandPos, appUrl });

  useEffect(() => { overlaysRef.current = overlays; }, [overlays]);
  useEffect(() => { brandRef.current = { showBrand, brandText, brandPos, appUrl }; }, [showBrand, brandText, brandPos, appUrl]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = "#111"; ctx.fillRect(0, 0, w, h);

    if (screenRef.current?.srcObject) { try { ctx.drawImage(screenRef.current, 0, 0, w, h); } catch(e){} }

    if (showCam && camRef.current?.srcObject) {
      const pw = pipSize * 2, ph = pipSize * 2, m = 20;
      let px, py;
      if (pipPos === "bottom-right") { px = w - pw - m; py = h - ph - m; }
      else if (pipPos === "bottom-left") { px = m; py = h - ph - m; }
      else if (pipPos === "top-right") { px = w - pw - m; py = m; }
      else { px = m; py = m; }
      ctx.save();
      if (pipShape === "circle") { ctx.beginPath(); ctx.arc(px+pw/2, py+ph/2, pw/2, 0, Math.PI*2); ctx.clip(); }
      else if (pipShape === "rounded") { roundRect(ctx, px, py, pw, ph, 24); ctx.clip(); }
      ctx.drawImage(camRef.current, px, py, pw, ph);
      ctx.restore();
      ctx.save(); ctx.strokeStyle = "#d4a017"; ctx.lineWidth = 3;
      if (pipShape === "circle") { ctx.beginPath(); ctx.arc(px+pw/2, py+ph/2, pw/2, 0, Math.PI*2); ctx.stroke(); }
      else { if (pipShape === "rounded") roundRect(ctx, px, py, pw, ph, 24); else ctx.rect(px, py, pw, ph); ctx.stroke(); }
      ctx.restore();
    }

    // Draw text overlays
    const drawText = (text, position, style, color, size) => {
      if (!text) return;
      ctx.save();
      const fs = size * 2;
      ctx.font = `${style==="subtle"?500:800} ${fs}px "Segoe UI", sans-serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = color;
      let tx = w/2, ty = h/2;
      if (position.includes("top")) ty = h * 0.08;
      if (position.includes("bottom")) ty = h * 0.9;
      if (position.includes("left") && !position.includes("center")) { tx = w*0.15; ctx.textAlign = "left"; }
      if (position.includes("right") && !position.includes("center")) { tx = w*0.85; ctx.textAlign = "right"; }
      if (style === "glow") { ctx.shadowColor = "rgba(212,160,23,0.8)"; ctx.shadowBlur = 24; }
      if (style === "box") {
        const met = ctx.measureText(text);
        const bw = met.width + 40, bh = fs + 24;
        let bx = tx - bw/2;
        if (ctx.textAlign === "left") bx = tx - 16;
        if (ctx.textAlign === "right") bx = tx - bw + 16;
        ctx.fillStyle = "rgba(0,0,0,0.65)"; roundRect(ctx, bx, ty-bh/2, bw, bh, 14); ctx.fill(); ctx.fillStyle = color;
      }
      if (style === "outline") { ctx.strokeStyle = "rgba(0,0,0,0.85)"; ctx.lineWidth = 4; ctx.lineJoin = "round"; ctx.strokeText(text, tx, ty); }
      ctx.fillText(text, tx, ty);
      ctx.restore();
    };

    overlaysRef.current.forEach(ov => { if (ov.visible) drawText(ov.text, ov.position, ov.style, ov.color, ov.size); });

    // Branding watermark
    const br = brandRef.current;
    if (br.showBrand) {
      ctx.save();
      const bfs = 22;
      ctx.font = `700 ${bfs}px "Segoe UI", sans-serif`;
      ctx.fillStyle = "rgba(212,160,23,0.85)";
      const urlText = br.appUrl;
      const label = br.brandText;
      let bx, by;
      if (br.brandPos.includes("top")) by = 44;
      else by = h - 28;
      if (br.brandPos.includes("right")) { bx = w - 24; ctx.textAlign = "right"; }
      else { bx = 24; ctx.textAlign = "left"; }
      ctx.textBaseline = "middle";
      // background pill
      const full = `${label}  •  ${urlText}`;
      const met = ctx.measureText(full);
      const pw2 = met.width + 28, ph2 = bfs + 18;
      let pillX = ctx.textAlign === "right" ? bx - pw2 + 12 : bx - 12;
      ctx.fillStyle = "rgba(0,0,0,0.55)"; roundRect(ctx, pillX, by - ph2/2, pw2, ph2, ph2/2); ctx.fill();
      ctx.fillStyle = "#d4a017"; ctx.fillText(label, ctx.textAlign === "right" ? bx - met.width + ctx.measureText(label).width : bx + 2, by);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      if (ctx.textAlign === "right") ctx.fillText(`  •  ${urlText}`, bx, by);
      else {
        const lw = ctx.measureText(label).width;
        ctx.fillText(`  •  ${urlText}`, bx + lw + 2, by);
      }
      ctx.restore();
    }

    animRef.current = requestAnimationFrame(drawFrame);
  }, [showCam, pipPos, pipShape, pipSize]);

  async function startScreen() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30 } },
        audio: audioOpt === "system" || audioOpt === "both",
      });
      setScreenStream(stream);
      if (screenRef.current) { screenRef.current.srcObject = stream; screenRef.current.play(); }
      stream.getVideoTracks()[0].onended = () => stopAll();
      const canvas = canvasRef.current;
      const s = stream.getVideoTracks()[0].getSettings();
      canvas.width = s.width || 1920; canvas.height = s.height || 1080;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(drawFrame);
      return stream;
    } catch(e) { return null; }
  }

  async function startCam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width:{ideal:640}, height:{ideal:640}, facingMode:"user" },
        audio: audioOpt === "mic" || audioOpt === "both",
      });
      setCamStream(stream); setShowCam(true);
      if (camRef.current) { camRef.current.srcObject = stream; camRef.current.play(); }
      return stream;
    } catch(e) { return null; }
  }

  function stopAll() {
    if (recorderRef.current?.state !== "inactive") try { recorderRef.current?.stop(); } catch(e) {}
    if (timerRef.current) clearInterval(timerRef.current);
    screenStream?.getTracks().forEach(t => t.stop());
    camStream?.getTracks().forEach(t => t.stop());
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setScreenStream(null); setCamStream(null); setShowCam(false); setMode("idle"); setElapsed(0);
  }

  async function handleRecord() {
    if (mode !== "idle" && mode !== "done") return;
    setRecordedUrl(null); setRecordedBlob(null); chunksRef.current = [];
    const screen = await startScreen();
    if (!screen) return;
    setMode("countdown");
    for (let i = 3; i > 0; i--) { setCountdown(i); await new Promise(r => setTimeout(r, 1000)); }
    setCountdown(0);
    const canvas = canvasRef.current;
    const cs = canvas.captureStream(30);
    const ac = new AudioContext(); const dest = ac.createMediaStreamDestination();
    if (screen.getAudioTracks().length) { ac.createMediaStreamSource(new MediaStream(screen.getAudioTracks())).connect(dest); }
    if (camStream?.getAudioTracks().length) { ac.createMediaStreamSource(new MediaStream(camStream.getAudioTracks())).connect(dest); }
    const combined = new MediaStream([...cs.getVideoTracks(), ...dest.stream.getAudioTracks()]);
    const rec = new MediaRecorder(combined, {
      mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm",
      videoBitsPerSecond: 8000000,
    });
    recorderRef.current = rec;
    rec.ondataavailable = e => { if (e.data.size) chunksRef.current.push(e.data); };
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordedBlob(blob); setRecordedUrl(URL.createObjectURL(blob)); setMode("done");
    };
    rec.start(100); setMode("recording"); setElapsed(0); setCurrentShot(0);
    const st = Date.now();
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now()-st)/1000)), 200);
  }

  function handlePause() { recorderRef.current?.pause(); clearInterval(timerRef.current); setMode("paused"); }
  function handleResume() {
    recorderRef.current?.resume();
    const rt = Date.now() - elapsed * 1000;
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now()-rt)/1000)), 200);
    setMode("recording");
  }
  function handleStop() {
    if (recorderRef.current?.state !== "inactive") recorderRef.current.stop();
    clearInterval(timerRef.current);
    screenStream?.getTracks().forEach(t => t.stop()); camStream?.getTracks().forEach(t => t.stop());
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setScreenStream(null); setCamStream(null); setShowCam(false);
  }
  function downloadRec() {
    if (!recordedBlob) return;
    const a = document.createElement("a"); a.href = URL.createObjectURL(recordedBlob);
    a.download = `mycrown_${SCRIPTS[selectedScript].title.replace(/\s+/g,"_")}_${Date.now()}.webm`; a.click();
  }

  function addOverlay() { setOverlays(p => [...p, makeOverlay("New text")]); }
  function updateOv(id, f, v) { setOverlays(p => p.map(o => o.id===id ? {...o,[f]:v} : o)); }
  function removeOv(id) { setOverlays(p => p.filter(o => o.id !== id)); }
  function applyShot(shot) {
    if (!shot.overlay) return;
    if (overlays.length > 0) { updateOv(overlays[0].id, "text", shot.overlay); updateOv(overlays[0].id, "visible", true); }
    else setOverlays([makeOverlay(shot.overlay)]);
  }
  function nextShot() {
    const max = SCRIPTS[selectedScript].shots.length - 1;
    const n = Math.min(max, currentShot + 1); setCurrentShot(n);
    applyShot(SCRIPTS[selectedScript].shots[n]);
  }
  function prevShot() { setCurrentShot(Math.max(0, currentShot - 1)); }

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const isActive = mode === "recording" || mode === "paused" || mode === "countdown";

  const B = (bg, fg, extra={}) => ({
    background:bg, color:fg, border:"none", borderRadius:"8px", padding:"8px 14px",
    fontSize:"13px", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center",
    gap:"6px", transition:"all .12s", flexShrink:0, ...extra,
  });
  const inp = { background:"#1e1a16", border:"1px solid #3a3530", borderRadius:"6px",
    padding:"8px 10px", color:"#e8e0d4", fontSize:"13px", fontFamily:"inherit",
    width:"100%", boxSizing:"border-box", outline:"none" };
  const sel = { ...inp, cursor:"pointer" };
  const lbl = { fontSize:"10px", fontWeight:700, color:"#8a7d6b", textTransform:"uppercase",
    letterSpacing:".08em", marginBottom:"4px", display:"block" };

  // ═══════════════════════════════════════════════
  //  SETUP VIEW
  // ═══════════════════════════════════════════════
  if (view === "setup") return (
    <div style={{
      minHeight:"100vh", background:"linear-gradient(180deg,#0e0c0a 0%,#1a1610 100%)",
      color:"#e8e0d4", fontFamily:"'Segoe UI',system-ui,sans-serif",
      display:"flex", alignItems:"center", justifyContent:"center", padding:"24px",
      overflowY:"auto",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ maxWidth:"560px", width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:"36px" }}>
          <div style={{ fontSize:"48px", marginBottom:"8px" }}>👑</div>
          <h1 style={{ margin:0, fontSize:"32px", fontWeight:900, color:"#d4a017", letterSpacing:"-0.03em" }}>MyCrown Studio</h1>
          <p style={{ margin:"8px 0 0", color:"#8a7d6b", fontSize:"14px" }}>Screen Recording Suite for App Promo Videos</p>
        </div>

        {/* Workflow steps */}
        <div style={{ background:"#161310", borderRadius:"14px", border:"1px solid #2a2520", padding:"20px", marginBottom:"20px" }}>
          <div style={{ ...lbl, fontSize:"11px", color:"#d4a017", marginBottom:"12px" }}>HOW IT WORKS</div>
          {[
            ["1️⃣", "Open mycrown.ai in another browser tab", "This is the app you'll be screen-recording"],
            ["2️⃣", "Upload your photo and pre-generate a few AI results", "Do a dry run — cache the results so they load instantly on camera"],
            ["3️⃣", "Come back here and hit Record", "Choose to share the MyCrown AI browser tab"],
            ["4️⃣", "Follow the teleprompter as you interact with the app", "Tap through shots — overlays and branding auto-composite into video"],
            ["5️⃣", "Stop recording → Download .webm → Import into CapCut", "Add trending sounds, transitions, captions, and export for TikTok/Reels"],
          ].map(([icon, title, desc], i) => (
            <div key={i} style={{ display:"flex", gap:"12px", padding:"10px 0",
              borderBottom: i < 4 ? "1px solid #2a2520" : "none" }}>
              <span style={{ fontSize:"18px", flexShrink:0 }}>{icon}</span>
              <div>
                <div style={{ fontSize:"13px", fontWeight:700, color:"#e8e0d4" }}>{title}</div>
                <div style={{ fontSize:"12px", color:"#6a6560", marginTop:"2px" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Branding config */}
        <div style={{ background:"#161310", borderRadius:"14px", border:"1px solid #2a2520", padding:"20px", marginBottom:"20px" }}>
          <div style={{ ...lbl, fontSize:"11px", color:"#d4a017", marginBottom:"12px" }}>BRANDING SETUP</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
            <div>
              <span style={lbl}>App URL (shown in watermark)</span>
              <input value={appUrl} onChange={e=>setAppUrl(e.target.value)} style={inp} placeholder="mycrown.ai" />
            </div>
            <div>
              <span style={lbl}>Brand Label</span>
              <input value={brandText} onChange={e=>setBrandText(e.target.value)} style={inp} placeholder="MyCrown AI 👑" />
            </div>
            <div>
              <span style={lbl}>Watermark Position</span>
              <select value={brandPos} onChange={e=>setBrandPos(e.target.value)} style={sel}>
                {OVERLAY_POSITIONS.map(p=><option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <span style={lbl}>Audio</span>
              <select value={audioOpt} onChange={e=>setAudioOpt(e.target.value)} style={sel}>
                <option value="none">No Audio (add in CapCut)</option>
                <option value="system">System Audio</option>
                <option value="mic">Microphone</option>
                <option value="both">System + Mic</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop:"12px", display:"flex", alignItems:"center", gap:"8px" }}>
            <input type="checkbox" checked={showBrand} onChange={e=>setShowBrand(e.target.checked)} style={{ accentColor:"#d4a017" }} />
            <span style={{ fontSize:"13px", color:"#c8c0b4" }}>Show brand watermark on all recordings</span>
          </div>

          {/* Watermark Preview */}
          <div style={{
            marginTop:"14px", background:"#0a0908", borderRadius:"10px", border:"1px solid #2a2520",
            padding:"24px 16px", position:"relative", height:"80px", overflow:"hidden",
          }}>
            {showBrand && (
              <div style={{
                position:"absolute",
                ...(brandPos.includes("top") ? { top:"10px" } : { bottom:"10px" }),
                ...(brandPos.includes("right") ? { right:"12px" } : { left:"12px" }),
                background:"rgba(0,0,0,0.55)", borderRadius:"20px", padding:"6px 14px",
                display:"flex", alignItems:"center", gap:"6px",
              }}>
                <span style={{ color:"#d4a017", fontSize:"12px", fontWeight:700 }}>{brandText}</span>
                <span style={{ color:"#888", fontSize:"12px" }}>•</span>
                <span style={{ color:"rgba(255,255,255,0.8)", fontSize:"12px" }}>{appUrl}</span>
              </div>
            )}
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
              color:"#3a3530", fontSize:"11px", fontFamily:"monospace" }}>watermark preview</div>
          </div>
        </div>

        <button onClick={() => setView("studio")} style={{
          ...B("#d4a017", "#1a1610"),
          width:"100%", justifyContent:"center", padding:"14px", fontSize:"16px", borderRadius:"12px",
        }}>
          Open Recording Studio →
        </button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════
  //  STUDIO VIEW
  // ═══════════════════════════════════════════════
  return (
    <div style={{ minHeight:"100vh", background:"#0e0c0a", color:"#e8e0d4",
      fontFamily:"'Segoe UI',system-ui,sans-serif", display:"flex", flexDirection:"column" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background:"linear-gradient(135deg,#1a1610,#2a2520)", borderBottom:"2px solid #2a2520",
        padding:"8px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <button onClick={()=>setView("setup")} style={B("transparent","#8a7d6b",{padding:"6px 10px",fontSize:"12px"})}>← Setup</button>
          <span style={{ fontSize:"16px" }}>👑</span>
          <span style={{ fontWeight:800, color:"#d4a017", fontSize:"15px" }}>MyCrown Studio</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          {(mode==="recording"||mode==="paused") && (
            <div style={{ display:"flex", alignItems:"center", gap:"6px",
              background: mode==="recording"?"rgba(220,40,40,0.15)":"rgba(212,160,23,0.15)",
              padding:"5px 12px", borderRadius:"8px" }}>
              {mode==="recording" && <div style={{ width:"8px",height:"8px",borderRadius:"50%",background:"#dc2828",animation:"pulse 1s infinite" }} />}
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"14px", fontWeight:700,
                color: mode==="recording"?"#dc2828":"#d4a017" }}>{fmt(elapsed)}</span>
            </div>
          )}
          <button onClick={()=>setSidePanel(p=>!p)} style={B("#2a2520","#8a7d6b",{padding:"6px 10px",fontSize:"11px"})}>
            {sidePanel?"◀ Panel":"▶ Panel"}
          </button>
        </div>
      </div>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        {/* Sidebar */}
        <div style={{
          width: sidePanel?"310px":"0px", minWidth: sidePanel?"310px":"0px",
          background:"#161310", borderRight:"1px solid #2a2520", display:"flex",
          flexDirection:"column", overflow:"hidden", transition:"all .25s",
        }}>
          <div style={{ display:"flex", gap:"3px", padding:"8px 8px 0", flexShrink:0 }}>
            {[["script","📋 Script"],["overlays","✏️ Overlays"],["cam","🎥 Camera"]].map(([k,l])=>(
              <button key={k} onClick={()=>setActiveTab(k)} style={{
                ...B(activeTab===k?"#d4a017":"transparent", activeTab===k?"#1a1610":"#8a7d6b"),
                borderRadius:"6px", padding:"6px 0", fontSize:"11px", flex:1, justifyContent:"center",
              }}>{l}</button>
            ))}
          </div>

          <div style={{ flex:1, overflowY:"auto", padding:"10px" }}>
            {/* SCRIPT TAB */}
            {activeTab === "script" && (
              <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                <span style={lbl}>Select Video Script</span>
                {SCRIPTS.map((s,i) => (
                  <button key={i} onClick={()=>{setSelectedScript(i);setCurrentShot(0);}}
                    style={{
                      ...B(selectedScript===i?"#d4a017":"#1e1a16", selectedScript===i?"#1a1610":"#c8c0b4"),
                      flexDirection:"column", alignItems:"flex-start", width:"100%", padding:"10px 12px",
                      border: selectedScript===i?"none":"1px solid #2a2520", gap:"2px",
                    }}>
                    <div style={{ display:"flex", justifyContent:"space-between", width:"100%", alignItems:"center" }}>
                      <span style={{ fontSize:"12px", fontWeight:700 }}>{s.title}</span>
                      <span style={{ fontSize:"10px", opacity:.7, fontFamily:"'JetBrains Mono',monospace" }}>{s.duration}</span>
                    </div>
                    <span style={{ fontSize:"10px", fontWeight:400, opacity:.65, textAlign:"left" }}>{s.description}</span>
                  </button>
                ))}

                <div style={{ borderTop:"1px solid #2a2520", paddingTop:"8px", marginTop:"4px" }}>
                  <span style={{ ...lbl, marginBottom:"8px", display:"block" }}>
                    SHOT {currentShot+1} of {SCRIPTS[selectedScript].shots.length} — tap to load overlay
                  </span>
                  <div style={{ maxHeight:"340px", overflowY:"auto" }}>
                    {SCRIPTS[selectedScript].shots.map((shot,i) => (
                      <div key={i} onClick={()=>{setCurrentShot(i); if(shot.overlay) applyShot(shot);}}
                        style={{
                          background: currentShot===i?"rgba(212,160,23,0.1)":"transparent",
                          borderLeft: currentShot===i?"3px solid #d4a017":"3px solid transparent",
                          padding:"8px 10px", borderRadius:"0 6px 6px 0", cursor:"pointer", marginBottom:"3px",
                        }}>
                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"10px", fontWeight:700,
                          color: currentShot===i?"#d4a017":"#6a6560" }}>{shot.time}</div>
                        <div style={{ fontSize:"12px", color:"#c8c0b4", lineHeight:1.4, marginTop:"2px" }}>{shot.action}</div>
                        {shot.overlay && <div style={{ fontSize:"10px", color:"#d4a017", marginTop:"3px", fontStyle:"italic" }}>→ {shot.overlay}</div>}
                        {shot.tip && <div style={{ fontSize:"10px", color:"#6a6560", marginTop:"2px" }}>💡 {shot.tip}</div>}
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:"4px", marginTop:"8px" }}>
                    <button onClick={prevShot} style={B("#2a2520","#e8e0d4",{flex:1,justifyContent:"center",fontSize:"11px"})}>◀ Prev</button>
                    <button onClick={nextShot} style={B("#2a2520","#e8e0d4",{flex:1,justifyContent:"center",fontSize:"11px"})}>Next ▶</button>
                  </div>
                </div>
              </div>
            )}

            {/* OVERLAYS TAB */}
            {activeTab === "overlays" && (
              <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                {overlays.map((ov,idx) => (
                  <div key={ov.id} style={{ background:"#1e1a16", borderRadius:"10px", padding:"10px", border:"1px solid #2a2520" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                      <span style={{ fontSize:"10px", fontWeight:700, color:"#d4a017" }}>OVERLAY {idx+1}</span>
                      <div style={{ display:"flex", gap:"4px" }}>
                        <button onClick={()=>updateOv(ov.id,"visible",!ov.visible)} style={B("transparent",ov.visible?"#d4a017":"#5a5550",{padding:"2px 6px",fontSize:"12px"})}>{ov.visible?"👁":"👁‍🗨"}</button>
                        <button onClick={()=>removeOv(ov.id)} style={B("transparent","#dc2828",{padding:"2px 6px",fontSize:"11px"})}>✕</button>
                      </div>
                    </div>
                    <input value={ov.text} onChange={e=>updateOv(ov.id,"text",e.target.value)}
                      style={{ ...inp, marginBottom:"6px", fontWeight:600 }} />
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px" }}>
                      <div><span style={lbl}>Position</span>
                        <select value={ov.position} onChange={e=>updateOv(ov.id,"position",e.target.value)} style={sel}>
                          {OVERLAY_POSITIONS.map(p=><option key={p} value={p}>{p}</option>)}
                        </select></div>
                      <div><span style={lbl}>Style</span>
                        <select value={ov.style} onChange={e=>updateOv(ov.id,"style",e.target.value)} style={sel}>
                          {OVERLAY_STYLES_LIST.map(s=><option key={s} value={s}>{s}</option>)}
                        </select></div>
                      <div><span style={lbl}>Color</span>
                        <div style={{ display:"flex", gap:"3px" }}>
                          {COLORS.map(c=><div key={c} onClick={()=>updateOv(ov.id,"color",c)} style={{
                            width:"22px",height:"22px",borderRadius:"5px",background:c,cursor:"pointer",
                            border: ov.color===c?"2px solid #d4a017":"2px solid #333",
                          }} />)}
                        </div></div>
                      <div><span style={lbl}>Size: {ov.size}</span>
                        <input type="range" min="14" max="64" value={ov.size} onChange={e=>updateOv(ov.id,"size",+e.target.value)}
                          style={{ width:"100%", accentColor:"#d4a017" }} /></div>
                    </div>
                  </div>
                ))}
                <button onClick={addOverlay} style={B("#2a2520","#d4a017",{justifyContent:"center",width:"100%"})}>+ Add Overlay</button>
              </div>
            )}

            {/* CAMERA TAB */}
            {activeTab === "cam" && (
              <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                <button onClick={async()=>{
                  if(showCam){camStream?.getTracks().forEach(t=>t.stop());setCamStream(null);setShowCam(false);}
                  else await startCam();
                }} style={B(showCam?"#d4a017":"#2a2520",showCam?"#1a1610":"#e8e0d4",{width:"100%",justifyContent:"center"})}>
                  {showCam?"🎥 Webcam ON — Disable":"🎥 Enable Webcam PiP"}
                </button>
                {showCam && <>
                  <div><span style={lbl}>PiP Position</span>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3px" }}>
                      {PIP_POS_LIST.map(k=><button key={k} onClick={()=>setPipPos(k)}
                        style={B(pipPos===k?"#d4a017":"#1e1a16",pipPos===k?"#1a1610":"#8a7d6b",{justifyContent:"center",fontSize:"11px"})}>{k}</button>)}
                    </div></div>
                  <div><span style={lbl}>Shape</span>
                    <div style={{ display:"flex", gap:"3px" }}>
                      {PIP_SHAPE_LIST.map(k=><button key={k} onClick={()=>setPipShape(k)}
                        style={B(pipShape===k?"#d4a017":"#1e1a16",pipShape===k?"#1a1610":"#8a7d6b",{flex:1,justifyContent:"center",fontSize:"11px"})}>{k}</button>)}
                    </div></div>
                  <div><span style={lbl}>Size: {pipSize}px</span>
                    <input type="range" min="60" max="200" value={pipSize} onChange={e=>setPipSize(+e.target.value)}
                      style={{ width:"100%", accentColor:"#d4a017" }} /></div>
                </>}
                <div style={{ borderTop:"1px solid #2a2520", paddingTop:"12px" }}>
                  <span style={lbl}>Branding Watermark</span>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginTop:"6px" }}>
                    <input type="checkbox" checked={showBrand} onChange={e=>setShowBrand(e.target.checked)} style={{ accentColor:"#d4a017" }} />
                    <span style={{ fontSize:"12px" }}>Show "{brandText} • {appUrl}" watermark</span>
                  </div>
                  <div style={{ marginTop:"8px" }}>
                    <span style={lbl}>Watermark Position</span>
                    <select value={brandPos} onChange={e=>setBrandPos(e.target.value)} style={sel}>
                      {OVERLAY_POSITIONS.map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", background:"#0a0908", overflow:"hidden" }}>
            <video ref={screenRef} style={{ display:"none" }} muted playsInline />
            <video ref={camRef} style={{ display:"none" }} muted playsInline />
            <canvas ref={canvasRef} width={1920} height={1080} style={{
              maxWidth:"100%", maxHeight:"100%", borderRadius:"4px",
              boxShadow: mode==="recording"?"0 0 0 3px #dc2828":"0 0 0 1px #2a2520",
            }} />

            {mode==="countdown" && countdown>0 && (
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,.7)", zIndex:10 }}>
                <div style={{ fontSize:"120px", fontWeight:900, color:"#d4a017",
                  fontFamily:"'JetBrains Mono',monospace", textShadow:"0 0 40px rgba(212,160,23,.5)" }}>{countdown}</div>
              </div>
            )}

            {mode==="idle" && !screenStream && (
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center",
                justifyContent:"center", gap:"12px", background:"linear-gradient(180deg,#0e0c0a,#1a1610)" }}>
                <div style={{ fontSize:"48px" }}>👑</div>
                <div style={{ fontSize:"20px", fontWeight:800, color:"#d4a017" }}>Ready to Record</div>
                <div style={{ fontSize:"13px", color:"#6a6560", textAlign:"center", maxWidth:"380px", lineHeight:1.6 }}>
                  Open <b style={{color:"#d4a017"}}>{appUrl}</b> in another tab first.<br/>
                  Hit Record → share that tab → follow the script.
                </div>
              </div>
            )}

            {mode==="done" && recordedUrl && (
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center",
                justifyContent:"center", gap:"14px", background:"rgba(0,0,0,.88)", zIndex:10 }}>
                <div style={{ fontSize:"40px" }}>✅</div>
                <div style={{ fontSize:"16px", fontWeight:700, color:"#d4a017" }}>Recording Complete — {fmt(elapsed)}</div>
                <video src={recordedUrl} controls style={{ maxWidth:"75%", maxHeight:"45%", borderRadius:"10px", border:"2px solid #2a2520" }} />
                <div style={{ display:"flex", gap:"8px" }}>
                  <button onClick={downloadRec} style={B("#d4a017","#1a1610",{padding:"10px 20px",fontSize:"14px"})}>⬇ Download .webm</button>
                  <button onClick={()=>{setMode("idle");setRecordedUrl(null);}} style={B("#2a2520","#e8e0d4",{padding:"10px 20px",fontSize:"14px"})}>🔄 New Recording</button>
                </div>
                <p style={{ fontSize:"12px", color:"#6a6560", maxWidth:"360px", textAlign:"center", lineHeight:1.5 }}>
                  Import the .webm into CapCut → add trending sound → auto-captions → export 1080×1920 → upload to TikTok/Reels
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{
            background:"#161310", borderTop:"1px solid #2a2520", padding:"10px 16px",
            display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", flexShrink:0, flexWrap:"wrap",
          }}>
            {(mode==="idle"||mode==="done") ? (
              <button onClick={handleRecord} style={B("#dc2828","#fff",{padding:"11px 24px",fontSize:"14px",borderRadius:"10px"})}>
                <div style={{ width:"12px",height:"12px",borderRadius:"50%",background:"#fff" }} /> Record
              </button>
            ) : <>
              {mode==="recording" && <button onClick={handlePause} style={B("#d4a017","#1a1610",{padding:"9px 16px"})}>⏸ Pause</button>}
              {mode==="paused" && <button onClick={handleResume} style={B("#22c55e","#fff",{padding:"9px 16px"})}>▶ Resume</button>}
              {(mode==="recording"||mode==="paused") && <button onClick={handleStop} style={B("#dc2828","#fff",{padding:"9px 16px"})}>⏹ Stop</button>}
            </>}

            {/* Shot stepper (visible during recording) */}
            {isActive && (
              <div style={{ display:"flex", alignItems:"center", gap:"6px", marginLeft:"12px",
                background:"#1e1a16", borderRadius:"8px", padding:"4px 8px" }}>
                <button onClick={prevShot} style={B("transparent","#8a7d6b",{padding:"4px 8px",fontSize:"11px"})}>◀</button>
                <span style={{ fontSize:"11px", fontFamily:"'JetBrains Mono',monospace", color:"#d4a017" }}>
                  Shot {currentShot+1}/{SCRIPTS[selectedScript].shots.length}
                </span>
                <button onClick={nextShot} style={B("transparent","#8a7d6b",{padding:"4px 8px",fontSize:"11px"})}>▶</button>
              </div>
            )}

            {isActive && overlays.length > 0 && (
              <div style={{ display:"flex", gap:"4px", marginLeft:"8px" }}>
                {overlays.map((ov,i) => (
                  <button key={ov.id} onClick={()=>updateOv(ov.id,"visible",!ov.visible)}
                    style={B(ov.visible?"#d4a017":"#2a2520",ov.visible?"#1a1610":"#6a6560",{padding:"5px 8px",fontSize:"10px"})}>
                    {i+1}:{ov.visible?"ON":"OFF"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#161310} ::-webkit-scrollbar-thumb{background:#3a3530;border-radius:3px}
        select option{background:#1e1a16;color:#e8e0d4}
      `}</style>
    </div>
  );
}
