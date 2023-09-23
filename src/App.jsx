import { useEffect, useState } from 'react';
import quizData from './questions.json';
import { BsChevronLeft } from 'react-icons/bs';

const App = () => {
  const questions = quizData.questions;

  // Function to randomize questions
  const randomize = (array) => {
    const randomArr = [...array];
    for (let i = randomArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomArr[i], randomArr[j]] = [randomArr[j], randomArr[i]];
    }
    return randomArr;
  };

  const totalQues = questions.length;

  const [showStart, setShowStart] = useState(true);
  const [randomQues, setRandomQues] = useState(randomize(questions));
  const [randomOptions, setRandomoptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [animation, setAnimation] = useState('');

  // Function to randomize options for current question
  const currentOptions = () => {
    if (currentQuestion >= 0 && currentQuestion < totalQues) {
      const options = randomize(randomQues[currentQuestion].options);
      setRandomoptions(options);
    }
  };

  useEffect(() => {
    currentOptions();
  }, [currentQuestion]);

  // Function to handle user option selection
  const handleOption = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnimation('fade-out');
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < totalQues) {
        setCurrentQuestion(nextQuestion);
        setAnimation('fade-in');
      } else {
        setShowScore(true);
      }
    }, 500);
  };

  // Function to navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Function to Restart the Quiz
  const restartQuiz = () => {
    setRandomQues(randomize(questions));
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setAnimation('');
    currentOptions();
  };

  const startQuiz = () => {
    setShowStart(false);
  };

  const progress = ((currentQuestion + 1) / totalQues) * 100;

  return (
    <div className="app">
      {showStart ? (
        <div className="home__page">
          <h1>Welcome to the Saffron Quiz</h1>
          <p>Test My Assignment by starting the Quiz</p>
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : showScore ? (
        <div className="score__section">
          <p>
            You Scored <span>{score}</span> out of {totalQues}
          </p>
          <button onClick={restartQuiz}>Retake Quiz</button>
        </div>
      ) : (
        <>
          <div className="question__section">
            <div className="question__count">
              <span>
                <BsChevronLeft onClick={prevQuestion} />
              </span>
              <span>{(currentQuestion + 1).toString().padStart(2, '0')}</span>/
              {totalQues.toString().padStart(2, '0')}
            </div>
            <div className="progress__bar">
              <div
                className="progress__indicator"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className={`question__text ${animation}`}>
              {randomQues[currentQuestion].question}
            </div>
            <p>History of Art</p>
          </div>

          <div className="answer__section">
            <div className={`answer__section-btns ${animation}`}>
              {randomOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOption(option.isCorrect)}
                >
                  <span>{String.fromCharCode(97 + index)}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
