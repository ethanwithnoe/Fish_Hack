const canvas = document.getElementById('canvas');
const stocks = document.getElementById('stocks');
const ocean = document.getElementById('ocean');


const ctx = canvas.getContext('2d');
const ctx2 = stocks.getContext('2d');
const ctx3 = ocean.getContext('2d');



//VARS
var fishes = [];


//For HTML stuff
totalFishCaught = 0;
fishCaught = 0;
profit = 0;
badLuckCount = 0;
whenToStock = 0;
updateCounter = 100;


priceOfFish = 0;
priceOfFishEggs = 0;

tools = [];

class Tool {

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
    };

}


class Hook extends Tool{
    

    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 5, this.y + 20, 10, 20);
    }
    

    type() {
        return "Hook";
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

}

class Spear extends Tool{


    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x - 5, this.y + 20, 10, 20)
    }

    type() {
        return "Spear";
    }

}

class Fishermen{

    constructor() {
        this.count = 0;
        this.max = 6;
    }
    

    addFisherman() {
        this.count += 1;
        tools.push(new Hook( (this.count/8) * canvas.width, 0, 5) );
    }

}

class FishStocks {

    //Create node with base price
    nodes = [];


    constructor(basePrice, numNodes) {
        //nodes = [];
        this.old_price = basePrice;
        this.numNodes = numNodes;

        this.generateNodes(basePrice);
    }
    generateNodes(basePrice){
       for(let i=0; i<this.numNodes; i++){
            let newPrice = generatePrice(basePrice)
            this.nodes.push(generatePrice(basePrice))
            basePrice=newPrice;
       }
    }
    
    updateStock(){
        let lastPrice = this.nodes[this.nodes.length-1]
        this.nodes.push(generatePrice(lastPrice));
        //console.log(generatePrice(lastPrice));
        this.nodes.shift();

        //Update Prices
        priceOfFish = (Math.round(this.nodes[this.nodes.length-1] * 100)) / 100;
        priceOfFishEggs = ((Math.round(this.nodes[this.nodes.length-1] * 100 * (totalFishCaught*0.5))) / 100) ;
    }
    draw() {
        
        for (let i = 0; i < this.numNodes - 1; i++)
        {
            //console.log(i);
            ctx2.fillStyle = 'blue';
            ctx2.beginPath(0,stocks.height/2);
            ctx2.moveTo(5 * i, stocks.height-this.nodes[i]*20);
            ctx2.lineTo(5 * (i+1), stocks.height-this.nodes[i+1]*20);
            ctx2.stroke();
        }
        
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
        if (this.x > canvas.width + 50) {
            this.x = -50;
            this.y = (Math.random() * (canvas.height - 50)) + 50;
        }


        //Check for tools[i] Collision 
    }

    checkFish(){

        //hitboxX = tools[i].getSizeX();
        //hitboxY = tools[i].getSizeY();

        for (let i = 0 ; i < tools.length; i++){
            if (tools[i].isDown) {
                //tools[i].y += tools[i].speed;
                if (tools[i].y >= this.y) {
                    if (Math.abs(tools[i].x - this.x) < 40 && Math.abs(tools[i].y - this.y) < 40) {
                        //Reset Rod
                        if (tools[i].type() == "Hook"){
                            tools[i].y = 0;
                            tools[i].isDown = false;
                        }

                        //Update fishCaught
                        fishCaught += 1;
                        totalFishCaught += 1;


                        //Reset fish
                        this.x = -50;
                        this.y = (Math.random() * (canvas.height - 50)) + 50;
                    }

                }
            }
        }
    }



}

//FOR HTML BUTTONS ------------------------------------------------------------------------------------

function sellFish() {
    profit += fishCaught * priceOfFish;
    fishCaught = 0;
}

function buyFishEggs() {
    

    profit -= priceOfFishEggs;
    new School(5, 'green');
}

function upgradeHook() {

    for (let i = 0; i < tools.length; i++)
        tools[i] = new Spear(canvas.width/2,0,5);

    document.getElementById("upgradeHookText").style.display = 'none';
    document.getElementById("upgradeHookBtn").style.display = 'none';

    men.addFisherman();
    men.addFisherman();
    men.addFisherman();
}



//END FOR HTML BUTTONS

// Event listener for mouse click
canvas.addEventListener('click', () => {

    for (let i = 0; i < tools.length; i++)
    {
        if (!tools[i].isDown) {
        tools[i].isDown = true;
        tools[i].y = 0;
    }

    }

    

});

ocean.addEventListener


function generatePrice(old_price){
    rnd = Math.random(); // generate number, 0 <= x < 1.0
    volatility = 0.18;
    change_percent = 2 * volatility * rnd;
    if (change_percent > volatility  || old_price>= 15)
        change_percent -= (2 * volatility);
        badLuckCount++;
    if(badLuckCount==100 || old_price<=3 ){
        change_percent += (2 * volatility);
    }
    change_amount = old_price * change_percent;
    new_price = old_price + change_amount;
    return new_price;
}
function UpUpdateCounter(){
    updateCounter-=0.5*updateCounter;
    console.log(updateCounter)
}
function DownUpdateCounter(){
    
    updateCounter+=0.5*updateCounter;
    if(updateCounter>=100){
        updateCounter=100;
    }

    console.log(updateCounter)
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0,0, stocks.width, stocks.height);

    // Draw Water
    ctx.fillStyle = 'rgb(159,212,253)';
    ctx.fillRect(0, 50, canvas.width, canvas.height);

    fishes.forEach(fish => {
        fish.draw();
        fish.updateFish();
        fish.checkFish();
        
    });

    if(whenToStock>=updateCounter){
        fishStocks.updateStock()
        whenToStock=0;
    }
    fishStocks.draw();

    whenToStock++;
    

    // Draw tools

    for (let i = 0; i < tools.length; i++)
    {
        tools[i].draw();
        tools[i].move();
    }
        

   


    requestAnimationFrame(draw);

    

    //update HTML
    document.getElementById("fishCaught").textContent = fishCaught;
    document.getElementById("profit").textContent = Math.round(profit * 100) /100;
    document.getElementById("priceOfFish").textContent = priceOfFish;
    document.getElementById("priceOfFishEggs").textContent = priceOfFishEggs;

    // Cannot set properties of null (setting 'disabled')
    //when truing to limit accelrater
    if (updateCounter >= 100)
        document.getElementById("DecFishBtn").disabled = true;
    else
        document.getElementById("DecFishBtn").disabled = false;

    document.getElementById("totalFishCaught").textContent = totalFishCaught;


    //Check Butttons
    if (fishCaught == 0)
        document.getElementById("sellFishBtn").disabled = true;
    else
        document.getElementById("sellFishBtn").disabled = false;

    if ((profit < priceOfFishEggs) || (totalFishCaught == 0))
        document.getElementById("buyFishEggsBtn").disabled = true;
    else
        document.getElementById("buyFishEggsBtn").disabled = false;

    if (totalFishCaught >= 1 && tools[0].type() == "Hook") {
        document.getElementById("upgradeHookText").style.display = 'block';
        document.getElementById("upgradeHookBtn").style.display = 'block';
    }

}


//GAME LOGIC


tools.push(new Hook(canvas.width/2,0,5));
men = new Fishermen;
fishStocks = new FishStocks(10,100);
blue = new School(5,'red');

//setInterval(fishStocks.draw, 100);



draw();

