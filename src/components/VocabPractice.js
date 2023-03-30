import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { VocabModelPlayer } from "./VocabModelPlayer";


export const VocabPractice = ({ title, words, onPrevSection, onNextSection }) => {
    const [index, setIndex] = useState(0);

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
            <ProgressBar max={words.length} val={index+1} />
            <div className="container-card vocab-practice">
                <h3 className="card-instruction">Follow this sign!</h3>

                <div className="model-container">
                    <h3 className="card-title">{words[index].gloss}</h3>
                    <VocabModelPlayer words={words} index={index} />
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
                    onClick={() => index == words.length - 1 ? onNextSection() : nextVocab()}
                >
                    {index == words.length - 1 ? "NEXT SECTION" : "NEXT"}
                </button>
            </div>

        </section>
    );
}