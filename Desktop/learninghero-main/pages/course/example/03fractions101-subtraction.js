import React, { useState, useEffect, useContext, useReducer, useRef } from "react";
import ReactDOM from 'react-dom';

import MarkdownCanvas from '../../../components/MarkdownCanvas.component';
import GameCanvas from '../../../components/GameCanvas';
import {Game, SpriteImage, SpriteCharacter} from '../../../actions/GameSprite_not_used';

import Link from 'next/link'


export default function myCanvasEngine() {

    const canvasRef = useRef(null)

    var gameCanvas;
    var sprite1;
    var gameCount = 0;

    useEffect(() => {
        console.log("FX");
        gameCanvas = new Game(canvasRef.current, 940,425);
        gameCanvas.backgroundColor = "blue";

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        console.log(canvas);

        // var img = new Image();   // Create new img element
        // img.crossOrigin = "Anonymous";

        // img.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/braveBoySprite.png'

        // var img2 = new Image();   // Create new img element
        // img2.crossOrigin = "Anonymous";
        // img2.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/zombieSoldier.png'

        // var img3 = new Image();
        // img3.crossOrigin = "Anonymous";
        // img3.src = 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/Character-Smiley.png'


        sprite1 = new SpriteCharacter(gameCanvas, 0,100, 10,10, "smiley")
        // var equation = '\frac{14}{2}'
        // var sprite2 = new SpriteEquation(gameCanvas, 50,50, equation)

        // img3.onload = function() {
        //     sprite1 = new SpriteImage(gameCanvas, 0,100, 10,10, "smiley")
        //     // sprite1.changeSpriteColorTint(0,0,200)  
        //     // sprite1.revertSpriteColorTint()
        //     // sprite1.changeSpriteColorTint(0,200,0)  
        //     // sprite1.changeSpriteColorTint(200,0,200)   
        // }

        const interval = setInterval(gameLoop, 10);
        return () => clearInterval(interval);


    }, [])

    function gameLoop() {
        console.log('game loop');
        // console.log(sprite1.x)
        // sprite1.x = 200;
        // sprite1.changeSpriteColorTint(0,200,0)
        if (gameCount < 1000) {

            sprite1.x = sprite1.x+1;
            sprite1.move(sprite1.x,sprite1.y)
            //sprite1.draw();
            // sprite1.changeSpriteColorTint(0,200,0)
            //sprite1.x = sprite1.x+1;
            // sprite1.draw();
            gameCanvas.refresh();
        }
        gameCount++;

        // add sprite to game object
        // do move for sprite command
        // do a game refresh
    }

    

    return (
        <div>
            <canvas ref={canvasRef} width={940} height={425} />
            <Link href="/course/example/02fractions101-addition"> กลับไป </Link>
            <Link href="/course/example/03fractions101-subtraction"> ต่อไป </Link>
        </div>

    );

}