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
    Swal.fire({
        title: 'Message Sent!',
        text: 'Thank you for your message!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#00ffee'
    });
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

// Project management functionality
const addProjectBtn = document.getElementById('add-project-btn');
const projectModal = document.getElementById('project-modal');
const closeModal = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const projectForm = document.getElementById('project-form');
const projectsWrapper = document.getElementById('projects-wrapper');

// add admin password constant (used for add/delete)
const ADMIN_PASSWORD = 'Omar_2002';

// Open modal
addProjectBtn.addEventListener('click', () => {
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Close modal functions
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
    projectForm.reset(); // Clear form
}

closeModal.addEventListener('click', closeProjectModal);
cancelBtn.addEventListener('click', closeProjectModal);

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// Handle form submission
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Ask for admin password before adding a project
    Swal.fire({
        title: 'Admin Access Required',
        text: 'Enter password to add project:',
        input: 'password',
        inputPlaceholder: 'Enter password',
        showCancelButton: true,
        confirmButtonText: 'Verify',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#00ffee',
        cancelButtonColor: '#d33',
        inputValidator: (value) => {
            if (!value) {
                return 'Please enter a password!';
            }
        }
    }).then((result) => {
        if (!result.isConfirmed) return;

        if (result.value !== ADMIN_PASSWORD) {
            Swal.fire({
                title: 'Access Denied',
                text: 'Incorrect password.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ffee'
            });
            return;
        }

        // Password verified — proceed with original submit logic
        // Get form data
        const formData = new FormData(projectForm);
        const imageFile = formData.get('projectImageFile');

        // Check if image file is selected
        if (!imageFile || imageFile.size === 0) {
            Swal.fire({
                title: 'No Image Selected',
                text: 'Please select an image file!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ffee'
            });
            return;
        }

        // Check file type
        if (!imageFile.type.startsWith('image/')) {
            Swal.fire({
                title: 'Invalid File Type',
                text: 'Please select a valid image file!',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ffee'
            });
            return;
        }

        // Check file size (max 5MB)
        if (imageFile.size > 5 * 1024 * 1024) {
            Swal.fire({
                title: 'File Too Large',
                text: 'Image file size should be less than 5MB!',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ffee'
            });
            return;
        }

        // Convert image file to data URL
        const reader = new FileReader();
        reader.onload = function(e) {
            const projectData = {
                name: formData.get('projectName'),
                link: formData.get('projectLink'),
                image: e.target.result, // Use the data URL
                description: formData.get('projectDescription'),
                id: Date.now() // Add unique ID
            };

            // Save to localStorage
            saveProjectToStorage(projectData);

            // Create new project element
            createProjectElement(projectData);

            // Close modal and reset form
            closeProjectModal();

            // Show success message
            Swal.fire({
                title: 'Success!',
                text: 'Project added successfully!',
                icon: 'success',
                confirmButtonText: 'Great!',
                confirmButtonColor: '#00ffee',
                timer: 2000,
                timerProgressBar: true
            });
        };

        reader.readAsDataURL(imageFile);
    });
});

// Function to create a new project element
function createProjectElement(projectData) {
    const projectElement = document.createElement('div');
    projectElement.className = 'Projects-item-wrapper';
    projectElement.setAttribute('data-project-id', projectData.id);

    projectElement.innerHTML = `
        <a href="${projectData.link}" target="_blank" rel="noopener noreferrer" class="Projects-item">
            <img src="${projectData.image}" alt="${projectData.name}">
            <h2>${projectData.name}</h2>
            <div class="rating">
                <i class='bx bxs-star' id="star"></i>
                <i class='bx bxs-star' id="star"></i>
                <i class='bx bxs-star' id="star"></i>
                <i class='bx bxs-star' id="star"></i>
                <i class='bx bxs-star' id="star"></i>
            </div>
            <p>${projectData.description}</p>
        </a>
        <button type="button" class="delete-project-btn" onclick="deleteProject(${projectData.id})" title="Delete Project">
            <i class='bx bx-trash'></i>
        </button>
    `;

    // Add the new project to the wrapper
    projectsWrapper.appendChild(projectElement);

    // Add animation
    projectElement.style.opacity = '0';
    projectElement.style.transform = 'translateY(20px)';

    setTimeout(() => {
        projectElement.style.transition = 'all 0.5s ease';
        projectElement.style.opacity = '1';
        projectElement.style.transform = 'translateY(0)';
    }, 100);
}

// Function to delete a project
function deleteProject(projectId) {
    const ADMIN_PASSWORD = 'Omar_2002'; // change to desired password

    // First, ask for password
    Swal.fire({
        title: 'Admin Access Required',
        text: 'Enter password to delete project:',
        input: 'password',
        inputPlaceholder: 'Enter password',
        showCancelButton: true,
        confirmButtonText: 'Verify',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#00ffee',
        cancelButtonColor: '#d33',
        inputValidator: (value) => {
            if (!value) {
                return 'Please enter a password!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value !== ADMIN_PASSWORD) {
                Swal.fire({
                    title: 'Access Denied',
                    text: 'Incorrect password.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ffee'
                });
                return;
            }

            // Password correct, now ask for confirmation
            Swal.fire({
                title: 'Delete Project?',
                text: 'Are you sure you want to delete this project? This action cannot be undone!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#00ffee'
            }).then((deleteResult) => {
                if (deleteResult.isConfirmed) {
                    // Remove from DOM
                    const projectElement = document.querySelector(`[data-project-id="${projectId}"]`);
                    if (projectElement) {
                        projectElement.style.transition = 'all 0.3s ease';
                        projectElement.style.opacity = '0';
                        projectElement.style.transform = 'translateY(-20px)';

                        setTimeout(() => {
                            projectElement.remove();
                        }, 300);
                    }

                    // Remove from localStorage
                    let projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
                    const idNum = Number(projectId);
                    projects = projects.filter(project => project.id !== idNum);
                    localStorage.setItem('portfolioProjects', JSON.stringify(projects));

                    // Show success message
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Project has been deleted successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ffee',
                        timer: 2000,
                        timerProgressBar: true
                    });
                }
            });
        }
    });
}

// LocalStorage functions
function saveProjectToStorage(projectData) {
    let projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    projects.push(projectData);
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}

function loadProjectsFromStorage() {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    projects.forEach(project => {
        createProjectElement(project);
    });
}

// Load saved projects when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjectsFromStorage();
});