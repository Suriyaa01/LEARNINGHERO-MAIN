import { PropertySafetyFilled } from '@ant-design/icons';
import { Sprite } from './ClassSprite'
import { SpriteText } from './ClassSpriteText'

class SpriteTextScrollBox extends Sprite {
    constructor(gameCanvas, boxMode = "box", x = 0, y = 0, width = 10, height = 10, backgroundColor = "rgba(176,224,230,0)", fontColor = "black", borderColor = "black", borderWidth = 2, highlightColor = "rgba(176,224,230,0)", marginTop = 20) {
        super(gameCanvas, x, y, width, height, backgroundColor)

        this.boxMode = boxMode;
        this.speechDir = "right";

        this.borderColor = borderColor;
        this.borderWidth = borderWidth;

        this.backgroundColor = backgroundColor;
        this.highlightColor = highlightColor;
        this.clickColor = 'rgba(76,154,120)';
        this.fontColor = fontColor;

        this.mode = "corner"
        this.backgroundOpacity = 1;
        this.highlightOpacity = 1;
        this.clickOpacity = 1;

        this.textList = [];
        this.textListHeight = [];
        this.gravity = false;

        this.arrowScrollTopImg;
        this.arrowScrollBottomImg;

        this.totalHeightIndex = this.findTotalHeightIndex();
        this.totalHeightPixel = this.findTotalHeightPixel();

        this.genScrollArrowImage();


        this.textStartIndex = 0;
        if (boxMode == "box") {
            this.shownTextSectionEnd = 0;
        } 
        else if (boxMode=="chat") {
            this.shownTextSectionEnd = this.findTotalHeightIndex()
        }

        this.countMonteCristo = 0;
        this.scrollTimer = 0;

        this.gameCanvas.add(this);

        this.collidable = false;
        this.scrollable = false;

        this.marginTop = marginTop;
        this.sectionHovered;
        this.sectionClicked;

        this.closeButton = false;
    }

    genScrollArrowImage() {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/scroll%20arrow%20up.png'

        this.arrowScrollTopImg = img;

        var img2 = new Image();
        img2.crossOrigin = "Anonymous";
        img2.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/scroll%20arrow%20down.png'

        this.arrowScrollBottomImg = img2;
    }


    addTextString(textGroup, fontSize, selectable, fontColor) {
        var setTextGroup = []
        for (var i in textGroup) {
            setTextGroup.push(new SpriteText(this.gameCanvas, 0, 0, textGroup[i], fontSize[i]))
        }

        var tempTextGroup = {
            items: setTextGroup,
            selectable: selectable,
        }
        this.textList.push(tempTextGroup)

        this.totalHeightIndex = this.findTotalHeightIndex();
        this.totalHeightPixel = this.findTotalHeightPixel();

        this.shownTextSectionEnd = this.totalHeightIndex;

        console.log('mokoloko', this.totalHeightPixel - this.top)
    }

    addGroup(textGroup, selectable) {

        var tempTextGroup = {
            items: textGroup,
            selectable: selectable,
        }
        this.textList.push(tempTextGroup)

        // this.draw();
        // this.fitTextInBox();

        this.totalHeightIndex = this.findTotalHeightIndex();
        this.totalHeightPixel = this.findTotalHeightPixel();


        // if (this.totalHeightPixel > (this.top - this.bottom)) {
        //     this.scrollable = true;
        // } else {
        //     this.scrollable = false;
        // }

        // console.log('scrollbox textlist', this.textList)
        // this.fitTextInBox();
    }

    draw() {
        // console.log('DRAWQUEST')
        // this.positionComputation()
        // this.positionComputation();

        if (this.visibility) {

            this.ctx.globalAlpha = this.backgroundOpacity;


            if (this.boxMode == "box") {

                this.ctx.beginPath();
                this.ctx.rect(this.left, this.top, this.widthPix, this.heightPix);
                this.ctx.fillStyle = this.backgroundColor;
                this.ctx.strokeStyle = this.borderColor;
                this.ctx.fill()
                this.ctx.stroke();

                this.ctx.globalAlpha = 1;
                this.fitTextInBox();
            }
            else if (this.boxMode == "chat") {

                // console.log('totalHeight', )
                this.positionComputation();

                const bottom = this.findTotalHeightPixel()

                // draw orginal background
                if (this.speechDir == "left") {
                    // square box quote left
                    this.ctx.lineWidth = this.borderWidth;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.left, this.top);
                    this.ctx.lineTo(this.right, this.top);
                    this.ctx.lineTo(this.right, bottom);
                    this.ctx.lineTo(this.left + (this.right - this.left) / 4, bottom);
                    this.ctx.lineTo(this.left + (this.right - this.left) / 4, bottom + 20);
                    this.ctx.lineTo(this.left + (this.right - this.left) / 5, bottom);
                    this.ctx.lineTo(this.left, bottom);
                    this.ctx.lineTo(this.left, this.top);
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.strokeStyle = this.borderColor;
                    this.ctx.stroke();
                    this.ctx.fill();
                }
                else if (this.speechDir == "right") {
                    this.ctx.lineWidth = this.borderWidth;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.left, this.top);
                    this.ctx.lineTo(this.right, this.top);
                    this.ctx.lineTo(this.right, bottom);
                    this.ctx.lineTo(this.right - (this.right - this.left) / 5, bottom);
                    this.ctx.lineTo(this.right - (this.right - this.left) / 4, bottom + 20);
                    this.ctx.lineTo(this.right - (this.right - this.left) / 4, bottom);
                    this.ctx.lineTo(this.left, bottom);
                    this.ctx.lineTo(this.left, this.top);
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.strokeStyle = this.borderColor;
                    this.ctx.stroke();
                    this.ctx.fill();
                }



                this.ctx.globalAlpha = 1;
                this.fitBoxInText();


                // draw border background
                if (this.speechDir == "left") {
                    // square box quote left
                    this.ctx.lineWidth = this.borderWidth;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.left, this.top);
                    this.ctx.lineTo(this.right, this.top);
                    this.ctx.lineTo(this.right, bottom);
                    this.ctx.lineTo(this.left + (this.right - this.left) / 4, bottom);
                    this.ctx.lineTo(this.left + (this.right - this.left) / 4, bottom + 20);
                    this.ctx.lineTo(this.left + (this.right - this.left) / 5, bottom);
                    this.ctx.lineTo(this.left, bottom);
                    this.ctx.lineTo(this.left, this.top);
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.strokeStyle = this.borderColor;
                    this.ctx.stroke();
                }
                else if (this.speechDir == "right") {
                    this.ctx.lineWidth = this.borderWidth;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.left, this.top);
                    this.ctx.lineTo(this.right, this.top);
                    this.ctx.lineTo(this.right, bottom);
                    this.ctx.lineTo(this.right - (this.right - this.left) / 5, bottom);
                    this.ctx.lineTo(this.right - (this.right - this.left) / 4, bottom + 20);
                    this.ctx.lineTo(this.right - (this.right - this.left) / 4, bottom);
                    this.ctx.lineTo(this.left, bottom);
                    this.ctx.lineTo(this.left, this.top);
                    this.ctx.fillStyle = this.backgroundColor;
                    this.ctx.strokeStyle = this.borderColor;
                    this.ctx.stroke();
                }



            }






            // draw scrollbar
            if (this.scrollable) {
                // make the scroll triangle 5% of jCanvas screen width
                var scrollWidth = this.gameCanvas.jCanvas.width * 0.05;
                var scrollHeight = scrollWidth * 0.8;

                this.ctx.fillStyle = 'rgba(0,0,0,0)'
                // draw top scroll triangle
                var scrollMarginRight = 5;
                var scrollMarginTop = 15;
                this.ctx.beginPath();
                this.ctx.strokeStyle = "black";
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(this.right - scrollWidth - scrollMarginRight, this.top + scrollMarginTop + scrollHeight);
                this.ctx.lineTo(this.right - scrollMarginRight, this.top + scrollMarginTop + scrollHeight);
                this.ctx.lineTo(this.right - scrollMarginRight - scrollWidth * 0.5, this.top + scrollMarginTop);
                this.ctx.lineTo(this.right - scrollWidth - scrollMarginRight, this.top + scrollMarginTop + scrollHeight);
                this.ctx.fill();
                this.ctx.stroke();

                // draw bottom scroll triangle
                var scrollMarginBottom = 5;
                this.ctx.beginPath();
                this.ctx.strokeStyle = "black";
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(this.right - scrollWidth - scrollMarginRight, this.bottom - scrollMarginBottom - scrollHeight);
                this.ctx.lineTo(this.right - scrollMarginRight, this.bottom - scrollMarginBottom - scrollHeight);
                this.ctx.lineTo(this.right - scrollMarginRight - scrollWidth * 0.5, this.bottom - scrollMarginBottom);
                this.ctx.lineTo(this.right - scrollWidth - scrollMarginRight, this.bottom - scrollMarginBottom - scrollHeight);
                this.ctx.fill();
                this.ctx.stroke();
            }

            // draw close button
            if (this.closeButton) {
                if (this.scrollable) {
                    var x = this.right - scrollWidth * 1.5 - scrollMarginRight * 2;
                    var y = this.top + 27;
                    var size = scrollWidth * 0.3;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = "gray";
                    this.ctx.lineWidth = 5;
                    this.ctx.moveTo(x + size, y + size);
                    this.ctx.lineTo(x - size, y - size);
                    this.ctx.moveTo(x - size, y + size);
                    this.ctx.lineTo(x + size, y - size);
                    this.ctx.stroke();
                } else {
                    size = this.gameCanvas.jCanvas.width * 0.015;
                    var x = this.right - size - 10;
                    var y = this.top + size + 10;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = "gray";
                    this.ctx.lineWidth = 5;
                    this.ctx.moveTo(x + size, y + size);
                    this.ctx.lineTo(x - size, y - size);
                    this.ctx.moveTo(x - size, y + size);
                    this.ctx.lineTo(x + size, y - size);
                    this.ctx.stroke();
                }
            }

            // // write text
            // this.ctx.font = this.font_size_scaled + "px Arial";
            // this.ctx.fillStyle = this.fontColor;
            // this.ctx.fillText(this.top, this.right - 150, this.top + 40);
            // this.ctx.fillText(this.y, this.right - 150, this.top - 40);
        }

    }

    fitBoxInText() {
        this.positionComputation()

        var height = this.top;
        var availableHeight = this.bottom - this.top;
        var textListIndex = 0;
        var drawIndex = 0;
        var previousObject;
        var previousHeight;
        var breakCheck1 = false;
        var i = 0;
        for (var textSection of this.textList) {
            for (var textSnippet of textSection.items) {

                if (textListIndex >= this.textStartIndex) {
                    var y = height;
                    height = height + textSnippet.height + this.marginTop;

                    if (drawIndex == 0) {
                        if (this.sectionClicked == i) {
                            this.ctx.globalAlpha = this.clickOpacity;
                            this.ctx.fillStyle = this.clickColor;
                            this.ctx.strokeStyle = this.clickColor;
                        }
                        else if (this.sectionHovered == i) {
                            this.ctx.globalAlpha = this.hoverOpacity;
                            this.ctx.fillStyle = this.highlightColor;
                            this.ctx.strokeStyle = this.highlightColor;
                        } else {
                            this.ctx.globalAlpha = this.backgroundOpacity;
                        }
                        this.ctx.beginPath();
                        this.ctx.rect(this.left, this.top, this.right - this.left, y + this.marginTop * 0.5 - this.top);
                        this.ctx.fill()
                        // this.ctx.stroke();
                    }

                    // Draw highlight rectangle
                    if (i == this.sectionClicked) {
                        this.ctx.globalAlpha = this.clickOpacity;
                        this.ctx.fillStyle = this.clickColor;
                        this.ctx.strokeStyle = this.clickColor;
                        this.ctx.beginPath();
                        this.ctx.rect(this.left, y + this.marginTop * 0.5, this.right - this.left, this.marginTop * 0.5 + height - y);
                        this.ctx.fill()
                        this.ctx.stroke();

                    }
                    else if (i == this.sectionHovered) {
                        this.ctx.globalAlpha = this.highlightOpacity;
                        this.ctx.fillStyle = this.highlightColor;
                        this.ctx.strokeStyle = this.highlightColor;
                        this.ctx.beginPath();
                        // this.ctx.rect(this.left, y + this.marginTop * 0.5, this.right - this.left, this.marginTop * 0.5 + height - y);
                        this.ctx.rect(this.left, y + this.marginTop * 0.5, this.right - this.left, height - y);
                        this.ctx.fill()
                        // this.ctx.stroke();    
                    } else {
                        this.ctx.globalAlpha = this.backgroundOpacity;
                        this.ctx.fillStyle = this.backgroundColor;
                        this.ctx.strokeStyle = this.backgroundColor;
                        this.ctx.beginPath();
                        this.ctx.rect(this.left, y + this.marginTop * 0.5, this.right - this.left, this.marginTop * 0.5 + height - y);
                        this.ctx.fill()
                        this.ctx.stroke();

                    }


                    this.ctx.globalAlpha = 1;
                    textSnippet.setPosition(this.left + 20, height, "cornerpix");


                    // console.log( "Snippy", textSnippet)
                    textSnippet.fontColor = this.fontColor;
                    textSnippet.draw();
                    drawIndex = drawIndex + 1;

                    previousObject = textSnippet;
                    previousHeight = height + this.marginTop * 0.5;
                }
                textListIndex = textListIndex + 1;
            }
            i = i + 1;
        }
    }

    fitTextInBox() {
        this.positionComputation()

        var height = this.top;
        var availableHeight = this.bottom - this.top;
        var textListIndex = 0;
        var drawIndex = 0;
        var previousObject;
        var previousHeight;
        var breakCheck1 = false;
        var i = 0;
        for (var textSection of this.textList) {
            for (var textSnippet of textSection.items) {

                if (textListIndex >= this.textStartIndex) {
                    var y = height;
                    height = height + textSnippet.height + this.marginTop;

                    // If we've exceeded height of scroll box then break to stop writing more items from text list.
                    if ((height - this.top) > availableHeight) {
                        // add pink padding to the end if you've highlighted the most bottom item
                        if (i == this.sectionClicked) {
                            this.ctx.globalAlpha = this.clickOpacity;
                            this.ctx.fillStyle = this.clickColor;
                            this.ctx.lineStyle = this.clickColor;
                            this.ctx.beginPath();
                            this.ctx.rect(this.left, this.bottom, this.right - this.left, (previousHeight - this.bottom));
                            this.ctx.fill()
                            this.ctx.stroke();
                        } else if (this.sectionHovered == i) {
                            this.ctx.globalAlpha = this.highlightOpacity;
                            this.ctx.fillStyle = this.highlightColor;
                            this.ctx.lineStyle = this.highlightColor;
                            this.ctx.beginPath();
                            this.ctx.rect(this.left, this.bottom, this.right - this.left, (previousHeight - this.bottom));
                            this.ctx.fill()
                            // this.ctx.stroke();
                        }
                        this.shownTextSectionEnd = i;
                        breakCheck1 = true;
                        break;
                    }

                    if (drawIndex == 0) {
                        if (this.sectionClicked == i) {
                            this.ctx.globalAlpha = this.clickOpacity;
                            this.ctx.fillStyle = this.clickColor;
                            this.ctx.strokeStyle = this.clickColor;
                        }
                        else if (this.sectionHovered == i) {
                            this.ctx.globalAlpha = this.hoverOpacity;
                            this.ctx.fillStyle = this.highlightColor;
                            this.ctx.strokeStyle = this.highlightColor;
                        } else {
                            this.ctx.globalAlpha = this.backgroundOpacity;
                        }
                        this.ctx.beginPath();
                        this.ctx.rect(this.left, this.top, this.right - this.left, y + this.marginTop * 0.5 - this.top);
                        this.ctx.fill()
                        // this.ctx.stroke();
                    }

                    // Draw highlight rectangle
                    if (i == this.sectionClicked) {
                        this.ctx.globalAlpha = this.clickOpacity;
                        this.ctx.fillStyle = this.clickColor;
                        this.ctx.strokeStyle = this.clickColor;
                        this.ctx.beginPath();
                        this.ctx.rect(this.left, y + this.marginTop * 0.5, this.right - this.left, this.marginTop * 0.5 + height - y);
                        this.ctx.fill()
                        this.ctx.stroke();

                    }
                    else if (i == this.sectionHovered) {
                        this.ctx.globalAlpha = this.highlightOpacity;
                        this.ctx.fillStyle = this.highlightColor;
                        this.ctx.strokeStyle = this.highlightColor;
                        this.ctx.beginPath();
                        // this.ctx.rect(this.left, y + this.marginTop * 0.5, this.right - this.left, this.marginTop * 0.5 + height - y);
                        this.ctx.rect(this.left, y + this.marginTop * 0.5, this.right - this.left, height - y);
                        this.ctx.fill()
                        // this.ctx.stroke();    
                    } else {
                        this.ctx.globalAlpha = this.backgroundOpacity;
                        this.ctx.fillStyle = this.backgroundColor;
                        this.ctx.strokeStyle = this.backgroundColor;
                        this.ctx.beginPath();
                        this.ctx.rect(this.left, y + this.marginTop * 0.5, this.right - this.left, this.marginTop * 0.5 + height - y);
                        this.ctx.fill()
                        this.ctx.stroke();

                    }

                    // draw area box
                    // this.ctx.beginPath()
                    // this.ctx.rect(this.left, y, this.right-this.left, height-y );
                    // this.ctx.strokeStyle = "red";
                    // this.ctx.lineWidth = "1";
                    // this.ctx.stroke();


                    this.ctx.globalAlpha = 1;
                    textSnippet.setPosition(this.left + 20, height, "cornerpix");


                    // console.log( "Snippy", textSnippet)
                    textSnippet.fontColor = this.fontColor;
                    textSnippet.draw();
                    drawIndex = drawIndex + 1;

                    previousObject = textSnippet;
                    previousHeight = height + this.marginTop * 0.5;
                }
                textListIndex = textListIndex + 1;
            }
            if (breakCheck1) {
                break;
            }
            i = i + 1;
        }
    }

    // over-ride main on mouse move to hightlight text sections
    onMouseMove(x, y, event) {
        // this.ctx.beginPath();
        // this.ctx.rect(0, 0, this.gameCanvas.jCanvas.width, this.gameCanvas.jCanvas.height);
        // this.ctx.fillStyle = "green"
        // this.ctx.fill()
        // this.ctx.stroke();    

        this.handleTextSectionCollision(x, y, event);
    }

    // over-ride main sprite class on click
    checkClickCollision(xClick, yClick, event) {
        // console.log('holy moly')
        var result = false;

        var textSectionClicked = this.handleTextSectionCollision(xClick, yClick, event);

        if (this.scrollable) {
            if ((xClick > this.right - 40) && (xClick < this.right)) {
                if ((yClick > this.top) && (yClick < this.top + 40) && (event.type == "mouseup")) {
                    // Hit top scroll arrow;  
                    if (this.textStartIndex > 0) {
                        var date = new Date();
                        if (date.getTime() - this.scrollTimer > 1) {
                            this.textStartIndex = this.textStartIndex - 1;
                            // console.log('scrollyup')
                        }
                        this.scrollTimer = date.getTime();
                    }
                }
                if ((yClick > this.bottom - 40) && (yClick < this.bottom) && (event.type == "mouseup")) {
                    // Hit bottom scroll arrow;

                    // check if not yet at bottom of text
                    if (this.textStartIndex < this.totalHeightIndex - 2) {
                        var date = new Date();
                        if (date.getTime() - this.scrollTimer > 1) {
                            this.textStartIndex = this.textStartIndex + 1;
                            // console.log('scrollydown')
                        }
                        this.scrollTimer = date.getTime();
                    }
                }
            }
        }

        // detect hit close button
        if (this.closeButton) {
            if (this.scrollable) {
                var scrollMarginRight = 5;
                var scrollWidth = this.gameCanvas.jCanvas.width * 0.05;
                var x = this.right - scrollWidth * 1.5 - scrollMarginRight * 2;
                var y = this.top + 27;
                var size = scrollWidth * 0.3;
                // this.countMonteCristo = "fi"
                if ((xClick > x - size) && (xClick < x + size)) {
                    if ((yClick > y - size) && (yClick < y + size) && (event.type == "mouseup")) {
                        this.hide();
                    }
                }
            } else {
                var size = this.gameCanvas.jCanvas.width * 0.015;
                var x = this.right - size - 10;
                var y = this.top + size + 10;
                if ((xClick > x - size) && (xClick < x + size)) {
                    if ((yClick > y - size) && (yClick < y + size) && (event.type == "mouseup")) {
                        this.hide();
                    }
                }
            }
        }

        var result = false;
        if (textSectionClicked) {
            result = true;
        }

        return result;
    }

    handleTextSectionCollision(xClick, yClick, event) {

        var textSectionClicked;

        var textIndex = 0;
        var height = this.marginTop;
        var sectionHeight = []
        var sectionNumber = []
        var i = 0;

        // find out the section height and section number for those currently shown on screen according to this.textStartIndex
        for (var textSection of this.textList) {
            for (var textSnippet of textSection.items) {
                if (textIndex >= this.textStartIndex) {
                    height = height + textSnippet.height + this.marginTop;
                }
                textIndex = textIndex + 1;
            }
            if (textIndex >= this.textStartIndex) {
                sectionHeight.push(height)
                sectionNumber.push(i)
            }

            if (this.shownTextSectionEnd == i) {
                break;
            }

            i = i + 1;
        }

        var xClickBox = xClick - this.left;
        var yClickBox = yClick - this.top;

        // for (var textSection of this.textList) {
        //     for (var text of textSection) {

        //     }
        // }

        var previousHeight = 0;

        if (event.type == "mousemove") {
            i = 0;
            // console.log('movie scene', sectionHeight)
            for (var currentHeight of sectionHeight) {
                if ((xClick > this.left) && (xClick < this.right - 40)) {
                    if ((yClickBox > previousHeight) && (yClickBox < currentHeight)) {
                        if (this.textList[i].selectable) {
                            this.sectionHovered = sectionNumber[i];
                            // console.log('hover movie')
                        }
                    }
                }
                i = i + 1;
                previousHeight = currentHeight;
            }
        } else if (event.type == "mouseup") {
            i = 0;
            // console.log('click x', xClickBox )
            // console.log('click y', yClickBox )
            // console.log('section height', sectionHeight)
            // console.log('text section end', this.shownTextSectionEnd)
            for (var currentHeight of sectionHeight) {
                if ((xClick > this.left) && (xClick < this.right - 40)) {
                    if ((yClickBox > previousHeight) && (yClickBox < currentHeight)) {
                        if (this.textList[i].selectable) {
                            this.sectionClicked = sectionNumber[i];
                            textSectionClicked = this.sectionClicked;
                        }
                    }
                }
                i = i + 1;
                previousHeight = currentHeight;
            }
        }



        return textSectionClicked;
    }

    findTotalHeightIndex() {
        var heightIndex = 0;
        for (var textSection of this.textList) {
            for (var textSnippet of textSection.items) {
                heightIndex = heightIndex + 1;
            }
        }
        return heightIndex
    }

    findTotalHeightPixel() {
        this.positionComputation()

        var heightPixel = this.top + this.marginTop;
        for (var textSection of this.textList) {
            var sectionHeight = 0;
            for (var textSnippet of textSection.items) {
                textSnippet.computeDraw();

                heightPixel = heightPixel + textSnippet.height + this.marginTop;
                sectionHeight = sectionHeight + textSnippet.height + this.marginTop;
            }
            this.textListHeight.push(sectionHeight)
        }
        return heightPixel
    }

    updateSpriteState() {
        this.xOld = this.x;
        this.yOld = this.y;
    }
}

export {
    SpriteTextScrollBox,
};
