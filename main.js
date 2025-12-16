const tree = document.getElementById("tree");
if (!tree) throw new Error("#tree not found. Check index.html has id='tree'.");

function rand(min, max){ return Math.random() * (max - min) + min; }

function buildTree(){
  // 이전 점 제거 (별은 남기기)
  [...tree.querySelectorAll(".light")].forEach(el => el.remove());

  const H = tree.clientHeight;
  const W = tree.clientWidth;

  // ====== 튜닝 포인트 ======
  const DOTS = 75;                 // 점 개수
  const topY = 78;                 // 별 아래 시작 높이
  const bottomY = H - 40;          // 바닥 끝
  const maxRadius = W * 0.24;      // 바닥 폭(반지름)
  const turns = 4.8;               // 나선 감기는 횟수
  // ========================

  const colors = ["--red", "--pink", "--white"];

  for (let i = 0; i < DOTS; i++){
    const t = i / (DOTS - 1);                      // 0..1

    // ✅ 아래가 넓고 위가 좁게 보이도록: y는 bottom -> top으로 올라감
    const y = bottomY - t * (bottomY - topY);

    // ✅ 아래(maxRadius) -> 위(0)로 줄어듦
    const radius = (1 - t) * maxRadius;

    // 나선 각도
    const angle = t * turns * Math.PI * 2;

    // x 위치 (좌우)
    const x = Math.cos(angle) * radius;

    // 3D 느낌을 조금 더 주고 싶으면 z도 살짝 넣기 (rotateY 시 깊이감 ↑)
    const z = Math.sin(angle) * radius * 0.25; // 0.0~0.4 사이로 취향껏

    const el = document.createElement("div");
    el.className = "light";

    const colorVar = colors[Math.floor(rand(0, colors.length))];
    const size = rand(5, 8);
    const delay = rand(0, 1.8);
    const tw = rand(0.9, 1.8) + "s";

    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    el.style.setProperty("--s", `${size}px`);
    el.style.setProperty("--c", `var(${colorVar})`);
    el.style.setProperty("--d", `${delay}s`);
    el.style.setProperty("--tw", tw);

    // 3D 깊이(선택): rotateY 회전할 때 더 “나무”처럼 보임
    el.style.transform = `translate3d(calc(-50% + ${x}px), ${y}px, ${z}px)`;

    // twinkle keyframes가 transform을 쓰므로, transform 충돌 방지:
    // => keyframes 대신 "transform"을 변수 기반으로 유지하려면 아래처럼 바꿔야 하는데,
    // 지금은 CSS keyframes가 transform을 제어하므로, 3D 깊이는 filter/회전으로만 느끼는 게 안정적.
    // (그래서 위 transform은 참고용. 충돌 싫으면 아래 한 줄로 대체)
    el.style.transform = ""; // <- 충돌 피하려면 이 줄 유지(기본 추천)

    tree.appendChild(el);
  }
}

// 첫 렌더
buildTree();

// 리사이즈 시 재생성
window.addEventListener("resize", () => {
  // 너무 잦은 호출 방지(간단 디바운스)
  clearTimeout(window.__t);
  window.__t = setTimeout(buildTree, 150);
});


