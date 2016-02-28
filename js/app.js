// I added these 2 array variables below.


var allEnemies = [];




// Enemies our player must avoid
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png'; 
    this.x = x;
    this.y = y;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
     
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

     
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
    
};


var enemy = new Enemy(100,100);
    enemy.render();
   

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method. 

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    
};

Player.prototype.update = function(dt) {  

};

Player.prototype.render = function() {
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
      ctx.font = '33px serif';

};

var player = new Player(10,10);
player.render();
   

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // player.handleInput(allowedKeys[e.keyCode]);
});


// Things I've changed on the file are below:
// commented out the player.handleInput on line 52
// add allEnemies and player variables on lines 4 and 5
// commented out player.update(); on line 97 on engine.js
// Added a player function on line 34
// commented out player.render on line 154 in engine.js


