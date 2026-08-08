function login() {

    const studentId = document.getElementById("studentId");
    const teacherId = document.getElementById("teacherId");
    const password = document.getElementById("password");
    const error = document.getElementById("error");

    // STUDENT LOGIN
    if (studentId) {

        const enteredId = studentId.value.trim();
        const enteredPassword = password.value;

        const savedStudent = localStorage.getItem("student_" + enteredId);

        if (savedStudent) {

            const student = JSON.parse(savedStudent);

            if (student.password === enteredPassword) {

                window.location.href = "student.html";

            } else {

                error.textContent = "❌ Incorrect Password";

            }

        } else {

            error.textContent = "❌ Student ID not found";

        }
    }

    // TEACHER LOGIN
    if (teacherId) {

        const enteredTeacherId = teacherId.value.trim();
        const enteredPassword = password.value;

        // Temporary teacher account
        if (
            enteredTeacherId === "teacher01" &&
            enteredPassword === "1234"
        ) {

            window.location.href = "teacher.html";

        } else {

            error.textContent = "❌ Invalid Teacher ID or Password";

        }
    }
}
function registerStudent() {

    const studentName = document.getElementById("studentName").value.trim();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const error = document.getElementById("registerError");

    // Check name
    if (studentName === "") {
        error.textContent = "❌ Please enter your full name.";
        return;
    }

    // Check password
    if (password === "" || confirmPassword === "") {
        error.textContent = "❌ Please enter your password twice.";
        return;
    }

    // Check passwords
    if (password !== confirmPassword) {
        error.textContent = "❌ Passwords do not match.";
        return;
    }

    // Create Student ID from name
    const studentId = studentName
        .replace(/\s+/g, "")
        .toUpperCase();

    // Check whether name/ID already exists
    const existingStudent = localStorage.getItem("student_" + studentId);

    if (existingStudent) {
        error.textContent = "❌ This student is already registered.";
        return;
    }

    // Create student account
    const student = {
        studentId: studentId,
        name: studentName,
        password: password
    };

    // Save account
    localStorage.setItem(
        "student_" + studentId,
        JSON.stringify(student)
    );

    alert(
        "✅ Account created successfully!\n\nYour Student ID is: " +
        studentId
    );

    // Go to login page
    window.location.href = "student-login.html";
}


