import {useRef} from "react";
import PropTypes from "prop-types";

const Answers = ({answers, selectedAnswer, answerState, onSelect}) => {
    const shuffledAnswers = useRef();
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

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
                            <button onClick={() => onSelect(item)} className={cssClasses}
                                    disabled={answerState !== ''}>{item}</button>
                        </li>
                    );
                })
            }
        </ul>
    );
}

Answers.propTypes = {
    answers: PropTypes.node.isRequired,
    selectedAnswer: PropTypes.node.isRequired,
    answerState: PropTypes.node.isRequired,
    onSelect: PropTypes.func
}

export default Answers;