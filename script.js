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


    if (title === "") {

        examMessage.style.color = "red";

        examMessage.textContent =
            "❌ Please enter the exam name.";

        return;
    }


    if (subject === "") {

        examMessage.style.color = "red";

        examMessage.textContent =
            "❌ Please select a subject.";

        return;
    }


    if (date === "") {

        examMessage.style.color = "red";

        examMessage.textContent =
            "❌ Please select the exam date.";

        return;
    }


    // Maximum 3 hours
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


    // Total marks fixed at 75
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


    examTitle.value = "";

    examSubject.value = "";

    examDate.value = "";

    examDuration.value = "";

    totalMarks.value = 75;
}



// =====================================
// MANAGE EXAMS - LOAD ON PAGE
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const examList =
            document.getElementById("examList");

        if (examList) {

            loadExams();

        }

    }
);



// =====================================
// LOAD ALL EXAMS
// =====================================

async function loadExams() {

    const examList =
        document.getElementById("examList");


    if (!examList) {

        return;

    }


    examList.innerHTML =
        "<p>⏳ Loading exams...</p>";


    const {
        data: exams,
        error
    } =
        await supabaseClient

            .from("exams")

            .select("*")

            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Load exams error:",
            error
        );

        examList.innerHTML =
            "<p style='color:red;'>❌ Could not load exams.</p>";

        return;
    }


    if (
        !exams ||
        exams.length === 0
    ) {

        examList.innerHTML =
            `
            <div class="card">

                <h2>📭 No Exams Yet</h2>

                <p>
                    You have not created any exams yet.
                </p>

                <br>

                <a href="create-exam.html">
                    <button>
                        ➕ Create First Exam
                    </button>
                </a>

            </div>
            `;

        return;
    }


    examList.innerHTML = "";


    exams.forEach(
        function (exam) {

            const card =
                document.createElement("div");


            card.className =
                "card";


            card.style.width =
                "90%";


            card.style.maxWidth =
                "700px";


            card.style.textAlign =
                "left";


            const durationText =
                formatExamDuration(
                    exam.duration_minutes
                );


            let statusText = "";


            if (
                exam.status ===
                "published"
            ) {

                statusText =
                    "🟢 PUBLISHED";

            } else {

                statusText =
                    "🟡 DRAFT";

            }


            card.innerHTML = `

                <h2>
                    📝 ${escapeHtml(exam.title)}
                </h2>

                <p>
                    📚 <strong>Subject:</strong>
                    ${escapeHtml(exam.subject)}
                </p>

                <p>
                    📅 <strong>Date:</strong>
                    ${escapeHtml(exam.exam_date)}
                </p>

                <p>
                    ⏱️ <strong>Duration:</strong>
                    ${durationText}
                </p>

                <p>
                    📊 <strong>Total Marks:</strong>
                    75
                </p>

                <p>
                    <strong>Status:</strong>
                    ${statusText}
                </p>

                <br>

                ${
                    exam.status ===
                    "published"

                    ?

                    `
                    <button
                        onclick="unpublishExam(${exam.id})"
                    >
                        🔒 Unpublish
                    </button>
                    `

                    :

                    `
                    <button
                        onclick="publishExam(${exam.id})"
                    >
                        🚀 Publish Exam
                    </button>
                    `
                }

                <br><br>

                <button
                    onclick="giveQuestionPaper(${exam.id})"
                >
                    📄 Give Question Paper
                </button>

                <button
                    onclick="deleteExam(${exam.id})"
                    style="margin-left:10px;"
                >
                    🗑️ Delete
                </button>

            `;


            examList.appendChild(
                card
            );

        }
    );

}



// =====================================
// FORMAT EXAM DURATION
// =====================================

function formatExamDuration(
    minutes
) {

    if (minutes === 30) {

        return "30 Minutes";

    }


    if (minutes === 45) {

        return "45 Minutes";

    }


    if (minutes === 60) {

        return "1 Hour";

    }


    if (minutes === 90) {

        return "1 Hour 30 Minutes";

    }


    if (minutes === 120) {

        return "2 Hours";

    }


    if (minutes === 150) {

        return "2 Hours 30 Minutes";

    }


    if (minutes === 180) {

        return "3 Hours";

    }


    return minutes + " Minutes";

}



// =====================================
// PUBLISH EXAM
// =====================================

async function publishExam(
    examId
) {

    const confirmPublish =
        confirm(
            "🚀 Publish this exam?\n\n" +
            "Students will be able to see it after publishing."
        );


    if (!confirmPublish) {

        return;

    }


    const {
        error
    } =
        await supabaseClient

            .from("exams")

            .update({
                status:
                    "published"
            })

            .eq(
                "id",
                examId
            );


    if (error) {

        console.error(
            "Publish error:",
            error
        );

        alert(
            "❌ Could not publish the exam."
        );

        return;
    }


    alert(
        "✅ Exam published successfully!"
    );


    loadExams();

}



// =====================================
// UNPUBLISH EXAM
// =====================================

async function unpublishExam(
    examId
) {

    const confirmUnpublish =
        confirm(
            "🔒 Unpublish this exam?\n\n" +
            "Students will no longer see it as an available exam."
        );


    if (!confirmUnpublish) {

        return;

    }


    const {
        error
    } =
        await supabaseClient

            .from("exams")

            .update({
                status:
                    "draft"
            })

            .eq(
                "id",
                examId
            );


    if (error) {

        console.error(
            "Unpublish error:",
            error
        );

        alert(
            "❌ Could not unpublish the exam."
        );

        return;
    }


    alert(
        "✅ Exam unpublished."
    );


    loadExams();

}



// =====================================
// DELETE EXAM
// =====================================

async function deleteExam(
    examId
) {

    const confirmDelete =
        confirm(
            "⚠️ Delete this exam?\n\n" +
            "This action cannot be undone."
        );


    if (!confirmDelete) {

        return;

    }


    const {
        error
    } =
        await supabaseClient

            .from("exams")

            .delete()

            .eq(
                "id",
                examId
            );


    if (error) {

        console.error(
            "Delete exam error:",
            error
        );

        alert(
            "❌ Could not delete the exam."
        );

        return;
    }


    alert(
        "🗑️ Exam deleted successfully."
    );


    loadExams();

}



// =====================================
// GIVE QUESTION PAPER
// =====================================

async function giveQuestionPaper(
    examId
) {

    // Create file selector
    const fileInput =
        document.createElement(
            "input"
        );


    fileInput.type =
        "file";


    // Allow PDF and image
    fileInput.accept =
        ".pdf,.jpg,.jpeg,.png";


    fileInput.style.display =
        "none";


    document.body.appendChild(
        fileInput
    );


    fileInput.click();


    fileInput.addEventListener(
        "change",
        async function () {

            const file =
                fileInput.files[0];


            if (!file) {

                document.body.removeChild(
                    fileInput
                );

                return;
            }


            // =====================================
            // CHECK FILE SIZE
            // =====================================

            if (
                file.size >
                50 * 1024 * 1024
            ) {

                alert(
                    "❌ File is too large.\n\n" +
                    "Maximum allowed size is 50 MB."
                );


                document.body.removeChild(
                    fileInput
                );


                return;
            }


            alert(
                "⏳ Uploading question paper..."
            );


            // =====================================
            // FILE EXTENSION
            // =====================================

            const fileExtension =
                file.name
                    .split(".")
                    .pop()
                    .toLowerCase();


            // =====================================
            // UNIQUE FILE NAME
            // =====================================

            const filePath =
                "exam-" +
                examId +
                "-" +
                Date.now() +
                "." +
                fileExtension;


            // =====================================
            // UPLOAD TO STORAGE
            // =====================================

            const {
                error: uploadError
            } =
                await supabaseClient
                    .storage
                    .from(
                        "question-papers"
                    )
                    .upload(
                        filePath,
                        file,
                        {
                            upsert: true
                        }
                    );


            if (uploadError) {

                console.error(
                    "Question paper upload error:",
                    uploadError
                );


                alert(
                    "❌ Question paper could not be uploaded."
                );


                document.body.removeChild(
                    fileInput
                );


                return;
            }


            // =====================================
            // GET PUBLIC URL
            // =====================================

            const {
                data: publicData
            } =
                supabaseClient
                    .storage
                    .from(
                        "question-papers"
                    )
                    .getPublicUrl(
                        filePath
                    );


            const questionPaperUrl =
                publicData.publicUrl;


            // =====================================
            // SAVE URL TO EXAM
            // =====================================

            const {
                error: updateError
            } =
                await supabaseClient

                    .from("exams")

                    .update({

                        question_paper_url:
                            questionPaperUrl

                    })

                    .eq(
                        "id",
                        examId
                    );


            if (updateError) {

                console.error(
                    "Question paper URL error:",
                    updateError
                );


                alert(
                    "❌ File uploaded, but the exam could not be updated.\n\n" +
                    "Check that the exams table contains the " +
                    "question_paper_url column."
                );


                document.body.removeChild(
                    fileInput
                );


                return;
            }


            // =====================================
            // SUCCESS
            // =====================================

            alert(
                "✅ Question paper added successfully!"
            );


            document.body.removeChild(
                fileInput
            );


            loadExams();

        }
    );

}



// =====================================
// SAFELY DISPLAY TEXT
// =====================================

function escapeHtml(
    text
) {

    if (
        text === null ||
        text === undefined
    ) {

        return "";

    }


    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
