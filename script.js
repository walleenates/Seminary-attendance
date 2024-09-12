function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

function addStudent() {
    const newStudentInput = document.getElementById('newStudent');
    const studentName = newStudentInput.value.trim();

    if (studentName) {
        // Add the new student to the list with a checkbox
        const studentsDiv = document.getElementById('students');
        const newStudentDiv = document.createElement('div');
        newStudentDiv.classList.add('student');
        newStudentDiv.innerHTML = `
            <label>
                <input type="checkbox" name="student" value="${studentName}">
                ${studentName}
            </label>
        `;
        studentsDiv.appendChild(newStudentDiv);
        newStudentInput.value = ''; // Clear input field
    }
}

document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const date = document.getElementById('date').value;
    const lesson = document.getElementById('lesson').value;
    const students = document.querySelectorAll('input[name="student"]:checked');
    
    let studentNames = [];
    students.forEach(student => {
        studentNames.push(`<li>${student.value}</li>`);
    });

    const formattedDate = formatDate(date);

    const submittedInfo = `
Date: ${formattedDate}<br>
Lesson: ${lesson}<br>
Attendance: <ul>${studentNames.join('')}</ul>
    `;

    document.getElementById('submittedInfo').innerHTML = submittedInfo;
});

function copyInfo() {
    const submittedInfo = document.getElementById('submittedInfo');
    const range = document.createRange();
    range.selectNode(submittedInfo);
    window.getSelection().removeAllRanges(); // Clear any previous selections
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert('Attendance information copied!');
}
