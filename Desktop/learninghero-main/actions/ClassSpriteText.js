
import MarkdownMathCanvas from './MarkdownMathCanvas'

import { Sprite } from './ClassSprite'

class SpriteText extends Sprite {
    constructor(gameCanvas, x, y, text, fontSize, mode) {
        super(gameCanvas, x, y, mode); // Now 'this' is initialized by calling the parent constructor.
        // this.x = x;
        // this.y = y;

        this.computeDraw();

        if (mode) {
            this.mode = mode;
        } else {
            this.mode = "corner"
        }

        this.text = text;
        this.fontSize = fontSize;
        this.backgroundTransparent = true;

        this.length = this.findLength()
        this.gravity = false;

        this.fontColor = 'rgba(72,61,139)';


    }

    draw() {
        if (this.visibility) {
            this.computeDraw();

            this.ctx.globalAlpha = this.opacity;

            // write text
            this.ctx.font = this.font_size_scaled + "px Arial";
            this.ctx.fillStyle = this.fontColor;
            this.ctx.fillText(this.text, this.xPix, this.yPix);

            this.ctx.globalAlpha = 1;

            // // draw area box
            // this.ctx.beginPath()
            // this.ctx.rect(this.left, this.top, this.width, this.height);
            // this.ctx.strokeStyle = "red";
            // this.ctx.lineWidth = "1";
            // this.ctx.stroke();
        }



    }

    computeDraw() {

        this.xPix = this.canvas.width * this.x / 100;
        this.yPix = this.canvas.width * this.gameCanvas.widthToHeightRatio * this.y / 100 + this.gameCanvas.fullScreenY
        if (this.gameCanvas.fullScreen) {
            if (this.gameCanvas.jCanvas.mode == "fullheight") {
                // this.scale = ((this.width/100)*this.canvas.height/this.gameCanvas.widthToHeightRatio) / this.imgList[this.imgIndex].width
                // console.log('fullheight', this.scale)
                // var xPos = (this.x /100) * this.canvas.height/this.gameCanvas.widthToHeightRatio  -  this.imgList[this.imgIndex].width*this.scale/2 + this.gameCanvas.fullScreenX;    
                // var yPos = (this.y /100) * this.canvas.height   -  this.imgList[this.imgIndex].height*this.scale/2 ; 

                // this.xPix = this.canvas.height / this.gameCanvas.widthToHeightRatio * this.x / 100 + this.gameCanvas.fullScreenX;
                // this.yPix = this.canvas.height * this.y / 100;

                this.xPix = this.gameCanvas.jCanvas.width * this.x / 100 + this.gameCanvas.jCanvas.xStart;
                this.yPix = this.gameCanvas.jCanvas.height * this.y / 100;

                // this.ctx.beginPath();
                // this.ctx.fillStyle="red"
                // this.ctx.fillRect(20, 20, this.gameCanvas.canvas.width, this.gameCanvas.canvas.height);
                // this.ctx.stroke();

            }
            else if (this.gameCanvas.jCanvas.mode == "fullwidth") {

                this.xPix = (this.x / 100) * this.gameCanvas.jCanvas.width;
                this.yPix = (this.y / 100) * this.gameCanvas.jCanvas.height + this.gameCanvas.jCanvas.yStart;

            }
        }
        // not in fullscreen mode
        else {
            if ((this.gameCanvas.jCanvas.mode == "xl") || (this.gameCanvas.jCanvas.mode == "lg") || (this.gameCanvas.jCanvas.mode == "sm")) {
                // console.log('hubo')
                this.font_size_scaled = parseInt(this.fontSize * this.gameCanvas.jCanvas.width / 300)
                this.xPix = (this.gameCanvas.jCanvas.width * this.x / 100) + this.gameCanvas.jCanvas.xStart;
                this.yPix = this.gameCanvas.jCanvas.height * this.y / 100;
            }
            if (this.gameCanvas.jCanvas.mode == "xs") {
                this.font_size_scaled = parseInt(this.fontSize * this.gameCanvas.jCanvas.width / 300)
                this.xPix = this.canvas.width * this.x / 100;
                this.yPix = this.canvas.width * this.gameCanvas.widthToHeightRatio * this.y / 100;
            }
        }



        this.font_size_scaled = parseInt(this.fontSize * this.gameCanvas.jCanvas.width / 300)

        if (this.font_size_scaled < 14) {
            this.font_size_scaled = 14;
        }

        if (this.mode == "center") {
            this.xPix = this.xPix - (this.length * this.font_size_scaled * 0.51) / 2
        }

        // console.log('fontyAishu', this.font_size_scaled)

        // figure box dimensions of text
        this.left = this.xPix;
        this.top = this.yPix - this.font_size_scaled * 1 * 1;
        this.width = this.length * this.font_size_scaled * 0.47;
        this.height = 1 * this.font_size_scaled;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;


    }

    findLength() {
        var counter = 0;;
        for (var char of this.text) {
            // console.log("charty", char)
            if ((char == "่") || (char == "้") || (char == "๊") || (char == "๋") || (char == "ิ") || (char == "ี") || (char == "ื") || (char == "็") || (char == "์")) {
                // console.log('ไม้เอก');
            } else {
                counter = counter + 1;
            }
        }
        return counter
    }
}

export {
    SpriteText,
};
