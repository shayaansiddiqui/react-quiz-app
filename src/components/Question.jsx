import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../assets/questions.js";
import Answers from "./Answers.jsx";

const Question = ({questionText, answers, selectedAnswer, answerState, onSelectAnswer, onSkipAnswer}) => {
    return (
        <div id={'question'}>
            <QuestionTimer
                timeout={10000}
                onTimeout={onSkipAnswer}/>
            <h2>{questionText}</h2>
            <ul id={'answers'}>
                <Answers
                    answers={answers}
                    selectedAnswer={selectedAnswer}
                    answerState={answerState}
                    onSelect={onSelectAnswer}
                />
            </ul>
        </div>
    )
}

export default Question;