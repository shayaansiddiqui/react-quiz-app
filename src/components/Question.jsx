import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../assets/questions.js";
import Answers from "./Answers.jsx";
import {useState} from "react";

const Question = ({questionIndex, onSelectAnswer, onSkipAnswer}) => {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    if(answer.selectedAnswer) {
        timer = 1500;
    }

    if(answer.isCorrect !== null) {
        timer = 2500;
    }

    const handleSelectAnswer = (answer) => {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            console.log('truth for answer: ')
            console.log(QUESTIONS[questionIndex].answers[0] === answer);
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[questionIndex].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000)
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }
    return (
        <div id={'question'}>
            <QuestionTimer
                key={timer}
                mode={answerState}
                timeout={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}/>
            <h2>{QUESTIONS[questionIndex].text}</h2>
            <ul id={'answers'}>
                <Answers
                    answers={QUESTIONS[questionIndex].answers}
                    selectedAnswer={answer.selectedAnswer}
                    answerState={answerState}
                    onSelect={handleSelectAnswer}
                />
            </ul>
        </div>
    )
}

export default Question;