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

  React.useEffect(() => {
      fetchQuiz()
  },[])

      const quizElements = quizData.map(quiz => {
          return(
              <Quiz
                key={nanoid()}
                question={quiz.question}
              />
          )
      })

      console.log(quizElements)
  


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
