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
