import { getKeyThenIncreaseKey } from 'antd/lib/message';
import { Sprite } from './ClassSprite'
import styles from '../pages/styles.module.css'



class SpriteDrawing extends Sprite {
    constructor(gameCanvas, x, y, width, height, character, backgroundColor, strokeColor) {
        super(gameCanvas, x, y, width, height, character, backgroundColor, strokeColor)

        if (this.character == "rect") {
            this.mode = "center";
        }
        else if (this.character == "line") {
            this.mode = "corner";
        }

        this.x = x; // this.x position refers to percentage position in canvas with 1 being 1% x distance
        this.y = y; // this.y position refers to percentage position in canvas with 1 being 1% y distance

        this.gravity = false;

        this.lineDash = [];

        this.blink = false;
        this.blinkState = 0;
        this.blinkCount = 0;
        this.blinkLoops;
        this.blinkColor1;
        this.blinkColor2;


        gameCanvas.add(this);
    }

    setPosition(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setDash(dashArray) {
        this.lineDash = dashArray;
    }

    setBorderBlinkOn(blinkColor1, blinkColor2, blinkLoops) {
        this.blink = true;
        this.blinkColor1 = blinkColor1;
        this.blinkColor2 = blinkColor2;
        this.blinkLoops = blinkLoops;
    }

    setBorderBlinkOff() {
        this.blink = false;
    }

    drawRect() {
        this.ctx.translate(this.left+this.widthPix/2, this.top+this.heightPix/2);
        this.ctx.rotate(this.theta);

        
        this.ctx.beginPath();
        this.ctx.rect(-this.widthPix/2, -this.heightPix/2, this.widthPix, this.heightPix);
        this.ctx.fill()
        this.ctx.stroke();


        this.ctx.rotate(-this.theta);
        this.ctx.translate(-this.left-this.widthPix/2, -this.top-this.heightPix/2);        
    }


    draw() {

        if (this.visibility) {
            this.positionComputation();

            this.ctx.globalAlpha = this.opacity;







            if (this.character == "rect") {
                if (!this.blink) {
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.strokeStyle = this.strokeColor;
                    this.drawRect();
                }
                else {
                    if (this.blinkCount < this.blinkLoops) {
                        this.ctx.fillStyle = this.backgroundColor;
                        this.ctx.strokeStyle = this.blinkColor1;
                        this.drawRect();
                    }
                    else if (this.blinkCount < this.blinkLoops * 2) {
                        this.ctx.fillStyle = this.backgroundColor;
                        this.ctx.strokeStyle = this.blinkColor2;
                        this.drawRect();
                    } else {
                        this.ctx.fillStyle = this.backgroundColor;
                        this.ctx.strokeStyle = this.blinkColor2;
                        this.drawRect();
                        this.blinkCount = 0;
                    }
                    this.blinkCount = this.blinkCount + 1;
                }
            }
            else if (this.character == "line") {
                this.ctx.beginPath();
                this.ctx.setLineDash(this.lineDash);
                this.ctx.moveTo(this.left, this.top);
                this.ctx.lineTo(this.right, this.bottom);
                this.ctx.strokeStyle = this.strokeColor;
                this.ctx.stroke();
            }
            else if (this.character == "fontawesome_hand-pointer-solid") {
                const font = '900 '+ this.widthPix.toString() +'px "Font Awesome 5 Free"';          
                document.fonts.load(font).then((_) => {
                    this.ctx.font = font;
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.fillText("\uF25a", this.left, this.top)
                    })
            }
            else if (this.character == "fontawesome_hand-check-circle") {
                const font = '900 '+ this.widthPix.toString() +'px "Font Awesome 5 Free"';       
                document.fonts.load(font).then((_) => {
                    this.ctx.font = font;
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.fillText("\uF058", this.left, this.top)
                    })    
            }
            else if (this.character == "fontawesome_caret-square-right") {
                const font = '900 '+ this.widthPix.toString() +'px "Font Awesome 5 Free"';
                document.fonts.load(font).then((_) => {
                    this.ctx.font = font;
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.fillText("\uF152", this.left, this.top+this.heightPix)

                    // this.fillStyle = "red"
                    // this.ctx.fillRect(this.left, this.top, this.widthPix, this.heightPix)
                    })    
            }
            else if (this.character == "fontawesome_redo-alt") {
                const font = '900 '+ this.widthPix.toString() +'px "Font Awesome 5 Free"';
                document.fonts.load(font).then((_) => {
                    this.ctx.font = font;
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.fillText("\uF2f9", this.left, this.top+this.heightPix)

                    // this.fillStyle = "red"
                    // this.ctx.fillRect(this.left, this.top, this.widthPix, this.heightPix)
                    })    
            }

            // reset line dash to solid
            this.ctx.setLineDash([]);
            this.ctx.globalAlpha = 1;



            // const font = '300 48px "FontAwesome"';
            // this.ctx.font = font;
            // this.ctx.fillStyle = "red";            
            // this.ctx.fillText("boga", 50, 50)
            // document.fonts.load(font).then((_) => {
            //     this.ctx.font = font;
            //     this.ctx.fillStyle = "red";
            //     this.ctx.fillText("\uF25a", 50, 50)
            //     })

        }


    }
}

export {
    SpriteDrawing,
};
