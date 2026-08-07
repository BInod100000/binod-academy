function login() {

    const studentId = document.getElementById("studentId");
    const teacherId = document.getElementById("teacherId");
    const password = document.getElementById("password");
    const error = document.getElementById("error");

    // STUDENT LOGIN
    if (studentId) {

        if (studentId.value === "student01" && password.value === "1234") {

            window.location.href = "student.html";

        } else {

            error.textContent = "❌ Invalid Student ID or Password";

        }
    }

    // TEACHER LOGIN
    if (teacherId) {

        if (teacherId.value === "teacher01" && password.value === "1234") {

            window.location.href = "teacher.html";

        } else {

            error.textContent = "❌ Invalid Teacher ID or Password";

        }
    }
}
