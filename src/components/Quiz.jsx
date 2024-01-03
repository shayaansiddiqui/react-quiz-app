import {useState, useCallback} from "react";
import QUESTIONS from '../assets/questions.js'
import quizCompleted from '../assets/quiz-complete.png'
import Question from "./Question.jsx";

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
                setAnswerState('wrong');
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

    return (
        <div id={'quiz'}>
            <Question
                key={activeQuestionIndex}
                answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectAnswer={handleSelectAnswer}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSkipAnswer={handleSkipAnswer}
                questionText={QUESTIONS[activeQuestionIndex].text}/>
        </div>
    );
}

export default Quiz;