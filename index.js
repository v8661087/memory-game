let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;
let card = document.getElementsByClassName("card");
let max = 12; //卡片組數
let cards = document.getElementById("cards");

//動態載入卡片
function initialCards() {
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
initialCards();
initialCards(); //要兩張執行兩次

//亂序
function randomCards(max) {
  for (let i = 0; i < card.length; i++) {
    let randomPos = Math.floor(Math.random() * max);
    card[i].style.order = randomPos;
  }
}
randomCards(max);

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
}
//釋放記憶體
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
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

for (let i = 0; i < card.length; i++) {
  card[i].addEventListener("click", flipCard);
}
