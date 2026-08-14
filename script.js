// =====================================
// BINOD ACADEMY - SCRIPT.JS
// =====================================


// =====================================
// STUDENT LOGIN
// =====================================

async function login() {

    const studentId = document.getElementById("studentId");
    const password = document.getElementById("password");
    const error = document.getElementById("error");

    if (!studentId || !password || !error) {
        console.error("Student login elements not found.");
        return;
    }

    const enteredId =
        studentId.value
            .trim()
            .replace(/\s+/g, "")
            .toUpperCase();

    const enteredPassword = password.value;

    if (enteredId === "" || enteredPassword === "") {
        error.textContent =
            "❌ Please enter Student ID and Password.";
        return;
    }

    const {
        data,
        error: supabaseError
    } = await supabaseClient
        .from("students")
        .select("*")
        .eq("student_id", enteredId)
        .eq("password", enteredPassword)
        .maybeSingle();

    if (supabaseError) {
        console.error("Student login error:", supabaseError);

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

    window.location.href = "student.html";
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

    if (!teacherId || !password || !error) {
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
    } = await supabaseClient
        .from("teachers")
        .select("teacher_id, name")
        .eq("teacher_id", enteredTeacherId)
        .eq("password", enteredPassword)
        .maybeSingle();

    if (supabaseError) {
        console.error(
            "Teacher login error:",
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

    window.location.href = "teacher.html";
}


// =====================================
// STUDENT REGISTRATION
// =====================================

async function registerStudent() {

    const studentNameElement =
        document.getElementById("studentName");

    const passwordElement =
        document.getElementById("newPassword");

    const confirmPasswordElement =
        document.getElementById("confirmPassword");

    const error =
        document.getElementById("registerError");

    if (
        !studentNameElement ||
        !passwordElement ||
        !confirmPasswordElement ||
        !error
    ) {
        console.error(
            "Registration elements not found."
        );
        return;
    }

    const studentName =
        studentNameElement.value.trim();

    const password =
        passwordElement.value;

    const confirmPassword =
        confirmPasswordElement.value;

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

    if (password !== confirmPassword) {
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
    } = await supabaseClient
        .from("students")
        .select("student_id")
        .eq("student_id", studentId)
        .maybeSingle();

    if (checkError) {
        console.error(checkError);

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
    } = await supabaseClient
        .from("students")
        .insert([
            {
                student_id: studentId,
                name: studentName.toUpperCase(),
                password: password
            }
        ]);

    if (insertError) {
        console.error(insertError);

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
// MULTIPLE QUESTION PAPER FILES
// =====================================

async function saveExam() {

    console.log(
        "SAVE EXAM FUNCTION STARTED"
    );

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

    const questionPaper =
        document.getElementById("questionPaper");

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
        !questionPaper ||
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


    // IMPORTANT:
    // Get ALL selected files

    const files =
        Array.from(
            questionPaper.files
        );


    // =====================================
    // VALIDATION
    // =====================================

    if (title === "") {

        examMessage.style.color =
            "red";

        examMessage.textContent =
            "❌ Please enter the exam name.";

        return;
    }


    if (subject === "") {

        examMessage.style.color =
            "red";

        examMessage.textContent =
            "❌ Please select a subject.";

        return;
    }


    if (date === "") {

        examMessage.style.color =
            "red";

        examMessage.textContent =
            "❌ Please select the exam date.";

        return;
    }


    if (
        !duration ||
        duration < 30 ||
        duration > 180
    ) {

        examMessage.style.color =
            "red";

        examMessage.textContent =
            "❌ Exam duration must be between 30 minutes and 3 hours.";

        return;
    }


    if (marks !== 75) {

        examMessage.style.color =
            "red";

        examMessage.textContent =
            "❌ Total marks must be 75.";

        return;
    }


    // =====================================
    // CHECK FILES
    // =====================================

    if (files.length === 0) {

        examMessage.style.color =
            "red";

        examMessage.textContent =
            "❌ Please upload at least one question-paper file.";

        return;
    }


    console.log(
        "Number of selected files:",
        files.length
    );


    // =====================================
    // ALLOWED FILE TYPES
    // =====================================

    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png"
    ];


    // =====================================
    // MAX FILE SIZE
    // =====================================

    const maxSize =
        50 * 1024 * 1024;


    // =====================================
    // CHECK EVERY FILE
    // =====================================

    for (
        let i = 0;
        i < files.length;
        i++
    ) {

        const file =
            files[i];


        if (
            !allowedTypes.includes(
                file.type
            )
        ) {

            examMessage.style.color =
                "red";

            examMessage.textContent =
                "❌ Invalid file: " +
                file.name +
                ". Only PDF, JPG, JPEG and PNG are allowed.";

            return;
        }


        if (
            file.size > maxSize
        ) {

            examMessage.style.color =
                "red";

            examMessage.textContent =
                "❌ File too large: " +
                file.name +
                ". Maximum size is 50 MB per file.";

            return;
        }

    }


    // =====================================
    // FIXED INSTRUCTIONS
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


    examMessage.style.color =
        "#1565c0";

    examMessage.textContent =
        "⏳ Creating exam...";


    let examId = null;

    const uploadedPaths = [];


    try {

        // =====================================
        // STEP 1
        // CREATE EXAM
        // =====================================

        console.log(
            "Step 1: Creating exam..."
        );


        const {
            data: examData,
            error: examError
        } =
            await supabaseClient
                .from("exams")
                .insert([
                    {
                        title: title,
                        subject: subject,
                        exam_date: date,
                        duration_minutes: duration,
                        total_marks: 75,
                        instructions: fixedInstructions,
                        status: "draft"
                    }
                ])
                .select()
                .single();


        if (examError) {

            console.error(
                "EXAM INSERT ERROR:",
                examError
            );

            examMessage.style.color =
                "red";

            examMessage.textContent =
                "❌ Exam could not be saved: " +
                examError.message;

            return;
        }


        examId =
            examData.id;


        console.log(
            "Exam created:",
            examData
        );


        // =====================================
        // STEP 2
        // CREATE SAFE TITLE
        // =====================================

        const safeTitle =
            title
                .replace(
                    /[^a-zA-Z0-9]/g,
                    "-"
                )
                .replace(
                    /-+/g,
                    "-"
                )
                .toLowerCase();


        // =====================================
        // STEP 3
        // UPLOAD ALL FILES
        // =====================================

        const uploadedUrls = [];


        for (
            let i = 0;
            i < files.length;
            i++
        ) {

            const file =
                files[i];


            examMessage.textContent =
                "⏳ Uploading question paper " +
                (i + 1) +
                " of " +
                files.length +
                "...";


            console.log(
                "Uploading:",
                file.name
            );


            const extension =
                file.name
                    .split(".")
                    .pop()
                    .toLowerCase();


            const filePath =
                examId +
                "/" +
                safeTitle +
                "-page-" +
                (i + 1) +
                "-" +
                Date.now() +
                "." +
                extension;


            // =====================================
            // UPLOAD FILE
            // =====================================

            const {
                data: uploadData,
                error: uploadError
            } =
                await supabaseClient
                    .storage
                    .from("question-papers")
                    .upload(
                        filePath,
                        file,
                        {
                            cacheControl:
                                "3600",

                            upsert:
                                false,

                            contentType:
                                file.type
                        }
                    );


            if (uploadError) {

                console.error(
                    "UPLOAD ERROR:",
                    uploadError
                );

                throw new Error(
                    "Upload failed for " +
                    file.name +
                    ": " +
                    uploadError.message
                );
            }


            console.log(
                "Upload successful:",
                uploadData
            );


            uploadedPaths.push(
                filePath
            );


            // =====================================
            // GET PUBLIC URL
            // =====================================

            const {
                data: publicUrlData
            } =
                supabaseClient
                    .storage
                    .from(
                        "question-papers"
                    )
                    .getPublicUrl(
                        filePath
                    );


            const publicUrl =
                publicUrlData.publicUrl;


            uploadedUrls.push(
                publicUrl
            );


            console.log(
                "Public URL:",
                publicUrl
            );

        }


        // =====================================
        // STEP 4
        // SAVE ALL URLS IN EXAM
        // =====================================

        examMessage.textContent =
            "⏳ Connecting question papers to exam...";


        const {
            error: updateError
        } =
            await supabaseClient
                .from("exams")
                .update({

                    // Multiple files
                    question_paper_urls:
                        uploadedUrls,

                    // Keep first file in old column
                    // for compatibility
                    question_paper_url:
                        uploadedUrls[0]

                })
                .eq(
                    "id",
                    examId
                );


        if (updateError) {

            console.error(
                "UPDATE ERROR:",
                updateError
            );

            throw new Error(
                "Could not connect question papers to exam: " +
                updateError.message
            );
        }


        // =====================================
        // SUCCESS
        // =====================================

        console.log(
            "EXAM COMPLETELY SAVED!"
        );

        console.log(
            "Question paper URLs:",
            uploadedUrls
        );


        examMessage.style.color =
            "green";

        examMessage.textContent =
            "✅ Exam and " +
            files.length +
            " question-paper file(s) saved successfully!";


        alert(
            "✅ Exam created successfully!\n\n" +
            "Exam: " +
            title +
            "\n" +
            "Subject: " +
            subject +
            "\n" +
            "Total Marks: 75\n\n" +
            "Question-paper pages uploaded: " +
            files.length
        );


        // =====================================
        // CLEAR FORM
        // =====================================

        examTitle.value = "";

        examSubject.value = "";

        examDate.value = "";

        examDuration.value = "";

        totalMarks.value = 75;

        questionPaper.value = "";


        // =====================================
        // GO TO MANAGE EXAMS
        // =====================================

        setTimeout(
            function () {

                window.location.href =
                    "manage-exams.html";

            },
            1000
        );


    } catch (error) {

        console.error(
            "UNEXPECTED ERROR:",
            error
        );


        // =====================================
        // CLEANUP STORAGE
        // =====================================

        if (
            uploadedPaths.length > 0
        ) {

            try {

                await supabaseClient
                    .storage
                    .from(
                        "question-papers"
                    )
                    .remove(
                        uploadedPaths
                    );

            } catch (
                storageError
            ) {

                console.error(
                    "Storage cleanup error:",
                    storageError
                );

            }

        }


        // =====================================
        // DELETE DRAFT EXAM
        // =====================================

        if (examId) {

            try {

                await supabaseClient
                    .from("exams")
                    .delete()
                    .eq(
                        "id",
                        examId
                    );

            } catch (
                deleteError
            ) {

                console.error(
                    "Exam cleanup error:",
                    deleteError
                );

            }

        }


        examMessage.style.color =
            "red";

        examMessage.textContent =
            "❌ Exam could not be completed: " +
            error.message;
    }
}


// =====================================
// MANAGE EXAMS
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const examList =
            document.getElementById(
                "examList"
            );

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
        document.getElementById(
            "examList"
        );

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
            "<p style='color:red;'>❌ Could not load exams.<br>" +
            escapeHtml(
                error.message
            ) +
            "</p>";

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


    examList.innerHTML =
        "";


    exams.forEach(
        function (exam) {

            const card =
                document.createElement(
                    "div"
                );


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


            let statusText =
                "";


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


            // =====================================
            // QUESTION PAPER BUTTONS
            // =====================================

            let questionPaperButton =
                "";


            let questionPaperUrls =
                [];


            if (
                Array.isArray(
                    exam.question_paper_urls
                )
            ) {

                questionPaperUrls =
                    exam.question_paper_urls;

            }


            if (
                questionPaperUrls.length > 0
            ) {

                questionPaperButton =
                    questionPaperUrls
                        .map(
                            function (
                                url,
                                index
                            ) {

                                return `
                                <a
                                    href="${escapeHtml(url)}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button>
                                        📄 View Page ${index + 1}
                                    </button>
                                </a>
                                `;

                            }
                        )
                        .join(" ");


            } else if (
                exam.question_paper_url
            ) {

                questionPaperButton =
                    `
                    <a
                        href="${escapeHtml(
                            exam.question_paper_url
                        )}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button>
                            📄 View Question Paper
                        </button>
                    </a>
                    `;


            } else {

                questionPaperButton =
                    `
                    <p style="color:red;">
                        ⚠️ No question paper uploaded
                    </p>
                    `;

            }


            // =====================================
            // CARD
            // =====================================

            card.innerHTML =
                `

                <h2>
                    📝 ${escapeHtml(
                        exam.title
                    )}
                </h2>

                <p>
                    📚 <strong>Subject:</strong>
                    ${escapeHtml(
                        exam.subject
                    )}
                </p>

                <p>
                    📅 <strong>Date:</strong>
                    ${escapeHtml(
                        exam.exam_date
                    )}
                </p>

                <p>
                    ⏱️ <strong>Duration:</strong>
                    ${durationText}
                </p>

                <p>
                    📊 <strong>Total Marks:</strong>
                    ${exam.total_marks || 75}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${statusText}
                </p>

                <br>

                ${questionPaperButton}

                <br><br>

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
                status: "published"
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
            "❌ Could not publish the exam.\n\n" +
            error.message
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
                status: "draft"
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
            "❌ Could not unpublish the exam.\n\n" +
            error.message
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


    // =====================================
    // GET EXAM FILE INFORMATION
    // =====================================

    const {
        data: exam,
        error: getError
    } =
        await supabaseClient
            .from("exams")
            .select(
                "question_paper_url, question_paper_urls"
            )
            .eq(
                "id",
                examId
            )
            .maybeSingle();


    if (getError) {

        console.error(
            "Get exam error:",
            getError
        );

        alert(
            "❌ Could not find the exam."
        );

        return;
    }


    // =====================================
    // DELETE DATABASE RECORD
    // =====================================

    const {
        error: deleteError
    } =
        await supabaseClient
            .from("exams")
            .delete()
            .eq(
                "id",
                examId
            );


    if (deleteError) {

        console.error(
            "Delete exam error:",
            deleteError
        );

        alert(
            "❌ Could not delete the exam.\n\n" +
            deleteError.message
        );

        return;
    }


    // =====================================
    // DELETE QUESTION PAPER FILES
    // =====================================

    const filesToDelete =
        [];


    // Multiple files
    if (
        Array.isArray(
            exam.question_paper_urls
        )
    ) {

        exam.question_paper_urls.forEach(
            function (url) {

                const filePath =
                    getStorageFilePath(
                        url
                    );

                if (
                    filePath &&
                    !filesToDelete.includes(
                        filePath
                    )
                ) {

                    filesToDelete.push(
                        filePath
                    );

                }

            }
        );

    }


    // Old single-file system
    if (
        exam.question_paper_url
    ) {

        const oldPath =
            getStorageFilePath(
                exam.question_paper_url
            );


        if (
            oldPath &&
            !filesToDelete.includes(
                oldPath
            )
        ) {

            filesToDelete.push(
                oldPath
            );

        }

    }


    // =====================================
    // REMOVE STORAGE FILES
    // =====================================

    if (
        filesToDelete.length > 0
    ) {

        try {

            const {
                error: storageError
            } =
                await supabaseClient
                    .storage
                    .from(
                        "question-papers"
                    )
                    .remove(
                        filesToDelete
                    );


            if (storageError) {

                console.error(
                    "Storage delete error:",
                    storageError
                );

            }

        } catch (
            storageError
        ) {

            console.error(
                "Storage delete error:",
                storageError
            );

        }

    }


    alert(
        "🗑️ Exam deleted successfully."
    );


    loadExams();
}


// =====================================
// GET STORAGE FILE PATH
// =====================================

function getStorageFilePath(
    url
) {

    if (!url) {
        return null;
    }


    const marker =
        "/question-papers/";


    const index =
        url.indexOf(
            marker
        );


    if (
        index === -1
    ) {

        return null;

    }


    return url.substring(
        index + marker.length
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
