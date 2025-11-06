const playBtn = document.getElementById('playBtn');
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');

playBtn.addEventListener('click', function() {
    div1.style.display = 'none';
    div2.style.display = 'block';
});


const runas = [
    { id: 1, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819249/runa_pezgrande_okbtby.png" },
    { id: 2, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819249/runa_s_gbnud8.png" },
    { id: 3, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819249/runa_r_wbwc4e.png" },
    { id: 4, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_h_umfydm.png" },
    { id: 5, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_pez_wzf6ah.png" },
    { id: 6, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_n_tx5wti.png" },
    { id: 7, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_mx_gvy7aq.png" },
    { id: 8, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_l_huu9eo.png" },
    { id: 9, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819245/runa_m_b4ni86.png" },
    { id: 10, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_j_bjfzhf.png" },
    { id: 11, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_g_ha1b28.png" },
    { id: 12, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_f_wi0kcw.png" },
    { id: 13, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_b_ucuizq.png" },
    { id: 14, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_bandera_ospi2p.png" },
    { id: 15, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761819244/runa_1_bwbbcc.png" },
    ]

const runasRotas = [
    { id: 1, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728527/S_v9jhra.png" },
    { id: 2, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728525/R_byb6cj.png" },
    { id: 3, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728526/Runa_F_lx6qth.png" },
    { id: 4, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728527/Runa_R_ijho7y.png" },
    { id: 5, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728526/Runa_8_yddqa6.png" },
    { id: 6, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728526/Runa_Pez_pde9ip.png" },
    { id: 7, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728526/Runa_Pez_pde9ip.png" },
    { id: 8, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728523/Pez2_hxavfl.png" },
    { id: 9, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728522/N_jhosor.png" },
    { id: 10, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728520/L_-_M_btjoi6.png" },
    { id: 11, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728522/N_runa_k50zub.png" },
    { id: 12, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728520/D_spkbzd.png" },
    { id: 13, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728521/M_vkoml2.png" },
    { id: 14, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728519/B_-_M_1_waurld.png" },
    { id: 15, url: "https://res.cloudinary.com/djuisin8z/image/upload/v1761728519/z_inversa_wedvnr.png" }
    ]

    