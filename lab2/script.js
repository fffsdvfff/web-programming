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

function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    // метод trip
    this.trip = function () {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            let message = "Driver " + this.driver.name + " ";

            if (this.driver.nightDriving) {
                message += "drives at night ";
            } else {
                message += "does not drive at night ";
            }

            message += "and has " + this.driver.experience + " years of experience";

            console.log(message);
        }
    };
}

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

let truck1 = new Truck("white", 5000, 90, "Volvo", "FH16");
let truck2 = new Truck("black", 4500, 80, "MAN", "TGX");

// додаємо водіїв
truck1.AssignDriver("Ivan Ivanov", true, 5);
truck2.AssignDriver("Petro Petrov", false, 3);

// перевірка
truck1.trip();
truck2.trip();