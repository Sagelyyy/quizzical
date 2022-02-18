import React from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Splash from './components/Splash';
import Quiz from './components/Quiz';


function App() {

  const [splash, setSplash] = React.useState(true)
  const [quizData, setQuizData] = React.useState([])
  const [answers, setAnswers] = React.useState('')
  const [wrongAnswers, setWrongAnswers] = React.useState('')
  const [userAnswers, setUserAnswers] = React.useState({
    question0: false,
    question1: false,
    question2: false,
    question3: false,
    question4: false,
  })

  function fetchQuiz() {
    const url = `https://opentdb.com/api.php?amount=5`
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        setQuizData(data.results);
        const correct = data.results.map(ans => ans.correct_answer)
        setAnswers(correct)
      });
     
  }

  function decodeHTML(text) {
    //inject html into the textarea, and return the decoded value
    let data = document.createElement('textarea')
    data.innerHTML = text
    return data.value
  }

  function clickHandler(event) {
    const { textContent } = event.target
    for (let i = 0; i < answers.length; i += 1) {
      if (textContent === decodeHTML(answers[i])) {
        setUserAnswers(() => {
          return{
            test: 'test'
          }
        })
      }
    }
  }

  React.useEffect(() => {
    fetchQuiz()
  }, [])

  console.log(quizData)
  console.log(answers)

  const quizElements = quizData.map(quiz => {
    return (
      <Quiz
        onClick={clickHandler}
        key={nanoid()}
        question={decodeHTML(quiz.question)}
        answer={decodeHTML(quiz.correct_answer)}
        wrong={decodeHTML(quiz.incorrect_answers[0])}
        wrong1={quiz.incorrect_answers[1] !== undefined ? decodeHTML(quiz.incorrect_answers[1]) : null}
        wrong2={quiz.incorrect_answers[2] !== undefined ? decodeHTML(quiz.incorrect_answers[2]) : null}
      />
    )
  })

  function startHandler() {
    setSplash(old => !old)
  }

  return (
    <div className="App">
      {splash ? <Splash onClick={startHandler} /> : quizElements}
      {splash ? '' : <button className='app--grade'> Check answers</button>}
    </div>
  );
}

export default App;
