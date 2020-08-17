let findCard = false;
let count = 0;
let cardOne = "";
let cardTwo = "";
let indexOne = "";
let indexTwo = "";
let arr = [];
function getRandom(max) {
  return Math.floor(Math.random() * max); //回傳0~max
}
for (let i = 1; i < 11; i++) {
  let num = getRandom(10);
  arr.splice(num, 0, i);
  let num2 = getRandom(10);
  arr.splice(num2, 0, i);
}

let cards = document.getElementById("cards");
for (let i = 0; i < arr.length; i++) {
  let div = document.createElement("DIV");
  div.className = "card";
  let div2 = document.createElement("DIV");
  div2.className = "front";
  let image = document.createElement("IMG");
  image.src = `images/${arr[i]}.jpg`;
  let div3 = document.createElement("DIV");
  div3.className = "back";
  let image2 = document.createElement("IMG");
  image2.src = "images/logo.jpg";
  div2.appendChild(image);
  div3.appendChild(image2);
  div.appendChild(div2);
  div.appendChild(div3);
  cards.appendChild(div);
}

let card = document.getElementsByClassName("card");
for (let i = 0; i < card.length; i++) {
  card[i].addEventListener("click", function () {
    card[i].classList.add("flip");
    count++;
    if (count === 1) {
      cardOne = arr[i];
      indexOne = i;
    } else if (count === 2) {
      cardTwo = arr[i];
      indexTwo = i;
      console.log(cardOne, indexOne);
      console.log(cardTwo, indexTwo);
      if (cardOne !== cardTwo) {
        setTimeout(function () {
          card[indexOne].classList.remove("flip");
          card[indexTwo].classList.remove("flip");
        }, 500);
      }
      count = 0;
    }
  });
}
