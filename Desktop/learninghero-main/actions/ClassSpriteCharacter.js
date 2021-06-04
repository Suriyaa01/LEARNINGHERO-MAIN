
import { Sprite } from './ClassSprite'


class SpriteCharacter extends Sprite {
    constructor(gameCanvas, x, y, width, height, character) {
        super(gameCanvas, x, y, width, height, character)

        // this.height = height;
        // this.widthPercent = width;
        // this.heightPercent = height;
        // this.width = width; // width is considered in percentage, 100 is 100% width which will be equal to canvas width
        // this.gameCanvas = gameCanvas;
        // this.type = 'sprite'




        this.imgList = [];
        this.imgIndex = 0;

        this.gravity = true;
        if (this.character == "platform") {
            this.gravity = false;
        }
        this.clickable = true;
        this.collidable = true;

        this.visibility = true;

        this.genCharacter(this);
    }

    show() {
        this.visibility = true;
    }

    hide() {
        this.visibility = false;
    }


    genCharacter() {
        if (this.character == "smiley") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/Character-Smiley.png'

            // img.src = "https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/zombieSoldier.png";
            this.imgList.push(img)

            var img2 = new Image();
            img2.crossOrigin = "Anonymous";
            img2.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/Character-Smiley2.png'
            this.imgList.push(img2)
        }
        else if (this.character == "rabbit") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/sprites.png'
            this.imgList.push(img)
        }
        else if (this.character == "fullscreen") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/fullscreen.jpg'
            this.imgList.push(img)
        }
        else if (this.character == "squareSpriteRed") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/SquareSpriteRed.png'
            this.imgList.push(img)
        }
        else if (this.character == "crosssign") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/cross%20sign.png'
            this.imgList.push(img)
        }
        else if (this.character == "sensei") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/sensei.png'
            this.imgList.push(img)
        }
        else if (this.character == "mouseClick") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/mouseClick.png'
            this.imgList.push(img)
        }
    }



    onMouseMove(x, y, event) {

    }

    draw() {



        this.scale = ((this.width / 100) * this.canvas.width) / this.imgList[this.imgIndex].width

        // console.log('dojo', this.game)
        // shifting x and y position so that this.x and this.y repersents the centre location of sprite
        if (this.gameCanvas.fullScreen) {
            if (this.gameCanvas.jCanvas.mode == "fullheight") {
                this.scale = ((this.width / 100) * this.canvas.height / this.gameCanvas.widthToHeightRatio) / this.imgList[this.imgIndex].width
                // console.log('fullheight', this.scale)
                var xPos = (this.x / 100) * this.canvas.height / this.gameCanvas.widthToHeightRatio - this.imgList[this.imgIndex].width * this.scale / 2 + this.gameCanvas.jCanvas.xStart;
                var yPos = (this.y / 100) * this.canvas.height - this.imgList[this.imgIndex].height * this.scale / 2;
            }
            else if (this.gameCanvas.jCanvas.mode == "fullwidth") {
                var xPos = (this.x / 100) * this.gameCanvas.jCanvas.width - this.imgList[this.imgIndex].width * this.scale / 2;
                var yPos = (this.y / 100) * this.gameCanvas.jCanvas.height - this.imgList[this.imgIndex].height * this.scale / 2 + this.gameCanvas.jCanvas.yStart;
            }
        } else {
            var xPos = (this.x / 100) * this.canvas.width - this.imgList[this.imgIndex].width * this.scale / 2;
            var yPos = (this.y / 100) * this.canvas.width * this.gameCanvas.widthToHeightRatio - this.imgList[this.imgIndex].height * this.scale / 2 + this.gameCanvas.fullScreenY;
        }

        if ((this.gameCanvas.jCanvas.mode == "xl") || (this.gameCanvas.jCanvas.mode == "lg") || (this.gameCanvas.jCanvas.mode == "sm")) {

            this.scale = ((this.width / 100) * this.gameCanvas.jCanvas.width) / this.imgList[this.imgIndex].width

            var xPos = (this.x / 100) * this.gameCanvas.jCanvas.width - this.imgList[this.imgIndex].width * this.scale / 2 + this.gameCanvas.jCanvas.xStart;
            var yPos = (this.y / 100) * this.gameCanvas.jCanvas.width * this.gameCanvas.widthToHeightRatio - this.imgList[this.imgIndex].height * this.scale / 2;

        }
        else if (this.gameCanvas.jCanvas.mode == "xs") {
            this.scale = ((this.width / 100) * this.gameCanvas.jCanvas.width) / this.imgList[this.imgIndex].width

            var xPos = (this.x / 100) * this.gameCanvas.jCanvas.width - this.imgList[this.imgIndex].width * this.scale / 2 + this.gameCanvas.jCanvas.xStart;
            var yPos = (this.y / 100) * this.gameCanvas.jCanvas.width * this.gameCanvas.widthToHeightRatio - this.imgList[this.imgIndex].height * this.scale / 2;
        }



        var width = this.imgList[this.imgIndex].width * this.scale;
        var height = this.imgList[this.imgIndex].height * this.scale;

        this.left = xPos;
        this.top = yPos;
        this.right = xPos + width;
        this.bottom = yPos + height;

        this.widthPix = width
        this.heightPix = height

        
        // if (this.theta == 0) {
        //     this.ctx.drawImage(this.imgList[this.imgIndex], xPos, yPos, width, height);
        // } else {
            this.ctx.translate(xPos+width/2, yPos+height/2);
            this.ctx.rotate(this.theta);
            this.ctx.drawImage(this.imgList[this.imgIndex], -width/2, -height/2, width, height);
            this.ctx.rotate(-this.theta);
            this.ctx.translate(-xPos-width/2, - yPos-height/2);
        // }




    }

}

export {
    SpriteCharacter,
};
