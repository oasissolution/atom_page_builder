<script>
	import { onMount } from "svelte";
	import Iconbutton from "../../uicomponents/iconbutton.svelte";
    import { getDataFromComponent, updateGlobalComponentCollectionStore, getComponent } from "../../globals/globalfunctions.js";
    import { globalComponentCollectionStore, globalEditorPreferencesStore } from "../../globals/globalstores";
    import { globalSelectedElementUuidStore } from "../../globals/selectorstores";
    import { writable } from "svelte/store";

    let globalComponentCollection = $globalComponentCollectionStore;
    $: globalComponentCollectionStore.set(globalComponentCollection);

    /**
     * @type HTMLElement
     */
    let bindElement;

    /**
     * @type string
     */
    export let uuid;

    /**
     * @type boolean
     */
    export let selected;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function clickFunction() {
        dispatch('click');
    }

    let loaded = false;
    let hidden = false;

    onMount(() => {

        bindElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', 'layer.text.{{ uuid }}');
        });

        bindElement.addEventListener('click', (event) => {
            clickFunction();
        });

        loadElementData();

        loaded = true;
    });

    /**
     * Data of Atom Element
     * @typedef {Object} ElementData
     * @property {string} [uuid] - Unique id of element.
     * @property {string} [type] - Type of element
     * @property {boolean} [selected] - Specifies whether the element is selected.
     * @property {AttrData} [data] - Element specific data.
     * @property {Array<JSON>} [children] - Child elements.
     */

    /**
     * All data of element
     * @type {ElementData | null}
     */
     let activeElement;

    /**
     * Used for sub elements to update themselves to current values.
     * @type string
    */
    let elementDataLoaded="";

    /**
     * 
     */
    let classInput = "";

    /**
     * Loads element data from JSON 
     */
    function loadElementData(){
        activeElement = getComponent(globalComponentCollection, uuid);

        classInput = activeElement?.data?.class != undefined ? activeElement?.data?.class : "";

        elementDataLoaded = classInput;

        // leadingOfText.set(activeElement?.data.text.toString().substring(0,18) + "...");
    }

    /**
     * Update Editor Panel
     */
    function updateEditor(){
        const data = {
            "message": {
                "componentCollection": $globalComponentCollectionStore,
                "editorPreferences": $globalEditorPreferencesStore
            }
        };

        var elm = document.getElementById("editorFrame");
        if(elm != null) if(elm.contentWindow != null) elm.contentWindow.postMessage(data, '*');
    }

    function updateClass(){
        if(activeElement){
            if(activeElement.data){
                activeElement.data.class = classInput;
                updateEditor();
            }
        }
    }

    /**
     * @type Writable<string>
     */
    let leadingOfText = writable("");

    // leadingOfText.set(getText());

    // function getText(){
    //     return getDataFromComponent($globalComponentCollectionStore, uuid, "text").toString().substring(0,18)+"..."
    // }

    // $: $globalComponentCollectionStore, (()=>{
    //     // leadingOfText.set(getText());
    //     leadingOfText.set(activeElement?.data.text.toString().substring(0,18) + "...");
    // })();

    function toggleVisibility(){
        if(loaded == true) {

            var newClass = "";
            var found = false;

            classInput.split(" ").forEach( cls => {
                if(cls.trim() == "hidden"){
                    found = true;
                }else{
                    newClass += " " + cls.trim();
                }
            });

            if(found){
                classInput = newClass.trim() + " ";
                hidden = false;
            }else{
                classInput = newClass.trim() + " hidden";
                hidden = true;
            }
            updateClass();

            // console.log("classInput : " + classInput);
        }
    }

</script>

<div class="w-full flex flex-row justify-between items-center rounded h-8" draggable="true" bind:this={bindElement} class:text-[#696AC6]={selected} class:bg-[#696AC626]={selected}>
    <div class="flex flex-row gap-2 pl-2">
        <div class="w-4 h-4">
            <i class="bi bi-fonts"></i>
        </div>
        <div class="">
            <span>Text</span>
            <!-- <span class="italic text-[10px] ml-1">{$leadingOfText}</span> -->
        </div>
    </div>
    {#if selected == true}
    <div class="flex flex-row justify-end gap-2">
        <Iconbutton active={false} noBackground on:click={toggleVisibility}>
            <span slot="icon" class="text-[#696AC6]">
                {#if hidden == false}<i class="bi bi-eye"></i>{:else}<i class="bi bi-eye-slash"></i>{/if}
            </span>
        </Iconbutton>
    </div>
    {:else if selected == false && hidden == true}
    <div class="flex flex-row justify-end gap-2">
        <Iconbutton active={false} noBackground on:click={toggleVisibility}>
            <span slot="icon" class="text-[#696AC6]">
                <i class="bi bi-eye-slash"></i>
            </span>
        </Iconbutton>
    </div>
    {/if}
</div>


