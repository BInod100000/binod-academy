// =====================================
// BINOD ACADEMY - LOGIN
// =====================================

async function login() {

    const studentId = document.getElementById("studentId");
    const teacherId = document.getElementById("teacherId");
    const password = document.getElementById("password");
    const error = document.getElementById("error");


    // =====================================
    // STUDENT LOGIN
    // =====================================

    if (studentId) {

        const enteredId = studentId.value
            .trim()
            .replace(/\s+/g, "")
            .toUpperCase();

        const enteredPassword = password.value;


        if (enteredId === "" || enteredPassword === "") {

            error.textContent =
                "❌ Please enter Student ID and Password.";

            return;
        }


        const { data, error: supabaseError } =
            await supabaseClient
                .from("students")
                .select("*")
                .eq("student_id", enteredId)
                .eq("password", enteredPassword)
                .single();


        if (supabaseError || !data) {

            console.log(supabaseError);

            error.textContent =
                "❌ Student ID or Password is incorrect.";

            return;
        }


        // Login successful

        localStorage.setItem(
            "loggedInStudent",
            data.student_id
        );

        window.location.href = "student.html";

        return;
    }


    // =====================================
    // TEACHER LOGIN
    // =====================================

    if (teacherId) {

        const enteredTeacherId =
            teacherId.value.trim();

        const enteredPassword =
            password.value;


        if (
            enteredTeacherId === "teacher01" &&
            enteredPassword === "1234"
        ) {

            window.location.href =
                "teacher.html";

        } else {

            error.textContent =
                "❌ Invalid Teacher ID or Password";

        }

        return;
    }
}



// =====================================
// STUDENT REGISTRATION
// =====================================

function registerStudent() {

    const studentName =
        document
            .getElementById("studentName")
            .value
            .trim();

    const password =
        document
            .getElementById("newPassword")
            .value;

    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;

    const error =
        document
            .getElementById("registerError");


    // CHECK NAME

    if (studentName === "") {

        error.textContent =
            "❌ Please enter your full name.";

        return;
    }


    // CHECK PASSWORD

    if (
        password === "" ||
        confirmPassword === ""
    ) {

        error.textContent =
            "❌ Please enter your password twice.";

        return;
    }


    // CHECK PASSWORD MATCH

    if (password !== confirmPassword) {

        error.textContent =
            "❌ Passwords do not match.";

        return;
    }


    // CREATE STUDENT ID

    const studentId =
        studentName
            .replace(/\s+/g, "")
            .toUpperCase();


    // TEMPORARY CHECK

    const existingStudent =
        localStorage.getItem(
            "student_" + studentId
        );


    if (existingStudent) {

        error.textContent =
            "❌ This student is already registered.";

        return;
    }


    // CREATE STUDENT

    const student = {

        studentId: studentId,

        name: studentName,

        password: password

    };


    // TEMPORARY LOCAL STORAGE

    localStorage.setItem(
        "student_" + studentId,
        JSON.stringify(student)
    );


    alert(
        "✅ Account created successfully!\n\n" +
        "Your Student ID is: " +
        studentId
    );


    window.location.href =
        "student-login.html";
}
