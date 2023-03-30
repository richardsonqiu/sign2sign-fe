import { useEffect, useState } from "react";
import { useModelPlayer } from "./hooks";
import Loading from "./Loading";
import { ModelPlayer } from "./ModelPlayer";
import { ProgressBar } from "./ProgressBar";
import { PlaybackControls } from "./PlaybackControls";


const getWordIndexFromTime = (wordTimes, time) => {
    for (let i = 1; i < wordTimes.length; i++) {
        if (time < wordTimes[i]) {
            return i - 1;
        }
    }
    return wordTimes.length - 1;
}

const WordControls = ({ dialogue, playerState, seekWord }) => {
    const wordTimes = playerState.wordTimes[playerState.index];

    return <div className="word-controls">
        <p className="sentence-label">{dialogue.person}: {dialogue.sentence}</p>
        <div className="gloss-list-input">
            {dialogue.glossSentence.map((w, i) =>
                <button
                    key={i}
                    className={getWordIndexFromTime(wordTimes, playerState.time) == i ? "gloss-active" : "gloss-inactive"}
                    onClick={() => seekWord(i)}
                >
                    {w.gloss}
                </button>
            )}
        </div>
    </div>
}

export const ConvoPractice = ({ title, dialogues, onPrevSection, onNextSection }) => {
    const [convoIndex, setConvoIndex] = useState(0);
    const {
        playerState, handleFrame,
        setSentencesWithAnimation, setIndex: setModelIndex,
        play, stop, reset, seek, seekWord
    } = useModelPlayer();

    useEffect(() => {
        setSentencesWithAnimation(dialogues.map(d => d.glossSentence));
    }, [dialogues]);

    useEffect(() => {
        setModelIndex(convoIndex);
    }, [convoIndex]);

    if (playerState.sentences.length == 0) {
        return <Loading />
    }

    return (
        <section className="container section">
            <h3 className="section-title">{title}</h3>
            <ProgressBar max={dialogues.length} val={convoIndex + 1} />
            <div className="container-card convo-practice">
                <h3 className="card-instruction">Practice this conversation!</h3>
                <div className="model-container">
                    <ModelPlayer playerState={playerState} handleFrame={handleFrame} />
                    <PlaybackControls playerState={playerState} play={play} stop={stop} reset={reset} seek={seek}  />
                </div>
                <WordControls playerState={playerState} dialogue={dialogues[convoIndex]} seekWord={seekWord} />
            </div>

            <div className="prev-next-section">
                <button
                    className="section-btn"
                    onClick={() => convoIndex == 0 ? onPrevSection() : setConvoIndex(convoIndex - 1)}
                >
                    {convoIndex == 0 ? "PREV SECTION" : "PREV"}
                </button>
                <button
                    className="section-btn"
                    onClick={() => convoIndex == dialogues.length - 1 ? onNextSection() : setConvoIndex(convoIndex + 1)}
                >
                    {convoIndex == dialogues.length - 1 ? "NEXT SECTION" : "NEXT"}
                </button>
            </div>

        </section>
    );
}