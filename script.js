document.addEventListener('DOMContentLoaded', () => {
    // Dohvaćanje elemenata za desktop/sidebar navigaciju
    // Tvoj HTML za desktop navigaciju unutar <aside> ima .nav__hamburger.
    const desktopHamburger = document.querySelector('aside .nav__hamburger'); 
    const desktopNavMenu = document.querySelector('aside .nav__menu'); 

    // Dohvaćanje elemenata za mobilnu navigaciju
    const mobileHamburger = document.querySelector('.nav-mobile .nav__hamburger'); 
    const mobileNavMenu = document.querySelector('.nav-mobile .nav__menu'); 

    // Funkcionalnost za desktop/sidebar hamburger (ako postoji i ako se koristi)
    if (desktopHamburger && desktopNavMenu) {
        // Ako ne želiš da desktop hamburger otvara/zatvara meni, možeš zakomentirati ili ukloniti ovaj blok.
        // Trenutno je CSS za desktop meni uvijek vidljiv, pa ovaj JS možda nije nužan za desktop.
        desktopHamburger.addEventListener('click', (event) => {
            event.preventDefault();
            desktopNavMenu.classList.toggle('nav-menu--open'); // CSS bi trebao definirati što .nav-menu--open radi za desktop
            // desktopHamburger.classList.toggle('active'); 
        });
    }

    // Funkcionalnost za mobilni hamburger
    if (mobileHamburger && mobileNavMenu) {
        mobileHamburger.addEventListener('click', (event) => {
            event.preventDefault(); // Spriječava defaultno ponašanje linka (#)
            mobileNavMenu.classList.toggle('nav-menu--open');
            // Opcionalno: Animacija hamburger ikone u "X"
            // mobileHamburger.classList.toggle('active'); 
        });
    }

    // Kalkulator cijena za stranicu narudžbi
    const orderForm = document.querySelector('form[action*="formspree"]'); 
    if (orderForm && window.location.pathname.includes('narudzbe.html')) {
        const productCheckboxes = orderForm.querySelectorAll('.product-checkbox');
        const quantityInputs = orderForm.querySelectorAll('.product-quantity');
        const totalPriceDisplay = orderForm.querySelector('#totalPriceDisplay');
        const totalPriceInput = orderForm.querySelector('#ukupnaCijenaInput'); // Dohvaćamo skriveno input polje
        const emailInput = orderForm.querySelector('#email'); // Dohvaćamo email input polje

        // Dodajemo event listener za submit forme za provjeru emaila
        orderForm.addEventListener('submit', function(event) {
            if (emailInput) { // Provjeravamo postoji li emailInput prije korištenja
                const emailValue = emailInput.value;
                if (!emailValue.includes('@')) {
                    alert('Molimo unesite ispravnu email adresu (mora sadržavati "@").');
                    event.preventDefault(); // Sprječavamo slanje forme ako email nije ispravan
                    emailInput.focus(); // Opcionalno: fokusiramo se natrag na email polje
                    return false; // Dodatna mjera za sprječavanje slanja
                }
            }
        });

        function calculateAndUpdateTotal() {
            let total = 0;
            productCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const price = parseFloat(checkbox.dataset.price);
                    const productId = checkbox.id; 
                    // Pronađi odgovarajući input za količinu koristeći data-product-id ili po ID-u
                    // (npr. id="kolicina_kruh" za checkbox id="proizvod_kruh")
                    const quantityInput = orderForm.querySelector(`input[data-product-id="${productId}"], input#kolicina_${productId.replace('proizvod_', '')}`);
                    
                    if (quantityInput) {
                        const quantity = parseInt(quantityInput.value) || 0;
                        if (quantity > 0) {
                             total += price * quantity;
                        }
                    }
                }
            });
            if (totalPriceDisplay) {
                totalPriceDisplay.textContent = total.toFixed(2);
            }
            if (totalPriceInput) { // Postavljamo vrijednost skrivenog input polja
                totalPriceInput.value = total.toFixed(2) + " €"; // Dodajemo i valutu radi jasnoće u emailu
            }
        }

        productCheckboxes.forEach(cb => cb.addEventListener('change', calculateAndUpdateTotal));
        quantityInputs.forEach(input => input.addEventListener('input', calculateAndUpdateTotal));
        
        // Inicijalno izračunaj cijenu ako su neke vrijednosti već postavljene (npr. kod refresha stranice)
        calculateAndUpdateTotal();
    }
});
