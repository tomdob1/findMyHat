const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let position = 0;
let gameStatus = false;

class Field {
  constructor(newField){
    this._newField = newField;
    this._position1 = 0;
    this._position2 = 0;
    this._hole;
    this._hat;
    this._fieldArray;
  }
  static genField(height, width, percent) {
    let fieldArray = [[]];
    let fieldCharacters = [];
    let widthCounter = 0;
    let heightCounter = 0;
    const fieldSize = height * width;
    const fraction = 100 / percent;
    const percentHoles = Math.floor(fieldSize / fraction);
    const leftOverField =  fieldSize - (percentHoles + 1);

    
    fieldCharacters.push(hat);
    
    for (let f = percentHoles; f > 0; f--){
      fieldCharacters.push('O');
    }
    for (let g = leftOverField; g > 0; g--){
      fieldCharacters.push(fieldCharacter);
    }

    for (let h = 1; h < height; h++){
      fieldArray.push([]);
    }
    
    for (let i = fieldSize; i>0; i--){
      const randomNo =  Math.floor(Math.random() * fieldCharacters.length);
      const removedFieldCharacter = fieldCharacters.splice(randomNo, 1);
      const popFieldCharacter = removedFieldCharacter.shift();

      if (widthCounter < width){

        fieldArray[heightCounter].push(popFieldCharacter);
        widthCounter++;
      }
      else {
        widthCounter = 1;
        heightCounter++;
        fieldArray[heightCounter].push(popFieldCharacter);
      }
    }
  
    return console.log(fieldArray);
  }

  print(){
    for(let i = 0; i < this._newField.length; i++){
      let line = this._newField[i][0]+''+this._newField[i][1]+''+this._newField[i][2];
      console.log(line);
    }
  }
  updatePositionRight(){
    if(this._position1 <= this._newField.length){
      if (this._position2 <= this._newField[this._position1].length){
        this._position2 += 1;
        if (this._newField[this._position1][this._position2] === 'O'){
          return gameOver('You fell in the hole');
        }
        else if (this._newField[this._position1][this._position2] === '^'){
          return gameWon();
        }
        else{
          this._newField[this._position1][this._position2] = '*';
          return console.log(myField.print());
        }
      }
    }
    else {
      return gameOver('Out of bounds');
    }
  }

  updatePositionLeft(){
    if(this._position2 > 0){
      this._position2 -= 1;
      if (this._newField[this._position1][this._position2] === 'O'){
        return gameOver('You fell in the hole');
      }
      else if (this._newField[this._position1][this._position2] === '^'){
        return gameWon();
      }
      else{
        this._newField[this._position1][this._position2] = '*';
        return console.log(myField.print());
      }
    }
    else {
      return gameOver('Out of bounds')
    }
  }
  updatePositionDown(){
    if(this._position1 < 2){
      this._position1 += 1;
      if (this._newField[this._position1][this._position2] === 'O'){
        return gameOver('You fell in the hole');
      }
      else if (this._newField[this._position1][this._position2] === '^'){
        return gameWon();
      }
      else{
        this._newField[this._position1][this._position2] = '*';
        return console.log(myField.print());
      }
    }
    else {
      return gameOver('Out of bounds')
    }
  }
  updatePositionUp(){
    if(this._position1 > 0){
      this._position1 -= 1;
      if (this._newField[this._position1][this._position2] === 'O'){
        return gameOver('You fell in the hole');
      }
      else if (this._newField[this._position1][this._position2] === '^'){
        return gameWon();
      }
      else{
        this._newField[this._position1][this._position2] = '*';
        return console.log(myField.print());
      }
    }
    else {
      return gameOver('Out of bounds')
    }
  }
  
}


const myField = new Field([
   ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);
console.log(myField.print());



function gameInput(){
  let userInput = prompt('Please input the direction you would like to move? ');

  switch (userInput){
    case 'd':
      myField.updatePositionDown();
      break;
    case 'u':
      myField.updatePositionUp();
      break;
    case 'l':
      myField.updatePositionLeft();
      break;
    case 'r':
      myField.updatePositionRight();
      break;
    default:
      console.log('Invalid move: Please enter the following for a move');
      console.log('Up: u');
      console.log('Down: d');
      console.log('Left: l');
      console.log('Right: r');
      break;
  }
  while (gameStatus === false){
    gameInput();
  }
}


const gameWon = () =>
{
  console.log('You won! Well Done!');
  gameStatus = true;
}

const gameOver = (lossReason) => 
{
  console.log(lossReason+'! Game Over');
  gameStatus = true;
}
// gameInput();

Field.genField(3,3,50);

