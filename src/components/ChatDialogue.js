import { FaHistory } from "react-icons/fa";

export const ChatDialogue = ({ dialogues, lastDialogueIndex }) => {
    return <div className="chat-dialogue">
        <div className="chat-header"><FaHistory /><p>Conversation History</p></div>
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
                {d.person}: {d.sentence}
            </div>
        })}
    </div>
}