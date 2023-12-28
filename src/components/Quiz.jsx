import {useState, useCallback} from "react";
import QUESTIONS from '../assets/questions.js'
import quizCompleted from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx";

const Quiz = () => {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer]
        });
        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0])
            {
                setAnswerState('correct');
            } else {
                setAnswerState('incorrect');
            }
            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000);
    }, [activeQuestionIndex]);

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
                        shuffledAnswers.map((item, index) => {
                            let cssClasses = '';
                            const isSelected = userAnswers[userAnswers.length - 1] === item;
                            if(answerState === 'answered' && isSelected)
                            {
                                cssClasses = 'selected';
                            }

                            if((answerState === 'correct' || answerState === 'wrong') && isSelected)
                            {
                                cssClasses = answerState;
                            }
                            return (
                                <li key={index} className={'answer'}>
                                    <button onClick={() => handleSelectAnswer(item)} className={cssClasses}>{item}</button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default Quiz;