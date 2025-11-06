
document.addEventListener('click', () => {
    const btnHome = document.getElementById('btnHome');
    if (btnHome) {
        btnHome.addEventListener('click', () => {
            window.location.href = '/'; // modificar para cambiar estilo en vez de cambiar ruta
        });
    }
});