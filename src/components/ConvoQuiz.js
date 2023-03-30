import { useEffect, useState } from "react";
import { CameraInput } from "./CameraInput";
import { ChatDialogue } from "./ChatDialogue";
import { useModelPlayer, useSignRecognition } from "./hooks";
import Loading from "./Loading";
import { ModelPlayer } from "./ModelPlayer";
import { PlaybackControls } from "./PlaybackControls";
import { PredictionDisplay } from "./PredictionDisplay";
import { ProgressBar } from "./ProgressBar";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getAllGloss(dialogue) {
    let glossSet = new Set();

    for (let i = 0; i < dialogue.length; i++) {
        for (let j = 0; j < dialogue[i].glossSentence.length; j++) {
            glossSet.add(dialogue[i].glossSentence[j].gloss)
        }
    }

    const gloss = [...glossSet];
    shuffleArray(gloss);
    return gloss;
}

function getCorrectAns(dialogue) {
    let gloss = [];

    for (let j = 0; j < dialogue.glossSentence.length; j++) {
        gloss.push(dialogue.glossSentence[j].gloss)
    }

    return gloss;
}

function generateRandomOptions(dialogue, d, extraOptions) {
    const allGloss = getAllGloss(dialogue);
    const correctAns = getCorrectAns(d);
    const options = [...correctAns];

    extraOptions = Math.min(extraOptions, allGloss.length - correctAns.length)

    while (options.length < correctAns.length + extraOptions) {
        const randomIndex = Math.floor(Math.random() * allGloss.length);
        const word = allGloss[randomIndex];
        if (!options.includes(word)) {
            options.push(word);
        }
    }

    shuffleArray(options)

    return options;
}

const ReadSign = ({ dialogue, question, answer, handleSetAnswer, modelPlayer }) => {
    const {
        playerState, handleFrame,
        play, stop, reset, seek
    } = modelPlayer;

    const { correctAns } = question;

    const appendWord = (word) => {
        handleSetAnswer([...answer, word]);
    }

    const resetAnswer = () => {
        handleSetAnswer([]);
    }

    return <div className="container-card convo-quiz">
        <h3 className="card-instruction">Form the sentence signed below!</h3>

        <div className="model-container">
            <ModelPlayer playerState={playerState} handleFrame={handleFrame} />
            <PlaybackControls playerState={playerState} play={play} stop={stop} reset={reset} seek={seek} />
        </div>

        <div>
            <div style={{textAlign: "center"}}>In English: <b>{ dialogue.sentence.join(" ") }</b></div>
            <div className="answer-labels">
                <p>Your answer (in gloss):</p>
                {answer.map((ans, i) =>
                    <div key={i} className="answer-label">{ans}</div>
                )}
            </div>
        </div>

        <button className="answer-reset-btn" onClick={resetAnswer}>RESET ANSWER</button>

        <div className="options">
            {
                question.options.map(word => {
                    return <button key={word} className="option-btn" onClick={() => appendWord(word)}>{word}</button>
                })
            }
        </div>
    </div>
}

const DoSign = ({ dialogue, answer, handleSetAnswer }) => {
    const [predictions, setPredictions] = useState([]);
    const [nextPredIndex, setNextPredIndex] = useState(0);

    const targetAnswer = dialogue.glossSentence.map(w => w.gloss);
    useEffect(() => {
        setPredictions(answer.map(p => ({ text: p, isMatch: true })));
        setNextPredIndex(answer.length);
    }, []);

    const onPrediction = (p) => {
        if (nextPredIndex == targetAnswer.length) {
            return;
        }

        const isMatch = p == targetAnswer[nextPredIndex];

        if (isMatch) {
            setNextPredIndex(nextPredIndex + 1);
            handleSetAnswer(targetAnswer.slice(0, nextPredIndex + 1));
        }
        setPredictions([...predictions, { text: p, isMatch }]);
    };

    const { handleFrame, isReady } = useSignRecognition(onPrediction);

    return <div className="container-card convo-quiz">
        <h3 className="card-instruction">Sign the following sentence!</h3>

        <CameraInput handleFrame={handleFrame} />

        <div>
            <div>In English: <b>{ dialogue.sentence.join(" ") }</b></div>
            <div className="answer-labels">
                <p>In gloss: </p>
                {targetAnswer.map((ans, i) =>
                    <div key={i} className="answer-label">{ans}</div>
                )}
            </div>
        </div>


        <div style={{ fontSize: "1.5em" }}>
            {/* <p>Gloss: {targetAnswer.join(" ")}</p> */}
            {isReady
                ? <PredictionDisplay predictions={predictions} isTyping={nextPredIndex < targetAnswer.length} />
                : <>Loading...</>
            } 
        </div>
    </div>
}

export const ConvoQuiz = ({ title, dialogue, onPrevSection, onNextSection }) => {
    const [index, setIndex] = useState(0);

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const modelPlayer = useModelPlayer();

    useEffect(() => {
        modelPlayer.setSentencesWithAnimation(dialogue.map(d => d.glossSentence));
    }, [dialogue]);

    useEffect(() => {
        modelPlayer.setIndex(index);
    }, [index]);

    useEffect(() => {
        setQuestions(dialogue.map( (d, _, dialogue) => ({
            correctAns: getCorrectAns(d),
            options: generateRandomOptions(dialogue, d, 3)
        })));
        setAnswers(dialogue.map(() => []));
    }, []);

    function handleSetAnswer(answer) {
        let newAnswers = [...answers];
        newAnswers[index] = answer;

        setAnswers(newAnswers);
    }

    function checkAnswer() {
        const { correctAns } = questions[index];

        const ans = answers[index];
        var is_same = (ans.length === correctAns.length) && ans.every(function (element, i) {
            return element === correctAns[i];
        });

        return is_same;
    }

    if (questions.length == 0 || answers.length == 0 || modelPlayer.playerState.sentences.length == 0) {
        return <Loading />
    }

    return (
        <section className="container section">
            <h3 className="section-title">{title}</h3>
            <ProgressBar max={dialogue.length} val={index + 1} />

            <div style={{display: "flex"}}>
                {dialogue[index].person == 'A' ?
                    <ReadSign
                        dialogue={dialogue[index]}
                        question={questions[index]}
                        answer={answers[index]}
                        handleSetAnswer={handleSetAnswer}
                        modelPlayer={modelPlayer}
                    /> :
                    <DoSign
                        dialogue={dialogue[index]}
                        answer={answers[index]}
                        handleSetAnswer={handleSetAnswer}
                    />
                }
                <ChatDialogue dialogues={dialogue} lastDialogueIndex={index} />
            </div>

            <div className="prev-next-section">
                <button
                    className="section-btn"
                    onClick={() => index == 0 ? onPrevSection() : setIndex(index - 1)}
                >
                    {index == 0 ? "PREV SECTION" : "PREV"}
                </button>
                <button
                    className="section-btn"
                    disabled={!checkAnswer()}
                    onClick={() => index == dialogue.length - 1 ? onNextSection() : setIndex(index + 1)}
                >
                    {index == dialogue.length - 1 ? "NEXT SECTION" : "NEXT"}
                </button>
            </div>

        </section>
    );
}
