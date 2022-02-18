import React from "react";

export default function Quiz(props) {

    const answerArray = [props.wrong, props.wrong1, props.wrong2, props.answer]
    const [answers, setAnswers] = React.useState('')
    
    React.useEffect(() => {
        setAnswers(() => {
            const shuffledArray = answerArray.sort((a, b) => 0.5 - Math.random())
            return shuffledArray
        })
        console.log(answers)
    }, [])

    const quizElements = answers.map(ans => {
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