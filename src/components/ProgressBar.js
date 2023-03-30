export const ProgressBar = ({ max, val }) => {
    return <div className="progress-bar">
        <div className="filled" style={{width: `${val*100/max}%`}}></div>
    </div>
}