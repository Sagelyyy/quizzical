import React from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Splash from './components/Splash';
import Quiz from './components/Quiz';


function App() {

  const [splash, setSplash] = React.useState(true)
  const [quizData, setQuizData] = React.useState([])

  function fetchQuiz(){
      const url = `https://opentdb.com/api.php?amount=5`
      fetch(url)
          .then(response => response.json())
          .then((data) => {
            setQuizData(data.results);
          });
  }

  function decodeHTML(text){
    //inject html into the textarea, and return the decoded value
    let data = document.createElement('textarea')
    data.innerHTML = text
    return data.value
  }

  React.useEffect(() => {
      fetchQuiz()
  },[])


      const quizElements = quizData.map(quiz => {
          return(
              <Quiz
                key={nanoid()}
                question={decodeHTML(quiz.question)}
                answer={decodeHTML(quiz.correct_answer)}
                wrong={decodeHTML(quiz.incorrect_answers[0])}
                wrong1={quiz.incorrect_answers[1] != undefined ? decodeHTML(quiz.incorrect_answers[1]) : null}
                wrong2={quiz.incorrect_answers[2] != undefined ? decodeHTML(quiz.incorrect_answers[2]) : null}
              />
          )
      })

      console.log(quizData)
  


  function startHandler(){
    setSplash(old => !old)
  }

  return (
    <div className="App">
        {splash ? <Splash onClick={startHandler}/> : quizElements}
    </div>
  );
}

export default App;
