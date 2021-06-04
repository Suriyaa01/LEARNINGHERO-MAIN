import React, { useEffect, useState, createRef, useRef, useInterval } from 'react';

import { PropertySafetyFilled } from '@ant-design/icons'
import Link from 'next/link'

import { Game, SpriteImage, SpriteCharacter, SpriteEquation, SpriteTextScrollBox, GameJoystick, SpriteText, SpriteDrawing, SpritePlatform } from '../../actions/ClassGameEngine';
import MarkdownMathCanvas from '../../actions/MarkdownMathCanvas';

import { useRouter } from 'next/router'


export default class fraction101_lesson1_game extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      count: 0,
      count2: 0,
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
    this.initialGame();
  }

  initialGame() {
    console.log('initial the game')

    this.setState({count:0, step:0, count2:0})
    // Create game canvas
    this.gameCanvas = new Game(this.myRef, 300, 200, "dojo");

    // Add scenes to game canvas
    this.gameCanvas.addScene("dojo") // scene 1
    this.gameCanvas.addScene("lab") // scene 2

    this.gameCanvas.setSceneNumber(1);

    this.initialScene1();
    this.initialScene2();

    this.joystickSprite = new GameJoystick(this.gameCanvas, this.sprite1)

    document.addEventListener("keydown", this._handleKeyDown.bind(this));
    document.addEventListener("keyup", this._handleKeyUp.bind(this));


    this.gameInterval = setInterval(this.gameLoop, 50);
  }

  initialScene1() {
    // Add hero sprite
    this.sprite1 = new SpriteCharacter(this.gameCanvas, 30, 50, 10, 10, "squareSpriteRed")
    this.sprite1.id = 'hero'
    this.sensei = new SpriteCharacter(this.gameCanvas, 70, 50, 20, 20, "sensei")
    this.sensei.id = 'sensei'
    this.ground0 = new SpritePlatform(this.gameCanvas, 0, 92, 100, 8, "rect", 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)')

    this.chatBox1 = new SpriteTextScrollBox(this.gameCanvas, "chat", 70, 60, 55, 68, "pink", "black", "black");
    this.chatBox1.speechDir = "right";
    this.chatBox1.mode = "center";
    this.chatBox1.marginTop = 10;
    this.chatBox1.hide();
    this.chatBox1.addTextString(["สวัสดีเจ้าหนู", "ยินดีต้อนรับสู่สํานึกวิทยายุทธ"], [12, 12], false, "brown")

    this.chatBox2 = new SpriteTextScrollBox(this.gameCanvas, "chat", 30, 70, 35, 40, "yellow", "black", "black");
    this.chatBox2.speechDir = "left";
    this.chatBox2.mode = "center";
    this.chatBox2.marginTop = 10;
    this.chatBox2.hide();
    this.chatBox2.addTextString(["สวัสดีอาจารย์", "ข้ามาทําภารกิจ"], [12, 12], false, "brown")

    this.chatBox3 = new SpriteTextScrollBox(this.gameCanvas, "chat", 70, 40, 40, 40, "pink", "black", "black");
    this.chatBox3.speechDir = "left";
    this.chatBox3.mode = "center";
    this.chatBox3.marginTop = 10;
    this.chatBox3.hide();
    this.chatBox3.addTextString(["เดินเข้ามา", "ข้าจะเล่าเรื่องให้ฝั่ง"], [12, 12], false, "brown")

    this.chatBox4 = new SpriteTextScrollBox(this.gameCanvas, "chat", 70, 40, 45, 40, "pink", "black", "black");
    this.chatBox4.speechDir = "left";
    this.chatBox4.mode = "center";
    this.chatBox4.marginTop = 10;
    this.chatBox4.highlightColor = 'rgba(255,0,0,1)';
    this.chatBox4.hide();
    this.chatBox4.addTextString(["ข้าจะปูพื้นฐานให้เจ้า", "ลองดูได้"], [12, 12], false, "brown")
    this.chatBox4.addTextString(["ตัวอย่างที่ 1"], [12], true, "brown")
    // this.chatBox4.addTextString(["ตัวอย่างที่ 2"], [12], true, "brown")
    this.chatBox4.id = "demooptionmenu";

    this.gameCanvas.sceneList[1].spriteList.push(this.sprite1)
    this.gameCanvas.sceneList[1].spriteList.push(this.ground0)
    this.gameCanvas.sceneList[1].spriteList.push(this.sensei)
    this.gameCanvas.sceneList[1].spriteList.push(this.chatBox1)
    this.gameCanvas.sceneList[1].spriteList.push(this.chatBox2)
    this.gameCanvas.sceneList[1].spriteList.push(this.chatBox3)
    this.gameCanvas.sceneList[1].spriteList.push(this.chatBox4)


  }

  initialScene2() {

    // Papers to be cut in half
    this.paper1 = new SpriteDrawing(this.gameCanvas, -10, 50, 20, 20, "rect", 'rgba(255, 255, 255, 1)', "gray")
    this.paper1.setTransparency(0.1)

    this.paper1copy = new SpriteDrawing(this.gameCanvas, 30, 50, 20, 20, "rect", 'rgba(255, 255, 255, 1)', "green")
    this.paper1copy.id = 'paper1copy'
    this.paper1copy.hide();
    this.paper2copy = new SpriteDrawing(this.gameCanvas, 70, 50, 20, 20, "rect", 'rgba(255, 255, 255, 0)', "red")
    this.paper2copy.hide();
    this.paper3copy = new SpriteDrawing(this.gameCanvas, 75, 50, 10, 20, "rect", 'rgba(255, 255, 255, 0)', "green")
    this.paper3copy.id = 'paper3copy'
    this.paper3copy.hide();
    this.paper4copy = new SpriteDrawing(this.gameCanvas, 75, 80, 10, 20, "rect", 'rgba(255, 255, 255, 0)', "red")
    this.paper4copy.hide();

    this.paper3 = new SpriteDrawing(this.gameCanvas, 20, 40, 10, 20, "rect", 'rgba(0, 255, 0, 1)', "gray")
    this.paper3.mode = "corner"
    this.paper3.hide();
    this.paper2 = new SpriteDrawing(this.gameCanvas, 30, 40, 10, 20, "rect", 'rgba(0, 255, 0, 1)', "gray")
    this.paper2.mode = "corner"
    this.paper2.hide();
    this.paper4 = new SpriteDrawing(this.gameCanvas, 20, 50, 10, 10, "rect", 'rgba(0, 255, 0, 1)', "gray")
    this.paper4.mode = "corner"
    this.paper4.hide();
    this.paper5 = new SpriteDrawing(this.gameCanvas, 30, 40, 10, 10, "rect", 'rgba(0, 255, 0, 1)', "gray")
    this.paper5.mode = "corner"
    this.paper5.hide();

    // Equations in Scene 2
    this.equation1 = new SpriteEquation(this.gameCanvas, 64, 52, '\frac{1}{2}', 12)
    this.equation1.hide();
    this.equation2 = new SpriteEquation(this.gameCanvas, 74, 52, '\frac{1}{2}', 12)
    this.equation2.hide();
    this.equation3 = new SpriteEquation(this.gameCanvas, 74, 77, '\frac{1}{4}', 11)
    this.equation3.hide();
    this.equation4 = new SpriteEquation(this.gameCanvas, 74, 87, '\frac{1}{4}', 11)
    this.equation4.hide();
    this.equation5 = new SpriteEquation(this.gameCanvas, 64, 77, '\frac{1}{4}', 11)
    this.equation5.hide();
    this.equation6 = new SpriteEquation(this.gameCanvas, 64, 87, '\frac{1}{4}', 11)
    this.equation6.hide();

    // Papers in Scene 2
    this.paperB1 = new SpriteDrawing(this.gameCanvas, -10, 80, 20, 20, "rect", 'rgba(255, 255, 255, 1)', "gray")
    this.paperB1.setTransparency(0.1)
    this.paperB3 = new SpriteDrawing(this.gameCanvas, 20, 80, 10, 10, "rect", 'rgba(0, 255, 0, 1)', "gray")
    this.paperB3.mode = "corner"
    this.paperB3.hide();
    this.paperB2 = new SpriteDrawing(this.gameCanvas, 30, 80, 10, 10, "rect", 'rgba(0, 255, 0, 1)', "gray")
    this.paperB2.mode = "corner"
    this.paperB2.hide();
    this.paperB4 = new SpriteDrawing(this.gameCanvas, 20, 70, 10, 10, "rect", 'rgba(0, 255, 0, 1)', "gray")
    this.paperB4.mode = "corner"
    this.paperB4.hide();
    this.paperB5 = new SpriteDrawing(this.gameCanvas, 30, 70, 10, 10, "rect", 'rgba(0, 255, 0, 1)', "gray")
    this.paperB5.mode = "corner"
    this.paperB5.hide();


    this.handGesture = new SpriteDrawing(this.gameCanvas, 20, 20, 10, 10, "fontawesome_hand-pointer-solid", 'rgba(0, 255, 0, 1)', "gray")
    this.handGesture.hide();
    this.checkCircle = new SpriteDrawing(this.gameCanvas, 20, 20, 10, 10, "fontawesome_hand-check-circle", 'rgba(0, 255, 0, 1)', "gray")
    this.checkCircle.hide();


    // Texts in Scene 2
    this.text1 = new SpriteText(this.gameCanvas, 50, 30, "ลองสมมุติว่าเรามีสี่กระดาษ 1 แผ่น", 12);
    this.text1.mode = "center";
    this.text1.hide();
    this.text1.setTransparency(0);
    this.text2 = new SpriteText(this.gameCanvas, 50, 30, "ถ้าจะแบ่งออกเป็นสองส่วนเท่าๆกัน", 12, "center");
    this.text2.hide();
    this.text3 = new SpriteText(this.gameCanvas, 50, 30, "ก็จะได้กระดาษสองชิ้น ชิ้นหนึ่งมีค่าเท่ากับ 1/2 แผ่น", 12, "center");
    this.text3.hide();
    this.text4 = new SpriteText(this.gameCanvas, 50, 30, "ทีนี้ ลองนึกดูว่าถ้าแบ่งกระดาษ 1 แผ่น เป็น 4 ส่วนที่เท่ากัน", 12, "center");
    this.text4.hide();
    this.text4.setTransparency(0);
    this.text5 = new SpriteText(this.gameCanvas, 50, 30, "ก็จะได้กระดาษ 4 ชิ้น โดยชิ้นหนึ่งมีค่าเท่ากับ 1/4 แผ่น", 12, "center");
    this.text5.hide();
    this.text5.setTransparency(0);
    this.text6 = new SpriteText(this.gameCanvas, 50, 30, "ลองดูสิว่ากระดาษ 1 แผ่น เท่ากับกระดาษ 1/2 แผ่น สองอัน", 12, "center");
    this.text6.hide();
    this.text6.setTransparency(0);
    this.text7 = new SpriteText(this.gameCanvas, 50, 30, "กดคลิก และลากกระดาษ 1 แผ่น ไปทับกระดาษ 1/2 แผ่น", 12, "center");
    this.text7.hide();
    this.text7.setTransparency(0);
    this.text8 = new SpriteText(this.gameCanvas, 50, 30, "ลองดูสิว่า 1/2 แผ่น นั้นเท่ากับ 1/4 แผ่น สองอัน", 12, "center");
    this.text8.hide();
    this.text8.setTransparency(0);
    this.text9 = new SpriteText(this.gameCanvas, 50, 30, "เยี่ยมมาก เจ้าน่าจะพอเข้าใจเศษส่วนบ้างแล้วละ", 12, "center");
    this.text9.hide();
    this.text9.setTransparency(0);
    this.text10 = new SpriteText(this.gameCanvas, 50, 30, "เศษส่วนก็คือการแบ่งหนึ่งอย่างเป็นหลายๆชิ้นเท่าๆกัน", 12, "center");
    this.text10.hide();
    this.text10.setTransparency(0);
    this.text11 = new SpriteText(this.gameCanvas, 50, 30, "เรียกได้ว่าเปรียบเสมือนการหาร", 12, "center");
    this.text11.hide();
    this.text11.setTransparency(0);

    this.line1 = new SpriteDrawing(this.gameCanvas, 30, 38, 0, 24, "line", 'rgba(255, 255, 255, 1)', "green")
    this.line2 = new SpriteDrawing(this.gameCanvas, 38, 30, 24, 0, "line", 'rgba(255, 255, 255, 1)', "green")
    this.line3 = new SpriteDrawing(this.gameCanvas, 30, 68, 0, 24, "line", 'rgba(255, 255, 255, 1)', "green")
    this.line3.hide();
    this.line3.setTransparency(0)
    this.line4 = new SpriteDrawing(this.gameCanvas, 18, 80, 24, 0, "line", 'rgba(255, 255, 255, 1)', "green")
    this.line4.hide();
    this.line4.setTransparency(0);

    this.line1.hide();
    this.line1.setTransparency(0)
    this.line2.hide();
    this.line2.setTransparency(0)

    // Add sprites to scene2
    this.gameCanvas.sceneList[2].spriteList.push(this.paper1)
    this.gameCanvas.sceneList[2].spriteList.push(this.paper2)
    this.gameCanvas.sceneList[2].spriteList.push(this.paper3)
    this.gameCanvas.sceneList[2].spriteList.push(this.paper4)
    this.gameCanvas.sceneList[2].spriteList.push(this.paper5)
    this.gameCanvas.sceneList[2].spriteList.push(this.line1)
    this.gameCanvas.sceneList[2].spriteList.push(this.line2)
    this.gameCanvas.sceneList[2].spriteList.push(this.line3)
    this.gameCanvas.sceneList[2].spriteList.push(this.line4)
    this.gameCanvas.sceneList[2].spriteList.push(this.text1)
    this.gameCanvas.sceneList[2].spriteList.push(this.text2)
    this.gameCanvas.sceneList[2].spriteList.push(this.text3)
    this.gameCanvas.sceneList[2].spriteList.push(this.text4)
    this.gameCanvas.sceneList[2].spriteList.push(this.text5)
    this.gameCanvas.sceneList[2].spriteList.push(this.text6)
    this.gameCanvas.sceneList[2].spriteList.push(this.text7)
    this.gameCanvas.sceneList[2].spriteList.push(this.text8)
    this.gameCanvas.sceneList[2].spriteList.push(this.text9)
    this.gameCanvas.sceneList[2].spriteList.push(this.text10)
    this.gameCanvas.sceneList[2].spriteList.push(this.text11)

    this.gameCanvas.sceneList[2].spriteList.push(this.paperB1)
    this.gameCanvas.sceneList[2].spriteList.push(this.paperB2)
    this.gameCanvas.sceneList[2].spriteList.push(this.paperB3)
    this.gameCanvas.sceneList[2].spriteList.push(this.paperB4)
    this.gameCanvas.sceneList[2].spriteList.push(this.paperB5)

    this.gameCanvas.sceneList[2].spriteList.push(this.paper1copy)
    this.gameCanvas.sceneList[2].spriteList.push(this.paper2copy)
    this.gameCanvas.sceneList[2].spriteList.push(this.paper3copy)
    this.gameCanvas.sceneList[2].spriteList.push(this.paper4copy)

    this.gameCanvas.sceneList[2].spriteList.push(this.handGesture)
    this.gameCanvas.sceneList[2].spriteList.push(this.checkCircle)


    this.gameCanvas.sceneList[2].spriteList.push(this.equation1)
    this.gameCanvas.sceneList[2].spriteList.push(this.equation2)
    this.gameCanvas.sceneList[2].spriteList.push(this.equation3)
    this.gameCanvas.sceneList[2].spriteList.push(this.equation4)
    this.gameCanvas.sceneList[2].spriteList.push(this.equation5)
    this.gameCanvas.sceneList[2].spriteList.push(this.equation6)
  }

  gameLoop = () => {
    // console.log('gameloop', this.state.count)
    if (this.state.count > -1 ) {
      if (this.gameCanvas.getScene() == 1) {
        this.scene1Loop();
      }
      if (this.gameCanvas.getScene() == 2) {
        this.scene2Loop();
      }
      this.setState({ count: this.state.count + 1 });
    }
    this.gameCanvas.refresh();
  }

  scene1Loop() {
    if (this.state.step == 0) {
      if (this.state.count > 20) {
        this.chatBox1.show();
        if (this.state.count > 100) {
          this.chatBox1.hide();
          this.setState({ count: 0 })
          this.setState({ step: this.state.step + 1 })
        }
      }
    }
    else if (this.state.step == 1) {
      if (this.state.count > 20) {
        this.chatBox2.x = this.sprite1.x;
        this.chatBox2.y = this.sprite1.y - 10;
        this.chatBox2.show();
        if (this.state.count > 100) {
          this.chatBox2.hide();
          this.setState({ count: 0 })
          this.setState({ step: this.state.step + 1 })
        }
      }
    }
    else if (this.state.step == 2) {
      if (this.state.count > 20) {
        this.chatBox3.show();
        if (this.state.count > 100) {
          this.chatBox3.hide();
          this.setState({ count: 0 })
          this.setState({ step: this.state.step + 1 })
        }
      }
    }
    else if (this.state.step == 3) {
      var result = this.gameCanvas.rectanglePairCollision(this.sprite1, this.sensei)
      if (result) {
        this.chatBox4.show();
      } else {
        this.chatBox4.hide();
      }

    }
  }

  scene2Loop() {
    if (this.state.step == 0) {
      this.paper1.xVel = 1;
      if (this.paper1.x == 30) {
        this.paper1.xVel = 0;
        if (this.paper1.opacity < 1) {
          this.paper1.setTransparency(this.paper1.opacity + 0.1);
        } else {
          this.setState({ step: this.state.step + 1 });
        }
      }
    }
    else if (this.state.step == 1) {
      this.text1.show();
      if (this.text1.opacity < 1) {
        this.text1.setTransparency(this.text1.opacity + 0.1)
      } else {
        this.setState({ step: this.state.step + 1 });
        this.setState({ count: 0 });
      }
    }
    else if (this.state.step == 2) {
      if (this.state.count > 40) {
        this.text2.setTransparency(this.text2.opacity + 0.2)
        if (this.state.count > 60) {
          this.setState({ step: this.state.step + 1 });
        }
      }
      else if (this.state.count > 20) {
        this.text1.hide()
        this.text2.show();
        this.text2.setTransparency(0);
      }
    }
    else if (this.state.step == 3) {
      this.line1.show();
      if (this.line1.opacity < 1) {
        this.line1.setTransparency(this.line1.opacity + 0.1)
      } else {
        this.setState({ step: this.state.step + 1 });
        this.setState({ count: 0 });

        this.paper2.setTransparency(0);
      }
    }

    // move paper2 right 20 loops at xVel=1 
    else if (this.state.step == 4) {
      this.paper2.show();
      if (this.paper2.opacity < 1) {
        this.paper2.setTransparency(this.paper2.opacity + 0.1)
      }
      if (this.state.count > 20) {
        this.paper2.xVel = 1;
      }
      if (this.state.count > 40) {
        this.paper2.xVel = 0;
        this.paper2.backgroundColor = "white"
        this.setState({ step: this.state.step + 1 });
        this.setState({ count: 0 });
        this.paper3.setTransparency(0);
      }
    }
    else if (this.state.step == 5) {

      this.paper3.show();
      if (this.paper3.opacity < 1) {
        this.paper3.setTransparency(this.paper3.opacity + 0.1)
      }
      if (this.state.count > 20) {
        this.paper3.xVel = 1;
      }
      if (this.state.count > 40) {
        this.paper3.xVel = 0;
        this.paper3.backgroundColor = "white"
        // this.line1.hide();
        this.line1.setDash([5, 5])
        this.text2.hide();
        if (this.state.count > 50) {
          this.text3.show();
          this.equation1.show();
          this.equation2.show();
          if (this.text3.opacity < 1) {
            this.text3.setTransparency(this.text3.opacity + 0.1);
          } 
          if (this.state.count > 100) {
            this.setState({ step: this.state.step + 1 });
            this.setState({ count: 0 });
          }
        }
        
      }
    }

    else if (this.state.step == 6) {
      this.paperB1.xVel = 1;
      this.paperB1.zIndex = -1;
      if (this.paperB1.x == 30) {
        this.paperB1.xVel = 0;
        if (this.paperB1.opacity < 1) {
          this.paperB1.setTransparency(this.paperB1.opacity + 0.1)
        } else {
          this.setState({ step: this.state.step + 1 });
          this.text3.hide();
          // this.line1.setDash([5,5])
          // this.line1.setTransparency(0)

        }
      }
    }

    else if (this.state.step == 7) {
      // this.line3.setPosition(30,65,0,30);
      this.text4.show()
      if (this.text4.opacity < 1) {
        this.text4.setTransparency(this.text4.opacity + 0.1);
      } else {
        this.line3.show();
        this.line3.zIndex = 0;
        // this.line3.setDash([5,5])
        if (this.line3.opacity < 1) {
          this.line3.setTransparency(this.line3.opacity + 0.1)
        } else {
          this.setState({ step: this.state.step + 1 });
          this.setState({ count: 0 });
          this.line4.setTransparency(0);
        }
      }
    }

    else if (this.state.step == 8) {
      // this.line4.setPosition(15,80,30,0);
      this.line4.show();
      this.line4.zIndex = 0;
      // this.line4.setDash([5,5])
      if (this.line4.opacity < 1) {
        this.line4.setTransparency(this.line4.opacity + 0.1)
      } else {
        this.setState({ step: this.state.step + 1 });
        this.setState({ count: 0 });
        this.paperB4.setTransparency(0);


      }
    }

    // show up 1/4 cut pieces
    // move paper2 right 20 loops at xVel=1 
    else if (this.state.step == 9) {
      this.paperB5.show();
      if (this.paperB5.opacity < 1) {
        this.paperB5.setTransparency(this.paperB5.opacity + 0.1)
      } else {
        if (this.state.count == 20) {
          this.paperB5.xVel = 1;
        }
        if (this.state.count == 40) {
          this.paperB5.xVel = 0;
          this.paperB5.backgroundColor = "white"
          this.setState({ step: this.state.step + 1 });
          this.setState({ count: 0 });
        }
      }
    }

    else if (this.state.step == 10) {
      this.paperB2.show();
      if (this.paperB2.opacity < 1) {
        this.paperB2.setTransparency(this.paperB2.opacity + 0.1)
      } else {
        if (this.state.count == 20) {
          this.paperB2.xVel = 1;
        }
        if (this.state.count == 40) {
          this.paperB2.xVel = 0;
          this.paperB2.backgroundColor = "white"
          this.setState({ step: this.state.step + 1 });
          this.setState({ count: 0 });
        }
      }
    }

    else if (this.state.step == 11) {
      this.paperB3.show();
      if (this.paperB3.opacity < 1) {
        this.paperB3.setTransparency(this.paperB3.opacity + 0.1)
      } else {
        if (this.state.count == 20) {
          this.paperB3.xVel = 1;
        }
        if (this.state.count == 40) {
          this.paperB3.xVel = 0;
          this.paperB3.backgroundColor = "white"
          this.setState({ step: this.state.step + 1 });
          this.setState({ count: 0 });
        }
      }
    }

    else if (this.state.step == 12) {
      this.paperB4.show();
      if (this.paperB4.opacity < 1) {
        this.paperB4.setTransparency(this.paperB3.opacity + 0.1)
      } else {
        if (this.state.count == 20) {
          this.paperB4.xVel = 1;
        }
        if (this.state.count == 40) {
          this.paperB4.xVel = 0;
          this.paperB4.backgroundColor = "white"
          this.setState({ step: this.state.step + 1 });
          this.setState({ count: 0 });
          this.line3.setDash([5, 5])
          this.line4.setDash([5, 5])
        }
      }
    }

    else if (this.state.step == 13) {
      this.text4.hide()
      this.equation3.show();
      this.equation4.show();
      this.equation5.show();
      this.equation6.show();
      this.text5.show();
      if (this.text5.opacity < 1) {
        this.text5.setTransparency(this.text5.opacity + 0.1);
        this.setState({ count: 0 });

      }
      else {

        if (this.state.count > 50) {
          this.text5.hide();
          this.text6.show();
          if (this.text6.opacity < 1) {
            this.text6.setTransparency(this.text6.opacity + 0.1);
          } else {
            this.setState({ step: this.state.step + 1 });
            this.setState({ count: 0 , count2:0 });
            this.handGesture.show();
            this.handGesture.x = 30
            this.handGesture.y = 60
            this.handGesture.backgroundColor = 'gray'
          }
        }
      }
    }
    else if (this.state.step == 14) {
      this.handGesture.show();
      this.setState({  count2: this.state.count2+1 });

      if (this.state.count < 30) {
        this.handGesture.x = this.handGesture.x + 1;
      } else {
        this.handGesture.x = 30;
        this.setState({ count: 0 });
      }
      if (this.state.count2 > 60) {
        this.text6.hide();
        this.text7.show();
      }
      if (this.text7.visibility && (this.text7.opacity < 1)) {
        this.text7.setTransparency(this.text7.opacity + 0.1);
      }
      if (this.gameCanvas.clickCollisionList.filter(item => item.id == 'paper1copy').length > 0) {
        this.setState({ step: this.state.step + 1 });
      }

      this.paper1copy.show();
      this.paper1copy.zIndex = 1;
      // this.paper1copy.setBorderBlinkOn('green','gray',6) 
      this.paper1copy.draggable = true;
    }
    else if (this.state.step == 15) {
      this.text6.hide();

      this.handGesture.hide();
      this.paper2copy.show();
      this.paper2copy.setBorderBlinkOn('red', 'gray', 6)

      if ((Math.abs(this.paper1copy.left - this.paper3.left) < 3) && (Math.abs(this.paper1copy.top - this.paper3.top) < 3)) {
        this.paper1copy.backgroundColor = 'green'
        this.paper1copy.setDraggable(false);

        this.paper2copy.hide();

        this.checkCircle.show();
        this.checkCircle.x = 70;
        this.checkCircle.y = 60;

        this.setState({ count: 0 });
        this.setState({ step: this.state.step + 1 });
      }
    }
    else if (this.state.step == 16) {
      if (this.paper1copy.opacity > 0.2) {
        this.paper1copy.setTransparency(this.paper1copy.opacity - 0.1)
      }
      if (this.state.count > 40) {
        this.text7.hide();
      }
      if (this.state.count > 60) {
        this.setState({ step: this.state.step + 1 });
        this.setState({ count: 0 });
      }
    }
    else if (this.state.step == 17) {
      this.checkCircle.hide();
      this.paper1copy.hide();
      this.text8.show();
      if (this.text8.opacity < 1) {
        this.text8.setTransparency(this.text8.opacity + 0.1)
      }
      if (this.state.count > 30) {
        this.setState({ step: this.state.step + 1 });
        this.setState({ count: 0 });
        this.handGesture.show();
        this.handGesture.x = 75;
        this.handGesture.y = 60;
      }

    }
    else if (this.state.step == 18) {
      if (this.state.count < 30) {
        this.handGesture.y = this.handGesture.y + 1;
      } else {
        this.setState({ count: 0 });
        this.handGesture.y = 60;
      }
      this.paper3copy.show();
      this.paper3copy.setBorderBlinkOn('green', 'gray', 6)
      this.paper3copy.draggable = true;
      if (this.gameCanvas.clickCollisionList.filter(item => item.id == 'paper3copy').length > 0) {
        this.setState({ step: this.state.step + 1 });
        this.handGesture.hide();
      }
    }
    else if (this.state.step == 19) {
      this.paper4copy.show();
      this.paper4copy.setBorderBlinkOn('red','gray',6);
      this.paper3copy.setBorderBlinkOff()
      if ((Math.abs(this.paper4copy.left - this.paper3copy.left) < 3) && (Math.abs(this.paper4copy.top - this.paper3copy.top) < 3)) {
        this.paper3copy.backgroundColor = 'green'
        this.paper3copy.setDraggable(false);
        this.paper4copy.hide();
        this.checkCircle.show();
        this.checkCircle.x = 75;
        this.checkCircle.y = 90;

        this.setState({ count: 0 });
        this.setState({ step: this.state.step + 1 });      
      }    
    }
    else if (this.state.step == 20) {
      this.text8.hide();
      this.text9.show();

      if (this.text9.opacity < 1) {
        this.text9.setTransparency(this.text9.opacity+0.1);
      }
      if (this.state.count > 50) {
        this.setState({ step: this.state.step + 1 });      
        this.setState({count:0})
        this.text9.hide();
      }
    }
    else if (this.state.step == 21) {
      this.text10.show();
      if (this.text10.opacity < 1) {
        this.text10.setTransparency(this.text10.opacity+0.1);
      }
      if (this.state.count > 50) {
        this.setState({ step: this.state.step + 1 });      
        this.text10.hide();
      }
    }
    else if (this.state.step == 22) {
      if (this.text11.opacity < 1) {
        this.text11.show();
        this.text11.setTransparency(this.text11.opacity+0.1);
      }
      if (this.state.count > 50) {
        this.setState({ step: this.state.step + 1 });      
        this.text11.hide();
        this.gameCanvas.setSceneNumber(1);
        this.gameCanvas.endGame = true;
        delete this.gameCanvas;
        this.initialGame();
      }
    }
  }

  handleClick(event) {
    var rect = event.target.getBoundingClientRect()
    var xClick = event.clientX - rect.left;
    var yClick = event.clientY - rect.top;
    var collisionList = this.gameCanvas.checkClickCollision(xClick, yClick, event)
    console.log('collision list', collisionList)

    for (var item of collisionList) {
      if (item.id == "demooptionmenu") {
        console.log('wokraja!', item.sectionClicked)
        if (item.sectionClicked == 1) {
          this.gameCanvas.setSceneNumber(2)
          this.setState({ count: 0, step: 0 })
        }
      }
    }
  }

  handleTouch(event) {

  }

  _onMouseMove(event) {
    var rect = event.target.getBoundingClientRect()
    var xClick = event.clientX - rect.left;
    var yClick = event.clientY - rect.top;
    this.gameCanvas.checkClickCollision(xClick, yClick, event);
    this.gameCanvas.onMouseMove(xClick, yClick, event);

    // this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }





  render() {
    return (
      <>
        <head>
          <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet"></link>
        </head>

        <div>

          <canvas onMouseMove={this._onMouseMove.bind(this)} onMouseUp={this.handleClick.bind(this)} onMouseDown={this.handleClick.bind(this)} onTouchStart={this.handleTouch.bind(this)} onTouchEnd={this.handleTouch.bind(this)} ref={this.myRef} style={{ WebkitTouchCallout: "none", backgroundColor: "white" }} />

        </div>
      </>
    )
  }
}




