class QuizApp {
    constructor() {
        this.currentCategory = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.questionHistory = [];
        this.selectedAnswers = {}; // Хранение выбранных ответов
        this.portalUrl = '/';

        this.exitModal = null;
        this.exitConfirm = null;
        this.exitCancel = null;

        this.init();
    }

    init() {
        this.cacheElements();
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

    initModal() {
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
    }

    attachEventListeners() {
        this.exitBtn.addEventListener('click', () => {
            this.handleExitClick();
        });

        document.querySelectorAll('.category-btn').forEach(btn => {
            // Для мобильных - показываем инфо при первом клике, переход при втором
            let clickCount = 0;
            let clickTimer = null;

            btn.addEventListener('click', (e) => {
                const isMobile = window.innerWidth <= 768;
                const category = e.currentTarget.dataset.category;

                if (isMobile) {
                    clickCount++;

                    if (clickCount === 1) {
                        // Первый клик - показываем информацию
                        this.showCategoryInfo(e.currentTarget);

                        // Сбрасываем счетчик через 3 секунды
                        clickTimer = setTimeout(() => {
                            clickCount = 0;
                        }, 3000);
                    } else {
                        // Второй клик - запускаем викторину
                        clearTimeout(clickTimer);
                        clickCount = 0;
                        this.startQuiz(category);
                    }
                } else {
                    // На десктопе сразу запускаем
                    this.startQuiz(category);
                }
            });

            // Для десктопа - показываем инфо при наведении
            if (window.innerWidth > 768) {
                btn.addEventListener('mouseenter', (e) => {
                    this.showCategoryInfo(e.currentTarget);
                });

                btn.addEventListener('mouseleave', (e) => {
                    this.hideCategoryInfo(e.currentTarget);
                });
            }
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

    showCategoryInfo(btn) {
        const category = btn.dataset.category;
        const categoryData = this.getCategoryData(category);

        // Добавляем класс для анимации
        btn.classList.add('show-info');

        // Запускаем анимацию "слот-машины"
        this.animateSlotMachine(btn, categoryData);
    }

    hideCategoryInfo(btn) {
        btn.classList.remove('show-info');

        // Возвращаем исходное содержимое
        const category = btn.dataset.category;
        const icon = btn.querySelector('.icon').textContent;
        const title = btn.dataset.title;

        btn.innerHTML = `
            <span class="icon">${icon}</span>
            <span class="title">${title}</span>
        `;
    }

    animateSlotMachine(btn, data) {
        const icon = btn.querySelector('.icon').textContent;

        // Создаем контейнер для анимации
        btn.innerHTML = `
            <span class="icon">${icon}</span>
            <div class="category-info-container">
                <div class="slot-machine">
                    <div class="slot-content">
                        <span class="info-title">${data.title}</span>
                    </div>
                </div>
                <div class="slot-machine">
                    <div class="slot-content">
                        <span class="info-difficulty">Сложность: ${data.difficulty}</span>
                    </div>
                </div>
                <div class="slot-machine">
                    <div class="slot-content">
                        <span class="info-questions">${data.questions} вопросов</span>
                    </div>
                </div>
            </div>
        `;

        // Запускаем анимацию для каждого слота с задержкой
        const slots = btn.querySelectorAll('.slot-machine');
        slots.forEach((slot, index) => {
            setTimeout(() => {
                slot.classList.add('animate');
            }, index * 100);
        });
    }

    getCategoryData(category) {
        const categories = {
            geography: {
                title: 'География',
                difficulty: 'Средняя',
                questions: 10
            },
            aviation: {
                title: 'Авиация',
                difficulty: 'Сложная',
                questions: 10
            },
            culture: {
                title: 'Культура',
                difficulty: 'Средняя',
                questions: 10
            },
            science: {
                title: 'Наука',
                difficulty: 'Сложная',
                questions: 10
            },
            mixed: {
                title: 'Микс',
                difficulty: 'Разная',
                questions: 15
            }
        };
        return categories[category];
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
    }

    exitToPortal() {
        window.location.href = this.portalUrl;
    }

    startQuiz(category) {
        this.currentCategory = category;
        this.questions = [...questionsDatabase[category]];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.questionHistory = [];
        this.selectedAnswers = {}; // Сброс выбранных ответов

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
            button.addEventListener('click', () => this.selectAnswer(index));
            this.answersContainer.appendChild(button);
        });

        // Проверяем, был ли уже дан ответ на этот вопрос
        const savedAnswer = this.selectedAnswers[this.currentQuestionIndex];
        if (savedAnswer !== undefined) {
            // Восстанавливаем состояние
            this.restoreAnswerState(savedAnswer);
        } else {
            // Показываем кнопку "Далее" как неактивную
            this.nextBtn.classList.remove('active');
            this.nextBtn.disabled = true;
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

        if (selectedIndex === question.correct) {
            answerButtons[selectedIndex].classList.add('correct');
            this.score += 10;
            this.correctAnswers++;
        } else {
            answerButtons[selectedIndex].classList.add('incorrect');
            answerButtons[question.correct].classList.add('correct');
        }

        // Активируем кнопку "Далее"
        setTimeout(() => {
            this.nextBtn.classList.add('active');
            this.nextBtn.disabled = false;
        }, 500);
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
            // Удаляем сохраненный ответ для текущего вопроса
            delete this.selectedAnswers[this.currentQuestionIndex];

            // Если был дан ответ, вычитаем баллы
            const question = this.questions[this.currentQuestionIndex];
            const savedAnswer = this.selectedAnswers[this.currentQuestionIndex];
            if (savedAnswer === question.correct) {
                this.score -= 10;
                this.correctAnswers--;
            }

            this.currentQuestionIndex = this.questionHistory.pop();
            this.loadQuestion();
        } else {
            this.showScreen(this.welcomeScreen);
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