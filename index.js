const circle_class = "circle"
const x_class = 'x'
const waysToWin = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
const squareElements = document.querySelectorAll('[square-info]')
const gameboard = document.getElementById('gameboard')
const winningMessageElement =document.getElementById('winningMessage')
const winningMessageTextElement =document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn

// squareElements.forEach(square => {
//     square.addEventListener('click', handleClick, { once: true })
// })

 startGame ()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false 
    squareElements.forEach(square => {
        square.classList.remove(x_class)
        square.classList.remove(circle_class)
        square.removeEventListener('click',handleClick)
        square.addEventListener('click', handleClick, { once : true})
    })
    setBoardHoverClass ()
    winningMessageElement.classList.remove('show')
}
function handleClick(e) {
    const square = e.target
    const currentClass = circleTurn ? circle_class : x_class
    placeMark(square, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true) 
        //swap whos go 
    } else {swapTurns()
    setBoardHoverClass() 

    }
   
    
}
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "Player O" : "Player X"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw (){
    return [...squareElements].every(square => {
        return square.classList.contains(x_class) || square.classList.contains(circle_class)
    })
}
function placeMark(square, currentClass) {
    square.classList.add(currentClass)
}
 
function swapTurns() {
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    gameboard.classList.remove(circle_class)
    gameboard.classList.remove(x_class)
    if (circleTurn) {
        gameboard.classList.add(circle_class)
    } else {
        gameboard.classList.add(x_class)
    }
}
/// check class list see if they contain same class wit one of the possible ways to win 
function checkWin(currentClass) {
    return waysToWin.some(combination => {
        return combination.every(index => {
            return squareElements[index].classList.contains
            (currentClass)
        })
    })
}