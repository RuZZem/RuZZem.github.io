let search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
}

let menu = document.querySelector('.navbar');
document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}

/* hide menu */
window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');
}

/* change bg */
const bgHeader = () => {
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('bg-header') : header.classList.remove('bg-header');
}
window.addEventListener('scroll', bgHeader);


const animate = ScrollReveal ({
    origin: 'top',
    distance: '60px',
    duration: '2500',
    delay: '400',
});

animate.reveal('.nav');
animate.reveal('.home-text', {origin: 'left'});
animate.reveal('.heading span', {origin: 'top', delay: 300});
animate.reveal('.heading h2', {origin: 'top', delay: 100});
animate.reveal('.heading p', {origin: 'bottom', delay: 300});
animate.reveal('.cars-container .box, .parts-container .box, .blog-container .box', {origin: 'bottom', interval: 200});
animate.reveal('.footer-box', {origin: 'right', interval: 200});

animate.reveal('.about-img', {origin: 'left'});
animate.reveal('.about-text', {origin: 'right'});
