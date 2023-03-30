import { useEffect, useRef } from 'react';

import { AnimationMixer, LoopOnce } from "three";
import { useFrame } from '@react-three/fiber'

export const Model = ({ model, playerState, handleFrame }) => {
    const mixer = useRef(null);
    const actions = useRef([]);

    const currentAction = () => {
        return actions.current[playerState.index];
    };

    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta);
        
        const action = currentAction();
        if (action) handleFrame(action);
    });

    useEffect(() => {
        if (!model) return;

        model.rotation.y = Math.PI;

        mixer.current = new AnimationMixer(model);
        actions.current = playerState.sentenceClips.map(clip => mixer.current.clipAction(clip));

    }, [model]);

    useEffect(() => {
        if (!playerState.sentenceClips || !mixer.current) return;
        actions.current = playerState.sentenceClips.map(clip => mixer.current.clipAction(clip));

    }, [playerState.sentenceClips]);

    useEffect(() => {
        const action = currentAction();
        if (!action) return;

        mixer.current.stopAllAction();
        action.play();
        action.loop = LoopOnce;
        action.clampWhenFinished = true;
        action.paused = !playerState.isPlaying;
        action.time = 0;

    }, [playerState.sentenceClips, playerState.index]);

    useEffect(() => {
        const action = currentAction();
        if (!action) return;

        action.time = playerState.time;
        action.paused = !playerState.isPlaying;

    }, [playerState.time, playerState.isPlaying])

    // useEffect(() => {
    //     const action = actions.current[index];
    //     if (action) handleAction(action);

    // }, [handleAction]);

    return model && <primitive object={model} />;
}
