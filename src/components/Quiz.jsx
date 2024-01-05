import {useState, useCallback} from "react";
import QUESTIONS from '../assets/questions.js'
import quizCompleted from '../assets/quiz-complete.png'
import Question from "./Question.jsx";

const Quiz = () => {

    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer]
        });
    }, []);

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer]
    );
    if (quizIsComplete) {
        return (<div id={'summary'}>
            <img src={quizCompleted} alt={'Quiz Completed Trophy'}/>
            <h2>Quiz Completed</h2>
        </div>)
    }

    return (
        <div id={'quiz'}>
            <Question
                key={activeQuestionIndex}
                questionIndex={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}/>
        </div>
    );
}

export default Quiz;