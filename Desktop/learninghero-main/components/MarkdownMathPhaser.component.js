import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';


class PhaserEquationParser {
    constructor(phaser, equation, x, y, font_size) {
        this.equation = equation;
        this.x = x
        this.y = y
        this.font_size = font_size
        // this.finalChildList = []
        // User recursion to fill up all child terms of our main equation
        this.equation = new EquationTerms(equation, 0, 'origin')
        this.equation.findFrac()
        
        this.getFinalChild(this.equation)
        this.findLengths(this.equation.finalChildList)
        

        console.log('first term', this.equation)
        console.log('--------------------------------------------')

        //this.draw(phaser,400,100,32)

        this.equation.drawRecursion2(phaser, x, y, font_size)

        // this.equation.drawRecursion(phaser, x, y, font_size)
        // this.equation.expression = this.equation.original;
        // this.equation.child_draw_index = 0;

        // this.equation.drawRecursion(phaser, x, y-300, font_size)
        // this.equation.expression = this.equation.original;
        // this.equation.child_draw_index = 0;


        console.log('full equation', this.equation)
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
    }

    drawRecursion2(phaser, x, y, font_size) {
        this.font_size = font_size

        var startIndex = 0;
        var childIndex = 0;
        if ( (this.type == 'origin') || (this.type=='fractiontop') || (this.type=='fractionbot') ) {
            console.log("originess", this.child)
            for (var child of this.child) {

                var tempExpression = this.expression.slice(startIndex, this.expression.length)
                console.log('loopter', tempExpression)
                var res = tempExpression.search('\\\\')

                if (res >= 0) {
                    var section1 = tempExpression.slice(0,res)
                    var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                    text.setText(section1);
    
                    x = x+ section1.length*this.font_size*0.6

                    if ( (this.type == 'fractiontop') || (this.type == 'fractionbot') ) {
                        this.child.font_size = this.font_size*0.5
                        this.child[childIndex].drawRecursion2(phaser, x, y+this.font_size*0.2, this.child.font_size)
                        x = x + this.child[childIndex].length * this.font_size * 0.6 *0.5;
                    } else {
                        this.child[childIndex].drawRecursion2(phaser, x, y, this.font_size) 
                        x = x + this.child[childIndex].length * this.font_size * 0.6;                       
                    }
                    // this.child[childIndex].drawRecursion2(phaser, x, y, this.font_size) 
                    // x = x + this.child[childIndex].length * this.font_size * 0.6;     
                    
                    childIndex = childIndex + 1;
                    console.log('booter')   
                    startIndex = res+2;
                } 
            }

            // if there is no children
            if (tempExpression == null) {
                if (this.type == 'fractiontop') {
                    var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                    text.setText(this.expression);                    
                }
                if (this.type == 'fractionbot') {
                    var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                    text.setText(this.expression);                    
                }
                console.log('mings',this)
            } else {
                console.log('finaloo',tempExpression)
                res = tempExpression.search('\\\\')
                var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                text.setText(tempExpression.slice(res+2,tempExpression.length));                    
            }
        }


        else if (this.type == 'fraction') {
            console.log('fractioness', this)
            var frac_line_length = this.length * this.font_size * 0.6
            var line1 = phaser.add.line(0, 0, x, y + this.font_size * 0.5, x + frac_line_length, y + this.font_size * 0.5, 0x00ff00).setOrigin(0, 0)

            var x_original = x;
            if (this.length > this.child[0].length) {
                x = x+ (this.length-this.child[0].length)*0.5*this.font_size*0.6
                this.child[0].drawRecursion2(phaser, x, y - this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
            } else {
                this.child[0].drawRecursion2(phaser, x_original, y - this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
            }


            if (this.length > this.child[1].length) {
                x = x+ (this.length-this.child[1].length)*0.5*this.font_size*0.6
                this.child[1].drawRecursion2(phaser, x, y + this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
            } else {
                this.child[1].drawRecursion2(phaser, x_original, y + this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
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



    drawRecursion(phaser, x, y, font_size) {
        this.font_size = font_size

        if (this.type == 'origin') {
            var res = this.expression.search('\\\\')

            if (res >= 0) {
                // text before fraction
                var section1 = this.expression.slice(0, res)
                var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                text.setText(section1);


                x = x + section1.length * this.font_size * 0.6

                this.child[this.child_draw_index].drawRecursion(phaser, x, y, this.font_size)
                x = x + this.child[this.child_draw_index].length * this.font_size * 0.6

                var section2 = this.expression.slice(res + 2, this.expression.length)
                if (section2.search('\\\\') >= 0) {
                    this.child_draw_index = this.child_draw_index + 1
                    this.expression = section2
                    console.log('expressionista', this)
                    this.drawRecursion(phaser, x, y, this.font_size)
                    // console.log('rekick')
                    // this.child[1].draw(phaser, x, y, this.font_size)
                    // x = x + this.child[1].length * this.font_size * 0.6                    
                } else {
                    var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                    text.setText(section2);
                }

            }

        }
        else if (this.type == 'fraction') {
            var frac_line_length = this.length * this.font_size * 0.6
            var line1 = phaser.add.line(0, 0, x, y + this.font_size * 0.5, x + frac_line_length, y + this.font_size * 0.5, 0x00ff00).setOrigin(0, 0)

            if (this.parent.type != 'origin') {
                this.child[0].drawRecursion(phaser, x, y - this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
                this.child[1].drawRecursion(phaser, x, y + this.font_size * this.y_frac_offset, Math.round(this.font_size * 1))
            } else {
                this.child[0].drawRecursion(phaser, x, y - this.font_size * this.y_frac_offset, this.font_size)
                this.child[1].drawRecursion(phaser, x, y + this.font_size * this.y_frac_offset, this.font_size)
            }

            // this.findLength()
        }
        else if (this.type == 'fractiontop') {
            var res = this.expression.search('\\\\')

            if (res >= 0) {
                var section1 = this.expression.slice(0, res)
                var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                text.setText(section1);

                this.child[this.child_draw_index].drawRecursion(phaser, x + section1.length * this.font_size * 0.6, y, this.font_size)
                x = x + section1.length * this.font_size * 0.6 + this.child[this.child_draw_index].length * this.font_size * 0.6

                var section2 = this.expression.slice(res + 2, this.expression.length)
                if (section2.search('\\\\') >= 0) {

                    this.child_draw_index = this.child_draw_index + 1;
                    this.expression = section2
                    this.drawRecursion(phaser, x, y, this.font_size)
                } else {
                    // this.expression = this.original;
                }
                // var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                // text.setText(section1);
            } else {
                var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                text.setText(this.expression);
            }

        }
        else if (this.type == 'fractionbot') {
            var res = this.expression.search('\\\\')

            if (res >= 0) {
                var section1 = this.expression.slice(0, res)
                var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                text.setText(section1);

                this.child[this.child_draw_index].drawRecursion(phaser, x + section1.length * this.font_size * 0.6, y, this.font_size)

                x = x + section1.length * this.font_size * 0.6 + this.child[this.child_draw_index].length * this.font_size * 0.6

                var section2 = this.expression.slice(res + 2, this.expression.length)
                if (section2.search('\\\\') >= 0) {

                    this.child_draw_index = this.child_draw_index + 1;
                    this.expression = section2
                    this.drawRecursion(phaser, x, y, this.font_size)
                } else {
                    // this.expression = this.original;
                }
                // var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                // text.setText(section1);
            } else {
                var text = phaser.add.text(x, y, '', { font: this.font_size + 'px Courier', fill: '#00ff00' });
                text.setText(this.expression);
            }
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



function findFrac2(phaser, equation, x, y, font_size) {

    var result = equation.search('\frac')
    console.log('res', result)
    if (result >= 0) {
        // find top fraction
        // find bottom fraction    
        var top;
        var bot;

        var slice = equation.slice(result, equation.length)
        var remainder;
        [top, remainder] = findCurlyBracketPair(slice);

        // var bla = equation.search(top)
        //console.log('remainder', bla)
        [bot, remainder] = findCurlyBracketPair(remainder);
        console.log('top', top)
        console.log('bot', bot)

        var frac_line_length = Math.max(top.length, bot.length)
        var line1 = phaser.add.line(0, 0, x, y + font_size * 0.5, x + frac_line_length * font_size * 0.6, y + font_size * 0.5, 0x00ff00).setOrigin(0, 0)

        // var text = phaser.add.text(x, y - font_size*0.5, '', { font: font_size+'px Courier', fill: '#00ff00' });
        // text.setText( top );
        // var text = phaser.add.text(x, y + font_size*0.5, '', { font: font_size+'px Courier', fill: '#00ff00' });
        // text.setText( bot );

        result = top.search('\frac')
        if (result >= 0) {
            console.log('fracker', top)
            findFrac3(phaser, top, x + 250, y, font_size)
            // slice = top.slice(result, top.lenght)
            // var remainder;
            // [top, remainder] = findCurlyBracketPair(slice);
            // console.log('slicier', slice)
            // [bot,remainder] = findCurlyBracketPair(remainder);
            // console.log('top',top)
            // console.log('bot',bot)

        }
    }
}

function findFrac3(phaser, equation, x, y, font_size) {

    var result = equation.search('\frac')
    console.log('res', result)
    if (result >= 0) {
        // find top fraction
        // find bottom fraction    
        var top;
        var bot;

        var slice = equation.slice(result, equation.length)
        var remainder;
        [top, remainder] = findCurlyBracketPair(slice);

        // var bla = equation.search(top)
        //console.log('remainder', bla)
        [bot, remainder] = findCurlyBracketPair(remainder);
        console.log('top', top)
        console.log('bot', bot)

        var frac_line_length = Math.max(top.length, bot.length)
        var line1 = phaser.add.line(0, 0, x, y + font_size * 0.5, x + frac_line_length * font_size * 0.6, y + font_size * 0.5, 0x00ff00).setOrigin(0, 0)
        var text = phaser.add.text(x, y - font_size * 0.5, '', { font: font_size + 'px Courier', fill: '#00ff00' });
        text.setText(top);
        var text = phaser.add.text(x, y + font_size * 0.5, '', { font: font_size + 'px Courier', fill: '#00ff00' });
        text.setText(bot);

        result = top.search('\frac')
        if (result >= 0) {
            console.log('fracker', top)
        }

    }
}

function findCurlyBracketPair(slice) {

    var resultingSlice = '';
    var remainderSlice = '';
    var count = 0;
    var start = 0;
    var startIndex;
    var endIndex;

    console.log('slice', slice)
    console.log('slice length', slice.length)
    // loop starting from position of '{' a matching '}' is found. add count +1 for every new '{' found and count -1 for '}' found  
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
            console.log('blasphemy', endIndex)
            resultingSlice = slice.slice(startIndex, endIndex)
            remainderSlice = slice.slice(endIndex, slice.length)
            console.log('resultingSlice', resultingSlice)
            console.log('remainingSlice', remainderSlice)
            break
        }
        console.log('i', slice[i])
    }
    return [resultingSlice, remainderSlice]
}


export default function MarkdownMathPhaser(phaser, equation, x, y, font_size) {

    var myparser = new PhaserEquationParser(phaser, equation, x, y, font_size)
    console.log('myparser', myparser)

    //findFrac2(phaser, equation, x, y, font_size);

    return 10

};

