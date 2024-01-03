import QUESTIONS from "../assets/questions.js";
import {useRef} from "react";

const Answers = ({answers, selectedAnswer, answerState, onSelect}) => {
    const shuffledAnswers = useRef();
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    console.log(answerState);
    return (
        <ul id={'answers'}>
        {
            shuffledAnswers.current.map((item, index) => {
                let cssClasses = '';
                const isSelected = selectedAnswer === item;
                if (answerState === 'answered' && isSelected) {
                    cssClasses = 'selected';
                }

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClasses = answerState;
                }
                return (
                    <li key={index} className={'answer'}>
                        <button onClick={() => onSelect(item)} className={cssClasses}>{item}</button>
                    </li>
                );
            })
        }
        </ul>
    );
}
export default Answers;