import React from "react";

export default function Quiz(props){

    return(
        <div className="quiz--container">
            <h1 className="quiz--question">{props.question}</h1>
            <button className="quiz--answer">{props.answer}</button>
            <button className="quiz--answer">{props.wrong}</button>
            <button className="quiz--answer">{props.wrong}</button>
            <button className="quiz--answer">{props.wrong}</button>
        </div>
    )
}