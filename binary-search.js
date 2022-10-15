let canvas, ctx;
const CANVAS_WIDTH = 950;
const CANVAS_HEIGHT = 600;
const X_START = 70,
    Y_START = 70,
    X_INTERVAL = 50,
    X_INTERVAL_TEXT = 35;

let selectedNumber;
let nextBtn = document.querySelector("#next");
let startBtn = document.querySelector("#start");

let statistics = {
    low: 0,
    high: 0,
    mid: 0,
    guess: 0,
    steps: 0
};
let numberToGuess = 0, message ="";

let array = [
    {
        value: -30,
        selected: false
    },
    {
        value: -20,
        selected: false
    },
    {
        value: -15,
        selected: false
    },
    {
        value: -10,
        selected: false
    },
    {
        value: 3,
        selected: false
    },
    {
        value: 9,
        selected: false
    },
    {
        value: 10,
        selected: false
    },
    {
        value: 12,
        selected: false
    },
    {
        value: 13,
        selected: false
    },
    {
        value: 20,
        selected: false
    },
    {
        value: 24,
        selected: false
    },
    {
        value: 30,
        selected: false
    },
    {
        value: 32,
        selected: false
    }
];

canvas = document.getElementById('canvas');
let binSearch;
nextBtn.disabled = true;
draw();

startBtn.addEventListener("click", function() {
    numberToGuess = document.querySelector("#numberToGuess").value;
    binSearch = binarySearch(array, numberToGuess);
    draw();
    nextBtn.disabled = false;
    this.disabled = true;
});


nextBtn.addEventListener("click", () => {
    binSearch.next();
    draw();
});

function getPosition(i, j) {
    return {
        x: X_START * i + X_INTERVAL,
        y: Y_START * j
    }
}

function draw() {
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for (var i = 0; i < array.length; i++) {
            ctx.font = "15px Arial";
            ctx.fillStyle = array[i].selected ? "#FF0000" : "#0000ff";
            let x = X_START * i + X_INTERVAL;
            let y = Y_START;
            ctx.fillText(array[i].value, x, y);
            ctx.strokeStyle = array[i].selected ? "#FF0000" : "#0000ff";
            ctx.strokeRect(x - 15, y - 30, 50, 50);
            ctx.font = "15px Arial";
            ctx.fillStyle = "#000000";

            statistics.low !== statistics.high && statistics.low !== statistics.mid && ctx.fillText("LOW: " + statistics.low, statistics.low * X_START + X_INTERVAL_TEXT, Y_START * 1.7);
            statistics.low !== statistics.high && statistics.mid !== statistics.high &&ctx.fillText("HIGH: " + statistics.high, statistics.high * X_START + X_INTERVAL_TEXT, Y_START * 1.7);
            statistics.mid !== 0 && ctx.fillText("MID: " + statistics.mid,  statistics.mid * X_START + X_INTERVAL_TEXT, Y_START * 1.7);
            statistics.guess !== 0 && ctx.fillText("GUESS: " + statistics.guess, statistics.mid * X_START + X_INTERVAL_TEXT, Y_START * 2);
            statistics.steps !== 0 && ctx.fillText("STEPS: " + statistics.steps, X_INTERVAL_TEXT, Y_START * 2.4);
            ctx.fillStyle = "#a83632";
            message && ctx.fillText(message, X_INTERVAL_TEXT, Y_START * 2.8);
            ctx.fillText(i, x, y - 40);
        }
    }
}

function* binarySearch(list, item) {
    let low = 0;
    let high = list.length - 1;
    let steps = 0;
    statistics = {low, high, steps: 0};
    while( low <= high) {
        let mid = Math.floor((low + high) / 2);
        let guess = list[mid].value;
        statistics = {
            low,
            high,
            mid,
            guess,
            steps: ++steps
        };
        list[mid].selected = true;
        if (guess == item) {
            return mid;
        }
        if (guess > item) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
        yield low;
    }
    message = "NOT FOUND !!!"
}
