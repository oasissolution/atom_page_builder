

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
export function createDroppedElementInside(targetUuid, elementType){

    let data = {
        "action": "createDroppedElementInside",
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

/**
 * Closes options panel.
 */
export function closeOptionsPanel(){

    let data = {
        "action": "closeOptionsPanel",
        "data": {}
    }

    window.parent.postMessage(data, '*');
}


/**
 * Send dropped element data to main frame.
 *
 * Main frame updates JSON according to this data.
 *
 * Adds default values of element.
 * @param {string} thisUuid uuid of selected element.
 * @param {string} insideUuid uuid of container element
 */
export function replaceDroppedElementInside(thisUuid, insideUuid){

    let data = {
        "action": "replaceDroppedElementInside",
        "data": {
            "thisUuid": thisUuid,
            "insideUuid": insideUuid
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
 * @param {string} thisUuid uuid of selected element.
 * @param {string} beforeUuid uuid of container element
 */
export function replaceDroppedElementBefore(thisUuid, beforeUuid){

    let data = {
        "action": "replaceDroppedElementBefore",
        "data": {
            "thisUuid": thisUuid,
            "beforeUuid": beforeUuid
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
 * @param {string} thisUuid uuid of selected element.
 * @param {string} afterUuid uuid of container element
 */
export function replaceDroppedElementAfter(thisUuid, afterUuid){

    let data = {
        "action": "replaceDroppedElementAfter",
        "data": {
            "thisUuid": thisUuid,
            "afterUuid": afterUuid
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
 * @param {string} beforeUuid uuid of container element
 * @param {string} elementType Type of element from e.dataTransfer.getData('text/plain')
 */
export function createDroppedElementBefore(beforeUuid, elementType){

    let data = {
        "action": "createDroppedElementBefore",
        "data": {
            "beforeUuid": beforeUuid,
            "elementType": elementType,
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
 * @param {string} afterUuid uuid of container element
 * @param {string} elementType Type of element from e.dataTransfer.getData('text/plain')
 */
export function createDroppedElementAfter(afterUuid, elementType){

    let data = {
        "action": "createDroppedElementAfter",
        "data": {
            "afterUuid": afterUuid,
            "elementType": elementType,
        }
    }

    window.parent.postMessage(data, '*');
}

/**
 * Refreshes editor data from main panel.
 */
export function refreshEditorData(){

    let data = {
        "action": "refreshEditorData",
        "data": {}
    }

    window.parent.postMessage(data, '*');
}

/**
 * Updates main panel from editor.
 */
export function updateMainPanelFromEditor(globalComponentCollectionStore, globalEditorPreferencesStore){

    let data = {
        "action": "updateMainPanelFromEditor",
        "data": {
            "componentCollection": globalComponentCollectionStore,
            "editorPreferences": globalEditorPreferencesStore,
        }
    }

    window.parent.postMessage(data, '*');
}

/**
 * Sends current innerHTML of editor inner panel.
 */
export function sendEditorInnerHTML(){

    var doc = document.getElementById("editorInnerPanel");

    let data = {
        "action": "sendEditorInnerHTML",
        "data": {
            "innerHTML": doc?.innerHTML.toString(),
        }
    }

    window.parent.postMessage(data, '*');

}