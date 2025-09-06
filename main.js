let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navBar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let Form = document.getElementById('form');

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