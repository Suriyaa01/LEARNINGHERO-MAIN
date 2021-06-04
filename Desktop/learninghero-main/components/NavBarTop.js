import { Layout, Menu, Breadcrumb } from 'antd';
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
  StarOutlined,
  StarFilled,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';


import 'antd/dist/antd.css'

import styles from '../pages/styles.module.css'

// read about Ant Design Navigation Bar layouts at this url: https://ant.design/components/layout/

// import './home.css'

export default class NavBarTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true, myWidth: 0};

    console.log('props lesson', this.props.lesson)

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.navBarColor = "#3F2F0B"

  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
    this.setState({myWidth:100})
    console.log('myWidth', myWidth)
  }

  render() {
    // const { collapsed } = this.state;
    return (
      <div>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor:this.navBarColor }} className="header">

          <div>
            <div style={{ float: "left", width: "50%", height:"50px", backgroundColor: this.navBarColor }}>
              <div style={{backgroundColor:this.navBarColor, marginLeft:"-38px"}}>
                <p style={{fontSize:"24px", color:"white", fontWeight:"bold"}}> LEARNING HERO</p>
              </div>
            </div>
            {/* <p style={{fontSize:"18px", fontColor:"white"}}> LEARNING HERO</p> */}
            <div style={{ float: "right", width: "50%", backgroundColor: this.navBarColor, display:"inline-block" }}>

            <div className={`${styles.navBarTopLinks}`} style={{fontSize:"25px",float:"right", display:"inline-block", width:"80px", textAlign:"center"}}>
                <UserOutlined></UserOutlined>
              </div>
              <div className={`${styles.navBarTopLinks}`} style={{float:"right", display:"inline-block", width:"80px", textAlign:"center"}}>
                เข้าร่วมทีม
              </div>
              <div className={`${styles.navBarTopLinks}`} style={{float:"right", display:"inline-block", width:"80px", textAlign:"center"}}>
                คลังภารกิจ
              </div>

              {/* <Menu style={{ textAlign: "right", backgroundColor:this.navBarColor}} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1" className={`${styles.hello}`} >nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu> */}
            </div>
          </div>
          {/* <p style={{color:"green"}}>  Put Your Logo Here </p> */}

        </Header>
                  <div style={{height:"2px", backgroundColor:"black"}}></div>
</div>

    );
  }
}