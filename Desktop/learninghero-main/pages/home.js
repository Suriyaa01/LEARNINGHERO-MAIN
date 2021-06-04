import React, { useEffect, useState, createRef, useRef } from 'react';
import { Layout, Menu, Breadcrumb, Input, Button } from 'antd';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import NavBarTop from '../components/NavBarTop'
import NavBarSide from '../components/NavBarSide'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import 'antd/dist/antd.css'

import styles from './styles.module.css'
import ShortAnswer from '../components/ShortAnswer.js'
import MultiChoiceDropdown from '../components/MultiChoice.js'
import InfoSnippet from '../components/InfoSnippet.js';

// import {Game, SpriteImage, SpriteCharacter} from '../actions/GameSprite';

import HomeCanvasGame from '../components/home/home_game.js'

export default function HomePage() {


  const [canvasWidth, setCanvasWidth] = useState(0);

  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  // function logit() {
  //   setScrollY(window.pageYOffset);
  //   setScrollX(window.pageXOffset);
  //   if (document.documentElement.clientWidth > 990 ) {
  //     setCanvasWidth( 750 )
  //     // if ( document.documentElement.clientWidth > 1100  ) {
  //     //   setCanvasWidth( 850 )
  //     // } else {
  //     //   setCanvasWidth( document.documentElement.clientWidth - 250 )
  //     // }
  //   } else {
  //     setCanvasWidth( document.documentElement.clientWidth - 50 )
  //   }
  //   // console.log( 'game canvas width', gameCanvas);
  // }

  // useEffect(() => {
  //   if (document.documentElement.clientWidth > 990 ) {
  //     setCanvasWidth( 750 )
  //     // if ( document.documentElement.clientWidth > 1100  ) {
  //     //   setCanvasWidth( 850 )
  //     // } else {
  //     //   setCanvasWidth( document.documentElement.clientWidth - 250 )
  //     // }
  //   } else {
  //     setCanvasWidth( document.documentElement.clientWidth - 50 )
  //   }
    
  //   function watchScroll() {
  //     window.addEventListener("scroll", logit);
  //     window.addEventListener("resize", logit);
  //   }
  //   watchScroll();
  //   return () => {
  //     window.removeEventListener("scroll", logit);
  //     window.removeEventListener("resize", logit);
  //   };
  // });








  var shortAnswerData1 = {
    answer: ["ค้างคาว"],
    status: (result) => getShortAnswerResult(result),
  }

  var snippetData1 = {
    mainText: "Rudolf",
    snippetText: "Rudolf was a rednose raindeer who worked closely with Santa Clause to help deliver presents to all the children around the world on Christmas day.",
    snippetImg: 'https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/braveBoySprite.png',
    snippetLink: 'https://en.wikipedia.org/wiki/Rudolph_the_Red-Nosed_Reindeer',
  }

  var multiChoiceData1 = {
    answer: "tiger",
    choice: ["tiger", "lion", "giraffe"],
    status: (result) => getMultichoiceDropdownResult(result),
  }

  function getShortAnswerResult(result) {
    console.log('get child data: ', result)
  }

  function getMultichoiceDropdownResult(result) {
    console.log('multi choice dropdown result: ', result)
  }


  return (
    // This makes the html unselectable so that tapping on canvas when playing game is not interrupted by html auto highlighting
    <div  style={{WebkitUserSelect:"none", WebkitTouchCallout:"none"}}> 
      {/* <script src="//cdn.jsdelivr.net/npm/phaser@3.51.0/dist/phaser.js"></script> */}

      <Layout>
        <NavBarTop />
        <Layout>

          <NavBarSide />

          <Layout
            // className={`${styles.responsiveSideBarHeight} ${styles.my_h4}`}  // HOW TO OVERLOAD MULTIPLE CSS CLASSES IN NEXTJS
            style={{ padding: '0 24px 24px' }}
          >
            <Content className={styles.responsiveContentMargin}>

              <h2> เศษส่วนคืออะไร </h2>

              <div style={{textAlign:"center"}} unselectable="on">
                <HomeCanvasGame></HomeCanvasGame>
                {/* <canvas ref={canvasRef} width={canvasWidth} height={canvasWidth*0.5} /> */}
              </div>

              <p  style={{ outlineStyle:"none", fontSize: "20px" }}> ในหม้อมีนํ้าที่เป็นของเหลวอยู่ 300ml เมื่อเรานําหม้อไปตั้งไฟที่เตาก็จะเพิ่มความร้อนของหม้อและนํ้า ทําให้อุณหภูมิสูงขึ้นจนถึง 100 องศาเซลเซียส ที่อุณหภูมินี้นํ้ารจะเริ่มแปลงสภาพจากของเหลวเป็น
                <ShortAnswer data={shortAnswerData1} />
                สามารถมองเห็นได้ในรูปแบบของฟองนํ้าเดือด และควันที่ดูเหมือนจะลอยขึ้นจากนํ้าในหม้อ
              </p>

              <span style={{ fontSize: "20px" }}> Donec quis
                <MultiChoiceDropdown data={multiChoiceData1} />
                  tincidunt risus, eu
                <InfoSnippet snippetData={snippetData1} />
                  turpis. Ut placerat ultrices velit, at eleifend metus. Sed sit amet sem a nibh volutpat facilisis. Proin eu fringilla quam, at dapibus diam. Sed vel convallis metus. Curabitur mattis libero vitae est elementum, vel aliquet orci dignissim. Nulla cursus turpis et scelerisque interdum. Phasellus in nunc ac erat ultrices finibus ut eget nunc. Etiam suscipit posuere mi, vitae tempus justo fringilla id. In egestas varius risus, quis porta nulla sodales ac. Mauris euismod tristique fringilla. Vivamus ornare odio eu nisl cursus, quis rhoncus est placerat. Nam tincidunt tempor urna eget consequat.
              </span>
              <p></p>

              {/* <div className="fixed-center">Scroll position: {scrollY}px</div> */}



              {/* {console.log(isShown)} */}


            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );

}


// import HomePage from '../components/HomePage'


// export default class Home extends React.Component {

//   render() {
//     // const { collapsed } = this.state;
//     return (
//       <div>
//         <HomePage lesson='fraction1'/>
//         <p> hello mama </p>
//       </div>
//     );
//   }
// }
