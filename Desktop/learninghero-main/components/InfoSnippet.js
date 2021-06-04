import React, { useEffect, useState } from 'react';

import { Input, Icon, Button } from 'antd';
import { CheckCircleOutlined, QuestionCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'


export default function InfoSnippet(props) {
    const [isShown, setIsShown] = useState({ state: false, x: 0, y: 0, align: "left", time: 0 });
    const [answerStatus, setAnswerStatus] = useState("empty");
    const [chosenChoice, setChosenChoice] = useState("???");

    const [count, setCount] = useState(0);

    var mainText = props.snippetData.mainText;
    var snippetText = props.snippetData.snippetText;
    var snippetImg = props.snippetData.snippetImg;
    var snippetLink = props.snippetData.snippetLink;

    console.log('snippet img', snippetImg)

    const [scrollY, setScrollY] = useState(0);
    const [scrollX, setScrollX] = useState(0);

    function logit() {
        setScrollY(window.pageYOffset);
        setScrollX(window.pageXOffset);
        setIsShown({ state: false, x: 0, y: 0, time: 0 })

        console.log('window width', document.documentElement.clientWidth);
    }

    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", logit);
            window.addEventListener("resize", logit);
        }
        watchScroll();
        return () => {
            window.removeEventListener("scroll", logit);
            window.removeEventListener("resize", logit);
        };
    });


    function handleOnEnterGap(event) {
        var time = new Date();
        console.log('enter gap', event.target.getBoundingClientRect())
        var x = event.target.getBoundingClientRect().x;
        var y = event.target.getBoundingClientRect().y;
        var right = event.target.getBoundingClientRect().right;
        console.log(document.body.scrollLeft)
        if (isShown.state) {

        } else {
            if (x < document.documentElement.clientWidth / 2) {
                setIsShown({ state: true, x: x, y: y + 22, align: "left", time: time.getTime() })
            } else {
                setIsShown({ state: true, x:document.documentElement.clientWidth-right-2, y: y + 22, align: "right", time: time.getTime() })
            }
        }
    }

    function handleOnLeaveGap(event) {
        setCount(count + 1)
        var x = event.target.getBoundingClientRect().x;
        var y = event.target.getBoundingClientRect().y;
        console.log(document.body.scrollLeft)
        var time = new Date();


        if ((time.getTime() - isShown.time) > 200) {
            console.log('leave gap', count)
            console.log('elapsed ', time.getTime() - isShown.time)
            setIsShown({ state: false, x: 0, y: 0, align: "left", time: time.getTime() })
        }
    }


    return (
        <div onMouseEnter={(event) => handleOnEnterGap(event)} onMouseLeave={(event) => handleOnLeaveGap(event)} style={{ display: "inline" }}>


            <span style={{ borderWidth: isShown.state ? "0.1px" : "0px", borderStyle: "dotted", fontWeight: "bold", height: "50px", cursor: "pointer", color: "#1890ff" }}> {mainText} </span>




            {isShown.state && (isShown.align == "left") && (
                // <p style={{float:"left"}}> hello </p>

                // isShown.align=="left" && (
                //     <div style={{ cursor: "pointer", backgroundColor: "#1890ff", width: 300, position: "fixed", top: isShown.y, right: isShown.x }}>
                // )
                <div style={{ cursor: "pointer", backgroundColor: "#1890ff", width: 300, position: "fixed", top: isShown.y, left: isShown.x }}>


                    <div style={{ height: 10, backgroundColor: "#1890ff" }}></div>

                    {snippetImg && (
                        <img src={snippetImg} alt="Girl in a jacket" width="280" style={{ marginLeft: 10, marginRight: 10 }} ></img>
                    )}

                    <p style={{ fontSize: "16px", margin: "20px 20px 20px 20px" }}> {snippetText} </p>

                    <div style={{ textAlign: "center" }}>
                        {snippetLink && (
                            <Button onClick={() => window.open(snippetLink, "_blank")}> Learn More </Button>
                        )}
                    </div>


                    <div style={{ height: 10, backgroundColor: "#1890ff" }}></div>
                </div>
            )}



            {isShown.state && (isShown.align == "right") && (
                // <p style={{float:"left"}}> hello </p>

                // isShown.align=="left" && (
                //     <div style={{ cursor: "pointer", backgroundColor: "#1890ff", width: 300, position: "fixed", top: isShown.y, right: isShown.x }}>
                // )
                <div style={{ cursor: "pointer", backgroundColor: "#1890ff", width: 300, position: "fixed", top: isShown.y, right: isShown.x }}>


                    <div style={{ height: 10, backgroundColor: "#1890ff" }}></div>

                    {snippetImg && (
                        <img src={snippetImg} alt="Girl in a jacket" width="280" style={{ marginLeft: 10, marginRight: 10 }} ></img>
                    )}

                    <p style={{ fontSize: "16px", margin: "20px 20px 20px 20px" }}> {snippetText} </p>

                    <div style={{ textAlign: "center" }}>
                        {snippetLink && (
                            <Button onClick={() => window.open(snippetLink, "_blank")}> Learn More </Button>
                        )}
                    </div>


                    <div style={{ height: 10, backgroundColor: "#1890ff" }}></div>
                </div>
            )}




        </div>

    )
}