<script>
    import "../../../app.css";
	import { onDestroy, onMount } from "svelte";
    import { globalSelectedElementStore } from "../../globals/selectorstores.js";
    import { sendSelectedElement, sendDroppedElement, toggleWidgetsPanel } from "../../(shared)/shared/sharedfunctions.js";
    import { globalThemeStore } from "../../globals/globalstores.js";
    import Widgets from "../../menu/widgets/page.svelte";
    import swal from 'sweetalert';
    import { fade, fly } from 'svelte/transition';

    /**
     * uuid of element
     * @type string
     */
    export let uuid;

    /**
     * Control behaviour of element if element is selected.
     * @type boolean
     */
    export let selected;

    /**
     * Used to control behaviour of element if element has childs.
     * @type Array<JSON>
     */
    export let childs;


    /**
     * Required data to fill attributes of HTML elements
     * @typedef {Object} AttrData
     * @property {string} [class] - Specifies one or more class names for the element (used to reference the element in CSS)
     * @property {string} [dir] - Specifies the direction of the element's text (left-to-right or right-to-left)
     * @property {boolean} [hidden] - Specifies that the element should be hidden
     * @property {string} [id] - Specifies a unique id for the element (used to reference the element in JavaScript)
     * @property {string} [lang] - Specifies the language of the element's content
     * @property {string} [style] - Specifies inline CSS for the element
     * @property {string} [title] - Specifies extra information about the element (displayed as a tooltip)
     * @property {string} [text] - Value of Text Element
     */

    /**
     * @type {AttrData}
     */ 
    export let data;


    /**
     * List of attributes
     * @type [
     *  "class", "dir", "hidden", "id", "lang", "style", "title"
     * ]
     */
    export const elAttr = ["class", "dir", "hidden", "id", "lang", "style", "title"];

 
    /**
     * Default string in the middle.
     * @type string
     */
    let text;

    /**
     * @type HTMLElement
     */
    let bindElement;

    /**
     * @type HTMLElement
     */
     let selectedElement = $globalSelectedElementStore;
    //Update global data whenever selectedElement changes.
    $: globalSelectedElementStore.set(selectedElement);

    /// updates ui when data changes
    $: data, (() => {
        if(data !== undefined && bindElement !== undefined){

            var _class_addons = " w-full h-full";
            if(selected == true){
                _class_addons += " outline-dashed outline-2 outline-offset-2 outline-sky-500";
                // console.log("Element selected : Div : "+uuid);
            } 
            bindElement.setAttribute("class", data.class !== undefined ? data.class + _class_addons : _class_addons);
            // if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons);
            if(data.dir     !== undefined) bindElement.setAttribute("dir",      data.dir);
            if(data.hidden  !== undefined) bindElement.setAttribute("hidden",   data.hidden.toString());
            if(data.id      !== undefined) bindElement.setAttribute("id",       data.id);
            if(data.lang    !== undefined) bindElement.setAttribute("lang",     data.lang);
            if(data.style   !== undefined) bindElement.setAttribute("style",    data.style);
            if(data.title   !== undefined) bindElement.setAttribute("title",    data.title);
        }
        
    })();

    /// updates ui when selected changes
    $: selected, (() => {
        if(selected !== undefined && bindElement !== undefined){
            var _class_addons = " w-full h-full";
            if(selected == true){
                _class_addons += " outline-dashed outline-2 outline-offset-2 outline-sky-500";
            } 
            bindElement.setAttribute("class", data.class !== undefined ? data.class + _class_addons : _class_addons);
            // if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons);
        }
    })();

    function dropped(e) {
        // execute function only when target container is different from source container
        const types = e.dataTransfer.types;
        if (bindElement.id !== e.target.id || types.includes('text/plain') === true) {
            cancelDefault(e);
            bindElement.classList.remove("outline-dashed");
            bindElement.classList.remove("outline-2");
            bindElement.classList.remove("outline-offset-2");
            bindElement.classList.remove("outline-teal-500");

            sendDroppedElement(uuid, e.dataTransfer.getData('text/plain'));

        }
    }

    function dragOver(e) {
        cancelDefault(e);

        const types = e.dataTransfer.types;
        if (types.includes('text/plain')) { // && e.dataTransfer.getData('text/plain') === 'text'
            bindElement.classList.add("outline-dashed");
            bindElement.classList.add("outline-2");
            bindElement.classList.add("outline-offset-2");
            bindElement.classList.add("outline-teal-500");
        }

    }

    function dragLeave(e) {
        bindElement.classList.remove("outline-dashed");
        bindElement.classList.remove("outline-2");
        bindElement.classList.remove("outline-offset-2");
        bindElement.classList.remove("outline-teal-500");
    }

    function dragEnd(e){
        e.dataTransfer.clearData();
    }

    function cancelDefault(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    let loaded = false;

    onMount(() => {
        // This is optional
        text = data.text !== undefined ? data.text : "";

        var _class_addons = " w-full h-full";
        if(selected == true){
            _class_addons += " outline-dashed outline-2 outline-offset-2 outline-sky-500";
        }
        bindElement.setAttribute("class", data.class !== undefined ? data.class + _class_addons : _class_addons);
        // if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + _class_addons);
        if(data.dir     !== undefined) bindElement.setAttribute("dir",      data.dir);
        if(data.hidden  !== undefined) bindElement.setAttribute("hidden",   data.hidden.toString());
        if(data.id      !== undefined) bindElement.setAttribute("id",       data.id);
        if(data.lang    !== undefined) bindElement.setAttribute("lang",     data.lang);
        if(data.style   !== undefined) bindElement.setAttribute("style",    data.style);
        if(data.title   !== undefined) bindElement.setAttribute("title",    data.title);

        // bindElement.addEventListener("mousedown", (ev) => {
        //     if(ev.target === bindElement){
        //         globalSelectedElementStore.set(null);
        //     }
            
        // });

        bindElement.addEventListener("drop", dropped);
        bindElement.addEventListener("dragenter", cancelDefault);
        bindElement.addEventListener("dragover", dragOver);
        bindElement.addEventListener("dragleave", dragLeave);
        bindElement.addEventListener('dragend', dragEnd);

        loaded = true;
    });

    onDestroy(()=>{
        // bindElement.removeEventListener("drop", dropped);
        // bindElement.removeEventListener("dragenter", cancelDefault);
        // bindElement.removeEventListener("dragover", dragOver);
        // bindElement.removeEventListener("dragleave", dragLeave);
        // bindElement.removeEventListener('dragend', dragEnd);
    });

    function selectElement(){
        /// Send selected uuid to main frame.
        sendSelectedElement(uuid);

        // update global variable, so selector activates.
        selectedElement = bindElement;
    }

    // function testModal(){
    //     swal({
    //         title: "Delete ?",
    //         text: "This is test",
    //         icon: "warning",
    //         buttons: ["No, keep it", "Yes, DELETE"],
    //         dangerMode: true,
    //     })
    //     .then((willDelete) => {
    //         if (willDelete) {
    //             swal("Element deleted", {
    //             icon: "success",
    //             });
    //         } else {
    //             swal("Kept element!");
    //         }
    //     });
    // }


//
</script>

<div bind:this={bindElement} id="{uuid}"  on:mousedown|self={selectElement}> 
    <slot>
        <div class="w-full h-[100vh] flex align-middle justify-center content-center"><span class="">{text}</span></div>
    </slot>
    {#if childs.length == 0 && loaded == true}
  
    <div class="w-full h-[100vh] flex flex-col items-center justify-center content-center bg-[#ffffff]"> <!-- #474e6818 -->
        <span class="text-sm font-bold text-[#a3a3a3] mb-2" transition:fly="{{ y: 200, duration: 1000 }}">Here is a new start.</span>
        <span class="text-4xl font-bold text-black text-center" transition:fly="{{ y: 350, duration: 2200 }}">Let's make something cool.</span>
        <span class="h-[60px]"></span>
        <div class="border rounded-xl border-[#a3a3a3] sm:grid sm:grid-cols-3 flex flex-col align-middle place-content-center items-center w-[60%] max-w-screen-md h-28 sm:h-16 gap-y-3 sm:gap-y-0" transition:fly="{{ y: 500, duration: 3000 }}">
            <div class="flex place-content-center items-center">
                <button class="flex flex-row gap-2" on:click={toggleWidgetsPanel}><i class="bi bi-puzzle"></i><span>Widgets</span></button>
            </div>
            <div class="flex place-content-center items-center">
                <button class="flex flex-row gap-2"><i class="bi bi-columns-gap"></i><span>Sections</span></button>
            </div>
            <div class="flex place-content-center items-center">
                <button class="flex flex-row gap-2"><i class="bi bi-file-earmark-break"></i><span>Pages</span></button>
            </div>
        </div>
        <span class="h-[180px]"></span>
        <div class="absolute bottom-24 flex flex-col items-center justify-center content-center" transition:fly="{{ y: 550, duration: 4000 }}">
            <span class="text-sm text-black">Need Help?</span>
            <span class="text-sm text-black">See <a href="#" target="_blank" class="text-[#a3a3a3] underline underline-offset-4" >Quick Start Guide</a></span>
        </div>
    </div>

    {/if}
</div>



<style>

    /* :global(.swal-overlay) {
      background-color: #242425 ;  var(--swalOverlayBackgroundColor)
   }
   
   :global(.swal-modal) {
      background-color: var(--swalModalBackgroundColor) !important;
      border: var(--swalModalBorder) !important;
   } */

</style>

<!-- 
{#if $globalThemeStore.swal.modal.customCss != ""}
  <style>
    :global(.swal-modal) {
      {@html '/* Custom styles from the customCss variable */
        ${".swal-modal { " + $globalThemeStore.swal.modal.customCss + " }"}
      '}
    }
  </style>
{/if} -->