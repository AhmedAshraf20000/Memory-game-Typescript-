let gameContainer = <HTMLDivElement>document.getElementById("game-container");
let cardsContainer = <HTMLDivElement>document.getElementById("cards-container");
let card = Array.from(document.querySelectorAll("#cards-container .card"));
let timer = Array.from(document.querySelectorAll("#timer span"));
let numOfTries = <HTMLSpanElement>document.querySelector("#tries span");
let overlay = <HTMLDivElement>document.getElementById("overlay");
let startBtn = <HTMLButtonElement>document.querySelector("#overlay button");
let body = <HTMLBodyElement>document.querySelector("body");

let seconds: number = 0;
let minutes: number = 0;
let moves: number = 0;
let clicks: number = 0
let srcArr: any = [];
let rightAns: number = 0;

numOfTries.innerHTML = `${moves}`;
timer[0].innerHTML = `00`;
timer[1].innerHTML = `00`;

function flipCards() {
    card.map((e: any) => e.onclick = () => {
        clicks++;
        e.classList.remove("hide");
        e.classList.add("animate__flipInY", "show", "pointer-events-none");
        srcArr.push(e);
        if (clicks === 2) {
            clicks = 0;
            moves++;
            numOfTries.innerHTML = `${moves}`;
            gameContainer.classList.add("pointer-events-none");
            if (srcArr[0].children[0].src !== srcArr[1].children[0].src) {
                srcArr.forEach((e: HTMLDivElement) => {
                    e.classList.add("animate__fadeOut", "false");
                    setTimeout(() => {
                        e.classList.remove("show");
                        e.classList.add("hide");
                        gameContainer.classList.remove("pointer-events-none");
                        e.classList.remove("false");
                    }
                        , 1000
                    )
                    e.classList.remove("pointer-events-none");
                });
                srcArr = [];
            }
            else {
                srcArr.forEach((e: HTMLDivElement) => {
                    e.classList.add("animate__flip", "right");
                });
                setTimeout(() => gameContainer.classList.remove("pointer-events-none"), 1000);
                srcArr = [];
                rightAns++;
            }
        }
    });
}

function shuffleCards() {
    let shuffleArr = Array(card.length).fill(0);
    shuffleArr = shuffleArr.map((e, i) => e + i + 1);
    for (let i = shuffleArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * shuffleArr.length);
        [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
    }
    card.forEach((e: any, i) => e.classList.add(`order-${shuffleArr[i]}`));

}

function handelTimer() {
    let timeInterval = setInterval(
        () => {
            if (rightAns === 8) clearInterval(timeInterval);
            seconds++;
            if (seconds <= 9) timer[1].innerHTML = `0${seconds}`;
            else timer[1].innerHTML = `${seconds}`;
            if (seconds === 59 && minutes <= 9) {
                minutes++;
                timer[0].innerHTML = `0${minutes}`;
                seconds = 0;
            }
            else if (seconds === 59 && minutes > 9) {
                minutes++;
                timer[0].innerHTML = `${minutes}`;
                seconds = 0;
            }
        }, 1000
    )
}

startBtn.onclick = () => {
    body.classList.remove("overflow-hidden");
    overlay.remove();
    shuffleCards();
    handelTimer();
    flipCards();
}
