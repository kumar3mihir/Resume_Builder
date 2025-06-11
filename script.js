// Smooth scroll to builder section
function scrollToBuilder() {
    document.getElementById('resume-builder').scrollIntoView({
        behavior: 'smooth'
    });
}

// Generate Resume
function generateResume() {
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;
    const projects = document.getElementById('projects').value;

    // Format skills into bullet points
    const skillsList = skills.split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
        .map(skill => `<li>${skill}</li>`)
        .join('');

    // Format projects into bullet points
    const projectsList = projects.split('\n')
        .map(project => project.trim())
        .filter(project => project.length > 0)
        .map(project => `<li>${project}</li>`)
        .join('');

    // Create resume HTML
    const resumeHTML = `
        <div class="resume-content">
            <h1>${fullName}</h1>
            <div class="contact-info">
                <p><i class="fas fa-envelope"></i> ${email}</p>
                <p><i class="fas fa-phone"></i> ${phone}</p>
            </div>
            
            <section class="resume-section">
                <h2>Education</h2>
                <div class="education-content">
                    ${education.split('\n').map(line => `<p>${line}</p>`).join('')}
                </div>
            </section>

            <section class="resume-section">
                <h2>Skills</h2>
                <ul class="skills-list">
                    ${skillsList}
                </ul>
            </section>

            <section class="resume-section">
                <h2>Projects</h2>
                <ul class="projects-list">
                    ${projectsList}
                </ul>
            </section>
        </div>
    `;

    // Update preview
    document.getElementById('resume-preview').innerHTML = resumeHTML;
}

// Download PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get the resume content
    const resumeContent = document.querySelector('.resume-content');
    if (!resumeContent) {
        alert('Please generate a resume first!');
        return;
    }

    // Create a temporary container for better PDF formatting
    const tempContainer = document.createElement('div');
    tempContainer.style.width = '210mm'; // A4 width
    tempContainer.style.padding = '20mm';
    tempContainer.style.background = 'white';
    tempContainer.innerHTML = resumeContent.innerHTML;
    document.body.appendChild(tempContainer);

    // Use html2canvas to capture the content
    html2canvas(tempContainer, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Save the PDF
        pdf.save('resume.pdf');

        // Clean up
        document.body.removeChild(tempContainer);
    });
}

// Add some basic styling for the resume preview
const style = document.createElement('style');
style.textContent = `
    .resume-content {
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
    }

    .resume-content h1 {
        font-size: 24px;
        margin-bottom: 10px;
        color: #007bff;
    }

    .contact-info {
        margin-bottom: 20px;
        color: #666;
    }

    .contact-info p {
        margin: 5px 0;
    }

    .contact-info i {
        margin-right: 8px;
        color: #007bff;
    }

    .resume-section {
        margin: 20px 0;
    }

    .resume-section h2 {
        font-size: 18px;
        color: #333;
        border-bottom: 2px solid #007bff;
        padding-bottom: 5px;
        margin-bottom: 10px;
    }

    .skills-list, .projects-list {
        list-style-type: none;
        padding-left: 0;
    }

    .skills-list li, .projects-list li {
        margin: 5px 0;
        padding-left: 20px;
        position: relative;
    }

    .skills-list li:before, .projects-list li:before {
        content: "•";
        color: #007bff;
        position: absolute;
        left: 0;
    }

    .education-content p {
        margin: 5px 0;
    }
`;
document.head.appendChild(style); 