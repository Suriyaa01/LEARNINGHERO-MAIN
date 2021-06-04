
class GameJoystick {
    constructor(gameCanvas, controlledSprite=0 ) {
        this.gameCanvas = gameCanvas;
        this.scale = 0;
        this.canvas = this.gameCanvas.canvas
        this.ctx = this.canvas.getContext('2d')
        
        this.type = "joystick";
        this.character = "joystick";

        this.controlledSprite = controlledSprite

        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/Joystick-Dir-Pad.png'

        this.imgJoypad = img;

        img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/Joystick%20Buttons.png'

        this.imgButtons = img;

        this.xs_y_offset = 100;
        this.xs_x_offset = 70;

        this.yPosCenterJ = 0;
        this.xPosCenterJ = 0;

        this.yPosCenterB = 0;
        this.xPosCenterB = 0;

        this.x=0;
        this.y=0;
        this.xOld=0;
        this.yOld=0;

        this.state = {
            up: false,
            down: false,
            left: false,
            right: false,
            a: false,
            b: false,
            c: false,
            d: false,
        }

        // activate joystick in main game
        this.gameCanvas.add(this)
        this.gameCanvas.joystickController = true;

        this.spriteInScene = this.checkSpriteInScene();

        this.opacity = 1;

    }

    checkSpriteInScene() {
        var spritesInScene = this.gameCanvas.sceneList[this.gameCanvas.sceneIndex].spriteList;
        var res = spritesInScene.filter( sprite => sprite.id == 'hero')
        if (res.length > 0) {
            // console.log('IN SCENE');
            return true
        } else {
            // console.log('NOT IN SCENE');
            return false
        }
        // console.log( 'sprite in scene', spritesInScene);
    }

    checkClickCollision(xClick, yClick,event) {

        this.spriteInScene = this.checkSpriteInScene();

        if (this.spriteInScene) {
            // console.log('click clack', event.type)
            var xDisp = xClick  - this.xPosCenterJ;
            var yDisp = yClick - this.yPosCenterJ; 
            this.checkJoystickPadCollision(xDisp, yDisp, event)
    
            xDisp = xClick  - this.xPosCenterB;
            yDisp = yClick- this.yPosCenterB;   
    
            this.checkButtonPadCollision(xDisp, yDisp, event);
        } else {
            // reset joystick states
            this.state.a = false;
            this.state.b = false;
            this.state.c = false;
            this.state.d = false;
            this.state.up = false;
            this.state.down = false;
            this.state.left = false;
            this.state.right = false;
        }

    }

    checkTouchCollision(touches,event) {

        this.spriteInScene = this.checkSpriteInScene();

        if (this.spriteInScene) {
            if (event.type == "touchend") {
                if (touches.length == 0) {
                    this.controlledSprite.xVel = 0;
                }
            }
    
            // loop through touches and find ones which hits the joystick direction pad
            for (var touch of touches) {
                var xClick = touch.clientX - event.target.getBoundingClientRect().left
                var yClick = touch.clientY - event.target.getBoundingClientRect().top
                
                var xDisp = xClick  - this.xPosCenterJ;
                var yDisp = yClick - this.yPosCenterJ; 
    
                this.checkJoystickPadCollision(xDisp,yDisp, event);
    
    
                xDisp = xClick  - this.xPosCenterB;
                yDisp = yClick- this.yPosCenterB;   
    
                this.checkButtonPadCollision(xDisp,yDisp, event);
            }
        }

    }


    checkJoystickPadCollision(xDisp, yDisp, event) {
        // Treat xDisp and yDisp and displacement along x and y component 
        // of point click measured from the center of joystick pad.

        var radial = Math.sqrt( xDisp*xDisp + yDisp*yDisp )
        var radialLimit = this.imgJoypad.width*this.scale/2

        // console.log('bazoo', event.type)
        // console.log('radial', radial)
        // console.log('radial limit', radialLimit)
        if (radial < radialLimit ) {
            // console.log( 'joypad collision', event )
            // console.log( 'XXX Disp', xDisp )
            if ( (event.type == "touchstart") || (event.type == "click")  || (event.type == "mousedown") ) {
                if (xDisp > radialLimit/3 ) {
                    // console.log('move right')
                    this.controlledSprite.xVel = 0.5;
                    this.state.right = true;
                } 
                else if (xDisp < -radialLimit/3) {
                    // console.log('move left')
                    this.controlledSprite.xVel = -0.5;
                    this.state.left = true;
                }
                else if (yDisp > radialLimit/3) {
                    this.state.up = true;
                    // console.log('move up')

                }
                else if (yDisp < -radialLimit/3) {
                    this.state.down = true;
                    // console.log('move down')

                }
            }
            else if ( (event.type == "mouseup")  ) {
                this.controlledSprite.xVel = 0;
                this.state.left = false;
                this.state.right = false;
            }
        }
        // if (event.type == "touchend") {
        //     this.controlledSprite.xVel = 0;
        // }
    }

    checkButtonPadCollision(xDisp, yDisp, event) {
        // Treat xDisp and yDisp and displacement along x and y component 
        // of point click measured from the center of button pad.

        var radial = Math.sqrt( xDisp*xDisp + yDisp*yDisp )
        var radialLimit = this.imgJoypad.width*this.scale/2


        if ( (event.type == "mouseup") || (event.type == "touchend") ) {
            this.state.a = false;
            this.state.b = false;
            this.state.c = false;
            this.state.d = false;
        }
        
        // console.log('radial', yDisp)
        // console.log('radial limit', radialLimit)

        if ( (event.type == "mousedown") || (event.type == "touchstart") ) {
            if (radial < radialLimit ) {
                if ( (xDisp > radialLimit/3 ) && ( yDisp < radialLimit/3) && (yDisp > -radialLimit/3) ) {
                    // console.log('hit right button')
                    this.state.c = true;

                    if (  this.controlledSprite.onGround ) {
                        this.controlledSprite.yVel = - 2
                    }
                    this.controlledSprite.onGround = false;

                } 
                else if ( (xDisp < -radialLimit/3)  && ( yDisp < radialLimit/3) && (yDisp > -radialLimit/3) ) {
                    this.state.a = true;

                    // console.log('hit left button')
                    if (  this.controlledSprite.onGround ) {
                        this.controlledSprite.yVel = - 2
                    }
                    this.controlledSprite.onGround = false;

                }
                else if ( (yDisp < -radialLimit/3)  && ( xDisp < radialLimit/3) && (xDisp > -radialLimit/3) ) {
                    this.state.b = true;

                    // console.log('hit top button')
                    if ( this.controlledSprite.onGround ) {
                        this.controlledSprite.yVel = - 2
                    }
                    this.controlledSprite.onGround = false;

                }
                else if ( (yDisp > radialLimit/3)  && ( xDisp < radialLimit/3) && (xDisp > -radialLimit/3) ) {
                    this.state.d = true;
                    if ( this.controlledSprite.onGround ){
                        this.controlledSprite.yVel = - 2
                    }
                    this.controlledSprite.onGround = false;

                    console.log('hit bottom button', this.controlledSprite.yVel)

                }
            }
        }

        // console.log('STATE C', this.state.c)


    }

    draw() {

        this.ctx.globalAlpha = this.opacity;

        this.scale = 0.5;

        if (this.gameCanvas.jCanvas.mode == "xl") {
            // console.log('xl')
            this.scale = 0.7;

            var xPosJ = this.gameCanvas.jCanvas.xStart / 2 - this.imgJoypad.height * this.scale / 2;
            var yPosJ = this.gameCanvas.jCanvas.yStart + this.canvas.height / 2 - this.imgJoypad.height * this.scale / 2;

            var xPosB = this.canvas.width - this.gameCanvas.jCanvas.xStart / 2 - this.imgJoypad.height * this.scale / 2;
            var yPosB = this.gameCanvas.jCanvas.yStart + this.canvas.height / 2 - this.imgJoypad.height * this.scale / 2;
        }
        if ((this.gameCanvas.jCanvas.mode == "sm") || (this.gameCanvas.jCanvas.mode == "lg") || (this.gameCanvas.jCanvas.mode == "fullheight")  ) {
            if (this.canvas.width > 1500 ) {
                this.scale = 1;
            } else {
                this.scale = 0.5;
            }


            var xPosJ = this.gameCanvas.jCanvas.xStart / 2 - this.imgJoypad.height * this.scale / 2;
            var yPosJ = this.gameCanvas.jCanvas.yStart + this.canvas.height / 2 - this.imgJoypad.height * this.scale / 2;

            var xPosB = this.canvas.width - this.gameCanvas.jCanvas.xStart / 2 - this.imgJoypad.height * this.scale / 2;
            var yPosB = this.gameCanvas.jCanvas.yStart + this.canvas.height / 2 - this.imgJoypad.height * this.scale / 2;
        }
        if (this.gameCanvas.jCanvas.mode == "xs") {
            this.scale = 0.5;

            var xPosJ = this.gameCanvas.jCanvas.xStart + this.xs_x_offset - this.imgJoypad.height * this.scale / 2;
            var yPosJ = this.gameCanvas.jCanvas.yStart + this.xs_y_offset - this.imgJoypad.height * this.scale / 2;

            var xPosB = this.canvas.width - this.xs_x_offset - this.imgJoypad.height * this.scale / 2;
            var yPosB = this.gameCanvas.jCanvas.yStart + this.xs_y_offset - this.imgJoypad.height * this.scale / 2;
        }


        if (this.gameCanvas.jCanvas.mode == "fullwidth") {
            // console.log('caramacho')
            var xPosJ = this.gameCanvas.jCanvas.xStart + this.xs_x_offset - this.imgJoypad.height * this.scale / 2;
            var yPosJ =  this.gameCanvas.jCanvas.yStart + this.gameCanvas.jCanvas.height + (this.canvas.height-this.gameCanvas.jCanvas.yStart-this.gameCanvas.jCanvas.height)/2  - this.imgJoypad.height * this.scale / 2;       
            
            var xPosB = this.canvas.width - this.xs_x_offset - this.imgJoypad.height * this.scale / 2;
            var yPosB = yPosJ; 
        }

        this.yPosCenterJ = yPosJ+ (this.imgJoypad.height*this.scale)/2;
        this.xPosCenterJ = xPosJ+ (this.imgJoypad.width*this.scale)/2;

        this.yPosCenterB = yPosB+ (this.imgButtons.height*this.scale)/2;;
        this.xPosCenterB = xPosB+ (this.imgButtons.width*this.scale)/2;


        // var xPos = this.jCanvas.xStart + 100;
        // var yPos = this.jCanvas.yStart;

        // console.log('dinsy', this.xPosJ);

        this.ctx.drawImage(this.imgJoypad, xPosJ, yPosJ, this.imgJoypad.width * this.scale, this.imgJoypad.height * this.scale)
        this.ctx.drawImage(this.imgButtons, xPosB, yPosB, this.imgJoypad.width * this.scale, this.imgJoypad.height * this.scale)

    }

    onMouseMove(x,y,event) {

    }

    updateSpriteState() {
        this.xOld = this.x;
        this.yOld = this.y;        
    }
}

export {
    GameJoystick,
};
