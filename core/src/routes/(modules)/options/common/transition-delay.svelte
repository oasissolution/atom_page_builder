<script>

    import "../../../../app.css";
    import Textinput from "../../../uicomponents/textinput.svelte";

    /**
     * @type boolean
     */
    export let loaded;

    /**
     * Actual class
     * @type string
     */
    export let classInput;

    /**
     * Actual part of class
     * @type string
     */
    export let property; 

    let textValue = "";
    
    let innerLoad = false;

    import { createEventDispatcher } from 'svelte';
	
    const dispatch = createEventDispatcher();

    function updateClass() {
        dispatch('updateClass');
    }

    /**
     * Used for sub elements update control.
     * @type string
    */
    export let elementDataLoaded;

    $: loaded, (()=>{
        if(loaded == true) {// && innerLoad == false
            var foundClass = false;
            elementDataLoaded.split(" ").forEach( cls => {

                var currentClass = cls.trim();

                if(currentClass.startsWith("delay")){
                    property = currentClass;
                    textValue = currentClass.replaceAll("delay-[", "").replaceAll("ms]","");
                    innerLoad = true;
                    foundClass = true;
                }

            });
            if(foundClass==false) textValue="";
        }
    })();

    $: property, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {

                if(cls.trim().startsWith("delay")){
                    ///Do nothing - If included then should be removed
                }else{
                    newClass += " " + cls.trim();
                }
            });

            if(property != "delay-[0ms]" && property != "delay-[ms]"){ 
                classInput = newClass.trim() + " " + property; 
            }else{
                classInput = newClass.trim();
            }
            
            updateClass();
        }
    })();

 
    /**
     * 
     * @param {number} newValue
     */
    function updateTextValue(newValue){
        property = "delay-[" + newValue.toString() + "ms]";
    }

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the delay of CSS transitions.">Transition Delay</span>
    <span class="w-[180px]"> <Textinput text={textValue} trailingLetter={"ms"} onlyNumbers on:onSubmit={e=>updateTextValue(e.detail.text)}/></span>
</div>
