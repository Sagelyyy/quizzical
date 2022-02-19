import React from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Splash from './components/Splash';
import Quiz from './components/Quiz';


function App() {

  const [splash, setSplash] = React.useState(true)
  const [quizData, setQuizData] = React.useState([])

  function fetchQuiz() {
    const url = `https://opentdb.com/api.php?amount=5`
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        setQuizData(data.results.map(item => ({
          question: item.question,
          correct_answer: item.correct_answer,
          incorrect_answers: item.incorrect_answers,
          allAnswers: shuffle([decodeHTML(...item.incorrect_answers), decodeHTML(item.correct_answer)]),
          userAnswer: '',
          id: nanoid()
        })));
      });
     
  }

  function decodeHTML(text) {
    //inject html into the textarea, and return the decoded value
    let data = document.createElement('textarea')
    data.innerHTML = text
    return data.value
  }

  function clickHandler(event) {
    //work on this
    const { value } = event.target
    console.log(quizData)
  }

  React.useEffect(() => {
    fetchQuiz()
  }, [])

function shuffle(oldAnswers) {
  let array = oldAnswers
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}  

  console.log(quizData)
  // console.log(answers)

  const quizElements = quizData.map(quiz => {
    return (
      <Quiz
        onClick={clickHandler}
        key={quiz.id}
        question={decodeHTML(quiz.question)}
        answers={quiz.allAnswers}
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
