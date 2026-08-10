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


    // Make sure this function is being used
    // only on the student login page.

    if (!studentId) {

        return;

    }


    const enteredId =
        studentId.value
            .trim()
            .replace(/\s+/g, "")
            .toUpperCase();


    const enteredPassword =
        password.value;


    // Empty fields

    if (
        enteredId === "" ||
        enteredPassword === ""
    ) {

        error.textContent =
            "❌ Please enter Student ID and Password.";

        return;

    }


    // Search student in Supabase

    const {
        data,
        error: supabaseError
    } =
        await supabaseClient

            .from("students")

            .select("*")

            .eq("student_id", enteredId)

            .eq("password", enteredPassword)

            .maybeSingle();


    console.log(
        "Student result:",
        data
    );

    console.log(
        "Student error:",
        supabaseError
    );


    // Database error

    if (supabaseError) {

        console.error(
            supabaseError
        );

        error.textContent =
            "❌ Database error. Please try again.";

        return;

    }


    // Student not found

    if (!data) {

        error.textContent =
            "❌ Student ID or Password is incorrect.";

        return;

    }


    // Successful login

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


    // Safety check

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


    // Get values

    const enteredTeacherId =
        teacherId.value
            .trim()
            .toUpperCase();


    const enteredPassword =
        password.value;


    // Empty fields

    if (
        enteredTeacherId === "" ||
        enteredPassword === ""
    ) {

        error.textContent =
            "❌ Please enter Teacher ID and Password.";

        return;

    }


    // =================================
    // CHECK TEACHER IN SUPABASE
    // =================================

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


    // Show result in browser console
    // for debugging

    console.log(
        "Teacher result:",
        data
    );

    console.log(
        "Teacher error:",
        supabaseError
    );


    // Database error

    if (supabaseError) {

        console.error(
            supabaseError
        );

        error.textContent =
            "❌ Database error. Please try again.";

        return;

    }


    // Teacher not found

    if (!data) {

        error.textContent =
            "❌ Invalid Teacher ID or Password.";

        return;

    }


    // =================================
    // SUCCESSFUL TEACHER LOGIN
    // =================================

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


    // =================================
    // CHECK NAME
    // =================================

    if (studentName === "") {

        error.textContent =
            "❌ Please enter your full name.";

        return;

    }


    // =================================
    // CHECK PASSWORD
    // =================================

    if (
        password === "" ||
        confirmPassword === ""
    ) {

        error.textContent =
            "❌ Please enter your password twice.";

        return;

    }


    // =================================
    // CHECK PASSWORD MATCH
    // =================================

    if (
        password !== confirmPassword
    ) {

        error.textContent =
            "❌ Passwords do not match.";

        return;

    }


    // =================================
    // CREATE STUDENT ID
    // =================================

    const studentId =
        studentName

            .replace(/\s+/g, "")

            .toUpperCase();


    // =================================
    // CHECK EXISTING STUDENT
    // =================================

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


    // Already registered

    if (existingStudent) {

        error.textContent =
            "❌ This student is already registered.";

        return;

    }


    // =================================
    // INSERT STUDENT
    // =================================

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


    // Registration error

    if (insertError) {

        console.error(
            insertError
        );

        error.textContent =
            "❌ Registration failed. Please try again.";

        return;

    }


    // =================================
    // SUCCESS
    // =================================

    alert(

        "✅ Account created successfully!\n\n" +

        "Your Student ID is:\n" +

        studentId

    );


    window.location.href =
        "student-login.html";

}
