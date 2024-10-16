// JavaScript to control the left and right navigation buttons with a sliding effect
let currentProjectIndex = 0;
const projects = document.querySelectorAll('.project');

// Function to update the displayed project and adjust overlapping
function showProject(index) {
    projects.forEach((project, i) => {
        project.classList.toggle('active', i === index);
        if (i < index) {
            project.style.transform = 'translateX(-100%)';
        } else if (i > index) {
            project.style.transform = 'translateX(100%)';
        } else {
            project.style.transform = 'translateX(0)';
        }
    });
}

// Initial display of the first project
showProject(currentProjectIndex);

// Event listeners for left and right buttons
document.getElementById('left-button').addEventListener('click', () => {
    currentProjectIndex = (currentProjectIndex === 0) ? projects.length - 1 : currentProjectIndex - 1;
    showProject(currentProjectIndex);
});

document.getElementById('right-button').addEventListener('click', () => {
    currentProjectIndex = (currentProjectIndex === projects.length - 1) ? 0 : currentProjectIndex + 1;
    showProject(currentProjectIndex);
});
