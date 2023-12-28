import {useState} from "react";
import QUESTIONS from '../assets/questions.js'

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    const handleSelectAnswer = (selectedAnswer) => {
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer]
        });
    }

    return (
        <div id={'quiz'}>
            <div id={'question'}>
                <p>{QUESTIONS[activeQuestionIndex].text}</p>
                <ul id={'answers'}>
                    {shuffledAnswers.map((item, index) => (
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