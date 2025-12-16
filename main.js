const tree = document.getElementById("tree");
if (!tree) throw new Error("#tree not found");

const colors = ["--red", "--pink", "--white"];
const rand = (a, b) => Math.random() * (b - a) + a;

function buildTree(){
  tree.querySelectorAll(".light").forEach(el => el.remove());

  const H = tree.clientHeight;
  const W = tree.clientWidth;

  const DOTS = 110;
  const topY = 78;
  const bottomY = H - 45;
  const maxRadius = W * 0.26;
  const turns = 4.8;
  const thickness = 0.10; // 0.07~0.13 사이로 튜닝

  for (let i = 0; i < DOTS; i++){
    const t = i / (DOTS - 1);
    const y = topY + t * (bottomY - topY);
    const radius = (1 - t) * maxRadius;

    const angle = t * turns * Math.PI * 2;

    let x = Math.cos(angle) * radius;
    let z = Math.sin(angle) * radius * 0.55;

    const jitter = radius * thickness;
    x += rand(-jitter, jitter);
    z += rand(-jitter, jitter);

    const el = document.createElement("div");
    el.className = "light";

    const colorVar = colors[Math.floor(rand(0, colors.length))];
    const size = rand(5, 8);
    const delay = rand(0, 1.8);
    const tw = rand(1.0, 2.0) + "s";

    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    el.style.setProperty("--z", `${z}px`);

    el.style.setProperty("--s", `${size}px`);
    el.style.setProperty("--c", `var(${colorVar})`);
    el.style.setProperty("--d", `${delay}s`);
    el.style.setProperty("--tw", tw);

    tree.appendChild(el);
  }
}

buildTree();
window.addEventListener("resize", () => {
  clearTimeout(window.__rt);
  window.__rt = setTimeout(buildTree, 120);
});
