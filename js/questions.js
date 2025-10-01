const questionsDatabase = {
    cinema: [
        {
            question: "Какая столица России?",
            answers: ["Санкт-Петербург", "Москва", "Казань", "Владивосток"],
            correct: 1,
            image: "images/ART_1.jpg" // Пример изображения
        },
        {
            question: "Какая самая длинная река в мире?",
            answers: ["Нил", "Амазонка", "Янцзы", "Миссисипи"],
            correct: 1,
            image: "images/ART_1.jpg"
        },
        {
            question: "В какой стране находится город Токио?",
            answers: ["Китай", "Южная Корея", "Япония", "Таиланд"],
            correct: 2,
            image: "images/ART_1.jpg"
        },
        {
            question: "Какой океан самый большой?",
            answers: ["Атлантический", "Индийский", "Северный Ледовитый", "Тихий"],
            correct: 3,
            image: "images/ART_1.jpg"
        },
        {
            question: "Столица Франции?",
            answers: ["Лондон", "Берлин", "Париж", "Мадрид"],
            correct: 2,
            image: "images/ART_1.jpg"
        },
        {
            question: "Какая гора самая высокая в мире?",
            answers: ["Эльбрус", "Килиманджаро", "Эверест", "Монблан"],
            correct: 2,
            image: "images/ART_1.jpg"
        },
        {
            question: "В какой стране находится Великая Китайская стена?",
            answers: ["Япония", "Монголия", "Китай", "Корея"],
            correct: 2,
            image: "images/ART_1.jpg"
        },
        {
            question: "Какое озеро самое глубокое в мире?",
            answers: ["Байкал", "Виктория", "Танганьика", "Мичиган"],
            correct: 0,
            image: "images/ART_1.jpg"
        },
        {
            question: "Столица Италии?",
            answers: ["Милан", "Венеция", "Рим", "Флоренция"],
            correct: 2,
            image: "images/ART_1.jpg"
        },
        {
            question: "Какой континент самый большой по площади?",
            answers: ["Африка", "Северная Америка", "Евразия", "Южная Америка"],
            correct: 2,
            image: "images/ART_1.jpg"
        }
    ],

    literature: [
        {
            question: "В каком году был основан Аэрофлот?",
            answers: ["1923", "1932", "1945", "1950"],
            correct: 0,
            image: "images/aeroflot-history.jpg"
        },
        {
            question: "Какая крейсерская скорость современного Boeing 777?",
            answers: ["650 км/ч", "750 км/ч", "905 км/ч", "1050 км/ч"],
            correct: 2,
            image: "images/boeing777.jpg"
        },
        {
            question: "Что означает термин 'Мах 1'?",
            answers: ["Скорость света", "Скорость звука", "Максимальная высота", "Взлётная скорость"],
            correct: 1,
            image: "images/mach1.jpg"
        },
        {
            question: "Какой самолёт является крупнейшим пассажирским авиалайнером?",
            answers: ["Boeing 747", "Airbus A380", "Boeing 777", "Airbus A350"],
            correct: 1,
            image: "images/a380.jpg"
        },
        {
            question: "На какой высоте обычно летают пассажирские самолёты?",
            answers: ["5-7 км", "10-12 км", "15-17 км", "20-22 км"],
            correct: 1,
            image: "images/altitude.jpg"
        },
        {
            question: "Кто совершил первый управляемый полёт?",
            answers: ["Братья Райт", "Леонардо да Винчи", "Жюль Верн", "Игорь Сикорский"],
            correct: 0,
            image: "images/wright-brothers.jpg"
        },
        {
            question: "Какой код IATA у аэропорта Шереметьево?",
            answers: ["DME", "SVO", "VKO", "MOW"],
            correct: 1,
            image: "images/sheremetyevo.jpg"
        },
        {
            question: "Что такое 'чёрный ящик' самолёта?",
            answers: ["Топливный бак", "Бортовой самописец", "Радар", "Автопилот"],
            correct: 1,
            image: "images/black-box.jpg"
        },
        {
            question: "Какой самолёт называют 'Суперджет'?",
            answers: ["SSJ-100", "Ту-154", "Як-42", "Ил-96"],
            correct: 0,
            image: "images/superjet.jpg"
        },
        {
            question: "Что означает термин 'турбулентность'?",
            answers: ["Взлёт", "Посадка", "Вихревые потоки воздуха", "Скорость полёта"],
            correct: 2,
            image: "images/turbulence.jpg"
        }
    ],

    school: [
        {
            question: "Кто написал роман 'Война и мир'?",
            answers: ["Достоевский", "Толстой", "Чехов", "Пушкин"],
            correct: 1,
            image: "images/war-and-peace.jpg"
        },
        {
            question: "Какой музей находится в Санкт-Петербурге?",
            answers: ["Лувр", "Прадо", "Эрмитаж", "Британский музей"],
            correct: 2,
            image: "images/hermitage.jpg"
        },
        {
            question: "Кто написал 'Лунную сонату'?",
            answers: ["Моцарт", "Бах", "Бетховен", "Шопен"],
            correct: 2,
            image: "images/beethoven.jpg"
        },
        {
            question: "В каком году появился первый звуковой фильм?",
            answers: ["1920", "1927", "1935", "1940"],
            correct: 1,
            image: "images/sound-film.jpg"
        },
        {
            question: "Кто написал 'Мастера и Маргариту'?",
            answers: ["Булгаков", "Платонов", "Шолохов", "Пастернак"],
            correct: 0,
            image: "images/master-margarita.jpg"
        },
        {
            question: "Какая картина принадлежит кисти Леонардо да Винчи?",
            answers: ["Звёздная ночь", "Мона Лиза", "Крик", "Герника"],
            correct: 1,
            image: "images/mona-lisa.jpg"
        },
        {
            question: "Кто автор балета 'Лебединое озеро'?",
            answers: ["Чайковский", "Прокофьев", "Шостакович", "Рахманинов"],
            correct: 0,
            image: "images/swan-lake.jpg"
        },
        {
            question: "В каком городе находится Большой театр?",
            answers: ["Санкт-Петербург", "Москва", "Казань", "Новосибирск"],
            correct: 1,
            image: "images/bolshoi.jpg"
        },
        {
            question: "Кто написал пьесу 'Ревизор'?",
            answers: ["Гоголь", "Островский", "Грибоедов", "Фонвизин"],
            correct: 0,
            image: "images/revisor.jpg"
        },
        {
            question: "Какой инструмент не является струнным?",
            answers: ["Скрипка", "Виолончель", "Флейта", "Контрабас"],
            correct: 2,
            image: "images/instruments.jpg"
        }
    ],

    ecology: [
        {
            question: "Сколько планет в Солнечной системе?",
            answers: ["7", "8", "9", "10"],
            correct: 1,
            image: "images/solar-system.jpg"
        },
        {
            question: "Какой газ необходим для дыхания?",
            answers: ["Азот", "Кислород", "Углекислый газ", "Гелий"],
            correct: 1,
            image: "images/oxygen.jpg"
        },
        {
            question: "Кто открыл закон всемирного тяготения?",
            answers: ["Эйнштейн", "Ньютон", "Галилей", "Кеплер"],
            correct: 1,
            image: "images/newton.jpg"
        },
        {
            question: "Какая скорость света в вакууме?",
            answers: ["100 000 км/с", "300 000 км/с", "500 000 км/с", "1 000 000 км/с"],
            correct: 1,
            image: "images/speed-of-light.jpg"
        },
        {
            question: "Сколько костей у взрослого человека?",
            answers: ["186", "206", "226", "246"],
            correct: 1,
            image: "images/skeleton.jpg"
        },
        {
            question: "Какой элемент имеет химический символ Au?",
            answers: ["Серебро", "Алюминий", "Золото", "Медь"],
            correct: 2,
            image: "images/gold.jpg"
        },
        {
            question: "Сколько хромосом у человека?",
            answers: ["23", "46", "48", "92"],
            correct: 1,
            image: "images/chromosomes.jpg"
        },
        {
            question: "Кто изобрёл радио?",
            answers: ["Эдисон", "Тесла", "Попов", "Маркони"],
            correct: 2,
            image: "images/radio.jpg"
        },
        {
            question: "При какой температуре замерзает вода?",
            answers: ["-10°C", "0°C", "+10°C", "+100°C"],
            correct: 1,
            image: "images/ice.jpg"
        },
        {
            question: "Какая планета ближайшая к Солнцу?",
            answers: ["Венера", "Земля", "Меркурий", "Марс"],
            correct: 2,
            image: "images/mercury.jpg"
        }
    ],
        cartoons: [
        {
            question: "Сколько планет в Солнечной системе?",
            answers: ["7", "8", "9", "10"],
            correct: 1,
            image: "images/solar-system.jpg"
        },
        {
            question: "Какой газ необходим для дыхания?",
            answers: ["Азот", "Кислород", "Углекислый газ", "Гелий"],
            correct: 1,
            image: "images/oxygen.jpg"
        },
        {
            question: "Кто открыл закон всемирного тяготения?",
            answers: ["Эйнштейн", "Ньютон", "Галилей", "Кеплер"],
            correct: 1,
            image: "images/newton.jpg"
        },
        {
            question: "Какая скорость света в вакууме?",
            answers: ["100 000 км/с", "300 000 км/с", "500 000 км/с", "1 000 000 км/с"],
            correct: 1,
            image: "images/speed-of-light.jpg"
        },
        {
            question: "Сколько костей у взрослого человека?",
            answers: ["186", "206", "226", "246"],
            correct: 1,
            image: "images/skeleton.jpg"
        },
        {
            question: "Какой элемент имеет химический символ Au?",
            answers: ["Серебро", "Алюминий", "Золото", "Медь"],
            correct: 2,
            image: "images/gold.jpg"
        },
        {
            question: "Сколько хромосом у человека?",
            answers: ["23", "46", "48", "92"],
            correct: 1,
            image: "images/chromosomes.jpg"
        },
        {
            question: "Кто изобрёл радио?",
            answers: ["Эдисон", "Тесла", "Попов", "Маркони"],
            correct: 2,
            image: "images/radio.jpg"
        },
        {
            question: "При какой температуре замерзает вода?",
            answers: ["-10°C", "0°C", "+10°C", "+100°C"],
            correct: 1,
            image: "images/ice.jpg"
        },
        {
            question: "Какая планета ближайшая к Солнцу?",
            answers: ["Венера", "Земля", "Меркурий", "Марс"],
            correct: 2,
            image: "images/mercury.jpg"
        }
    ],
            art: [
        {
            question: "Сколько планет в Солнечной системе?",
            answers: ["7", "8", "9", "10"],
            correct: 1,
            image: "images/solar-system.jpg"
        },
        {
            question: "Какой газ необходим для дыхания?",
            answers: ["Азот", "Кислород", "Углекислый газ", "Гелий"],
            correct: 1,
            image: "images/oxygen.jpg"
        },
        {
            question: "Кто открыл закон всемирного тяготения?",
            answers: ["Эйнштейн", "Ньютон", "Галилей", "Кеплер"],
            correct: 1,
            image: "images/newton.jpg"
        },
        {
            question: "Какая скорость света в вакууме?",
            answers: ["100 000 км/с", "300 000 км/с", "500 000 км/с", "1 000 000 км/с"],
            correct: 1,
            image: "images/speed-of-light.jpg"
        },
        {
            question: "Сколько костей у взрослого человека?",
            answers: ["186", "206", "226", "246"],
            correct: 1,
            image: "images/skeleton.jpg"
        },
        {
            question: "Какой элемент имеет химический символ Au?",
            answers: ["Серебро", "Алюминий", "Золото", "Медь"],
            correct: 2,
            image: "images/gold.jpg"
        },
        {
            question: "Сколько хромосом у человека?",
            answers: ["23", "46", "48", "92"],
            correct: 1,
            image: "images/chromosomes.jpg"
        },
        {
            question: "Кто изобрёл радио?",
            answers: ["Эдисон", "Тесла", "Попов", "Маркони"],
            correct: 2,
            image: "images/radio.jpg"
        },
        {
            question: "При какой температуре замерзает вода?",
            answers: ["-10°C", "0°C", "+10°C", "+100°C"],
            correct: 1,
            image: "images/ice.jpg"
        },
        {
            question: "Какая планета ближайшая к Солнцу?",
            answers: ["Венера", "Земля", "Меркурий", "Марс"],
            correct: 2,
            image: "images/mercury.jpg"
        }
    ]
};

// Функция для создания смешанной викторины
function getMixedQuestions() {
    const mixed = [];
    const categories = Object.keys(questionsDatabase);

    // Берём по 3-4 вопроса из каждой категории
    categories.forEach(category => {
        if (category !== 'mixed') {
            const questions = questionsDatabase[category];
            const shuffled = questions.sort(() => 0.5 - Math.random());
            mixed.push(...shuffled.slice(0, 4));
        }
    });

    return mixed.sort(() => 0.5 - Math.random()).slice(0, 15);
}

questionsDatabase.mixed = getMixedQuestions();
