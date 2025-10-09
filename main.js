let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navBar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let Form = document.getElementById('form');
let profile_img = document.getElementById('profile_img');

window.onscroll = ()=>{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href+=' + id + ']').classList.add('active')
            })
        }
    })
}

menuIcon.onclick = ()=>{
    if (menuIcon.classList.contains('bx-menu')){
        menuIcon.classList.replace('bx-menu', 'bx-x');
        navbar.classList.add('active');
        navbar.style.cssText = 'display: block;';
    } else{
        menuIcon.classList.replace('bx-x', 'bx-menu');
        navbar.classList.remove('active');
        navbar.style.cssText = 'display: none;';
        navbar.style.cssText = 'transition: 0.5s ease;';
    }
}

window.onclick = (event) => {
    // Only hide navbar if menuIcon is 'bx-x', screen is small, and click is outside navbar/menuIcon
    if (
        menuIcon.classList.contains('bx-x') &&
        window.innerWidth < 895 &&
        event.target !== menuIcon &&
        !navbar.contains(event.target)
    ) {
        menuIcon.classList.replace('bx-x', 'bx-menu');
        navbar.classList.remove('active');
        navbar.style.cssText = 'display: none;';
    }
}

Form.onsubmit = () => {
    alert('Thank you for your message!');
}

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    themeIcon.classList.replace('bx-sun', 'bx-moon');
    profile_img.src = 'image/Gemini_Generated_Image_ci63muci63muci63.png'; // Light mode image
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'light') {
        // Switch to dark theme
        body.removeAttribute('data-theme');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark');
        profile_img.src = 'image/Gemini_Generated_Image_tgg3potgg3potgg3.png'; // Dark mode image
    } else {
        // Switch to light theme
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light');
        profile_img.src = 'image/Gemini_Generated_Image_ci63muci63muci63.png'; // Light mode image
    }
});