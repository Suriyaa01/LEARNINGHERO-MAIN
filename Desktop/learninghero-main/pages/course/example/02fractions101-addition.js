import React, { useState, useEffect, useContext, useReducer, useRef } from "react";

import ReactDOM from 'react-dom';

import Markdown from '../../../components/Markdown.component';
import MarkdownCanvas  from '../../../components/MarkdownCanvas.component';

import { BlockMath, InlineMath } from 'react-katex';

import Link from 'next/link'


import styles from '../../styles.module.css'

const content = `
$$
s = ut + \\frac{1}{2}at^{2}
$$
$$
\\int_0^\\infty x^2 dx
$$
$$
\\frac{\\text{m}}{\\text{s}^2}
$$
Calculate the value of $s$ when $u = 10\\frac{m}{s}$ and $a = 2\\frac{m}{s^{2}}$ at $t = 1s$
`;


export default function mathJaxExp() {

    var topLeft = 10000;
    const canvasRef = useRef(null)
    const hRef = useRef(null)

    const draw = ctx => {
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20, 0, 2 * Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        console.log("FX");

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        console.log(canvas.getBoundingClientRect().y)

        // topLeft = 1000;
        
        //Our draw come here
        draw(context)
        const equation = '\frac{14}{2}'
        MarkdownCanvas(canvas, equation);

    }, [draw])



    return (
        <div>
            {/* <MarkdownCanvas equation={"hello bombastix"}> </MarkdownCanvas> */}

            <h3 style={{ fontFamily: "Helvetica", fontSize: "22px" }}>  <Markdown >{`ยกตัวอย่างเอา $\\frac{1}{2} + \\frac{1}{2}$`}</Markdown> </h3>
            <h4 style={{position:"static", top:600 }}> การบวกเศษส่วนนั้น เราจะต้องใช้เศษส่วนที่มีฐานที่เท่ากัน จะทําให้การบวกนั้นง่าย </h4>

            <canvas ref={canvasRef} width={640} height={425} />


            <h4 className={styles.my_h4}>
                <Markdown >{content}</Markdown>
            </h4>

            <BlockMath>{`\\frac{\\text{m}}{\\text{s}^2}`}</BlockMath>

            <BlockMath>{'abc+\\frac{5+4+3+\\frac{22+\\frac{1}{4}}{9}}{3}+45'}</BlockMath>

            <Link href="/course/example/01fractions101-intro"> กลับไป </Link>
            <Link href="/course/example/testThreeJSlibrary"> ต่อไป </Link>
        </div>

    );

}