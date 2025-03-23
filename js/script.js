document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.navbar .menu');
    const navMenu = document.querySelector('.navbar .nav');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}); 