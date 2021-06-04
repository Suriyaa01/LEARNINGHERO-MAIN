import React, { useEffect, useState, createRef, useRef, useInterval } from 'react';

import { PropertySafetyFilled } from '@ant-design/icons'
import Link from 'next/link'

import {Game, SpriteImage, SpriteCharacter, SpriteEquation, SpriteTextScrollBox, GameJoystick, SpriteText} from '../actions/ClassGameEngine';
import MarkdownMathCanvas from '../actions/MarkdownMathCanvas';


export default class GameCanvas extends React.Component {
  constructor(props) {
    super(props);
    // console.log('props',props)
    this.myRef = React.createRef();
    this.state = {
      // gameCanvas: new Game(canvasRef.current, props.width, props.height),
      // ref: useRef(null),
      color: "red",
      year: 1964,
      count: 0
    };
    this.gameCanvas = 6;
    this.sprite1;
    this.eqn1;
    this.fullScreen = false;
    this.keypress = 0;
    this.gameInterval;

  }

  _handleKeyDown = (event) => {
    // only handle key inputs if hero is in scene
    // if (this.gameCanvas.checkHeroInScene()) {
      if (event.keyCode == 68) {
        this.sprite1.xVel = 1
      }
      else if (event.keyCode == 65) {
        this.sprite1.xVel = -1;
      }  
      else if (event.keyCode == 87) {
        if (this.sprite1.yVel == 0) {
          this.sprite1.yVel = - 2
        }
      }
      this.keypress = event.key;
    // } else {
    //   this.keypress = 0;
    // }

  }

  _handleKeyUp = (event) => {
    // only handle key inputs if hero is in scene
    // if (this.gameCanvas.checkHeroInScene()) {
      if (event.keyCode == 68) {
        this.sprite1.xVel = 0;
      }
      else if (event.keyCode == 65) {
        this.sprite1.xVel = 0;
      }  
      this.keypress = 0;
    // } else {
    //   this.keypress = 0;
    // }

  }

  componentWillUnmount() {
    clearInterval(this.gameInterval);
  }


  componentDidMount() {
    // console.log('mason mount', this.gameCanvas)
    this.gameCanvas = new Game(this.myRef, 300, 200, "home");
    this.sprite1 = new SpriteCharacter(this.gameCanvas, 50, 50, 10, 10, "squareSpriteRed")
    this.sprite1.id = 'hero'

    this.joystickSprite = new GameJoystick(this.gameCanvas, this.sprite1)

    // Start Game in Scene=1
    this.gameCanvas.sceneIndex = 1;

    // Assets for "Main Menu Scene": Scene=1 
    this.eqn1 = new SpriteEquation(this.gameCanvas, 60, 50, 30, 'abc+\frac{\frac{1}{2}+7+\frac{1+\frac{1}{2}}{2}}{5}')
    // this.sprite1 = new SpriteCharacter(this.gameCanvas, 50, 50, 20, 20, "rabbit")

    this.ground1 = new SpriteCharacter(this.gameCanvas, 0, 81, 100, 22, "platform")
    this.ground1.backgroundColor = 'rgba(255, 0, 0, 0)';
    this.ground1.strokeColor = 'rgba(255, 0, 0, 0)';
    this.ground2 = new SpriteCharacter(this.gameCanvas, 30, 50, 40, 5, "platform")
    this.ground2.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    this.ground2.strokeColor = 'rgba(255, 0, 0, 0)';
    this.hut3 = new SpriteCharacter(this.gameCanvas, 58.5, 67.5, 6.5, 12, "platform")
    this.hut3.collidable = false;
    this.hut3.backgroundColor = 'rgba(255, 165, 0, 0)';
    this.hut3.strokeColor = 'rgba(255, 165, 0, 0)';

    this.text1 = new SpriteText(this.gameCanvas, 59, 66.5, "บ้านภารกิจ", 12)
    this.text1.hide();

    this.gameCanvas.addScene("home") // scene 1
    this.gameCanvas.addScene("questmenu") // scene 2

    // this.gameCanvas.sceneList[1].spriteList.push(this.eqn1)
    this.gameCanvas.sceneList[1].spriteList.push(this.sprite1)
    this.gameCanvas.sceneList[1].spriteList.push(this.ground1)
    this.gameCanvas.sceneList[1].spriteList.push(this.ground2)
    this.gameCanvas.sceneList[1].spriteList.push(this.hut3)
    this.gameCanvas.sceneList[1].spriteList.push(this.text1)


    // Assets for "Quest Menu Scene": Scene=2 
    // this.questText0 = new SpriteEquation(this.gameCanvas, 25, 30, 25, "1. ภารกิจถํ้าเศษส่วน")
    // this.questText1 = new SpriteEquation(this.gameCanvas, 25, 30, 25, "1. ภารกิจถํ้าเศษส่วน")
    // this.questText2 = new SpriteEquation(this.gameCanvas, 25, 35, 25, "2. ภารกิจถํ้าเลขาคณิต")
    // this.questText3 = new SpriteEquation(this.gameCanvas, 25, 40, 25, "3. ป่าสมการ")



    // Text for Quest Menu
    this.spriteText1 = new SpriteText(this.gameCanvas, 20, 30, "ภารกิจ", 14)
    this.spriteText2 = new SpriteText(this.gameCanvas, 20, 30, "1.ถํ้าเศษส่วน", 12)
    this.spriteText3 = new SpriteText(this.gameCanvas, 20, 30, "ตะลุยุถํ้าเศษส่วน และช่วยเพื่อน", 11)
    this.spriteText4 = new SpriteText(this.gameCanvas, 20, 30, "ที่ติด หาทางออกจากถํ้า", 11)
    this.spriteText5 = new SpriteText(this.gameCanvas, 20, 30, "2.ป่าสมการดงดิบ", 12)
    this.spriteText6 = new SpriteText(this.gameCanvas, 20, 30, "มาเรียนเศษส่วนกันดีกว่า มาสร้าง", 11)
    this.spriteText7 = new SpriteText(this.gameCanvas, 20, 30, "แล้วคํานวนดูว่ามันฟิตเข้ากล่อง", 11)
    this.spriteText8 = new SpriteText(this.gameCanvas, 20, 30, "3.ทะเลทรายเปอร์เซ็นต์", 12)
    this.spriteText9 = new SpriteText(this.gameCanvas, 20, 30, "มาเรียนเศษส่วนกันดีกว่า มาสร้าง", 11)
    this.spriteText10 = new SpriteText(this.gameCanvas, 20, 30, "แล้วคํานวนดูว่ามันฟิตเข้า", 11)
    
    // Create text box for quests
    this.questScrollBox = new SpriteScrollBox(this.gameCanvas, 25, 14, 50, 68, 'rgba(0,0,0,0)')
    this.questScrollBox.id = 'questmenu'
    this.questScrollBox.highlightColor='rgba(247,233,115,0.5)'
    this.questScrollBox.clickColor='rgba(247,233,115,100)'
    this.questScrollBox.fontColor='rgba(68,49,22,100)'
    this.questScrollBox.scrollable=true;
    this.questScrollBox.closeButton = false;

    // Add text grroups to text box
    this.questScrollBox.addGroup( [this.spriteText1] , false );
    this.questScrollBox.addGroup( [this.spriteText2, this.spriteText3, this.spriteText4] , true);
    this.questScrollBox.addGroup( [this.spriteText5, this.spriteText6, this.spriteText7] , true);
    this.questScrollBox.addGroup( [this.spriteText8, this.spriteText9, this.spriteText10] , true);

    // Close cross sign button fro exiting scene
    this.crossSign = new SpriteCharacter(this.gameCanvas, 95, 5, 5, 5, "crosssign")
    this.crossSign.id = 'closequestmenu'
    this.crossSign.gravity = false;

    // Add sprites to scene 2
    this.gameCanvas.sceneList[2].spriteList.push(this.questScrollBox)
    this.gameCanvas.sceneList[2].spriteList.push(this.crossSign)



    this.gameCanvas.refresh();
    // this.text1.setPositionAnchor(60.25, 67, "center")


    document.addEventListener("keydown", this._handleKeyDown.bind(this));
    document.addEventListener("keyup", this._handleKeyUp.bind(this));

    this.gameCanvas.setSceneNumber(2);

    this.gameInterval = setInterval(this.gameLoop, 50);
  }

  gameLoop = () => {
    // console.log('gameloop', this.state.count)
    if (this.state.count > -1) {
      this.gameCanvas.refresh();

      // check collision between main player and hut3
      var result = this.gameCanvas.rectanglePairCollision(this.hut3, this.sprite1) 
      if (result) {
        this.hut3.strokeColor = 'rgba(0, 50, 255, 0.5)';
        this.hut3.backgroundColor = 'rgba(255, 165, 0, 0.5)'
        this.text1.show();
        if  (this.keypress == 'l') {
          this.hut3.strokeColor = 'rgba(0, 50, 255, 0.5)';
          this.hut3.backgroundColor = 'rgba(0, 255, , 0.5)'
          this.gameCanvas.sceneIndex = 2;
        }
    
        // if (this.joystickController) {
        //   if  (this.joystickSprite.state.c) {
        //     this.hut3.strokeColor = 'rgba(0, 50, 255, 0.5)';
        //     this.hut3.backgroundColor = 'rgba(0, 255, , 0.5)';
        //     this.gameCanvas.sceneIndex = 2;
        //   }
        // }

      } 
      else {
        this.hut3.strokeColor = 'rgba(255, 0, 0, 0)';
        this.hut3.backgroundColor = 'rgba(255, 165, 0, 0)'
        this.text1.hide();
      }

    }

    this.setState({count: this.state.count+1});
  }

  handleCanvasClick = (event) => {
    // console.log('canvas click', event)
    // console.log(this.state.count)
    var mySound = new this.sound('https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/bang.mp3');
    // mySound.play()

    var rect = event.target.getBoundingClientRect()
    var xClick = event.clientX - rect.left;
    var yClick = event.clientY - rect.top;
    var collisionList = this.gameCanvas.checkClickCollision(xClick,yClick,event)

    if (this.gameCanvas.sceneIndex == 2) {
      var res = collisionList.filter( item => item.character == "crosssign")
      if (res.length > 0) {
        this.gameCanvas.sceneIndex = 1;
      }
    }


  }

  _onMouseMove(event) {
    var rect = event.target.getBoundingClientRect()
    var xClick = event.clientX - rect.left;
    var yClick = event.clientY - rect.top;
    this.gameCanvas.onMouseMove(xClick,yClick, event);

    // this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  handleKeyPress(e) {
    // console.log("key press")
  }

  handleMouseDown(event) {
    var rect = event.target.getBoundingClientRect()
    var xClick = event.clientX - rect.left;
    var yClick = event.clientY - rect.top;
    var collisionList = this.gameCanvas.checkClickCollision(xClick,yClick,event)
    console.log('mousedown', collisionList)

    this.joystickSprite.checkSpriteInScene();

    for (var item of collisionList) {
      if (item.id == "questmenu") {
        console.log('wokraja!', item.sectionClicked)
        if (item.sectionClicked == 1) {
          window.location.href = 'https://global.espn.com/football/';
        }
      }
      if (item.id == 'closequestmenu') {
        this.gameCanvas.setSceneNumber(1);
      }
    }
  }

  handleMouseUp(event) {
    var rect = event.target.getBoundingClientRect()
    var xClick = event.clientX - rect.left;
    var yClick = event.clientY - rect.top;
  }


  handleTouchUp(event) {
    this.gameCanvas.checkTouchCollision( event.touches, event)
  }

  handleTouchDown(event) {
    // console.log('mouse down event', event.type)
    this.gameCanvas.checkTouchCollision(event.touches, event)
  }






  render() {
    return (
      <div>
        {/* <h1>Hello amigo</h1> */}

          <canvas onMouseMove={this._onMouseMove.bind(this)} onMouseUp={this.handleMouseDown.bind(this)} onMouseDown={this.handleMouseUp.bind(this)} onTouchStart={this.handleTouchDown.bind(this)}  onTouchEnd={this.handleTouchUp.bind(this)}  ref={this.myRef} style={{WebkitTouchCallout:"none", backgroundColor:"white"}}/>


        {/* {this.fullScreen?
            <>
              <canvas onKeyPress={this.handleKeyPress} onMouseMove={this._onMouseMove.bind(this)}  onMouseUp={this.handleMouseUp.bind(this)} onMouseDown={ (event) => {this.handleCanvasClick(event)} } ref={this.myRef} width={document.documentElement.clientWidth} height={document.documentElement.clientHeight} style={{position:"fixed", top:-0, left:0, zIndex:10, backgroundColor:"white"}}/>
            </>
          :
          <canvas onKeyPress={this.handleKeyPress} onMouseMove={this._onMouseMove.bind(this)}  onMouseUp={this.handleMouseUp.bind(this)} onMouseDown={ (event) => {this.handleCanvasClick(event)} } ref={this.myRef} width={this.props.width} height={this.props.height} style={{backgroundColor:"white"}}/>
        } */}

        {/* <img src="/run.png" alt="my image" /> */}
      </div>
      )
  }
}










// export default function GameCanvas(props) {

//   const canvasRef = useRef(null)

//   const [clickEvent, setClickEvent] = useState(false);
//   let [count, setCount] = useState(0);

//   var gameCanvas=0; // = new Game(canvasRef.current, props.width, props.height);;
//   var sprite1;
//   var gameCount = 0;




//   useEffect(() => {
//       console.log("FX", gameCount);
//       gameCanvas = new Game(canvasRef.current, props.width, props.height);
//       gameCanvas.backgroundColor = "blue";

//       console.log('create game canvas', gameCanvas.canvas.width)

//       // const canvas = canvasRef.current;
//       // const context = canvas.getContext('2d');
//       // console.log(canvas);

//       sprite1 = new SpriteCharacter(gameCanvas, 50, 50, 10, 10, "smiley")
//       // var equation1 = new SpriteEquation(gameCanvas, 0, 100, 40, 'abc+\frac{\frac{1}{2}+7+\frac{1+\frac{1}{2}}{2}}{5}')


//       var ctx = canvasRef.current.getContext("2d");
//       ctx.font = "30px Arial";
//       ctx.fillText("Hello World", 100, 100);

//       gameCount = 1;
//       // const equation = 'abc+\frac{1}{5}+cdf+\frac{1+\frac{134}{4}+\frac{1+\frac{1}{2}}{8}+6}{3-\frac{1}{5+\frac{1}{2}}}+5s'
//       // var parsedEquation = MarkdownMathCanvas(gameCanvas, equation,100,400,40);
//       // console.log('parsimonius', parsedEquation.equation)



//       // setTimeout( gameLoop, 500);


//       setInterval(() => {
//         // Your custom logic here
//         setCount(count + 1);
//         console.log('countim', count)
//       }, 1000);


//       // const interval = setInterval(gameLoop, 50);
//       // return () => clearInterval(interval);
//   }, [])

//   gameLoop() {
//     console.log('game loop', clickEvent);
//     // console.log(sprite1.x)
//     // sprite1.x = 200;
//     // sprite1.changeSpriteColorTint(0,200,0)
//     gameCanvas.refresh();
//     if (gameCount < 10) {

//         sprite1.x = sprite1.x+1;
//         sprite1.move(sprite1.x,sprite1.y)
//         //sprite1.draw();
//         // sprite1.changeSpriteColorTint(0,200,0)
//         //sprite1.x = sprite1.x+1;
//         // sprite1.draw();
//         // gameCanvas.refresh();
//     }

//     gameCount++;

//     if (clickEvent) {
//       console.log('pataloo')
//       gameCanvas.checkCollision();
//       setClickEvent(false)
//     }

//     // add sprite to game object
//     // do move for sprite command
//     // do a game refresh
//   }

//   function handleCanvasClick(event) {
//     console.log('canvas cloak', gameCanvas) 
//     var rect = event.target.getBoundingClientRect()
//     var xClick = event.clientX - rect.left;
//     var yClick = event.clientY - rect.top;
    
//     // gameCanvas.checkCollision();
//     setClickEvent(true)
//   }

//   return (
//     <div>
//           <h1> hi </h1>
//           <canvas onClick={ (event) => {handleCanvasClick(event)} } ref={canvasRef} width={props.width} height={props.height} style={{backgroundColor:"pink"}}/>
//     </div>

//   )
// }