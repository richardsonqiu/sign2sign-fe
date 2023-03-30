import { useEffect, useRef } from "react";

const Typing = () => {
    return <span className="typing">{Array(4).fill().map((_, i) => <span key={i}>.</span>)}</span>
}

const Word = ({ text, isMatch }) => {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        element.style.maxWidth = element.firstChild.scrollWidth + "px";
    }, []);

    return <span
        ref={ref}
        className={['word', isMatch ? 'match' : 'not-match'].join(' ')}
    >
        <span>{text}</span>
    </span>
}

export const PredictionDisplay = ({ predictions, isTyping }) => {
    return <div className="prediction-display">
        {predictions.map(({ text, isMatch }, i) =>
            <Word key={i} text={text} isMatch={isMatch} />
        )}
        { isTyping && <Typing /> }
    </div>
}
