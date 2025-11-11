document.addEventListener("DOMContentLoaded", () => {

  
  const home = document.getElementById("home");
  const addPlayers = document.getElementById("addPlayers");
  const playBtn = document.getElementById("playBtn");
  const btnHome = document.getElementById("btn-home");

  const input = document.getElementById("vikingName");
  const list = document.getElementById("vikingsList");
  const addBtn = document.getElementById("btn-add");
  const removeBtn = document.getElementById("btn-remove");
  const confirmBtn = document.getElementById("btn-confirm");


  const runeImages = [
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819249/runa_pezgrande_okbtby.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819249/runa_s_gbnud8.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819249/runa_r_wbwc4e.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_h_umfydm.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_pez_wzf6ah.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_n_tx5wti.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_mx_gvy7aq.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_l_huu9eo.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_m_b4ni86.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_j_bjfzhf.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_g_ha1b28.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_f_wi0kcw.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_b_ucuizq.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_bandera_ospi2p.png",
    "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_1_bwbbcc.png"
  ];

  
  function showScreen(show, hide) {
    hide.classList.remove("active");
    hide.classList.add("hidden");

    show.classList.remove("hidden");
    show.classList.add("active");
  }

  
  playBtn.addEventListener("click", () => {
    showScreen(addPlayers, home);
  });

  
  btnHome.addEventListener("click", () => {
    showScreen(home, addPlayers);
  });

  
  addBtn.addEventListener("click", () => {
    const name = input.value.trim();
    const items = list.querySelectorAll(".viking-item");

    if (!name) {
      alert("Name your Viking before adding him!");
      return;
    }

    if (items.length >= 15) {
      alert("Only 15 Vikings can join Valhalla, brother!");
      return;
    }

    const runeIndex = Math.floor(Math.random() * runeImages.length);
    const rune = runeImages[runeIndex];

    const item = document.createElement("div");
    item.className = "viking-item";
    item.innerHTML = `
      <img src="${rune}" alt="rune" class="rune-icon">
      ${name}
    `;

    list.appendChild(item);
    input.value = "";
  });


  removeBtn.addEventListener("click", () => {
    const items = list.querySelectorAll(".viking-item");
    if (items.length > 0) {
      list.removeChild(items[items.length - 1]);
    }
  });

  
  confirmBtn.addEventListener("click", () => {
    const vikings = [...list.querySelectorAll(".viking-item")].map(item => item.textContent.trim());

    if (vikings.length === 0) {
      alert("You must add at least one Viking to enter Valhalla!");
      return;
    }

    alert(`⚔️ ${vikings.length} Viking(s) are ready for Valhalla!`);
    console.log("Vikings ready:", vikings);
  });

});
