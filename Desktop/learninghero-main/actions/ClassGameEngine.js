import React from "react";
import mathJaxExp from "../pages/course/example/03fractions101-subtraction";


import { GameJoystick } from './ClassGameJoystick';
import { SpriteCharacter } from './ClassSpriteCharacter';
import { SpriteDrawing } from './ClassSpriteDrawing';
import { SpritePlatform } from './ClassSpritePlatform';

import { SpriteEquation } from './ClassSpriteEquation';
import { SpriteTextScrollBox } from './ClassSpriteTextScrollBox';
import { SpriteText } from './ClassSpriteText';


class Game {
    constructor(canvas, width, height, backgroundString="none") {
        // console.log('game canvas', canvas.current)
        this.height = height;
        this.width = width;
        this.backgroundColor;
        this.canvas = canvas.current;
        this.ctx = this.canvas.getContext("2d");
        this.spriteList = []
        this.grabList = []


        this.widthToHeightRatio = 0.8

        this.backgroundWidth = 0;
        this.backgroundHeight = 0;

        this.backgroundImg;
        this.backgroundImgIndex=0;
        this.backgroundImgList = []
        this.backgroundString = backgroundString;
        this.genBackground(backgroundString);

        // Full screen variables
        this.fullScreen = false;
        this.fullscreenMode = "";
        this.fullScreenX = 0;
        this.fullScreenY = 0;
        this.fullScreenClickTime = 0;

        // Create full screen sprite
        this.fullScreenSprite = new SpriteCharacter(this, 95, 94, 6, 6, "fullscreen")
        this.fullScreenSprite.gravity = false;

        // create joystick canvas variables
        this.joystickController = false;
        this.jCanvas = {
            mode: "",
            xStart: 0,
            yStart: 0,
        }

        this.sceneList = [];
        this.sceneIndex = 0;
        var scene = {
            number: 0,
            backgroundString: this.backgroundString,
            spriteList: this.spriteList,
        }
        this.sceneList.push(scene)

        this.clickCollisionList = [];

        // // add start (play) game icon, user shall click to start game
        // this.startGame = false;
        // this.startGameIcon = new SpriteDrawing(this, 50,50, 20, 20, "fontawesome_caret-square-right", 'rgba(52, 152, 219, 1)', "gray")
        // this.startGameIcon.id = 'startGameIcon'
        // this.spriteList.push(this.startGameIcon);

        // this.endGame = false;
        // this.restartGameIcon = new SpriteDrawing(this, 50,50, 20, 20, "fontawesome_redo-alt", 'rgba(52, 152, 219, 1)', "gray")
        // this.restartGameIcon.id = 'restartGameIcon'
        // this.spriteList.push(this.restartGameIcon);
    
    }

    getScene() {
        return this.sceneIndex
    }

    setSceneNumber(sceneNumber) {
        this.sceneIndex = sceneNumber;
    }

    addScene( backgroundString ) {   
        var scene = {
            number: this.sceneList[ this.sceneList.length-1 ].number + 1,
            backgroundString: backgroundString,
            spriteList: [this.fullScreenSprite],
        }
        this.sceneList.push(scene)

        // only add background if currently there are no duplicates
        var duplicateBackground = this.backgroundImgList.filter( background => background.string == backgroundString)
        if (duplicateBackground.length == 0) {
            this.addBackground(backgroundString)
        }
        // console.log('sceneList', this.sceneList)
    }

    addBackground(backgroundString) {
        this.genBackground(backgroundString);
    }

    loadJoystick() {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/Joystick-Dir-Pad.png'
        this.joystickDirPadImg = img;
    }

    genBackground(backgroundString) {
        if (backgroundString == "home") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/StudysabaiEbook-HomeTown1.jpg'
            // img.src = "https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/zombieSoldier.png";
            
            var background = {
                string: backgroundString,
                img: img,
            }
            this.backgroundImgList.push(background)
        }
        if (backgroundString == "questmenu") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/Quest%20Scroll.jpg'

            var background = {
                string: backgroundString,
                img: img,
            }
            this.backgroundImgList.push(background)
        }
        if (backgroundString == "dojo") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/dojo.jpg'

            var background = {
                string: backgroundString,
                img: img,
            }
            this.backgroundImgList.push(background)
        }
        if (backgroundString == "lab") {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/lab.jpg'

            var background = {
                string: backgroundString,
                img: img,
            }
            this.backgroundImgList.push(background)
        }
    }

    refresh() {

        this.computeScreenDimension()
        this.drawBackground();
        this.drawSprites();
        this.drawCanvasPadding();
        this.drawJoystickController();
        this.runPhysics();
        this.handlePlatformCollisions()
        this.updateSpriteStates();

        // if (this.endGame) {
        //     this.computeScreenDimension()
        //     this.drawBackground();
        //     this.drawSprites();

        //     this.ctx.fillStyle ='rgba(255,255,255,0.9)';
        //     this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height)
        //     this.restartGameIcon.draw();

        //     if (this.clickCollisionList.filter(item => item.id == 'restartGameIcon').length > 0) {
        //         this.endGame = false;
        //         // this.startGame = true;
        //         this.restartGame = true;
        //     }
        // }
        // else if ( (!this.startGame) && (!this.restartGame) ) {
        //     this.computeScreenDimension()
        //     this.drawBackground();
        //     this.drawSprites();

        //     this.ctx.fillStyle ='rgba(255,255,255,0.9)';
        //     this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height)
        //     this.startGameIcon.draw();

        //     if (this.clickCollisionList.filter(item => item.id == 'startGameIcon').length > 0) {
        //         this.startGame = true;
        //     }

        // } else {
        //     this.computeScreenDimension()
        //     this.drawBackground();
        //     this.drawSprites();
        //     this.drawCanvasPadding();
        //     this.drawJoystickController();
        //     this.runPhysics();
        //     this.handlePlatformCollisions()
        //     this.updateSpriteStates();
        // }


    }

    drawJoystickController() {
        if (this.joystickController) {
            var joystickSprite = this.spriteList.filter((sprite) => sprite.type == "joystick")
            if (joystickSprite.length > 0) {
                joystickSprite[0].draw()
            }           
        }
    }

    updateSpriteStates() {
        for (var sprite of this.spriteList) {
            sprite.updateSpriteState();
        }
    }

    rectanglePairCollision(rect1, rect2) {
        var collisionResult;
        if ((rect1.left < rect2.right) && (rect1.right > rect2.left) && (rect1.top < rect2.bottom) && (rect1.bottom > rect2.top)) {
            // collision detected!
            collisionResult = true;
        } else {
            collisionResult = false;
        }
        return collisionResult
    }

    handlePlatformCollisions() {
        // console.log('hola 1',this.spriteList)
        for (var sprite1 of this.spriteList) {
            // select a sprite that is a unit character, ie. not a platform, not a joystick, not fullscreen icon
            if ((sprite1.type != "platform") && (sprite1.character != "joystick") && (sprite1.character != "fullscreen")) {
                // loop through sprites again, we will check i chosen character sprite collides with a platform.
                for (var sprite2 of this.spriteList) {
                    if (sprite2.type == "platform") {

                        var collisionResult = this.rectanglePairCollision(sprite1, sprite2)
                        
 

                        if (collisionResult && sprite2.collidable && sprite1.collidable) {
                            // console.log('COLLIDE P')
                            sprite1.topRect = {
                                top: sprite1.top,
                                bottom: sprite1.top + 1,
                                left: sprite1.left,
                                right: sprite1.right,
                            }
                            var collisionResultTop = this.rectanglePairCollision(sprite1.topRect, sprite2)

                            sprite1.bottomRect = {
                                top: sprite1.bottom - 5,
                                bottom: sprite1.bottom,
                                left: sprite1.left + 2,
                                right: sprite1.right - 2,
                            }
                            var collisionResultBottom = this.rectanglePairCollision(sprite1.bottomRect, sprite2)

                            sprite1.rightRect = {
                                top: sprite1.top + 5,
                                bottom: sprite1.bottom - 5,
                                left: sprite1.right - 2,
                                right: sprite1.right,
                            }
                            var collisionResultRight = this.rectanglePairCollision(sprite1.rightRect, sprite2)

                            sprite1.leftRect = {
                                top: sprite1.top + 5,
                                bottom: sprite1.bottom - 5,
                                left: sprite1.left,
                                right: sprite1.left + 2,
                            }
                            var collisionResultLeft = this.rectanglePairCollision(sprite1.leftRect, sprite2)

                            if ((collisionResultLeft) || (collisionResultRight)) {
                                sprite1.x = sprite1.xOld;
                            }
                            if (collisionResultBottom) {
                                sprite1.yVel = 0;
                                sprite1.setBottom(sprite2.top- 1);
                                sprite1.onGround = true;
                                console.log('collide bot')
                                // var diff = sprite1.bottom - sprite2.top;
                                // var diffPercent = diff / this.jCanvas.height
                                // sprite1.y = sprite1.y - diffPercent * 20;
                            }
                            if (collisionResultTop) {
                                console.log('colllide top')
                                // sprite1.yVel = Math.abs(sprite1.yVel);
                            }

                        }
                    }
                }
            }
        }
    }

    add(sprite) {
        this.spriteList.push(sprite)
        // console.log('sprite list')
        // console.log(this.spriteList)
    }

    runPhysics() {
        for (var sprite of this.spriteList) {
            // console.log('sprite', sprite)
            // sprite.draw();


            if (this.checkSpriteInScene(sprite)) {

                sprite.x = sprite.x + sprite.xVel;
                sprite.y = sprite.y + sprite.yVel;


                if ( (sprite.gravity) && (sprite.onDragGrab==false) ) {
                    // if (sprite.y < 84 ) {
                        // sprite.y = sprite.y + sprite.yVel;
                        if (!sprite.onGround) {
                            sprite.yVel = sprite.yVel + 0.1
                        }
                    // } else {
                        // sprite.yVel = 0;
                    // }
                }
            }

            // console.log('xVel', sprite.xVel)

        }
    }

    drawSprites() {

        // sort out the sprites according to zIndex layers
        var spritesInScene = this.sceneList[this.sceneIndex].spriteList;
        spritesInScene.sort( (a,b) => {
            return(a.zIndex-b.zIndex)
        })

        
        for ( var sprite of spritesInScene) {
            sprite.draw();
        }
        if (this.checkHeroInScene()) {
            var heroList = this.spriteList.filter(spr => spr.id == "hero")
            if(heroList.length>0) {
                heroList[0].draw();
            }
        }

        // draw the sprite under control on top of everything else
        var joystickSprite = this.spriteList.filter((sprite) => sprite.type == "joystick")
        if (joystickSprite.length > 0) {
            // console.log('timutei')
            joystickSprite[0].draw()
            // joystickSprite[0].controlledSprite.draw();
        }

    }

    checkTouchCollision(touches, event) {
        for (var sprite of this.spriteList) {
            if (sprite.type == 'joystick') {
                sprite.checkTouchCollision(touches, event)
            }
        }
    }

    checkClickCollision(xClick, yClick, event) {
        // console.log('jackass')
        var collisionList = []

        // console.log('kuju', this.spriteList)
        for (var sprite of this.spriteList) {
            var result = sprite.checkClickCollision(xClick, yClick, event);
            // console.log('result',result)
            if (result) {
                collisionList.push(sprite)
                if (sprite.character=="fullscreen") {
                    const currentTime = new Date().getTime();
                    if (currentTime - this.fullScreenClickTime > 100) {
                        if (this.fullScreen) {
                            this.fullScreen = false;
                        } else {
                            this.fullScreen = true;
                        }
                        this.fullScreenClickTime = new Date().getTime();
                    }
                }
            }
        }
        // console.log('collision list', collisionList)
        this.clickCollisionList = collisionList
        // console.log('collision list', this.clickCollisionList)
        return collisionList
    }

    onMouseMove(x,y,event) {
        for (var sprite of this.spriteList) {
            sprite.onMouseMove(x,y,event);
        }        
    }

    computeScreenDimension() {
        if (this.joystickController) {
            // YES JOYSTICK

            if (this.fullScreen) {

                this.canvas.width = document.documentElement.clientWidth;
                this.canvas.height = document.documentElement.clientHeight;
                this.canvas.style.zIndex = 10;
                this.canvas.style.position = "fixed";
                this.canvas.style.top = 0;
                this.canvas.style.left = 0;

                // YES Joystick - YES Fullscreen    
                var x = 0;
                var y = 0;
                if ((this.canvas.width * this.widthToHeightRatio) > this.canvas.height) {
                    // do black fullscreen padding on the sides
                    x = (this.canvas.width - this.canvas.height / this.widthToHeightRatio) / 2;
                    this.ctx.fillRect(0, 0, x, this.canvas.height);
                    this.fullscreenMode = "fullheight"
    
                    this.jCanvas.mode = "fullheight"
                    this.jCanvas.xStart = x;
                    this.jCanvas.yStart = 0;
                    this.jCanvas.width = this.canvas.height / this.widthToHeightRatio;
                    this.jCanvas.height = this.canvas.height;   
    
                } else {
                    // do black fullscreen padding on top and bottom
                    y = (this.canvas.height - this.canvas.width * this.widthToHeightRatio) / 4;
                    this.fullscreenMode = "fullwidth"
    
                    this.jCanvas.mode = "fullwidth"
                    this.jCanvas.xStart = 0;
                    this.jCanvas.yStart = y;
                    this.jCanvas.width = this.canvas.width;
                    this.jCanvas.height = this.canvas.width * this.widthToHeightRatio;
                   }    
            } 
            else {
                // YES Joystick - NOT Fullscreen    
                if (document.documentElement.clientWidth > 1270) {
                    this.backgroundWidth = 700
                    this.canvas.width = this.backgroundWidth + 400;
                    this.canvas.height = this.backgroundWidth * this.widthToHeightRatio;
    
                    this.jCanvas.mode = "xl"
                    this.jCanvas.xStart = 200;
                    this.jCanvas.yStart = 0;
                    this.jCanvas.width = this.backgroundWidth;
                    this.jCanvas.height = this.backgroundWidth * this.widthToHeightRatio;
                }
                else if (document.documentElement.clientWidth > 990) {
                    this.backgroundWidth = 450
                    this.canvas.width = this.backgroundWidth + 300;
                    this.canvas.height = this.backgroundWidth * this.widthToHeightRatio;
    
                    // ipad in landscape
                    this.jCanvas.mode = "lg"
                    this.jCanvas.xStart = 150;
                    this.jCanvas.yStart = 0;
                    this.jCanvas.width = this.backgroundWidth;
                    this.jCanvas.height = this.backgroundWidth * this.widthToHeightRatio;
                }
                else if (document.documentElement.clientWidth > 600) {
    
                    this.canvas.width = document.documentElement.clientWidth - 50
                    this.backgroundWidth = (this.canvas.width) * 3 / 5
                    this.canvas.height = this.backgroundWidth * this.widthToHeightRatio;
    
                    // phone in landscape, ipad in portrait
                    this.jCanvas.mode = "sm"
                    this.jCanvas.xStart = this.canvas.width / 5;
                    this.jCanvas.yStart = 0;
                    this.jCanvas.width = this.backgroundWidth;
                    this.jCanvas.height = this.backgroundWidth * this.widthToHeightRatio;
                }
                else {
                    this.canvas.width = document.documentElement.clientWidth - 50;
                    this.backgroundWidth = this.canvas.width;
                    this.canvas.height = this.backgroundWidth * this.widthToHeightRatio;
                    this.canvas.height = this.canvas.height + 200;
    
                    // phone in portrait
                    this.jCanvas.mode = "xs"
                    this.jCanvas.xStart = 0;
                    this.jCanvas.yStart = this.backgroundWidth * this.widthToHeightRatio;
                    this.jCanvas.width = this.backgroundWidth;
                    this.jCanvas.height = this.backgroundWidth * this.widthToHeightRatio;
                }
    
                this.canvas.style.zIndex = 0;
                this.canvas.style.position = "static";
            }

        } 
        else {
            // NOT joystick
            if (this.fullScreen) {
                // NOT joystick - YES fullscreen
                this.canvas.width = document.documentElement.clientWidth;
                this.canvas.height = document.documentElement.clientHeight;
                if ((this.canvas.width * this.widthToHeightRatio) > this.canvas.height) {
                    // do black fullscreen padding on the sides
                    const backgroundWidth = this.canvas.height / this.widthToHeightRatio
                    x = (this.canvas.width - backgroundWidth) / 2;
                    this.fullscreenMode = "fullheight"

                    this.jCanvas.mode = "fullheight"
                    this.jCanvas.xStart = x;
                    this.jCanvas.yStart = 0;
                    this.jCanvas.width = backgroundWidth;
                    this.jCanvas.height = this.canvas.height;
                } else {
                    // do black fullscreen padding on top and bottom
                    y = (this.canvas.height - this.canvas.width * this.widthToHeightRatio) / 2;
                    this.fullscreenMode = "fullwidth"

                    this.jCanvas.mode = "fullwidth"
                    this.jCanvas.xStart = 0;
                    this.jCanvas.yStart = y;
                    this.jCanvas.width = this.canvas.width;
                    this.jCanvas.height = this.canvas.width*this.widthToHeightRatio;
                }
            } 
            else {
                // NOT joystick - NOT fullscreen
                if (document.documentElement.clientWidth > 990) {
                    this.canvas.width = 750;
                }
                else {
                    this.canvas.width = document.documentElement.clientWidth - 50;
                }
                this.backgroundWidth = this.canvas.width;
                this.backgroundHeight = this.canvas.width * this.widthToHeightRatio;

                this.jCanvas.mode = "normal"
                this.jCanvas.xStart = 0;
                this.jCanvas.yStart = 0;
                this.jCanvas.width = this.backgroundWidth;
                this.jCanvas.height = this.backgroundHeight;
            }
        }
    }

    checkHeroInScene() {

        var spritesInScene = this.sceneList[this.sceneIndex].spriteList;
        var res = spritesInScene.filter( sprite => sprite.id == 'hero')
        if (res.length > 0) {
            return true
        } else {
            return false
        }
        
    }

    checkSpriteInScene(sprite) {


        var spritesInScene = this.sceneList[this.sceneIndex].spriteList;
        var res = spritesInScene.filter( spr => spr.id == sprite.id)
        if (res.length > 0) {
            return true
        } else {
            return false
        }
        // console.log( 'sprite in scene', spritesInScene);
        
    }

    drawCanvasPadding() {
        const paddingColor = "white"
        this.ctx.fillStyle = paddingColor;
        if (this.fullScreen) {
            if (this.jCanvas.mode == "fullheight") {
                this.ctx.fillRect(0, 0, this.jCanvas.xStart, this.canvas.height);
                this.ctx.fillRect(this.canvas.width-this.jCanvas.xStart, 0, this.jCanvas.xStart, this.canvas.height);  
            }
            if (this.jCanvas.mode == "fullwidth") {
                this.ctx.fillRect(0, 0, this.jCanvas.width, this.jCanvas.yStart);
                this.ctx.fillRect(0, this.jCanvas.yStart+this.jCanvas.height, this.jCanvas.width, this.canvas.height-this.jCanvas.yStart-this.jCanvas.height);  
            }
                        
        } else {
            if (this.jCanvas.mode == "xs") {
                this.ctx.fillRect(0, this.jCanvas.yStart, this.jCanvas.width, this.jCanvas.yStart);
                // this.ctx.fillRect(this.canvas.width-this.jCanvas.xStart, 0, this.jCanvas.xStart, this.canvas.height);  
            } else {
                this.ctx.fillRect(0, 0, this.jCanvas.xStart, this.canvas.height);
                this.ctx.fillRect(this.canvas.width-this.jCanvas.xStart, 0, this.jCanvas.xStart, this.canvas.height);  
            }
            
        }

  
    }

    drawBackground() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Grab the correct background from background string
        var backgroundString = this.sceneList[ this.sceneIndex ].backgroundString;
        var res = this.backgroundImgList.filter( background => background.string == backgroundString)
        this.backgroundImg = res[0].img;

        if (this.fullScreen) {
            if (this.jCanvas.mode == "fullheight") {
                // do black fullscreen padding on the sides
                this.ctx.drawImage( this.backgroundImg, this.jCanvas.xStart, 0, this.jCanvas.width, this.jCanvas.height)

                this.ctx.fillStyle = "pink"
                this.ctx.fillRect(0, 0, this.jCanvas.xStart, this.canvas.height);
                this.ctx.fillRect(this.canvas.width-this.jCanvas.xStart, 0, this.jCanvas.xStart, this.canvas.height);
            }
            else if (this.jCanvas.mode == "fullwidth") {
                // do black fullscreen padding on the top and bottom
                this.ctx.drawImage( this.backgroundImg, 0, this.jCanvas.yStart, this.jCanvas.width, this.jCanvas.height)
                
            }

        } else {
            this.ctx.drawImage( this.backgroundImg, this.jCanvas.xStart, 0, this.jCanvas.width, this.jCanvas.height)
        }
    }


    drawBackgroundYesController() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        var backgroundString = this.sceneList[ this.sceneIndex ].backgroundString;
        // console.log('rezzy', backgroundString)
        var res = this.backgroundImgList.filter( background => background.string == backgroundString)
        // console.log('rezzy', res)
        this.backgroundImg = res[0].img;

        if (this.fullScreen) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            this.canvas.style.zIndex = 10;
            this.canvas.style.position = "fixed";
            this.canvas.style.top = 0;
            this.canvas.style.left = 0;

            var x = 0;
            var y = 0;
            if ((this.canvas.width * this.widthToHeightRatio) > this.canvas.height) {
                // do black fullscreen padding on the sides
                x = (this.canvas.width - this.canvas.height / this.widthToHeightRatio) / 2;
                this.ctx.fillRect(0, 0, x, this.canvas.height);
                this.fullscreenMode = "fullheight"

                this.jCanvas.mode = "fullheight"
                this.jCanvas.xStart = x;
                this.jCanvas.yStart = 0;
                this.jCanvas.width = this.canvas.height / this.widthToHeightRatio;
                this.jCanvas.height = this.canvas.height;

                this.ctx.drawImage( this.backgroundImg, x, y, this.canvas.height / this.widthToHeightRatio, this.canvas.height)
                this.fullScreenX = x;
                this.fullScreenY = 0;
                x = x + this.canvas.height / this.widthToHeightRatio;

                // console.log('wazoo', x + (this.canvas.height / this.widthToHeightRatio) )
                // this.ctx.fillStyle = "#FF0000";
                this.ctx.fillRect(x, 0, this.canvas.width / 2, this.canvas.height);
                // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                // this.ctx.fillRect(x + this.canvas.height / this.widthToHeightRatio, y, x, this.canvas.height );



            } else {
                // do black fullscreen padding on top and bottom
                y = (this.canvas.height - this.canvas.width * this.widthToHeightRatio) / 4;
                this.ctx.fillRect(0, 0, this.canvas.width, y);
                this.fullscreenMode = "fullwidth"

                this.ctx.drawImage( this.backgroundImg, x, y, this.canvas.width, this.canvas.width * this.widthToHeightRatio)
                this.fullScreenX = 0;
                this.fullScreenY = y;



                y = y + this.canvas.width * this.widthToHeightRatio;
                this.ctx.fillRect(x, y, this.canvas.width, this.canvas.height);

                this.jCanvas.mode = "fullwidth"
                this.jCanvas.xStart = 0;
                this.jCanvas.yStart = y;
                this.jCanvas.width = this.canvas.width;
                this.jCanvas.height = this.canvas.width * this.widthToHeightRatio;


            }


        } else {
            this.canvas.style.zIndex = 0;

            if (document.documentElement.clientWidth > 1270) {
                this.backgroundWidth = 700
                this.canvas.width = this.backgroundWidth + 400;
                this.canvas.height = this.backgroundWidth * this.widthToHeightRatio;

                this.jCanvas.mode = "xl"
                this.jCanvas.xStart = 200;
                this.jCanvas.yStart = 0;
                this.jCanvas.width = this.backgroundWidth;
                this.jCanvas.height = this.backgroundWidth * this.widthToHeightRatio;
            }
            else if (document.documentElement.clientWidth > 990) {
                this.backgroundWidth = 450
                this.canvas.width = this.backgroundWidth + 300;
                this.canvas.height = this.backgroundWidth * this.widthToHeightRatio;

                // ipad in landscape
                this.jCanvas.mode = "lg"
                this.jCanvas.xStart = 150;
                this.jCanvas.yStart = 0;
                this.jCanvas.width = this.backgroundWidth;
                this.jCanvas.height = this.backgroundWidth * this.widthToHeightRatio;
            }
            else if (document.documentElement.clientWidth > 600) {

                this.canvas.width = document.documentElement.clientWidth - 50
                this.backgroundWidth = (this.canvas.width) * 3 / 5
                this.canvas.height = this.backgroundWidth * this.widthToHeightRatio;

                // phone in landscape, ipad in portrait
                this.jCanvas.mode = "sm"
                this.jCanvas.xStart = this.canvas.width / 5;
                this.jCanvas.yStart = 0;
                this.jCanvas.width = this.backgroundWidth;
                this.jCanvas.height = this.backgroundWidth * this.widthToHeightRatio;
            }
            else {
                this.canvas.width = document.documentElement.clientWidth - 50;
                this.backgroundWidth = this.canvas.width;
                this.canvas.height = this.backgroundWidth * this.widthToHeightRatio;
                this.canvas.height = this.canvas.height + 200;

                // phone in portrait
                this.jCanvas.mode = "xs"
                this.jCanvas.xStart = 0;
                this.jCanvas.yStart = this.backgroundWidth * this.widthToHeightRatio;
                this.jCanvas.width = this.backgroundWidth;
                this.jCanvas.height = this.backgroundWidth * this.widthToHeightRatio;
            }

            this.canvas.style.zIndex = 0;
            this.canvas.style.position = "static";
        }

        // Joystick padding for wide screen (DESKTOP)
        if (!this.fullScreen) {
            if (document.documentElement.clientWidth > 1270) {
                var x = 200;
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(0, 0, x, this.canvas.height);

                this.ctx.drawImage( this.backgroundImg, x, 0, this.backgroundWidth, this.backgroundWidth * this.widthToHeightRatio)

                this.ctx.fillStyle = "black";
                this.ctx.fillRect(this.canvas.width - x, 0, x, this.canvas.height);
            }
            else if (document.documentElement.clientWidth > 990) {
                var x = 150;
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(0, 0, x, this.canvas.height);

                this.ctx.drawImage( this.backgroundImg, x, 0, this.backgroundWidth, this.backgroundWidth * this.widthToHeightRatio)

                this.ctx.fillStyle = "black";
                this.ctx.fillRect(this.canvas.width - x, 0, x, this.canvas.height);
            }
            else if (document.documentElement.clientWidth > 600) {
                var x = this.canvas.width * 1 / 5;
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(0, 0, x, this.canvas.height);

                this.ctx.drawImage( this.backgroundImg, x, 0, this.backgroundWidth, this.backgroundWidth * this.widthToHeightRatio)

                this.ctx.fillStyle = "black";
                this.ctx.fillRect(this.canvas.width - x, 0, x, this.canvas.height);
            }
            else {
                var y = this.backgroundWidth * this.widthToHeightRatio
                this.ctx.drawImage( this.backgroundImg, 0, 0, this.backgroundWidth, y)
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(0, y, this.canvas.width, 200);

                // Draw Joystick
                // this.ctx.drawImage(this.joystickDirPadImg, this.canvas.width/3, y+100, 100, 100)
            }

        }

    }

    drawBackgroundNoController() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var res = this.backgroundImgList.filter( background => background.string == this.backgroundString)
        this.backgroundImg = res[0].img;

        // set canvas sizing in between normal vs. fullscreen mode
        if (this.fullScreen) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            this.canvas.style.zIndex = 10;
            this.canvas.style.position = "fixed";
            this.canvas.style.top = 0;
            this.canvas.style.left = 0;

        } else {
            if (document.documentElement.clientWidth > 990) {
                this.canvas.width = 750;
            }
            else {
                this.canvas.width = document.documentElement.clientWidth - 50;
            }
            this.canvas.height = this.canvas.width * this.widthToHeightRatio;
            this.canvas.style.zIndex = 0;
            this.canvas.style.position = "static";
        }

        // Add side black rectangle padding in full screen mode
        var x = 0;
        var y = 0;
        var fullscreenMode = ""
        if (this.fullScreen) {
            this.ctx.fillStyle = "black";
            
            if ((this.canvas.width * this.widthToHeightRatio) > this.canvas.height) {
                // do black fullscreen padding on the sides
                x = (this.canvas.width - this.canvas.height / this.widthToHeightRatio) / 2;
                this.ctx.fillRect(0, 0, x, this.canvas.height);
                this.fullscreenMode = "fullheight"
            } else {
                // do black fullscreen padding on top and bottom
                y = (this.canvas.height - this.canvas.width * this.widthToHeightRatio) / 2;
                this.ctx.fillRect(0, 0, this.canvas.width, y);
                this.fullscreenMode = "fullwidth"
            }
        }

        if (this.backgroundString = "home") {
            if (this.fullScreen) {
                if (this.fullscreenMode == "fullheight") {
                    this.ctx.drawImage(this.backgroundImg , x, y, this.canvas.height / this.widthToHeightRatio, this.canvas.height)
                    this.fullScreenX = x;
                    this.fullScreenY = 0;
                    x = x + this.canvas.height / this.widthToHeightRatio;
                }
                else if (this.fullscreenMode == "fullwidth") {
                    this.ctx.drawImage( this.backgroundImg , x, y, this.canvas.width, this.canvas.width * this.widthToHeightRatio)
                    this.fullScreenX = 0;
                    this.fullScreenY = y;
                    y = y + this.canvas.width * this.widthToHeightRatio;
                }
            }
            else {
                this.ctx.drawImage( this.backgroundImg, 0, 0, this.canvas.width, this.canvas.width * this.widthToHeightRatio)
                this.fullScreenX = 0
                this.fullScreenY = 0
            }
        }
        else if (this.backgroundColor == "blue") {
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }


        if (this.fullScreen) {
            if (this.fullscreenMode == "fullheight") {
                this.ctx.fillStyle = "black"
                this.ctx.fill();
                this.ctx.fillRect(x, 0, this.fullScreenX, this.canvas.height);

            }
            else if (this.fullscreenMode == "fullwidth") {
                this.ctx.fillStyle = "black"
                this.ctx.fill();
                this.ctx.fillRect(0, y, this.canvas.width, this.fullScreenY);
            }
        }
    }

}





































class SpriteImage {
    constructor(gameCanvas, x, y, height, width, img) {
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
        // console.log('draw me: canvas size', this.gameCanvas)
        this.ctx.drawImage(this.img, this.x, this.y, this.img.width * this.scale, this.img.height * this.scale)
    }

    move(x, y) {
        // console.log('move me')
        this.x = x;
        this.y = y;
    }

    changeSpriteColorTint(red, gr, bl) {
        var myImg = this.ctx.getImageData(this.x, this.y, this.imgList[0].width, this.imgList[0].height);
        // console.log('pixels')
        // console.log(myImg)

        for (var t = 0; t < myImg.data.length; t += 4) {
            if (myImg.data[t + 3] == 255) {
                myImg.data[t] = red | myImg.data[t];
                myImg.data[t + 1] = gr | myImg.data[t + 1];
                myImg.data[t + 2] = bl | myImg.data[t + 2];
            }
        }
        this.ctx.putImageData(myImg, this.x, this.y); // Image data is adjusted according to context   
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
    SpriteTextScrollBox,
    GameJoystick,
    SpriteText,
    SpriteDrawing,
    SpritePlatform,
};
