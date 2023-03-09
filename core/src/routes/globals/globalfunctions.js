import { json } from "@sveltejs/kit";

/**
 * Update types of "Global component collection JSON".
 * @global
 */
export const UpdateActionTypes = Object.freeze({
  /**
  * Append given value to the end
  */
  APPEND: "append",
  /**
  * Prepend given value to the start
  */
  PREPEND: "prepend",
  /**
   * Replace given value with the value set before.
   */
  REPLACE: "replace",
  /**
   * Sets the given value.
   */
  SET: "set",
  /**
   * Remove the given value.
   */
  REMOVE: "remove",
});


/**
 * Updates global component collection JSON
 * @param {Array<JSON>} jsonData Global component collection JSON from globalstores.js
 * @param {string} uuid Unique id of HTMLElement
 * @param {*} newValue New value of element. Used according to the given action.
 * @param {string?} dataTarget Target key in JSON "data". e.g.: class, text,... (Sub keys in data segment)
 * @param {string?} target Target key in JSON, e.g.: type, selected,... (main keys)
 * @param {string} action Action to take when executing function. Must be one of "UpdateActionTypes"
 * @param {string} replaceValue Required if you want to replace a value. "action" must be "UpdateActionTypes.REPLACE" to use this feature.
 * 
 */
export function updateGlobalComponentCollectionStore(jsonData, uuid, newValue, dataTarget = null, target = null, action = UpdateActionTypes.SET, replaceValue=""){

  for (let i = 0; i < jsonData.length; i++) {

    var element = jsonData[i];
 
    if(element.uuid === uuid){
      if(dataTarget != null){

        // console.log("action : " + action);

        switch(action){
          case UpdateActionTypes.APPEND:
            element["data"][dataTarget] = element["data"][dataTarget].trim() + " " + newValue.trim();
            break;
          case UpdateActionTypes.PREPEND:
            element["data"][dataTarget] = newValue.trim() + " " + element["data"][dataTarget].trim();
            break;
          case UpdateActionTypes.REPLACE:
            element["data"][dataTarget] = element["data"][dataTarget].replace(replaceValue, newValue);
            break;
          case UpdateActionTypes.SET:
            element["data"][dataTarget] = newValue;
            break;
          case UpdateActionTypes.REMOVE:
            element["data"][dataTarget] = element["data"][dataTarget].replace(newValue, "");
            break;
        }
        console.log("Data updated from updateGlobalComponentCollectionStore function");
        return true;

      }else if(target != null){

        switch(action){
          case UpdateActionTypes.APPEND:
            element[target] = element[target].trim() + " " + newValue.trim();
            break;
          case UpdateActionTypes.PREPEND:
            element[target] = newValue.trim() + " " + element[target].trim();
            break;
          case UpdateActionTypes.REPLACE:
            element[target] = element[target].replace(replaceValue, newValue);
            break;
          case UpdateActionTypes.SET:
            element[target] = newValue;
            break;
          case UpdateActionTypes.REMOVE:
            element[target] = element[target].replace(newValue, "");
            break;
        }


        // console.log("Data updated from updateGlobalComponentCollectionStore function");
        return true;
      }
    }else if(element.children){
      updateGlobalComponentCollectionStore(element.children, uuid, newValue, dataTarget, target, action, replaceValue);
    }
  }

  return true;

}


/**
 * Gets the type of selected element.
 * @param {Array<JSON>} jsonData Global component collection JSON from globalstores.js
 * @param {string} uuid Unique id of HTMLElement
 * @returns {string}
 */
export function getTypeOfComponent(jsonData, uuid){

  for (let i = 0; i < jsonData.length; i++) {

    var element = jsonData[i];
 
    if(element.uuid === uuid){
      
      return element.type.toString();

    }else if(element.children){
      var result = getTypeOfComponent(element.children, uuid);
      if(result !== undefined && result != ""){
        return result;
      }
    }
  }

  return "";
}



/**
 * Gets data from selected element.
 * @param {Array<JSON>} jsonData Global component collection JSON from globalstores.js
 * @param {string} uuid Unique id of HTMLElement
 * @param {string?} dataTarget Target key in JSON "data". e.g.: class, text,... (Sub keys in data segment)
 * @param {string?} target Target key in JSON, e.g.: type, selected,... (main keys)
 * @returns {string | boolean | number}
 */
export function getDataFromComponent(jsonData, uuid, dataTarget = null, target = null){

  for (let i = 0; i < jsonData.length; i++) {

    var element = jsonData[i];
 
    if(element.uuid === uuid){

      if(dataTarget != null){
        if(element.data.hasOwnProperty(dataTarget)){
          console.log('element["data"][dataTarget] : ' + element.data[dataTarget]);
          return element.data[dataTarget];
        }
      }else if(target != null){
        if(element.hasOwnProperty(target)){
          console.log('element[target] : ' + element[target]);
          return element[target];
        }
      }
      
    }else if(element.children){
      var result = getDataFromComponent(element.children, uuid, dataTarget, target);
      if(result !== undefined && result != ""){
        return result;
      }
    }
  }

  return "";
}



/**
 * Gets data from selected element.
 * @param {Array<JSON>} jsonData Global component collection JSON from globalstores.js
 * @param {string} uuid Unique id of HTMLElement
 * @returns {JSON?}
 */
export function getComponent(jsonData, uuid){

  for (let i = 0; i < jsonData.length; i++) {

    var element = jsonData[i];
 
    if(element.uuid === uuid){

      return element;

    }else if(element.children){
      var result = getComponent(element.children, uuid);
      if(result !== undefined && result != null){
        return result;
      }
    }
  }

  return null;
}


/**
 * Adds child element to selected element.
 * @param {Array<JSON>} jsonData Global component collection JSON from globalstores.js
 * @param {string} uuid Unique id of HTMLElement
 * @param {{}} child Child element to be added
 */
export function addChildComponent(jsonData, uuid, child){

  for (let i = 0; i < jsonData.length; i++) {

    var element = jsonData[i];
 
    if(element.uuid === uuid){

      element.children.push(child);
      return

    }else if(element.children){
      var result = addChildComponent(element.children, uuid, child);
      if(result !== undefined && result != null){
        result.children.push(child);
        return
      }
    }
  }

}


/**
 * Deletes selected element.
 * @param {Array<JSON>} jsonData Global component collection JSON from globalstores.js
 * @param {string} uuid Unique id of HTMLElement
 */
export function deleteComponent(jsonData, uuid){

  for (let i = 0; i < jsonData.length; i++) {

    var element = jsonData[i];
 
    if(element.uuid === uuid){

      jsonData.splice(i,1);
      return

    }else if(element.children){
      var result = deleteComponent(element.children, uuid);
      if(result !== undefined && result != null){
        return
      }
    }
  }

}