import { CameraInput } from "components/CameraInput";
import { ConvoPractice } from "components/ConvoPractice";
import { useModelPlayer, useSignRecognition } from "components/hooks";
import Loading from "components/Loading";
import { ModelPlayer } from "components/ModelPlayer";
import { PredictionDisplay } from "components/PredictionDisplay";
import { useEffect, useState, useRef } from "react"
import { FaPause, FaPlay, FaSquare } from "react-icons/fa";


// export default () => {
//     const [predictions, setPredictions] = useState([]);
//     const { handleFrame } = useSignRecognition(p => setPredictions([...predictions, p]));

//     return <div>
//         <CameraInput handleFrame={handleFrame} />
//         <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)"}}>
//             {predictions.map((val, i) =>
//                 <div key={i}>
//                     {val}
//                 </div>
//             )}
//         </div>
//     </div>
// }

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ProgressBar = ({ max, val }) => {
    return <div className="progress-bar">
        <div className="filled" style={{ width: `${val * 100 / max}%` }}></div>
    </div>
}

function parseGLTF(data) {
    const loader = new GLTFLoader();
    return new Promise(function (resolve, reject) {
        loader.parse(data, null, resolve, reject);
    });
}


const ConvertAnimation = () => {
    const [file, setFile] = useState(null);
    const [animations, setAnimations] = useState({});

    useEffect(() => {
        if (!file) return;

        (async () => {
            const gltf = await parseGLTF(await file.arrayBuffer());
            const clips = {};
            for (const clip of gltf.animations) {
                clips[clip.name] = clip.toJSON();
            }
            setAnimations(clips);
        })()

    }, [file]);

    return <div>
        <input type={"file"} onChange={async e => {
            const files = e.target.files;
            if (files.length == 0) {
                return;
            }

            setFile(files[0]);
        }} />
        <ol>
            {Object.entries(animations).map(([name, data]) => {
                const blob = new Blob([JSON.stringify(data)], { type: "text/json" });
                return <li key={name}>
                    <a
                        download={`${file.name.substring(0, file.name.length - 5)}.json`}
                        href={URL.createObjectURL(blob)}

                    >
                        {name}
                    </a>
                </li>
            })}
        </ol>
    </div>
}

const ModelTest = () => {
    const {
        playerState,
        handleFrame,
        setSentencesWithAnimation, setIndex,
        seek, play, stop, reset
    } = useModelPlayer();

    useEffect(() => {
        (async () => {
            await setSentencesWithAnimation([["test_wave", "hello", "face"]]);
        })()
    }, []);

    if (playerState.sentences.length == 0) return <Loading />

    // Current word from player state
    const word = playerState.sentences[playerState.index]?.at(0);
    const wordDuration = playerState.wordTimes[playerState.index]?.at(-1);

    return <div>
        <div className="model-player">
            <ModelPlayer
                playerState={playerState}
                handleFrame={handleFrame}
            //   debug={true}
            />
        </div>
        <div className="model-controls">
            <div
                className="play-pause"
                onClick={() =>
                    (Math.abs(playerState.time - wordDuration) < 0.01)
                        ? reset()
                        : (playerState.isPlaying)
                            ? stop()
                            : play()
                }
            >
                {
                    (Math.abs(playerState.time - wordDuration) < 0.01)
                        ? <FaSquare />
                        : (playerState.isPlaying)
                            ? <FaPause />
                            : <FaPlay />
                }
            </div>
            <input
                type="range"
                min={0}
                max={wordDuration}
                step={0.01}
                value={playerState.time}
                onInput={e => seek(parseFloat(e.target.value))}
            />
        </div>
    </div>
}



function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const words = ["heh", "boop", "testing", "gyaa", "dotdotdot"]
const Boop = () => {
    const [predictions, setPredictions] = useState([]);
    const [nextPredIndex, setNextPredIndex] = useState(0);

    useInterval(() => {
        const text = words[Math.floor(Math.random() * words.length)]

        const targetSequence = ["heh", "gyaa", "testing", "dotdotdot", "dotdotdot", "testing", "testing"];
        const isMatch = text == targetSequence[nextPredIndex];

        if (isMatch) {
            setNextPredIndex(nextPredIndex + 1)
        }

        setPredictions([...predictions, { text, isMatch }])
    }, 2000);

    return <div style={{ fontSize: "2em" }}>
        <PredictionDisplay predictions={predictions} />
    </div>
}

const { dialogue: dialogues } = {
    "title": "Meeting a Friend",
    "dialogue": [
        {
            "person": "A",
            "sentence": [
                "Hello!"
            ],
            "glossSentence": [
                {
                    "gloss": "HELLO"
                }
            ],
            "emotion": [
                "happy"
            ]
        },
        {
            "person": "B",
            "sentence": [
                "Hello!"
            ],
            "glossSentence": [
                {
                    "gloss": "HELLO"
                }
            ],
            "emotion": [
                "happy"
            ]
        },
        {
            "person": "A",
            "sentence": [
                "How are you?"
            ],
            "glossSentence": [
                {
                    "gloss": "HOW"
                },
                {
                    "gloss": "YOU",
                    "emotion": "question"
                }
            ],
            "emotion": [
                "happy",
                "question"
            ]
        },
        {
            "person": "B",
            "sentence": [
                "I'm fine, how about you?"
            ],
            "glossSentence": [
                {
                    "gloss": "FINE"
                },
                {
                    "gloss": "HOW"
                },
                {
                    "gloss": "YOU",
                    "emotion": "question"
                }
            ],
            "emotion": [
                "happy",
                "happy",
                "question"
            ]
        },
        {
            "person": "A",
            "sentence": [
                "I'm fine too"
            ],
            "glossSentence": [
                {
                    "gloss": "SAME"
                }
            ],
            "emotion": [
                "happy"
            ]
        },
        {
            "person": "B",
            "sentence": [
                "What are you doing here?"
            ],
            "glossSentence": [
                {
                    "gloss": "YOU"
                },
                {
                    "gloss": "DO",
                    "emotion": "question"
                }
            ],
            "emotion": [
                "happy",
                "question"
            ]
        },
        {
            "person": "A",
            "sentence": [
                "I'm going to have lunch."
            ],
            "glossSentence": [
                {
                    "gloss": "GO"
                },
                {
                    "gloss": "LUNCH"
                }
            ],
            "emotion": [
                "happy",
                "happy"
            ]
        },
        {
            "person": "B",
            "sentence": [
                "It's been a while, how about we have lunch together?"
            ],
            "glossSentence": [
                {
                    "gloss": "SINCE"
                },
                {
                    "gloss": "LONG"
                },
                {
                    "gloss": "TIME"
                },
                {
                    "gloss": "LUNCH"
                },
                {
                    "gloss": "TOGETHER",
                    "emotion": "question"
                }
            ],
            "emotion": [
                "happy",
                "happy",
                "happy",
                "happy",
                "question"
            ]
        },
        {
            "person": "A",
            "sentence": [
                "That sounds great! Let's go"
            ],
            "glossSentence": [
                {
                    "gloss": "PERFECT"
                },
                {
                    "gloss": "LEAVE"
                }
            ],
            "emotion": [
                "happy",
                "happy"
            ]
        }
    ]
}

const Switch = () => {
    const { playerState, handleFrame: handleModelFrame, setSentencesWithAnimation } = useModelPlayer();
    const { handleFrame: handleInputFrame } = useSignRecognition(p => console.log(p));

    const [activePerson, setActivePerson] = useState("A");

    return <div>
        <button style={{ padding: "1rem" }} onClick={() => setActivePerson("A")} >A</button>
        <button style={{ padding: "1rem" }} onClick={() => setActivePerson("B")} >B</button>
        <div style={{ display: activePerson == "A" ? "block" : "none" }}>
            <ModelPlayer playerState={playerState} handleFrame={handleModelFrame} />
        </div>
        <div style={{ display: activePerson == "B" ? "block" : "none" }}>
            <CameraInput handleFrame={handleInputFrame} />
        </div>
    </div>
}

const Bubble = ({ dialogues, lastDialogueIndex }) => {
    return <div className="dialogue-container">
        {dialogues.map((d, i) => {
            const classList = [
                "bubble",
                i <= lastDialogueIndex ? "show" : "hide",
                d.person + "-speaking"
            ];
            
            return <div
                key={i}
                className={classList.join(" ")}
            > 
                {d.sentence}
            </div>
        })}
    </div>
}

export default () => {
    const [lastDialogueIndex, setLastDialogueIndex] = useState(0);
    return <div>
        {/* <input type={"number"} min={0} max={dialogues.length-1} val={lastDialogueIndex} onInput={e => setLastDialogueIndex(parseInt(e.target.value))} />
        <Bubble dialogues={dialogues} lastDialogueIndex={lastDialogueIndex} /> */}
        {/* <Switch /> */}
        <ConvertAnimation />
        {/* <ConvoPractice dialogues={dialogues} /> */}
    </div>
}
