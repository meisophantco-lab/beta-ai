const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if(menuBtn) {
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}
