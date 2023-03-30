import { Camera } from "@mediapipe/camera_utils";
import { useRef } from "react";
import { useEffect } from "react";

export const CameraInput = ({ handleFrame }) => {
    const cameraRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const camera = new Camera(videoRef.current, {
            facingMode: "user"
        });
        camera.start();
        cameraRef.current = camera;

        return () => {
            camera.stop();
        }
    }, []);

    useEffect(() => {
        cameraRef.current.h.onFrame = () => {
            if (!videoRef.current) return;
            handleFrame(videoRef.current);
        };
    }, [handleFrame]);

    return <div>
        <video ref={videoRef} className="camera-input"></video>
    </div>
}
