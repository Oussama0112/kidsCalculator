let score = document.querySelector(".score span"),
  question = document.querySelector(".question"),
  myInput = document.querySelector(".input"),
  submitBtn = document.querySelector(".submitBtn"),
  leaderBoard = document.querySelector(".leaderBoard"),
  scoreList = document.querySelector(".scoreList");
let myscores = [];
//----------------------------locale Storage----------------------
if (window.localStorage.getItem("currentScore")) {
  score.innerHTML = window.localStorage.getItem("currentScore");
}
if (window.localStorage.getItem("myscores")) {
  myscores = JSON.parse(window.localStorage.getItem("myscores"));
  listingScores();
}
//-------------------------------------------------------------------
function calculation() {
  let firstNumber = Math.floor(Math.random() * 10),
    scdNumber = Math.floor(Math.random() * 10);

  question.innerHTML = `what's the result of <span>${firstNumber}</span> multiplied with <span>${scdNumber}</span>`;
  return firstNumber * scdNumber;
}
let rightAns = calculation();
//----------------------------------------------------------------------------------
//----------------------------------Events------------------------------------------
// --------------------------------------------------------------------------------
submitBtn.addEventListener("click", function () {
  if (parseInt(myInput.value) === rightAns) {
    score.innerHTML++;
    window.localStorage.setItem("currentScore", score.innerHTML);
    myInput.value = "";
    myInput.focus();
    rightAns = calculation();
  } else {
    youLost();
    score.innerHTML = 0;
    window.localStorage.removeItem("currentScore");
    myInput.value = "";
    myInput.focus();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});
// ------------------------------------------------------------------------------
// --------------------------------function--------------------------------/
// ----------------------------------------------------------------------------
function youLost() {
  if (score.innerHTML > Math.max(...myscores)) {
    myscores.unshift(score.innerHTML);
  }
  listingScores();
  window.localStorage.setItem("myscores", JSON.stringify(myscores));
}
function listingScores() {
  scoreList.innerHTML = "";
  myscores.forEach((ele, index) => {
    let myparagraphe = document.createElement("p");
    myparagraphe.innerHTML = `<span class="rank" title="Rank">${
      index + 1
    }</span> <span class="scory" title="score">${ele}</span>`;
    let myLi = document.createElement("li");
    myLi.appendChild(myparagraphe);
    scoreList.appendChild(myLi);
  });
  leaderBoard.style.display = "block";
}
