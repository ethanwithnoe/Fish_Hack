

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//VARS

fishCount = 0;

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
function updateFish() {
    fish.x += fish.speed;
    if (fish.x > canvas.width + 10) {
        fish.x = -10;
        fish.y = (Math.random() * (canvas.height - 50)) + 50;
    }
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

    // Draw fish
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(fish.x, fish.y);
    ctx.lineTo(fish.x-30, fish.y+12);
    ctx.lineTo(fish.x-30, fish.y-12);
    ctx.ellipse(fish.x, fish.y, 25, 15, 0, 0, Math.PI * 2);
    //ctx.ellipse(fish.x, fish.y, 20, 10, 0, 0, Math.PI * 2);
    ctx.fill();




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



setInterval(updateFish, 15);

draw();
