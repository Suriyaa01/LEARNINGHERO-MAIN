import React, { useState, useEffect, useContext, useReducer, useRef } from "react";
import ReactDOM from 'react-dom';
// import Phaser from "phaser";


import { Loop, Stage } from 'react-game-kit';

import MarkdownCanvas from '../../../components/MarkdownCanvas.component';


export default function phaserJSexp() {

    const canvasRef = useRef(null)

    const [canvas1Status, setCanvas1Status] = useState(false);



    // const draw = ctx => {
    //     ctx.fillStyle = '#000000'
    //     ctx.beginPath()
    //     ctx.arc(50, 100, 20, 0, 2 * Math.PI)
    //     ctx.fill()
    // }

    function preload() {


        this.load.setBaseURL('http://labs.phaser.io');

        this.load.image('star', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');

        this.load.image('ground', 'assets/sprites/platform.png');
        this.load.image('diamond', 'assets/sprites/diamond.png');
        this.load.image('sky', 'assets/skies/sky2.png');

        this.load.crossOrigin=''
        this.load.image('me', 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/zombieSoldier.png');

        this.load.spritesheet('dude',
            'assets/sprites/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );

    }

    var platforms;
    var player;
    var diamonds;
    var diamondTint;
    var me;

    function create() {

        // this.add.dom(300, 0, 'div', 'background-color: lime; width: 220px; height: 100px; font: 48px Arial', 'Phaser');


        this.add.image(400, 300, 'sky');


        diamonds = this.physics.add.staticGroup();

        platforms = this.physics.add.staticGroup();
        me = this.physics.add.staticGroup();

        me.create(150,150, 'me')
        diamonds.create(400, 300, 'diamond');
        diamonds.create(500, 450, 'diamond');

        console.log('diamonds are g best friend')
        console.log(diamonds)


        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');


        player = this.physics.add.sprite(100, 450, 'dude');
        diamondTint =  this.physics.add.sprite(300, 450, 'diamond').setInteractive();
        diamondTint.setTint(0x08E264);

        diamondTint.on('pointerup', changeTint);
        
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.body.setGravityY(100)

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(diamondTint, platforms);


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        // this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        // const equation = '\frac{14}{2}'
        // MarkdownCanvas(this, equation);

        // this.physics.add.collider(player, diamond);
        // this.physics.add.overlap(player, diamond, collectDiamond, null, this);

        this.physics.add.overlap(player, diamonds, collectDiamond)



        // var particles = this.add.particles('red');

        // var emitter = particles.createEmitter({
        //     speed: 100,
        //     scale: { start: 1, end: 0 },
        //     blendMode: 'ADD'
        // });

        // var logo = this.physics.add.image(400, 100, 'logo');

        // logo.setVelocity(1, 2);
        // //logo.setBounce(1, 1);
        // logo.setCollideWorldBounds(true);

        // console.log("loopydoop")

        // emitter.startFollow(logo);
        return (
            <div>
                asdf
            </div>
        )
    }

    function changeTint() {
        this.setTint(0xE20847);
        console.log('lousy mousy')
    }

    var game;


    var stickyList = [];
    var collisionFlag = 0;
    var stickyDiamond;
    function collectDiamond(player, diamond) {

        if (!collisionFlag) {
            diamond.disableBody(true, true);
            stickyDiamond = diamonds.create(diamond.x-100, 450, 'diamond');
            collisionFlag = 1;
    
            // diamond.x=10;
    
            // stickyList.push(diamond)
            console.log('collide')
            console.log(diamonds);
        }

    }



    function update() {

        console.log(this)
        // game.destroy()
        if (collisionFlag == 1) {
            this.physics.add.collider(player, diamonds, collectDiamond)
            stickyDiamond.x = player.x;
            stickyDiamond.y = player.y;
            //collisionFlag=0;
        }


        var cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }

    }

    useEffect(() => {

        setCanvas1Status(true)
        // var config = {
        //     type: Phaser.AUTO,
        //     width: 800,
        //     height: 600,
        //     physics: {
        //         default: 'arcade',
        //         arcade: {
        //             gravity: { y: 200 }
        //         }
        //     },
        //     scene: {
        //         preload: preload,
        //         create: create,
        //         update: update
        //     }
        // };


        // game = new Phaser.Game(config);

    }, [])

    function phaserCanvas1() {      
        if (canvas1Status) {
            var config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 200 }
                    }
                },
                dom: {
                    createContainer: true
                },
                scene: {
                    preload: preload,
                    create: create,
                    update: update
                }
            };
            game = new Phaser.Game(config);

            var style = {
                'background-color': 'lime',
                'width': '220px',
                'height': '100px',
                'font': '48px Arial',
                'font-weight': 'bold'
            };
            // var element = game.add.dom(400, 300, 'div', style, 'Phaser 3');
        }
        console.log('Phaser Canvas 1')
    }

 



    return (
        <div>
            <script src="//cdn.jsdelivr.net/npm/phaser@3.51.0/dist/phaser.js"></script>

            {/* <canvas ref={canvasRef} width={640} height={425} /> */}
            <p> hello </p>

            {phaserCanvas1()}

            <div style={{position:"fixed", top:650}}>
                <p> bye bye</p>
            </div>

        </div>

    );

}