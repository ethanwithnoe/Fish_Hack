

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//VARS

fishCount = 0;
numFishes = 10;
var fishes = [];

//comit
//hi
//Example commit
//Dog butter
// Define fish


const fish = {
    x: 100,
    y: 100,
    speed: 2,
};



const School = [];

class Fish {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.caught = false;
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
                this.x = -10;
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

// Update fish position randomly


for (let i = 0; i < numFishes; i++) {
    let fishX = Math.random() * canvas.width;
    let fishY = Math.random() * canvas.height;
    let fishSpeed = Math.random() * 2 + 1; // Random speed between 1 and 3
    fishes.push(new Fish(fishX, fishY, fishSpeed));
    }

function catchFish() {
    return 
}

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
        if (hook.y >= fish.y) {
            if (hook.y >= canvas.height)
            {
                hook.isDown = false;
                hook.y = 0;
            }
            //ook.isDown = false;
            //hook.y = canvas.height;
            // Check if hook is close enough to the fish
            if (Math.abs(hook.x - fish.x) < 40 && Math.abs(hook.y - fish.y) < 20) {
                hook.y = 0;
                hook.isDown = false;
                fishCount += 1;
                fish.x = -10;
                fish.y = (Math.random() * (canvas.height - 50)) + 50;
            }
        }
    }
    requestAnimationFrame(draw);
}



draw();
