document.addEventListener(`DOMContentLoaded`, () => {
    const grid = document.querySelector('.grid');

    let squares = Array.from(document.querySelectorAll('.grid div'));

    const squareDisplay = document.querySelector('#score');

    const startBtn = document.querySelector('#start-button');

    const width = 10; 

    let nextRandom = 0;

    let timerId

    //The tetrominoes

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const ztetromino = [
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1]
    ];

    const tTetromino = [
        [width, width+1, 1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width+1, width, width*2+1] 
    ];

    const oTetromino = [
        [0, 1, width+1, width],
        [0, 1, width+1, width],
        [0, 1, width+1, width],
        [0, 1, width+1, width]
    ];

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ];

    const theTetrominoes = [lTetromino, ztetromino, tTetromino, oTetromino, lTetromino];

    let currentPosition = 4;
    let currentRotation = 0
// randomly select a tetromino and its first rotation  
    let random = Math.floor(Math.random()*theTetrominoes.length);
    console.log(random)
    let current = theTetrominoes[random][currentRotation]

//draw the tetromino
const draw = () => {
   current.forEach(item => {
       squares[currentPosition + item].classList.add('tetromino')
   })
}

draw()

//undraw the tetromino 
const undraw = () => {
    current.forEach(item => {
        squares[currentPosition + item]. classList.remove('tetromino')
    })
}

// undraw()

//Freezer function

const freeze = () => {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
       current.forEach(item => squares[currentPosition + item].classList.add('taken'))
       //start a new tetromino
       random = nextRandom
       nextRandom = Math.floor(Math.random() * theTetrominoes.length)
       current = theTetrominoes[random][currentRotation]
       currentPosition = 4
       draw()
       displayShape()
    }
}

// make the tetromino move down every second
// timerId = setInterval(moveDown, 1000)

// assign function to keycodes 

const control = (e) => {
    if(e.keyCode === 37) {
        moveLeft()
    }
    else if(e.keyCode === 38){
       rotate()
    }
    else if(e.keyCode === 39){
        moveRight()
    }
    else if(e.keyCode === 40) {
        moveDown()
    }
}

document.addEventListener('keyup', control)

function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}

// move the tetromino left, unless is at the edge or there is a blockage

const moveLeft = () => {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    
    if(!isAtLeftEdge) currentPosition -= 1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1
    }
    
    draw()
}

// move the tetromive right, unless is at the edger or there is a blockage 

const moveRight = () => {
    undraw()
    
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

    if(!isAtRightEdge) currentPosition += 1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1
    }

    draw()
}

// rotate the tetromino 

const rotate = () => {
    undraw()

    currentRotation++
    
    if( currentRotation === current.length) {
        currentRotation = 0
    }

    current = theTetrominoes[random][currentRotation]
    
    draw()
}

// show up-next tetromino in minigrid display

const displaySquares = document.querySelectorAll('.mini-grid div');

console.log(displaySquares)

const displayWidth = 4; 

let displayIndex = 0



// the tetromino without rotation

const upNextTetraminoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //Ltetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //ztetromino
    [displayWidth, displayWidth+1, 1, displayWidth+2], //ttetromino
    [0, 1, displayWidth+1, displayWidth], //otetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //itetromino
]

// display de shape in the mini-grid

const displayShape = () => {
    displaySquares.forEach( square => {
        // remove any trace of a tetromino
        square.classList.remove("tetromino")
    })
    upNextTetraminoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
    })
}

// Add funtionality to the button 

startBtn.addEventListener('click', () => {
  if(timerId) {
      clearInterval(timerId)
      timerId = null
  }
  else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      displayShape()
  }
})

// Add score 

const addScore = () => {
    for(let i = 0; i < 199; i += width)
}


} )

