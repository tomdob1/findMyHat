const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(newField){
    this._newField = newField;
  }
  print(){
    

    for(let i = 0; i < this._newField.length; i++){
      let line = this._newField[i][0]+''+this._newField[i][1]+''+this._newField[i][2];
      console.log(line);
    }
  }
}


const myField = new Field([
   ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);
// console.log(myField.print());



function gameInput(){
  let userInput = prompt('Please input the direction you would like to move?');

  
}

