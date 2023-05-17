<script>
    import "../../../../app.css";
    import { onMount, onDestroy } from "svelte";
    import { globalThemeStore, globalComponentCollectionStore, globalEditorPreferencesStore } from "../../../globals/globalstores.js";
    import { globalSelectedElementStore, globalSelectedElementUuidStore } from "../../../globals/selectorstores.js";
    import { getComponent } from "../../../globals/globalfunctions.js";


    /**
     * Selected element uuid to return back to element.
     * @type string
     */
    export let selectedElementUuid;

    /**
     * Selected element text.
     * @type string
     */
    export let text;

    /**
     * Is used to control edit panel when element is selected.
     */
    export let isThisElementEditable = true;
    
    /**
     * @type HTMLTextAreaElement //  HTMLDivElement
     */
    let inlineEditor;

    /**
     * Holds status of inline editor
     * 
     * if "true" inline editor is visible
     * 
     * if "false" inline editor is hidden
     * 
     * @type boolean
     */
    let inlineEditorStatus;

    function saveText(){
        var lastActiveElement = getComponent($globalComponentCollectionStore, selectedElementUuid);
        // var lastActiveElement = getComponent(globalComponentCollection, item.id);
        
        if(lastActiveElement){
            if(lastActiveElement.type){
                if(lastActiveElement.data){

                    var newText = inlineEditor.innerHTML.replaceAll("<!--<Editortree>-->", "").trimStart(); //.replaceAll("  ", " ")
                    var newString = inlineEditor.innerText.trimStart(); //.replaceAll("  ", " ")

                    console.log(
                        "source : TextInline\n" + 
                        "newString : " + newString + "\n" + 
                        "newText : " + text + "\n" + 
                        "lastActiveElement.data.text : " + lastActiveElement.data.text + "\n" + 
                        "lastActiveElement.type : " + lastActiveElement.type
                    );

                    if(lastActiveElement.type == "text"){
 
                        lastActiveElement.data.text = newText;

                    }else{
                        console.warn("lastActiveElement.type != text");
                    }
                    
                }else{
                    console.error("saveText(): lastActiveElement.data is undefined or null!");
                }
            }
            
        }else{
            console.error("saveText(): lastActiveElement is undefined! (" + selectedElementUuid + ")");
        }
    }

    onMount(()=>{

        document.addEventListener("click", e => {
            if(inlineEditor){
                if(e.composedPath().includes(inlineEditor)){
                    // Do nothing. Clicked inside of editor.
                }else{
                    // Clicked outside of editor. Save data and set editable false.
                    saveText();
                    isThisElementEditable = false;
                }
            }

            
        });

    });

    // <div bind:this={inlineEditor} contenteditable="true">
    // {@html text}
    // </div>


</script>

<textarea bind:this={inlineEditor} bind:value={text}></textarea>

