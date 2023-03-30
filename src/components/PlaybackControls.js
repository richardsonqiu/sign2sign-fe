import { FaPause, FaPlay, FaSquare } from "react-icons/fa";

export const PlaybackControls = ({ playerState, play, stop, reset, seek }) => {
    const totalDuration = playerState.wordTimes[playerState.index].at(-1);

    return <div className="model-controls">
        <div
            className="play-pause"
            onClick={() =>
                (Math.abs(playerState.time - totalDuration) < 0.01)
                    ? reset()
                    : (playerState.isPlaying)
                        ? stop()
                        : play()
            }
        >
            {
                (Math.abs(playerState.time - totalDuration) < 0.01)
                    ? <FaSquare />
                    : (playerState.isPlaying)
                        ? <FaPause />
                        : <FaPlay />
            }
        </div>
        <input
            type="range"
            min={0}
            max={totalDuration}
            step={0.01}
            value={playerState.time}
            onInput={e => seek(parseFloat(e.target.value))}
        />
    </div>
}