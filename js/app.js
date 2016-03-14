
var playerStartx = 200;
var playerStarty = 400;
var score = 0;
var lives = 3;
var randomSpeed = [200, 300, 400, 550];




// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = randomSpeed[(Math.floor(Math.random() * randomSpeed.length))] + 100;
    this.width = 25;
    this.height = 25;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    
    //  When the bug reaches the width of the screen at 505 start it
    // over again 100 pixels left of the canvas. It is multiplied by dt
    // to normalize the speed across different computers
    if (this.x < 505) {
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = -100;
        }
    }

};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(now) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies



// I've created 4 enemies that start at different x coordinates
// where 2 of them will always be on the bottom row 225 y coordinate

var allEnemies = [];

(function createEnemies() {
    allEnemies.push(new Enemy(-100, 60));
    allEnemies.push(new Enemy(-200, 140));
    allEnemies.push(new Enemy(-150, 225));
    allEnemies.push(new Enemy(-500, 225));


}());


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method. 

var Player = function(x, y) {
    this.x = playerStartx;
    this.y = playerStarty;
    this.sprite = 'images/char-boy.png';
    this.width = 25;
    this.height = 25;

};




//  playerstart x and y coordinates were defined at top of app.js

Player.prototype.reset = function(x, y) {
    this.x = playerStartx;
    this.y = playerStarty;


};

// My player update function has included counters for both score and lives
// when necessary conditions are met.  Game is reset when lives = 0 or score = 3

Player.prototype.update = function(dt) {

    if (this.y <= -1) {
        checkCollisions();
        this.reset();
        score++;
        if (score === 3) {
            alert("You got 3 in a row! Congratulations!");
            lives = 3;
            score = 0;
            this.reset();
        }
    }
    if (lives === 0) {
        alert("You lose! Try again!");
        lives = 3;
        score = 0;
        this.reset();

    }

};


// Using console.log(this.x, this.y) I was able to define boundaries
// and also add a condition for if the player touches the rock to stay put
// and not move.  I added these for up, down and right and not left since
// a player can never move left to the rock. I added the rock on the far right
// side of the screen to make the game more challenging since bugs come from
// the left side.

Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 25) {
        this.x -= 100;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 100;
        if (direction === 'right' && this.x === 400 && this.y === 160) {
            this.x = 300;

        }

    }



    if (direction === 'up') {
        this.y -= 80;
        if (direction === 'up' && this.x === 400 && this.y === 160) {
            this.y = 240;
        }
    }


    if (direction === 'down' && this.y < 400) {
        this.y += 80;
        if (direction === 'down' && this.x === 400 && this.y === 160) {
            this.y = 80;
        }
    }

    console.log(this.x, this.y);
};


// I based my render function on the enemy function but inserted the rock image
// and my 2 new functions to keep track of score and player lives.

Player.prototype.render = function() {
    drawScore();
    drawLives();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.drawImage(Resources.get('images/Rock.png'), 400, 140);
};



// Place the player object in a variable called player

var player = new Player(playerStartx, playerStarty);



var checkCollisions = function() {


    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + player.width &&
            allEnemies[i].x + allEnemies[i].width > player.x &&
            allEnemies[i].y < player.y + player.height &&
            allEnemies[i].height + allEnemies[i].y > player.y) {
            lives--;
            score = 0;
            player.reset();
        }

    }
};



// These 2 functions will keep track of the score and player lives.

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 10, 70);
}

function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Lives: " + lives, 415, 70);
}




// This listens for allowedKeys presses and sends the allowedKeyss to your
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






