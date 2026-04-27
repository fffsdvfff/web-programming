console.log("Lab 2 works");


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

console.log(car1);


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

console.log(car2);


car1.drive = function () {
    console.log("I am not driving at night");
};

car1.drive();


car2.drive = function () {
    console.log("I can drive anytime");
};

car2.drive();