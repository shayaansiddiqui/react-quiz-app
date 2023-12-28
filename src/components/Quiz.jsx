import {useState, useCallback} from "react";
import QUESTIONS from '../assets/questions.js'
import quizCompleted from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx";

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer]
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    if(quizIsComplete) {
        return (<div id={'summary'}>
            <img src={quizCompleted} alt={'Quiz Completed Trophy'} />
            <h2>Quiz Completed</h2>
        </div>)
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id={'quiz'}>
            <QuestionTimer
                key={activeQuestionIndex}
                timeout={10000}
                onTimeout={handleSkipAnswer} />
            <div id={'question'}>
                <p>{QUESTIONS[activeQuestionIndex].text}</p>
                <ul id={'answers'}>
                    {
                        shuffledAnswers.map((item, index) => (
                            <li key={index} className={'answer'}>
                                <button onClick={() => handleSelectAnswer(item)}>{item}</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Quiz;