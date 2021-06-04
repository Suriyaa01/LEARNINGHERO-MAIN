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
    CaretRightOutlined,
    HeatMapOutlined,
    StarFilled,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';


import 'antd/dist/antd.css'

import styles from '../pages/styles.module.css'

// read about Ant Design Navigation Bar layouts at this url: https://ant.design/components/layout/

// import './home.css'

export default class NavBarSide extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isToggleOn: true, 
            myWidth: 0,
            currentMenuIndex: null,
        };

        console.log('propsSideBar', this.props)

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);

        this.sideBarColor = "#563C04"
        this.buttonColor = "#774919"
        this.highlightColor = "#9C6412"

        // this.currentMenuIndex;
    }

    componentDidMount() {

        var pageUrl = window.location.href;

        var splitUrl = pageUrl.split("/");
        var extractedUrl = "";
        for (var i in splitUrl) {
            if (i > 2) {
                extractedUrl =  extractedUrl + '/' + splitUrl[i];
            }
        }
        console.log('splitUrl', splitUrl)
        console.log('extractedUrl', extractedUrl)
        console.log('pageUrl', pageUrl)

        if (this.props.menuList) {
            var res = this.props.menuList.filter( item => item.url == extractedUrl)
            if (res.length>0){
                console.log('bluga', res[0].index )
                // this.currentMenuIndex = res[0].index;
                this.setState({currentMenuIndex: res[0].index})
            }
        }
        console.log('res',res)
    }

    handleClick(event) {
        console.log('click',event)
        window.location.href = this.props.menuList[event.key].url;

    }


    render() {
        // const { collapsed } = this.state;
        return (
            <Sider
                // style={{position:"fixed", top:70, bottom:0, overflow:"scroll"}}
                // style={{overflow:"scroll"}}
                style={{ position: "fixed", top: "66px", minHeight: "100vh", backgroundColor: this.sideBarColor  }}
                breakpoint="lg"
                collapsedWidth="0"
                width="200"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                    if (this.state.myWidth == 0) {
                        this.setState({ myWidth: 200 })
                    } else {
                        this.setState({ myWidth: 0 })
                    }
                    console.log('jajamiao', this.state.myWidth)
                }}
            >
                {/* <div className="logo" /> */}
                {/* <p style={{ color: "red" }}> put your quest image here</p> */}



                <img  src="https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/fraction101%20cover%20image.jpg" width="180" style={{marginLeft:"10px", marginTop:"10px" }}></img>
                {/* <h1 style={{fontSize:"18px", color:"white", marginLeft:"10px", marginTop:"10px" }}> ภารกิจ: </h1>
                <h1 style={{fontSize:"24px", color:"white", marginLeft:"10px", marginTop:"10px" }}> เศษส่วน 101 </h1> */}


                <p style={{ color:"white", marginTop:"10px", marginBottom:"5px", marginLeft:"10px", fontSize:"16px"}}> รายการภารกิจ </p>

                { (this.props.menuList != null) &&  
                <Menu onClick={this.handleClick} theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{marginTop:10, backgroundColor: this.sideBarColor }}>
                    {this.props.menuList.map( item => {
                        return (
                            // <Menu.Item className={`${styles.navBarSideLinks}`} icon={<StarFilled style={{color:"white"}} />} key={item.index} style={{ marginTop:4, marginBottom:4, marginLeft:10, width:"180px"}}>
                            //     {item.name}
                            // </Menu.Item>
                            <Menu.Item  icon={<StarFilled style={{color:"white"}} />} key={item.index} style={{color:"white", backgroundColor:(item.index == this.state.currentMenuIndex)? this.highlightColor:this.buttonColor, marginTop:4, marginBottom:4, marginLeft:10, width:"180px"}}>
                                {item.name}
                            </Menu.Item>
                        )
                    })}
                </Menu>
                }
                {/* <p style={{color:"white"}}> {this.state.currentMenuIndex + "hello"} </p> */}

                {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        nav 4
                </Menu.Item>
                </Menu> */}


            </Sider>
        );
    }
}