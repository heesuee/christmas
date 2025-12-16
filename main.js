const tree = document.getElementById("tree");
if (!tree) throw new Error("#tree not found");

const colors = ["--red", "--pink", "--white"];
const rand = (a, b) => Math.random() * (b - a) + a;

function buildTree() {
  tree.querySelectorAll(".light").forEach(el => el.remove());

  const H = tree.clientHeight;
  const W = tree.clientWidth;

  const DOTS = 140;          // 점 수 (트리 느낌 핵심)
  const topY = 80;
  const bottomY = H - 45;
  const maxRadius = W * 0.28;
  const turns = 6.2;         // 리본 감기는 정도

  for (let i = 0; i < DOTS; i++) {
    const t = i / (DOTS - 1);                // 0..1 (아래->위 비율로 쓸거임)
    const y = bottomY - t * (bottomY - topY);

    // 위로 갈수록 줄어드는 “원뿔 반지름”
    const radiusMax = (1 - t) * maxRadius;

    // ✅ 핵심: 둘레가 아니라 “반지름 안쪽까지” 분포시키기
    // sqrt를 쓰면 중심에 과밀하지 않고 면이 고르게 채워짐
    const r = Math.sqrt(Math.random()) * radiusMax;

    // 리본처럼 살짝 감기게 각도에 t를 섞음
    const angle = t * turns * Math.PI * 2 + rand(-0.25, 0.25);

    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r * 0.55;    // 3D 깊이 (회전 시 트리 느낌 ↑)

    const el = document.createElement("div");
    el.className = "light";

    const colorVar = colors[Math.floor(rand(0, colors.length))];
    const size = rand(5, 8);
    const delay = rand(0, 1.8);
    const tw = rand(1.0, 2.0) + "s";

    // translate3d 값은 CSS 변수로 넘김 (transform 충돌 방지)
    el.style.setProperty("--tx", `calc(50% + ${x}px)`); // left 없이 50% 기반
    el.style.setProperty("--ty", `${y}px`);
    el.style.setProperty("--tz", `${z}px`);

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
