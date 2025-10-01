// Конфигурация категорий
const categoriesConfig = {
    cinema: {
        title: 'Кино на борту',
        icon: '🎬',
        difficulty: 'Средняя',
        description: 'Проверьте свои знания о кино и сериалах, доступных на борту',
        color: 'cinema' // для CSS стилей
    },
    literature: {
        title: 'Литература',
        icon: '📚',
        difficulty: 'Средняя',
        description: 'Вопросы о классической и современной литературе'
    },
    school: {
        title: 'Школьные вопросы',
        icon: '🎓',
        difficulty: 'Лёгкая',
        description: 'Базовые знания из школьной программы'
    },
    cartoons: {
        title: 'Мультфильмы',
        icon: '🎨',
        difficulty: 'Лёгкая',
        description: 'Вопросы о любимых мультфильмах и их героях'
    },
    ecology: {
        title: 'Экология',
        icon: '🌱',
        difficulty: 'Сложная',
        description: 'Вопросы об окружающей среде и экологии'
    },
    art: {
        title: 'Искусство',
        icon: '🖼️',
        difficulty: 'Сложная',
        description: 'Живопись, скульптура и другие виды искусства'
    }
};

// База вопросов
const questionsDatabase = {
    cinema: [
        {
            question: "Кто сыграл главную роль в фильме 'Титаник'?",
            answers: ["Брэд Питт", "Леонардо ДиКаприо", "Том Круз", "Джонни Депп"],
            correct: 1,
            image: "images/ART_1.jpg" //
        },
        {
            question: "В каком году вышел первый фильм 'Звёздные войны'?",
            answers: ["1975", "1977", "1980", "1983"],
            correct: 1,
            image: "images/ART_1.jpg"
        },
        {
            question: "Какой фильм получил 'Оскар' за лучший фильм в 2020 году?",
            answers: ["1917", "Джокер", "Паразиты", "Однажды в Голливуде"],
            correct: 2,
            image: "images/ART_1.jpg"
        },
        {
            question: "Кто режиссёр фильма 'Начало' (Inception)?",
            answers: ["Стивен Спилберг", "Кристофер Нолан", "Квентин Тарантино", "Мартин Скорсезе"],
            correct: 1,
            image: "images/ART_1.jpg"
        },
        {
            question: "Какой актёр сыграл Железного человека в киновселенной Marvel?",
            answers: ["Крис Эванс", "Крис Хемсворт", "Роберт Дауни мл.", "Марк Руффало"],
            correct: 2,
            image: "images/ART_1.jpg"
        },
        {
            question: "В каком фильме прозвучала фраза 'Да пребудет с тобой Сила'?",
            answers: ["Звёздный путь", "Звёздные войны", "Стражи Галактики", "Интерстеллар"],
            correct: 1,
            image: "images/ART_1.jpg"
        },
        {
            question: "Кто сыграл Джокера в фильме 'Тёмный рыцарь'?",
            answers: ["Хоакин Феникс", "Джаред Лето", "Хит Леджер", "Джек Николсон"],
            correct: 2,
            image: "images/ART_1.jpg"
        },
        {
            question: "Какой фильм стал самым кассовым в истории кино?",
            answers: ["Титаник", "Аватар", "Мстители: Финал", "Звёздные войны"],
            correct: 2,
            image: "images/ART_1.jpg"
        },
        {
            question: "Кто режиссёр трилогии 'Властелин колец'?",
            answers: ["Питер Джексон", "Гильермо дель Торо", "Ридли Скотт", "Джеймс Кэмерон"],
            correct: 0,
            image: "images/ART_1.jpg"
        },
        {
            question: "В каком году вышел первый фильм о Гарри Поттере?",
            answers: ["1999", "2001", "2003", "2005"],
            correct: 1,
            image: "images/ART_1.jpg"
        }
    ],

    literature: [
        {
            question: "Кто написал роман 'Война и мир'?",
            answers: ["Достоевский", "Толстой", "Чехов", "Пушкин"],
            correct: 1,
            image: "images/literature/war-peace.jpg"
        },
        {
            question: "Какое произведение начинается со слов 'Все счастливые семьи похожи друг на друга'?",
            answers: ["Война и мир", "Анна Каренина", "Преступление и наказание", "Отцы и дети"],
            correct: 1,
            image: "images/literature/anna.jpg"
        },
        {
            question: "Кто автор романа '1984'?",
            answers: ["Олдос Хаксли", "Рэй Брэдбери", "Джордж Оруэлл", "Курт Воннегут"],
            correct: 2,
            image: "images/literature/1984.jpg"
        },
        {
            question: "Какой роман Достоевского посвящён истории Родиона Раскольникова?",
            answers: ["Идиот", "Братья Карамазовы", "Преступление и наказание", "Бесы"],
            correct: 2,
            image: "images/literature/crime.jpg"
        },
        {
            question: "Кто написал 'Мастера и Маргариту'?",
            answers: ["Булгаков", "Платонов", "Шолохов", "Пастернак"],
            correct: 0,
            image: "images/literature/master.jpg"
        },
        {
            question: "Какое произведение Пушкина считается первым русским романом в стихах?",
            answers: ["Руслан и Людмила", "Евгений Онегин", "Полтава", "Медный всадник"],
            correct: 1,
            image: "images/literature/onegin.jpg"
        },
        {
            question: "Кто автор романа 'Три товарища'?",
            answers: ["Эрнест Хемингуэй", "Эрих Мария Ремарк", "Фрэнсис Скотт Фицджеральд", "Джон Стейнбек"],
            correct: 1,
            image: "images/literature/three.jpg"
        },
        {
            question: "Какой роман Льва Толстого автобиографичен?",
            answers: ["Детство", "Анна Каренина", "Воскресение", "Казаки"],
            correct: 0,
            image: "images/literature/childhood.jpg"
        },
        {
            question: "Кто написал 'Старик и море'?",
            answers: ["Джек Лондон", "Эрнест Хемингуэй", "Герман Мелвилл", "Марк Твен"],
            correct: 1,
            image: "images/literature/oldman.jpg"
        },
        {
            question: "Какое произведение Гоголя начинается с описания города N?",
            answers: ["Ревизор", "Мёртвые души", "Тарас Бульба", "Вий"],
            correct: 1,
            image: "images/literature/deadsouls.jpg"
        }
    ],

    school: [
        {
            question: "Сколько планет в Солнечной системе?",
            answers: ["7", "8", "9", "10"],
            correct: 1,
            image: "images/school/planets.jpg"
        },
        {
            question: "Какой газ необходим для дыхания?",
            answers: ["Азот", "Кислород", "Углекислый газ", "Гелий"],
            correct: 1,
            image: "images/school/oxygen.jpg"
        },
        {
            question: "Столица Франции?",
            answers: ["Лондон", "Берлин", "Париж", "Мадрид"],
            correct: 2,
            image: "images/school/paris.jpg"
        },
        {
            question: "Сколько будет 7 × 8?",
            answers: ["54", "56", "63", "64"],
            correct: 1,
            image: "images/school/math.jpg"
        },
        {
            question: "Какой океан самый большой?",
            answers: ["Атлантический", "Индийский", "Северный Ледовитый", "Тихий"],
            correct: 3,
            image: "images/school/ocean.jpg"
        },
        {
            question: "Кто открыл Америку?",
            answers: ["Магеллан", "Колумб", "Васко да Гама", "Кук"],
            correct: 1,
            image: "images/school/columbus.jpg"
        },
        {
            question: "Сколько континентов на Земле?",
            answers: ["5", "6", "7", "8"],
            correct: 2,
            image: "images/school/continents.jpg"
        },
        {
            question: "Какая самая длинная река в мире?",
            answers: ["Нил", "Амазонка", "Янцзы", "Миссисипи"],
            correct: 1,
            image: "images/school/river.jpg"
        },
        {
            question: "При какой температуре замерзает вода?",
            answers: ["-10°C", "0°C", "+10°C", "+100°C"],
            correct: 1,
            image: "images/school/water.jpg"
        },
        {
            question: "Сколько букв в русском алфавите?",
            answers: ["31", "32", "33", "34"],
            correct: 2,
            image: "images/school/alphabet.jpg"
        }
    ],

    cartoons: [
        {
            question: "Как зовут главного героя мультфильма 'Король Лев'?",
            answers: ["Симба", "Муфаса", "Шрам", "Тимон"],
            correct: 0,
            image: "images/cartoons/simba.jpg"
        },
        {
            question: "Какого цвета платье у Белоснежки?",
            answers: ["Красное", "Синее", "Жёлтое и синее", "Зелёное"],
            correct: 2,
            image: "images/cartoons/snowwhite.jpg"
        },
        {
            question: "Как зовут оленя из мультфильма 'Холодное сердце'?",
            answers: ["Олаф", "Свен", "Кристофф", "Ханс"],
            correct: 1,
            image: "images/cartoons/frozen.jpg"
        },
        {
            question: "Сколько гномов было у Белоснежки?",
            answers: ["5", "6", "7", "8"],
            correct: 2,
            image: "images/cartoons/dwarfs.jpg"
        },
        {
            question: "Как зовут рыбку-клоуна из мультфильма 'В поисках Немо'?",
            answers: ["Дори", "Немо", "Марлин", "Брюс"],
            correct: 1,
            image: "images/cartoons/nemo.jpg"
        },
        {
            question: "Какой мультфильм создала студия Pixar первым?",
            answers: ["История игрушек", "Корпорация монстров", "В поисках Немо", "Тачки"],
            correct: 0,
            image: "images/cartoons/toystory.jpg"
        },
        {
            question: "Как зовут главную героиню мультфильма 'Рапунцель'?",
            answers: ["Ариэль", "Белль", "Рапунцель", "Жасмин"],
            correct: 2,
            image: "images/cartoons/rapunzel.jpg"
        },
        {
            question: "Кто озвучивал Осла в мультфильме 'Шрек' (русская версия)?",
            answers: ["Александр Цекало", "Михаил Галустян", "Гарик Харламов", "Павел Воля"],
            correct: 0,
            image: "images/cartoons/shrek.jpg"
        },
        {
            question: "Как зовут медвежонка, который любит мёд?",
            answers: ["Балу", "Винни-Пух", "Йоги", "Паддингтон"],
            correct: 1,
            image: "images/cartoons/winnie.jpg"
        },
        {
            question: "Какой мультфильм получил первый 'Оскар' в категории 'Лучший анимационный фильм'?",
            answers: ["Шрек", "История игрушек", "Король Лев", "Красавица и Чудовище"],
            correct: 0,
            image: "images/cartoons/oscar.jpg"
        }
    ],

    ecology: [
        {
            question: "Какой газ является основным парниковым газом?",
            answers: ["Кислород", "Азот", "Углекислый газ", "Метан"],
            correct: 2,
            image: "images/ecology/greenhouse.jpg"
        },
        {
            question: "Сколько времени разлагается пластиковая бутылка?",
            answers: ["10 лет", "50 лет", "100 лет", "450 лет"],
            correct: 3,
            image: "images/ecology/plastic.jpg"
        },
        {
            question: "Какой процент поверхности Земли покрыт водой?",
            answers: ["50%", "60%", "71%", "80%"],
            correct: 2,
            image: "images/ecology/water.jpg"
        },
        {
            question: "Что такое 'озоновый слой'?",
            answers: ["Слой воды в атмосфере", "Защитный слой от УФ-излучения", "Слой углекислого газа", "Слой пыли"],
            correct: 1,
            image: "images/ecology/ozone.jpg"
        },
        {
            question: "Какое животное является символом WWF?",
            answers: ["Тигр", "Панда", "Слон", "Белый медведь"],
            correct: 1,
            image: "images/ecology/panda.jpg"
        },
        {
            question: "Сколько процентов кислорода производят океаны?",
            answers: ["20%", "40%", "50%", "70%"],
            correct: 3,
            image: "images/ecology/ocean.jpg"
        },
        {
            question: "Какой вид энергии считается самым экологичным?",
            answers: ["Угольная", "Нефтяная", "Солнечная", "Газовая"],
            correct: 2,
            image: "images/ecology/solar.jpg"
        },
        {
            question: "Что такое 'углеродный след'?",
            answers: ["След от угля", "Количество выбросов CO2", "Чёрный цвет почвы", "Отпечаток ноги"],
            correct: 1,
            image: "images/ecology/carbon.jpg"
        },
        {
            question: "Какой лес называют 'лёгкими планеты'?",
            answers: ["Тайга", "Амазонские джунгли", "Африканская саванна", "Европейские леса"],
            correct: 1,
            image: "images/ecology/amazon.jpg"
        },
        {
            question: "Сколько мусора производит один человек в год (в среднем)?",
            answers: ["100 кг", "250 кг", "400 кг", "600 кг"],
            correct: 2,
            image: "images/ecology/trash.jpg"
        }
    ],

    art: [
        {
            question: "Кто написал картину 'Мона Лиза'?",
            answers: ["Микеланджело", "Леонардо да Винчи", "Рафаэль", "Донателло"],
            correct: 1,
            image: "images/art/monalisa.jpg"
        },
        {
            question: "В каком музее находится 'Мона Лиза'?",
            answers: ["Эрмитаж", "Лувр", "Прадо", "Метрополитен"],
            correct: 1,
            image: "images/art/louvre.jpg"
        },
        {
            question: "Кто автор картины 'Звёздная ночь'?",
            answers: ["Клод Моне", "Винсент Ван Гог", "Пабло Пикассо", "Сальвадор Дали"],
            correct: 1,
            image: "images/art/starrynight.jpg"
        },
        {
            question: "Какой художник отрезал себе ухо?",
            answers: ["Пикассо", "Ван Гог", "Гоген", "Сезанн"],
            correct: 1,
            image: "images/art/vangogh.jpg"
        },
        {
            question: "Кто создал скульптуру 'Давид'?",
            answers: ["Микеланджело", "Донателло", "Бернини", "Роден"],
            correct: 0,
            image: "images/art/david.jpg"
        },
        {
            question: "Какое направление в искусстве основал Пабло Пикассо?",
            answers: ["Импрессионизм", "Кубизм", "Сюрреализм", "Экспрессионизм"],
            correct: 1,
            image: ""
        },
        {
            question: "Кто написал 'Чёрный квадрат'?",
            answers: ["Кандинский", "Малевич", "Шагал", "Филонов"],
            correct: 1,
            image: ""
        },
        {
            question: "В каком городе находится Эрмитаж?",
            answers: ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург"],
            correct: 1,
            image: ""
        },
        {
            question: "Кто автор фрески 'Сотворение Адама'?",
            answers: ["Леонардо да Винчи", "Микеланджело", "Рафаэль", "Боттичелли"],
            correct: 1,
            image: "images/art/adam.jpg"
        },
        {
            question: "Какой художник известен своими 'плавящимися часами'?",
            answers: ["Пикассо", "Дали", "Магритт", "Миро"],
            correct: 1,
            image: "images/art/dali.jpg"
        }
    ]
};