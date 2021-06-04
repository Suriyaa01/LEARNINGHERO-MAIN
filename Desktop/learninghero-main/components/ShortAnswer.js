import React, { useEffect, useState } from 'react';

import { Input, Icon } from 'antd';
import { CheckCircleOutlined, QuestionCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'


export default function ShortAnswer(props) {

    const [answerStatus, setAnswerStatus] = useState("empty");

    console.log('shortAnswer', props.data)

    function handleAnswer(event) {
        console.log('event value', event.target.value)
        var result = 0;
        for (var answer of props.data.answer) {
            if (event.target.value == answer) {
                result = 1;
            }
        }
        if (event.target.value.length == 0) {
            setAnswerStatus("empty")
            props.data.status("empty")
        } else {
            if (result == 1) {
                setAnswerStatus("correct")
                props.data.status("correct")
            } else {
                setAnswerStatus("wrong")
                props.data.status("wrong")
            }
        }

        
    }

    return (
        // <div style={{margin: "0px 5px 0px 5px", display:"inline", backgroundColor:"#1890ff", height:"60px", borderColor:"#1890ff", borderStyle:"solid", borderWidth:"2px"}}>
        //     <Input onChange={handleAnswer} style={{ width: "120px", height:"20px" }} placeholder="เติมคําในช่องว่าง..." />
            
        //     <div style={{display:"inline", borderColor:"#1890ff", borderStyle:"solid", borderWidth:"2px"}}>
        //         {(answerStatus=="empty") && (
        //             <QuestionCircleOutlined  style={{color:"white", marginLeft:"2px", marginRight:"2px"}}/>
        //         )}

        //         {(answerStatus=="wrong") && (
        //             <CloseCircleOutlined style={{color:"red", marginLeft:"2px", marginRight:"2px"}}/>
        //         )}

        //         {(answerStatus=="correct") && (
        //             <CheckCircleOutlined style={{color:"green", marginLeft:"2px", marginRight:"2px"}}/>
        //         )}
        //     </div>

        // </div>
        <div style={{display:"inline", margin: "0px 5px 0px 5px" }}>
                <input onChange={handleAnswer} placeholder="???" type="text" id="fname" name="fname" style={{ textAlign:"center", width:"80px",borderRadius:"10px", borderColor:"#1890ff", borderWidth:0.5, borderStyle:"solid"}}/>
                {/* {(answerStatus=="empty") && (
                    <QuestionCircleOutlined  style={{color:"white", marginLeft:"2px", marginRight:"2px"}}/>
                )} */}

                {(answerStatus=="wrong") && (
                    <CloseCircleOutlined style={{color:"red", marginLeft:"2px", marginRight:"2px"}}/>
                )}

                {(answerStatus=="correct") && (
                    <CheckCircleOutlined style={{color:"green", marginLeft:"2px", marginRight:"2px"}}/>
                )}
        </div>

    )
}