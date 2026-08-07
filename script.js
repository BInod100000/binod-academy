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

    const studentId = document.getElementById("newStudentId").value.trim();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const error = document.getElementById("registerError");

    if (studentId === "" || password === "" || confirmPassword === "") {

        error.textContent = "❌ Please fill in all fields.";
        return;
    }

    if (password !== confirmPassword) {

        error.textContent = "❌ Passwords do not match.";
        return;
    }

    const existingStudent = localStorage.getItem("student_" + studentId);

    if (existingStudent) {

        error.textContent = "❌ This Student ID is already registered.";
        return;
    }

    const student = {
        studentId: studentId,
        password: password
    };

    localStorage.setItem(
        "student_" + studentId,
        JSON.stringify(student)
    );

    alert("✅ Account created successfully!");

    window.location.href = "student-login.html";
}
