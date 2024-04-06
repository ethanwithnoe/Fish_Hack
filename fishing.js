
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//VARS
fishCount = 0
var fishes = [];

//Define School
class School {
    constructor(numFishes, color){
    // Update fish position randomly
    for (let i = 0; i < numFishes; i++) {
        let fishX = Math.random() * canvas.width;
        let fishY = Math.random() * canvas.height;
        let fishSpeed = Math.random() * 2 + 1; // Random speed between 1 and 3
        fishes.push(new Fish(fishX, fishY, fishSpeed, color));
        }
    }
}

// Define fish
class Fish {
    constructor(x, y, speed, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.caught = false;
        this.color = color;
    }

    draw() {
        if (!this.caught) {
            ctx.fillStyle = 'blue';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x-30, this.y+12);
            ctx.lineTo(this.x-30, this.y-12);
            ctx.ellipse(this.x, this.y, 25, 15, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    updateFish() {
        this.x += this.speed;
        if (this.x > canvas.width + 10) {
            this.x = -10;
            this.y = (Math.random() * (canvas.height - 50)) + 50;
        }
        if (hook.isDown) {
        //hook.y += hook.speed;
        if (hook.y >= this.y) {
            if (hook.y >= canvas.height)
            {
                hook.isDown = false;
                hook.y = 0;
            }
            //ook.isDown = false;
            //hook.y = canvas.height;
            // Check if hook is close enough to the fish
            if (Math.abs(hook.x - this.x) < 40 && Math.abs(hook.y - this.y) < 20) {
                hook.y = 0;
                hook.isDown = false;
                fishCount += 1;
                this.x = -50;
                this.y = (Math.random() * (canvas.height - 50)) + 50;
            }
        }
    }
    }
}


// Define hook
const hook = {
    x: canvas.width / 2,
    y: 0,
    speed: 5,
    isDown: false,

};

// Event listener for mouse click
canvas.addEventListener('click', () => {
    if (!hook.isDown) {
        hook.isDown = true;
        hook.y = 0;
    }
});


function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Draw Water
    ctx.fillStyle = 'rgb(159,212,253)';
    ctx.fillRect(0, 50, canvas.width, canvas.height);

    fishes.forEach(fish => {
        fish.draw();
        fish.updateFish();
    });

    // Draw hook
    ctx.fillStyle = 'red';
    ctx.fillRect(hook.x - 5, hook.y + 20, 10, 20);

    // Move hook
    if (hook.isDown) {
        hook.y += hook.speed;
    }
    requestAnimationFrame(draw);
}

//GAME LOGIC

blue = new School(5,'red');

draw();
