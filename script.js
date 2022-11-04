let gameBoard = document.querySelector(".gameBoard");
// default position for snake head
let snakeBody = [{ x: 10, y: 10 }];
// giving a random position for food to start
let food = { x: Math.floor((Math.random())*21), y: Math.floor((Math.random())*21) };
// default input direction given by user
let inputDirection = { x: 0, y: 0 };
// setting the default speed for the snake
let speed = 1000;


// event listner to set the snake direction given by the user
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (inputDirection.x !== 1) {
                inputDirection.x = -1;
                inputDirection.y = 0;
            }
            break;
        case "ArrowDown":
            if (inputDirection.x !== -1) {
                inputDirection.x = 1;
                inputDirection.y = 0;
            }
            break;
        case "ArrowLeft":
            if (inputDirection.y !== 1) {
                inputDirection.x = 0;
                inputDirection.y = -1;
            }
            break;
        case "ArrowRight":
            if (inputDirection.y !== -1) {
                inputDirection.x = 0;
                inputDirection.y = 1;
            }
            break;
    }
})

// function to start the game
const game = () => {
    // creating a game loop to run for every second
    setInterval(() => {
        update();
        render();
        eatFood();
    }, 1000);
}

// function to update the position of food and snake
const update = () => {
    // loop to move the snake towards its head
    for (let i = snakeBody.length - 2; i >= 0; i--){
        // destructuring it to assign the value properly
        snakeBody[i + 1] = {...snakeBody[i]};
    }

    // setting the head
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;    
}

// function to display the food and snake on board
const render = () => {
    // clearing the game board before re-rendering it
    gameBoard.innerHTML = "";

    // creating the snake body and appending it to the game board
    snakeBody.forEach((element) => {
        let bodyPart = document.createElement("div");
        bodyPart.classList.add("snake");
        bodyPart.style.gridRowStart = element.x;
        bodyPart.style.gridColumnStart = element.y;  
        gameBoard.appendChild(bodyPart);
    })

    // displaying the food on the board
    let foodParticle = document.createElement("div");
    foodParticle.classList.add("food");
    foodParticle.style.gridRowStart = food.x;
    foodParticle.style.gridColumnStart = food.y;  
    gameBoard.appendChild(foodParticle);
}

// function to check that the snake has eaten the food or not
const eatFood = () => {
    if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
        // moving the food to next location
        food = { x: Math.floor((Math.random()) * 21), y: Math.floor((Math.random()) * 21) };
        
        // increasing the snake body by one, once he eat the food
        snakeBody.push({ x: 0, y: 0 });
    }
}


// starting the game
game();