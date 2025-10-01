console.log('app.js loaded');
console.log('categoriesConfig:', categoriesConfig);
console.log('questionsDatabase:', questionsDatabase);

class QuizApp {
    constructor() {
        this.currentCategory = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.answered = false;
        this.portalUrl = '/';

        // Таймер
        this.timer = null;
        this.timeLeft = 30;
        this.timerRunning = false;
        this.pausedTime = null; // Для сохранения времени при паузе

        this.exitModal = null;
        this.exitConfirm = null;
        this.exitCancel = null;

        this.init();
    }

    init() {
        this.cacheElements();
        this.renderCategories();
        this.attachEventListeners();
        this.initModal();
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

        // Таймер
        this.timerContainer = document.getElementById('timer-container');
        this.timerValue = document.getElementById('timer-value');

        this.resultsIcon = document.getElementById('results-icon');
        this.resultsTitle = document.getElementById('results-title');
        this.finalScoreSpan = document.getElementById('final-score');
        this.correctCountSpan = document.getElementById('correct-count');
        this.questionsCountSpan = document.getElementById('questions-count');
        this.resultsMessage = document.getElementById('results-message');
        this.percentageSpan = document.getElementById('percentage');
        this.resultsStats = document.getElementById('results-stats');

        this.exitBtn = document.getElementById('exit-btn');
        this.categoriesContainer = document.getElementById('categories-container');
    }

    // Динамическая генерация категорий с 3D переворотом
    renderCategories() {
        this.categoriesContainer.innerHTML = '';

        Object.keys(categoriesConfig).forEach(categoryKey => {
            const config = categoriesConfig[categoryKey];
            const questionsCount = questionsDatabase[categoryKey]?.length || 0;

            const categoryBtn = document.createElement('button');
            categoryBtn.className = 'category-btn';
            categoryBtn.dataset.category = categoryKey;

            categoryBtn.innerHTML = `
                <div class="category-card-inner">
                    <div class="category-card-front">
                        <span class="icon">${config.icon}</span>
                        <span class="title">${config.title}</span>
                    </div>
                    <div class="category-card-back">
                        <span class="back-icon">${config.icon}</span>
                        <div class="back-description">${config.description}</div>
                        <div class="back-divider"></div>
                        <div class="back-difficulty">${config.difficulty}</div>
                        <div class="back-questions">${questionsCount} вопросов</div>
                    </div>
                </div>
            `;

            this.categoriesContainer.appendChild(categoryBtn);
        });
    }

    initModal() {
        this.exitModal = document.getElementById('exit-modal');
        this.exitConfirm = document.getElementById('exit-confirm');
        this.exitCancel = document.getElementById('exit-cancel');

        // Проверка существования элементов модального окна
        if (this.exitConfirm && this.exitCancel) {
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
    }

    attachEventListeners() {
        if (this.exitBtn) {
            this.exitBtn.addEventListener('click', () => {
                this.handleExitClick();
            });
        }

        // Делегирование событий для категорий - только клик
        if (this.categoriesContainer) {
            this.categoriesContainer.addEventListener('click', (e) => {
                const categoryBtn = e.target.closest('.category-btn');
                if (categoryBtn) {
                    this.handleCategoryClick(categoryBtn);
                }
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextQuestion();
            });
        }

        const playAgainBtn = document.getElementById('play-again-btn');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => {
                this.startQuiz(this.currentCategory);
            });
        }

        const changeCategoryBtn = document.getElementById('change-category-btn');
        if (changeCategoryBtn) {
            changeCategoryBtn.addEventListener('click', () => {
                this.showScreen(this.welcomeScreen);
                // Сбрасываем все активные категории
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('show-info');
                });
            });
        }
    }

    // В методе handleCategoryClick замените этот код:
    handleCategoryClick(btn) {
        const category = btn.dataset.category;

        // Если категория уже показывает информацию - запускаем викторину
        if (btn.classList.contains('show-info')) {
            this.startQuiz(category);
        } else {
            // Скрываем информацию у всех категорий
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('show-info');
            });

            // Добавляем небольшую задержку для плавного переворота
            setTimeout(() => {
                btn.classList.add('show-info');
            }, 50);
        }
    }

    handleExitClick() {
        if (this.welcomeScreen.classList.contains('active')) {
            this.exitToPortal();
        } else {
            this.showExitModal();
        }
    }

    showExitModal() {
        if (this.exitModal) {
            this.exitModal.classList.add('active');
            // Сохраняем текущее время таймера
            if (this.timerRunning) {
                this.pausedTime = this.timeLeft;
                this.stopTimer();
            }
        }
    }

    hideExitModal() {
        if (this.exitModal) {
            this.exitModal.classList.remove('active');
            // Возобновляем таймер с сохраненного времени
            if (this.quizScreen.classList.contains('active') && !this.answered && this.pausedTime !== null) {
                this.timeLeft = this.pausedTime;
                this.pausedTime = null;
                this.startTimer();
            }
        }
    }

    returnToWelcomeScreen() {
        this.hideExitModal();
        this.stopTimer();
        this.pausedTime = null;
        this.showScreen(this.welcomeScreen);

        // Сбрасываем выбранную категорию
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('show-info');
        });
    }

    exitToPortal() {
        window.location.href = this.portalUrl;
    }

    startQuiz(category) {
        // Проверка существования категории и вопросов
        if (!questionsDatabase[category] || questionsDatabase[category].length === 0) {
            console.error(`No questions found for category: ${category}`);
            return;
        }

        this.currentCategory = category;
        this.questions = this.shuffleArray([...questionsDatabase[category]]);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.answered = false;
        this.pausedTime = null;

        this.totalQuestionsSpan.textContent = this.questions.length;

        this.showScreen(this.quizScreen);
        this.loadQuestion();
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    loadQuestion() {
        this.answered = false;
        const question = this.questions[this.currentQuestionIndex];

        // Проверка существования вопроса
        if (!question) {
            console.error('Question not found at index:', this.currentQuestionIndex);
            this.showResults();
            return;
        }

        this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = progress + '%';

        this.questionText.textContent = question.question;

        // Отображение изображения ТОЛЬКО если путь указан и не пустой
        if (question.image && question.image.trim() !== '') {
            this.questionImageContainer.innerHTML = `
                <img src="${question.image}"
                     alt="Изображение к вопросу"
                     class="question-image"
                     onerror="this.parentElement.classList.remove('visible')">
            `;
            this.questionImageContainer.classList.add('visible');
        } else {
            this.questionImageContainer.innerHTML = '';
            this.questionImageContainer.classList.remove('visible');
        }

        this.answersContainer.innerHTML = '';

        // Проверка существования ответов
        if (!question.answers || question.answers.length === 0) {
            console.error('No answers found for question:', question);
            return;
        }

        // Перемешиваем ответы
        const shuffledAnswers = question.answers.map((answer, index) => ({ answer, originalIndex: index }));
        this.shuffleArray(shuffledAnswers);

        shuffledAnswers.forEach((item) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = item.answer;
            button.dataset.originalIndex = item.originalIndex;
            button.addEventListener('click', () => this.selectAnswer(item.originalIndex, button));
            this.answersContainer.appendChild(button);
        });

        // Сбрасываем кнопку "Далее"
        this.nextBtn.classList.remove('active');
        this.nextBtn.disabled = true;

        // Запускаем таймер
        this.startTimer();
    }

    startTimer() {
        this.stopTimer();
        // Если нет сохраненного времени, начинаем с 30 секунд
        if (this.pausedTime === null) {
            this.timeLeft = 30;
        }
        this.timerRunning = true;
        this.updateTimerDisplay();

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                this.handleTimeOut();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            this.timerRunning = false;
        }
        if (this.timerContainer) {
            this.timerContainer.classList.remove('warning');
        }
    }

    updateTimerDisplay() {
        if (this.timerValue) {
            this.timerValue.textContent = this.timeLeft;
        }

        // Меняем стиль в зависимости от оставшегося времени
        if (this.timerContainer) {
            if (this.timeLeft <= 10) {
                this.timerContainer.classList.add('warning');
            } else {
                this.timerContainer.classList.remove('warning');
            }
        }
    }

    handleTimeOut() {
        this.stopTimer();

        if (this.answered) return;

        this.answered = true;

        // Подсвечиваем все ответы красным (timeout)
        const answerButtons = this.answersContainer.querySelectorAll('.answer-btn');

        answerButtons.forEach(btn => {
            btn.classList.add('disabled');
            btn.classList.add('timeout');
        });

        // Автоматический переход к следующему вопросу через 2 секунды
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    selectAnswer(selectedIndex, button) {
        if (this.answered) return;

        this.stopTimer();
        this.pausedTime = null; // Сбрасываем сохраненное время
        this.answered = true;

        const question = this.questions[this.currentQuestionIndex];
        const answerButtons = this.answersContainer.querySelectorAll('.answer-btn');

        answerButtons.forEach(btn => btn.classList.add('disabled'));

        if (selectedIndex === question.correct) {
            button.classList.add('correct');
            this.score += 10;
            this.correctAnswers++;
        } else {
            button.classList.add('incorrect');
            answerButtons.forEach(btn => {
                if (parseInt(btn.dataset.originalIndex) === question.correct) {
                    btn.classList.add('correct');
                }
            });
        }

        // Активируем кнопку "Далее"
        setTimeout(() => {
            this.nextBtn.classList.add('active');
            this.nextBtn.disabled = false;
        }, 300);
    }

    nextQuestion() {
        this.pausedTime = null; // Сбрасываем сохраненное время перед следующим вопросом
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.stopTimer();
        this.pausedTime = null;

        const percentage = Math.round((this.correctAnswers / this.questions.length) * 100);
        const incorrectAnswers = this.questions.length - this.correctAnswers;

        if (this.finalScoreSpan) this.finalScoreSpan.textContent = this.score;
        if (this.correctCountSpan) this.correctCountSpan.textContent = this.correctAnswers;
        if (this.questionsCountSpan) this.questionsCountSpan.textContent = this.questions.length;
        if (this.percentageSpan) this.percentageSpan.textContent = percentage + '%';

        if (this.resultsStats) {
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
        }

        if (this.resultsIcon && this.resultsTitle && this.resultsMessage) {
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
        }

        this.showScreen(this.resultsScreen);
    }

    showScreen(screen) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});