/**
 * Links user interactions.
 */
function linkUserEvents() {
    linkSpeedModifier();    
}

/**
 * links an handle on keyup event. If left or right arrows are pressed, worlds animation speed will bel affected. There are 9 avaiable speeds: [0,0.25,0.5,0.75,1,1.25,1.5,1.75,2].
 */
function linkSpeedModifier() {
    let avaiableSpeeds = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    let currentSpeed = avaiableSpeeds.indexOf(1);
    let flagAlreadySelectedSpeed = false;

    document.addEventListener("keyup", e => {
        switch (e.key) {
            case " ":
                if (moveWorld) {
                    moveWorld = false;
                } else {
                    updateSpeedAnimations(avaiableSpeeds[currentSpeed]);
                    enableAnimations();
                }
                break;
            case "ArrowLeft":
                if (moveWorld) {
                    if (currentSpeed == 1) {
                        moveWorld = false;
                    } else {
                        currentSpeed--;
                        flagAlreadySelectedSpeed = false;
                    }
                    if (!flagAlreadySelectedSpeed) {
                        updateSpeedAnimations(avaiableSpeeds[currentSpeed]);
                        flagAlreadySelectedSpeed = true;
                    }
                }
                break;
            case "ArrowRight":
                if (!moveWorld) {
                    enableAnimations();
                } else {
                    if (currentSpeed != avaiableSpeeds.length - 1) {
                        currentSpeed++;
                        flagAlreadySelectedSpeed = false;
                    }
                    if (!flagAlreadySelectedSpeed){
                        updateSpeedAnimations(avaiableSpeeds[currentSpeed]);
                        flagAlreadySelectedSpeed = true;
                    }
                }
                break;
            default:
                break;
        }
    });
}