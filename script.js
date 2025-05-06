document.addEventListener('DOMContentLoaded', () => {
    // Dohvaćanje elemenata za desktop/sidebar navigaciju (ako postoji i koristi se)
    // Ako tvoja desktop navigacija nema hamburger, ovaj dio možeš i ukloniti ili prilagoditi.
    // Trenutno, tvoj HTML za desktop navigaciju unutar <aside> ima .nav__hamburger.
    const desktopHamburger = document.querySelector('aside .nav__hamburger'); // Precizniji selektor za desktop
    const desktopNavMenu = document.querySelector('aside .nav__menu'); // Precizniji selektor za desktop

    const mobileHamburger = document.querySelector('.nav-mobile .nav__hamburger'); // Ciljamo hamburger unutar .nav-mobile
    const mobileNavMenu = document.querySelector('.nav-mobile .nav__menu'); // Ciljamo meni unutar .nav-mobile

    // Funkcionalnost za desktop/sidebar hamburger (ako postoji)
    if (desktopHamburger && desktopNavMenu) {
        desktopHamburger.addEventListener('click', (event) => {
            event.preventDefault();
            desktopNavMenu.classList.toggle('nav-menu--open');
            desktopHamburger.classList.toggle('active');
        });
    }

    // Funkcionalnost za mobilni hamburger
    if (mobileHamburger && mobileNavMenu) {
        mobileHamburger.addEventListener('click', (event) => {
            event.preventDefault(); // Sprječava defaultno ponašanje linka (#)
            mobileNavMenu.classList.toggle('nav-menu--open');
            // Opcionalno: Animacija hamburger ikone u "X"
            mobileHamburger.classList.toggle('active');
        });
    }
});
