import { el, carousel, reveal } from "./hfh.js";

const $ = (s) => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// menu overlay
const menu = $("#menu"), openBtn = $("#menu-open"), closeBtn = $("#menu-close");
const setMenu = (on) => {
  menu.classList.toggle("open", on);
  menu.setAttribute("aria-hidden", on ? "false" : "true");
  openBtn.setAttribute("aria-expanded", on ? "true" : "false");
  document.body.style.overflow = on ? "hidden" : "";
  (on ? closeBtn : openBtn).focus();
};
openBtn.addEventListener("click", () => setMenu(true));
closeBtn.addEventListener("click", () => setMenu(false));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false); });

// officers: flip cards in one auto-scrolling row
const ot = $("#officer-track");
const cards = [...ot.querySelectorAll(".officer")];
const oc = carousel(ot, { interval: 3200 });
const toggle = (c) => {
  const on = !c.classList.contains("flipped");
  c.classList.toggle("flipped", on);
  c.setAttribute("aria-pressed", on ? "true" : "false");
  c.querySelector(".back").setAttribute("aria-hidden", on ? "false" : "true");
  c.querySelector(".front").setAttribute("aria-hidden", on ? "true" : "false");
  oc?.hold("flip", cards.some((x) => x.classList.contains("flipped")));
};
cards.forEach((c) => {
  c.addEventListener("click", () => toggle(c));
  c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(c); } });
});

// impact: count up when scrolled into view
const amt = $("#raised");
const target = Number(amt.dataset.target);
const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US");
if (!reduce && "IntersectionObserver" in window && amt.getBoundingClientRect().top > innerHeight) {
  amt.textContent = fmt(0);
  const io = new IntersectionObserver((es) => {
    if (!es[0].isIntersecting) return;
    io.disconnect();
    const t0 = performance.now(), dur = 1500;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      amt.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.5 });
  io.observe(amt);
}

// gallery preview carousel
carousel($("#recent-track"), { interval: 4200, bars: $("#recent-bars") });

// copy email
$("#copy").addEventListener("click", async () => {
  const b = $("#copy"), txt = $("#addr .txt"), t = txt.textContent;
  try { await navigator.clipboard.writeText(t); b.textContent = "Copied"; }
  catch (_) { const r = document.createRange(); r.selectNodeContents(txt); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selected"; }
  setTimeout(() => (b.textContent = "Copy email"), 2200);
});

// back to top
const tt = $("#to-top");
addEventListener("scroll", () => tt.classList.toggle("show", scrollY > innerHeight * 0.8), { passive: true });
tt.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));

reveal();
