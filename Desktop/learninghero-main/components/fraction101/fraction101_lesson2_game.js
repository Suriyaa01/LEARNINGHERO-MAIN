import React, { useEffect, useState, createRef, useRef, useInterval } from 'react';

import { PropertySafetyFilled } from '@ant-design/icons'
import Link from 'next/link'

import {Game, SpriteImage, SpriteCharacter, SpriteEquation, SpriteTextScrollBox, GameJoystick, SpriteText, SpriteDrawing, SpritePlatform} from '../../actions/ClassGameEngine';
import MarkdownMathCanvas from '../../actions/MarkdownMathCanvas';

import { useRouter } from 'next/router'

// import FontAwesome from 'react-fontawesome';





export default class fraction101_lesson1_game extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      count: 0,
      step: 0,
    };
    this.gameCanvas;
    this.fullScreen = true;
    this.keypress = 0;
    this.gameInterval;

  }

  _handleKeyDown = (event) => {

  }

  _handleKeyUp = (event) => {

  }

  componentWillUnmount() {
    clearInterval(this.gameInterval);
  }


  componentDidMount() {

    // Create game canvas
    this.gameCanvas = new Game(this.myRef, 300, 200, "dojo");

    // Add hero sprite
    this.sprite1 = new SpriteCharacter(this.gameCanvas, 30, 50, 10, 10, "squareSpriteRed")
    this.sprite1.theta=3.14/2;
    this.sprite1.id = 'hero'
    this.ground0 = new SpritePlatform(this.gameCanvas, 0, 92, 100, 8, "rect", 'rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)')


    this.mouseClick = new SpriteCharacter(this.gameCanvas, 30, 50, 10, 10, "mouseClick")


    this.chatBox4 = new SpriteTextScrollBox(this.gameCanvas, "chat", 70, 40, 45, 40, "pink", "black", "black");
    this.chatBox4.speechDir = "left";
    this.chatBox4.mode = "center";
    this.chatBox4.marginTop=10;
    this.chatBox4.highlightColor='rgba(255,0,0,1)';
    this.chatBox4.addTextString(["ข้าจะปูพื้นฐานให้เจ้า", "ลองดูได้"], [12, 12], false, "brown")
    this.chatBox4.addTextString(["ตัวอย่างที่ 1"], [12], true, "brown")
    this.chatBox4.addTextString(["ตัวอย่างที่ 2"], [12], true, "brown")

    this.paper = new SpriteDrawing(this.gameCanvas, 20, 80, 30, 10, "rect", 'rgba(0, 255, 0, 1)', "gray")
    this.paper.theta = 0;

    this.paper2 = new SpriteDrawing(this.gameCanvas, 50, 80, 30, 10, "rect", 'rgba(0, 0, 255, 0.5)', "gray")
    this.paper2.theta = 0;

    this.handPointer = new SpriteDrawing(this.gameCanvas, 20, 80, 5, 10, "fontawesome_hand-pointer-solid", 'rgba(0, 255, 0, 1)', "gray")

    this.text1 = new SpriteText(this.gameCanvas, 50,50, "hello")

    this.joystickSprite = new GameJoystick(this.gameCanvas, this.sprite1)

    document.addEventListener("keydown", this._handleKeyDown.bind(this));
    document.addEventListener("keyup", this._handleKeyUp.bind(this));


    this.gameInterval = setInterval(this.gameLoop, 50);
  }


  gameLoop = () => {
    // console.log('gameloop', this.state.count)
    if (this.state.count > -1) {
      this.gameCanvas.refresh();
      this.paper.theta = this.paper.theta + 0.01;
      this.paper.draggable = true;
      this.paper2.draggable = true;
      this.sprite1.draggable = true;
      // this.mouseClick.onDrag = true;
      // this.text1.text = this.sprite1.x;


      this.paper.setBorderBlinkOn("green", "red", 10);
    } 
    this.setState({count: this.state.count+1});
  }



  handleClick(event)  {
    var rect = event.target.getBoundingClientRect()
    var xClick = event.clientX - rect.left;
    var yClick = event.clientY - rect.top;
    var collisionList = this.gameCanvas.checkClickCollision(xClick,yClick,event)  

    this.paper.checkClickCollision(xClick, yClick, event)
    
    // if ( this.paper.checkClickCollision(xClick, yClick, event) ) {
    //   this.paper.backgroundColor = "yellow"
    // } 

    // if ( this.paper2.checkClickCollision(xClick, yClick, event) ) {
    //   this.paper2.backgroundColor = "pink"
    // } 
  }

  handleTouch(event) {

  }

  _onMouseMove(event) {
    var rect = event.target.getBoundingClientRect()
    var xClick = event.clientX - rect.left;
    var yClick = event.clientY - rect.top;
    this.gameCanvas.onMouseMove(xClick,yClick, event);
    var collisionList = this.gameCanvas.checkClickCollision(xClick,yClick,event)    

    // this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }





  render() {
    return (
      <>
      <head>
          {/* cdn for fontawesome 4 */}
          {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
          {/* cdn for fontawesome 5 */}
          {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"></link> */}
          <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet"></link>

      </head>


      <div>
          <canvas onMouseMove={this._onMouseMove.bind(this)} onMouseUp={this.handleClick.bind(this)} onMouseDown={this.handleClick.bind(this)} onTouchStart={this.handleTouch.bind(this)}  onTouchEnd={this.handleTouch.bind(this)}  ref={this.myRef} style={{WebkitTouchCallout:"none", backgroundColor:"white"}}/>
      </div>
      </>
      )
  }
}




