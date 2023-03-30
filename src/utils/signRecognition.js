export const processResult = result => {
    const pose = result.poseLandmarks.map(nl => [nl.x, nl.y]);

    const lh = result.leftHandLandmarks
        ? result.leftHandLandmarks.map(nl => [nl.x, nl.y])
        : new Array(21).fill([0, 0]);
    
    const rh = result.rightHandLandmarks
        ? result.rightHandLandmarks.map(nl => [nl.x, nl.y])
        : new Array(21).fill([0, 0]);
    
    return [].concat(pose, lh, rh);
}