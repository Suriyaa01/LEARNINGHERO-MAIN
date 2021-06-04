import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';


class CanvasEquationParser {
    constructor(canvas, equation, x, y) {
        this.equation = equation;
        this.x = x
        this.y = y

        this.ctx = canvas.getContext("2d");
        // this.finalChildList = []
        // User recursion to fill up all child terms of our main equation
        this.equation = new EquationTerms(equation, 0, 'origin')
        this.equation.findFrac()
        
        this.getFinalChild(this.equation)
        this.findLengths(this.equation.finalChildList)
        console.log('find length', this.equation)

        this.findHeight()
        // console.log('first term', this.equation)
        // console.log('--------------------------------------------')

        // console.log('full equation', this.equation)
    }

    findHeight() {
        var res = this.equation.expression.search('\\\\')
        console.log('find height', this.equation.expression)
        if (res == -1) {
            this.height = 1;
        } else {
            this.height = 2;
        }
    }

    getFinalChild(equation) {
        var finalChildList = []
        if (equation.child.length > 0) {
            for (var child of equation.child) {
                console.log('child', child)
                this.getFinalChild(child)
                if (child.child.length == 0) {
                    // finalChildList.push(child)
                    this.equation.finalChildList.push(child)
                }
            }
        }
        console.log('final children list', this.equation.finalChildList)

        for (var eqnTerm of this.equation.finalChildList) {
            eqnTerm.length = eqnTerm.expression.length
        }
        return finalChildList;
    }

    findLengths(finalChildList) {
        console.log('rhino', finalChildList)
        for (var eqnTerm of finalChildList) {
            console.log('eqnTerm', eqnTerm)
            if (eqnTerm.type == 'fractiontop') {
                if (eqnTerm.child.length > 0) {
                    var x = eqnTerm.expression.length - 2*(eqnTerm.child.length);
                    for (var item of eqnTerm.child) {
                        x = x + item.length/2;
                    }
                    eqnTerm.length = x;
                } else {
                    eqnTerm.length = eqnTerm.expression.length;
                }
            }
            if (eqnTerm.type == 'fractionbot') {
                if (eqnTerm.child.length > 0) {
                    var x = eqnTerm.expression.length - 2*(eqnTerm.child.length);
                    for (var item of eqnTerm.child) {
                        x = x + item.length/2;
                    }
                    eqnTerm.length = x;
                } else {
                    eqnTerm.length = eqnTerm.expression.length;
                }
            }
            if (eqnTerm.type == 'fraction') {
                if (eqnTerm.child[0].length > eqnTerm.child[1].length) {
                    eqnTerm.length = eqnTerm.child[0].length
                } else {
                    eqnTerm.length = eqnTerm.child[1].length
                }
            }
            if (eqnTerm.type != 'origin') {
                console.log('next', eqnTerm.type)
                this.findLengths([eqnTerm.parent]);
            } else {
                var x = eqnTerm.expression.length - 2*(eqnTerm.child.length);
                for (var item of eqnTerm.child) {
                    x = x + item.length;
                }
                eqnTerm.length = x
            }
        }
    }

}

class EquationTerms {
    constructor(expression, parent, type) {
        this.expression = expression;
        this.parent = parent
        this.child = []
        this.type = type
        this.placeholder;
        this.length = -1;
        this.y_frac_offset = 0.5
        this.font_size;
        this.child_draw_index = 0;
        this.original = expression;
        this.finalChildList = []

        this.lengthScaleFactor = 0.6
    }

    drawRecursion(ctx, x, y, font_size) {
        // console.log("gagabot")
        this.font_size = font_size
        ctx.font = String(this.font_size)+"px Arial"
        // ctx.fillStyle = "red";


        var startIndex = 0;
        var childIndex = 0;
        if ( (this.type == 'origin') || (this.type=='fractiontop') || (this.type=='fractionbot') ) {
            // console.log("originess", this.child)
            for (var child of this.child) {

                var tempExpression = this.expression.slice(startIndex, this.expression.length)
                // console.log('loopter', tempExpression)
                var res = tempExpression.search('\\\\')

                if (res >= 0) {
                    var section1 = tempExpression.slice(0,res)
                    // var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                    // text.setText(section1);      
                    ctx.font = String(this.font_size)+"px Arial"                   
                    ctx.fillText(section1, x, y);
                    // console.log('section1', section1+'x')

    
                    x = x+ section1.length*this.font_size*this.lengthScaleFactor 

                    if ( (this.type == 'fractiontop') || (this.type == 'fractionbot') ) {
                        this.child.font_size = this.font_size*0.5
                        this.child[childIndex].drawRecursion(ctx, x, y-this.font_size*0.2, this.child.font_size)
                        x = x + this.child[childIndex].length * this.font_size * this.lengthScaleFactor *0.5;
                    } else {
                        this.child[childIndex].drawRecursion(ctx, x, y, this.font_size) 
                        x = x + this.child[childIndex].length * this.font_size * this.lengthScaleFactor ;                       
                    }
                    // this.child[childIndex].drawRecursion2(phaser, x, y, this.font_size) 
                    // x = x + this.child[childIndex].length * this.font_size * 0.6;     
                    
                    childIndex = childIndex + 1;
                    // console.log('booter')   
                    startIndex = res+2;
                } 
            }

            // if there is no children
            if (tempExpression == null) {
                if (this.type == 'fractiontop') {
                    // var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                    // text.setText(this.expression);    
                    ctx.font = String(this.font_size)+"px Arial"       
                    ctx.fillText(this.expression, x, y);                
                }
                if (this.type == 'fractionbot') {
                    // var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                    // text.setText(this.expression);  
                    ctx.font = String(this.font_size)+"px Arial"       
                    ctx.fillText(this.expression, x, y);
                  
                }
                // console.log('mings',this)
            } else {
                // console.log('finaloo',tempExpression)
                // console.log('fontSize', this.font_size)
                res = tempExpression.search('\\\\')
                // var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                // text.setText(tempExpression.slice(res+2,tempExpression.length)); 

                ctx.font = String(this.font_size)+"px Arial"                
                ctx.fillText( tempExpression.slice(res+2,tempExpression.length), x, y);
                   
            }
        }


        else if (this.type == 'fraction') {
            // console.log('fractioness', this)
            var frac_line_length = this.length * this.font_size * 0.6
            // var line1 = phaser.add.line(0, 0, x, y + this.font_size * 0.5, x + frac_line_length, y + this.font_size * 0.5, 0x00ff00).setOrigin(0, 0)
            ctx.beginPath();
            ctx.moveTo(x, y - this.font_size * 0.35);
            ctx.lineTo(x + frac_line_length, y - this.font_size * 0.35);
            // ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.stroke();


            var x_original = x;
            if (this.length > this.child[0].length) {
                x = x+ (this.length-this.child[0].length)*0.5*this.font_size*0.6
                this.child[0].drawRecursion(ctx, x, y - this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
            } else {
                this.child[0].drawRecursion(ctx, x_original, y - this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
            }


            if (this.length > this.child[1].length) {
                x = x+ (this.length-this.child[1].length)*0.5*this.font_size*0.6
                this.child[1].drawRecursion(ctx, x, y + this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
            } else {
                this.child[1].drawRecursion(ctx, x_original, y + this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
            }

            // if (this.parent.type != 'origin') {
            //     this.child[0].drawRecursion2(phaser, x, y - this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
            //     this.child[1].drawRecursion2(phaser, x, y + this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
            // } else {
            //     this.child[0].drawRecursion2(phaser, x, y - this.font_size * this.y_frac_offset, this.font_size)
            //     this.child[1].drawRecursion2(phaser, x, y + this.font_size * this.y_frac_offset, this.font_size)
            // }
        }
    }

    // Find full fraction expression without sepearting top and bottom terms
    findFrac() {
        var result = this.expression.search('\frac')

        var frac_found = 0;
        // while (result >= 0) {
        if (result >= 0) {
            var slice = this.expression.slice(result, this.expression.length)

            var count = 0;
            var start1 = 0;
            var start2 = 0;
            var endIndex;
            var pairFound = 0
            for (var i = result; i < this.expression.length; i++) {
                if (this.expression[i] == '{') {
                    if (start1 == 0) {
                        start1 = 1;
                        // startIndex = i + 1;
                    }
                    if ((start1 == 1) && (count == 0) && (pairFound == 1)) {
                        start2 = 1
                    }
                    count = count + 1;
                }
                if (this.expression[i] == '}') {
                    count = count - 1;
                }
                if ((start1 == 1) && (count == 0)) {
                    pairFound = 1
                }
                if ((start2 == 1) && (count == 0)) {
                    endIndex = i;
                    frac_found = 1;
                    break;
                }
            }
        } else {
            // We are now at bottom of tree where we know the length of the final term. Traverse up the tree to define lenght of all upper branches.
            // this.traverseUpTreeToFindLenghts()
        }

        if (frac_found == 1) {
            //console.log('full', this.expression)
            //console.log('omega', this.expression.slice(0,result) + 'child' + this.expression.slice(endIndex+1,this.expression.length))
            // adjust original expression to include 'child', this tells us index position of child in the orginal expression
            var fraction_term = this.expression.slice(result, endIndex + 1)
            this.expression = this.expression.slice(0, result) + '\\\\' + this.expression.slice(endIndex + 1, this.expression.length)
            this.child.push(new EquationTerms(fraction_term, this, 'fraction'))

            this.child[this.child.length - 1].findFracChild()


            // check if the main expression have remaining fraction terms
            result = this.expression.search('\frac')
            if (result >= 0) {
                this.findFrac();
            }
        } else {
            result = -1;
        }

    }

    traverseUpTreeToFindLenghts() {
        this.length = this.expression.length
        if (this.length > this.parent.length) {
            this.parent.length = this.length
        }
        var new_parent = this.parent
        while (new_parent.parent != 0) {
            if (new_parent.parent.type == 'fraction') {
                if (new_parent.length > new_parent.parent.length) {
                    new_parent.parent.length = new_parent.length
                }
            }
            if ((new_parent.parent.type == 'fractiontop') || (new_parent.parent.type == 'fractionbot')) {

                // if top fraction has no children, its lenght is equal to its expression
                if (new_parent.child.length == 0) {
                    new_parent.parent.length == new_parent.expression.length
                    // else top fraction length is the sum of childrens lenghts plus its own expression length
                } else {
                    //new_parent.parent.length = new_parent.parent.expression.length-2 + new_parent.expression.length
                    var x = new_parent.parent.expression.length - 2 * (new_parent.parent.child.length)

                    // for (var child of new_parent.parent.child) {
                    //     console.log('child length', child)
                    //     x = x+child.length
                    // }

                    new_parent.parent.length = x
                    // if (x > new_parent.parent.length) {
                    //     new_parent.parent.length = x
                    // }

                }
            }
            if (new_parent.parent.type == 'origin') {
                if (new_parent.child.length == 0) {
                    new_parent.parent.length == new_parent.expression.length
                } else {
                    new_parent.parent.length = new_parent.parent.expression.length - 2 + new_parent.length
                    var x = new_parent.expression.length
                }
            }

            new_parent = new_parent.parent
        }
    }

    // Find bottom and top term of fraction and add them to children of the fraction term
    findFracChild() {
        var result = this.expression.search('\frac')


        var top = '';
        var bot = '';
        var frac_found = 0;
        if (result >= 0) {
            var slice = this.expression.slice(result, this.expression.length)
            var remainder;

            [top, remainder] = this.findCurlyBracketPair(slice);
            [bot, remainder] = this.findCurlyBracketPair(remainder);

            frac_found = 1;
        }
        if (frac_found == 1) {
            console.log('this', this)
            this.expression = '\\\\'
            this.child.push(new EquationTerms(top, this, 'fractiontop'))
            this.child.push(new EquationTerms(bot, this, 'fractionbot'))

            this.child[0].findFrac()
            this.child[1].findFrac()
        }
        // return [frac_found, top,bot]
    }

    findCurlyBracketPair(slice) {

        var resultingSlice = '';
        var remainderSlice = '';
        var count = 0;
        var start = 0;
        var startIndex;
        var endIndex;


        for (var i = 0; i < slice.length; i++) {
            if (slice[i] == '{') {
                count = count + 1;
                if (start == 0) {
                    start = 1;
                    startIndex = i + 1;
                }
            }
            if ((slice[i] == '}') && (start == 1)) {
                count = count - 1;
                endIndex = i;
            }
            if ((start == 1) && (count == 0)) {
                resultingSlice = slice.slice(startIndex, endIndex)
                remainderSlice = slice.slice(endIndex, slice.length)
                break
            }
        }
        return [resultingSlice, remainderSlice]
    }
}


export default function MarkdownMathCanvas(canvas, equation, x, y) {

    var myparser = new CanvasEquationParser(canvas.canvas, equation, x, y)
    console.log('myparser', myparser)

    //findFrac2(phaser, equation, x, y, font_size);

    return myparser

};

