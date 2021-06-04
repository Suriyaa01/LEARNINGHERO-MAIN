import { SpriteText } from './ClassSpriteText'
import MarkdownMathCanvas from './MarkdownMathCanvas'

class SpriteEquation extends SpriteText{
    constructor(gameCanvas, x, y, equation, font_size) {
        super(gameCanvas, x, y, equation, font_size)
        this.x = x; // this.x position refers to percentage position in canvas with 1 being 1% x distance
        this.y = y; // this.y position refers to percentage position in canvas with 1 being 1% y distance
        this.xOld = x;
        this.yOld = y;

        this.gameCanvas = gameCanvas;
        this.canvas = gameCanvas.canvas;
        this.ctx = this.canvas.getContext('2d')

        this.type = 'equation'
        this.character = 'equation'

        this.fontSize = font_size;
        this.font_size_scaled = 0;


        this.left;
        this.right;
        this.top;
        this.bottom;
        this.width;
        this.height;

        this.xVel = 0;
        this.yVel = 0;

        this.collidable = false;
        this.visibility = true;
        this.opacity = 1;




        this.parsedEquation = MarkdownMathCanvas(gameCanvas, equation, this.x, this.y);

        gameCanvas.add(this);



    }

    checkClickCollision(xClick, yClick, event) {
        var result = false;
        if (event.type == "mouseup") {
            if ((xClick > this.left) && (xClick < this.right)) {
                if ((yClick > this.top) && (yClick < this.bottom)) {
                    result = true;
                }
            }
        }

        return result
    }

    draw() {
        // console.log('tusk', this)
        
        this.xPix = this.canvas.width * this.x / 100;
        this.yPix = this.canvas.width * this.gameCanvas.widthToHeightRatio * this.y / 100 + this.gameCanvas.fullScreenY


        if (this.gameCanvas.fullScreen) {
            if (this.gameCanvas.jCanvas.mode == "fullheight") {
                // this.scale = ((this.width/100)*this.canvas.height/this.gameCanvas.widthToHeightRatio) / this.imgList[this.imgIndex].width
                // console.log('fullheight', this.scale)
                // var xPos = (this.x /100) * this.canvas.height/this.gameCanvas.widthToHeightRatio  -  this.imgList[this.imgIndex].width*this.scale/2 + this.gameCanvas.fullScreenX;    
                // var yPos = (this.y /100) * this.canvas.height   -  this.imgList[this.imgIndex].height*this.scale/2 ; 
                this.xPix = this.canvas.height / this.gameCanvas.widthToHeightRatio * this.x / 100 + this.gameCanvas.jCanvas.xStart;
                this.yPix = this.canvas.height * this.y / 100;
            }
            else if (this.gameCanvas.jCanvas.mode == "fullwidth") {
                // var xPos = (this.x /100) * this.canvas.width  -  this.imgList[this.imgIndex].width*this.scale/2 ;    
                // var yPos = (this.y /100) * this.canvas.width*this.gameCanvas.widthToHeightRatio   -  this.imgList[this.imgIndex].height*this.scale/2    +  this.gameCanvas.fullScreenY;    
                this.xPix = this.canvas.width * this.x / 100;
                this.yPix = this.canvas.width * this.gameCanvas.widthToHeightRatio * this.y / 100 + this.gameCanvas.jCanvas.yStart;
            }
        }
        // not in fullscreen mode
        else {
            if ((this.gameCanvas.jCanvas.mode == "xl") || (this.gameCanvas.jCanvas.mode == "lg") || (this.gameCanvas.jCanvas.mode == "sm")) {
                this.xPix = ((this.canvas.width - this.gameCanvas.jCanvas.xStart * 2) * this.x / 100) + this.gameCanvas.jCanvas.xStart
                this.yPix = (this.canvas.width - this.gameCanvas.jCanvas.xStart * 2) * this.gameCanvas.widthToHeightRatio * this.y / 100;
            }
            if (this.gameCanvas.jCanvas.mode == "xs") {
                // this.font_size_scaled = parseInt(this.font_size_default * this.canvas.width / 750)
                this.xPix = this.canvas.width * this.x / 100;
                this.yPix = this.canvas.width * this.gameCanvas.widthToHeightRatio * this.y / 100;
            }

        }

        this.font_size_scaled = parseInt(this.fontSize * this.gameCanvas.jCanvas.width / 300)
        if (this.font_size_scaled < 14) {
            this.font_size_scaled = 14;
        }

        this.bottom = this.top + this.height;
        this.right = this.left + this.width;

        if (this.visibility) {
            this.ctx.fillStyle = this.fontColor;
            this.ctx.strokeStyle = this.fontColor;

            // If equation exists
            if (this.parsedEquation.equation.child.length > 0) {

                // since equation and normal text have different lenghts 0.6 vs 0.51 scaling gain for normal text
                this.left = this.xPix;
                this.top = this.yPix - this.font_size_scaled * this.parsedEquation.height * 0.7;
                this.widthPix = this.parsedEquation.equation.length * this.font_size_scaled * 0.6;
                this.heightPix = this.parsedEquation.height * this.font_size_scaled;

                this.parsedEquation.equation.drawRecursion(this.ctx, this.xPix, this.yPix, this.font_size_scaled)

                // this.ctx.beginPath();
                // this.ctx.rect(this.left, this.top, this.widthPix, this.heightPix);
                // this.ctx.stroke();
            }
            // If just text (no equation), ie. no child 
            else {


                this.ctx.font = this.font_size_scaled + "px Arial";
                this.ctx.fillText(this.parsedEquation.equation.expression, this.xPix, this.yPix);


                this.left = this.xPix;
                this.top = this.yPix - this.font_size_scaled * this.parsedEquation.height * 0.7;
                this.widthPix = this.parsedEquation.equation.expression.length * this.font_size_scaled * 0.6;
                this.heightPix = this.parsedEquation.height * this.font_size_scaled;
                this.right = this.left + this.width;
                this.bottom = this.top + this.height;

                // this.ctx.strokeStyle="red"
                // this.ctx.beginPath();
                // this.ctx.rect(this.left, this.top, this.widthPix, this.heightPix);
                // this.ctx.stroke();
            }
        }

    }
    

    move(x, y) {
        // console.log('move me')
        this.x = x;
        this.y = y;
    }

    updateSpriteState() {
        this.xOld = this.x;
        this.yOld = this.y;
    }

    hide() {
        this.visibility = false;
    }

    show() {
        this.visibility = true;
    }

    onMouseMove(x,y,event) {

    }

    setPositionAnchor(x, y, mode) {
        if (mode == "center") {
            var xCen = x;
            var yCen = y;

            var widthPixels = this.right - this.left
            var widthPercent = (this.right - this.left) / this.gameCanvas.jCanvas.width
            this.x = xCen - widthPercent * 100 / 2

            // console.log('anchor', this.x)
            // console.log('anchor1', this.parsedEquation.equation.expression.length)

            // need a custom lenght counter algorithm for thai language that also takes into account the สระ

        }
    }
}

export {
    SpriteEquation,
};
