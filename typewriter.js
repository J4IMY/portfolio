document.addEventListener('DOMContentLoaded', function() {
    const skillsText = document.getElementById('skills-text');
    const skills = ['Web Developer', 'UI/UX Designer', 'Full Stack Developer', 'Problem Solver'];
    let currentSkillIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentSkill = skills[currentSkillIndex];
        
        if (isDeleting) {
            // Deleting text
            skillsText.textContent = currentSkill.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            skillsText.textContent = currentSkill.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 150; // Slower when typing
        }
        
        // If finished typing the current skill
        if (!isDeleting && currentCharIndex === currentSkill.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause before deleting
        }
        
        // If finished deleting the current skill
        if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentSkillIndex = (currentSkillIndex + 1) % skills.length;
            typingSpeed = 500; // Pause before typing next skill
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typewriter effect
    typeWriter();
});