// =====================================
// BINOD ACADEMY - SCRIPT.JS
// =====================================


// =====================================
// STUDENT LOGIN
// =====================================

async function login() {

    const studentId =
        document.getElementById("studentId");

    const password =
        document.getElementById("password");

    const error =
        document.getElementById("error");


    if (!studentId || !password || !error) {

        console.error(
            "Student login elements not found."
        );

        return;
    }


    const enteredId =
        studentId.value
            .trim()
            .replace(/\s+/g, "")
            .toUpperCase();

    const enteredPassword =
        password.value;


    if (
        enteredId === "" ||
        enteredPassword === ""
    ) {

        error.textContent =
            "❌ Please enter Student ID and Password.";

        return;
    }


    const {
        data,
        error: supabaseError
    } =
        await supabaseClient

            .from("students")

            .select("*")

            .eq(
                "student_id",
                enteredId
            )

            .eq(
                "password",
                enteredPassword
            )

            .maybeSingle();


    console.log(
        "Student result:",
        data
    );

    console.log(
        "Student error:",
        supabaseError
    );


    if (supabaseError) {

        console.error(
            supabaseError
        );

        error.textContent =
            "❌ Database error. Please try again.";

        return;
    }


    if (!data) {

        error.textContent =
            "❌ Student ID or Password is incorrect.";

        return;
    }


    localStorage.setItem(
        "loggedInStudent",
        data.student_id
    );


    window.location.href =
        "student.html";
}



// =====================================
// TEACHER LOGIN
// =====================================

async function teacherLogin() {

    const teacherId =
        document.getElementById("teacherId");

    const password =
        document.getElementById("teacherPassword");

    const error =
        document.getElementById("teacherError");


    if (
        !teacherId ||
        !password ||
        !error
    ) {

        console.error(
            "Teacher login elements not found."
        );

        return;
    }


    const enteredTeacherId =
        teacherId.value
            .trim()
            .toUpperCase();

    const enteredPassword =
        password.value;


    if (
        enteredTeacherId === "" ||
        enteredPassword === ""
    ) {

        error.textContent =
            "❌ Please enter Teacher ID and Password.";

        return;
    }


    const {
        data,
        error: supabaseError
    } =
        await supabaseClient

            .from("teachers")

            .select("teacher_id, name")

            .eq(
                "teacher_id",
                enteredTeacherId
            )

            .eq(
                "password",
                enteredPassword
            )

            .maybeSingle();


    console.log(
        "Teacher result:",
        data
    );

    console.log(
        "Teacher error:",
        supabaseError
    );


    if (supabaseError) {

        console.error(
            supabaseError
        );

        error.textContent =
            "❌ Database error. Please try again.";

        return;
    }


    if (!data) {

        error.textContent =
            "❌ Invalid Teacher ID or Password.";

        return;
    }


    localStorage.setItem(
        "loggedInTeacher",
        data.teacher_id
    );


    localStorage.setItem(
        "teacherName",
        data.name
    );


    window.location.href =
        "teacher.html";
}



// =====================================
// STUDENT REGISTRATION
// =====================================

async function registerStudent() {

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


    if (studentName === "") {

        error.textContent =
            "❌ Please enter your full name.";

        return;
    }


    if (
        password === "" ||
        confirmPassword === ""
    ) {

        error.textContent =
            "❌ Please enter your password twice.";

        return;
    }


    if (
        password !== confirmPassword
    ) {

        error.textContent =
            "❌ Passwords do not match.";

        return;
    }


    const studentId =
        studentName
            .replace(/\s+/g, "")
            .toUpperCase();


    const {
        data: existingStudent,
        error: checkError
    } =
        await supabaseClient

            .from("students")

            .select("student_id")

            .eq(
                "student_id",
                studentId
            )

            .maybeSingle();


    if (checkError) {

        console.error(
            checkError
        );

        error.textContent =
            "❌ Database error. Please try again.";

        return;
    }


    if (existingStudent) {

        error.textContent =
            "❌ This student is already registered.";

        return;
    }


    const {
        error: insertError
    } =
        await supabaseClient

            .from("students")

            .insert([

                {
                    student_id:
                        studentId,

                    name:
                        studentName.toUpperCase(),

                    password:
                        password
                }

            ]);


    if (insertError) {

        console.error(
            insertError
        );

        error.textContent =
            "❌ Registration failed. Please try again.";

        return;
    }


    alert(
        "✅ Account created successfully!\n\n" +
        "Your Student ID is:\n" +
        studentId
    );


    window.location.href =
        "student-login.html";
}
