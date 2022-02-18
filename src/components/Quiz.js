import React from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {

    const answerArray = [props.answer, props.wrong, props.wrong1, props.wrong2]

    const quizElements = answerArray.map(ans => {
        return(
            ans !== null && <button className="quiz--answer">{ans}</button>
        )
    })

    return (
        <div className="quiz--container">
            <h1 className="quiz--question">{props.question}</h1>
            {quizElements}
        </div>
    )
}