function login() {

    const studentId = document.getElementById("studentId");
    const teacherId = document.getElementById("teacherId");
    const password = document.getElementById("password");
    const error = document.getElementById("error");

    // STUDENT LOGIN
    if (studentId) {

        const enteredId = studentId.value
            .trim()
            .replace(/\s+/g, "")
            .toUpperCase();

        const enteredPassword = password.value;

        const savedStudent =
            localStorage.getItem("student_" + enteredId);

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

        return;
    }

    // TEACHER LOGIN
    if (teacherId) {

        const enteredTeacherId =
            teacherId.value.trim();

        const enteredPassword =
            password.value;

        if (
            enteredTeacherId === "teacher01" &&
            enteredPassword === "1234"
        ) {

            window.location.href = "teacher.html";

        } else {

            error.textContent =
                "❌ Invalid Teacher ID or Password";

        }

        return;
    }
}


function registerStudent() {

    const studentName = document
        .getElementById("studentName")
        .value
        .trim();

    const password =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const error =
        document.getElementById("registerError");


    if (studentName === "") {

        error.textContent =
            "❌ Please enter your full name.";

        return;
    }


    if (password === "" || confirmPassword === "") {

        error.textContent =
            "❌ Please enter your password twice.";

        return;
    }


    if (password !== confirmPassword) {

        error.textContent =
            "❌ Passwords do not match.";

        return;
    }


    const studentId = studentName
        .replace(/\s+/g, "")
        .toUpperCase();


    const existingStudent =
        localStorage.getItem("student_" + studentId);

    if (existingStudent) {

        error.textContent =
            "❌ This student is already registered.";

        return;
    }


    const student = {

        studentId: studentId,
        name: studentName,
        password: password

    };


    localStorage.setItem(
        "student_" + studentId,
        JSON.stringify(student)
    );


    alert(
        "✅ Account created successfully!\n\n" +
        "Your Student ID is: " +
        studentId
    );


    window.location.href = "student-login.html";
}
