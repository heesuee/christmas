const tree = document.getElementById("tree");
if (!tree) throw new Error("#tree not found: check index.html id='tree'");

const colors = ["var(--red)", "var(--pink)", "var(--white)"];
const rand = (a, b) => Math.random() * (b - a) + a;

function buildTree(){
  // 기존 라이트 제거
  tree.querySelectorAll(".light").forEach(el => el.remove());

  const H = tree.clientHeight;
  const W = tree.clientWidth;

  // 튜닝
  const DOTS = 120;
  const topY = 78;
  const bottomY = H - 45;
  const maxRadius = W * 0.26;
  const turns = 5.0;
  const thickness = 0.10; // 0.07~0.13

  for (let i = 0; i < DOTS; i++){
    const t = i / (DOTS - 1);                  
    const y = topY + t * (bottomY - topY);     
    const radius = t * maxRadius;   
    const angle = t * turns * Math.PI * 2;

    let x = Math.cos(angle) * radius;
    let z = Math.sin(angle) * radius * 0.55;

    // 리본 두께(너무 크면 삼각형 면처럼 보임)
    const jitter = radius * thickness;
    x += rand(-jitter, jitter);
    z += rand(-jitter, jitter);

    const el = document.createElement("div");
    el.className = "light";

    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    el.style.setProperty("--z", `${z}px`);
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
