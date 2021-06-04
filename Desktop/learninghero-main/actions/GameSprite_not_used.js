import React from "react";
import mathJaxExp from "../pages/course/example/03fractions101-subtraction";

import MarkdownMathCanvas from './MarkdownMathCanvas'

import {SpriteCharacter} from './ClassSpriteCharacter.js'


class Game {
    constructor( canvas, width, height) {
        console.log('game canvas', canvas.current)
        this.height = height;
        this.width = width;
        this.backgroundColor;
        this.canvas = canvas.current;
        this.ctx = this.canvas.getContext("2d");
        this.spriteList = []
        this.grabList = []
        this.fullScreen = false;
        this.fullscreenMode = "";
        this.fullScreenX = 0;
        this.fullScreenY = 0;

        this.widthToHeightRatio=0.8

        this.backgroundImgList = []
        this.backgroundString = "home"
        this.genBackground();

        this.fullScreenSprite = new SpriteCharacter(this, 95, 94, 6, 6, "fullscreen")
        this.fullScreenSprite.gravity=false;

        this.visibility = true;

    }

    show() {
        this.visibility = true;
    }

    hide() {
        this.visibility = false;
    }

    genBackground() {
        if (this.backgroundString == "home") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/StudysabaiEbook-HomeTown1.jpg'
            // img.src = "https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/zombieSoldier.png";
            this.backgroundImgList.push(img)
        }
    }

    refresh() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        

        var x = 0;
        var y = 0;
        var fullscreenMode = ""
        // console.log('pooodle', )
        if (this.fullScreen) {
            this.ctx.fillStyle = "black";

            if ((this.canvas.width*this.widthToHeightRatio) > this.canvas.height) {
                // do black fullscreen padding on the sides
                x = (this.canvas.width-this.canvas.height/this.widthToHeightRatio)/2;       
                this.ctx.fillRect(0, 0, x, this.canvas.height); 
                this.fullscreenMode = "fullheight"
            } else {
                // do black fullscreen padding on top and bottom
                y = (this.canvas.height-this.canvas.width* this.widthToHeightRatio)/2;       
                this.ctx.fillRect(0, 0, this.canvas.width, y);    
                this.fullscreenMode = "fullwidth" 
            }


        }

        if (this.backgroundString="home") {
            if (this.fullScreen) {
                if (this.fullscreenMode == "fullheight") {
                    this.ctx.drawImage(this.backgroundImgList[0], x, y, this.canvas.height/this.widthToHeightRatio, this.canvas.height)                    
                    this.fullScreenX = x;
                    this.fullScreenY = 0;
                    x = x + this.canvas.height/this.widthToHeightRatio;        
                } 
                else if (this.fullscreenMode == "fullwidth") {
                    this.ctx.drawImage(this.backgroundImgList[0], x, y, this.canvas.width, this.canvas.width*this.widthToHeightRatio)  
                    this.fullScreenX = 0;
                    this.fullScreenY = y;
                    y = y+ this.canvas.width * this.widthToHeightRatio;                  
                }
            }
            else {
                this.ctx.drawImage(this.backgroundImgList[0], 0, 0, this.canvas.width, this.canvas.width * this.widthToHeightRatio)
                this.fullScreenX=0
                this.fullScreenY=0
            }
        }
        else if (this.backgroundColor == "blue") {
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // this.ctx.beginPath();
        // this.ctx.arc(100, 75, 5, 0, 2 * Math.PI);
        // this.ctx.stroke();
        // this.ctx.fillStyle="red"
        // this.ctx.fill();

        this.runGravity();
        this.draw();

        // if (this.fullScreen) {
        //     this.ctx.fillStyle = "black";
        //     this.ctx.fillRect(0, y, this.canvas.width, y);     
        // }

        if (this.fullScreen) {
            if (this.fullscreenMode == "fullheight") {
                this.ctx.fillStyle="black"
                this.ctx.fill();   
                this.ctx.fillRect(x, 0, this.fullScreenX, this.canvas.height);    
       
            } 
            else if (this.fullscreenMode == "fullwidth") {  
                this.ctx.fillStyle="black"
                this.ctx.fill();       
                this.ctx.fillRect(0, y, this.canvas.width, this.fullScreenY);              
            }
        }

    }

    add(sprite) {
        this.spriteList.push(sprite)
        console.log('sprite list')
        console.log(this.spriteList)
    }
    
    runGravity() {
        for (var sprite of this.spriteList) {
            // console.log('sprite', sprite)
            // sprite.draw();
            sprite.x = sprite.x + sprite.xVel;
            sprite.y = sprite.y + sprite.yVel;

            if (sprite.gravity) { 
                if (sprite.y < 85 ) {
                    sprite.y = sprite.y + sprite.yVel;
                    sprite.yVel = sprite.yVel + 0.1
                } else {
                    sprite.yVel = 0;
                    sprite.y = 84;
                }
            } 
            // console.log('xVel', sprite.xVel)

        }        
    }

    draw() {
        // console.log('Dari9o', this.spriteList)
 
        for (var sprite of this.spriteList) {
            // console.log('sprite', sprite)
            sprite.draw();
        }
    }

    checkClickCollision(xClick, yClick, event) {
        console.log('jackass')
        var collisionList = []

        for (var sprite of this.spriteList) {
            sprite.checkClickCollision(xClick, yClick, event);
        }

        // // get x and y click position in terms of screen percentage
        // if (this.fullScreen) {
        //     if (this.fullscreenMode=="fullheight") {
        //         var xClickPercent = ( (xClick-this.fullScreenX) / (this.canvas.width-this.fullScreenX-this.fullScreenX) ) * 100
        //         var yClickPercent = ( yClick / this.canvas.height ) * 100
        //     }
        //     else if (this.fullscreenMode=="fullwidth") {
        //         var xClickPercent = (xClick / this.canvas.width) * 100
        //         var yClickPercent = ((yClick-this.fullScreenY) / (this.canvas.height-this.fullScreenY-this.fullScreenY) ) * 100
        //     }
        // } else {
        //     var xClickPercent = (xClick / this.canvas.width) * 100
        //     var yClickPercent = ( yClick / this.canvas.height ) * 100
        // }

        // console.log('xClickPercent', xClickPercent)

        // for (var sprite of this.spriteList) {

        //     console.log('yClickPercent', yClickPercent)
        //     var xHit = false
        //     var yHit = false
        //     if (sprite.type == 'sprite') {
        //         if ( (xClickPercent < sprite.x + sprite.width) && (xClickPercent > sprite.x - sprite.width) ) {
        //             xHit = true;
        //             console.log('x hit')
        //         }
        //         if ( (yClickPercent < sprite.y + sprite.height) && (yClickPercent > sprite.y - sprite.height) ) {
        //             yHit = true;
        //             console.log('y hit')
        //         }
        //         if (xHit && yHit) {
        //             // if (sprite.clickable) {
        //                 collisionList.push(sprite)
        //             // }
        //         }
        //     }

        //     if (sprite.type == 'equation') {
        //         console.log('jamaica')
        //         console.log('equation', sprite.parsedEquation.equation)

        //         var top = sprite.yPix - sprite.font_size*sprite.parsedEquation.height*0.7;
        //         var left = sprite.xPix
        //         var right = sprite.xPix + sprite.parsedEquation.equation.length*sprite.font_size*0.6
        //         var bot = sprite.yPix - sprite.font_size*sprite.parsedEquation.height*0.7 + sprite.parsedEquation.height*sprite.font_size

        //         var xHit = false;
        //         var yHit = false;
        //         if ( (xClickPercent > 100*left/this.canvas.width) && (xClickPercent < 100*right/this.canvas.width) ) {
        //             console.log('eqn x hit')
        //             xHit = true;
        //         }
        //         if ( (yClickPercent > 100*top/this.canvas.height) && (yClickPercent < 100*bot/this.canvas.height) ) {
        //             console.log('eqn y hit')
        //             yHit = true;
        //         }

        //         if (xHit && yHit) {
        //             // if (sprite.clickable) {
        //                 collisionList.push(sprite)
        //             // }
        //         } 
        //         // this.ctx.beginPath();
        //         // this.ctx.moveTo(sprite.x, sprite.y - sprite.font_size*sprite.parsedEquation.height*0.7);
        //         // this.ctx.lineTo(sprite.x + sprite.parsedEquation.equation.length*sprite.font_size*0.6, sprite.y - sprite.font_size*sprite.parsedEquation.height*0.7);
        //         // this.ctx.stroke();

        //         // this.ctx.beginPath();
        //         // this.ctx.moveTo(sprite.x, sprite.y - sprite.font_size*sprite.parsedEquation.height*0.7);
        //         // this.ctx.lineTo(sprite.x, sprite.y - sprite.font_size*sprite.parsedEquation.height*0.7 + sprite.parsedEquation.height*sprite.font_size);
        //         // this.ctx.stroke();
        //     }
            // console.log('spritex', typeof(sprite))
        // }
        console.log(window.clientX)
        return collisionList
    }
}





class SpriteEquation {
    constructor(gameCanvas, x,y, font_size, equation) {
        this.x = x; // this.x position refers to percentage position in canvas with 1 being 1% x distance
        this.y = y; // this.y position refers to percentage position in canvas with 1 being 1% y distance
        this.gameCanvas = gameCanvas;
        this.canvas = gameCanvas.canvas;
        this.ctx = this.canvas.getContext('2d')
        this.type = 'equation'
        this.font_size = font_size;


        this.left;
        this.right;
        this.top;
        this.bottom;

        this.xVel = 0;
        this.yVel = 0;

        // this.xPix = this.canvas.width*this.x/100
        // this.yPix = this.canvas.height*this.y/100
        // calculate the dimensions of equation, left, right top and bottom from the font size



        this.parsedEquation = MarkdownMathCanvas(gameCanvas, equation, this.x, this.y);
        gameCanvas.add(this);

        console.log('baromeu', this)

    }

    draw() {
        // console.log('tusk', this)
        this.xPix = this.canvas.width*this.x/100;
        this.yPix = this.canvas.width*this.gameCanvas.widthToHeightRatio*this.y/100 +  this.gameCanvas.fullScreenY


        if (this.gameCanvas.fullScreen) {
            if (this.gameCanvas.fullscreenMode == "fullheight") {
                // this.scale = ((this.width/100)*this.canvas.height/this.gameCanvas.widthToHeightRatio) / this.imgList[this.imgIndex].width
                // console.log('fullheight', this.scale)
                // var xPos = (this.x /100) * this.canvas.height/this.gameCanvas.widthToHeightRatio  -  this.imgList[this.imgIndex].width*this.scale/2 + this.gameCanvas.fullScreenX;    
                // var yPos = (this.y /100) * this.canvas.height   -  this.imgList[this.imgIndex].height*this.scale/2 ; 
                this.xPix = this.canvas.height/this.gameCanvas.widthToHeightRatio *this.x/100 + this.gameCanvas.fullScreenX;
                this.yPix = this.canvas.height*this.y/100;
            }
            else if (this.gameCanvas.fullscreenMode == "fullwidth") {
                // var xPos = (this.x /100) * this.canvas.width  -  this.imgList[this.imgIndex].width*this.scale/2 ;    
                // var yPos = (this.y /100) * this.canvas.width*this.gameCanvas.widthToHeightRatio   -  this.imgList[this.imgIndex].height*this.scale/2    +  this.gameCanvas.fullScreenY;    
                this.xPix = this.canvas.width*this.x/100;
                this.yPix = this.canvas.width*this.gameCanvas.widthToHeightRatio*this.y/100 +  this.gameCanvas.fullScreenY
            }
        } else {
            this.xPix = this.canvas.width*this.x/100;
            this.yPix = this.canvas.width*this.gameCanvas.widthToHeightRatio*this.y/100;
        }



        // var xPos = (this.x /100) * this.canvas.width  -  this.imgList[this.imgIndex].width*this.scale/2;    
        // var yPos = (this.y /100) * this.canvas.width*this.gameCanvas.widthToHeightRatio   -  this.imgList[this.imgIndex].height*this.scale/2    +  this.gameCanvas.fullScreenY;  

        if (this.gameCanvas.fullScreen) {
            if (this.gameCanvas.fullscreenMode == "fullheight") {
                var font_size = parseInt (this.font_size*(this.canvas.height/this.gameCanvas.widthToHeightRatio) / 750)
            }
            else if (this.gameCanvas.fullscreenMode == "fullwidth") {
                var font_size = parseInt (this.font_size* this.canvas.width / 750)
            }
        } else {
            var font_size = parseInt (this.font_size* this.canvas.width / 750)
        }

        this.parsedEquation.equation.drawRecursion( this.ctx, this.xPix, this.yPix, font_size )
    }

    move(x,y) {
        console.log('move me')
        this.x = x;
        this.y = y;
    }
}

































class SpriteImage {
    constructor(gameCanvas, x,y, height, width, img) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.gameCanvas = gameCanvas;
        this.canvas = gameCanvas.canvas;
        this.ctx = this.canvas.getContext('2d')
        this.img = img;
        this.ogimg = img;
        this.scale = 0.8;

        gameCanvas.add(this)
        this.draw();
    }
    // Getter
    get area() {
        return this.calcArea();
    }
    // Method
    calcArea() {
        return this.height * this.width;
    }

    draw() {
        console.log('draw me: canvas size', this.gameCanvas)
        this.ctx.drawImage(this.img, this.x, this.y, this.img.width * this.scale, this.img.height * this.scale)
    }

    move(x,y) {
        console.log('move me')
        this.x = x;
        this.y = y;
    }

    changeSpriteColorTint( red, gr, bl ) {
        var myImg = this.ctx.getImageData( this.x, this.y, this.imgList[0].width, this.imgList[0].height );
        console.log('pixels')
        console.log(myImg)

        for (var t=0;t< myImg.data.length;t+=4) {     
            if (myImg.data[t+3] == 255) {
                myImg.data[t]= red | myImg.data[t];        
                myImg.data[t+1]= gr | myImg.data[t+1];        
                myImg.data[t+2]= bl | myImg.data[t+2];   
            }   
         }
         this.ctx.putImageData(myImg, this.x, this.y ); // Image data is adjusted according to context   
    }

    revertSpriteColorTint() {
        this.ctx.drawImage(this.ogimg, this.x, this.y, this.ogimg.width * this.scale, this.ogimg.height * this.scale)
    }


}



export {
    SpriteCharacter,
    SpriteImage,
    Game,
    SpriteEquation,
};
