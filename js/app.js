class QuizApp {
    constructor() {
        this.currentCategory = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.questionHistory = [];
        this.selectedAnswers = {};
        this.portalUrl = '/';

        this.init();
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
    }

    cacheElements() {
        // Экраны
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.categoryInfoScreen = document.getElementById('category-info-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');

        // Элементы экрана информации о категории
        this.categoryInfoIcon = document.getElementById('category-info-icon');
        this.categoryInfoTitle = document.getElementById('category-info-title');
        this.categoryInfoDescription = document.getElementById('category-info-description');
        this.categoryInfoQuestions = document.getElementById('category-info-questions');
        this.categoryInfoDifficulty = document.getElementById('category-info-difficulty');
        this.categoryInfoBack = document.getElementById('category-info-back');
        this.categoryInfoStart = document.getElementById('category-info-start');

        // Элементы викторины
        this.questionText = document.getElementById('question-text');
        this.questionImageContainer = document.getElementById('question-image-container');
        this.answersContainer = document.getElementById('answers-container');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.totalQuestionsSpan = document.getElementById('total-questions');
        this.progressFill = document.getElementById('progress-fill');
        this.nextBtn = document.getElementById('next-btn');
        this.backBtn = document.getElementById('back-btn');

        // Элементы результатов
        this.resultsIcon = document.getElementById('results-icon');
        this.resultsTitle = document.getElementById('results-title');
        this.finalScoreSpan = document.getElementById('final-score');
        this.correctCountSpan = document.getElementById('correct-count');
        this.questionsCountSpan = document.getElementById('questions-count');
        this.resultsMessage = document.getElementById('results-message');
        this.percentageSpan = document.getElementById('percentage');
        this.resultsStats = document.getElementById('results-stats');

        // Кнопки
        this.exitBtn = document.getElementById('exit-btn');

        // Модальное окно выхода
        this.exitModal = document.getElementById('exit-modal');
        this.exitConfirm = document.getElementById('exit-confirm');
        this.exitCancel = document.getElementById('exit-cancel');
    }

    attachEventListeners() {
        // Кнопка выхода
        this.exitBtn.addEventListener('click', () => {
            this.handleExitClick();
        });

        // Кнопки категорий
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.showCategoryInfo(category);
            });
        });

        // Кнопки экрана информации о категории
        this.categoryInfoBack.addEventListener('click', () => {
            this.showScreen(this.welcomeScreen);
        });

        this.categoryInfoStart.addEventListener('click', () => {
            if (this.selectedCategory) {
                this.startQuiz(this.selectedCategory);
            }
        });

        // Кнопки викторины
        this.backBtn.addEventListener('click', () => {
            this.goBack();
        });

        this.nextBtn.addEventListener('click', () => {
            this.nextQuestion();
        });

        // Кнопки результатов
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.startQuiz(this.currentCategory);
        });

        document.getElementById('change-category-btn').addEventListener('click', () => {
            this.showScreen(this.welcomeScreen);
        });

        // Модальное окно выхода
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
    }

    getCategoryData(category) {
        const categories = {
            cinema: {
                title: 'Кино на борту',
                icon: '🎬',
                difficulty: 'Средняя',
                questions: 10,
                description: 'Проверьте свои знания о фильмах и кинематографе. Вопросы о классических и современных картинах.'
            },
            literature: {
                title: 'Литература',
                icon: '📚',
                difficulty: 'Средняя',
                questions: 10,
                description: 'Классические и современные произведения мировой литературы. Проверьте свою начитанность!'
            },
            school: {
                title: 'Школа',
                icon: '🏫',
                difficulty: 'Средняя',
                questions: 10,
                description: 'Вопросы из школьной программы по разным предметам. Вспомните школьные годы!'
            },
            ecology: {
                title: 'Экология',
                icon: '🌱',
                difficulty: 'Тяжелая',
                questions: 10,
                description: 'Окружающая среда, природа и экологические проблемы. Насколько вы эко-сознательны?'
            },
            cartoons: {
                title: 'Мультфильмы',
                icon: '🐭',
                difficulty: 'Легкая',
                questions: 10,
                description: 'Любимые персонажи и сюжеты из мультфильмов. Отличная викторина для всей семьи!'
            },
            art: {
                title: 'Искусство',
                icon: '🎨',
                difficulty: 'Сложная',
                questions: 10,
                description: 'Живопись, скульптура и другие виды искусства. Для настоящих ценителей прекрасного!'
            }
        };
        return categories[category];
    }

    showCategoryInfo(category) {
        const categoryData = this.getCategoryData(category);

        this.categoryInfoIcon.textContent = categoryData.icon;
        this.categoryInfoTitle.textContent = categoryData.title;
        this.categoryInfoDescription.textContent = categoryData.description;
        this.categoryInfoQuestions.textContent = categoryData.questions;
        this.categoryInfoDifficulty.textContent = categoryData.difficulty;

        this.selectedCategory = category;

        this.showScreen(this.categoryInfoScreen);
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

        const savedAnswer = this.selectedAnswers[this.currentQuestionIndex];
        if (savedAnswer !== undefined) {
            this.restoreAnswerState(savedAnswer);
        } else {
            this.nextBtn.classList.remove('active');
            this.nextBtn.disabled = true;
        }

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
        if (this.selectedAnswers[this.currentQuestionIndex] !== undefined) {
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        const answerButtons = this.answersContainer.querySelectorAll('.answer-btn');

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
            this.currentQuestionIndex = this.questionHistory.pop();
            this.loadQuestion();
        } else {
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

        // Прокрутка наверх при смене экрана
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
