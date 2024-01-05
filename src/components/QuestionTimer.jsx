import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const QuestionTimer = ({timeout, onTimeout, mode}) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(timer);
        }
    }, [timeout, onTimeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <progress id={'question-time'} value={remainingTime} max={timeout} className={mode}/>
    );
}

QuestionTimer.propTypes = {
    timeout: PropTypes.node.isRequired,
    mode: PropTypes.node.isRequired,
    onTimeout: PropTypes.func
}

export default QuestionTimer;