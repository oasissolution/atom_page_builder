
<!-- THIS FILE IS A PART OF COLOR-BUILDER.SVELTE -->

<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { writable } from "svelte/store";
    import ColorPicker from 'svelte-awesome-color-picker';
	import Iconbutton from "./iconbutton.svelte";
    import { fade, fly, slide } from 'svelte/transition';
    import Button from "./button.svelte";

    /**
     * @type Writable<string>
     */
    export let gradientClasses = writable([]);

    const dispatch = createEventDispatcher();

    /**
     * Action on enter pressed.
     */
    function updateFromGradientBuilder() {
        dispatch('updateFromGradientBuilder');
    }


    /**
     * @typedef thumbData
     * @property {string} color
     * @property {number} stop
     * @property {number} id
     */

    /**
     * @type Writable<Array<thumbData>>
     */
    let thumbs = writable([]);
    let thumbsList = $thumbs;
    $: thumbs.set(thumbsList);

    let innerClass = "bg-gradient-to-r from-[#6185ff] to-[#9c65ff]";

    onMount(()=>{
        
    });

    $: $gradientClasses, (()=>{
        var newClass = "bg-gradient-to-r";
        $gradientClasses.forEach( elm => {
            if(elm != "from-[0%]" && elm != "to-[100%]") newClass += " " + elm;
        });
        innerClass = newClass;
        convertGradientClassesToThumbs();
    })();

    function convertGradientClassesToThumbs(){
        var newArrayOfJson = [];
        var counter = 0;
        var stops = $gradientClasses; // Array of classes

        for(var i=0; i<stops.length; i++){

            if(stops[i].startsWith("from-")){
                if(stops[i+1] != undefined){
                    if(stops[i+1].startsWith("from-")){
                        if(stops[i].startsWith("from-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("from-[","").replace("]",""), "stop": stops[i+1].replace("from-[","").replace("%]",""), "id": counter});
                            counter++;
                        }else{
                            newArrayOfJson.push({"color": stops[i+1].replace("from-[","").replace("]",""), "stop": stops[i].replace("from-[","").replace("%]",""), "id": counter});
                            counter++;
                        }
                    }else{
                        if(stops[i].startsWith("from-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("from-[","").replace("]",""), "stop": 0, "id": counter});
                            counter++;
                        }
                    } 
                }else{
                    if(stops[i].startsWith("from-[#")){
                        newArrayOfJson.push({"color": stops[i].replace("from-[","").replace("]",""), "stop": 0, "id": counter});
                        counter++;
                    }
                }
            }

            if(stops[i].startsWith("to-")){
                if(stops[i+1] != undefined){
                    if(stops[i+1].startsWith("to-")){
                        if(stops[i].startsWith("to-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("to-[","").replace("]",""), "stop": stops[i+1].replace("to-[","").replace("%]",""), "id": counter});
                            counter++;
                        }else{
                            newArrayOfJson.push({"color": stops[i+1].replace("to-[","").replace("]",""), "stop": stops[i].replace("to-[","").replace("%]",""), "id": counter});
                            counter++;
                        }
                    }else{
                        if(stops[i].startsWith("to-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("to-[","").replace("]",""), "stop": 100, "id": counter});
                            counter++;
                        }
                    } 
                }else{
                    if(stops[i].startsWith("to-[#")){
                        newArrayOfJson.push({"color": stops[i].replace("to-[","").replace("]",""), "stop": 100, "id": counter});
                        counter++;
                    }
                }
            }

            if(stops[i].startsWith("via-")){
                if(stops[i+1] != undefined){
                    if(stops[i+1].startsWith("via-")){
                        if(stops[i].startsWith("via-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("via-[","").replace("]",""), "stop": stops[i+1].replace("via-[","").replace("%]",""), "id": counter});
                            counter++;
                        }else{
                            newArrayOfJson.push({"color": stops[i+1].replace("via-[","").replace("]",""), "stop": stops[i].replace("via-[","").replace("%]",""), "id": counter});
                            counter++;
                        }
                    }
                }
            }


        }

        thumbs.set(newArrayOfJson);

    }

    /**
     * @type HTMLDivElement
     */
    let thumbsContainer;

    /**
     * @type HTMLDivElement?
     */
    let currentThumb;
    
    /**
     * @type number
     */
    let elementX;

    /**
     * @type number?
     */
    let selectedThumbId;

    /**
     * @type number?
     */
    let thumbX;

    /**
     * @type Writable<string>
     */
    let selectedColor = writable("");

    let visibilityOfColorPicker = false;


    /**
     * @type number
     */
    let thumbsContainerWidth;

    $: if (thumbsContainer) {
        elementX = thumbsContainer.getBoundingClientRect().left; 
        thumbsContainerWidth = thumbsContainer.getBoundingClientRect().width;
    };

    /**
     * 
     * @param {number} percent
     * @returns {number}
     */
    function calculateLeftPositionOfThumb(percent){
        //26 is padding of gradient container div
        return (thumbsContainerWidth - 26) * percent / 100;
    }

    function updateStops(){
        // Update gradient classes according to $thumbs
        /**
         * @type Array<string>
         */
        var newList = [];
        var counter = 0; // To detect first and last items
        // $thumbs.forEach(elm => {
        //     if(counter == 0){
        //         newList.push("from-[" + elm.color + "]");
        //         newList.push("from-[" + elm.stop + "%]");
            
        //     }else if(counter == $thumbs.length -1){
        //         newList.push("to-[" + elm.color + "]");
        //         newList.push("to-[" + elm.stop + "%]");
        //     }else{
        //         newList.push("via-[" + elm.color + "]");
        //         newList.push("via-[" + elm.stop + "%]");
        //     }
        //     counter++;
        // });

        var tempList = $thumbs;
        for(var i=0; i<tempList.length; i++){
            var elm = tempList[i];
            if(i == 0){
                newList.push("from-[" + elm.color + "]");
                newList.push("from-[" + elm.stop + "%]");
            
            }else if(i == tempList.length -1){
                newList.push("to-[" + elm.color + "]");
                newList.push("to-[" + elm.stop + "%]");
            }else{
                newList.push("via-[" + elm.color + "]");
                newList.push("via-[" + elm.stop + "%]");
            }
        }

        gradientClasses.set(newList);
        updateFromGradientBuilder();
    }

    /**
     * Updates selected color
     * @param {CustomEvent} event This event fires from "ColorPicker"
     */
     function updateColorFromList(event){
        var {hsv, rgb, hex, color} = event.detail;
        var thumbsList = $thumbs;
        if(selectedThumbId != null){
            for(var i=0; i<thumbsList.length;i++){
                if(thumbsList[i].id == selectedThumbId){
                    thumbsList[i]["color"] = hex;
                    selectedColor.set(hex);
                }
            }
            thumbs.set(thumbsList);
            updateStops();
        }
    }


    /**
     * 
     * @param {number} id Id of selected thumb element
     * @param {string} color Color of selected thumb element
     */
    function setColor(id, color){
        selectedThumbId = id;
        selectedColor.set(color);
        visibilityOfColorPicker=true;
    }


    function resizeWindow() {
      elementX = thumbsContainer.getBoundingClientRect().left;
    }

    function onTrackEvent(e) {
      // Update value immediately before beginning drag
      updateValueOnEvent(e);
      onDragStart(e);
    }

    function onDragStart(e) {
        currentThumb = e.target;
    }

    function updateValueOnEvent(e) {
        // touchstart && mousedown are one-off updates, otherwise expect a currentPointer node
        if (!currentThumb && e.type !== "touchstart" && e.type !== "mousedown")
            return false;
    
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
    
        // Get client's x cord either touch or mouse
        const clientX =
            e.type === "touchmove" || e.type === "touchstart"
            ? e.touches[0].clientX
            : e.clientX;
    
        // Find distance between cursor and element's left cord (20px / 2 = 10px) - Center of thumb
        let delta = clientX - (elementX + 13);
        
        // Use width of the container minus 13px offset for percent calc
        let percent = (delta * 100) / (thumbsContainerWidth - 13);

        // Limit percent 0 -> 100
        percent = percent < 0 ? 0 : percent > 100 ? 100 : parseInt(percent.toFixed(0),0);

        updatePercentOfThumb(percent);
  
    }

    /**
     * 
     * @param {number} percent
     */
    function updatePercentOfThumb(percent){

        var thumbsList = $thumbs;
        if(currentThumb !== null && currentThumb !== undefined){
            var idOfCurrentThumb = currentThumb.getAttribute("id").replace("thumb_","");
            for(var i=0; i<thumbsList.length;i++){
                if(thumbsList[i].id == idOfCurrentThumb){
                    thumbsList[i]["stop"] = percent;
                }
            }
            thumbs.set(thumbsList);
            updateStops();
        }

    }

    function onDragEnd(e) {
        currentThumb = null;
    }

    function addStop(){

        // var thumbsList = $thumbs;
        // if(thumbsList.length >0){
        //     thumbsList.push({"color": "#cc1000", "stop": 100, "id": thumbsList.length ?? 0});
        // }else{
        //     thumbsList.push({"color": "#000000", "stop": 0, "id": thumbsList.length ?? 0});
        // }
        // thumbs.set(thumbsList);

        thumbs.update(addStopByUpdate);

        updateStops();
    }

    /**
     * 
     * @param {Array<thumbData>} list
     */
    function addStopByUpdate(list){

        if(list.length >0){
            list.push({"color": "#cc1000", "stop": 100, "id": list.length ?? 0});
        }else{
            list.push({"color": "#000000", "stop": 0, "id": list.length ?? 0});
        }

        return list;
    }

</script>

<svelte:window
    on:touchmove|nonpassive={updateValueOnEvent}
    on:touchcancel={onDragEnd}
    on:touchend={onDragEnd}
    on:mousemove={updateValueOnEvent}
    on:mouseup={onDragEnd}
    on:resize={resizeWindow}
  />

{#if $thumbs.length<3}
<div class="w-full flex flex-row place-content-between h-10 items-center">
    <span>Stops</span>
    <Button active={true} on:click={addStop} >
        <span slot="iconRight"><i class="bi bi-plus me-2"></i></span>
        <span slot="text">Add New</span>
    </Button>
</div>
{/if}

{#if $thumbs.length >0}
<div class="w-full my-2 flex flex-col gap-2" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >
   
    <div class="w-full h-10 relative flex flex-row" id="thumbsContainer" bind:this={thumbsContainer}>

        {#each $thumbs as thumb}
            <div class="flex flex-col gap-1 absolute left-[{calculateLeftPositionOfThumb(thumb.stop)}px]" draggable="true">
                <button class="bg-[{thumb.color}] rounded-sm text-[9px] text-center text-white" on:click={()=>setColor(thumb.id, thumb.color)}><i class="bi bi-palette2"></i> {thumb.id}</button>
                <div class="sliced bg-[{thumb.color}]" on:mousedown={onTrackEvent} on:touchstart={onTrackEvent} id="thumb_{thumb.id}" >{thumb.stop}%</div>
            </div>
        {/each}

    </div>
    <div class="w-full h-8 rounded-md px-[13px]"><div class="h-8 rounded-md {innerClass}"></div></div>

    {#if visibilityOfColorPicker}
        <div class="flex flex-row gap-2 items-center justify-between" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }}>
            <div class="flex flex-row min-w-[130px] h-8 pr-2 place-content-start items-center">
                <div class="h-4 flex place-content-center items-center font-bold">
                    <ColorPicker 
                        label={$selectedColor}
                        hex={$selectedColor}
                        on:input={(event) => updateColorFromList(event)}
                    />
                </div> 
            </div>
            <div>
                <Iconbutton active={false} on:click={()=>visibilityOfColorPicker=false}><span slot="icon"><i class="bi bi-x-circle"></i></span></Iconbutton>
                <!-- <Iconbutton active={false} ><span slot="icon"><i class="bi bi-x-circle"></i></span></Iconbutton> -->
            </div>
        </div>
    {/if}

    
</div>
{/if}
<!-- 
    <span class="text-[10px]">{$gradientClasses.toString()}</span><br/>
    <span class="text-[10px]">{JSON.stringify($thumbs)}</span><br/>
    <span class="text-[10px]">{elementX} - {thumbsContainerWidth} - {thumbX} | selectedThumbId : {selectedThumbId}</span>
 -->


<style>


    .sliced {
        width: 26px !important;
        height: 26px !important;
        font-size: 10px;
        font-weight: 700;
        color: #fff;
        display: flex;
        justify-content: center;
        /* align-items: start; */
        padding-top: 2px;
        /* clip-path: polygon(50% 0%, 100% 25%, 100% 100%, 0% 100%, 0% 25%, 50% 0%); */
        clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%, 0% 0%);

    }


</style>