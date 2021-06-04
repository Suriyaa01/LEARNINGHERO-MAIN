import { Sprite } from './ClassSprite'
import { SpriteDrawing } from './ClassSpriteDrawing'

class SpritePlatform extends SpriteDrawing{
    constructor(gameCanvas, x,y, width, height, character, backgroundColor, strokeColor) {
        super(gameCanvas, x, y, width, height, character, backgroundColor, strokeColor)

        this.type = "platform"
        this.mode = "corner";


        this.x = x; // this.x position refers to percentage position in canvas with 1 being 1% x distance
        this.y = y; // this.y position refers to percentage position in canvas with 1 being 1% y distance

        this.gravity = false;
        this.collidible = true;

        gameCanvas.add(this);
    }


}

export {
    SpritePlatform,
};



































// class SpriteCharacter {
//     constructor(gameCanvas, x,y, width, height, character) {
//         this.x = x; // this.x position refers to percentage position in canvas with 1 being 1% x distance
//         this.y = y; // this.y position refers to percentage position in canvas with 1 being 1% y distance

//         this.xOld=x;
//         this.yOld=y;

//         this.height = height;
//         this.widthPercent = width;
//         this.heightPercent = height;
//         this.width = width; // width is considered in percentage, 100 is 100% width which will be equal to canvas width
//         this.gameCanvas = gameCanvas;
//         this.type = 'sprite'

//         this.backgroundColor=  'rgba(0, 0, 0, 0)';
//         this.strokeColor= 'rgba(0, 0, 0, 0)';
//         this.strokeWidth=2;

//         this.left = 0;
//         this.top = 0;
//         this.right = 0;
//         this.bottom = 0;

//         this.xVel = 0;
//         this.yVel = 0;

//         console.log('spriteChario', gameCanvas)
//         this.canvas = gameCanvas.canvas;
//         this.ctx = this.canvas.getContext('2d')
//         this.character = character;

//         this.imgList = [];
//         this.imgIndex = 0;

//         this.gravity = true;
//         if (this.character == "platform") {
//             this.gravity = false;
//         }
//         this.clickable = true;
//         this.collidable=true;

//         this.visibility=true;

//         this.genCharacter(this);
//         gameCanvas.add(this);
//     }

//     show() {
//         this.visibility = true;
//     }

//     hide() {
//         this.visibility = false;
//     }


//     genCharacter() {
//         if (this.character == "smiley") {
//             var img = new Image();
//             img.crossOrigin = "Anonymous";
//             img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/Character-Smiley.png'

//             // img.src = "https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/zombieSoldier.png";
//             this.imgList.push(img)

//             var img2 = new Image();
//             img2.crossOrigin = "Anonymous";
//             img2.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/Character-Smiley2.png'
//             this.imgList.push(img2)
//         }
//         else if (this.character == "rabbit") {
//             var img = new Image();
//             img.crossOrigin = "Anonymous";
//             img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/sprites.png'
//             this.imgList.push(img)
//         }
//         else if (this.character == "fullscreen") {
//             var img = new Image();
//             img.crossOrigin = "Anonymous";
//             img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/fullscreen.jpg'
//             this.imgList.push(img)            
//         }
//         else if (this.character == "squareSpriteRed") {
//             var img = new Image();
//             img.crossOrigin = "Anonymous";
//             img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/SquareSpriteRed.png'
//             this.imgList.push(img)            
//         }
//         else if (this.character == "crosssign") {
//             var img = new Image();
//             img.crossOrigin = "Anonymous";
//             img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/cross%20sign.png'
//             this.imgList.push(img)                   
//         }
//     }

//     checkClickCollision( xClick, yClick, event ) {
//         console.log('holy moly')
//         var result = false;
//         if ( (xClick > this.left) && (xClick < this.right) ) {
//             if ( (yClick > this.top) && (yClick < this.bottom) ) {
//                 console.log('!!!!!!!!_______!!!!!!!!!!', this.character)

//                 if (event.type == "mouseup") {
//                     if (this.character == "fullscreen") {
//                         if (!this.gameCanvas.fullScreen) {
//                             this.gameCanvas.fullScreen = true;
//                         } else {
//                             this.gameCanvas.fullScreen = false;
//                         }
//                     } else {
//                         result = true;
//                     }
//                 }
//             }
//         }
//         return result

//     }

//     onMouseMove(x,y,event) {

//     }

//     draw() {

//         if (this.character != "platform") {
//             this.imgIndex = 0;
//             // console.log()
//             // console.log('imgWidth', this.imgList[this.imgIndex].width )
//             // console.log('set width', this.width)
//             this.scale = ((this.width/100)*this.canvas.width) / this.imgList[this.imgIndex].width
    
//             // console.log('dojo', this.game)
//             // shifting x and y position so that this.x and this.y repersents the centre location of sprite
//             if (this.gameCanvas.fullScreen) {
//                 if (this.gameCanvas.fullscreenMode == "fullheight") {
//                     this.scale = ((this.width/100)*this.canvas.height/this.gameCanvas.widthToHeightRatio) / this.imgList[this.imgIndex].width
//                     // console.log('fullheight', this.scale)
//                     var xPos = (this.x /100) * this.canvas.height/this.gameCanvas.widthToHeightRatio  -  this.imgList[this.imgIndex].width*this.scale/2 + this.gameCanvas.fullScreenX;    
//                     var yPos = (this.y /100) * this.canvas.height   -  this.imgList[this.imgIndex].height*this.scale/2 ; 
//                 }
//                 else if (this.gameCanvas.fullscreenMode == "fullwidth") {
//                     var xPos = (this.x /100) * this.canvas.width  -  this.imgList[this.imgIndex].width*this.scale/2 ;    
//                     var yPos = (this.y /100) * this.canvas.width*this.gameCanvas.widthToHeightRatio   -  this.imgList[this.imgIndex].height*this.scale/2    +  this.gameCanvas.fullScreenY;    
//                 }
//             } else {
//                 var xPos = (this.x /100) * this.canvas.width  -  this.imgList[this.imgIndex].width*this.scale/2 ;    
//                 var yPos = (this.y /100) * this.canvas.width*this.gameCanvas.widthToHeightRatio   -  this.imgList[this.imgIndex].height*this.scale/2    +  this.gameCanvas.fullScreenY;      
//             }
    
//             if ( (this.gameCanvas.jCanvas.mode == "xl") || (this.gameCanvas.jCanvas.mode == "lg") || (this.gameCanvas.jCanvas.mode == "sm") ) {
    
//                 this.scale = ((this.width/100)*this.gameCanvas.jCanvas.width) / this.imgList[this.imgIndex].width
    
//                 var xPos = (this.x /100) * this.gameCanvas.jCanvas.width  -  this.imgList[this.imgIndex].width*this.scale/2  +  this.gameCanvas.jCanvas.xStart;    
//                 var yPos = (this.y /100) * this.gameCanvas.jCanvas.width*this.gameCanvas.widthToHeightRatio   -  this.imgList[this.imgIndex].height*this.scale/2;      
             
//             }
//             else if (this.gameCanvas.jCanvas.mode == "xs") {
//                 this.scale = ((this.width/100)*this.gameCanvas.jCanvas.width) / this.imgList[this.imgIndex].width
    
//                 var xPos = (this.x /100) * this.gameCanvas.jCanvas.width  -  this.imgList[this.imgIndex].width*this.scale/2  +  this.gameCanvas.jCanvas.xStart;    
//                 var yPos = (this.y /100) * this.gameCanvas.jCanvas.width*this.gameCanvas.widthToHeightRatio   -  this.imgList[this.imgIndex].height*this.scale/2; 
//             } 
    
    
    
//             var width =  this.imgList[this.imgIndex].width * this.scale;
//             var height = this.imgList[this.imgIndex].height * this.scale;
    
//             this.left = xPos;
//             this.top = yPos;
//             this.right = xPos + width;
//             this.bottom = yPos + height;
    
//             this.ctx.drawImage(this.imgList[this.imgIndex], xPos, yPos, width, height);
//         }

//         // Draw platform if character type is = to 'platform'
//         else {
//             this.ctx.fillStyle = "blue"

//             var xPos = (this.x/100) * this.gameCanvas.jCanvas.width + this.gameCanvas.jCanvas.xStart 
//             var yPos = (this.y /100) * this.gameCanvas.jCanvas.height
            
//             if ( (this.gameCanvas.fullScreen ) && (this.gameCanvas.jCanvas.mode=="fullwidth") ) {
//                 var xPos = (this.x/100) * this.gameCanvas.jCanvas.width + this.gameCanvas.jCanvas.xStart 
//                 var yPos = (this.y /100) * this.gameCanvas.jCanvas.height +  (this.gameCanvas.canvas.height - this.gameCanvas.canvas.width * this.gameCanvas.widthToHeightRatio)/4;
               

//             }

//             this.width = (this.widthPercent/100)*this.gameCanvas.jCanvas.width;
//             this.height = (this.heightPercent/100)*this.gameCanvas.jCanvas.height;

//             // console.log( 'heima', this.y )

//             // console.log("jcanvasHeight", this.gameCanvas.jCanvas.height)

            
//             this.left = xPos;
//             this.top = yPos;
//             this.right = xPos + this.width;
//             this.bottom = yPos + this.height;

//             // this.ctx.globalAlpha = 0.2;

//             this.ctx.fillStyle=this.backgroundColor;
//             this.ctx.strokeStyle = this.strokeColor;
//             this.ctx.strokeRect( xPos, yPos, this.width, this.height);
//             this.ctx.fillRect(xPos, yPos, this.width, this.height)
//             this.ctx.globalAlpha = 1;
//         }

//         // if (this.character == "smiley") {
//         //     this.ctx.drawImage(this.imgList[this.imgIndex], xPos, yPos, this.imgList[this.imgIndex].width * this.scale, this.imgList[this.imgIndex].height * this.scale)
//         // }

//         // if (this.character =="rabbit") { // this rabbit comes from a sprite sheet
//         //     this.ctx.drawImage(this.imgList[this.imgIndex], 0,0,200,200, xPos, yPos, this.imgList[this.imgIndex].width/2 * this.scale, this.imgList[this.imgIndex].height/2 * this.scale)
//         // } else {
//         //     this.ctx.drawImage(this.imgList[this.imgIndex], xPos, yPos, this.imgList[this.imgIndex].width * this.scale, this.imgList[this.imgIndex].height * this.scale)
//         // }
//     }

//     updateSpriteState() {
//         this.xOld = this.x;
//         this.yOld = this.y;        
//     }

//     move(x,y) {
//         // console.log('move me')
//         this.x = x;
//         this.y = y;
//     }
// }

// export {
//     SpriteCharacter,
// };
