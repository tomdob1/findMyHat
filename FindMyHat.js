const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let gameStatus = false; // if changed to true the game is over
let counter = 1;

class Field {
  constructor(newField){
    this._newField = newField;
    this._position1 = 0; //position of array
    this._position2 = 0; //position of indented array 
    this._hole;
    this._hat;
    this._fieldArray;
  }
  static genField(height, width, percent) { // static method which takes in the height, width of the field as well as the percentage of holes within the field
    let fieldArray = [[]]; //array of the generated field.
    let fieldCharacters = []; //array used to store all of the characters, ensuring all the correct number of holes, field characters and hat is within the field
    let widthCounter = 0; 
    let heightCounter = 0;
    const fieldSize = height * width; //size of the field
    const fraction = 100 / percent; //fraction of the field which contains holes
    const percentHoles = Math.floor(fieldSize / fraction); //contains the percentage of holes into a number of holes
    const leftOverField =  fieldSize - (percentHoles + 1); //figures out how many parts of the field are field characters

    
    fieldCharacters.push(hat); //pushes one hat into the array in preperation for random selection
    
    for (let f = percentHoles; f > 0; f--){ //pushes holes into the array in preperation for random selection
      fieldCharacters.push('O');
    }
    for (let g = leftOverField; g > 0; g--){ //pushes the leftover fields into the array in preperation for random selection
      fieldCharacters.push(fieldCharacter);
    }

    for (let h = 1; h < height; h++){ // pushes in empty arrays for the specified height to ensure the structure of the 2d array is correct
      fieldArray.push([]);
    }
    
    for (let i = fieldSize; i>0; i--){ 
      const randomNo =  Math.floor(Math.random() * fieldCharacters.length); //generates a random number between 0 and the size of the array
      const removedFieldCharacter = fieldCharacters.splice(randomNo, 1); //removes a random index out of the array into its own array
      const popFieldCharacter = removedFieldCharacter.shift(); //removes the character out of the array

      if (widthCounter < width){ // if there is space inside the 2d array insert a character else move to the next array within the 2d array

        fieldArray[heightCounter].push(popFieldCharacter); //pushes the selected character into the main array
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
  increaseDifficulty(){
    let randomHole1 = 0;
     let randomHole2 = 0;

    while(randomHole1 === randomHole2 && this._newField[randomHole1][randomHole2] === this._newField[this._position1][this._position2]){
      randomHole1 = Math.floor(Math.random() * this._newField[0].length);
      randomHole2 = Math.floor(Math.random() * this._newField[0].length);
    }
    this._newField[randomHole1][randomHole2] = hole;
    
  }
  print(){ //prints the current field
    for(let i = 0; i < this._newField.length; i++){
      let line = this._newField[i][0]+''+this._newField[i][1]+''+this._newField[i][2];
      console.log(line);
    }
  }
  updatePositionRight(){ //updates the position if a right move is made
    if(this._position1 <= this._newField.length){
      if (this._position2 <= this._newField[this._position1].length){
        this._position2 += 1;
        if (this._newField[this._position1][this._position2] === hole){
          return gameOver('You fell in the hole');
        }
        else if (this._newField[this._position1][this._position2] === hat){
          return gameWon();
        }
        else{
          this._newField[this._position1][this._position2] = pathCharacter;
          return console.log(myField.print());
        }
      }
    }
    else {
      return gameOver('Out of bounds');
    }
  }

  updatePositionLeft(){ //updates the position if a left move is made
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
  updatePositionDown(){ //updates the position if a downward move is made
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
  updatePositionUp(){ //updates the position if an upward move is made
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


const myField = new Field([ //instance of a class with the field
   ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

function welcomeMessage(){
  console.log('Welcome to Find My Hat. To find the hat navigate through the field for the ^ icon.');
  console.log('Avoid the holes otherwise the game will be over!');
  console.log(`Press 'gen' to generate a new field`);
}

function gameInput(){ //function which has the main interaction within the game
  let userInput = prompt('Please input the direction you would like to move? ');

  switch (userInput){
    case 'd':
      myField.updatePositionDown();
      counter++;
      break;
    case 'u':
      myField.updatePositionUp();
      counter++;
      break;
    case 'l':
      myField.updatePositionLeft();
      counter++;
      break;
    case 'r':
      myField.updatePositionRight();
      counter++;
      break;
    case 'gen':
      Field.genField(5, 5, 40);
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
    if (counter===2){
      myField.increaseDifficulty();
    }
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
welcomeMessage();
console.log(myField.print());
gameInput();

// Field.genField(3,3,50);