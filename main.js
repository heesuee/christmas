const tree = document.getElementById("tree");

const H = tree.clientHeight;
const W = tree.clientWidth;

// tweak these
const DOTS = 70;
const topY = 70;               // where spiral starts (below the star)
const bottomY = H - 40;        // where it ends
const maxRadius = W * 0.22;    // bottom radius
const turns = 4.6;             // spiral turns

const colors = ["--red", "--pink", "--white"];

function rand(min, max) { return Math.random() * (max - min) + min; }

for (let i = 0; i < DOTS; i++) {
  const t = i / (DOTS - 1);                 // 0..1 bottom->top ratio
  const y = topY + t * (bottomY - topY);    // vertical position
  const radius = (1 - t) * maxRadius;       // narrower toward the top
  const angle = t * turns * Math.PI * 2;    // spiral

  const x = Math.cos(angle) * radius;

  const el = document.createElement("div");
  el.className = "light";

  const colorVar = colors[Math.floor(rand(0, colors.length))];
  const size = rand(5, 8);          // dot size
  const delay = rand(0, 1.5);       // animation offset
  const tw = rand(0.9, 1.8) + "s";  // twinkle speed

  el.style.setProperty("--x", `${x}px`);
  el.style.setProperty("--y", `${y}px`);
  el.style.setProperty("--s", `${size}px`);
  el.style.setProperty("--c", `var(${colorVar})`);
  el.style.setProperty("--d", `${delay}s`);
  el.style.setProperty("--tw", tw);

  tree.appendChild(el);
}

// Keep layout correct if resized
addEventListener("resize", () => location.reload());

