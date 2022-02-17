import React from "react";

export default function Splash(props){
    return(
    <div className="splash--container">
        <h1 className="splash--title">Quizzical</h1>
        <h4 className="splash--desc">Test your knowledge.</h4>
        <button className="splash--button" onClick={props.onClick}>Start Quiz</button>
    </div>
    )
}