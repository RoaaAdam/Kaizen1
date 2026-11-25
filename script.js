document.addEventListener('DOMContentLoaded', () => {
    
    /* ================== البيانات الأساسية ================== */
    let appData = JSON.parse(localStorage.getItem('uofkStudyData')) || {};
    for(let i=1; i<=10; i++) { if(!appData[i]) appData[i] = { subjects: [] }; }
    if(!appData.todos) appData.todos = [];
    if(!appData.journals) appData.journals = [];
    if(!appData.pdfNotes) appData.pdfNotes = [];
    if(!appData.videoNotes) appData.videoNotes = [];
    if(!appData.examSubjects) appData.examSubjects = []; 
    if(!appData.planning) appData.planning = { plans: [] }; 
    if(!appData.settings) {
        appData.settings = {
            lang: 'ar', soundEnabled: true, profileName: 'اسمك',
            profileImg: 'https://api.dicebear.com/7.x/adventurer/svg?seed=UofKStudent&backgroundColor=b39ddb',
           bgImage: '', bgOpacity: 0.05, quoteType: 'rotate',
            quotes: ["النجاح هو مجموع جهود صغيرة تتكرر يوماً بعد يوم.", "لا تحلم بالنجاح، بل اعمل من أجله.", "مشوار الألف ميل يبدأ بخطوة."]
        };
    }

    function saveData() { localStorage.setItem('uofkStudyData', JSON.stringify(appData)); }

    /* ================== الأصوات ================== */
    const clickSound = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
    const successSound = 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3';
    function playSound(url, vol = 0.5) { if(!appData.settings.soundEnabled) return; const audio = new Audio(url); audio.volume = vol; audio.play().catch(e => console.log("تفاعل مطلوب")); }

    /* ================== الترجمة ================== */
    const translations = {
        ar: { settings: "الإعدادات", appSettings: "التطبيق", language: "اللغة", sounds: "تفعيل الأصوات", appearance: "المظهر والخلفية", bgImage: "صورة خلفية", upload: "رفع", bgOpacity: "شفافية الخلفية", removeBg: "إزالة صورة الخلفية", profile: "الحساب الشخصي", name: "الاسم", quotes: "العبارات التحفيزية", quoteType: "نوع العرض", rotate: "متغيرة", static: "ثابتة", quotesHint: "اكتبي عباراتك (كل عبارة في سطر)", saveSettings: "حفظ التغييرات", semesters: "السمسترات", lessons: "الدروس", todoList: "المهام", active: "النشطة", completed: "المكتملة", pomodoro: "البومودورو", ready: "جاهز", start: "ابدأ", focus: "التركيز", journal: "يومياتي", edit: "التحرير", pdfReader: "قارئ كتب", videoPlayer: "مشغل فيديو", uploadPdf: "اضغطي لرفع ملف PDF", uploadVideo: "اضغطي لرفع فيديو", games: "الترفيه", gameMemory: "مطابقة الذاكرة", gameReaction: "رد الفعل", gameGuess: "تخمين الرقم", gameMath: "الرياضيات", gameTyping: "الكتابة", playAgain: "إعادة اللعب", reactionHint: "اضغطي بمجرد تحول المربع للأخضر", guessHint: "خمني رقماً بين 1 و 100", check: "تحقق", backToGames: "العودة للألعاب", addSubject: "إضافة مادة", doctor: "الدكتور", cancel: "إلغاء", save: "حفظ", addLesson: "إضافة درس", lessonName: "اسم الدرس", understanding: "نسبة الفهم (%)", exercises: "تم التمارين؟", reviewed: "تمت المراجعة؟", lessonNote: "ملاحظة الدرس", addTask: "إضافة مهمة", taskName: "المهمة", deadline: "تاريخ ووقت الانتهاء", importance: "الأهمية", pomoSettings: "إعدادات البومودورو", duration: "المدة", alertSound: "التنبيه", apply: "تطبيق", newJournal: "تدوينة جديدة", date: "التاريخ", journalTitle: "عنوان اليومية", journalText: "ماذا حدث اليوم؟", addImage: "إضافة صورة", addAudio: "إضافة تسجيل صوتي", addNote: "إضافة ملاحظة", noteText: "الملاحظة", note: "ملاحظة", close: "إغلاق", export: "تصدير", subject: "المواد", todo: "تودو ليست", editCard: "تحرير", gamesCard: "ترفيه", exams: "الامتحانات", planning: "التخطيط", noSubjects: "لا توجد مواد.", noLessons: "لا توجد دروس.", noTasks: "لا توجد مهام.", noJournals: "لا توجد تدوينات.", noNotes: "لا توجد ملاحظات.", focusModeExit: "رجوع", lessonNoteEmpty: "لا توجد ملاحظة لهذا الدرس.", noExams: "لا توجد امتحانات مضافة بعد.", midterm: "ميد تيرم", final: "امتحان نهائي", quiz: "اختبار قصير", other: "أخرى" },
        en: { settings: "Settings", appSettings: "App Settings", language: "Language", sounds: "Enable Sounds", appearance: "Appearance", bgImage: "Background Image", upload: "Upload", bgOpacity: "Opacity", removeBg: "Remove Bg", profile: "Profile", name: "Name", quotes: "Quotes", quoteType: "Display Type", rotate: "Rotating", static: "Static", quotesHint: "Write quotes (one per line)", saveSettings: "Save Settings", semesters: "Semesters", lessons: "Lessons", todoList: "Todo List", active: "Active", completed: "Completed", pomodoro: "Pomodoro", ready: "Ready", start: "Start", focus: "Focus", journal: "Journal", edit: "Edit", pdfReader: "PDF Reader", videoPlayer: "Video Player", uploadPdf: "Upload PDF", uploadVideo: "Upload Video", games: "Games", gameMemory: "Memory", gameReaction: "Reaction", gameGuess: "Guess", gameMath: "Math", gameTyping: "Typing", playAgain: "Play Again", reactionHint: "Click when green", guessHint: "Guess 1-100", check: "Check", backToGames: "Back", addSubject: "Add Subject", doctor: "Doctor", cancel: "Cancel", save: "Save", addLesson: "Add Lesson", lessonName: "Lesson Name", understanding: "Understanding (%)", exercises: "Exercises Done?", reviewed: "Reviewed?", lessonNote: "Lesson Note", addTask: "Add Task", taskName: "Task Name", deadline: "Deadline", importance: "Importance", pomoSettings: "Pomodoro Settings", duration: "Duration", alertSound: "Alert Sound", apply: "Apply", newJournal: "New Journal", date: "Date", journalTitle: "Journal Title", journalText: "What happened?", addImage: "Add Image", addAudio: "Add Audio", addNote: "Add Note", noteText: "Note", note: "Note", close: "Close", export: "Export", subject: "Subjects", todo: "Todo List", editCard: "Edit", gamesCard: "Games", exams: "Exams", planning: "Planning", noSubjects: "No subjects.", noLessons: "No lessons.", noTasks: "No tasks.", noJournals: "No journals.", noNotes: "No notes.", focusModeExit: "Back", lessonNoteEmpty: "No note for this lesson.", noExams: "No exams added yet.", midterm: "Midterm", final: "Final Exam", quiz: "Quiz", other: "Other" }
    };

    function applyLanguage(lang) {
        const t = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(t[key]) el.innerText = t[key];
        });
        if(lang === 'en') {
            document.getElementById('examFileType').innerHTML = `<option value="Final">Final Exam</option><option value="Quiz">Quiz</option><option value="Midterm">Midterm</option><option value="Other">Other (Type manually)</option>`;
        } else {
            document.getElementById('examFileType').innerHTML = `<option value="امتحان نهائي">امتحان نهائي</option><option value="اختبار قصير">اختبار قصير</option><option value="ميد تيرم">ميد تيرم</option><option value="أخرى">أخرى (اكتب يدوياً)</option>`;
        }
    }

    function applySettings() {
        const s = appData.settings;
        if(s.lang === 'en') document.body.classList.add('lang-en');
        else document.body.classList.remove('lang-en');
        document.getElementById('settingsLang').value = s.lang;
        applyLanguage(s.lang);
        document.getElementById('settingsSound').checked = s.soundEnabled;
        document.getElementById('displayProfileName').innerText = s.profileName;
        document.getElementById('profileImg').src = s.profileImg;
        document.getElementById('settingsName').value = s.profileName;
        if(s.bgImage) {
            document.documentElement.style.setProperty('--app-bg-image', `url(${s.bgImage})`);
            document.documentElement.style.setProperty('--app-bg-opacity', s.bgOpacity);
        } else {
            document.documentElement.style.setProperty('--app-bg-image', `url('https://upload.wikimedia.org/wikipedia/en/2/2f/University_of_Khartoum_logo.png')`);
            document.documentElement.style.setProperty('--app-bg-opacity', s.bgOpacity);
        }
        document.getElementById('settingsBgOpacity').value = s.bgOpacity;
        document.getElementById('settingsQuoteType').value = s.quoteType;
        document.getElementById('settingsQuotes').value = s.quotes.join('\n');
        updateQuoteDisplay();
    }

    /* ================== العبارات ================== */
    let quoteInterval = null, currentQuoteIndex = 0;
    function updateQuoteDisplay() {
        const s = appData.settings;
        const qt = document.getElementById('quoteText');
        if(quoteInterval) clearInterval(quoteInterval);
        if(s.quotes.length === 0) { qt.innerText = "Add quotes!"; return; }
        if(s.quoteType === 'static') { qt.innerText = s.quotes[0]; }
        else {
            qt.innerText = s.quotes[currentQuoteIndex];
            quoteInterval = setInterval(() => {
                qt.style.opacity = 0;
                setTimeout(() => { currentQuoteIndex = (currentQuoteIndex + 1) % s.quotes.length; qt.innerText = s.quotes[currentQuoteIndex]; qt.style.opacity = 1; }, 500);
            }, 6000);
        }
    }

    /* ================== التنقل ================== */
    let currentSemester = null, currentSubjectId = null;
    let currentEditType = '', currentNoteType = '', currentVideoTime = 0;
    let editingLessonId = null;
    let currentPlan = null, currentMonth = null, currentWeek = null, currentDay = null;
    let currentPlanningLevel = 'plans';
    let currentExamSubjectIdVar = null;
    let currentExamFileBase64 = null;
    
    function showScreen(screenId) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(screenId).classList.add('active'); window.scrollTo(0,0); document.body.classList.remove('focus-mode'); }
    function closeModal(modalId) { document.getElementById(modalId).classList.remove('active'); playSound(clickSound); }

    /* ================== ربط الأزرار الأساسية ================== */
    document.getElementById('btn-settings')?.addEventListener('click', () => { playSound(clickSound); showScreen('screen-settings'); });
    document.getElementById('btn-back-settings')?.addEventListener('click', () => showScreen('screen-home'));
    document.getElementById('btn-semesters')?.addEventListener('click', openSemesters);
    document.getElementById('btn-back-semesters')?.addEventListener('click', () => showScreen('screen-home'));
    document.getElementById('btn-back-subjects')?.addEventListener('click', openSemesters);
    document.getElementById('btn-back-lessons')?.addEventListener('click', () => openSubjects(currentSemester));
    document.getElementById('btn-todo')?.addEventListener('click', openTodo);
    document.getElementById('btn-back-todo')?.addEventListener('click', () => showScreen('screen-home'));
    document.getElementById('btn-pomodoro')?.addEventListener('click', openPomodoro);
    document.getElementById('btn-back-pomodoro')?.addEventListener('click', exitPomodoro);
    document.getElementById('btn-journal')?.addEventListener('click', openJournal);
    document.getElementById('btn-back-journal')?.addEventListener('click', () => showScreen('screen-home'));
    document.getElementById('btn-back-journal-detail')?.addEventListener('click', () => showScreen('screen-journal'));
    document.getElementById('btn-edit-hub')?.addEventListener('click', openEditHub);
    document.getElementById('btn-back-edit-hub')?.addEventListener('click', () => showScreen('screen-home'));
    document.getElementById('btn-games')?.addEventListener('click', openGames);
    document.getElementById('btn-back-games')?.addEventListener('click', () => showScreen('screen-home'));
    document.getElementById('btn-exams')?.addEventListener('click', openExams);
    document.getElementById('btn-back-exams')?.addEventListener('click', () => showScreen('screen-home'));
    document.getElementById('btn-back-exam-files')?.addEventListener('click', openExams);
    document.getElementById('btn-planning')?.addEventListener('click', openPlanning);
    document.getElementById('btn-back-planning')?.addEventListener('click', goBackPlanning);

    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('profileImgContainer')?.addEventListener('click', () => document.getElementById('profileImgUpload').click());
    document.getElementById('profileImgUpload')?.addEventListener('change', changeProfileImg);
    document.getElementById('settingsLang')?.addEventListener('change', changeLanguage);
    document.getElementById('settingsSound')?.addEventListener('change', toggleSoundSetting);
    document.getElementById('settingsBgImg')?.addEventListener('change', changeBgImage);
    document.getElementById('settingsBgOpacity')?.addEventListener('change', changeBgOpacity);
    document.getElementById('btn-reset-bg')?.addEventListener('click', resetBackground);
    document.getElementById('settingsName')?.addEventListener('change', changeName);
    document.getElementById('settingsQuoteType')?.addEventListener('change', toggleQuoteType);
    document.getElementById('settingsQuotes')?.addEventListener('change', saveQuotes);
    document.getElementById('btn-save-settings')?.addEventListener('click', saveAllSettings);
    
    document.getElementById('btn-subject-layout')?.addEventListener('click', () => { appData.settings.subjectLayout = appData.settings.subjectLayout === 'list' ? 'grid' : 'list'; saveData(); renderSubjects(); });
    document.getElementById('btn-add-subject')?.addEventListener('click', openSubjectModal);
    document.getElementById('btn-close-subject-modal')?.addEventListener('click', () => closeModal('subjectModal'));
    document.getElementById('btn-save-subject')?.addEventListener('click', saveSubject);
    document.getElementById('btn-add-lesson')?.addEventListener('click', openLessonModal);
    document.getElementById('btn-close-lesson-modal')?.addEventListener('click', () => closeModal('lessonModal'));
    document.getElementById('btn-save-lesson')?.addEventListener('click', () => { saveLesson(); syncLessonPts(); });
    
    document.getElementById('tab-active')?.addEventListener('click', () => switchTodoTab('active'));
    document.getElementById('tab-completed')?.addEventListener('click', () => switchTodoTab('completed'));
    document.getElementById('btn-add-todo')?.addEventListener('click', openTodoModal);
    document.getElementById('btn-close-todo-modal')?.addEventListener('click', () => closeModal('todoModal'));
    document.getElementById('btn-save-todo')?.addEventListener('click', saveTodo);
    
    document.getElementById('btn-pomo-setup')?.addEventListener('click', openPomoSetup);
    document.getElementById('btn-close-pomo-setup')?.addEventListener('click', () => closeModal('pomoSetupModal'));
    document.getElementById('btn-apply-pomo-setup')?.addEventListener('click', applyPomoSetup);
    document.getElementById('pomoStartBtn')?.addEventListener('click', togglePomodoro);
    document.getElementById('btn-focus-mode')?.addEventListener('click', toggleFocusMode);
    document.getElementById('btn-preview-sound')?.addEventListener('click', previewSound);
    
    document.getElementById('btn-add-journal')?.addEventListener('click', openJournalModal);
    document.getElementById('btn-close-journal-modal')?.addEventListener('click', () => closeModal('journalModal'));
    document.getElementById('btn-save-journal')?.addEventListener('click', saveJournal);
    
    document.getElementById('btn-edit-video')?.addEventListener('click', () => openEditSection('video'));
    document.getElementById('btn-edit-pdf')?.addEventListener('click', () => openEditSection('pdf'));
    document.getElementById('btn-close-editor')?.addEventListener('click', closeFullscreenEditor);
    document.getElementById('btn-export-notes')?.addEventListener('click', exportNotes);
    document.getElementById('videoUploadArea')?.addEventListener('click', () => document.getElementById('videoUpload').click());
    document.getElementById('videoUpload')?.addEventListener('change', handleVideoUpload);
    document.getElementById('btn-close-video')?.addEventListener('click', closeCurrentVideo);
    document.getElementById('btn-video-note')?.addEventListener('click', () => toggleInlineNote('video'));
    document.getElementById('btn-video-snapshot')?.addEventListener('click', takeSnapshot);
    document.getElementById('btn-video-trim')?.addEventListener('click', trimVideoPrompt);
    document.getElementById('btn-video-speed')?.addEventListener('click', toggleVideoSpeed);
    document.getElementById('btn-video-translate')?.addEventListener('click', toggleVideoTranslate);
    document.getElementById('btn-save-video-note')?.addEventListener('click', () => saveInlineNote('video'));
    document.getElementById('pdfUploadArea')?.addEventListener('click', () => document.getElementById('pdfUpload').click());
    document.getElementById('pdfUpload')?.addEventListener('change', handlePdfUpload);
    document.getElementById('btn-close-pdf')?.addEventListener('click', closeCurrentPdf);
    document.getElementById('btn-pdf-note')?.addEventListener('click', () => toggleInlineNote('pdf'));
    document.getElementById('btn-pdf-snapshot')?.addEventListener('click', takePdfSnapshot);
    document.getElementById('btn-save-pdf-note')?.addEventListener('click', () => saveInlineNote('pdf'));
    
    document.getElementById('btn-game-memory')?.addEventListener('click', () => startGame('memory'));
    document.getElementById('btn-game-reaction')?.addEventListener('click', () => startGame('reaction'));
    document.getElementById('btn-game-guess')?.addEventListener('click', () => startGame('guess'));
    document.getElementById('btn-game-math')?.addEventListener('click', () => startGame('math'));
    document.getElementById('btn-game-chess')?.addEventListener('click', () => startGame('chess'));
    document.getElementById('btn-game-focus')?.addEventListener('click', () => startGame('focus'));
    document.getElementById('btn-back-games-hub')?.addEventListener('click', showGamesHub);
    document.getElementById('btn-play-memory')?.addEventListener('click', initMemoryGame);
    document.getElementById('btn-start-reaction')?.addEventListener('click', startReactionGame);
    document.getElementById('btn-check-guess')?.addEventListener('click', checkGuess);
    document.getElementById('btn-check-math')?.addEventListener('click', checkMath);
    document.getElementById('btn-reset-chess')?.addEventListener('click', initChess);
    document.getElementById('btn-start-focus')?.addEventListener('click', startFocusGame);
    
    document.getElementById('btn-add-exam-subject')?.addEventListener('click', openExamSubjectModal);
    document.getElementById('btn-close-exam-subject-modal')?.addEventListener('click', () => closeModal('examSubjectModal'));
    document.getElementById('btn-save-exam-subject')?.addEventListener('click', saveExamSubject);
    document.getElementById('btn-add-exam-file')?.addEventListener('click', openExamFileModal);
    document.getElementById('btn-close-exam-file-modal')?.addEventListener('click', () => closeModal('examFileModal'));
    document.getElementById('btn-save-exam-file')?.addEventListener('click', saveExamFile);
    document.getElementById('examFileInput')?.addEventListener('change', previewExamFile);
    
    document.getElementById('btn-close-plan-modal')?.addEventListener('click', () => closeModal('planningPlanModal'));
    document.getElementById('btn-save-plan')?.addEventListener('click', saveNewPlan);
    document.getElementById('btn-close-planning-item')?.addEventListener('click', () => closeModal('planningItemModal'));
    document.getElementById('btn-save-planning-item')?.addEventListener('click', savePlanningItem);
    document.getElementById('planningNoteInput')?.addEventListener('change', savePlanningNote);
    document.getElementById('btn-close-popup')?.addEventListener('click', () => closeModal('popupModal'));

    /* ================== الدوال ================== */
    function openSemesters() { playSound(clickSound); const list = document.getElementById('semestersList'); list.innerHTML = ''; for(let i=1; i<=10; i++) { const div = document.createElement('div'); div.className = 'grid-item'; div.innerHTML = `<i class="fa-solid fa-calendar"></i><div class="title">السمستر ${i}</div>`; div.onclick = () => openSubjects(i); list.appendChild(div); } showScreen('screen-semesters'); }
    function openSubjects(semNum) { playSound(clickSound); currentSemester = semNum; document.getElementById('subjectsTitle').innerText = `المواد ${semNum}`; renderSubjects(); showScreen('screen-subjects'); }
    function renderSubjects() { const list = document.getElementById('subjectsList'); list.innerHTML = ''; list.classList.toggle('list-layout', appData.settings.subjectLayout === 'list'); const subjects = appData[currentSemester].subjects; if(subjects.length === 0) { list.innerHTML = `<div class="empty-state" style="grid-column: span 2; text-align:center; padding:20px; color:var(--text-muted);">لا توجد مواد.</div>`; return; } subjects.forEach(sub => { const div = document.createElement('div'); div.className = 'grid-item'; div.innerHTML = `<i class="fa-solid fa-book"></i><div class="title">${sub.name}</div><div class="subtitle">${sub.doctor || '---'}</div><button class="del-btn" onclick="event.stopPropagation(); deleteSubject('${sub.id}')"><i class="fa-solid fa-trash"></i></button>`; div.onclick = () => openLessons(currentSemester, sub.id); list.appendChild(div); }); }
    function deleteSubject(id) { if(confirm("تأكيد الحذف؟")) { appData[currentSemester].subjects = appData[currentSemester].subjects.filter(s => s.id !== id); saveData(); renderSubjects(); playSound(clickSound); } }
    function openSubjectModal() { document.getElementById('subjectName').value=''; document.getElementById('doctorName').value=''; document.getElementById('subjectModal').classList.add('active'); playSound(clickSound); }
    function saveSubject() { const name = document.getElementById('subjectName').value.trim(); if(!name) return alert("أدخلي اسم المادة"); appData[currentSemester].subjects.push({ id: Date.now().toString(), name, doctor: document.getElementById('doctorName').value.trim(), lessons: [] }); saveData(); closeModal('subjectModal'); renderSubjects(); playSound(successSound); }
    
    function openLessons(semNum, subId) { currentSubjectId = subId; playSound(clickSound); const subject = appData[semNum].subjects.find(s => s.id === subId); document.getElementById('lessonsTitle').innerText = subject.name; renderLessons(); showScreen('screen-lessons'); }
    function renderLessons() {
        const list = document.getElementById('lessonsList'); list.innerHTML = '';
        const subject = appData[currentSemester].subjects.find(s => s.id === currentSubjectId);
        if(subject.lessons.length === 0) { list.innerHTML = `<div class="empty-state" style="text-align:center; padding:20px; color:var(--text-muted);">لا توجد دروس.</div>`; return; }
        subject.lessons.forEach(lesson => {
            const div = document.createElement('div'); div.className = 'lesson-card';
            const exText = lesson.exercises ? 'التمارين: نعم' : 'التمارين: لا';
            const revText = lesson.reviewed ? 'المراجعة: نعم' : 'المراجعة: لا';
            const noteIcon = lesson.note ? `<i class="fa-solid fa-circle-exclamation note-indicator" onclick="showPopup('${lesson.note.replace(/'/g, "\\'")}')" title="يوجد ملاحظة"></i>` : '';
            div.innerHTML = `
                <button class="del-btn" onclick="deleteLesson('${lesson.id}')"><i class="fa-solid fa-xmark"></i></button>
                <button class="edit-btn" onclick="openEditLessonModal('${lesson.id}')" style="position:absolute; top:12px; left:40px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:0.9rem;"><i class="fa-solid fa-pen"></i></button>
                <div class="lesson-header"><div class="lesson-name-container">${noteIcon}<div class="lesson-name">${lesson.name}</div></div></div>
                <div class="lesson-bottom-row"><div class="lesson-stats"><div class="stat-badge ${lesson.exercises ? 'stat-true' : 'stat-false'}">${exText}</div><div class="stat-badge ${lesson.reviewed ? 'stat-true' : 'stat-false'}">${revText}</div></div><div class="lesson-percentage">${lesson.understanding}% فهم</div></div>
            `;
            list.appendChild(div);
        });
    }
    function openEditLessonModal(id) {
        editingLessonId = id;
        const subject = appData[currentSemester].subjects.find(s => s.id === currentSubjectId);
        const lesson = subject.lessons.find(l => l.id === id);
        document.getElementById('lessonModalTitle').innerText = "تعديل الدرس";
        document.getElementById('lessonName').value = lesson.name;
        document.getElementById('lessonUnderstanding').value = lesson.understanding;
        document.getElementById('lessonExercises').checked = lesson.exercises;
        document.getElementById('lessonReviewed').checked = lesson.reviewed;
        document.getElementById('lessonNoteText').value = lesson.note || '';
        document.getElementById('lessonModal').classList.add('active');
        playSound(clickSound);
    }
    function openLessonModal() { editingLessonId = null; document.getElementById('lessonModalTitle').innerText = "إضافة درس"; document.getElementById('lessonName').value=''; document.getElementById('lessonUnderstanding').value=''; document.getElementById('lessonExercises').checked=false; document.getElementById('lessonReviewed').checked=false; document.getElementById('lessonNoteText').value=''; document.getElementById('lessonModal').classList.add('active'); playSound(clickSound); }
    function saveLesson() {
        const name = document.getElementById('lessonName').value.trim();
        if(!name) return alert("أدخلي اسم الدرس");
        const subject = appData[currentSemester].subjects.find(s => s.id === currentSubjectId);
        const data = { name, understanding: document.getElementById('lessonUnderstanding').value || 0, exercises: document.getElementById('lessonExercises').checked, reviewed: document.getElementById('lessonReviewed').checked, note: document.getElementById('lessonNoteText').value.trim() };
        if(editingLessonId) { const lesson = subject.lessons.find(l => l.id === editingLessonId); Object.assign(lesson, data); } 
        else { subject.lessons.push({ id: Date.now().toString(), ...data }); }
        saveData(); closeModal('lessonModal'); renderLessons(); playSound(successSound);
    }
    function deleteLesson(id) { if(confirm("تأكيد الحذف؟")) { const subject = appData[currentSemester].subjects.find(s => s.id === currentSubjectId); subject.lessons = subject.lessons.filter(l => l.id !== id); saveData(); renderLessons(); playSound(clickSound); } }

    function showPopup(text) { document.getElementById('popupText').innerText = text; document.getElementById('popupModal').classList.add('active'); }

    /* ================== التودو ================== */
    let currentTodoTab = 'active';
    function openTodo() { playSound(clickSound); switchTodoTab('active'); showScreen('screen-todo'); }
    function switchTodoTab(tab) { currentTodoTab = tab; document.getElementById('tab-active').classList.toggle('active', tab === 'active'); document.getElementById('tab-completed').classList.toggle('active', tab === 'completed'); renderTodos(); }
    function renderTodos() {
        const list = document.getElementById('todoList'); list.innerHTML = '';
        let todos = appData.todos.filter(t => currentTodoTab === 'active' ? !t.completed : t.completed);
        const now = new Date();
        todos.sort((a, b) => { if (a.pinned !== b.pinned) return a.pinned ? -1 : 1; if (a.deadline && b.deadline) return new Date(a.deadline) - new Date(b.deadline); return 0; });
        if(todos.length === 0) { list.innerHTML = `<div class="empty-state" style="text-align:center; padding:20px; color:var(--text-muted);">لا توجد مهام.</div>`; return; }
        todos.forEach(todo => {
            const div = document.createElement('div');
            let isMissed = false; if(!todo.completed && todo.deadline && new Date(todo.deadline) < now) { isMissed = true; }
            div.className = `todo-item imp-${todo.importance} ${todo.pinned ? 'pinned' : ''} ${todo.completed ? 'completed-item' : ''} ${isMissed ? 'missed-task' : ''}`;
            let deadlineHtml = todo.deadline ? `<div class="todo-deadline"><i class="fa-regular fa-clock"></i> ${new Date(todo.deadline).toLocaleString()}</div>` : '';
            let missedHtml = isMissed ? `<div class="todo-deadline" style="color:var(--color-urgent); font-weight:bold;"><i class="fa-solid fa-circle-exclamation"></i> لم تنفذ</div>` : '';
            div.innerHTML = `<div class="todo-content">${!todo.completed ? `<input type="checkbox" style="width:18px;height:18px;accent-color:var(--primary);cursor:pointer;" onclick="toggleTodo('${todo.id}')">` : ''}<div class="todo-icon"><i class="fa-solid ${todo.icon || 'fa-tasks'}"></i></div><div class="todo-details"><h4>${todo.name}</h4>${deadlineHtml}${missedHtml}</div></div><div class="todo-actions"><button onclick="pinTodo('${todo.id}')"><i class="fa-solid fa-thumbtack" style="color: ${todo.pinned ? 'var(--primary)' : 'var(--text-muted)'}"></i></button><button class="delete-btn" onclick="deleteTodo('${todo.id}')"><i class="fa-solid fa-xmark"></i></button></div>`;
            list.appendChild(div);
        });
    }
    function openTodoModal() { document.getElementById('todoName').value = ''; document.getElementById('todoDeadline').value = ''; document.getElementById('todoRepeatDay').value = ''; document.getElementById('todoStartTime').value = ''; document.getElementById('todoEndTime').value = ''; document.getElementById('todoModal').classList.add('active'); playSound(clickSound); }
    function saveTodo() {
        const name = document.getElementById('todoName').value.trim(); if(!name) return alert("أدخلي اسم المهمة");
        const repeatDay = document.getElementById('todoRepeatDay').value;
        let deadline = document.getElementById('todoDeadline').value;
        let repeatData = null;
        if(repeatDay !== '') {
            repeatData = { day: repeatDay, start: document.getElementById('todoStartTime').value, end: document.getElementById('todoEndTime').value };
            const now = new Date(); const targetDay = parseInt(repeatDay); const diff = (targetDay - now.getDay() + 7) % 7;
            const nextDate = new Date(now.setDate(now.getDate() + (diff === 0 && now.getHours() > 12 ? 7 : diff)));
            if(repeatData.end) { const [h, m] = repeatData.end.split(':'); nextDate.setHours(h, m, 0); deadline = nextDate.toISOString().slice(0, 16); }
        }
        appData.todos.push({ id: Date.now().toString(), name, icon: document.getElementById('todoIconSelect').value, deadline: deadline, importance: document.querySelector('input[name="todoImp"]:checked').value, completed: false, pinned: false, repeat: repeatData });
        saveData(); closeModal('todoModal'); renderTodos(); playSound(successSound);
    }
    function toggleTodo(id) { const todo = appData.todos.find(t => t.id === id); todo.completed = !todo.completed; saveData(); renderTodos(); playSound(successSound); }
    function pinTodo(id) { const todo = appData.todos.find(t => t.id === id); todo.pinned = !todo.pinned; saveData(); renderTodos(); playSound(clickSound); }
    function deleteTodo(id) { if(confirm("تأكيد الحذف؟")) { appData.todos = appData.todos.filter(t => t.id !== id); saveData(); renderTodos(); playSound(clickSound); } }

    /* ================== البومودورو ================== */
    let pomoInterval = null, pomoDuration = 25 * 60, pomoEndTime = null, pomoSoundUrl = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3', isPomoRunning = false;
    const pomoCircle = document.getElementById('pomoCircle');
    const radius = pomoCircle.r.baseVal.value; const circumference = radius * 2 * Math.PI;
    pomoCircle.style.strokeDasharray = `${circumference} ${circumference}`; pomoCircle.style.strokeDashoffset = 0;
    function openPomodoro() { playSound(clickSound); showScreen('screen-pomodoro'); checkPomoState(); }
    function openPomoSetup() { document.getElementById('pomoSetupModal').classList.add('active'); playSound(clickSound); }
    function previewSound() { const url = document.getElementById('pomoSoundSelect').value; playSound(url, 0.8); }
    function updatePomoDuration() { if(isPomoRunning) { alert("أوقف المؤقت أولاً"); return; } pomoDuration = parseInt(document.getElementById('pomoTimeSelect').value) * 60; updatePomoUI(pomoDuration); }
    function applyPomoSetup() { if(isPomoRunning) return alert("أوقف المؤقت أولاً"); pomoDuration = parseInt(document.getElementById('pomoTimeSelect').value) * 60; pomoSoundUrl = document.getElementById('pomoSoundSelect').value; updatePomoUI(pomoDuration); closeModal('pomoSetupModal'); }
    function togglePomodoro() {
        if (isPomoRunning) { clearInterval(pomoInterval); isPomoRunning = false; document.getElementById('pomoStartBtn').innerText = 'استمرار'; document.getElementById('pomoStatus').innerText = 'متوقف'; localStorage.setItem('pomoTimeLeft', Math.round((pomoEndTime - Date.now()) / 1000)); localStorage.removeItem('pomoEndTime'); }
        else { let timeLeft = parseInt(localStorage.getItem('pomoTimeLeft')) || pomoDuration; localStorage.removeItem('pomoTimeLeft'); pomoEndTime = Date.now() + (timeLeft * 1000); localStorage.setItem('pomoEndTime', pomoEndTime); localStorage.setItem('pomoSoundUrl', pomoSoundUrl); isPomoRunning = true; document.getElementById('pomoStartBtn').innerText = 'إيقاف مؤقت'; document.getElementById('pomoStatus').innerText = 'جاري التركيز...'; startPomoInterval(); playSound(clickSound); }
    }
    function startPomoInterval() {
        clearInterval(pomoInterval);
        pomoInterval = setInterval(() => {
            const timeLeft = Math.round((pomoEndTime - Date.now()) / 1000);
            if (timeLeft <= 0) { clearInterval(pomoInterval); isPomoRunning = false; localStorage.removeItem('pomoEndTime'); localStorage.removeItem('pomoTimeLeft'); document.getElementById('pomoStartBtn').innerText = 'ابدأ'; document.getElementById('pomoStatus').innerText = 'انتهى الوقت! ☕'; addPts(Math.round(pomoDuration/60),'pomo'); updatePomoUI(0); const sound = localStorage.getItem('pomoSoundUrl') || pomoSoundUrl; playSound(sound, 1.0); setTimeout(() => playSound(sound, 1.0), 1000); }
            else { updatePomoUI(timeLeft); }
        }, 1000);
    }
    function updatePomoUI(seconds) { const m = Math.floor(seconds / 60), s = seconds % 60; document.getElementById('pomoDisplay').innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`; pomoCircle.style.strokeDashoffset = circumference - (seconds / pomoDuration) * circumference; }
    function checkPomoState() {
        const savedEndTime = localStorage.getItem('pomoEndTime');
        if (savedEndTime) {
            const timeLeft = Math.round((savedEndTime - Date.now()) / 1000);
            if (timeLeft > 0) { pomoEndTime = parseInt(savedEndTime); isPomoRunning = true; document.getElementById('pomoStartBtn').innerText = 'إيقاف مؤقت'; document.getElementById('pomoStatus').innerText = 'جاري التركيز...'; updatePomoUI(timeLeft); startPomoInterval(); }
            else { localStorage.removeItem('pomoEndTime'); document.getElementById('pomoStatus').innerText = 'انتهى الوقت!'; updatePomoUI(0); playSound(localStorage.getItem('pomoSoundUrl') || pomoSoundUrl, 1.0); }
        } else { updatePomoUI(pomoDuration); if(!isPomoRunning) document.getElementById('pomoStartBtn').innerText = 'ابدأ'; }
    }
    function toggleFocusMode() { document.body.classList.toggle('focus-mode'); document.getElementById('btn-focus-mode').innerText = document.body.classList.contains('focus-mode') ? 'إلغاء التركيز' : 'التركيز'; }
    function exitPomodoro() { showScreen('screen-home'); }

    /* ================== اليوميات ================== */
    let currentJournalId = null;
    function openJournal() { playSound(clickSound); renderJournals(); showScreen('screen-journal'); }
    function renderJournals() {
        const list = document.getElementById('journalList'); list.innerHTML = '';
        if(appData.journals.length === 0) { list.innerHTML = `<div class="empty-state" style="text-align:center; padding:20px; color:var(--text-muted);">لا توجد تدوينات.</div>`; return; }
        const sorted = [...appData.journals].sort((a,b) => new Date(b.date) - new Date(a.date));
        sorted.forEach(j => {
            const div = document.createElement('div'); div.className = 'journal-card';
            const title = j.title || j.text.substring(0, 20) + '...';
            div.innerHTML = `<div class="journal-card-info"><div class="journal-card-date"><i class="fa-regular fa-calendar"></i> ${j.date}</div><div class="journal-card-title">${title}</div></div><div class="journal-card-arrow"><i class="fa-solid fa-chevron-left"></i></div>`;
            div.onclick = () => openJournalDetail(j.id); list.appendChild(div);
        });
    }
    function openJournalDetail(id) {
        playSound(clickSound); currentJournalId = id;
        const j = appData.journals.find(x => x.id === id);
        document.getElementById('journalDetailTitle').innerText = j.title || 'تفاصيل اليومية';
        const content = document.getElementById('journalDetailContent');
        let mediaHtml = ''; if(j.image) mediaHtml += `<img src="${j.image}" alt="Journal Image">`; if(j.audio) mediaHtml += `<audio controls src="${j.audio}"></audio>`;
        content.innerHTML = `<div class="journal-detail-card"><div class="journal-detail-header"><div class="journal-detail-date"><i class="fa-regular fa-calendar"></i> ${j.date}</div></div><div class="journal-detail-text">${j.text}</div>${mediaHtml ? `<div class="journal-media">${mediaHtml}</div>` : ''}<div class="journal-actions"><button class="btn btn-secondary" onclick="deleteJournal('${j.id}')" style="font-size:0.85rem;">حذف</button><button class="btn btn-primary" onclick="editJournal('${j.id}')" style="font-size:0.85rem;">تعديل</button></div></div>`;
        showScreen('screen-journal-detail');
    }
    function deleteJournal(id) { if(confirm("حذف اليومية؟")) { appData.journals = appData.journals.filter(j => j.id !== id); saveData(); showScreen('screen-journal'); renderJournals(); playSound(clickSound); } }
    function editJournal(id) { currentJournalId = id; const j = appData.journals.find(x => x.id === id); document.getElementById('journalDate').value = j.date; document.getElementById('journalTitle').value = j.title || ''; document.getElementById('journalText').value = j.text; document.getElementById('journalModal').classList.add('active'); playSound(clickSound); }
    function openJournalModal() { playSound(clickSound); currentJournalId = null; document.getElementById('journalDate').value = new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); document.getElementById('journalTitle').value = ''; document.getElementById('journalText').value = ''; document.getElementById('journalImage').value = ''; document.getElementById('journalAudio').value = ''; document.getElementById('journalModal').classList.add('active'); }
    function getBase64(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = () => resolve(reader.result); reader.onerror = error => reject(error); }); }
    async function saveJournal() {
        const text = document.getElementById('journalText').value.trim(); if(!text) return alert("اكتبي شيئاً");
        const imgFile = document.getElementById('journalImage').files[0]; const audioFile = document.getElementById('journalAudio').files[0];
        let imgBase64 = null, audioBase64 = null;
        if(imgFile) { imgBase64 = await getBase64(imgFile); } else if (currentJournalId) { const oldJournal = appData.journals.find(j => j.id === currentJournalId); if(oldJournal) imgBase64 = oldJournal.image; }
        if(audioFile) { audioBase64 = await getBase64(audioFile); } else if (currentJournalId) { const oldJournal = appData.journals.find(j => j.id === currentJournalId); if(oldJournal) audioBase64 = oldJournal.audio; }
        const journalData = { id: currentJournalId || Date.now().toString(), date: document.getElementById('journalDate').value, title: document.getElementById('journalTitle').value.trim(), text: text, image: imgBase64, audio: audioBase64 };
        if(currentJournalId) { const index = appData.journals.findIndex(j => j.id === currentJournalId); appData.journals[index] = journalData; } else { appData.journals.push(journalData); }
        try { saveData(); closeModal('journalModal'); renderJournals(); if(currentJournalId) openJournalDetail(currentJournalId); playSound(successSound); } catch(e) { alert("المساحة ممتلئة!"); }
    }

    /* ================== التحرير ================== */
    let db, videoUrl = null, currentEditorTarget = '';
    function initDB() { const request = indexedDB.open("StudyFilesDB", 1); request.onupgradeneeded = function(e) { const db = e.target.result; if (!db.objectStoreNames.contains("files")) db.createObjectStore("files"); }; request.onsuccess = function(e) { db = e.target.result; loadSavedFiles(); }; }
    function saveFileToDB(key, data) { if(!db) return; const tx = db.transaction("files", 'readwrite'); tx.objectStore("files").put(data, key); }
    function loadFileFromDB(key) { return new Promise((resolve, reject) => { if(!db) return reject("No DB"); const tx = db.transaction("files", 'readonly'); const req = tx.objectStore("files").get(key); req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error); }); }
    async function loadSavedFiles() {
        try {
            const videoBlob = await loadFileFromDB('savedVideo'); if(videoBlob) { videoUrl = URL.createObjectURL(videoBlob); document.getElementById('videoPlayer').src = videoUrl; document.getElementById('videoUploadArea').style.display = 'none'; document.getElementById('videoPlayerUI').style.display = 'flex'; }
            const pdfBlob = await loadFileFromDB('savedPdf'); if(pdfBlob) { document.getElementById('pdfIframe').src = URL.createObjectURL(pdfBlob); document.getElementById('pdfUploadArea').style.display = 'none'; document.getElementById('pdfViewerUI').style.display = 'flex'; }
            renderVideoNotes(); renderPdfNotes();
        } catch(e) { console.log("Error loading files", e); }
    }
    function openEditHub() { playSound(clickSound); showScreen('screen-edit-hub'); }
    function openEditSection(type) { playSound(clickSound); currentEditorTarget = type; document.getElementById('fullscreenEditor').classList.add('active'); document.getElementById('fs-video-container').style.display = type === 'video' ? 'flex' : 'none'; document.getElementById('fs-pdf-container').style.display = type === 'pdf' ? 'flex' : 'none'; document.getElementById('editorTitle').innerText = type === 'video' ? 'محرر الفيديو' : 'قارئ الكتب'; }
    function closeFullscreenEditor() { document.getElementById('fullscreenEditor').classList.remove('active'); document.getElementById('videoPlayer').pause(); }
    function handleVideoUpload(e) { const file = e.target.files[0]; if(file) { if(videoUrl) URL.revokeObjectURL(videoUrl); videoUrl = URL.createObjectURL(file); document.getElementById('videoPlayer').src = videoUrl; document.getElementById('videoUploadArea').style.display = 'none'; document.getElementById('videoPlayerUI').style.display = 'flex'; saveFileToDB('savedVideo', file); playSound(successSound); } }
    function closeCurrentVideo() { document.getElementById('videoPlayer').pause(); document.getElementById('videoPlayer').src = ''; document.getElementById('videoPlayerUI').style.display = 'none'; document.getElementById('videoUploadArea').style.display = 'block'; if(db) { const tx = db.transaction("files", 'readwrite'); tx.objectStore("files").delete('savedVideo'); } playSound(clickSound); }
    function takeSnapshot() { const video = document.getElementById('videoPlayer'); const canvas = document.createElement('canvas'); canvas.width = video.videoWidth; canvas.height = video.videoHeight; canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); const link = document.createElement('a'); link.download = 'snapshot.png'; link.href = canvas.toDataURL(); link.click(); playSound(successSound); }
    function trimVideoPrompt() { alert("للقص، يرجى استخدام برامج مخصصة."); }
    function toggleVideoSpeed() { const player = document.getElementById('videoPlayer'); if(player.playbackRate === 1) { player.playbackRate = 1.5; alert("سرعة 1.5x"); } else if(player.playbackRate === 1.5) { player.playbackRate = 2; alert("سرعة 2x"); } else { player.playbackRate = 1; alert("سرعة 1x"); } }
    function toggleVideoTranslate() { alert("ميزة الترجمة الآلية تتطلب خوادم خارجية."); }
    function toggleInlineNote(type) { const bar = document.getElementById(type === 'video' ? 'videoInlineNoteBar' : 'pdfInlineNoteBar'); bar.classList.toggle('active'); if(type === 'video') { const player = document.getElementById('videoPlayer'); if(player.src) { player.pause(); currentVideoTime = player.currentTime; } } }
    function saveInlineNote(type) {
        if(type === 'video') { const text = document.getElementById('videoInlineNoteInput').value.trim(); if(!text) return; const m = Math.floor(currentVideoTime / 60); const s = Math.floor(currentVideoTime % 60); const timeStr = `${m}:${s.toString().padStart(2, '0')}`; appData.videoNotes.push({ id: Date.now().toString(), time: currentVideoTime, timeStr: timeStr, text: text }); saveData(); renderVideoNotes(); document.getElementById('videoInlineNoteInput').value = ''; document.getElementById('videoInlineNoteBar').classList.remove('active'); playSound(successSound); }
        else { const text = document.getElementById('pdfInlineNoteInput').value.trim(); if(!text) return; appData.pdfNotes.push({ id: Date.now().toString(), text: text }); saveData(); renderPdfNotes(); document.getElementById('pdfInlineNoteInput').value = ''; document.getElementById('pdfInlineNoteBar').classList.remove('active'); playSound(successSound); }
    }
    function renderVideoNotes() { const list = document.getElementById('videoNotesList'); list.innerHTML = ''; const notes = appData.videoNotes || []; if(notes.length === 0) { list.innerHTML = '<p style="color:gray; text-align:center; font-size:0.85rem;">لا توجد ملاحظات.</p>'; return; } notes.sort((a,b) => a.time - b.time).forEach(note => { const div = document.createElement('div'); div.className = 'note-item'; div.innerHTML = `<div class="note-content" onclick="seekVideo(${note.time})"><span class="note-time"><i class="fa-solid fa-play"></i> ${note.timeStr}</span><div class="note-text">${note.text}</div></div><div style="display:flex; gap:4px;"><button class="del-btn" style="position:static; font-size:0.8rem;" onclick="editVideoNote('${note.id}')"><i class="fa-solid fa-pen" style="color:var(--primary)"></i></button><button class="del-btn" style="position:static; font-size:0.8rem;" onclick="deleteVideoNote('${note.id}')"><i class="fa-solid fa-trash"></i></button></div>`; list.appendChild(div); }); }
    function seekVideo(time) { const player = document.getElementById('videoPlayer'); player.currentTime = time; player.play(); }
    function editVideoNote(id) { const note = appData.videoNotes.find(n => n.id === id); const newText = prompt("تعديل الملاحظة:", note.text); if(newText) { note.text = newText; saveData(); renderVideoNotes(); playSound(successSound); } }
    function deleteVideoNote(id) { if(confirm("حذف؟")) { appData.videoNotes = appData.videoNotes.filter(n => n.id !== id); saveData(); renderVideoNotes(); playSound(clickSound); } }
    function handlePdfUpload(e) { const file = e.target.files[0]; if(file) { document.getElementById('pdfIframe').src = URL.createObjectURL(file); document.getElementById('pdfUploadArea').style.display = 'none'; document.getElementById('pdfViewerUI').style.display = 'flex'; saveFileToDB('savedPdf', file); playSound(successSound); } }
    function closeCurrentPdf() { document.getElementById('pdfIframe').src = ''; document.getElementById('pdfViewerUI').style.display = 'none'; document.getElementById('pdfUploadArea').style.display = 'block'; if(db) { const tx = db.transaction("files", 'readwrite'); tx.objectStore("files").delete('savedPdf'); } playSound(clickSound); }
    function takePdfSnapshot() { alert("لقطة الشاشة للكتب غير مدعومة في وضع المتصفح."); }
    function renderPdfNotes() { const list = document.getElementById('pdfNotesList'); list.innerHTML = ''; const notes = appData.pdfNotes || []; if(notes.length === 0) { list.innerHTML = '<p style="color:gray; text-align:center; font-size:0.85rem;">لا توجد ملاحظات.</p>'; return; } notes.forEach(note => { const div = document.createElement('div'); div.className = 'note-item'; div.innerHTML = `<div class="note-content" onclick="showPopup('${note.text.replace(/'/g, "\\'")}')"><span class="note-time"><i class="fa-solid fa-note-sticky"></i> ملاحظة</span><div class="note-text">${note.text.substring(0, 30)}...</div></div><div style="display:flex; gap:4px;"><button class="del-btn" style="position:static; font-size:0.8rem;" onclick="editPdfNote('${note.id}')"><i class="fa-solid fa-pen" style="color:var(--primary)"></i></button><button class="del-btn" style="position:static; font-size:0.8rem;" onclick="deletePdfNote('${note.id}')"><i class="fa-solid fa-trash"></i></button></div>`; list.appendChild(div); }); }
    function editPdfNote(id) { const note = appData.pdfNotes.find(n => n.id === id); const newText = prompt("تعديل الملاحظة:", note.text); if(newText) { note.text = newText; saveData(); renderPdfNotes(); playSound(successSound); } }
    function deletePdfNote(id) { if(confirm("حذف؟")) { appData.pdfNotes = appData.pdfNotes.filter(n => n.id !== id); saveData(); renderPdfNotes(); playSound(clickSound); } }
    function exportNotes() { const notes = currentEditorTarget === 'video' ? appData.videoNotes : appData.pdfNotes; if(!notes || notes.length === 0) return alert("لا توجد ملاحظات"); let html = `<html dir="rtl"><head><title>Notes</title><style>body{font-family: sans-serif; padding:20px;} .note{border-bottom:1px solid #ccc; padding:10px;}</style></head><body><h2>ملاحظات</h2>`; notes.forEach(n => { html += `<div class="note"><strong>${n.timeStr || ''}</strong><br>${n.text}</div>`; }); html += `</body></html>`; const blob = new Blob([html], {type: 'text/html'}); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'notes.html'; link.click(); playSound(successSound); }

    /* ================== الامتحانات ================== */
    function openExams() { playSound(clickSound); renderExamSubjects(); showScreen('screen-exams-subjects'); }
    function renderExamSubjects() { const list = document.getElementById('examSubjectsList'); list.innerHTML = ''; if(appData.examSubjects.length === 0) { list.innerHTML = '<div class="empty-state" style="grid-column: span 2; text-align:center; padding:20px; color:var(--text-muted);">لا توجد مواد مضافة في الامتحانات.</div>'; return; } appData.examSubjects.forEach(sub => { const div = document.createElement('div'); div.className = 'grid-item'; div.innerHTML = `<i class="fa-solid fa-file-alt"></i><div class="title">${sub.name}</div><button class="del-btn" onclick="event.stopPropagation(); deleteExamSubject('${sub.id}')"><i class="fa-solid fa-trash"></i></button>`; div.onclick = () => { openExamFiles(sub.id); }; list.appendChild(div); }); }
    function openExamSubjectModal() { document.getElementById('examSubjectName').value = ''; document.getElementById('examSubjectModal').classList.add('active'); playSound(clickSound); }
    function saveExamSubject() { const name = document.getElementById('examSubjectName').value.trim(); if(!name) return alert("أدخلي اسم المادة"); appData.examSubjects.push({ id: Date.now().toString(), name: name, exams: [] }); saveData(); closeModal('examSubjectModal'); renderExamSubjects(); playSound(successSound); }
    function deleteExamSubject(id) { if(confirm("تأكيد حذف المادة وجميع امتحاناتها؟")) { appData.examSubjects = appData.examSubjects.filter(s => s.id !== id); saveData(); renderExamSubjects(); playSound(clickSound); } }
    function openExamFiles(subId) { currentExamSubjectIdVar = subId; const sub = appData.examSubjects.find(s => s.id === subId); document.getElementById('examFilesTitle').innerText = sub.name; renderExamFiles(); showScreen('screen-exam-files'); }
    function renderExamFiles() {
        const list = document.getElementById('examFilesList'); list.innerHTML = '';
        const sub = appData.examSubjects.find(s => s.id === currentExamSubjectIdVar);
        if(!sub || sub.exams.length === 0) { list.innerHTML = '<div class="empty-state" style="text-align:center; padding:20px; color:var(--text-muted);">لا توجد امتحانات مضافة.</div>'; return; }
        const sorted = [...sub.exams].sort((a,b) => a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1);
        sorted.forEach(exam => {
            const div = document.createElement('div'); div.className = 'exam-card';
            let previewHtml = '';
            if(exam.fileType && exam.fileType.startsWith('image/')) { previewHtml = `<img src="${exam.fileData}" style="width:100%; max-height:150px; object-fit:contain; border-radius:8px; margin-top:8px;">`; }
            else if(exam.fileType === 'application/pdf') { previewHtml = `<a href="${exam.fileData}" target="_blank" style="display:inline-block; padding:8px; background:var(--bg-color); border-radius:8px; text-decoration:none; color:var(--text-main); margin-top:8px; font-size:0.8rem;"><i class="fa-solid fa-file-pdf"></i> عرض ملف PDF</a>`; }
            div.innerHTML = `<div class="exam-header"><span class="exam-name">${exam.name}</span><span class="exam-type-badge">${exam.type}</span></div>${previewHtml}<div class="exam-actions" style="display:flex; justify-content:space-between; margin-top:8px;"><button class="pin-btn" onclick="toggleExamPin('${exam.id}')" style="background:none; border:none; cursor:pointer;"><i class="fa-solid fa-thumbtack" style="color: ${exam.pinned ? 'var(--primary)' : 'var(--text-muted)'}"></i></button><button class="del-btn" style="position:static; color:var(--color-urgent);" onclick="deleteExamFile('${exam.id}')"><i class="fa-solid fa-trash"></i></button></div>`;
            list.appendChild(div);
        });
    }
    function openExamFileModal() { document.getElementById('examFileName').value = ''; document.getElementById('examFileType').value = 'امتحان نهائي'; document.getElementById('examFileTypeCustom').style.display = 'none'; document.getElementById('examFileInput').value = ''; document.getElementById('examFilePreview').style.display = 'none'; document.getElementById('examFileModal').classList.add('active'); playSound(clickSound); }
    function toggleCustomExamType() { const val = document.getElementById('examFileType').value; const input = document.getElementById('examFileTypeCustom'); if(val === 'أخرى' || val === 'Other') { input.style.display = 'block'; input.focus(); } else { input.style.display = 'none'; } }
    function previewExamFile(event) { const file = event.target.files[0]; if(file) { const reader = new FileReader(); reader.onload = function(e) { currentExamFileBase64 = e.target.result; const preview = document.getElementById('examFilePreview'); preview.src = e.target.result; preview.style.display = 'block'; }; reader.readAsDataURL(file); } }
    function saveExamFile() {
        const name = document.getElementById('examFileName').value.trim(); if(!name) return alert("أدخلي اسم الامتحان");
        let type = document.getElementById('examFileType').value; if(type === 'أخرى' || type === 'Other') { type = document.getElementById('examFileTypeCustom').value.trim() || 'أخرى'; }
        if(!currentExamFileBase64) return alert("الرجاء رفع ملف أو صورة للامتحان");
        const newExam = { id: Date.now().toString(), name: name, type: type, fileData: currentExamFileBase64, fileType: document.getElementById('examFileInput').files[0]?.type || '', pinned: false };
        const sub = appData.examSubjects.find(s => s.id === currentExamSubjectIdVar); sub.exams.push(newExam);
        try { saveData(); closeModal('examFileModal'); renderExamFiles(); playSound(successSound); } catch(e) { alert("المساحة ممتلئة!"); sub.exams.pop(); }
    }
    function toggleExamPin(id) { const sub = appData.examSubjects.find(s => s.id === currentExamSubjectIdVar); const exam = sub.exams.find(e => e.id === id); exam.pinned = !exam.pinned; saveData(); renderExamFiles(); playSound(clickSound); }
    function deleteExamFile(id) { if(confirm("تأكيد الحذف؟")) { const sub = appData.examSubjects.find(s => s.id === currentExamSubjectIdVar); sub.exams = sub.exams.filter(e => e.id !== id); saveData(); renderExamFiles(); playSound(clickSound); } }

    /* ================== التخطيط ================== */
    function openPlanning() { playSound(clickSound); showScreen('screen-planning'); loadPlanningLevel('plans'); }
    function goBackPlanning() { playSound(clickSound); if(currentPlanningLevel === 'tasks') { loadPlanningLevel('days'); } else if(currentPlanningLevel === 'days') { loadPlanningLevel('weeks'); } else if(currentPlanningLevel === 'weeks') { loadPlanningLevel('months'); } else if(currentPlanningLevel === 'months') { loadPlanningLevel('plans'); } else if(currentPlanningLevel === 'plans') { showScreen('screen-home'); } }
    function loadPlanningLevel_o(level) {
        currentPlanningLevel = level;
        const list = document.getElementById('planningList'); const addBtn = document.getElementById('planningAddBtn'); const summary = document.getElementById('planningSummary'); const breadcrumb = document.getElementById('planningBreadcrumb'); const noteArea = document.getElementById('planningNoteArea');
        list.innerHTML = ''; breadcrumb.innerHTML = '<span onclick="loadPlanningLevel(\'plans\')" style="cursor:pointer;">الخطط</span>'; noteArea.style.display = 'none'; summary.style.display = 'none'; addBtn.style.display = 'flex';
        if(level === 'plans') {
            addBtn.onclick = () => openPlanModal();
            summary.style.display = 'flex'; updateSummary();
            if(appData.planning.plans.length === 0) { list.innerHTML = '<div class="empty-state" style="text-align:center; padding:20px; color:var(--text-muted);">لا توجد خطط. أضيفي خطة جديدة.</div>'; return; }
            appData.planning.plans.forEach(plan => { const div = document.createElement('div'); div.className = 'grid-item'; div.innerHTML = `<i class="fa-solid fa-calendar-alt"></i><div class="title">${plan.name}</div><div class="subtitle">${plan.duration}</div><button class="del-btn" onclick="event.stopPropagation(); deletePlan('${plan.id}')"><i class="fa-solid fa-trash"></i></button>`; div.onclick = () => { currentPlan = plan; currentMonth=currentWeek=currentDay=null; loadPlanningLevel('months'); }; list.appendChild(div); });
        }
        else if(level === 'months') {
            addBtn.onclick = () => openPlanningItemModal('month');
            breadcrumb.innerHTML += ` > <span>${currentPlan.name}</span>`; noteArea.style.display = 'block'; document.getElementById('planningNoteInput').value = currentPlan.note || '';
            if(!currentPlan.months || currentPlan.months.length === 0) { list.innerHTML = '<div class="empty-state" style="text-align:center; padding:20px; color:var(--text-muted);">لا توجد شهور. أضيفي شهراً.</div>'; return; }
            currentPlan.months.forEach((month, idx) => { const div = document.createElement('div'); div.className = 'goal-card'; div.innerHTML = `<div class="goal-info"><div class="goal-title">${month.name}</div><div class="goal-sub">${month.weeks ? month.weeks.length : 0} أسابيع</div></div><div class="goal-progress-ring"><span>${getMonthProgress(month)}%</span></div>`; div.onclick = () => { currentMonth = month; loadPlanningLevel('weeks'); }; list.appendChild(div); });
        }
        else if(level === 'weeks') {
            addBtn.onclick = () => openPlanningItemModal('week');
            breadcrumb.innerHTML += ` > <span>${currentPlan.name}</span> > <span>${currentMonth.name}</span>`; noteArea.style.display = 'block'; document.getElementById('planningNoteInput').value = currentMonth.note || '';
            if(!currentMonth.weeks || currentMonth.weeks.length === 0) { list.innerHTML = '<div class="empty-state" style="text-align:center; padding:20px; color:var(--text-muted);">لا توجد أسابيع. أضيفي أسبوعاً.</div>'; return; }
            currentMonth.weeks.forEach((week, idx) => { const div = document.createElement('div'); div.className = 'goal-card'; div.innerHTML = `<div class="goal-info"><div class="goal-title">${week.name}</div><div class="goal-sub">${week.days ? week.days.length : 0} أيام</div></div><div class="goal-progress-ring"><span>${getWeekProgress(week)}%</span></div>`; div.onclick = () => { currentWeek = week; loadPlanningLevel('days'); }; list.appendChild(div); });
        }
        else if(level === 'days') {
            addBtn.onclick = () => openPlanningItemModal('day');
            breadcrumb.innerHTML += ` > <span>${currentPlan.name}</span> > <span>${currentMonth.name}</span> > <span>${currentWeek.name}</span>`; noteArea.style.display = 'block'; document.getElementById('planningNoteInput').value = currentWeek.note || '';
            if(!currentWeek.days || currentWeek.days.length === 0) { list.innerHTML = '<div class="empty-state" style="text-align:center; padding:20px; color:var(--text-muted);">لا توجد أيام. أضيفي يوماً.</div>'; return; }
            currentWeek.days.forEach(day => { const div = document.createElement('div'); div.className = 'goal-card'; div.innerHTML = `<div class="goal-info"><div class="goal-title">${day.name}</div><div class="goal-sub">${day.tasks ? day.tasks.length : 0} مهام</div></div><div class="goal-progress-ring"><span>${getDayProgress(day)}%</span></div>`; div.onclick = () => { currentDay = day; loadPlanningLevel('tasks'); }; list.appendChild(div); });
        }
        else if(level === 'tasks') {
            addBtn.onclick = () => openPlanningItemModal('task');
            breadcrumb.innerHTML += ` > <span>${currentPlan.name}</span> > <span>${currentMonth.name}</span> > <span>${currentWeek.name}</span> > <span>${currentDay.name}</span>`; noteArea.style.display = 'block'; document.getElementById('planningNoteInput').value = currentDay.note || '';
            if(!currentDay.tasks || currentDay.tasks.length === 0) { list.innerHTML = '<div class="empty-state" style="text-align:center; padding:20px; color:var(--text-muted);">لا توجد مهام. أضيفي مهمة.</div>'; return; }
            currentDay.tasks.forEach(task => { const div = document.createElement('div'); div.className = 'goal-card'; div.innerHTML = `<div class="goal-info"><div class="goal-title" style="${task.completed ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${(currentDay&&currentDay.date&&currentDay.date<today()&&!task.completed)?'<i class="fa-solid fa-circle-exclamation" style="color:#e53935"></i> ':''}${task.name}${task.hours?` (${task.hours} س)`:''}</div></div><div class="goal-progress-ring"><input type="checkbox" ${task.completed ? 'checked' : ''} onchange="togglePlanningTask('${task.id}')" style="width:20px; height:20px; accent-color:var(--primary); cursor:pointer;"></div><button class="edit-btn" style="position:static;" onclick="editPlanningTask('${task.id}')"><i class="fa-solid fa-pen"></i></button><button class="del-btn" style="position:static;" onclick="deletePlanningTask('${task.id}')"><i class="fa-solid fa-xmark"></i></button>`; list.appendChild(div); });
        }
        addBtn.style.display = (level==="plans"||level==="tasks")?"flex":"none"; updateSummary();
    }
    function getMonthProgress(month) { if(!month.weeks || month.weeks.length === 0) return 0; let total = 0, done = 0; month.weeks.forEach(w => { if(w.days) w.days.forEach(d => { if(d.tasks) d.tasks.forEach(t => { total++; if(t.completed) done++; }); }); }); return total === 0 ? 0 : Math.round((done / total) * 100); }
    function getWeekProgress(week) { if(!week.days || week.days.length === 0) return 0; let total = 0, done = 0; week.days.forEach(d => { if(d.tasks) d.tasks.forEach(t => { total++; if(t.completed) done++; }); }); return total === 0 ? 0 : Math.round((done / total) * 100); }
    function getDayProgress(day) { if(!day.tasks || day.tasks.length === 0) return 0; let done = 0; day.tasks.forEach(t => { if(t.completed) done++; }); return Math.round((done / day.tasks.length) * 100); }
    function updateSummary() {
        let dayPct = 0, weekPct = 0, monthPct = 0, yearPct = 0;
        if(currentDay) dayPct = getDayProgress(currentDay); if(currentWeek) weekPct = getWeekProgress(currentWeek); if(currentMonth) monthPct = getMonthProgress(currentMonth);
        if(currentPlan) { let total = 0, done = 0; if(currentPlan.months) currentPlan.months.forEach(m => { if(m.weeks) m.weeks.forEach(w => { if(w.days) w.days.forEach(d => { if(d.tasks) d.tasks.forEach(t => { total++; if(t.completed) done++; }); }); }); }); yearPct = total === 0 ? 0 : Math.round((done / total) * 100); }
        document.getElementById('summaryDayText').innerText = `${dayPct}%`; document.getElementById('summaryWeekText').innerText = `${weekPct}%`; document.getElementById('summaryMonthText').innerText = `${monthPct}%`; document.getElementById('summaryYearText').innerText = `${yearPct}%`;
        document.getElementById('summaryDayCircle').style.strokeDashoffset = 170 - (170 * dayPct / 100); document.getElementById('summaryWeekCircle').style.strokeDashoffset = 170 - (170 * weekPct / 100); document.getElementById('summaryMonthCircle').style.strokeDashoffset = 170 - (170 * monthPct / 100); document.getElementById('summaryYearCircle').style.strokeDashoffset = 170 - (170 * yearPct / 100);
    }
    function togglePlanningTask(id) { const task = currentDay.tasks.find(t => t.id === id); task.completed = !task.completed; saveData(); loadPlanningLevel('tasks'); playSound(successSound); }
    function deletePlanningTask(id) { if(confirm("حذف المهمة؟")) { currentDay.tasks = currentDay.tasks.filter(t => t.id !== id); saveData(); loadPlanningLevel('tasks'); playSound(clickSound); } }
    function openPlanModal() { document.getElementById('planNameInput').value = ''; document.getElementById('planningPlanModal').classList.add('active'); playSound(clickSound); }
    function saveNewPlan() { const name = document.getElementById('planNameInput').value.trim(); const duration = document.getElementById('planDurationSelect').value; if(!name) return alert("أدخلي اسم الخطة"); let monthsCount = 3; let durationText = "ربع سنة"; if(duration === 'half') { monthsCount = 6; durationText = "نصف سنة"; } if(duration === 'full') { monthsCount = 12; durationText = "سنة كاملة"; } const months = []; for(let i=0; i<monthsCount; i++) { months.push({ name: `شهر ${i+1}`, weeks: [], note: '' }); } const newPlan = { id: Date.now().toString(), name: name, duration: durationText, months: months, note: '' }; appData.planning.plans.push(newPlan); saveData(); closeModal('planningPlanModal'); loadPlanningLevel('plans'); playSound(successSound); }
    function deletePlan(id) { if(confirm("حذف الخطة بالكامل؟")) { appData.planning.plans = appData.planning.plans.filter(p => p.id !== id); saveData(); loadPlanningLevel('plans'); playSound(clickSound); } }
    function openPlanningItemModal(type) { let title = ''; if(type === 'month') title = 'إضافة شهر'; if(type === 'week') title = 'إضافة أسبوع'; if(type === 'day') title = 'إضافة يوم'; if(type === 'task') title = 'إضافة مهمة'; document.getElementById('planningModalTitle').innerText = title; document.getElementById('planningItemName').value = ''; document.getElementById('planningItemModal').classList.add('active'); document.getElementById('planningItemModal').dataset.type = type; playSound(clickSound); }
    function savePlanningItem() { const type = document.getElementById('planningItemModal').dataset.type; const name = document.getElementById('planningItemName').value.trim(); if(!name) return alert("أدخلي الاسم"); if(type === 'month') { currentPlan.months.push({ name: name, weeks: [], note: '' }); } else if(type === 'week') { currentMonth.weeks.push({ name: name, days: [], note: '' }); } else if(type === 'day') { currentWeek.days.push({ name: name, tasks: [], note: '' }); } else if(type === 'task') { currentDay.tasks.push({ id: Date.now().toString(), name: name, completed: false }); } saveData(); closeModal('planningItemModal'); loadPlanningLevel(currentDay ? 'tasks' : currentWeek ? 'days' : currentMonth ? 'weeks' : 'months'); playSound(successSound); }
    function savePlanningNote() { const note = document.getElementById('planningNoteInput').value; if(currentDay) currentDay.note = note; else if(currentWeek) currentWeek.note = note; else if(currentMonth) currentMonth.note = note; else if(currentPlan) currentPlan.note = note; saveData(); playSound(successSound); }

    /* ================== الألعاب ================== */
    function openGames() { playSound(clickSound); showScreen('screen-games'); showGamesHub(); }
    function showGamesHub() { document.querySelectorAll('.game-container').forEach(c => c.style.display = 'none'); document.getElementById('gamesHub').style.display = 'grid'; }
    function startGame(gameId) {
        playSound(clickSound); document.getElementById('gamesHub').style.display = 'none'; document.querySelectorAll('.game-container').forEach(c => c.style.display = 'none'); document.getElementById(`game-${gameId}`).style.display = 'block';
        if(gameId === 'memory') initMemoryGame(); if(gameId === 'reaction') document.getElementById('reactionBox').style.background = '#ccc'; if(gameId === 'guess') { document.getElementById('guessResult').innerText = ''; document.getElementById('guessInput').value = ''; } if(gameId === 'math') generateMathProblem(); if(gameId === 'chess') initChess(); if(gameId === 'focus') startFocusGame();
    }
    const gameEmojis = ['📚', '💻', '🧠', '🎧', '☕', '✏️', '🔬', '🎓']; let memFlipped = []; let memMatched = 0; let memMoves = 0;
    function initMemoryGame() { const board = document.getElementById('memoryBoard'); board.innerHTML = ''; memMoves = 0; memMatched = 0; memFlipped = []; document.getElementById('memMoves').innerText = memMoves; let selectedEmojis = gameEmojis.slice(0, 4); let memCards = [...selectedEmojis, ...selectedEmojis, '⭐']; memCards.sort(() => Math.random() - 0.5); memCards.forEach((emoji, index) => { const card = document.createElement('div'); card.className = 'mem-card'; card.dataset.emoji = emoji; card.dataset.index = index; if (emoji === '⭐') { card.classList.add('matched'); card.innerText = emoji; } else { card.innerText = '❓'; } card.onclick = () => flipMemCard(card); board.appendChild(card); }); }
    function flipMemCard(card) { if (card.classList.contains('flipped') || card.classList.contains('matched') || memFlipped.length >= 2) return; card.classList.add('flipped'); card.innerText = card.dataset.emoji; memFlipped.push(card); playSound(clickSound, 0.2); if (memFlipped.length === 2) { memMoves++; document.getElementById('memMoves').innerText = memMoves; checkMemMatch(); } }
    function checkMemMatch() { const [card1, card2] = memFlipped; if (card1.dataset.emoji === card2.dataset.emoji) { card1.classList.add('matched'); card2.classList.add('matched'); memFlipped = []; memMatched++; playSound(successSound); if (memMatched === 4) { setTimeout(() => { alert(`🎉 فزتِ في ${memMoves} حركة!`); playSound(successSound, 1); }, 500); } } else { setTimeout(() => { card1.classList.remove('flipped'); card2.classList.remove('flipped'); card1.innerText = '❓'; card2.innerText = '❓'; memFlipped = []; }, 800); } }
    let reactionStart; function startReactionGame() { const box = document.getElementById('reactionBox'); box.style.background = '#f44336'; box.innerText = 'انتظر...'; const delay = Math.floor(Math.random() * 3000) + 1000; setTimeout(() => { box.style.background = '#4caf50'; box.innerText = 'اضغط الآن!'; reactionStart = Date.now(); box.onclick = () => { if(reactionStart) { const time = Date.now() - reactionStart; box.innerText = `Time: ${time}ms`; box.style.background = '#2196f3'; reactionStart = null; playSound(successSound); } }; }, delay); }
    let guessNumber = Math.floor(Math.random() * 100) + 1; function checkGuess() { const input = document.getElementById('guessInput').value; const result = document.getElementById('guessResult'); if(!input) return; const num = parseInt(input); if(num === guessNumber) { result.innerText = '🎉 صحيح!'; result.style.color = 'green'; playSound(successSound); } else if(num < guessNumber) { result.innerText = '📈 أكبر'; result.style.color = 'orange'; } else { result.innerText = '📉 أصغر'; result.style.color = 'orange'; } }
    let mathAnswer = 0; function generateMathProblem() { const a = Math.floor(Math.random() * 20) + 1; const b = Math.floor(Math.random() * 20) + 1; const ops = ['+', '-', '*']; const op = ops[Math.floor(Math.random() * ops.length)]; if(op === '+') mathAnswer = a + b; else if(op === '-') mathAnswer = a - b; else mathAnswer = a * b; document.getElementById('mathProblem').innerText = `${a} ${op} ${b} = ?`; document.getElementById('mathInput').value = ''; document.getElementById('mathResult').innerText = ''; } function checkMath() { const input = parseInt(document.getElementById('mathInput').value); const result = document.getElementById('mathResult'); if(input === mathAnswer) { result.innerText = '✅ صحيحة!'; result.style.color = 'green'; playSound(successSound); setTimeout(generateMathProblem, 1000); } else { result.innerText = '❌ خاطئة'; result.style.color = 'red'; } }
    const chessPieces = { 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙' }; let chessBoardState = []; let selectedSquare = null; let isWhiteTurn = true;
    function initChess() { const board = document.getElementById('chessBoard'); board.innerHTML = ''; chessBoardState = [['r','n','b','q','k','b','n','r'], ['p','p','p','p','p','p','p','p'], ['','','','','','','',''], ['','','','','','','',''], ['','','','','','','',''], ['','','','','','','',''], ['P','P','P','P','P','P','P','P'], ['R','N','B','Q','K','B','N','R']]; selectedSquare = null; isWhiteTurn = true; renderChessBoard(); }
    function renderChessBoard() { const board = document.getElementById('chessBoard'); board.innerHTML = ''; for(let r=0; r<8; r++) { for(let c=0; c<8; c++) { const square = document.createElement('div'); square.className = `chess-square ${(r+c)%2 === 0 ? 'light' : 'dark'}`; square.dataset.row = r; square.dataset.col = c; if(selectedSquare && selectedSquare.row === r && selectedSquare.col === c) { square.classList.add('selected'); } const piece = chessBoardState[r][c]; if(piece) { square.innerHTML = `<span class="piece">${chessPieces[piece]}</span>`; } square.onclick = () => handleChessClick(r, c); board.appendChild(square); } } }
    function handleChessClick(r, c) { const piece = chessBoardState[r][c]; if(selectedSquare) { if(selectedSquare.row === r && selectedSquare.col === c) { selectedSquare = null; } else { const selectedPiece = chessBoardState[selectedSquare.row][selectedSquare.col]; const isSelectedWhite = selectedPiece === selectedPiece.toUpperCase(); if((isWhiteTurn && isSelectedWhite) || (!isWhiteTurn && !isSelectedWhite)) { chessBoardState[r][c] = selectedPiece; chessBoardState[selectedSquare.row][selectedSquare.col] = ''; selectedSquare = null; isWhiteTurn = !isWhiteTurn; playSound(clickSound); } else { if(piece) { const isTargetWhite = piece === piece.toUpperCase(); if((isWhiteTurn && isTargetWhite) || (!isWhiteTurn && !isTargetWhite)) { selectedSquare = {row: r, col: c}; } } } } } else { if(piece) { const isTargetWhite = piece === piece.toUpperCase(); if((isWhiteTurn && isTargetWhite) || (!isWhiteTurn && !isTargetWhite)) { selectedSquare = {row: r, col: c}; playSound(clickSound); } } } renderChessBoard(); }
    let focusSequence = []; let focusPlayerIndex = 0; let focusPlaying = false; let focusLevel = 0; const focusColors = ['red', 'green', 'blue', 'yellow']; const focusSounds = { red: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', green: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3', blue: 'https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3', yellow: 'https://assets.mixkit.co/active_storage/sfx/2868/2868-preview.mp3' };
    function startFocusGame() { focusSequence = []; focusPlayerIndex = 0; focusPlaying = false; focusLevel = 0; document.getElementById('focusResult').innerText = 'استعدي...'; setTimeout(nextFocusRound, 1000); }
    function nextFocusRound() { focusLevel++; focusPlayerIndex = 0; focusPlaying = false; document.getElementById('focusResult').innerText = `المستوى ${focusLevel}`; const randomColor = focusColors[Math.floor(Math.random() * 4)]; focusSequence.push(randomColor); playFocusSequence(); }
    function playFocusSequence() { let i = 0; const interval = setInterval(() => { if(i >= focusSequence.length) { clearInterval(interval); focusPlaying = true; return; } const color = focusSequence[i]; const btn = document.querySelector(`.focus-btn[data-color="${color}"]`); btn.classList.add('active'); playSound(focusSounds[color], 0.3); setTimeout(() => { btn.classList.remove('active'); }, 400); i++; }, 600); }
    document.querySelectorAll('.focus-btn').forEach(btn => { btn.addEventListener('click', () => { if(!focusPlaying) return; const color = btn.dataset.color; btn.classList.add('active'); playSound(focusSounds[color], 0.3); setTimeout(() => { btn.classList.remove('active'); }, 200); if(color === focusSequence[focusPlayerIndex]) { focusPlayerIndex++; if(focusPlayerIndex === focusSequence.length) { focusPlaying = false; document.getElementById('focusResult').innerText = '✅ أحسنتِ! استعدي للمستوى التالي...'; playSound(successSound); setTimeout(nextFocusRound, 1500); } } else { focusPlaying = false; document.getElementById('focusResult').innerText = `❌ خطأ! وصلتِ للمستوى ${focusLevel}`; playSound('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3', 0.8); document.getElementById('focusResult').style.color = 'var(--color-urgent)'; } }); });

    /* ================== الإعدادات ================== */
    function toggleTheme() { document.body.classList.toggle('dark-mode'); const icon = document.getElementById('themeIcon'); if (document.body.classList.contains('dark-mode')) { icon.classList.replace('fa-moon', 'fa-sun'); localStorage.setItem('theme', 'dark'); } else { icon.classList.replace('fa-sun', 'fa-moon'); localStorage.setItem('theme', 'light'); } playSound(clickSound); }
    function changeProfileImg(event) { const file = event.target.files[0]; if(file) { const reader = new FileReader(); reader.onload = function(e) { appData.settings.profileImg = e.target.result; saveData(); document.getElementById('profileImg').src = e.target.result; playSound(successSound); }; reader.readAsDataURL(file); } }
    function changeLanguage() { appData.settings.lang = document.getElementById('settingsLang').value; saveData(); applySettings(); playSound(clickSound); }
    function toggleSoundSetting() { appData.settings.soundEnabled = document.getElementById('settingsSound').checked; saveData(); playSound(clickSound); }
    function changeBgImage(event) { const file = event.target.files[0]; if(file) { const reader = new FileReader(); reader.onload = function(e) { appData.settings.bgImage = e.target.result; saveData(); applySettings(); playSound(successSound); }; reader.readAsDataURL(file); } }
    function changeBgOpacity(val) { appData.settings.bgOpacity = val.target.value; saveData(); document.documentElement.style.setProperty('--app-bg-opacity', val.target.value); }
    function resetBackground() { appData.settings.bgImage = ''; saveData(); applySettings(); playSound(clickSound); }
    function changeName(val) { appData.settings.profileName = val.target.value; saveData(); document.getElementById('displayProfileName').innerText = val.target.value; playSound(clickSound); }
    function toggleQuoteType() { appData.settings.quoteType = document.getElementById('settingsQuoteType').value; saveData(); updateQuoteDisplay(); playSound(clickSound); }
    function saveQuotes() { const text = document.getElementById('settingsQuotes').value; appData.settings.quotes = text.split('\n').map(q => q.trim()).filter(q => q !== ''); saveData(); updateQuoteDisplay(); playSound(clickSound); }
    function saveAllSettings() { playSound(successSound); alert("تم الحفظ / Saved"); showScreen('screen-home'); }

    /* ================== التهيئة ================== */
    applySettings();
    checkPomoState();
    initDB();
    if(!isPomoRunning) document.getElementById('pomoStartBtn').innerText = 'ابدأ';
    
    // تفعيل بعض الأزرار الديناميكية
    document.getElementById('examFileType')?.addEventListener('change', toggleCustomExamType);


    /* ===== المرحلة 2 و 3: نقاط، مستويات، تودو، أصوات، تخطيط ===== */
    const DAYS=['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const need=l=>30+20*(l-1), uid=()=>Date.now().toString()+Math.floor(Math.random()*1e4);
    appData.xp=appData.xp||0; appData.level=appData.level||1; appData.total=appData.total||0;
    appData.sec=appData.sec||{todo:0,pomo:0,lessons:0,plan:0,games:0}; appData.streak=appData.streak||{n:0,last:''};
    const toast=t=>{const d=document.createElement('div');d.className='toast';d.innerText=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2600);};
    const LQ=[["كل خطوة صغيرة تحسب لك 🌱"],["أنتِ أقوى مما تظنين 💪","استمري، التقدم يتراكم ✨"],["الانضباط يصنع المعجزات 🔥","ما أجمل أن تفتخري بنفسك اليوم 🌟"],["أنتِ تبنين مستقبلك سطراً بسطر 🚀"],["أسطورة التركيز! لا شيء يوقفك 👑"],["وصلتِ لمستوى النخبة، استمري 🏆"]];
    const SYN={birds:['عصافير',1],river:['نهر',1],bell:['جرس',1],rain:['مطر',2],wind:['رياح بين الأشجار',2],chime:['رنين',3],waves:['أمواج',3],crickets:['صراصير الليل',4],fire:['نار مخيم',5],thunder:['رعد',6]};
    const NZ={river:['bandpass',700,.8,.3],rain:['highpass',3000,.4,.1],wind:['lowpass',500,.2,.5],waves:['lowpass',400,.15,.8],fire:['bandpass',1500,3,2],thunder:['lowpass',120,1,.2]};
    let actx; const AC=()=>actx||(actx=new (window.AudioContext||window.webkitAudioContext)());
    function playSynth(k,vol){const c=AC(),o=c.createGain();o.gain.value=vol;o.connect(c.destination);const T=c.currentTime;
        if(NZ[k]){const [ty,f,q,r]=NZ[k],b=c.createBuffer(1,c.sampleRate*5,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;const s=c.createBufferSource();s.buffer=b;const fl=c.createBiquadFilter();fl.type=ty;fl.frequency.value=f;fl.Q.value=q;const g=c.createGain(),l=c.createOscillator(),lg=c.createGain();l.frequency.value=r;lg.gain.value=.4;g.gain.value=.6;l.connect(lg).connect(g.gain);l.start(T);l.stop(T+5);s.connect(fl).connect(g).connect(o);g.gain.setValueAtTime(.6,T);g.gain.linearRampToValueAtTime(0,T+5);s.start(T);return;}
        const tone=(f0,f1,t,d,ty)=>{const q=c.createOscillator(),g=c.createGain();q.type=ty||'sine';q.frequency.setValueAtTime(f0,T+t);q.frequency.exponentialRampToValueAtTime(f1,T+t+d);g.gain.setValueAtTime(0,T+t);g.gain.linearRampToValueAtTime(.3,T+t+.02);g.gain.exponentialRampToValueAtTime(.001,T+t+d+.3);q.connect(g).connect(o);q.start(T+t);q.stop(T+t+d+.4);};
        if(k==='birds')for(let i=0;i<9;i++)tone(2200+Math.random()*1200,3500+Math.random()*900,i*.4+Math.random()*.2,.12);
        else if(k==='crickets')for(let i=0;i<30;i++)tone(4300,4300,i*.12,.04,'square');
        else if(k==='chime')[880,1175,1568,2093].forEach((f,i)=>tone(f,f,i*.3,.8));
        else [523,523].forEach((f,i)=>tone(f,f*.99,i*.9,1.5));}
    function playSound(url,vol=0.5){if(!appData.settings.soundEnabled)return;if(url&&url.startsWith('synth:')){try{playSynth(url.slice(6),vol);}catch(e){}return;}const a=new Audio(url);a.volume=vol;a.play().catch(e=>{});}
    function buildSounds(){const s=document.getElementById('pomoSoundSelect');[...s.options].filter(o=>o.value.startsWith('synth:')).forEach(o=>o.remove());Object.entries(SYN).forEach(([k,[n,l]])=>{const o=document.createElement('option');o.value='synth:'+k;o.text=(appData.level>=l?'🌿 ':'🔒 ')+n+(appData.level>=l?'':` (المستوى ${l})`);s.appendChild(o);});}
    function openPomoSetup(){buildSounds();document.getElementById('pomoSetupModal').classList.add('active');playSound(clickSound);}
    function applyPomoSetup(){if(isPomoRunning)return alert("أوقف المؤقت أولاً");const v=document.getElementById('pomoSoundSelect').value;if(v.startsWith('synth:')&&appData.level<SYN[v.slice(6)][1])return alert('هذا الصوت مقفول، يمكنك معاينته فقط. يُفتح في المستوى '+SYN[v.slice(6)][1]);pomoDuration=parseInt(document.getElementById('pomoTimeSelect').value)*60;pomoSoundUrl=v;updatePomoUI(pomoDuration);closeModal('pomoSetupModal');}
    const ICONS='book laptop-code pen flask bullhorn check dumbbell utensils mug-hot bed shower broom shirt cart-shopping pills phone envelope calendar car bus bicycle person-running music guitar headphones camera gamepad film paintbrush palette book-open graduation-cap school pencil calculator microscope atom dna language code terminal bug database wifi lightbulb brain heart star bell clock hourglass money-bill wallet piggy-bank gift cake plane suitcase map-location-dot house key lock soap bath tooth glasses hand-holding-heart seedling tree leaf sun moon cloud-rain fire droplet paw dog cat fish carrot apple-whole bread-slice pizza-slice ice-cream mug-saucer bottle-water plug wrench hammer scissors paperclip folder file-lines print clipboard-list list-check handshake users people-group user-doctor stethoscope syringe hospital mosque person-praying book-quran kaaba basketball futbol table-tennis chess puzzle-piece trophy medal bullseye flag rocket'.split(' ').map(x=>'fa-'+x);
    let selIcon=ICONS[0];
    function buildIcons(){const p=document.getElementById('iconPicker'),un=3+2*(appData.level-1);p.innerHTML='';ICONS.forEach((ic,i)=>{const b=document.createElement('button');b.type='button';b.className='ic'+(i>=un?' locked':'')+(ic===selIcon?' sel':'');b.innerHTML=`<i class="fa-solid ${ic}"></i>`;b.onclick=()=>{if(i>=un)return toast(`🔒 تُفتح أيقونتان جديدتان مع كل مستوى (المستوى ${Math.ceil((i-3)/2)+1})`);selIcon=ic;buildIcons();};p.appendChild(b);});}
    function chips(id,name){document.getElementById(id).innerHTML=DAYS.map((d,i)=>`<label class="chip"><input type="checkbox" name="${name}" value="${i}"><span>${d}</span></label>`).join('');}
    chips('todoDaysBox','tdays');chips('subDays','sdays');
    document.getElementById('todoRepeatMode')?.addEventListener('change',e=>{document.getElementById('todoDaysBox').style.display=e.target.value==='custom'?'flex':'none';});
    const fmt=d=>new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,16);
    function nextDate(days,end,after){for(let i=0;i<9;i++){const d=new Date();d.setDate(d.getDate()+i);if(!days.includes(d.getDay()))continue;const [h,m]=(end||'23:59').split(':');d.setHours(h,m,0,0);if(d>after)return fmt(d);}return '';}
    function openTodoModal(){['todoName','todoDeadline','todoStartTime','todoEndTime'].forEach(i=>document.getElementById(i).value='');document.getElementById('todoRepeatMode').value='';document.getElementById('todoDaysBox').style.display='none';document.querySelectorAll('[name=tdays]').forEach(c=>c.checked=false);selIcon=ICONS[0];buildIcons();document.getElementById('todoModal').classList.add('active');playSound(clickSound);}
    function saveTodo(){const name=document.getElementById('todoName').value.trim();if(!name)return alert("أدخلي اسم المهمة");const mode=document.getElementById('todoRepeatMode').value,start=document.getElementById('todoStartTime').value,end=document.getElementById('todoEndTime').value;let deadline=document.getElementById('todoDeadline').value,repeat=null;
        if(mode){const days=mode==='all'?[0,1,2,3,4,5,6]:[...document.querySelectorAll('[name=tdays]:checked')].map(c=>+c.value);if(!days.length)return alert("اختاري يوماً واحداً على الأقل");repeat={days,start,end};deadline=nextDate(days,end,new Date());}
        else if(end&&!deadline){deadline=nextDate([0,1,2,3,4,5,6],end,new Date());}
        appData.todos.push({id:uid(),name,icon:selIcon,deadline,start,end,importance:document.querySelector('input[name="todoImp"]:checked').value,completed:false,pinned:false,repeat});saveData();closeModal('todoModal');renderTodos();playSound(successSound);}
    function toggleTodo(id){const t=appData.todos.find(x=>x.id===id);t.completed=!t.completed;if(t.completed){if(!t.pts){t.pts=1;addPts(1,'todo');}if(t.repeat){appData.todos.push({...t,id:uid(),completed:false,pts:0,pinned:false,deadline:nextDate(t.repeat.days,t.repeat.end,new Date(Math.max(Date.now(),t.deadline?new Date(t.deadline):0)))});}}saveData();renderTodos();playSound(successSound);}
    function syncLessonPts(){let n=0;for(let i=1;i<=10;i++)appData[i].subjects.forEach(s=>(s.lessons||[]).forEach(l=>{if(l.exercises&&!l.pE){l.pE=1;n++;}if(l.reviewed&&!l.pR){l.pR=1;n++;}}));if(n)addPts(n,'lessons');}
    function addPts(n,sec){appData.xp+=n;appData.total+=n;appData.sec[sec]=(appData.sec[sec]||0)+n;let up=false;while(appData.xp>=need(appData.level)){appData.xp-=need(appData.level);appData.level++;up=true;}
        const td=new Date().toDateString();if(appData.streak.last!==td){appData.streak.n=(appData.streak.last===new Date(Date.now()-864e5).toDateString())?appData.streak.n+1:1;appData.streak.last=td;}
        saveData();renderXP();toast(up?`🎉 المستوى ${appData.level}! فُتحت مميزات جديدة`:`+${n} نقطة ⭐`);if(up)sfx('level');}
    function renderXP(){const L=appData.level,nd=need(L),pct=Math.round(appData.xp/nd*100),pool=LQ.slice(0,Math.min(L,LQ.length)).flat(),q=pool[Math.floor(Math.random()*pool.length)];
        const un=Object.entries(SYN).filter(([k,v])=>v[1]===L+1).map(([k,v])=>v[0]).join('، ');
        document.getElementById('xpBox').innerHTML=`<b>المستوى ${L}</b> • ${appData.xp}/${nd} • المجموع ${appData.total} ⭐ • 🔥 ${appData.streak.n} يوم<div class="xp-bar"><i style="width:${pct}%"></i></div><div class="xp-hint">${q}</div>`;
        document.getElementById('profileImgContainer').style.background=`conic-gradient(var(--primary) ${pct}%, rgba(128,128,128,.25) 0)`;
        document.querySelectorAll('.pts-badge').forEach(b=>b.innerText='⭐ نقاط هذا القسم: '+(appData.sec[b.dataset.sec]||0));}
    [['screen-todo','todo'],['screen-pomodoro','pomo'],['screen-lessons','lessons'],['screen-planning','plan'],['screen-memgames','games']].forEach(([id,s])=>{const e=document.getElementById(id);if(e){const b=document.createElement('div');b.className='pts-badge';b.dataset.sec=s;e.prepend(b);}});
    /* التخطيط */
    let pend=[];
    function renderSubs(){document.getElementById('subList').innerHTML=pend.map((s,i)=>`<div class="sub-row">${s.name} — ${s.days.map(d=>DAYS[d]).join('، ')} — ${s.hours||0} س <button class="del-btn" style="position:static;" onclick="rmSub(${i})"><i class="fa-solid fa-xmark"></i></button></div>`).join('');}
    function rmSub(i){pend.splice(i,1);renderSubs();}
    function addSub(){const name=document.getElementById('subName').value.trim(),days=[...document.querySelectorAll('[name=sdays]:checked')].map(c=>+c.value);if(!name||!days.length){alert('اكتبي الاسم واختاري يوماً واحداً على الأقل');return false;}pend.push({name,days,hours:document.getElementById('subHours').value});['subName','subHours'].forEach(i=>document.getElementById(i).value='');document.querySelectorAll('[name=sdays]').forEach(c=>c.checked=false);renderSubs();return true;}
    document.getElementById('btn-add-sub')?.addEventListener('click',addSub);
    function openPlanModal(){pend=[];document.getElementById('planStart').value=today();document.getElementById('planNameInput').value='';renderSubs();document.getElementById('planningPlanModal').classList.add('active');playSound(clickSound);}
    function saveNewPlan(){const name=document.getElementById('planNameInput').value.trim();if(!name)return alert("أدخلي اسم الخطة");if(document.getElementById('subName').value.trim()&&!addSub())return;const sd=document.getElementById('planStart').value;if(!sd)return alert('حددي تاريخ بداية الخطة');const du=document.getElementById('planDurationSelect').value,mc={quarter:3,third:4,half:6,full:12}[du],dt={quarter:'ربع سنة',third:'ثلث سنة',half:'نصف سنة',full:'سنة كاملة'}[du];
        const s=new Date(sd+'T00:00:00'),e=new Date(s);e.setMonth(e.getMonth()+mc);const months=[];let cur=null,wk=null;for(let d=new Date(s);d<e;d.setDate(d.getDate()+1)){const key=d.getFullYear()+'-'+d.getMonth();if(!cur||cur.key!==key){cur={key,name:MN[d.getMonth()]+' '+d.getFullYear(),note:'',weeks:[]};months.push(cur);wk=null;}if(!wk||wk.days.length>=7){wk={name:'الأسبوع '+(cur.weeks.length+1),note:'',days:[]};cur.weeks.push(wk);}const dw=d.getDay();wk.days.push({name:DAYS[dw]+' '+d.getDate(),date:iso(d),dow:dw,note:'',tasks:pend.filter(x=>x.days.includes(dw)).map(x=>({id:uid(),name:x.name,hours:x.hours,completed:false}))});}months.forEach(m=>delete m.key);
        appData.planning.plans.push({id:uid(),name,start:sd,duration:dt,months,subs:pend,note:''});saveData();closeModal('planningPlanModal');loadPlanningLevel('plans');playSound(successSound);}
    function togglePlanningTask(id){const t=currentDay.tasks.find(x=>x.id===id);t.completed=!t.completed;if(t.completed&&!t.pts){t.pts=1;addPts(1,'plan');}saveData();loadPlanningLevel('tasks');playSound(successSound);}
    function editPlanningTask(id){const t=currentDay.tasks.find(x=>x.id===id),n=prompt('تعديل المهمة:',t.name);if(n&&n.trim()){t.name=n.trim();saveData();loadPlanningLevel('tasks');}}
    renderXP();

    /* ===== ألعاب الذاكرة ===== */
    appData.mg=appData.mg||{lists:[],wrong:[]}; const MG=appData.mg;
    const $=id=>document.getElementById(id), R=()=>$('mg-root'), rnd=a=>a[Math.floor(Math.random()*a.length)], shuf=a=>[...a].sort(()=>Math.random()-.5), sleep=ms=>new Promise(r=>setTimeout(r,ms));
    const perks=()=>{const L=appData.level;return{L,lives:3+(L>=4?1:0),skip:L>=2?1:0,freeze:L>=3?1:0,mult:L>=5?2:1};};
    const face=(t,i)=>(i?`<img src="${i}">`:'')+(t||'');
    let T=null,G=null,E=null,mgAt='menu';
    const stopT=()=>{if(T){clearInterval(T);T=null;}};
    function bar(sec,end){stopT();let t=0;T=setInterval(()=>{if(G&&G.frozen>0){G.frozen-=.1;return;}t+=.1*(1+(G?G.ok:0)*.04);const i=document.querySelector('.tbar i');if(i)i.style.width=Math.max(0,100-t/sec*100)+'%';if(t>=sec){stopT();end();}},100);}
    function hud(b=1){return `<div class="mg-hud"><span>${'❤️'.repeat(Math.max(0,G.lives))}</span><span>✅ ${G.ok}</span><span>م${perks().L}</span>${G.fz?'<button class="mg-mini" id="mg-fz">❄️ تجميد</button>':''}<button class="mg-mini" id="mg-quit">إنهاء</button></div>${b?'<div class="tbar"><i style="width:100%"></i></div>':''}`;}
    function hook(){$('mg-quit')?.addEventListener('click',finish);$('mg-fz')?.addEventListener('click',()=>{if(G.fz>0){G.fz--;G.frozen=5;$('mg-fz').remove();}});}
    function lost(resume){stopT();sfx('lose');R().innerHTML=`<div class="mg-box"><h3>انتهت أرواحك 💔</h3><p>رصيدك ${appData.xp} نقطة. كل ٣ أرواح بـ ١٠ نقاط.</p><button class="btn btn-primary" id="mg-buy">شراء ٣ أرواح</button> <button class="btn btn-secondary" id="mg-end">إنهاء</button></div>`;
        $('mg-buy').onclick=()=>{if(appData.xp<10)return toast('نقاطك لا تكفي');appData.xp-=10;G.lives=3;saveData();renderXP();resume();};$('mg-end').onclick=finish;}
    function finish(){if(!G)return;stopT();sfx(G.ok?'win':'lose');const p=G.ok*perks().mult;if(p>0)addPts(p,'games');R().innerHTML=`<div class="mg-box"><h3>انتهت الجولة 🎉</h3><p>إجابات صحيحة: ${G.ok} • نقاط مكتسبة: ${p}</p><button class="btn btn-primary" onclick="mgMenu()">القائمة</button></div>`;G=null;}
    function mgBack(){stopT();G=null;if(mgAt==='menu')showScreen('screen-home');else mgMenu();}
    function mgMenu(){stopT();G=null;mgAt='menu';const P=perks();R().innerHTML=`<div class="mg-box"><p class="xp-hint">مستواك ${P.L}: ${P.lives} أرواح • ${5*P.L} بطاقات/جولة${P.skip?' • تخطي':''}${P.freeze?' • تجميد الوقت':''}${P.mult>1?' • نقاط ×2':''}<br>🔒 المستوى ${P.L+1}: بطاقات أكثر${P.L+1===2?'، تخطي':P.L+1===3?'، تجميد الوقت':P.L+1===4?'، روح إضافية':P.L+1===5?'، نقاط مضاعفة':'، تحدٍ أصعب'}</p>
        <label class="mg-time">⏱ زمن السؤال (ثواني): <input type="number" min="4" max="60" value="${MG.time||15}" oninput="mgTime(this.value)"></label>
        <button class="btn btn-primary mg-b" onclick="mgLists()">📚 قوائمي (إضافة/تعديل)</button>
        <div class="mg-grid"><button class="btn mg-sq" onclick="mgStart('flash')">🃏 فلاش كارد</button><button class="btn mg-sq" onclick="mgStart('match')">🧩 تطابق البطاقات</button><button class="btn mg-sq" onclick="mgStart('color')">🎨 بطاقات الألوان</button>
        <button class="btn mg-sq" onclick="mgStart('simon')">🔔 سلسلة الإشارات</button><button class="btn mg-sq" onclick="mgStart('digits')">🔢 مدى الأرقام</button><button class="btn mg-sq" onclick="mgStart('loc')">📍 أين كان؟</button></div></div>`;}
    function mgLists(){mgAt='lists';R().innerHTML=`<div class="mg-box"><button class="btn btn-primary" onclick="mgEdit()">+ إضافة قائمة</button>${MG.lists.map(l=>`<div class="sub-row"><span>${l.name} (${l.cards.length})</span><span><button class="edit-btn" onclick="mgEdit('${l.id}')"><i class="fa-solid fa-pen"></i></button><button class="del-btn" style="position:static;" onclick="mgDel('${l.id}')"><i class="fa-solid fa-xmark"></i></button></span></div>`).join('')||'<p class="xp-hint">لا توجد قوائم بعد</p>'}${MG.wrong.length?`<p class="xp-hint">قائمة الأخطاء: ${MG.wrong.length} بطاقة</p>`:''}</div>`;}
    function mgDel(id){if(confirm('حذف القائمة؟')){MG.lists=MG.lists.filter(l=>l.id!==id);MG.wrong=MG.wrong.filter(c=>c.lid!==id);saveData();mgLists();}}
    function img(file,cb){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,240/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.7));};im.src=r.result;};r.readAsDataURL(file);}
    function mgEdit(id){const l=MG.lists.find(x=>x.id===id);E=l?JSON.parse(JSON.stringify(l)):{id:uid(),name:'',cards:[{id:uid(),q:'',a:''}]};drawEd();}
    function drawEd(){R().innerHTML=`<div class="mg-box"><input class="mg-in" id="ed-name" placeholder="اسم القائمة (مثلاً رياضيات)" value="${E.name}">${E.cards.map((c,i)=>`<div class="ed-card"><b>بطاقة ${i+1}</b> <button class="del-btn" style="position:static;" data-d="${i}"><i class="fa-solid fa-xmark"></i></button><input class="mg-in" data-f="q" data-i="${i}" placeholder="السؤال" value="${c.q||''}"><label class="mg-file">🖼 صورة السؤال<input type="file" accept="image/*" data-f="qi" data-i="${i}" hidden></label>${c.qi?`<img src="${c.qi}" class="th">`:''}<input class="mg-in" data-f="a" data-i="${i}" placeholder="الإجابة" value="${c.a||''}"><label class="mg-file">🖼 صورة الإجابة<input type="file" accept="image/*" data-f="ai" data-i="${i}" hidden></label>${c.ai?`<img src="${c.ai}" class="th">`:''}</div>`).join('')}<button class="btn btn-secondary" id="ed-add">+ بطاقة</button> <button class="btn btn-primary" id="ed-save">حفظ</button></div>`;
        $('ed-name').oninput=e=>E.name=e.target.value;R().querySelectorAll('input[data-f]').forEach(n=>{const f=n.dataset.f,i=n.dataset.i;if(n.type==='file')n.onchange=()=>n.files[0]&&img(n.files[0],d=>{E.cards[i][f]=d;drawEd();});else n.oninput=()=>E.cards[i][f]=n.value;});
        R().querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{E.cards.splice(b.dataset.d,1);drawEd();});$('ed-add').onclick=()=>{E.cards.push({id:uid(),q:'',a:''});drawEd();};
        $('ed-save').onclick=()=>{const cs=E.cards.filter(c=>(c.q||c.qi)&&(c.a||c.ai));if(!E.name.trim()||!cs.length)return alert('اكتبي اسم القائمة وبطاقة كاملة واحدة على الأقل');E.cards=cs.map(c=>({...c,lid:E.id}));const k=MG.lists.findIndex(x=>x.id===E.id);if(k<0)MG.lists.push(E);else MG.lists[k]=E;saveData();toast('تم الحفظ ✅');mgLists();};}
    function mgStart(g){if(['simon','digits','loc','color'].includes(g))return {simon:gSimon,digits:gDigits,loc:gLoc,color:gColor}[g]();
        if(!MG.lists.length&&!MG.wrong.length)return mgLists(),toast('أضيفي قائمة أولاً');mgAt='pick';R().innerHTML=`<div class="mg-box"><h3>اختاري القوائم</h3><div class="scrl"><button class="mg-mini" onclick="mgScroll(1)">›</button><div class="chips-scroll" id="chs"><label class="chip"><input type="checkbox" id="pk-all"><span>كل القوائم</span></label>${MG.lists.map(l=>`<label class="chip"><input type="checkbox" class="pk" value="${l.id}"><span>${l.name}</span></label>`).join('')}${g==='flash'?`<label class="chip"><input type="checkbox" class="pk" value="wrong"><span>الأخطاء (${MG.wrong.length})</span></label>`:''}</div><button class="mg-mini" onclick="mgScroll(-1)">‹</button></div><label class="mg-time">${g==='match'?'عدد الأزواج':'عدد الأسئلة'}: <input type="number" id="pk-n" min="2" max="100" value="${g==='match'?Math.min(2+perks().L,12):5*perks().L}"></label><div id="pk-av" class="xp-hint"></div><button class="btn btn-primary" id="pk-go">ابدئي</button></div>`;
        $('pk-all').onchange=e=>document.querySelectorAll('.pk').forEach(c=>c.checked=e.target.checked&&c.value!=='wrong');
        $('pk-go').onclick=()=>{const s=[...document.querySelectorAll('.pk:checked')].map(c=>c.value);let pool=[];MG.lists.filter(l=>s.includes(l.id)).forEach(l=>pool.push(...l.cards));if(s.includes('wrong'))pool.push(...MG.wrong.map(c=>({...c,fw:1})));pool=[...new Map(pool.map(c=>[c.id,c])).values()];if(!pool.length)return toast('اختاري قائمة');const N=Math.max(1,parseInt($('pk-n').value)||0);if(N>pool.length)return alert(`⚠️ عدد البطاقات المتاحة في القوائم المختارة ${pool.length} فقط، وأنتِ اخترتِ ${N}. قلّلي العدد أو اختاري قوائم إضافية.`);if(g==='match'&&(N<2||N>12))return alert('عدد الأزواج في التطابق بين 2 و 12');(g==='flash'?gFlash:gMatch)(pool,N);};
        const av=()=>{const s=[...document.querySelectorAll('.pk:checked')].map(c=>c.value);let n=0;MG.lists.filter(l=>s.includes(l.id)).forEach(l=>n+=l.cards.length);if(s.includes('wrong'))n+=MG.wrong.length;$('pk-av').innerText='البطاقات المتاحة: '+n;};document.querySelectorAll('#pk-all,.pk').forEach(c=>c.addEventListener('change',av));av();}
    function gFlash(pool,N){const P=perks();G={lives:P.lives,ok:0,sk:P.skip,fz:P.freeze,n:0,frozen:0,total:N||5*P.L,tm:MG.time||15};let deck=[];
        const next=()=>{if(G.n>=G.total)return finish();if(!deck.length)deck=shuf(pool);const c=deck.pop();R().innerHTML=hud()+`<div class="fc"><div class="fc-in">${face(c.q,c.qi)}</div></div><div class="mg-act"><button class="btn btn-secondary" id="fc-flip">اقلبي</button>${G.sk?'<button class="btn btn-secondary" id="fc-skip">تخطي</button>':''}</div>`;hook();
            const flip=()=>{stopT();R().innerHTML=hud(0)+`<div class="fc back"><div class="fc-in">${face(c.a,c.ai)}</div></div><div class="mg-act"><button class="btn btn-primary" id="fc-ok">✅ صح</button><button class="btn btn-secondary" id="fc-no">❌ خطأ</button></div>`;hook();
                $('fc-ok').onclick=()=>{G.ok++;if(c.fw)MG.wrong=MG.wrong.filter(x=>x.id!==c.id);fin();};
                $('fc-no').onclick=()=>{(G.lives--,sfx('bad'));if(!MG.wrong.some(x=>x.id===c.id))MG.wrong.push({...c,fw:0});fin();};
                const fin=()=>{saveData();G.n++;if(G.n%3===0)G.tm=Math.max(3,G.tm-1);G.lives<=0?lost(next):next();};};
            $('fc-flip').onclick=flip;$('fc-skip')?.addEventListener('click',()=>{G.sk--;G.n++;next();});bar(G.tm,flip);};next();}
    function gMatch(pool,N){const P=perks(),n=Math.min(N||2+P.L,12,pool.length);G={lives:P.lives,ok:0,fz:P.freeze,frozen:0,pv:1};const cs=shuf(pool).slice(0,n),Q=shuf(cs.map(c=>({id:c.id,t:face(c.q,c.qi)}))),A=shuf(cs.map(c=>({id:c.id,t:face(c.a,c.ai)})));let sq=null,sa=null,busy=true;const sec=Math.max(15,Math.round((MG.time||15)*n*.7)-P.L*2);
        const col=(arr,s)=>`<div class="mcol"><small>${s==='q'?'الأسئلة':'الإجابات'}</small>${arr.map((t,i)=>{const o=t.done||t.up||(G.pv&&s==='q');return `<button class="tile ${o?'up':''} ${t.done?'done':''}" data-s="${s}" data-i="${i}">${o?t.t:'?'}</button>`;}).join('')}</div>`;
        const th=Math.max(34,Math.min(84,Math.floor((window.innerHeight-290)/n)-6)),draw=()=>{R().innerHTML=hud(G.pv?0:1)+`<div class="mrow" style="--th:${th}px;${th<50?'font-size:.7rem':''}">${col(Q,'q')}${col(A,'a')}</div>`;hook();R().querySelectorAll('.tile').forEach(b=>b.onclick=()=>click(b));};
        const click=b=>{const s=b.dataset.s,t=(s==='q'?Q:A)[b.dataset.i];if(busy||t.done||t.up)return;if(s==='q'){if(sq)sq.up=0;sq=t;}else{if(sa)sa.up=0;sa=t;}t.up=1;draw();if(!(sq&&sa))return;busy=true;
            if(sq.id===sa.id){sq.done=sa.done=1;sq.up=sa.up=0;sq=sa=null;G.ok++;sfx('win');if(G.ok>=n)return finish();busy=false;draw();}else{(G.lives--,sfx('bad'));sfx('bad');setTimeout(()=>{sq.up=sa.up=0;sq=sa=null;if(G.lives<=0)return lost(()=>{busy=false;draw();bar(sec,finish);});busy=false;draw();},800);}};
        draw();setTimeout(()=>{G.pv=0;busy=false;draw();bar(sec,finish);},1500+n*400);}
    const COLS=[['أحمر','#e53935'],['أزرق','#1e88e5'],['أخضر','#43a047'],['أصفر','#fdd835'],['برتقالي','#fb8c00'],['بنفسجي','#ab47bc'],['وردي','#ec407a'],['بني','#8d6e63']];
    function gColor(){const P=perks();G={lives:P.lives,ok:0,fz:P.freeze,frozen:0,n:0,tm:Math.max(2,(MG.time||15)/3)};const tot=8+3*P.L;mgAt='game';
        const next=()=>{if(G.n>=tot)return finish();const k=Math.min(3+P.L,8),ix=shuf(COLS.map((c,i)=>i)).slice(0,k);let w;do{w=shuf(ix);}while(w.some((x,i)=>x===ix[i]));const mode=Math.random()<.3?'word':'ink',t=rnd(ix),cs=ix.map((ink,i)=>({ink,word:w[i]}));
            R().innerHTML=hud()+`<h3 class="mg-q">${mode==='ink'?'اختاري اللون':'اختاري الكلمة'}: ${COLS[t][0]}</h3><div class="cgrid">${cs.map((c,i)=>`<button class="ctile" data-i="${i}" style="color:${COLS[c.ink][1]}">${COLS[c.word][0]}</button>`).join('')}</div>`;hook();
            const done=ok=>{stopT();G.n++;if(ok)G.ok++;else (G.lives--,sfx('bad'));if(G.n%3===0)G.tm=Math.max(1.5,G.tm-.3);G.lives<=0?lost(next):next();};
            R().querySelectorAll('.ctile').forEach(b=>b.onclick=()=>{const c=cs[b.dataset.i];done(mode==='ink'?c.ink===t:c.word===t);});bar(G.tm,()=>done(false));};next();}
    function gSimon(){const P=perks(),k=P.L>=3?6:4,col=['#e53935','#1e88e5','#43a047','#fdd835','#ab47bc','#fb8c00'],seq=[];G={lives:P.lives,ok:0};let inp=0,busy=true;
        const flash=async i=>{const b=document.querySelector(`.stile[data-i="${i}"]`);if(!b)return;b.classList.add('lit');try{const c=AC(),o=c.createOscillator(),g=c.createGain();o.frequency.value=260+i*60;g.gain.value=.2;o.connect(g).connect(c.destination);o.start();setTimeout(()=>o.stop(),300);}catch(e){}await sleep(350);b.classList.remove('lit');await sleep(150);};
        const draw=()=>{R().innerHTML=hud(0)+`<h3 class="mg-q" id="sm">شاهدي التسلسل...</h3><div class="sgrid">${col.slice(0,k).map((c,i)=>`<button class="stile" data-i="${i}" style="background:${c}"></button>`).join('')}</div>`;hook();R().querySelectorAll('.stile').forEach(b=>b.onclick=()=>click(+b.dataset.i));};
        const show=async()=>{busy=true;inp=0;await sleep(600);for(const i of seq)await flash(i);busy=false;$('sm')&&($('sm').innerText='دورك!');};
        const round=()=>{seq.push(Math.floor(Math.random()*k));draw();show();};
        const click=async i=>{if(busy)return;await flash(i);if(i===seq[inp]){if(++inp===seq.length){G.ok=seq.length;round();}}else{(G.lives--,sfx('bad'));if(G.lives<=0)return lost(()=>{draw();show();});draw();show();}};round();}
    function gDigits(){const P=perks();G={lives:P.lives,ok:0};let len=2+P.L;
        const next=()=>{const back=P.L>=2&&Math.random()<.4,d=Array.from({length:len},()=>Math.floor(Math.random()*10)).join('');R().innerHTML=hud(0)+`<h3 class="mg-q">${back?'احفظيها (ستكتبينها بالعكس)':'احفظي الأرقام'}</h3><div class="digits">${d}</div>`;hook();
            setTimeout(()=>{if(!G)return;R().innerHTML=hud()+`<h3 class="mg-q">${back?'اكتبيها معكوسة':'اكتبيها بالترتيب'}</h3><input id="dg" type="tel" class="mg-in"><button class="btn btn-primary" id="dg-ok">تأكيد</button>`;hook();$('dg').focus();
                const t=back?[...d].reverse().join(''):d,fin=v=>{stopT();if(v===t){G.ok++;len++;next();}else{(G.lives--,sfx('bad'));toast('الصحيح: '+t);G.lives<=0?lost(next):next();}};$('dg-ok').onclick=()=>fin($('dg').value.trim());bar(Math.max(5,(MG.time||15)/2+len/2),()=>fin(''));},1200+len*600);};next();}
    function gLoc(){const P=perks(),EM=Array.from('🍎🚗⭐🐱🎈🔔🌸📚🎧⚽🍕🌙'),size=P.L>=4?4:3,cells=size*size;G={lives:P.lives,ok:0,fz:P.freeze,frozen:0};let k=Math.min(1+P.L,cells-2);
        const grid=f=>`<div class="lgrid" style="grid-template-columns:repeat(${size},1fr)">${Array.from({length:cells},(_,i)=>`<button class="ltile" data-i="${i}">${f(i)}</button>`).join('')}</div>`;
        const round=()=>{const pos=shuf([...Array(cells).keys()]).slice(0,k),it=shuf(EM).slice(0,k);R().innerHTML=hud(0)+`<h3 class="mg-q">احفظي أماكن الأشياء</h3>`+grid(i=>it[pos.indexOf(i)]||'');hook();
            setTimeout(()=>{if(G)ask(0,shuf([...Array(k).keys()]),pos,it);},1500+k*600);};
        const ask=(j,ord,pos,it)=>{if(j>=k){k=Math.min(k+1,cells-2);return round();}const x=ord[j];R().innerHTML=hud()+`<h3 class="mg-q">أين كان ${it[x]} ؟</h3>`+grid(()=>'');hook();
            const done=ok=>{stopT();if(ok)G.ok++;else (G.lives--,sfx('bad'));G.lives<=0?lost(()=>ask(j+1,ord,pos,it)):ask(j+1,ord,pos,it);};
            R().querySelectorAll('.ltile').forEach(b=>b.onclick=()=>done(+b.dataset.i===pos[x]));bar(Math.max(3,(MG.time||15)/2),()=>done(false));};round();}
    $('btn-memgames')?.addEventListener('click',()=>{showScreen('screen-memgames');mgMenu();});

    /* ===== المرحلة 4 ===== */
    const MN=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
    function today(){return iso(new Date());}
    function sfx(k){if(!appData.settings.soundEnabled)return;try{const c=AC(),t0=c.currentTime,q={win:[[523,0],[659,.15],[784,.3],[1047,.45]],lose:[[300,0],[220,.2],[160,.4]],bad:[[200,0]],level:[[523,0],[659,.12],[784,.24],[1047,.36],[1319,.5],[1568,.64]]}[k];q.forEach(([f,t])=>{const o=c.createOscillator(),g=c.createGain();o.type=(k==='lose'||k==='bad')?'sawtooth':'triangle';o.frequency.value=f;g.gain.setValueAtTime(.15,t0+t);g.gain.exponentialRampToValueAtTime(.001,t0+t+.35);o.connect(g).connect(c.destination);o.start(t0+t);o.stop(t0+t+.4);});}catch(e){}}
    function mgTime(v){MG.time=Math.max(4,Math.min(60,+v||15));saveData();}
    function mgScroll(d){$('chs').scrollBy({left:d*160,behavior:'smooth'});}
    let xBack='screen-home';
    function X(title,html,back){xBack=back||'screen-home';$('x-title').innerText=title;$('x-root').innerHTML=html;showScreen('screen-x');}
    function xClose(){showScreen(xBack);}
    function allDays(){const o=[];appData.planning.plans.forEach(p=>p.months.forEach(m=>m.weeks.forEach(w=>w.days.forEach(d=>o.push({p,m,w,d})))));return o;}
    function renderToday(l){const el=$('planToday');if(!el)return;el.style.display=l==='plans'?'block':'none';if(l!=='plans')return;const items=[];allDays().forEach(x=>{if(x.d.date===today())x.d.tasks.forEach(k=>items.push({x,k}));});
        el.innerHTML=`<h4>📅 مهام اليوم</h4>`+(items.map(({x,k})=>`<label class="sub-row"><span><input type="checkbox" ${k.completed?'checked':''} data-k="${k.id}"> ${k.name} <small>(${x.p.name})</small></span></label>`).join('')||'<p class="xp-hint">لا توجد مهام لهذا اليوم</p>')+`<button class="btn btn-secondary" onclick="openTree()">🌳 شجرة الخطط</button>`;
        el.querySelectorAll('[data-k]').forEach(c=>c.onchange=()=>{const k=items.find(i=>i.k.id===c.dataset.k).k;k.completed=c.checked;if(k.completed&&!k.pts){k.pts=1;addPts(1,'plan');}saveData();});}
    function loadPlanningLevel(l){loadPlanningLevel_o(l);renderToday(l);}
    {const d=document.createElement('div');d.id='planToday';d.className='mg-box';document.querySelector('#screen-planning .page-header')?.after(d);}
    function openLate(){const rows=allDays().filter(x=>x.d.date&&x.d.date<today()).flatMap(x=>x.d.tasks.filter(k=>!k.completed).map(k=>({x,k})));
        X('متأخرات',rows.map(({x,k})=>`<label class="sub-row late"><span><input type="checkbox" data-k="${k.id}"> <i class="fa-solid fa-circle-exclamation" style="color:#e53935"></i> ${k.name} <small>— ${x.p.name} › ${x.m.name} › ${x.d.name} (${x.d.date})</small></span></label>`).join('')||'<div class="mg-box">🎉 لا توجد مهام متأخرة</div>');
        $('x-root').querySelectorAll('[data-k]').forEach(c=>c.onchange=()=>{const r=rows.find(i=>i.k.id===c.dataset.k);r.k.completed=true;if(!r.k.pts){r.k.pts=1;addPts(1,'plan');}saveData();c.closest('label').remove();});}
    const nst=ds=>{const tk=ds.flatMap(d=>d.tasks);if(ds[0].date&&ds[0].date>today())return'lock';if(!tk.length)return'none';return tk.every(k=>k.completed)?'done':'todo';};
    const ICO={lock:'🔒',done:'✅',todo:'⏳',none:'▫️'};
    const nd=(name,ds,inner)=>{const s=nst(ds);return `<details class="tn ${s}"><summary>${ICO[s]} ${name}</summary>${inner}</details>`;};
    function openTree(){X('شجرة الخطط',`<div class="tlegend"><span class="tn done">✅ منجز</span><span class="tn todo">⏳ لم يُنجز</span><span class="tn lock">🔒 لم يأتِ وقته</span></div>`+(appData.planning.plans.map(p=>nd('📘 '+p.name,p.months.flatMap(m=>m.weeks.flatMap(w=>w.days)),p.months.map(m=>nd(m.name,m.weeks.flatMap(w=>w.days),m.weeks.map(w=>nd(w.name,w.days,w.days.map(d=>{const s=nst([d]);return `<div class="tn leaf ${s}">${ICO[s]} ${d.name} (${d.tasks.filter(k=>k.completed).length}/${d.tasks.length})</div>`;}).join(''))).join(''))).join(''))).join('')||'<div class="mg-box">لا توجد خطط</div>'),'screen-planning');}
    /* الخطوط */
    const FONTS=['Cairo','Tajawal','Almarai','Amiri','Noto Kufi Arabic','Readex Pro','IBM Plex Sans Arabic','El Messiri','Changa','Lemonada','Reem Kufi','Harmattan'];
    function applyFont(f){if(!f){document.documentElement.style.removeProperty('--app-font');return;}if(!document.getElementById('gf-'+f)){const l=document.createElement('link');l.id='gf-'+f;l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family='+f.replace(/ /g,'+')+':wght@400;700&display=swap';document.head.appendChild(l);}document.documentElement.style.setProperty('--app-font',`'${f}'`);}
    {const r=document.createElement('div');r.className='settings-row';r.innerHTML=`<span>الخط</span><select id="settingsFont"><option value="">الافتراضي</option>${FONTS.map(f=>`<option>${f}</option>`).join('')}</select>`;$('settingsLang')?.closest('.settings-row')?.after(r);$('settingsFont').value=appData.settings.font||'';$('settingsFont').onchange=e=>{appData.settings.font=e.target.value;saveData();applyFont(e.target.value);};applyFont(appData.settings.font);}
    /* الترجمة للمحتوى الديناميكي */
    const EN={'ألعاب الذاكرة':'Memory Games','متأخرات':'Overdue','تواصل معنا':'Contact Us','الخط':'Font','الافتراضي':'Default','📚 قوائمي (إضافة/تعديل)':'📚 My Lists (add/edit)','🃏 فلاش كارد':'🃏 Flashcards','🧩 تطابق البطاقات':'🧩 Card Match','🎨 بطاقات الألوان':'🎨 Color Cards','🔔 سلسلة الإشارات':'🔔 Simon Sequence','🔢 مدى الأرقام':'🔢 Digit Span','📍 أين كان؟':'📍 Where Was It?','🧠 تذكّر الكلمات':'🧠 Word Recall','🔁 الحرف السابق':'🔁 N-Back','+ إضافة قائمة':'+ Add List','حفظ':'Save','إنهاء':'End','اقلبي':'Flip','تخطي':'Skip','✅ صح':'✅ Correct','❌ خطأ':'❌ Wrong','القائمة':'Menu','ابدئي':'Start','اختاري القوائم':'Choose lists','كل القوائم':'All lists','الأسئلة':'Questions','الإجابات':'Answers','انتهت أرواحك 💔':'Out of lives 💔','شراء ٣ أرواح':'Buy 3 lives','انتهت الجولة 🎉':'Round over 🎉','مهام اليوم':'Today\'s tasks','📅 مهام اليوم':'📅 Today\'s tasks','🌳 شجرة الخطط':'🌳 Plans tree','شجرة الخطط':'Plans tree','✅ منجز':'✅ Done','⏳ لم يُنجز':'⏳ Not done','🔒 لم يأتِ وقته':'🔒 Not yet','نوع الرسالة':'Message type','اقتراح':'Suggestion','مشكلة':'Problem','سؤال عام':'General question','أخرى':'Other','📎 إرفاق صورة':'📎 Attach image','طريقة الإرسال':'Send via','واتساب':'WhatsApp','تيليجرام (بوت)':'Telegram (bot)','إرسال':'Send','تاريخ بداية الخطة':'Plan start date','احفظي الأرقام':'Memorize the digits','تأكيد':'Confirm','احفظي الكلمات':'Memorize the words','اختاري الكلمات التي ظهرت':'Pick the words that appeared','اختاري اللون':'Pick the color','اختاري الكلمة':'Pick the word','احفظي أماكن الأشياء':'Memorize the positions','شاهدي التسلسل...':'Watch the sequence...','دورك!':'Your turn!','لا توجد قوائم بعد':'No lists yet','اسم القائمة (مثلاً رياضيات)':'List name (e.g. Math)','السؤال':'Question','الإجابة':'Answer','+ بطاقة':'+ Card','اكتبي رسالتك':'Write your message','🎉 لا توجد مهام متأخرة':'🎉 No overdue tasks','لا توجد مهام لهذا اليوم':'No tasks for today'};
    function trAll(){const en=appData.settings.lang==='en',w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const s=n.nodeValue.trim();if(!s)continue;if(en){if(EN[s]){n._o=n._o||n.nodeValue;n.nodeValue=n.nodeValue.replace(s,EN[s]);}}else if(n._o){n.nodeValue=n._o;n._o=null;}}
        document.querySelectorAll('[placeholder]').forEach(e=>{const p=e._p||e.getAttribute('placeholder');if(en&&EN[p]){e._p=p;e.setAttribute('placeholder',EN[p]);}else if(!en&&e._p){e.setAttribute('placeholder',e._p);e._p=null;}});}
    let trT;new MutationObserver(()=>{clearTimeout(trT);trT=setTimeout(trAll,60);}).observe(document.body,{childList:true,subtree:true});
    $('settingsLang')?.addEventListener('change',()=>setTimeout(trAll,150));setTimeout(trAll,300);
    /* التواصل */
    const CFG=window.APP_CONFIG||{},WA=CFG.whatsapp||'125217539',TG={url:CFG.telegramUrl||'',token:CFG.telegramToken||'',chat:CFG.telegramChat||''};
    function openContact(){X('تواصل معنا',`<div class="mg-box" style="text-align:right"><label>نوع الرسالة</label><select id="ct-type" class="mg-in"><option>اقتراح</option><option>مشكلة</option><option>سؤال عام</option><option>أخرى</option></select><textarea id="ct-msg" class="mg-in" rows="5" placeholder="اكتبي رسالتك"></textarea><label class="mg-file">📎 إرفاق صورة<input type="file" id="ct-img" accept="image/*" hidden></label> <small id="ct-fn"></small><br><label>طريقة الإرسال</label><select id="ct-via" class="mg-in"><option value="wa">واتساب</option><option value="tg">تيليجرام (بوت)</option></select><button class="btn btn-primary" id="ct-send">إرسال</button></div>`);
        $('ct-img').onchange=e=>$('ct-fn').innerText=e.target.files[0]?.name||'';
        $('ct-send').onclick=async()=>{const f=$('ct-img').files[0],m=$('ct-msg').value.trim();if(!m&&!f)return toast('اكتبي رسالة أولاً');const text=`[${$('ct-type').value}] ${m}`;
            if($('ct-via').value==='wa'){if(f&&navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text});return;}catch(e){}}window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`,'_blank');if(f)toast('أرفقي الصورة يدوياً داخل واتساب');}
            else{if(TG.url){const ok=await tgSend(text);toast(ok?'تم الإرسال ✅ (النص فقط)':'تعذّر الإرسال');return;}if(!TG.token||!TG.chat)return toast('بوت تيليجرام لم يُفعَّل بعد');try{const fd=new FormData();fd.append('chat_id',TG.chat);if(f){fd.append('photo',f);fd.append('caption',text);}else fd.append('text',text);const r=await fetch(`https://api.telegram.org/bot${TG.token}/${f?'sendPhoto':'sendMessage'}`,{method:'POST',body:fd});const d=await r.json().catch(()=>({}));if(d.ok)toast('تم الإرسال ✅');else alert('تيليجرام رفض الإرسال: '+(d.description||r.status));}catch(e){alert('تعذّر الاتصال بتيليجرام، تأكدي من الإنترنت');}}};}
    $('btn-late')?.addEventListener('click',openLate);$('btn-contact')?.addEventListener('click',openContact);
    /* لعبتان إضافيتان */

    /* ===== اسم الزائر + إرسال تيليجرام ===== */
    async function tgSend(text){if(!navigator.onLine)return false;if(TG.url){try{const r=await fetch(TG.url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})});return r.ok;}catch(e){return false;}}if(!TG.token||!TG.chat)return false;try{const r=await fetch(`https://api.telegram.org/bot${TG.token}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:TG.chat,text})});return r.ok;}catch(e){return false;}}
    function flushVisitor(){const p=appData.settings.pendingVisitor;if(p)tgSend(p).then(ok=>{if(ok){delete appData.settings.pendingVisitor;saveData();}});}
    function askName(){const o=document.createElement('div');o.className='modal-overlay active';o.style.zIndex=99999;o.innerHTML=`<div class="modal-content"><div class="modal-title">مرحباً 👋</div><div class="input-group"><label>ما اسمك؟</label><input type="text" id="nm-in" class="mg-in" placeholder="اسمك"></div><div class="modal-actions"><button class="btn btn-primary" id="nm-ok">موافق</button></div></div>`;document.body.appendChild(o);
        $('nm-ok').onclick=()=>{const n=$('nm-in').value.trim();if(!n)return $('nm-in').focus();appData.settings.profileName=n;appData.settings.nameAsked=1;appData.settings.pendingVisitor=`🆕 زائر جديد للتطبيق\nالاسم: ${n}\nالتاريخ: ${new Date().toLocaleString('ar')}`;saveData();$('displayProfileName').innerText=n;const s=$('settingsProfileName')||document.querySelector('input[onchange*="changeName"]');if(s)s.value=n;o.remove();flushVisitor();};}
    window.addEventListener('online',flushVisitor);
    if(!appData.settings.nameAsked)askName();else flushVisitor();
    if(Array.isArray(appData.settings.quotes)){let c=false;appData.settings.quotes=appData.settings.quotes.map(q=>{if(/كود/.test(q)){c=true;return 'مشوار الألف ميل يبدأ بخطوة.';}return q;});if(c)saveData();}
    /* ===== كشف الدوال للـ onclick المضمّنة (إصلاح أزرار الحذف/التعديل/التثبيت) ===== */
    Object.assign(window, { mgTime, mgScroll, openTree, xClose, mgBack, mgMenu, mgLists, mgEdit, mgDel, mgStart, rmSub, editPlanningTask, deleteExamFile, deleteExamSubject, deleteJournal, deleteLesson, deletePdfNote, deletePlan, deletePlanningTask, deleteSubject, deleteTodo, deleteVideoNote, editJournal, editPdfNote, editVideoNote, loadPlanningLevel, openEditLessonModal, pinTodo, seekVideo, showPopup, toggleExamPin, togglePlanningTask, toggleTodo });
});