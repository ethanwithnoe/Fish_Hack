const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Example commit

// Define fish
const fish = {
    x: 100,
    y: 100,
    speed: 50,
};
const dog = {
    x: 100,
    y: 100,
    speed: 50,
};

// Define hook
const hook = {
    x: canvas.width / 2,
    y: canvas.height,
    speed: 5,
    isDown: false,
};

// Event listener for mouse click
canvas.addEventListener('click', () => {
    if (!hook.isDown) {
        hook.isDown = true;
        hook.y = canvas.height;
    }
});

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw fish
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(fish.x, fish.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Draw hook
    ctx.fillStyle = 'red';
    ctx.fillRect(hook.x - 5, hook.y - 20, 10, 20);

    // Move hook
    if (hook.isDown) {
        hook.y -= hook.speed;
        if (hook.y <= fish.y) {
            hook.isDown = false;
            hook.y = canvas.height;
            // Check if hook is close enough to the fish
            if (Math.abs(hook.x - fish.x) < 20) {
                alert('You caught a fish!');
            }
        }
    }

    requestAnimationFrame(draw);
}

// Update fish position randomly
function updateFish() {
    fish.x += fish.speed;
    if (fish.x > canvas.width + 10) {
        fish.x = -10;
        fish.y = Math.random() * canvas.height;
    }
}

setInterval(updateFish, 1000);

draw();
