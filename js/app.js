class QuizApp {
    constructor() {
        this.currentCategory = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.questionHistory = [];
        this.selectedAnswers = {}; // Хранение выбранных ответов для каждого вопроса
        this.portalUrl = '/';

        this.exitModal = null;
        this.exitConfirm = null;
        this.exitCancel = null;

        this.categoryModal = null;
        this.categoryModalData = null;

        this.init();
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.initModals();
    }

    cacheElements() {
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');

        this.questionText = document.getElementById('question-text');
        this.questionImageContainer = document.getElementById('question-image-container');
        this.answersContainer = document.getElementById('answers-container');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.totalQuestionsSpan = document.getElementById('total-questions');
        this.progressFill = document.getElementById('progress-fill');
        this.nextBtn = document.getElementById('next-btn');
        this.backBtn = document.getElementById('back-btn');

        this.resultsIcon = document.getElementById('results-icon');
        this.resultsTitle = document.getElementById('results-title');
        this.finalScoreSpan = document.getElementById('final-score');
        this.correctCountSpan = document.getElementById('correct-count');
        this.questionsCountSpan = document.getElementById('questions-count');
        this.resultsMessage = document.getElementById('results-message');
        this.percentageSpan = document.getElementById('percentage');
        this.resultsStats = document.getElementById('results-stats');

        this.exitBtn = document.getElementById('exit-btn');
    }

    initModals() {
        // Exit modal
        this.exitModal = document.getElementById('exit-modal');
        this.exitConfirm = document.getElementById('exit-confirm');
        this.exitCancel = document.getElementById('exit-cancel');

        this.exitConfirm.addEventListener('click', () => {
            this.returnToWelcomeScreen();
        });

        this.exitCancel.addEventListener('click', () => {
            this.hideExitModal();
        });

        this.exitModal.addEventListener('click', (e) => {
            if (e.target === this.exitModal) {
                this.hideExitModal();
            }
        });

        // Category modal
        this.categoryModal = document.getElementById('category-modal');
        this.categoryModalIcon = document.getElementById('category-modal-icon');
        this.categoryModalTitle = document.getElementById('category-modal-title');
        this.categoryModalDescription = document.getElementById('category-modal-description');
        this.categoryModalQuestions = document.getElementById('category-modal-questions');
        this.categoryModalDifficulty = document.getElementById('category-modal-difficulty');
        this.categoryBackBtn = document.getElementById('category-back');
        this.categoryStartBtn = document.getElementById('category-start');

        this.categoryBackBtn.addEventListener('click', () => {
            this.hideCategoryModal();
        });

        this.categoryStartBtn.addEventListener('click', () => {
            this.hideCategoryModal();
            if (this.selectedCategory) {
        this.startQuiz(this.selectedCategory);
            }
        });

        this.categoryModal.addEventListener('click', (e) => {
            if (e.target === this.categoryModal) {
                this.hideCategoryModal();
            }
        });
    }

    attachEventListeners() {
        this.exitBtn.addEventListener('click', () => {
            this.handleExitClick();
        });

        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.showCategoryModal(category, e.currentTarget);
            });
        });

        this.backBtn.addEventListener('click', () => {
            this.goBack();
        });

        this.nextBtn.addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.startQuiz(this.currentCategory);
        });

        document.getElementById('change-category-btn').addEventListener('click', () => {
            this.showScreen(this.welcomeScreen);
        });
    }

    getCategoryData(category) {
        const categories = {
            geography: {
                title: 'География',
                icon: '🌍',
                difficulty: 'Средняя',
                questions: 10,
                description: 'Проверьте свои знаниимттттттттттим тмитмитимтимтимтимтмитимтимтмия о странах, столицах, реках и горах мира.'
            },
            aviation: {
                title: 'Авиация',
                icon: '✈️',
                difficulty: 'Сложная',
                questions: 10,
                description: 'Узнайте, насколько хорошо вы разбираетесь в авиации и истории полётов.'
            },
            culture: {
                title: 'Культура',
                icon: '🎭',
                difficulty: 'Средняя',
                questions: 10,
                description: 'Проверьте свои знания в области искусства, литературы и музыки.'
            },
            science: {
                title: 'Наука',
                icon: '🔬',
                difficulty: 'Сложная',
                questions: 10,
                description: 'Испытайте свои знания в области физики, химии и биологии.'
            },
            mixed: {
                title: 'Микс',
                icon: '🎲',
                difficulty: 'Разная',
                questions: 15,
                description: 'Разнообразная викторина с вопросами из всех категорий.'
            }
        };
        return categories[category];
    }

    showCategoryModal(category, btnElement) {
        const categoryData = this.getCategoryData(category);

        this.categoryModalIcon.textContent = categoryData.icon;
        this.categoryModalTitle.textContent = categoryData.title;
        this.categoryModalDescription.textContent = categoryData.description;
        this.categoryModalQuestions.textContent = categoryData.questions;
        this.categoryModalDifficulty.textContent = categoryData.difficulty;

        // Сохраняем выбранную категорию в отдельном поле
        this.selectedCategory = category;

        this.categoryModal.classList.add('active');
    }

    hideCategoryModal() {
        this.categoryModal.classList.remove('active');
        this.categoryModalData = null;
    }

    handleExitClick() {
        if (this.welcomeScreen.classList.contains('active')) {
            this.exitToPortal();
        } else {
            this.showExitModal();
        }
    }

    showExitModal() {
        this.exitModal.classList.add('active');
    }

    hideExitModal() {
        this.exitModal.classList.remove('active');
    }

    returnToWelcomeScreen() {
        this.hideExitModal();
        this.showScreen(this.welcomeScreen);
        this.resetQuiz();
    }

    exitToPortal() {
        window.location.href = this.portalUrl;
    }

    resetQuiz() {
        this.currentCategory = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.questionHistory = [];
        this.selectedAnswers = {};
    }

    startQuiz(category) {
        this.currentCategory = category;
        this.questions = [...questionsDatabase[category]];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.questionHistory = [];
        this.selectedAnswers = {};

        this.totalQuestionsSpan.textContent = this.questions.length;

        this.showScreen(this.quizScreen);
        this.loadQuestion();
    }

    loadQuestion() {
        const question = this.questions[this.currentQuestionIndex];

        this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = progress + '%';

        if (question.image) {
            this.questionImageContainer.innerHTML = `<img src="${question.image}" alt="Изображение вопроса" class="question-image">`;
        } else {
            this.questionImageContainer.innerHTML = '';
        }

        this.questionText.textContent = question.question;
        this.answersContainer.innerHTML = '';

        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.dataset.index = index;
            button.addEventListener('click', () => this.selectAnswer(index));
            this.answersContainer.appendChild(button);
        });

        // Проверяем, был ли уже дан ответ на этот вопрос
        const savedAnswer = this.selectedAnswers[this.currentQuestionIndex];
        if (savedAnswer !== undefined) {
            // Восстанавливаем состояние
            this.restoreAnswerState(savedAnswer);
        } else {
            // Скрываем кнопку "Далее"
            this.nextBtn.classList.remove('active');
            this.nextBtn.disabled = true;
        }

        // Управление кнопкой "Назад"
        if (this.questionHistory.length === 0) {
            this.backBtn.style.opacity = '0.5';
        } else {
            this.backBtn.style.opacity = '1';
        }
    }

    restoreAnswerState(selectedIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const answerButtons = this.answersContainer.querySelectorAll('.answer-btn');

        answerButtons.forEach(btn => btn.classList.add('disabled'));

        if (selectedIndex === question.correct) {
            answerButtons[selectedIndex].classList.add('correct');
        } else {
            answerButtons[selectedIndex].classList.add('incorrect');
            answerButtons[question.correct].classList.add('correct');
        }

        this.nextBtn.classList.add('active');
        this.nextBtn.disabled = false;
    }

    selectAnswer(selectedIndex) {
        // Если уже был выбран ответ, игнорируем
        if (this.selectedAnswers[this.currentQuestionIndex] !== undefined) {
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        const answerButtons = this.answersContainer.querySelectorAll('.answer-btn');

        // Сохраняем выбранный ответ
        this.selectedAnswers[this.currentQuestionIndex] = selectedIndex;

        answerButtons.forEach(btn => btn.classList.add('disabled'));

        const isCorrect = selectedIndex === question.correct;

        if (isCorrect) {
            answerButtons[selectedIndex].classList.add('correct');
            this.score += 10;
            this.correctAnswers++;
        } else {
            answerButtons[selectedIndex].classList.add('incorrect');
            answerButtons[question.correct].classList.add('correct');
        }

        // Активируем кнопку "Далее" быстрее (100ms вместо 500ms)
        setTimeout(() => {
            this.nextBtn.classList.add('active');
            this.nextBtn.disabled = false;
        }, 100);
    }

    nextQuestion() {
        this.questionHistory.push(this.currentQuestionIndex);
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }

    goBack() {
        if (this.questionHistory.length > 0) {
            // Возвращаемся к предыдущему вопросу
            this.currentQuestionIndex = this.questionHistory.pop();

            // НЕ удаляем сохраненный ответ - он должен остаться
            // delete this.selectedAnswers[this.currentQuestionIndex]; // УДАЛЕНО

            this.loadQuestion();
        } else {
            // Если истории нет, возвращаемся на главный экран
            this.showExitModal();
        }
    }

    showResults() {
        const percentage = Math.round((this.correctAnswers / this.questions.length) * 100);
        const incorrectAnswers = this.questions.length - this.correctAnswers;

        this.finalScoreSpan.textContent = this.score;
        this.correctCountSpan.textContent = this.correctAnswers;
        this.questionsCountSpan.textContent = this.questions.length;
        this.percentageSpan.textContent = percentage + '%';

        this.resultsStats.innerHTML = `
            <div class="stat-item">
                <span class="stat-value">${this.correctAnswers}</span>
                <span class="stat-label">Правильно</span>
            </div>
            <div class="stat-item">
                <span class="stat-value" style="color: var(--err);">${incorrectAnswers}</span>
                <span class="stat-label">Неправильно</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${percentage}%</span>
                <span class="stat-label">Точность</span>
            </div>
        `;

        if (percentage >= 90) {
            this.resultsIcon.textContent = '🏆';
            this.resultsTitle.textContent = 'Превосходно!';
            this.resultsMessage.textContent = 'Вы настоящий эксперт! Фантастический результат! Ваши знания впечатляют!';
        } else if (percentage >= 70) {
            this.resultsIcon.textContent = '🌟';
            this.resultsTitle.textContent = 'Отличная работа!';
            this.resultsMessage.textContent = 'Вы показали отличные знания! Так держать! Продолжайте в том же духе!';
        } else if (percentage >= 50) {
            this.resultsIcon.textContent = '👍';
            this.resultsTitle.textContent = 'Хороший результат!';
            this.resultsMessage.textContent = 'Неплохо! Есть куда стремиться! Ещё немного практики и будет отлично!';
        } else {
            this.resultsIcon.textContent = '📚';
            this.resultsTitle.textContent = 'Можно лучше!';
            this.resultsMessage.textContent = 'Не расстраивайтесь! Попробуйте ещё раз! Каждая попытка делает вас умнее!';
        }

        this.showScreen(this.resultsScreen);
    }

    showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});