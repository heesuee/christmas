const tree = document.getElementById("tree");
if (!tree) throw new Error("no #tree");

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function buildTree() {
  tree.querySelectorAll(".light").forEach(el => el.remove());

  const H = tree.clientHeight;
  const W = tree.clientWidth;

  const LAYERS = 6;          // 트리 단 수 (중요)
  const DOTS_PER_LAYER = 18;
  const topY = 80;
  const bottomY = H - 40;
  const maxRadius = W * 0.28;

  const colors = ["--red", "--pink", "--white"];

  for (let layer = 0; layer < LAYERS; layer++) {
    const layerT = layer / (LAYERS - 1);

    const yBase = bottomY - layerT * (bottomY - topY);
    const layerRadius = (1 - layerT) * maxRadius;

    for (let i = 0; i < DOTS_PER_LAYER; i++) {
      const angle =
        (i / DOTS_PER_LAYER) * Math.PI * 2 +
        layerT * Math.PI; // 층마다 살짝 어긋나게

      const r = layerRadius * rand(0.75, 1.05);

      const x = Math.cos(angle) * r;
      const y = yBase + rand(-6, 6);

      const el = document.createElement("div");
      el.className = "light";

      const colorVar = colors[Math.floor(rand(0, colors.length))];
      const size = rand(5, 8);
      const delay = rand(0, 2);
      const tw = rand(1.2, 2.4) + "s";

      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
      el.style.setProperty("--s", `${size}px`);
      el.style.setProperty("--c", `var(${colorVar})`);
      el.style.setProperty("--d", `${delay}s`);
      el.style.setProperty("--tw", tw);

      tree.appendChild(el);
    }
  }
}

buildTree();
window.addEventListener("resize", buildTree);


