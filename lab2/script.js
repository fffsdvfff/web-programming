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

truck1.assignDriver("Ivan Ivanov", true, 5);
truck2.assignDriver("Petro Petrov", false, 3);

truck1.trip();
truck2.trip();

class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square is a figure with 4 equal sides and 90 degree angles.");
    }

    length() {
        console.log("Perimeter:", 4 * this.a);
    }

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


class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Rhombus is a figure with 4 equal sides, opposite angles are equal.");
    }

    length() {
        console.log("Perimeter:", 4 * this.a);
    }

    square() {
        let area = this.a * this.a * Math.sin(this.alpha * Math.PI / 180);
        console.log("Area:", area);
    }

    info() {
        console.log("Rhombus info:");
        console.log("Sides:", this.a, this.a, this.a, this.a);
        console.log("Angles:", this.alpha, this.beta, this.alpha, this.beta);
        console.log("Perimeter:", 4 * this.a);

        let area = this.a * this.a * Math.sin(this.alpha * Math.PI / 180);
        console.log("Area:", area);
    }
}

let rhombus1 = new Rhombus(5, 120, 60);

Rhombus.help();
rhombus1.length();
rhombus1.square();
rhombus1.info();

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Parallelogram has opposite sides equal and opposite angles equal.");
    }

    length() {
        console.log("Perimeter:", 2 * (this.a + this.b));
    }

    square() {
        let area = this.a * this.b * Math.sin(this.alpha * Math.PI / 180);
        console.log("Area:", area);
    }

    info() {
        console.log("Parallelogram info:");
        console.log("Sides:", this.a, this.b, this.a, this.b);
        console.log("Angles:", this.alpha, this.beta, this.alpha, this.beta);

        console.log("Perimeter:", 2 * (this.a + this.b));

        let area = this.a * this.b * Math.sin(this.alpha * Math.PI / 180);
        console.log("Area:", area);
    }
}

let p1 = new Parallelogram(5, 3, 120, 60);

Parallelogram.help();
p1.length();
p1.square();
p1.info();


function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

let t1 = Triangular();
let t2 = Triangular(6, 8, 10);
let t3 = Triangular(5, 5, 5);

console.log(t1);
console.log(t2);
console.log(t3);


function PiMultiplier(num) {
    return function () {
        return Math.PI * num;
    };
}

let f1 = PiMultiplier(2);
let f2 = PiMultiplier(2 / 3);
let f3 = PiMultiplier(0.5);

console.log(f1());
console.log(f2());
console.log(f3());


function Painter(color) {
    return function (obj) {
        if (!obj.type) {
            console.log("No 'type' property occurred!");
        } else {
            console.log(color + " " + obj.type);
        }
    };
}

let PaintBlue = Painter("Blue");
let PaintRed = Painter("Red");
let PaintYellow = Painter("Yellow");

let obj1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

let obj2 = {
    type: "Truck",
    avgSpeed: 90,
    loadCapacity: 2400
};

let obj3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};

PaintBlue(obj1);
PaintRed(obj2);
PaintYellow(obj3);