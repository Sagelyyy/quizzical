import React from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Splash from './components/Splash';
import Quiz from './components/Quiz';
import Grade from './components/Grade';
import Confetti from 'react-confetti';

function App() {

  const [gameState, setGameState] = React.useState(0)
  const [grade, setGrade] = React.useState(0)
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
          allAnswers: shuffle([...item.incorrect_answers, item.correct_answer]),
          userAnswer: null,
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

  function clickHandler(event, id) {
    const { value, style } = event.target
    setQuizData(
      quizData.map(item =>
        item.id === id
          ? { ...item, userAnswer: value }
          : item
      ))

  }

  React.useEffect(() => {
    fetchQuiz()
  }, [])

  function shuffle(oldAnswers) {
    let array = oldAnswers
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    //finally, get rid of the funny html
    const decoded = array.map(arr => decodeHTML(arr))
    return decoded;
  }

  const quizElements = quizData.map(quiz => {
    return (
      <Quiz
        onClick={clickHandler}
        key={quiz.id}
        id={quiz.id}
        question={decodeHTML(quiz.question)}
        answers={quiz.allAnswers}
        selected={quiz.selected}
        userAnswer={quiz.userAnswer}
      />
    )
  })

  function startHandler() {
    setGameState(1)
  }

  function checkAnswers() {
    setGameState(2)
    const answer = quizData.map(item =>
      item.userAnswer === item.correct_answer ? setGrade(old => old += 1) : null)
  }

  function newGame() {
    setGameState(0)
    setGrade(0)
    fetchQuiz()
  }

  return (
    <div className="App">
      {grade === 5 ? <Confetti /> : null}
      {gameState === 0 ? <Splash onClick={startHandler} /> : quizElements}
      {gameState === 2 ? <Grade grade={grade} /> : null}
      {gameState === 1 ? <button onClick={checkAnswers} className='app--grade'>Check answers</button> : null}
      {gameState === 2 ? <button onClick={newGame} className='app--newQuiz'>New Quiz?</button> : null}
    </div>
  );
}

export default App;
