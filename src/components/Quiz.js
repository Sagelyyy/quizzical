import React from "react";

export default function Quiz(props) {

    const quizElements = props.answers.map(ans => {
        return (
             ans !== null && <button onClick={props.onClick} className="quiz--answer">{ans}</button>
        )
    })

    return (
        <div className="quiz--container">
            <h1 className="quiz--question">{props.question}</h1>
            <div className="quiz--answer--container">
            {quizElements}
            </div>
            <hr></hr>

        </div>
    )
}