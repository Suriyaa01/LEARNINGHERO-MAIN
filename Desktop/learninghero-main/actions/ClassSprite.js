import { SnippetsFilled } from "@ant-design/icons";

class Sprite {
    constructor(gameCanvas, x,y, width, height, character, backgroundColor, strokeColor) {
        this.character = character;
        this.zIndex = 0;

        this.x = x; // this.x position refers to percentage position in canvas with 1 being 1% x distance
        this.y = y; // this.y position refers to percentage position in canvas with 1 being 1% y distance
        this.theta = 0;

        this.mode = 'center'
        if (this.mode == 'center') {
            this.xPixCenter;
            this.yPixCenter;
        } 
        else if (this.mode == 'corner') {
            this.xPixCorner;
            this.yPixCorner;
        }


        this.xOld=x;
        this.yOld=y;

        this.width = width;
        this.height = height;
        this.widthPercent = width;
        this.heightPercent = height;
        this.heightPix;
        this.widthPix; // width is considered in percentage, 100 is 100% width which will be equal to canvas width
        this.gameCanvas = gameCanvas;
        this.type = 'sprite'

        this.backgroundColor=  backgroundColor;
        this.strokeColor= strokeColor;
        this.strokeWidth=2;

        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;

        this.xVel = 0;
        this.yVel = 0;

        // console.log('spriteChario', gameCanvas)
        this.canvas = gameCanvas.canvas;
        this.ctx = this.canvas.getContext('2d')

        this.imgList = [];
        this.imgIndex = 0;

        this.opacity = 1;
        this.gravity = true;
        this.onGround = false;
        this.clickable = true;
        this.collidable=true;
        this.visibility=true;

        this.draggable = false;
        this.onDragGrab = false;


        // this.genCharacter(this);
        gameCanvas.add(this);

    }

    setDraggable(boolStatus) {
        if (boolStatus) {
            this.draggable = true;
        } else {
            this.draggable = false;
            this.onDragGrab = false;
        }
    }


    show() {
        this.visibility = true;
    }

    hide() {
        this.visibility = false;
    }

    onClickDragHandle(xClick, yClick, event, hitStatus ) {
        if ( hitStatus) {

            if (this.draggable) {
                if (event.type == "mousedown") {
                    this.x = 100* (xClick - this.gameCanvas.jCanvas.xStart)/this.gameCanvas.jCanvas.width
                    this.y = 100*(yClick - this.gameCanvas.jCanvas.yStart)/this.gameCanvas.jCanvas.height
                    this.onDragGrab = true;
                }
                else if (event.type == "mouseup") {
                    this.x = 100*(xClick - this.gameCanvas.jCanvas.xStart)/this.gameCanvas.jCanvas.width
                    this.y = 100*(yClick - this.gameCanvas.jCanvas.yStart)/this.gameCanvas.jCanvas.height       
                    this.onDragGrab = false;
                }
            }
        
        }
        if (this.onDragGrab) {
            this.x = 100*(xClick - this.gameCanvas.jCanvas.xStart)/this.gameCanvas.jCanvas.width
            this.y = 100*(yClick - this.gameCanvas.jCanvas.yStart)/this.gameCanvas.jCanvas.height            
        }
    }


    checkClickCollision( xClick, yClick, event ) {
        // console.log('holy moly')
        var hitStatus = false;
        
        if ( (event.type == "mousedown") || (event.type == "mouseup") ) {
            var ox = (this.left+this.right)/2
            var oy = (this.top+this.bottom)/2

            // LEFT, RIGHT, TOP, BOTTOM
            const x1Array = [this.left, this.right, this.right, this.right]
            const y1Array = [this.bottom, this.bottom, this.top, this.bottom]
            const x2Array = [this.left, this.right, this.left, this.left]
            const y2Array = [this.top, this.top, this.top, this.bottom]

            var crossArray = [];

            var inShapeCount = 0;    
            for (var i in x1Array) {
                var x1 = x1Array[i];
                var y1 = y1Array[i];
                var x2 = x2Array[i];
                var y2 = y2Array[i];
    
                var px = xClick;
                var py = yClick;
    
                var xPseudo1 = x1-ox;
                var yPseudo1 = y1-oy;
                var xPseudo2 = x2-ox;
                var yPseudo2 = y2-oy;
    
                var xRot1 = xPseudo1*Math.cos(this.theta) - yPseudo1*Math.sin(this.theta)
                var yRot1 = xPseudo1*Math.sin(this.theta) + yPseudo1*Math.cos(this.theta)
                var xRot2 = xPseudo2*Math.cos(this.theta) - yPseudo2*Math.sin(this.theta)
                var yRot2 = xPseudo2*Math.sin(this.theta) + yPseudo2*Math.cos(this.theta)
    
                xRot1 = xRot1+ox;
                yRot1 = yRot1+oy;
                xRot2 = xRot2+ox;
                yRot2 = yRot2+oy;
    
                px = px-xRot1;
                py = py-yRot1;
                x2 = xRot2-xRot1;
                y2 = yRot2-yRot1;
    
                var cross = x2*py - y2*px;

                if (i == 0) {
                    if (cross > 0) {
                        inShapeCount = inShapeCount+1;
                    }
                }
                if (i == 1 ) {
                    if (cross < 0) {
                        inShapeCount = inShapeCount+1;
                    }
                }
                if (i == 2 ) {
                    if (cross < 0) {
                        inShapeCount = inShapeCount+1;
                    }
                }
                if (i == 3 ) {
                    if (cross > 0) {
                        inShapeCount = inShapeCount+1;
                    }
                }
            }
            // console.log('inshapecount', inShapeCount)
            

            if (inShapeCount == 4) {
                // console.log('change color')
                // this.backgroundColor = "orange"
                hitStatus = true
            } else {
                // this.backgroundColor = "gray"
                hitStatus = false
            }
        }

        this.onClickDragHandle(xClick,yClick,event, hitStatus)


        return hitStatus
    }

    setBottom(yPixBottom) {
        console.log('set bottom', yPixBottom)
        const yPixel = yPixBottom - this.heightPix/2
        this.y = 100 * yPixel/this.gameCanvas.jCanvas.height
        console.log('heightPix', this.heightPix)
        console.log('this.y', this.y)

        this.positionComputation();
    }

    setPosition( x,y,mode) {
        if (mode == "cornerpix") {
            
            // console.log('leo', this.gameCanvas.jCanvas.xStart)
            this.x = 100*(x-this.gameCanvas.jCanvas.xStart)/this.gameCanvas.jCanvas.width;
            this.y = 100*y/this.gameCanvas.jCanvas.height;

            // console.log('setposx', this.x)
            // console.log('setposy', this.y)
            this.positionComputation();
        }
        if (mode == "center") {
            
            // console.log('leo', this.gameCanvas.jCanvas.xStart)
            this.x = 100*(x-this.gameCanvas.jCanvas.xStart)/this.gameCanvas.jCanvas.width - this.widthPix/2;
            this.y = 100*y/this.gameCanvas.jCanvas.height;


            // console.log('setposx', this.x)
            // console.log('setposy', this.y)
            this.positionComputation();
        }
    }

    positionComputation() {
        // compute the box dimensions in pixels of the sprite
        // box dimension values stored in this.left, this.right, this.top, this.bottom
         
        // console.log(this.x)
        // console.log(this.y)
        // console.log(this.widthPercent)
        // console.log(this.heightPercent)
        // console.log(this.gameCanvas.jCanvas.width)
        // console.log(this.gameCanvas.jCanvas.height)


        if (this.mode == "corner") {
            if (this.gameCanvas.joystickController) {
                if ( (this.gameCanvas.fullScreen ) && (this.gameCanvas.jCanvas.mode=="fullwidth") ) {
                    if (this.gameCanvas.jCanvas.mode=="fullwidth") {
                        var xPos = (this.x/100) * this.gameCanvas.jCanvas.width + this.gameCanvas.jCanvas.xStart 
                        var yPos = (this.y /100) * this.gameCanvas.jCanvas.height +  (this.gameCanvas.canvas.height - this.gameCanvas.canvas.width * this.gameCanvas.widthToHeightRatio)/4;    
                    }
                
                } else {
                 
                    var xPos = (this.x/100) * this.gameCanvas.jCanvas.width + this.gameCanvas.jCanvas.xStart 
                    var yPos = (this.y /100) * this.gameCanvas.jCanvas.height
                }
    
                this.widthPix = (this.widthPercent/100)*this.gameCanvas.jCanvas.width;
                this.heightPix = (this.heightPercent/100)*this.gameCanvas.jCanvas.height;
            } else {
    
                var backgroundHeight = this.gameCanvas.backgroundWidth*this.gameCanvas.widthToHeightRatio;
                var xPos = (this.x/100) * this.gameCanvas.jCanvas.width + this.gameCanvas.jCanvas.xStart;
                var yPos = (this.y /100) * this.gameCanvas.jCanvas.height + this.gameCanvas.jCanvas.yStart;
    
                this.widthPix = (this.widthPercent/100)*this.gameCanvas.jCanvas.width;
                this.heightPix = (this.heightPercent/100)*this.gameCanvas.jCanvas.height;
            }    
        }
        else if ( this.mode == "center") {
            if (this.gameCanvas.joystickController) {
                if ( (this.gameCanvas.fullScreen ) && (this.gameCanvas.jCanvas.mode=="fullwidth") ) {
                    if (this.gameCanvas.jCanvas.mode=="fullwidth") {
                        this.widthPix = this.gameCanvas.jCanvas.width  * this.widthPercent /100;
                        this.heightPix = this.gameCanvas.jCanvas.height  * this.heightPercent /100;
                        var xPos = (this.x/100) * this.gameCanvas.jCanvas.width + this.gameCanvas.jCanvas.xStart - this.widthPix/2;
                        var yPos = (this.y /100) * this.gameCanvas.jCanvas.height +  (this.gameCanvas.canvas.height - this.gameCanvas.canvas.width * this.gameCanvas.widthToHeightRatio)/4 - this.heightPix/2;    
                    }
                
                } else {
                    this.widthPix = this.gameCanvas.jCanvas.width  * this.widthPercent /100;
                    this.heightPix = this.gameCanvas.jCanvas.height  * this.heightPercent /100;
                    var xPos = (this.x/100) * this.gameCanvas.jCanvas.width + this.gameCanvas.jCanvas.xStart - this.widthPix/2;
                    var yPos = (this.y /100) * this.gameCanvas.jCanvas.height - this.heightPix/2;
                }
    

            } else {
                this.widthPix = (this.widthPercent/100)*this.gameCanvas.jCanvas.width;
                this.heightPix = (this.heightPercent/100)*this.gameCanvas.jCanvas.height;

                var backgroundHeight = this.gameCanvas.backgroundWidth*this.gameCanvas.widthToHeightRatio;
                var xPos = (this.x/100) * this.gameCanvas.jCanvas.width + this.gameCanvas.jCanvas.xStart - this.widthPix/2;
                var yPos = (this.y /100) * this.gameCanvas.jCanvas.height + this.gameCanvas.jCanvas.yStart - this.heightPix/2;
    

            }                
        }



        this.left = xPos;
        this.top = yPos;
        this.right = xPos + this.widthPix;
        this.bottom = yPos + this.heightPix;

    }

    setTransparency(transparencyLevel) {
        this.opacity = transparencyLevel;
    }

    draw() {
        
    }

    updateSpriteState() {
        this.xOld = this.x;
        this.yOld = this.y;        
    }

    move(x,y) {
        this.x = x;
        this.y = y;
    }

    onMouseMove(x,y,event) {
        // handle mouse move
    }
}

export {
    Sprite,
};
