import React, { useEffect, useState } from 'react';

import { Input, Icon } from 'antd';
import { CheckCircleOutlined, QuestionCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'


export default function MultiChoiceDropdown(props) {
    const [isShown, setIsShown] = useState({ state: false, x: 0, y: 0, time: 0 });
    const [answerStatus, setAnswerStatus] = useState("empty");
    const [chosenChoice, setChosenChoice] = useState("???");

    const [count, setCount] = useState(0);

    console.log('answer', props.data.answer)
    console.log('choice', props.data.choice)


    var maxLength = 0;
    for (var item of props.data.choice) {
        if (item.length > maxLength) {
            maxLength = item.length;
        }
    }
    console.log('max length', maxLength)


    const [scrollY, setScrollY] = useState(0);
    const [scrollX, setScrollX] = useState(0);
  
    function logit() {
      setScrollY(window.pageYOffset);
      setScrollX(window.pageXOffset);
      setIsShown({ state: false, x: 0, y: 0, time:0 }) 

      console.log( 'window width', document.documentElement.clientWidth);
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
        console.log('bounding box', event.target.getBoundingClientRect())
        var x = event.target.getBoundingClientRect().x;
        var y = event.target.getBoundingClientRect().y;
        var width = event.target.getBoundingClientRect().width;
        console.log(document.body.scrollLeft)
        if (isShown.state) {

        } else {
            setIsShown({ state: true, x: x, y: y + 22,  time: time.getTime() })
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
            setIsShown({ state: false, x: 0, y: 0, time: time.getTime() })
        }
    }

    function handleChoiceClick(event) {
        console.log('choice click', event.target.innerText)
        var chosenChoice = event.target.innerText;
        if (chosenChoice == props.data.answer) {
            setChosenChoice(chosenChoice)
            setAnswerStatus("correct")
            props.data.status("correct")
        } else {
            setChosenChoice(chosenChoice)
            setAnswerStatus("wrong")
            props.data.status("wrong")
        }
    }


    return (
        <div onMouseEnter={(event) => handleOnEnterGap(event)} onMouseLeave={(event) => handleOnLeaveGap(event)} style={{ display: "inline", margin: "0px 5px 0px 5px" }}>
            <span style={{ height: "50px", cursor: "pointer", color: "white", borderRadius: "5px", padding: "0px 5px 0px 5px", backgroundColor: "#1890ff" }}> {chosenChoice} </span>

            {(answerStatus == "wrong") && (
                <CloseCircleOutlined style={{ color: "red", marginLeft: "2px", marginRight: "2px" }} />
            )}

            {(answerStatus == "correct") && (
                <CheckCircleOutlined style={{ color: "green", marginLeft: "2px", marginRight: "2px" }} />
            )}

            {isShown.state && (
                // <p style={{float:"left"}}> hello </p>
                <div style={{ cursor: "pointer", backgroundColor: "#1890ff", width: maxLength * 15, position: "fixed", top: isShown.y, left: isShown.x }}>
                    {/* <p style={{ margin: "20px 20px 20px 20px" }}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed urna eget magna elementum cursus. Nullam ornare vitae augue vitae feugiat. Maecenas tempus lobortis placerat. Duis urna purus, pellentesque lacinia orci ut, luctus egestas felis. Integer posuere porttitor urna pulvinar cursus. Nunc a sagittis risus, in vestibulum erat. Aenean sodales in ligula a ultricies. Sed maximus lacus a leo tempus finibus.
                  </p> */}

                    {props.data.choice.map((choice) =>
                        <>
                            <p onClick={(event) => handleChoiceClick(event)} style={{ padding: "10px 10px 10px 10px", height: "10px" }}>{choice}</p>
                            <div style={{ backgroundColor: 'white', height: "0.1px" }}> </div>
                        </>
                    )}
                    <div style={{ backgroundColor: '#1890ff', height: "5px" }}> </div>
                </div>
            )}


        </div>

    )
}