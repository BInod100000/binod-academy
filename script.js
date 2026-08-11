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



// =====================================
// CREATE / SAVE EXAM
// =====================================

async function saveExam() {

    const examTitle =
        document.getElementById("examTitle");

    const examSubject =
        document.getElementById("examSubject");

    const examDate =
        document.getElementById("examDate");

    const examDuration =
        document.getElementById("examDuration");

    const totalMarks =
        document.getElementById("totalMarks");

    const examMessage =
        document.getElementById("examMessage");


    // =====================================
    // CHECK ELEMENTS
    // =====================================

    if (
        !examTitle ||
        !examSubject ||
        !examDate ||
        !examDuration ||
        !totalMarks ||
        !examMessage
    ) {

        console.error(
            "Create Exam elements not found."
        );

        return;
    }


    // =====================================
    // GET VALUES
    // =====================================

    const title =
        examTitle.value.trim();

    const subject =
        examSubject.value;

    const date =
        examDate.value;

    const duration =
        Number(examDuration.value);

    const marks =
        Number(totalMarks.value);


    // =====================================
    // CHECK EXAM NAME
    // =====================================

    if (title === "") {

        examMessage.style.color = "red";

        examMessage.textContent =
            "❌ Please enter the exam name.";

        return;
    }


    // =====================================
    // CHECK SUBJECT
    // =====================================

    if (subject === "") {

        examMessage.style.color = "red";

        examMessage.textContent =
            "❌ Please select a subject.";

        return;
    }


    // =====================================
    // CHECK DATE
    // =====================================

    if (date === "") {

        examMessage.style.color = "red";

        examMessage.textContent =
            "❌ Please select the exam date.";

        return;
    }


    // =====================================
    // CHECK DURATION
    // MAXIMUM 180 MINUTES
    // =====================================

    if (
        !duration ||
        duration < 30 ||
        duration > 180
    ) {

        examMessage.style.color = "red";

        examMessage.textContent =
            "❌ Exam duration must be between 30 minutes and 3 hours.";

        return;
    }


    // =====================================
    // CHECK TOTAL MARKS
    // MUST BE 75
    // =====================================

    if (marks !== 75) {

        examMessage.style.color = "red";

        examMessage.textContent =
            "❌ Total marks must be 75.";

        return;
    }


    // =====================================
    // FIXED EXAM INSTRUCTIONS
    // =====================================

    const fixedInstructions = `
🎓 Welcome to Binod Academy!

Dear Student, welcome to your examination.
Stay calm, read every question carefully,
and give your best effort. Believe in yourself! 🌟

📜 Examination Rules:

1. The examination duration is the duration
   selected by the teacher, with a maximum
   of 3 hours.

2. The timer starts only after the student
   clicks START EXAM NOW.

3. The timer cannot be paused once the
   examination starts.

4. Questions will appear only after the
   examination starts.

5. Students should write their answers
   clearly on their answer sheets.

6. Students must upload their answer-sheet
   photos before the examination ends.

7. When the timer reaches 00:00:00,
   the examination closes automatically.

8. Submission after the examination
   deadline will not be accepted.

9. Students should make sure their internet
   connection is stable while submitting.

🍀 All the best!
Give it your best effort! ❤️
`;


    // =====================================
    // SAVE TO SUPABASE
    // =====================================

    examMessage.style.color = "#1565c0";

    examMessage.textContent =
        "⏳ Saving exam...";


    const {
        data,
        error: insertError
    } =
        await supabaseClient

            .from("exams")

            .insert([

                {
                    title:
                        title,

                    subject:
                        subject,

                    exam_date:
                        date,

                    duration_minutes:
                        duration,

                    total_marks:
                        75,

                    instructions:
                        fixedInstructions,

                    status:
                        "draft"
                }

            ])

            .select();


    // =====================================
    // CHECK DATABASE ERROR
    // =====================================

    if (insertError) {

        console.error(
            "Exam save error:",
            insertError
        );

        examMessage.style.color = "red";

        examMessage.textContent =
            "❌ Exam could not be saved. Please try again.";

        return;
    }


    // =====================================
    // SUCCESS
    // =====================================

    console.log(
        "Exam saved successfully:",
        data
    );


    examMessage.style.color = "green";

    examMessage.textContent =
        "✅ Exam saved successfully!";


    alert(
        "✅ Exam created successfully!\n\n" +
        "Exam: " + title + "\n" +
        "Subject: " + subject + "\n" +
        "Total Marks: 75"
    );


    // =====================================
    // CLEAR FORM
    // =====================================

    examTitle.value = "";

    examSubject.value = "";

    examDate.value = "";

    examDuration.value = "";

    totalMarks.value = 75;
}
