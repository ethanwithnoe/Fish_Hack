const canvas = document.getElementById('canvas');
const stocks = document.getElementById('stocks');

const ctx2 = stocks.getContext('2d');
const ctx = canvas.getContext('2d');
//import Chart from 'chart.js/auto';


//VARS
var fishes = [];

//For HTML stuff
fishCaught = 0;
profit = 0.5 * fishCaught;
startPrice = Math.random()*60

class Tool {

    hitboxX = 20;
    hitboxY = 20;

    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.isDown = false;
        this.toolType = "";
    }

    move(){
        if (this.isDown) {
            this.y += this.speed;
        }
        if (this.y >= canvas.height)
        {
            this.isDown = false;
            this.y = 0;
        }
    }

    getHitboxX() {
        return this.hitboxX;
    }

    getHitboxY() {
        return this.hitboxY;
    }

}



class Hook extends Tool{


    
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 5, this.y + 20, 10, 20);
    }
    

    type() {
        return "Hook";
    }

}

class Spear extends Tool{
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 5, this.y + 20, 10, 100);
    }

    type() {
        return "Spear";
    }

}

class FishStocks {
    

    nodes = [];

    generateNode(old_price){
        volatility=10;
        rnd = Math.Random(); // generate number, 0 <= x < 1.0
        change_percent = 2;
        if(change_percent < volatility){
            change_percent -= (2 * volatility);
            }
        change_amount = old_price * change_percent;
        new_price = old_price + change_amount;
        this.nodes.push(new_price);
    }

    constructor(numNodes,old_price) {
        this.numNodes = numNodes;
        for (let i=0; i<numNodes; i++) {
           // generateNode(old_price);
        }
    }

    updateStock(old_price) {
        generateNode(old_price);
        shift(nodes);
    }
    
    draw() {
        //for (let i = 0; i < 3; i++)
        //{
            ctx2.fillStyle = 'blue';
            ctx2.beginPath();
            ctx2.moveTo(10, 10);
            ctx2.lineTo(100, 100);
        //}
        
    }
}






//Define School
class School {
    constructor(numFishes, color){
    // Update fish position randomly
    for (let i = 0; i < numFishes; i++) {
        let fishX = Math.random() * canvas.width;
        let fishY = (Math.random() * (canvas.height-50) + 50);

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
        //Move Fish
        this.x += this.speed;
        if (this.x > canvas.width + 10) {
            this.x = -10;
            this.y = (Math.random() * (canvas.height - 50)) + 50;
        }


        //Check for fishingRod Collision 
    }
    checkFish(){

        //hitboxX = fishingRod.getSizeX();
        //hitboxY = fishingRod.getSizeY();

        if (fishingRod.isDown) {
            //fishingRod.y += fishingRod.speed;
            if (fishingRod.y >= this.y) {
                if (Math.abs(fishingRod.x - this.x) < 40 && Math.abs(fishingRod.y - this.y) < 20) {
                    //Reset Rod
                    if (fishingRod.type() == "Hook"){
                        fishingRod.y = 0;
                        fishingRod.isDown = false;
                    }
                    //Update fishCaught
                    fishCaught += 1;


                    //Reset fish
                    this.x = -50;
                    this.y = (Math.random() * (canvas.height - 50)) + 50;
                }

            }
        }
    }
}



// Event listener for mouse click
canvas.addEventListener('click', () => {
    if (!fishingRod.isDown) {
        fishingRod.isDown = true;
        fishingRod.y = 0;
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
        fish.checkFish();
        
    });

        fishStocks.draw();
        
    // Draw fishingRod
        fishingRod.draw();
        fishingRod.move();

   //setInterval(updateStock(startPrice), 1000);


    requestAnimationFrame(draw);


    //update HTML
    document.getElementById("fishCaught").textContent = fishCaught;
    document.getElementById("profit").textContent = profit;
}

//GAME LOGIC

let fishingRod = new Spear(canvas.width/2,0,5);
fishStocks = new FishStocks(3,60);
blue = new School(5,'red');

draw();