import React from "react";

export default function Quiz(props) {

    const answerArray = [<button className="quiz--answer">{props.answer}</button>,
    <button className="quiz--answer">{props.wrong}</button>,
    <button className="quiz--answer">{props.wrong1}</button>,
    <button className="quiz--answer">{props.wrong2}</button>]

    return (
        <div className="quiz--container">
            <h1 className="quiz--question">{props.question}</h1>
            {answerArray.pop(Math.floor(Math.random(answerArray)*answerArray.length))}
            {answerArray.pop(Math.floor(Math.random(answerArray)*answerArray.length))}
            {answerArray.pop(Math.floor(Math.random(answerArray)*answerArray.length))}
            {answerArray.pop(Math.floor(Math.random(answerArray)*answerArray.length))}
        </div>
    )
}