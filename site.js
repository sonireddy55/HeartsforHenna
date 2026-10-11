/* Shared helpers: placeholders, carousels, reveal-on-scroll. */
(function(){
  const NS = "http://www.w3.org/2000/svg";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };

  function motif(){
    const s = document.createElementNS(NS, "svg"); s.setAttribute("viewBox", "0 0 100 100"); s.setAttribute("aria-hidden", "true");
    let d = "";
    for (let i = 0; i < 8; i++){
      const a = i * Math.PI / 4, cx = 50 + Math.cos(a) * 22, cy = 50 + Math.sin(a) * 22;
      d += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="11" ry="5.5" transform="rotate(${i*45} ${cx.toFixed(1)} ${cy.toFixed(1)})" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    }
    d += `<circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="50" cy="50" r="2.6" fill="currentColor"/>`;
    s.innerHTML = d; return s;
  }
  function person(){
    const s = document.createElementNS(NS, "svg"); s.setAttribute("viewBox", "0 0 100 100"); s.setAttribute("aria-hidden", "true");
    s.innerHTML = `<circle cx="50" cy="36" r="17" fill="currentColor"/><path d="M16 96c2-22 16-34 34-34s32 12 34 34z" fill="currentColor"/>`;
    return s;
  }
  function photo(src, alt, kind, label){
    const box = el("div", "ph");
    if (src){ const i = el("img"); i.src = src; i.alt = alt || ""; i.loading = "lazy"; box.append(i); }
    else { box.append(kind === "person" ? person() : motif()); if (label) box.append(el("span", "ph-label", label)); box.setAttribute("role", "img"); box.setAttribute("aria-label", alt || "Photo coming soon"); }
    return box;
  }

  /* Auto-advancing snap carousel with progress bars (one bar per reachable stop).
     Pauses while hovered, touched, focused, or held by the page (e.g. a flipped card). */
  function carousel(track, { interval = 4200, bars = null } = {}){
    const items = [...track.children]; if (!items.length) return null;
    const holds = new Set();
    let stops = [], idx = 0, timer = null, visible = true, settle = null;

    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const computeStops = () => {
      const m = maxScroll(), base = items[0].offsetLeft, s = [];
      items.forEach(it => { const p = Math.min(it.offsetLeft - base, m); if (!s.length || p - s[s.length - 1] > 4) s.push(p); });
      if (m > 4 && Math.abs(s[s.length - 1] - m) > 4) s.push(m);
      return s;
    };
    const nearest = () => { const x = track.scrollLeft; let b = 0, bd = Infinity; stops.forEach((p, i) => { const d = Math.abs(p - x); if (d < bd){ bd = d; b = i; } }); return b; };
    const running = () => !reduce && holds.size === 0 && visible && stops.length > 1;

    function buildBars(){
      if (!bars) return;
      bars.replaceChildren();
      bars.hidden = stops.length < 2;
      stops.forEach((_, i) => {
        const b = el("button"); b.type = "button"; b.setAttribute("aria-label", "Go to slide " + (i + 1));
        b.style.setProperty("--dur", interval + "ms");
        b.append(el("span", "fill"));
        b.addEventListener("click", () => go(i));
        bars.append(b);
      });
    }
    function mark(){
      if (!bars) return;
      [...bars.children].forEach((b, i) => {
        const on = i === idx;
        b.setAttribute("aria-current", on ? "true" : "false");
        b.classList.remove("on");
        if (on){ void b.offsetWidth; b.classList.add("on"); }
      });
      bars.classList.toggle("paused", !running());
    }
    function schedule(){ clearTimeout(timer); timer = null; if (running()) timer = setTimeout(() => go(idx + 1), interval); }
    function go(i){
      idx = (i + stops.length) % stops.length;
      track.scrollTo({ left: stops[idx], behavior: reduce ? "auto" : "smooth" });
      mark(); schedule();
    }
    function refresh(){ stops = computeStops(); idx = Math.min(idx, stops.length - 1); buildBars(); mark(); schedule(); }

    track.addEventListener("scroll", () => {
      clearTimeout(settle);
      settle = setTimeout(() => { const n = nearest(); if (n !== idx){ idx = n; mark(); schedule(); } }, 140);
    }, { passive: true });

    const hold = (why, on) => { const had = holds.size; on ? holds.add(why) : holds.delete(why); if ((had === 0) !== (holds.size === 0)){ mark(); schedule(); } };
    track.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") hold("hover", true); });
    track.addEventListener("pointerleave", () => hold("hover", false));
    track.addEventListener("touchstart", () => hold("touch", true), { passive: true });
    track.addEventListener("touchend", () => setTimeout(() => hold("touch", false), 2500), { passive: true });
    track.addEventListener("focusin", () => hold("focus", true));
    track.addEventListener("focusout", () => hold("focus", false));
    if ("IntersectionObserver" in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; mark(); schedule(); }, { threshold: .3 }).observe(track);
    document.addEventListener("visibilitychange", () => { visible = !document.hidden; mark(); schedule(); });
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(refresh, 200); });

    refresh();
    return { hold };
  }

  function reveal(){
    if (reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.remove("pre"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    document.querySelectorAll(".reveal").forEach(e => { if (e.getBoundingClientRect().top > innerHeight * .92){ e.classList.add("pre"); io.observe(e); } });
  }

  window.HFH = { el, photo, carousel, reveal };
})();
