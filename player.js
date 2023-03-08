// player.js
class Player{
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.currentFrame = 1;
        this.direction = 0;
        this.nextDirection = 0;
    }
    
    
    moveProcess() {
        this.changeDirectionIfPossible();
        this.moveForwards();
        if(this.checkCollisionGround() || this.checkCollisioCeiling()) {
            this.moveBackwards();
            return;
        }
    }

    moveBackwards(){
        switch(this.direction){
            case DIRECTION_DROITE:
                this.x -=this.speed;break;
            case DIRECTION_GAUCHE:
                this.x +=this.speed;break;
            case DIRECTION_BAS:
                this.y -= this.speed;break;
            case DIRECTION_HAUT:
                this.y +=this.speed;break;
        }

    }

    moveForwards() {
            switch(this.direction){
                case DIRECTION_DROITE:
                    this.x +=this.speed;break;
                case DIRECTION_GAUCHE:
                    this.x -=this.speed;break;
                case DIRECTION_BAS:
                    this.y += this.speed;break;
                case DIRECTION_HAUT:
                    this.y -=this.speed;break;
                case DIRECTION_JUMP:
                    this.y -= jump;break;
            }
    }

    breakBlock() {

    }

    checkCollisionGround(){
        let isCollided = false;
        if (
            solidBlock.includes(map[parseInt(this.y / blockMapSize)][
                parseInt(this.x / blockMapSize)
            ]) ||
            solidBlock.includes(map[parseInt(this.y / blockMapSize + 0.9999)][
                parseInt(this.x / blockMapSize)
            ]) ||
            solidBlock.includes(map[parseInt(this.y / blockMapSize - 0.9999)][
                parseInt(this.x / blockMapSize)
            ]) ||
            solidBlock.includes(map[parseInt(this.y / blockMapSize)][
                parseInt(this.x / blockMapSize + 0.9999)
            ]) ||
            solidBlock.includes(map[parseInt(this.y / blockMapSize + 0.9999)][
                parseInt(this.x / blockMapSize + 0.9999)
            ])
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    checkCollisioCeiling(){
        let isCollided = false;
        if (
            solidBlock.includes(map[parseInt(this.y / blockMapSize)][
                parseInt(this.x / blockMapSize)
            ]) ||
            solidBlock.includes(map[parseInt(this.y / blockMapSize + 0.9999)][
                parseInt(this.x / blockMapSize)
            ]) ||
            solidBlock.includes(map[parseInt(this.y / blockMapSize - 0.9999)][
                parseInt(this.x / blockMapSize)
            ]) ||
            solidBlock.includes(map[parseInt(this.y / blockMapSize)][
                parseInt(this.x / blockMapSize + 0.9999)
            ]) ||
            solidBlock.includes(map[parseInt(this.y / blockMapSize + 0.9999)][
                parseInt(this.x / blockMapSize + 0.9999)
            ])
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    changeDirectionIfPossible(){
        if (this.direction == this.nextDirection) return;
        let tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.moveForwards();
        if (this.checkCollisionGround()) {
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }

    }

    changeAnimation(){

    }

    

    getMapX(){
        let mapX = parseInt(this.x / blockMapSize);
         return mapX;
    }
    getMapY(){
        let mapY=  parseInt(this.Y / blockMapSize);
        return mapY;
    }

    getMapXRightSide(){
        let mapX = parseInt((this.x + 0.99 * blockMapSize) / blockMapSize);
        return mapX;
    }
    getMapYRightSide(){
        let mapY = parseInt((this.y + 0.99 * blockMapSize) / blockMapSize);
        return mapY;
    }    

    changeAnimation() {
        this.currentFrame =
            this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }

    draw(){
        ctx.save();
        ctx.translate(
            this.x + blockMapSize /2,
            this.y + blockMapSize /2);

        //ctx.rotate((this.direction * 90 * Math.PI)/180);

        ctx.translate(
            -this.x - blockMapSize /2,
            -this.y - blockMapSize /2);

        ctx.drawImage(steveFrame,
            (this.currentFrame - 1) * blockMapSize,
            0,
            75,
            320,
            this.x,
            this.y,
            this.width,
            this.height
        );
        ctx.restore();

    }

      
}


