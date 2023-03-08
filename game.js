
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const steveFrame = document.getElementById("steve");

let createRect = (x,y,width,height,color) => {
    ctx.fillStyle= color;
    ctx.fillRect(x, y, width, height);
};
const DIRECTION_HAUT=3;
const DIRECTION_BAS=1;
const DIRECTION_DROITE=4;
const DIRECTION_GAUCHE=2;
const DIRECTION_NEUTRE=0;
const DIRECTION_JUMP=5;

let blockMapSize = 20;
let fps= 30;
let player;
let blockMapColor = "#7CFC00";
let blockMapColorGrey = "grey"

let isKeyPressed = false;
let k;
let gravity = blockMapSize / 10;
let jump = blockMapSize /2;


let solidBlock = [1,4,6];

let map = [
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,1,1,1,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,3,3,3,3,3,3,3,3],
    [4,1,1,1,1,1,1,1,3,3,3,3,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3],


    [4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,1],
    [4,4,4,4,4,4,4,1,1,4,4,1,1,4,4,4,4,4,4,1,1,1,1,0,0,0,0,1,1,1,4,4,4,4,4,4,1,1,1,1,1,1,1],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,0,0,0,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [0,0,0,0,0,0,4,4,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    
];



let createNewPlayer = () => { 
    player = new Player(
        blockMapSize*10,
        blockMapSize,
        8,
        40,
        blockMapSize /6
    );
};


let gameLoop = () => {
    update();
    draw();
};


let gameInterval = setInterval(gameLoop,1000/fps);


let update = () => {
  player.moveProcess();
};

window.addEventListener('click', function(event) {
    // Get the x and y coordinates of the clicked cell
    let x = Math.floor(event.clientX / blockMapSize);
    let y = Math.floor(event.clientY / blockMapSize);
  
    // Check if the clicked cell is a solid block
    if (solidBlock.includes(map[y][x])) {
        // Calculate the distance between the player and the clicked cell
        let distanceBlock = Math.sqrt(Math.pow((player.x / blockMapSize) - x, 2) + Math.pow((player.y/ blockMapSize) - y, 2));
        // Check if the distance is less than or equal to 4
        if (distanceBlock <= 4) {
            // Call the function you want to call when a solid block is clicked
            map[y][x] = 3;
        }
    }
    //this is for put a new block
    if(!solidBlock.includes(map[y][x])){
        let distanceBlock = Math.sqrt(Math.pow((player.x / blockMapSize) - x, 2) + Math.pow((player.y/ blockMapSize) - y, 2));
        // Check if the distance is less than or equal to 4
        if (distanceBlock <= 4) {
            window.addEventListener("keydown", (event) => {
                let putBlock = event.keyCode;
                if(k == 69){
                    map[y][x] = 6;
                }
            });
        }
    }
});
   



let draw = () =>{ 
    ctx.clearRect(0,0,canvas.width,canvas.height);
    createRect(0, 0, canvas.width, canvas.height, "blue");
    drawMap();
    player.draw();
};


let  drawMap = () => {
    for(let i = 0 ; i < map.length ; i++ ){
        for(let j = 0; j< map[0].length; j++){
            if(map[i][j] == 1){
                createRect(j*blockMapSize,i*blockMapSize,blockMapSize,blockMapSize,blockMapColor);
            };
            if(map[i][j] == 4){
                createRect(j*blockMapSize,i*blockMapSize,blockMapSize,blockMapSize,blockMapColorGrey);
            };
            if(map[i][j] == 0){
                createRect(j*blockMapSize,i*blockMapSize,blockMapSize,blockMapSize,"black");
            };
            if(map[i][j] == 6){
                createRect(j*blockMapSize,i*blockMapSize,blockMapSize,blockMapSize,"#DEB887");
            };
        }
    }
};


createNewPlayer();
gameLoop();


window.addEventListener("keydown", (event) => {
    isKeyPressed = true;
    k = event.keyCode;
});

window.addEventListener("keyup", (event) => {
    isKeyPressed = false;
});


function jumpLoop(){
    if (k == 32 && solidBlock.includes(map[Math.floor(player.y / (blockMapSize-1)) + 1][Math.floor(player.x / blockMapSize)])) {
        // bottom arrow or s
        player.nextDirection = DIRECTION_JUMP;
        //isKeyPressed = false;
        }
        // check if the player is on top of a solid block
    if (!solidBlock.includes(map[Math.floor(player.y / (blockMapSize-1)) + 1][Math.floor(player.x / blockMapSize)]) 
    && !solidBlock.includes(map[Math.floor(player.y / (blockMapSize-1)) + 1][Math.floor(player.x / blockMapSize)])) {
        // if not, move the player downward
        player.y += gravity;
    }
    requestAnimationFrame(jumpLoop);
}
requestAnimationFrame(jumpLoop);


function moveLoop() {
    if (!isKeyPressed) {
        player.nextDirection = DIRECTION_NEUTRE;
    }
    if (isKeyPressed) {
        if (k == 37 || k == 81) {
            // left arrow or q
           player.nextDirection = DIRECTION_GAUCHE;
           
        } else if (k == 38 || k == 90) {
            // up arrow or z
            player.nextDirection = DIRECTION_HAUT;
        } else if (k == 39 || k == 68) {
            // right arrow or d
            player.nextDirection = DIRECTION_DROITE;
        } else if (k == 40 || k == 83) {
            // bottom arrow or s
            player.nextDirection = DIRECTION_BAS;
        }
    }
    
    requestAnimationFrame(moveLoop);
}

requestAnimationFrame(moveLoop);







