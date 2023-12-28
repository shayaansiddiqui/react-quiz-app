import {useState} from "react";
import QUESTIONS from '../assets/questions.js'
import quizCompleted from '../assets/quiz-complete.png'

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const handleSelectAnswer = (selectedAnswer) => {
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer]
        });
    }

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