let gameBoard = document.querySelector(".gameBoard");

// default position for snake head
let snakeBody = [{ x: 10, y: 10 }];

// giving a random position for food to start
let food = {
  x: Math.floor(Math.random() * 21),
  y: Math.floor(Math.random() * 21),
};

// default input direction given by user
let inputDirection = { x: 0, y: 0 };

// setting the default speed for the snake
let speed = undefined;

// to store the setInterval id to stop the game
let gameLoop = undefined;

// score to update the score value
let score = document.querySelector(".score");

// variable to update the existing score
let currentScore = 0;

// high score to update the high score value
let highScore = document.querySelector(".highScore");

// variable to update the existing high score
let currHighScore = localStorage.getItem("highScore") || 0;

// accessing the game level from the html
let gameLevel = document.querySelector(".gameLevel");

// accessing the game mode from the html
let gameMode = document.querySelector(".gameMode");

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
});

// function to start the game
const startGame = () => {
  // setting the snake speed according to the user input from game level
  if (gameLevel.value === "easy") {
    speed = 600;
  } else if (gameLevel.value === "medium") {
    speed = 300;
  } else {
    speed = 150;
  }

  // removing the snake background image
  gameBoard.style.backgroundImage = "none";
  gameBoard.style.background = "#a171a2";

  // creating a game loop to run for every second
  gameLoop = setInterval(() => {
    update();
    render();
    endGame();
    eatFood();
  }, speed);
};

// function to update the position of food and snake
const update = () => {
  // loop to move the snake towards its head
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    // destructuring it to assign the value properly
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  // setting the head
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;

  // displaying the current high score as the game loads
  score.innerHTML = currentScore;
  highScore.innerHTML = currHighScore;
};

// function to display the food and snake on board
const render = () => {
  // clearing the game board before re-rendering it
  gameBoard.innerHTML = "";

  // creating the snake body and appending it to the game board
  snakeBody.forEach((element) => {
    let bodyPart = document.createElement("div");
    if (snakeBody[0] === element) {
      bodyPart.classList.add("snakeHead");
    } else {
      bodyPart.classList.add("snake");
    }
    bodyPart.style.gridRowStart = element.x;
    bodyPart.style.gridColumnStart = element.y;
    gameBoard.appendChild(bodyPart);
  });

  // displaying the food on the board
  let foodParticle = document.createElement("div");
  foodParticle.classList.add("food");
  foodParticle.style.gridRowStart = food.x;
  foodParticle.style.gridColumnStart = food.y;
  gameBoard.appendChild(foodParticle);
};

// function to check that the snake has eaten the food or not
const eatFood = () => {
  if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
    // moving the food to next location
    food = {
      x: Math.floor(Math.random() * 21),
      y: Math.floor(Math.random() * 21),
    };

    // increasing the snake body by one, once he eat the food
    snakeBody.push({ x: 0, y: 0 });

    // increasing the score and high score after eating the food
    currentScore += 1;
    if (currentScore > currHighScore) {
      currHighScore = currentScore;
      localStorage.setItem("highScore", currHighScore);
    }
  }
};

// game over functionality, if a snake passes himself or the walls
const endGame = async () => {
  // checking that the snake had eaten his body or not
  for (let i = 1; i < snakeBody.length - 1; i++) {
    if (
      snakeBody[0].x === snakeBody[i].x &&
      snakeBody[0].y === snakeBody[i].y
    ) {
      clearInterval(gameLoop);

      // displaying the game over message
      let gameOver = document.createElement("div");
      gameOver.classList.add("gameOver");
      gameOver.innerText = "Game Over";
      gameBoard.appendChild(gameOver);

      // wait for 2 second to restart the game
      await setTimeout(() => {
        restart();
      }, 2000);
    }
  }

  if (gameMode.value === "strict") {
    // checking that the snake had hit the wall or not
    if (
      snakeBody[0].x < 1 ||
      snakeBody[0].y < 1 ||
      snakeBody[0].x > 20 ||
      snakeBody[0].y > 20
    ) {
      clearInterval(gameLoop);

      // displaying the game over message
      let gameOver = document.createElement("div");
      gameOver.classList.add("gameOver");
      gameOver.innerText = "Game Over";
      gameBoard.appendChild(gameOver);

      // wait for 2 second to restart the game
      await setTimeout(() => {
        restart();
      }, 2000);
    }
  }

  // allowing the snake to pass the wall
  else {
    if (snakeBody[0].x < 0) {
      snakeBody[0].x = 20;
    } else if (snakeBody[0].y < 0) {
      snakeBody[0].y = 20;
    } else if (snakeBody[0].x > 20) {
      snakeBody[0].x = 0;
    } else if (snakeBody[0].y > 20) {
      snakeBody[0].y = 0;
    }
  }
};

// function to restart the game
const restart = () => {
  // simply relaoding the whole page, once a user wants to restarts the game
  snakeBody = [{ x: 10, y: 10 }];
  food = {
    x: Math.floor(Math.random() * 21),
    y: Math.floor(Math.random() * 21),
  };
  inputDirection = { x: 0, y: 0 };
  currentScore = 0;
  startGame();
};
