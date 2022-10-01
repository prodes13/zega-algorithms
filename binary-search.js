let canvas, ctx;
const CANVAS_WIDTH = 950;
const CANVAS_HEIGHT = 600;
const TIME_BETWEEN_FRAMES = 2000;
let selectedNumber;

let array = [{
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
    }
];

function init() {
    canvas = document.getElementById('canvas');
    var binSearch = binarySearch(array);
    console.log(binSearch)

    function anim() {
        draw();
        binSearch.next(); // call next iteration of the bubbleSort function
    }
    anim();
    setInterval(anim, TIME_BETWEEN_FRAMES);
}

function showNumbers() {
    console.log("Showing numbers");
    let ulContainer = document.getElementById("showNumbers");
    let elementToCopy = document.querySelector("#copyElement");
    for (let i = 0; i < array.length; i++) {
        // ulContainer.innerHTML += `<li class="page-item"><a class="page-link" href="#">${array[i].value}</a></li>`;
        let = newElement = elementToCopy.cloneNode(true);
        newElement.setAttribute("id", array[i].value);
        newElement.style.display = "inline-block";
        let a = document.createElement('a');
        newElement.appendChild(a);
        a.setAttribute("class", "page-link");
        a.innerText = array[i].value;
        a.onclick = function () {
            console.log(a.innerText);
            selectedNumber = Number(a.innerText);
            init();
        }
        // console.log(link);
        // link.innerHTML = array[i].value;
        ulContainer.appendChild(newElement);
    }
}

function draw() {
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for (var i = 0; i < array.length; i++) {
            ctx.font = "15px Arial";
            ctx.fillStyle = array[i].selected ? "#FF0000" : "#0000ff";
            ctx.fillText(array[i].value, 70 * i, 50);
            ctx.fillRect(70 * i, CANVAS_HEIGHT / 2, 10, -array[i].value * 10);
        }
    }
}

function* binarySearch(array) { // * is magic
    let numberToFind = selectedNumber;
    let iterator = 0;
    let maxIndex = array.length - 1;
    let index;
    while (iterator <= maxIndex) {
        index = Math.floor(iterator + (maxIndex - iterator) / 2);
        array[index].selected = true;

        if (array[index].value < numberToFind) {
            iterator = index + 1;
        } else if (array[index].value == numberToFind) {
            console.log('!!!!array is at ', index);
            return index;
        } else {
            maxIndex = index - 1;
        }
        yield iterator;
    }
    console.log('Not found!');

    // return -1;
}

showNumbers();