import { photo, reveal } from "./hfh.js";

const gallery = JSON.parse(document.getElementById("gallery-data").textContent);
const lb = document.getElementById("lb"), media = document.getElementById("lb-media"), count = document.getElementById("lb-count");
let cur = 0, lastFocus = null, sx = null;

function show(i) {
  cur = (i + gallery.length) % gallery.length;
  const g = gallery[cur];
  media.replaceChildren(photo(g.src, g.caption || "Henna design", "design", g.src ? "" : "Photo coming soon"));
  if (!g.src) media.firstChild.style.aspectRatio = "4/3";
  count.textContent = (cur + 1) + " / " + gallery.length + (g.caption ? " · " + g.caption : "");
}
function open(i) {
  lastFocus = document.activeElement; show(i); lb.hidden = false;
  requestAnimationFrame(() => lb.classList.add("open"));
  document.getElementById("lb-close").focus(); document.body.style.overflow = "hidden";
}
function close() {
  lb.classList.remove("open"); setTimeout(() => { lb.hidden = true; }, 250);
  document.body.style.overflow = ""; lastFocus?.focus();
}

document.querySelectorAll("#masonry figure").forEach((f, i) => {
  f.addEventListener("click", () => open(i));
  f.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); } });
});
document.getElementById("lb-prev").onclick = () => show(cur - 1);
document.getElementById("lb-next").onclick = () => show(cur + 1);
document.getElementById("lb-close").onclick = close;
lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") show(cur - 1);
  if (e.key === "ArrowRight") show(cur + 1);
});
lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", (e) => {
  if (sx == null) return;
  const dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  sx = null;
}, { passive: true });

reveal();
