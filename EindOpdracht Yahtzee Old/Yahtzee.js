let diceObj = [
    {currentValue: 0, hold: false},
    {currentValue: 0, hold: false},
    {currentValue: 0, hold: false},
    {currentValue: 0, hold: false},
    {currentValue: 0, hold: false}
  ]
  
  let scoreSheet = [
    {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null
    },
    {
      threeOfAKind: null,
      fourOfAKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yahtzee: null,
      chance: null
    },
    {
      upperTotal: null,
      bonus: null,
      upperGrandTotal: null,
      lowerGrandTotal: null,
      gameGrandTotal: null
    }
  ]
  

  let onesScoreDisp = document.getElementById('onesScoreDisp');
  let twosScoreDisp = document.getElementById('twosScoreDisp');
  let threesScoreDisp = document.getElementById('threesScoreDisp');
  let foursScoreDisp = document.getElementById('foursScoreDisp');
  let fivesScoreDisp = document.getElementById('fivesScoreDisp');
  let sixesScoreDisp = document.getElementById('sixesScoreDisp');
  let upperTotalDisp = document.getElementById('upperTotalDisp');
  let bonusDisp = document.getElementById('bonusDisp');
  let upperGrandTotalDisp = document.getElementById('upperGrandTotalDisp');
  let threeOfKindScoreDisp = document.getElementById('threeOfKindScoreDisp');
  let fourOfKindScoreDisp = document.getElementById('fourOfKindScoreDisp');
  let fullHouseScoreDisp = document.getElementById('fullHouseScoreDisp');
  let smallStraightScoreDisp = document.getElementById('smallStraightScoreDisp');
  let largeStraightScoreDisp = document.getElementById('largeStraightScoreDisp');
  let yahtzeeScoreDisp = document.getElementById('yahtzeeScoreDisp');
  let chanceScoreDisp = document.getElementById('chanceScoreDisp');
  let upperGrandTotalDisp2 = document.getElementById('upperGrandTotalDisp2');
  let lowerGrandTotalDisp = document.getElementById('lowerGrandTotalDisp');
  let gameGrandTotalDisp = document.getElementById('gameGrandTotalDisp');
  
  let scoreCell = document.getElementsByClassName('scoreCell');
  let totalCell = document.getElementsByClassName('totalCell');
  

  let diceOneDisp = document.getElementById('diceOneDisp');
  let diceTwoDisp = document.getElementById('diceTwoDisp');
  let diceThreeDisp = document.getElementById('diceThreeDisp');
  let diceFourDisp = document.getElementById('diceFourDisp');
  let diceFiveDisp = document.getElementById('diceFiveDisp');
  let dice = document.getElementsByClassName('dice');
  let diceDisp = document.getElementsByClassName('diceDisp');
  

  let holdButtons = document.getElementsByClassName('holdButtons');
  let rollButton = document.getElementById('rollButton');
  

  let message = document.getElementById('message');
  

  let diceValueArray = [];
  let rollCount = 0;
  let scoreSubmitted = true;
  let gameFinished;
  
  function diceRoll() {

  
    rollCount++;
    scoreSubmitted = false;
    if (rollCount === 1) {
      rollingState();
    }
  


    if (rollCount <= 3) {
      diceValueArray = [];
      for (let i = 0; i < diceObj.length; i++) {
        if (diceObj[i].hold == false) {
          diceObj[i].currentValue = Math.floor(((Math.random() * 6) + 1));
        }
        diceValueArray.push(diceObj[i].currentValue);
        diceValueArray.sort((a, b) => a - b);
      }
  
      diceOneDisp.textContent = diceObj[0].currentValue;
      diceTwoDisp.textContent = diceObj[1].currentValue;
      diceThreeDisp.textContent = diceObj[2].currentValue;
      diceFourDisp.textContent = diceObj[3].currentValue;
      diceFiveDisp.textContent = diceObj[4].currentValue;
    } 
  

    if (rollCount === 3) {
      for (let i = 0; i < holdButtons.length; i++) {
        holdButtons[i].setAttribute("disabled", "");
      }
  
      rollButton.setAttribute("disabled", "");

      for (let i = 0; i < dice.length; i++) {
        dice[i].classList.remove('hold');
      }
  
      for (let i = 0; i <diceObj.length; i++) {
        diceObj[i].hold = false;
      }
    }
    messageDisplay()
  }
  
  function rollReset() {

  
    rollCount = 0;
    if (scoreSheet[2].gameGrandTotal !== null) {
      message.textContent = "GOED GEDAAN! Uw score is " + scoreSheet[2].gameGrandTotal;
    } else {
      message.textContent = "DRUK OM TE ROLLEN";
    }
  }
  
  function preRollState() {

  

    for (let i = 0; i < holdButtons.length; i++) {
      holdButtons[i].setAttribute("disabled", "");
    }

    if (!gameFinished) {
      rollButton.removeAttribute("disabled", "");
    } else {
      rollButton.setAttribute("disabled", "");
    }
  

    for (let i = 0; i < dice.length; i++) {
      dice[i].classList.remove('hold');
    }
    for (let i = 0; i <diceObj.length; i++) {
      diceObj[i].hold = false;
    }
  }
  
  function rollingState() {

    for (let i = 0; i < holdButtons.length; i++) {
      holdButtons[i].removeAttribute("disabled", "");
    }
  }
  
  function messageDisplay() {
  // 
    if (rollCount === 1) {
      message.textContent = "2 OVERIGE ROLLEN";
    } else if (rollCount === 2) {
      message.textContent = "1 OVERIGE ROLLEN";
    } else if (rollCount === 3) {
      message.textContent = "VOER UW SCORE IN";
    }
  }
  
  function newGame() {

  
    rollCount = 0;
    gameFinished = false;
    scoreSubmitted = true;
  

    for (let i = 0; i < scoreCell.length; i++) {
      scoreCell[i].textContent = "...";
    }
  

    for (let i = 0; i < totalCell.length; i++) {
      totalCell[i].textContent = "";
    }
  

    for (var i = 0; i < scoreSheet.length; i++) {
      for (var prop in scoreSheet[i]) {
        if (scoreSheet[i][prop] !== null) {
          scoreSheet[i][prop] = null;
        }
      }
    }

    for (let i = 0; i < diceDisp.length; i++) {
      diceDisp[i].textContent = "1";
    }
  
    message.textContent = "DRUK OM TE ROLLEN";
  
    preRollState();
  }
  

  function toggleHold(key, holdElementId) {
    let clickedElement = document.getElementById(holdElementId);
  
    diceObj[key].hold = !diceObj[key].hold;
    if (diceObj[key].hold === true) {
      clickedElement.classList.add('hold');
    } else {
      clickedElement.classList.remove('hold');
    }
  }
  

  
  function calculateUpper(argA, argB, argC) {
    if (!scoreSubmitted && argA === null) {
      argA = 0;
      diceObj.forEach(item => {
        if (item.currentValue === argB) {
          argA += argB;
        }
      });
    argC.textContent = argA;
    calculationEnd();
    }
  }
  
  
  function calculateThreeOfKind() {
    if (!scoreSubmitted && scoreSheet[1].threeOfAKind === null) {
      if (diceValueArray[0] === diceValueArray[1] && diceValueArray[1] === diceValueArray[2]) {
        for (let i = 0; i < diceObj.length; i++) {
          scoreSheet[1].threeOfAKind += diceObj[i].currentValue; 
        }
      } else if (diceValueArray[1] === diceValueArray[2] && diceValueArray[2] === diceValueArray[3]) {
        for (let i = 0; i < diceObj.length; i++) {
          scoreSheet[1].threeOfAKind += diceObj[i].currentValue; 
        }
      } else if (diceValueArray[2] === diceValueArray[3] && diceValueArray[3] === diceValueArray[4]) {
        for (let i = 0; i < diceObj.length; i++) {
          scoreSheet[1].threeOfAKind += diceObj[i].currentValue; 
        }
      } else {
          scoreSheet[1].threeOfAKind = 0;
        }
      threeOfKindScoreDisp.textContent = scoreSheet[1].threeOfAKind;
      calculationEnd();
    }
  }
  
  function calculateFourOfKind() {
    if (!scoreSubmitted && scoreSheet[1].fourOfAKind === null) {
      if (diceValueArray[1] === diceValueArray[2] && diceValueArray[2] === diceValueArray[3]) {
        if (diceValueArray[2] === diceValueArray[0] || diceValueArray[2] === diceValueArray[4]) {
          for (let i = 0; i < diceObj.length; i++) {
            scoreSheet[1].fourOfAKind += diceObj[i].currentValue;
          }
        } else {
          scoreSheet[1].fourOfAKind = 0;
        }
      } else {
        scoreSheet[1].fourOfAKind = 0;
      }
      fourOfKindScoreDisp.textContent = scoreSheet[1].fourOfAKind;
      calculationEnd();
    }
  }
  
  function calculateFullHouse() {
    let comboOne = false;
    let comboTwo = false;
    if (!scoreSubmitted && scoreSheet[1].fullHouse === null) {
      if (diceValueArray[0] === diceValueArray[1]) {
        if (diceValueArray[2] === diceValueArray[3] && diceValueArray[3] === diceValueArray[4]) {
          if (diceValueArray[1] !== diceValueArray[2]) {
            comboOne = true;
          }
        }
      }
      if (diceValueArray[0] === diceValueArray[1] && diceValueArray[1] === diceValueArray[2]) {
        if (diceValueArray[3] === diceValueArray[4]) {
          if (diceValueArray[2] !== diceValueArray[3]) {
            comboTwo = true;
          }
        }
      }
      if (comboOne || comboTwo) {
        scoreSheet[1].fullHouse = 25;
      } else {
        scoreSheet[1].fullHouse = 0;
      }
      fullHouseScoreDisp.textContent = scoreSheet[1].fullHouse;
      calculationEnd();
    }
  }
  

  
  function calculateLargeStraight() {
    let status = false;
    let possibleLargeStraights = [[1,2,3,4,5],[2,3,4,5,6]];
    if (!scoreSubmitted && scoreSheet[1].largeStraight === null) {
      possibleLargeStraights.forEach(item => {
        if (JSON.stringify(diceValueArray) === JSON.stringify(item)) {
          status = true;
        }
      });
      if (status === true) {
        scoreSheet[1].largeStraight = 40;
      } else {
        scoreSheet[1].largeStraight = 0;
      }
      largeStraightScoreDisp.textContent = scoreSheet[1].largeStraight;
      calculationEnd();
    }
  }
  
  function calculateYahtzee() {
    let status = true;
    if (!scoreSubmitted && scoreSheet[1].yahtzee === null) {
      for (let i = 1; i < diceValueArray.length; i++){
        if (diceValueArray[i - 1] !== diceValueArray[i]) {
          status = false;
          break
        }
      }
      if (status) {
        scoreSheet[1].yahtzee = 50;
      } else {
        scoreSheet[1].yahtzee = 0;
      }
      yahtzeeScoreDisp.textContent = scoreSheet[1].yahtzee;
      calculationEnd();
    }
  }
  
  function calculateChance() {
    if (!scoreSubmitted && scoreSheet[1].chance === null) {
      for (let i = 0; i < diceObj.length; i++) {
        scoreSheet[1].chance += diceObj[i].currentValue;
      }
      chanceScoreDisp.textContent = scoreSheet[1].chance;
      calculationEnd();
    }
  }
  
  function calculationEnd() {
    scoreSubmitted = true;
    totals();
    rollReset();
    preRollState();
  }
  
  function totals() {

    let upperScoreArray = Object.values(scoreSheet[0]);
    let lowerScoreArray = Object.values(scoreSheet[1]);
  

    let isScoreMissingUpper = upperScoreArray.includes(null);
    let isScoreMissingLower = lowerScoreArray.includes(null);
    let reducer = (accumulator, current) => accumulator + current;

    if (!isScoreMissingUpper) {
      scoreSheet[2].upperTotal = upperScoreArray.reduce(reducer);
      if (scoreSheet[2].upperTotal >= 63) {
        scoreSheet[2].bonus = 35;
      } else {
        scoreSheet[2].bonus = 0;
      }
      scoreSheet[2].upperGrandTotal = scoreSheet[2].upperTotal + scoreSheet[2].bonus;
      
      upperTotalDisp.textContent = scoreSheet[2].upperTotal;
      bonusDisp.textContent = scoreSheet[2].bonus;
      upperGrandTotalDisp.textContent = scoreSheet[2].upperGrandTotal;
      upperGrandTotalDisp2.textContent = scoreSheet[2].upperGrandTotal;
    }
  
  
    if (!isScoreMissingLower) {
      scoreSheet[2].lowerGrandTotal = lowerScoreArray.reduce(reducer);
      lowerGrandTotalDisp.textContent = scoreSheet[2].lowerGrandTotal;
    }
  
    if (scoreSheet[2].upperGrandTotal !== null && scoreSheet[2].lowerGrandTotal !== null) {
      scoreSheet[2].gameGrandTotal = scoreSheet[2].upperGrandTotal + scoreSheet[2].lowerGrandTotal;
      gameGrandTotalDisp.textContent = scoreSheet[2].gameGrandTotal;
  
      gameFinished = true;
  
      messageDisplay();
    }
  }