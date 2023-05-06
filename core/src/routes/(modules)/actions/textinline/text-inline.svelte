<script>

    import "../../../../app.css";
    import { onMount, onDestroy } from "svelte";
    import { globalThemeStore, globalComponentCollectionStore, globalEditorPreferencesStore } from "../../../globals/globalstores.js";
    import { globalSelectedElementStore, globalSelectedElementUuidStore } from "../../../globals/selectorstores.js";


    // GET SELECTED ELEMENT
    // GET POSITION OF SELECTED ELEMENT
    // HIDE SELECTED ELEMENT
    // SHOW THIS TEXT INLINE EDITOR
    // UPDATE SELECTED ELEMENT
    // SHOW SELECTED ELEMENT


    /**
     * Selected element itself to get position, size etc.
     * @type HTMLElement
     */
    export let selectedElement;

    /**
     * Selected element uuid to return back to element.
     * @type string
     */
    export let selectedElementUuid;

    /**
     * @type JSON
     */
    export let selectedElementData;

    
    /**
     * @type HTMLDivElement
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

    onMount(()=>{

    });

</script>

<div bind:this={inlineEditor}>
inline editor
</div>