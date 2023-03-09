

/**
 * Send selected elements uuid to main frame.
 * @param {string} targetUuid uuid of selected element.
 */
export function sendSelectedElement(targetUuid){

    let data = {
        "action": "selectElement",
        "data": {
            "uuid": targetUuid
        }
    }

    window.parent.postMessage(data, '*');
}




/**
 * Send dropped element data to main frame.
 * 
 * Main frame updates JSON according to this data.
 * 
 * Adds default values of element.
 * @param {string} targetUuid uuid of selected element.
 * @param {string} elementType Type of element from e.dataTransfer.getData('text/plain')
 */
export function sendDroppedElement(targetUuid, elementType){

    let data = {
        "action": "dropElement",
        "data": {
            "uuid": targetUuid,
            "elementType": elementType
        }
    }

    window.parent.postMessage(data, '*');
}



/**
 * Send deleted elements uuid to main frame.
 * @param {string} targetUuid uuid of selected element.
 */
export function sendDeletedElement(targetUuid){

    let data = {
        "action": "deleteElement",
        "data": {
            "uuid": targetUuid
        }
    }

    window.parent.postMessage(data, '*');
}


/**
 * Toggle widgets panel.
 */
export function toggleWidgetsPanel(){

    let data = {
        "action": "toggleWidgetsPanel",
        "data": {}
    }

    window.parent.postMessage(data, '*');
}


/**
 * Opens options panel.
 */
export function openOptionsPanel(){

    let data = {
        "action": "openOptionsPanel",
        "data": {}
    }

    window.parent.postMessage(data, '*');
}