import { useEffect, useState } from "react";
import { CameraInput } from "./CameraInput";
import { useSignRecognition } from "./hooks";
import { PredictionDisplay } from "./PredictionDisplay";
import { ProgressBar } from "./ProgressBar";

export const VocabQuizSigning = ({ title, words, onPrevSection, onNextSection }) => {
    const [index, setIndex] = useState(0);

    const [predictions, setPredictions] = useState([]);
    const [nextPredIndex, setNextPredIndex] = useState(0);

    const targetSequence = [words[index].gloss];
    const onPrediction = (p) => {
        if (nextPredIndex == targetSequence.length) {
            return;
        }

        const isMatch = p == targetSequence[nextPredIndex];
        if (isMatch) setNextPredIndex(nextPredIndex + 1);
        setPredictions([...predictions, { text: p, isMatch }]);
    };

    useEffect(() => {
        setPredictions([]);
        setNextPredIndex(0);
    }, [index]);

    const { handleFrame, isReady } = useSignRecognition(onPrediction);

    function prevVocab() {
        const prevIndex = Math.max(index - 1, 0);
        setIndex(prevIndex);
    }

    function nextVocab() {
        const nextIndex = Math.min(index + 1, words.length - 1);
        setIndex(nextIndex);
    }

    return (
        <section className="container section">
            <h3 className="section-title">{title}</h3>
            <ProgressBar max={words.length} val={index + 1} />
            <div className="container-card vocab-quiz-signing">
                <h3 className="card-instruction">Sign the following words!</h3>

                <div className="model-container">
                    <h3 className="card-title">{words[index].gloss}</h3>
                    <CameraInput handleFrame={handleFrame} />
                </div>

                {/* Prediction section */}
                <div style={{fontSize: "1.5em"}}>
                    {isReady
                        ? <PredictionDisplay predictions={predictions} isTyping={nextPredIndex < targetSequence.length} />
                        : <>Loading...</>
                    }
                </div>
            </div>

            <div className="prev-next-section">
                <button
                    className="section-btn"
                    onClick={() => index == 0 ? onPrevSection() : prevVocab()}
                >
                    {index == 0 ? "PREV SECTION" : "PREV"}
                </button>
                <button 
                    className="section-btn"
                    disabled={nextPredIndex < 1}
                    onClick={() => index == words.length - 1 ? onNextSection() : nextVocab()}
                >
                    {index == words.length - 1 ? "NEXT SECTION" : "NEXT"}
                </button>
            </div>

        </section>
    );
}
