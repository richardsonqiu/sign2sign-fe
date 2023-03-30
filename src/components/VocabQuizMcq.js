import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { VocabModelPlayer } from "./VocabModelPlayer";


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateRandomOptions(words, currentIndex, totalOptions) {
    let options = [words[currentIndex].gloss];

    while (options.length < totalOptions) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex].gloss;
        if (!options.includes(word)) {
            options.push(word);
        }
    }

    // options = options.map((word, i) => ({ word, isCorrect: i == 0 }));
    shuffleArray(options)

    return options;
}

export const VocabQuizMcq = ({ title, words, onPrevSection, onNextSection }) => {
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        setQuestions(words.map((word, i) => ({
            correctAns: word.gloss,
            options: generateRandomOptions(words, i, Math.min(4, words.length))
        })));
        setAnswers(words.map(() => null));
    }, []);

    function prevVocab() {
        const prevIndex = Math.max(index - 1, 0);
        setIndex(prevIndex);
    }

    function nextVocab() {
        const nextIndex = Math.min(index + 1, words.length - 1);
        setIndex(nextIndex);
    }

    function handleSetAnswer(answer) {
        let currentAnswers = [...answers];
        currentAnswers[index] = answer;
        setAnswers(currentAnswers);
    }

    return (
        <section className="container section">
            <h3 className="section-title">{title}</h3>
            <ProgressBar max={words.length} val={index + 1} />
            <div className="container-card vocab-quiz-mcq">
                <h3 className="card-instruction">Select the correct meaning for the following sign!</h3>
                {/* <h3 className="card-title">{words[index].gloss}</h3> */}

                <div className="model">
                    <VocabModelPlayer words={words} index={index} />
                </div>

                <div className="options">
                    {questions[index]?.options.map(word => {
                        const ans = answers[index];
                        const correctAns = questions[index].correctAns;

                        const classList = ["option-btn"];
                        if (ans == word) {
                            classList.push(ans == correctAns ? "correct" : "incorrect");
                        }

                        return <button key={word} className={classList.join(" ")} onClick={() => handleSetAnswer(word)}>{word}</button>
                    })}
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
                    disabled={answers[index] != questions[index]?.correctAns}
                    onClick={() => index == words.length - 1 ? onNextSection() : nextVocab()}
                >
                    {index == words.length - 1 ? "NEXT SECTION" : "NEXT"}
                </button>
            </div>

        </section>
    );
}
