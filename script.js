// เปิด-ปิดเมนูบนมือถือ
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// กดเลือกเมนูแล้วให้เมนูปิดเอง
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ดอกไม้ ดาว หัวใจ ตกลงมาเป็นพื้นหลัง
(function () {
  // ถ้าผู้ใช้ตั้งค่าให้ลดการเคลื่อนไหว จะไม่แสดง
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const symbols = ["✿", "❀", "✦", "♡", "✧", "❁"];
  const colors = ["#E58FAE", "#F7C8D8", "#B9A3EA", "#8FD1B2", "#F5D88A"];
  const count = window.innerWidth < 800 ? 10 : 18; // มือถือใช้จำนวนน้อยกว่า

  const layer = document.createElement("div");
  layer.className = "fall-layer";
  layer.setAttribute("aria-hidden", "true");

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "fall";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = 12 + Math.random() * 16 + "px";
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
    el.style.setProperty("--spin", (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360) + "deg");
    el.style.animationDuration = 14 + Math.random() * 14 + "s";
    el.style.animationDelay = -Math.random() * 28 + "s"; // เริ่มกระจายทั่วจอ ไม่ตกพร้อมกัน
    layer.appendChild(el);
  }
  document.body.appendChild(layer);
})();


// ข้อความ "I'm a ..." พิมพ์แล้วลบ สลับไปเรื่อย ๆ
(function () {
  const el = document.getElementById("typed");
  if (!el) return;
  const roles = ["UX/UI Designer", "Graphic Designer", "Web Designer", "Computer Science Student"];
  // ถ้าตั้งค่าลดการเคลื่อนไหว ให้แสดงข้อความแรกนิ่ง ๆ
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = roles[0];
    const cur = document.querySelector(".cursor");
    if (cur) cur.style.display = "none";
    return;
  }
  let r = 0, i = 0, deleting = false;
  function tick() {
    const word = roles[r];
    i += deleting ? -1 : 1;
    el.textContent = word.slice(0, i);
    let delay = deleting ? 40 : 90;
    if (!deleting && i === word.length) { deleting = true; delay = 1500; }
    else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 400; }
    setTimeout(tick, delay);
  }
  el.textContent = "";
  tick();
})();
