import React from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {

    const styles = {
        selected: {backgroundColor: '#D6DBF5'},
        correct: {backgroundColor: '#94D7A2'},
        incorrect: {backgroundColor: '#F8BCBC'}
    }


    const gradeElements = props.answers.map(ans => {
        if(ans === props.userAnswer && props.userAnswer === props.correct){
            return <button key={nanoid()} style={styles.correct} value={ans}  className="quiz--answer">{ans}</button>
        }
        if(ans !== props.userAnswer && ans == props.correct){
            return <button key={nanoid()} style={styles.correct} value={ans}  className="quiz--answer">{ans}</button>
        }
        return ans === props.userAnswer && props.userAnswer !== props.correct ?
            <button key={nanoid()} style={styles.incorrect} value={ans}  className="quiz--answer--incorrect">{ans}</button>:
            <button key={nanoid()} style={null} value={ans}  className="quiz--answer--unselected">{ans}</button>
    })

    const quizElements = props.answers.map(ans => {
            return (
                ans !== null && ans === props.userAnswer ?
                    <button key={nanoid()} style={styles.selected} value={ans} onClick={(event) => props.onClick(event, props.id)} className="quiz--answer">{ans}</button> :
                    <button key={nanoid()} style={null} value={ans} onClick={(event) => props.onClick(event, props.id)} className="quiz--answer">{ans}</button>
            )
    })

    return (
        <div className="quiz--container">
            <h1 className="quiz--question">{props.question}</h1>
            <div className="quiz--answer--container">
                {props.state === 1 && quizElements}
                {props.state === 2 && gradeElements}
            </div>
            <hr></hr>

        </div>
    )
}