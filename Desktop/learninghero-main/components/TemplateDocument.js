import React, { useEffect, useState } from 'react';

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

import NavBarTop from './NavBarTop'
import NavBarSide from './NavBarSide'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';


import 'antd/dist/antd.css'

import styles from '../pages/styles.module.css'
import ShortAnswer from './ShortAnswer.js'
import MultiChoiceDropdown from './MultiChoice.js'
import InfoSnippet from './InfoSnippet';

// import { use } from 'matter';

// read about Ant Design Navigation Bar layouts at this url: https://ant.design/components/layout/

// import './home.css'

export default function Template() {

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
    <div>
      <Layout>
        <NavBarTop />
        <Layout>

          <NavBarSide />

          <Layout
            // className={`${styles.responsiveSideBarHeight} ${styles.my_h4}`}  // HOW TO OVERLOAD MULTIPLE CSS CLASSES IN NEXTJS
            style={{ padding: '0 24px 24px' }}
          >
            <Content className={styles.responsiveContentMargin}>
              {/* {console.log('rerender content', this.state.myWidth)} */}
              <h2> เศษส่วนคืออะไร </h2>

              <p style={{ fontSize: "20px" }}> ในหม้อมีนํ้าที่เป็นของเหลวอยู่ 300ml เมื่อเรานําหม้อไปตั้งไฟที่เตาก็จะเพิ่มความร้อนของหม้อและนํ้า ทําให้อุณหภูมิสูงขึ้นจนถึง 100 องศาเซลเซียส ที่อุณหภูมินี้นํ้ารจะเริ่มแปลงสภาพจากของเหลวเป็น
                <ShortAnswer data={shortAnswerData1} />
                สามารถมองเห็นได้ในรูปแบบของฟองนํ้าเดือด และควันที่ดูเหมือนจะลอยขึ้นจากนํ้าในหม้อ
              </p>

              <span style={{ fontSize: "20px" }}> Donec quis
                  {/* <MultiChoiceDropdown answer={"tiger"} choice={["tiger", "lion", "giraffe"]}  status={(result) => getMultichoiceDropdownResult(result)} /> */}
                <MultiChoiceDropdown data={multiChoiceData1} />
                  tincidunt risus, eu
                  {/* <a style={{ borderStyle: "dotted", borderWidth: "1px" }} onClick={(event) => handleHoverLink(event)} onMouseLeave={(event) => console.log('leaving')}>fermentum</a>  */}
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