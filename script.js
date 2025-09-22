// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect for skills
    const skills = [
        "Web Developer",
        "Graphic Designer",
        "UI/UX Designer",
        "Python Developer",
        "Java Developer",
        "Cyber Security Expert"
    ];
    
    let currentSkillIndex = 0;
    const skillsTextElement = document.getElementById('skills-text');
    
    function typeSkill(skill) {
        let i = 0;
        skillsTextElement.textContent = '';
        skillsTextElement.classList.add('typewriter');
        
        function type() {
            if (i < skill.length) {
                skillsTextElement.textContent += skill.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(eraseSkill, 2000);
            }
        }
        
        type();
    }
    
    function eraseSkill() {
        let skill = skillsTextElement.textContent;
        let i = skill.length;
        
        function erase() {
            if (i > 0) {
                skillsTextElement.textContent = skill.substring(0, i-1);
                i--;
                setTimeout(erase, 50);
            } else {
                currentSkillIndex = (currentSkillIndex + 1) % skills.length;
                setTimeout(() => typeSkill(skills[currentSkillIndex]), 500);
            }
        }
        
        erase();
    }
    
    // Start the typewriter effect
    typeSkill(skills[currentSkillIndex]);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            const navbar = document.getElementById("myNavbar");
            if (navbar.className.includes("responsive")) {
                navbar.className = "navbar";
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('myNavbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 2rem';
            navbar.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
        } else {
            navbar.style.padding = '1.2rem 2rem';
            navbar.style.backgroundColor = 'var(--dark-bg)';
        }
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Mobile navigation toggle
function toggleNav() {
    const navbar = document.getElementById("myNavbar");
    if (navbar.className === "navbar") {
        navbar.className += " responsive";
    } else {
        navbar.className = "navbar";
    }
}