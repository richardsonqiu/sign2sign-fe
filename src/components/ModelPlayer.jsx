import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { Model } from 'components/Model'
import { useModel } from 'components/hooks'


export function ModelPlayer({ playerState, handleFrame, debug }) {
    const model = useModel("/models/three-vrm-girl.gltf");
    // const model = useVrm("/models/from_vrm2.vrm");
    
    if (!model) return <></>

    // useEffect(() => {
    //     loadSentenceClips(vrm);

    // }, [vrm, playerState.sentences]);

    return <div className="model-player">
        <Canvas
            onCreated={state => {
                state.gl.toneMapping = THREE.LinearToneMapping;
                state.gl.outputEncoding = THREE.sRGBEncoding;
                state.gl.physicallyCorrectLights = true
            }}
            camera={{
                fov: 50,
                position: [0, 1.25, 1.1]
            }}
        >
            <Model
                model={model}
                playerState={playerState}
                handleFrame={handleFrame}
            />
            <directionalLight
                args={["white", 1]}
                position={[1, 1, 1]}
            />
            <OrbitControls
                target={[0, 1.25, 0]}
                enablePan={false}
            />
            { debug && <axesHelper args={[5]} /> }
            { debug && <gridHelper args={[10, 10]} /> }
            <color attach="background" args={[""]} />
        </Canvas>
    </div>
}