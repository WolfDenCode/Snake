let playground

let rows = 17
let cols = 17

let unitSize = 25

let context

let movementX = 0
let movementY = 0

let movesPerSec = 8

let playerBody = []

let gameOver = false

window.onload = function () {
    playground = document.getElementById("playground")

    playground.width = cols * unitSize
    playground.height = rows * unitSize

    context = playground.getContext("2d")

    document.addEventListener("keydown", changeDir)

    spawnFood()

    setInterval(draw, 1000/movesPerSec)
}

let playerX = (Math.floor(Math.random() * 10)) * unitSize
let playerY = (Math.floor(Math.random() * 10)) * unitSize

let foodX
let foodY

function spawnFood() {
    foodX = (Math.floor(Math.random() * 10)) * unitSize
    foodY = (Math.floor(Math.random() * 10)) * unitSize
}

function draw(){
    context.fillStyle = "gray"
    context.fillRect(0, 0, playground.width, playground.height)

    if (playerX === foodX && playerY === foodY) {
        playerBody.push([foodX, foodY])
        spawnFood()
    }

    for (let i = playerBody.length-1; i > 0; i--) {
        playerBody[i] = playerBody[i-1]
    }
    if (playerBody.length) {
        playerBody[0] = [playerX, playerY]
    }

    context.fillStyle = "red"
    context.fillRect(foodX, foodY, unitSize, unitSize)

    context.fillStyle = "green"


    playerX += movementX * unitSize
    playerY += movementY * unitSize

    context.fillRect(playerX, playerY, unitSize, unitSize)

    for (let i = 0; i < playerBody.length; i++) {
        context.fillRect(playerBody[i][0], playerBody[i][1], unitSize, unitSize)
        
    }

    if (playerX < 0 || playerY < 0 || playerX > cols * unitSize || playerY > rows * unitSize) {
        gameOver = true
    }

    for (let i = 0; i < playerBody.length; i++) {
        if (playerX == playerBody[i][0] && playerY == playerBody[i][1]) {
            gameOver = true
        }
    }
    if(gameOver === true){
        alert("Game Over!")
    }
}

function changeDir(e){
    console.log(e.code);
    if (e.code === "ArrowUp" && movementY != 1) {
        movementY = -1
        movementX = 0
        console.log(movementX,movementY);
    }
    else if (e.code === "ArrowRight" && movementX != -1) {
        movementY = 0
        movementX = 1
        console.log(movementX,movementY);
    }
    else if (e.code === "ArrowDown" && movementY != -1) {
        movementY = 1
        movementX = 0
        console.log(movementX,movementY);
    }
    else if (e.code === "ArrowLeft" && movementX != 1) {
        movementY = 0
        movementX = -1
        console.log(movementX,movementY);
    }
}

