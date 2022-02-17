import React from 'react';
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
            console.log(quizData)
          });
          
  }

  React.useEffect(() => {
      fetchQuiz()
  },[])

  function mapQuiz(){
      const quizElements = quizData.map(quiz => {
          return(
              <Quiz 
                question={quiz.question}
              />
          )
      })
  }


  function startHandler(){
    setSplash(old => !old)
  }

  return (
    <div className="App">
        {splash ? <Splash onClick={startHandler}/> : <Quiz />}
    </div>
  );
}

export default App;
