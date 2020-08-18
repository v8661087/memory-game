let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;
let card = document.getElementsByClassName("card");
let max = 8; //卡牌組數
let cards = document.getElementById("cards");
let count = 0; //次數
let clear = 0; //完成組數
let best = 999; //最佳次數
//創造卡牌
function createCards() {
  for (let i = 1; i <= max; i++) {
    let div = document.createElement("DIV");
    div.className = "card";
    div.dataset.keyNumber = i;
    let div2 = document.createElement("DIV");
    div2.className = "front";
    let image = document.createElement("IMG");
    image.src = `images/${i}.jpg`;
    image.draggable = false;
    div2.appendChild(image);
    let div3 = document.createElement("DIV");
    div3.className = "back";
    let image2 = document.createElement("IMG");
    image2.src = "images/logo.jpg";
    div3.appendChild(image2);
    div.appendChild(div2);
    div.appendChild(div3);
    cards.appendChild(div);
  }
}

//動態載入卡牌
function initialCards() {
  createCards();
  createCards();
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", flipCard);
  }
  randomCards(max);
}
initialCards();

//亂序
function randomCards(max) {
  for (let i = 0; i < card.length; i++) {
    let randomPos = Math.floor(Math.random() * max);
    card[i].style.order = randomPos;
  }
}
//翻牌
function flipCard() {
  // 避免翻完前點擊
  if (lockBoard) return;
  // 避免翻同一張牌當做第二張
  if (this === firstCard) return;

  this.classList.add("flip");
  //如果還沒翻任何一張
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.keyNumber === secondCard.dataset.keyNumber;
  isMatch ? disableCards() : unflipedCards();
  count++;
  document.getElementById("count").innerText = count;
}
//釋放記憶體
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  clear++;
  //完成組數等於卡牌組數
  if (clear === max) {
    setTimeout(() => {
      if (count <= best) {
        best = count;
        document.getElementById("best").innerText = `最佳紀錄為${count}次`;
      }
    }, 300);
  }
}
//配對錯誤翻回背面
function unflipedCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 600);
}
//配對完重置
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

document.getElementById("restart").addEventListener("click", restartGame);
//重新
function restartGame() {
  count = 0;
  document.getElementById("count").innerText = count;
  clear = 0;
  for (let i = 0; i < card.length; i++) {
    card[i].classList.remove("flip");
    card[i].addEventListener("click", flipCard);
  }
  randomCards(max);
}
