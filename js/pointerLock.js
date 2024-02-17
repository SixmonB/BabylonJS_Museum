

let createPointerLock = function(scn){
    let canvas = scn.getEngine().getRenderingCanvas() ; 
    canvas.addEventListener("click", 
                            (evt) => {
                                canvas.requestPointerLock = canvas.requestPointerLock ||
                                                            canvas.msRequestPointerLock ||
                                                            canvas.mozRequestPointerLock ||
                                                            canvas.webkitRequestPointerLock ; 
                                if(canvas.requestPointerLock){
                                    canvas.requestPointerLock() ; 
                                }
                            }, 
                            false) ; 
}

export {createPointerLock} ; 
