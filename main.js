const tree = document.getElementById("tree");
console.log("tree =", tree);

if (!tree) {
  document.body.innerHTML = "<h1 style='color:white'>#tree not found</h1>";
  throw new Error("#tree not found");
}

// 테스트: 점 1개만
const el = document.createElement("div");
el.className = "light";
el.style.setProperty("--x", "0px");
el.style.setProperty("--y", "160px");
el.style.setProperty("--z", "0px");
el.style.setProperty("--s", "10px");
el.style.setProperty("--c", "#ffffff");
tree.appendChild(el);

console.log("light appended");
