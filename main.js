const tree = document.getElementById("tree");
if (!tree) throw new Error("#tree not found");

const colors = ["var(--red)", "var(--pink)", "var(--white)"];
const rand = (a, b) => Math.random() * (b - a) + a;

function buildTree(){
  tree.querySelectorAll(".light").forEach(el => el.remove());

  const H = tree.clientHeight;
  const W = tree.clientWidth;

  // === 원하는 모양 튜닝은 여기만 ===
  const DOTS = 110;
  const topY = 70;
  const bottomY = H - 45;
  const maxRadius = W * 0.30;     // 아래 폭
  const turns = 4.8;              // 감기는 횟수
  const thickness = 0.08;         // 리본 두께(0.06~0.12)
  // ==============================

  for (let i = 0; i < DOTS; i++){
    const t = i / (DOTS - 1);                 // 0=위, 1=아래
    const y = topY + t * (bottomY - topY);    // 위→아래
    const radius = t * maxRadius;             // ✅ 위 좁고 아래 넓게

    const angle = t * turns * Math.PI * 2;

    let x = Math.cos(angle) * radius;

    // 리본 두께(삼각형 면처럼 안 보이게 최소한만)
    const jitter = radius * thickness;
    x += rand(-jitter, jitter);

    const el = document.createElement("div");
    el.className = "light";

    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    el.style.setProperty("--s", `${rand(5, 8)}px`);
    el.style.setProperty("--c", colors[Math.floor(rand(0, colors.length))]);
    el.style.setProperty("--d", `${rand(0, 1.8)}s`);
    el.style.setProperty("--tw", `${rand(1.0, 2.0)}s`);

    tree.appendChild(el);
  }
}

buildTree();
window.addEventListener("resize", () => {
  clearTimeout(window.__rt);
  window.__rt = setTimeout(buildTree, 120);
});
