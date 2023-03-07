

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
    // console.log("");
    // console.log("Giden: "+JSON.stringify(data));

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