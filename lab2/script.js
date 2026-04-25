console.log("Lab 2 works");

// 1. car1 через new Object()

let car1 = new Object();

car1.color = "red";
car1.maxSpeed = 180;

car1.driver = {
    name: "Елла Сіваєва",
    category: "C",
    personalLimitations: "No driving at night"
};

car1.tuning = true;
car1.numberOfAccidents = 0;

// перевірка
console.log(car1);

// 2. car2 через літерал об’єкта

let car2 = {
    color: "blue",
    maxSpeed: 200,
    driver: {
        name: "Твоє Ім’я Прізвище",
        category: "B",
        personalLimitations: null
    },
    tuning: false,
    numberOfAccidents: 2
};

// перевірка
console.log(car2);