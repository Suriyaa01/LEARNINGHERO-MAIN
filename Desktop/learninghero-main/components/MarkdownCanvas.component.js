import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function findFrac(canvas, equation) {

    var ctx = canvas.getContext("2d");

    var result = equation.search('\frac')
    
    console.log('result')
    console.log(result)

    if (result >= 0) {
        var brack1_1 = equation.search('{')
        console.log('result')
        console.log(brack1_1)
        var brack1_2 = equation.search('}')
        console.log('result')
        console.log(brack1_2)
        var top = equation.slice(brack1_1+1,brack1_2)
        equation = equation.slice(brack1_2+1, equation.length)
        console.log('result eqn')

        var brack2_1 = equation.search('{')
        var brack2_2 = equation.search('}')
        var bot = equation.slice(brack2_1+1,brack2_2)
        console.log(equation)
        
        if ( top.search('\frac') == -1) {
            ctx.font = "20px Arial";
            ctx.fillText(top , 100, 50);
        }
        if ( bot.search('\frac') == -1) {
            ctx.font = "20px Arial";
            ctx.fillText(bot , 100, 50+20);
        }

    }
}
export default function MarkdownCanvas(canvas, equation) {


    findFrac(canvas, equation);

    return 10

};

