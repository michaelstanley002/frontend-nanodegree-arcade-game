// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make enemies loop back to the left side of the canvas
    if (this.x >= 505) {
        this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    checkCollisions(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score);
    instructionsDisplay();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-frog.png';
};

//Draw the player on the screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Define player.update
Player.prototype.update = function(){

};

//Define player.handleInput
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};

//Check collision between enemy/player/screen and wins
var checkCollisions = function(anEnemy){
 
    //Check if player collides with enemy
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
        score = 0;
        console.log("#Losing")
        console.log(" Score: " + score);
        difficulty = 0;
        increaseDifficulty(difficulty);
        console.log(difficulty);
        player.x = 202.5;
        player.y = 383;
    }
        
    //Check if win conditions are met and save score
    if (player.y < 10) {
        player.y = 383;
        player.x = 202.5;
        score++;
        console.log("#Winning");
        console.log(" Score: " + score);
        setDifficulty();
        increaseDifficulty(difficulty);
        console.log(difficulty);
        }

    //Check player collisions with screen borders
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//Define enemy object array allEnemies
var allEnemies = [];
var player = new Player(202.5, 383, 50);
var score = 0;
var difficulty = 1;
var scoreDiv = document.createElement('div');
var instructionsDiv = document.createElement('div2')


var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);

var setDifficulty = function(){

    if (score > 0 && 
        score <2){
        difficulty = 1;
    }
    if (score >3 &&
        score <5){
        difficulty = 2;
    }
    if (score >5 &&
        score <10){
        difficulty = 3;
    }
    if (score >10 &&
        score <15){
        difficulty = 4;
    }
     if (score >15 &&
        score <20){
        difficulty = 5;
    }
    //Activate God Mode
    else if (score >20){
        difficulty = 100;
    }
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(difficulty) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= difficulty; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        
        allEnemies.push(enemy);
    }
};


// Displays players score
var displayScoreLevel = function(score){
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    if (score >20){
        scoreDiv.innerHTML = 'GODMODE ACTIVATED!';
        document.body.insertBefore(scoreDiv, firstCanvasTag[0]);
    }
        
    else{
        scoreDiv.innerHTML = 'Score: ' + score;
        document.body.insertBefore(scoreDiv, firstCanvasTag[0]);
    }
};
var instructionsDisplay = function(){
    var canvas = document.getElementsByTagName('canvas');
    var secondCanvasTag = canvas[0];

    instructionsDiv.innerHTML = 'Instructions: Don\'t be fooled these bugs are poisonous!  Cross to the water to beat the level.';
    document.body.insertBefore(instructionsDiv, secondCanvasTag[0]);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
