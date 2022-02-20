import React from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {

    const styles = {
        backgroundColor: 'red'
    }

    const quizElements = props.answers.map(ans => {
        return (
            ans !== null && 
            <button key={nanoid()} value={ans} onClick={(event) => props.onClick(event, props.id)} className="quiz--answer">{ans}</button>
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