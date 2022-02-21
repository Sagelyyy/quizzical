import React from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {

    const styles = {
        backgroundColor: '#D6DBF5'
    }

    const quizElements = props.answers.map(ans => {
        return (
            ans !== null && ans === props.userAnswer ?
                <button key={nanoid()} style={styles} value={ans} onClick={(event) => props.onClick(event, props.id)} className="quiz--answer">{ans}</button> :
                <button key={nanoid()} style={null} value={ans} onClick={(event) => props.onClick(event, props.id)} className="quiz--answer">{ans}</button>
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