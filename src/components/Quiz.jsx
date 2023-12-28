import {useState} from "react";
import QUESTIONS from '../assets/questions.js'

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

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
                    {QUESTIONS[activeQuestionIndex].answers.map((item, index) => (
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