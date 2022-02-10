let modal = document.querySelector("#myModal");
let startModal = document.querySelector("#startModal");
let keep = [false, false, false, false, false];
let arrayOfNumberCounts = [];
let numbersOnDice = [];
let totalPlusBonus = [0, 0, 0, 0];
let fieldsFilled = [0, 0, 0, 0];
let endTotal = [0, 0, 0, 0];
let total1 = [0, 0, 0, 0];
let total2 = [0, 0, 0, 0];
let rollCount = 3;
let player = 0;
let playerCount =0;

document.querySelector("body").onload = function () {
  document.querySelector(".rollCount").innerHTML = rollCount;
  startModal.style.display = "block";
  document.getElementsByClassName("fieldPlayer")[0].style.backgroundColor = "lightblue";
};

//player number select
document.querySelector(".one").onclick = function (){
    startModal.style.display = "none";
    playerCount=0;
    fieldsFilled = [0, 13, 13, 13];
}
document.querySelector(".two").onclick = function (){
    startModal.style.display = "none";
    playerCount=1;
    fieldsFilled = [0, 0, 13, 13];
}
document.querySelector(".three").onclick = function (){
    startModal.style.display = "none";
    playerCount=2;
    fieldsFilled = [0, 0, 0, 13];
}
document.querySelector(".four").onclick = function (){
    startModal.style.display = "none";
    playerCount=3;
    fieldsFilled = [0, 0, 0, 0];
}

//dice code
document.querySelector(".rollButton").onclick = function () {
  let random;
  //reset field color
  for (i = 0; i < document.querySelectorAll(".field").length; i++) {
    document.getElementsByClassName("field")[i].style.backgroundColor = "initial";
    document.getElementsByClassName("field")[i].style.cursor = "initial";
  }

  if (rollCount > 0) {
    rollCount--;
    document.querySelector(".rollCount").innerHTML = rollCount;
    for (i = 0; i < 5; i++) {
      if (!keep[i]) {
        random = Math.round(Math.random() * 5) + 1;
        document.getElementsByClassName("die")[i].innerHTML = random;
        numbersOnDice[i] = random;
      }
    }
    checkDiceForNumbers();
  }
  if (rollCount == 0) {
    document.querySelector(".rollButton").style.display = "none";
  }
};

//klik op de dice om ze te behouden
document.addEventListener("click", function (event) {
  for (i = 0; i < 5; i++) {
    if (event.target == document.getElementsByClassName("die")[i] && keep[i] == false && rollCount != 3) {
      keep[i] = true;
      event.target.style.border = "5px solid gold";
    } else if (event.target == document.getElementsByClassName("die")[i] && keep[i] == true && rollCount != 3) {
      keep[i] = false;
      event.target.style.border = "none";
    }
  }
});

checkDiceForNumbers = function () {
  for (j = 1; j <= 6; j++) {
    arrayOfNumberCounts[j] = 0;
    for (i = 0; i < 5; i++) {
      if (numbersOnDice[i] == j) {
        arrayOfNumberCounts[j]++;
      }
    }
    //all normal numbers
    if (
      arrayOfNumberCounts[j] > 0 &&
      document.getElementsByClassName("field" + j)[player].innerHTML == ""
    ) {
      document.getElementsByClassName("field" + j)[player].style.backgroundColor = "Green";
      document.getElementsByClassName("field" + j)[player].style.cursor = "pointer";
    }

    //three of a kind
    if (
      arrayOfNumberCounts[j] >= 3 &&
      document.getElementsByClassName("field3Same")[player].innerHTML == ""
    ) {
      document.getElementsByClassName("field3Same")[player].style.backgroundColor = "Green";
      document.getElementsByClassName("field3Same")[player].style.cursor = "pointer";
    }

    //four of a kind
    if (
      arrayOfNumberCounts[j] >= 4 &&
      document.getElementsByClassName("field4Same")[player].innerHTML == ""
    ) {
      document.getElementsByClassName("field4Same")[player].style.backgroundColor = "Green";
      document.getElementsByClassName("field4Same")[player].style.cursor = "pointer";
    }
    //yahtzee
    if (
      arrayOfNumberCounts[j] == 5 &&
      document.getElementsByClassName("fieldYahtzee")[player].innerHTML == ""
    ) {
      document.getElementsByClassName("fieldYahtzee")[player].style.backgroundColor = "Green";
      document.getElementsByClassName("fieldYahtzee")[player].style.cursor = "pointer";
    }
  }
  //full house
  if (
    arrayOfNumberCounts.includes(2) &&
    arrayOfNumberCounts.includes(3) &&
    document.getElementsByClassName("fieldFullHouse")[player].innerHTML == ""
  ) {
    document.getElementsByClassName("fieldFullHouse")[player].style.backgroundColor = "Green";
    document.getElementsByClassName("fieldFullHouse")[player].style.cursor = "pointer";
  }

  //small street
  if (
    ((numbersOnDice.includes(1) && numbersOnDice.includes(2)) ||
      (numbersOnDice.includes(2) && numbersOnDice.includes(5)) ||
      (numbersOnDice.includes(5) && numbersOnDice.includes(6))) &&
    numbersOnDice.includes(3) &&
    numbersOnDice.includes(4) &&
    document.getElementsByClassName("fieldSmallStreet")[player].innerHTML == ""
  ) {
    document.getElementsByClassName("fieldSmallStreet")[player].style.backgroundColor = "Green";
    document.getElementsByClassName("fieldSmallStreet")[player].style.cursor = "pointer";
  }

  //big street
  if (
    (numbersOnDice.includes(1) || numbersOnDice.includes(6)) &&
    numbersOnDice.includes(2) &&
    numbersOnDice.includes(3) &&
    numbersOnDice.includes(4) &&
    numbersOnDice.includes(5) &&
    document.getElementsByClassName("fieldBigStreet")[player].innerHTML == ""
  ) {
    document.getElementsByClassName("fieldBigStreet")[player].style.backgroundColor = "Green";
    document.getElementsByClassName("fieldBigStreet")[player].style.cursor = "pointer";
  }

  //chance
  if (document.getElementsByClassName("fieldChance")[player].innerHTML == "") {
    document.getElementsByClassName("fieldChance")[player].style.backgroundColor = "Green";
    document.getElementsByClassName("fieldChance")[player].style.cursor = "pointer";
  }

  //make stuf red when you cant do anything
  if (rollCount == 0) {
    for (i = player; i < document.querySelectorAll(".field").length; i+=4) {
      if (
        document.querySelectorAll(".field")[i].style.backgroundColor !=
          "green" &&
        document.querySelectorAll(".field")[i].innerHTML == ""
      )
        document.getElementsByClassName("field")[i].style.backgroundColor =
          "orangered";
      document.getElementsByClassName("field")[i].style.cursor = "pointer";
    }
  }
};

//klik voor score
document.addEventListener("click", function (event) {
  if (event.target.style.backgroundColor == "green") {
    fieldsFilled[player]++;

    for (i = 1; i <= 6; i++) {
      //all normal numbers
      if (event.target.className == "field field" + i) {
        document.getElementsByClassName("field" + i)[player].innerHTML =
          i * arrayOfNumberCounts[i];
        total1[player] += i * arrayOfNumberCounts[i];
      }
    }

    //three of a kind
    if (event.target.className == "field field3Same") {
      let scoreForField3Same = 0;
      for (i = 0; i < 5; i++) {
        scoreForField3Same += numbersOnDice[i];
      }
      document.getElementsByClassName("field3Same")[player].innerHTML = "" + scoreForField3Same;
      total2[player] += scoreForField3Same;
    }

    //four of a kind
    if (event.target.className == "field field4Same") {
      let scoreForField4Same = 0;
      for (i = 0; i < 5; i++) {
        scoreForField4Same += numbersOnDice[i];
      }
      document.getElementsByClassName("field4Same")[player].innerHTML = "" + scoreForField4Same;
      total2[player] += scoreForField4Same;
    }

    //full house
    if (event.target.className == "field fieldFullHouse") {
      document.getElementsByClassName("fieldFullHouse")[player].innerHTML = "25";
      total2[player] += 25;
    }

    //small street
    if (event.target.className == "field fieldSmallStreet") {
      document.getElementsByClassName("fieldSmallStreet")[player].innerHTML = "30";
      total2[player] += 30;
    }

    //big street
    if (event.target.className == "field fieldBigStreet") {
      document.getElementsByClassName("fieldBigStreet")[player].innerHTML = "40";
      total2[player] += 40;
    }

    //yahtzee
    if (event.target.className == "field fieldYahtzee") {
      document.getElementsByClassName("fieldYahtzee")[player].innerHTML = "50";
      total2[player] += 50;
    }

    //chance
    if (event.target.className == "field fieldChance") {
      let scoreForFieldChance = 0;
      for (i = 0; i < 5; i++) {
        scoreForFieldChance += numbersOnDice[i];
      }
      document.getElementsByClassName("fieldChance")[player].innerHTML = "" + scoreForFieldChance;
      total2[player] += scoreForFieldChance;
    }

    //display totals
    document.getElementsByClassName("fieldTotal1")[player].innerHTML = total1[player];
    if (total1[player] >= 63) {
      totalPlusBonus[player] = total1[player] + 35;
      document.getElementsByClassName("fieldBonus")[player].innerHTML = 35;
    } else {
      totalPlusBonus[player] = total1[player];
    }
    
    document.getElementsByClassName("fieldTotal1PlusBonus")[player].innerHTML = totalPlusBonus[player];
    document.getElementsByClassName("fieldTotal1PlusBonus")[player+4].innerHTML = totalPlusBonus[player];
    
    document.getElementsByClassName("fieldTotal2")[player].innerHTML = total2[player];

    endTotal[player] = totalPlusBonus[player] + total2[player];
    document.getElementsByClassName("fieldTotalAll")[player].innerHTML = endTotal[player];

    resetRollsAndFieldColor();
    playerCycle();
  }

  //if you cant do anything you're cringe
  if (event.target.style.backgroundColor == "orangered") {
    fieldsFilled[player]++;
    event.target.innerHTML = "0";
    resetRollsAndFieldColor();
    playerCycle();
    
  }

  //game end
  endGame();
});

resetRollsAndFieldColor = function () {
  document.querySelector(".rollButton").style.display = "initial";
  rollCount = 3;
  document.querySelector(".rollCount").innerHTML = rollCount;
  for (i = 0; i < 5; i++) {
    document.getElementsByClassName("die")[i].innerHTML = "";
    document.getElementsByClassName("die")[i].style.border = "none";
    keep[i] = false;
    numbersOnDice[i] = 0;
  }
  for (i = 0; i < document.querySelectorAll(".field").length; i++) {
    document.getElementsByClassName("field")[i].style.backgroundColor = "initial";
    document.getElementsByClassName("field")[i].style.cursor = "initial";
  }
};

endGame = function () {
  if (fieldsFilled[0] == 13 &&fieldsFilled[1] == 13 &&fieldsFilled[2] == 13 &&fieldsFilled[3] == 13) {
    modal.style.display = "block";
    document.querySelector(".rollButton").style.display = "none";
    document.querySelector(".winners").innerHTML = "";
    if(endTotal[0]>=endTotal[1]&&endTotal[0]>=endTotal[2]&&endTotal[0]>=endTotal[3]){
      document.querySelector(".winners").innerHTML += "speler 1 <br>";
    } 
    if (endTotal[1]>=endTotal[0]&&endTotal[1]>=endTotal[2]&&endTotal[1]>=endTotal[3]){
      document.querySelector(".winners").innerHTML += "speler 2 <br>";
    }
    if (endTotal[2]>=endTotal[0]&&endTotal[2]>=endTotal[1]&&endTotal[2]>=endTotal[3]){
      document.querySelector(".winners").innerHTML += "speler 3 <br>";
    } 
    if (endTotal[3]>=endTotal[0]&&endTotal[3]>=endTotal[1]&&endTotal[3]>=endTotal[2]){
      document.querySelector(".winners").innerHTML += "speler 4 <br>";
    }
  }
};

//close modal en reset
document.querySelectorAll(".playAgain")[0].onclick = function () {
    rollCount = 3;
    for (i = 0; i < document.querySelectorAll(".field").length; i++) {
      document.getElementsByClassName("field")[i].innerHTML = "";
    }
    
    for (i = 0; i < 4; i++) {
      fieldsFilled[i] = 0;
      totalPlusBonus[i] = 0;
      endTotal[i] = 0;
      total1[i] = 0;
      total2[i] = 0;

     document.getElementsByClassName("fieldTotal1")[i].innerHTML = 0;
     document.getElementsByClassName("fieldBonus")[i].innerHTML = 0;
      document.getElementsByClassName("fieldTotal1PlusBonus")[i].innerHTML = 0;
      document.getElementsByClassName("fieldTotal1PlusBonus")[i+4].innerHTML = 0;
      document.getElementsByClassName("fieldTotal2")[i].innerHTML = 0;
    document.getElementsByClassName("fieldTotalAll")[i].innerHTML = 0;
    }
    
    document.querySelector(".rollButton").style.display = "initial";
    modal.style.display = "none";
    startModal.style.display = "block";
  };


  playerCycle = function(){
    document.getElementsByClassName("fieldPlayer")[player].style.backgroundColor = "initial";
        if(player==playerCount){
            player=0
        } else{
            player++
        }
        document.getElementsByClassName("fieldPlayer")[player].style.backgroundColor = "lightblue";
  }