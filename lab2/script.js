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

Truck.prototype.assignDriver = function (name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

let truck1 = new Truck("white", 5000, 90, "Volvo", "FH16");
let truck2 = new Truck("black", 4500, 80, "MAN", "TGX");

// додаємо водіїв
truck1.assignDriver("Ivan Ivanov", true, 5);
truck2.assignDriver("Petro Petrov", false, 3);

// перевірка
truck1.trip();
truck2.trip();

// 8. Клас Square

class Square {
    constructor(a) {
        this.a = a;
    }

    // статичний метод
    static help() {
        console.log("Square is a figure with 4 equal sides and 90 degree angles.");
    }

    // периметр
    length() {
        console.log("Perimeter:", 4 * this.a);
    }

    // площа
    square() {
        console.log("Area:", this.a * this.a);
    }

    info() {
        console.log("Square info:");
        console.log("Sides: ", this.a, this.a, this.a, this.a);
        console.log("Angles: 90, 90, 90, 90");
        console.log("Perimeter:", 4 * this.a);
        console.log("Area:", this.a * this.a);
    }
}

let square1 = new Square(5);

Square.help();
square1.length();
square1.square();
square1.info();

// 9. Клас Rectangle

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Rectangle has 4 sides, opposite sides are equal, all angles are 90 degrees.");
    }

    length() {
        console.log("Perimeter:", 2 * (this.a + this.b));
    }

    square() {
        console.log("Area:", this.a * this.b);
    }

    info() {
        console.log("Rectangle info:");
        console.log("Sides:", this.a, this.b, this.a, this.b);
        console.log("Angles: 90, 90, 90, 90");
        console.log("Perimeter:", 2 * (this.a + this.b));
        console.log("Area:", this.a * this.b);
    }
}

let rect1 = new Rectangle(5, 3);

Rectangle.help();
rect1.length();
rect1.square();
rect1.info();