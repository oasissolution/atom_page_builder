<script>
    import { globalSelectedElementStore, globalSelectedLatterElementStore, globalSelectedLatterElementDataStore } from "../../../routes/globals/selectorstores.js";

    // console.log("Selector initiated");


    /**
    * Main selector div and actions binding.
    * @type HTMLElement
    */
    let atomSelector;

    /**
     * @type HTMLCollection
     */
    let divChildren;


    let selectorPositionDataWidth = "100px";
    let selectorPositionDataHeight = "100px";
    let selectorPositionDataLeft = "100px";
    let selectorPositionDataTop = "100px";


    $: $globalSelectedElementStore, (updateSelector)();

    function updateSelector(){

        ///selection changed. update z-values of latter selected element.
        // if($globalSelectedLatterElementStore != null && $globalSelectedLatterElementStore != undefined){
        //     const elements = $globalSelectedLatterElementStore.children;

        //     var minZIndexLatter = $globalSelectedLatterElementDataStore.minZIndex;
        //     var maxZIndexLatter = $globalSelectedLatterElementDataStore.maxZIndex;

        //     console.log("minZIndexLatter: " + minZIndexLatter + " | maxZIndexLatter:" + maxZIndexLatter);

        //     /// Now we know all min and max z-indexes. So we can place atomSelector now. 
        //     if(minZIndexLatter >= 0 && maxZIndexLatter < 45){ //smaller than 45 instead of 50 because we add 5 to all elements. (Buttons are at 50)
        //         for (let i = 0; i < elements.length; i++) {
        //             if(parseInt(elements[i].style.zIndex) >= 5) elements[i].style.zIndex = (parseInt(elements[i].style.zIndex) - 5).toString();
        //         }
        //         // atomSelector.style.zIndex = "5";
        //     }else if(minZIndexLatter >= 0 && maxZIndexLatter >= 45){
        //         for (let i = 0; i < elements.length; i++) {
        //             if(parseInt(elements[i].style.zIndex) >= 5) elements[i].style.zIndex = (parseInt(elements[i].style.zIndex) - 5).toString();
        //         }
        //         // atomSelector.style.zIndex = "5";
        //         if((parseInt(document.getElementById("atomSelectorActions").style.zIndex) - maxZIndexLatter) > 0)
        //         document.getElementById("atomSelectorActions").style.zIndex = (parseInt(document.getElementById("atomSelectorActions").style.zIndex) - maxZIndexLatter).toString();
        //     }else if(minZIndexLatter < 0 && $globalSelectedLatterElementDataStore.maxZIndex < 45){
        //         for (let i = 0; i < elements.length; i++) {
        //             if((parseInt(elements[i].style.zIndex) - 5 - Math.abs(minZIndexLatter)) > 0)
        //             elements[i].style.zIndex = (parseInt(elements[i].style.zIndex) - 5 - Math.abs(minZIndexLatter)).toString();
        //         }
        //     }else{
        //         for (let i = 0; i < elements.length; i++) {
        //             if((parseInt(elements[i].style.zIndex) - 5 - Math.abs(minZIndexLatter)) > 0)
        //             elements[i].style.zIndex = (parseInt(elements[i].style.zIndex) - 5 - Math.abs(minZIndexLatter)).toString();
        //         }
        //         if((parseInt(document.getElementById("atomSelectorActions").style.zIndex) - maxZIndexLatter) > 0)
        //         document.getElementById("atomSelectorActions").style.zIndex = (parseInt(document.getElementById("atomSelectorActions").style.zIndex) - maxZIndexLatter).toString();
        //     }
        // }

        // console.log("Selector activated");

        if($globalSelectedLatterElementStore != null && $globalSelectedLatterElementStore != undefined){
            // atomSelector.replaceWith($globalSelectedLatterElementStore);
        }
        
        if($globalSelectedElementStore != null && $globalSelectedElementStore != undefined){

            /**
             * @type string
            */
            var _class_last = atomSelector.getAttribute("class")?.trim();

            /**
             * @type string
            */
            var _class = "";

            /// Remove old rectangle settings if exist
            /// Since this is a specific HTMLElement that we use, user can NOT or developer should NOT edit class. Hence it is safe to remove these.
            _class_last.split(" ").forEach((cls) => {
                if( cls.startsWith("w-[") || cls.startsWith("h-[") || cls.startsWith("top-[") || cls.startsWith("left-[") || cls.startsWith("z-") ){
                    //do nothing, so will not be added to class
                }else{
                    _class += " " + cls;
                }
            });

            
            /**
             * Position and dimension data of selected element.
             * @type DOMRect
             */
            const rect = $globalSelectedElementStore.getBoundingClientRect();

            selectorPositionDataWidth = rect.width.toString()+"px";
            selectorPositionDataHeight = rect.height.toString()+"px";
            selectorPositionDataLeft = rect.left.toString()+"px";
            selectorPositionDataTop = rect.top.toString()+"px";

            _class += " w-["+rect.width+"px]";
            _class += " h-["+rect.height+"px]";
            _class += " top-["+rect.top+"px]";
            _class += " left-["+rect.left+"px]";
            // _class += " z-40"

            // console.log("rect : "+ JSON.stringify(rect.toJSON));
            console.log("Selector Class : "+ _class);
            console.log("Selector Style : "+ JSON.stringify(atomSelector.style));

            // $globalSelectedElementStore.style.addClass = "test";
            console.log("Element Class : "+ $globalSelectedElementStore.getAttribute("class"));
            console.log("Element Style : "+ JSON.stringify($globalSelectedElementStore.style));

            // atomSelector.setAttribute("class", _class);

            globalSelectedLatterElementStore.set($globalSelectedElementStore);

            
            // var newDiv = window.document.createElement("div");

            // divChildren = $globalSelectedElementStore.children;

            // var newDiv = document.createElement('div');
            // Array.prototype.slice.call(divChildren).forEach((child) => {
            //     newDiv.appendChild(child);
            // });

            // $globalSelectedElementStore.replaceWith(atomSelector);
            
            // var newDiv = window.document.createElement("div");
            // $globalSelectedElementStore.replaceWith(newDiv);


            ///Place selector div one level above bottom and push inner items more to front. That way we can still select inner elements. And do not loose base.
            // const elements = $globalSelectedElementStore.querySelectorAll('*');
            // const elements = $globalSelectedElementStore.children;
            // let maxZIndex = 0;
            // let minZIndex = 0;
            // for (let i = 0; i < elements.length; i++) {
            //     const zIndex = parseInt(window.getComputedStyle(elements[i]).zIndex);
            //     if (zIndex > maxZIndex) {
            //         maxZIndex = zIndex;
            //     }
            //     if (zIndex < minZIndex) {
            //         minZIndex = zIndex;
            //     }
            // }

            // console.log("elements.length: " + elements.length.toString() + " | minZIndex: " + minZIndex.toString() + " | maxZIndex:" + maxZIndex.toString());

            /// Add these values to store, so by that way we can update easily when selection changes.
            // globalSelectedLatterElementDataStore.set({
            //     "maxZIndex": maxZIndex,
            //     "minZIndex": minZIndex
            // });

            /// Add this selected element to latter store, so we can use to revert selection
            // globalSelectedLatterElementStore.set($globalSelectedElementStore);

            /// Now we know all min and max z-indexes. So we can place atomSelector now. 
            // TODO: Will be organized. 
            // if(minZIndex >= 0 && maxZIndex < 45){ //smaller than 45 instead of 50 because we add 5 to all elements. (Buttons are at 50)
            //     for (let i = 0; i < elements.length; i++) {
            //         const zIndex = parseInt(window.getComputedStyle(elements[i]).zIndex);
            //         if(Number.isNaN(zIndex) == true){
            //             elements[i].style.zIndex = "5";
            //         }else{
            //             if(elements[i].style.zIndex <5){
            //                 elements[i].style.zIndex = (zIndex + 5).toString();
            //             }
            //         }
            //         // console.log("elements["+i+"]: " + elements[i].id + " | zIndex: " + zIndex);
            //         // elements[i].style.zIndex = zIndex != null && zIndex != undefined ? (zIndex + 5).toString() : "5";
            //         console.log("elements["+i+"]: " + elements[i].id + " | zIndex: " + elements[i].style.zIndex);
            //     }
            //     // atomSelector.style.zIndex = "5";
            // }else if(minZIndex >= 0 && maxZIndex >= 45){
            //     for (let i = 0; i < elements.length; i++) {
            //         elements[i].style.zIndex = (parseInt(elements[i].style.zIndex) + 5).toString();
            //     }
            //     // atomSelector.style.zIndex = "5";
            //     document.getElementById("atomSelectorActions").style.zIndex = (parseInt(document.getElementById("atomSelectorActions").style.zIndex) + maxZIndex).toString();
            // }else if(minZIndex < 0 && maxZIndex < 45){
            //     for (let i = 0; i < elements.length; i++) {
            //         elements[i].style.zIndex = (parseInt(elements[i].style.zIndex) + 5 + Math.abs(minZIndex)).toString();
            //     }
            // }else{
            //     for (let i = 0; i < elements.length; i++) {
            //         elements[i].style.zIndex = (parseInt(elements[i].style.zIndex) + 5 + Math.abs(minZIndex)).toString();
            //     }
            //     document.getElementById("atomSelectorActions").style.zIndex = (parseInt(document.getElementById("atomSelectorActions").style.zIndex) + maxZIndex).toString();
            // }

            // for (let i = 0; i < elements.length; i++) {
            //     console.log(elements[i].id + " : " + elements[i].style.zIndex);
            // }

        }


    }


    function editButtonPress(){
        alert("Button clicked!");
    }


</script>
<!-- class:invisible={$globalSelectedElementStore === null || $globalSelectedElementStore === undefined}   class:-z-40={$globalSelectedElementStore == null}-->
<input type="hidden" class="test" />

<div bind:this={atomSelector} id="atomSelector" class=""
 style='
    --selectorPositionDataWidth:{selectorPositionDataWidth}; 
    --selectorPositionDataHeight:{selectorPositionDataHeight};
    --selectorPositionDataLeft:{selectorPositionDataLeft};
    --selectorPositionDataTop:{selectorPositionDataTop};
'>


    <div class="relative w-full h-full">
        <!-- {divChildren} -->
        <div id="atomSelectorActions" class="bg-white rounded-md absolute top-2 right-2 w-18 h-8 p-1 m-0 flex flex-row z-50">
            <button class="bg-transparent border-none w-6 h-6 p-0 m-0 text-black" on:click='{editButtonPress}'><i class="bi bi-pen w-5 h-5 text-black"></i></button>
            <div class="vr"></div>
            <button class="bg-transparent border-none w-6 h-6 p-0 m-0 text-black" on:click='{editButtonPress}'><i class="bi bi-three-dots-vertical w-5 h-5 text-black"></i></button>
        </div>
        <!-- {$globalSelectedElementStore != null ? $globalSelectedElementStore.getAttribute("id") : ""} -->
    </div>
    

</div>



<style>

    #atomSelector{
        position: absolute;
        z-index: 0;
        border: 2px dotted aqua;
        /* background-color:cadetblue; */
        background-color: transparent;
        top: var(--selectorPositionDataTop);
        left: var(--selectorPositionDataLeft);
        width: var(--selectorPositionDataWidth);
        height: var(--selectorPositionDataHeight);
    }

    #atomSelectorActions{
        z-index: 100;
    }

    /* #atomSelector::after{
        border: 2px dotted black; 
    } */

    .hr {
        display: inline-block;
        align-self: stretch;
        height: 1px;
        min-width: 1em;
        background-color: black; /* var(--foregroundColor) */
        opacity: 0.25;
    }

    .vr {
        display: inline-block;
        align-self: stretch;
        width: 1px;
        min-height: 1em;
        background-color: black;
        opacity: 0.25;
        margin-right: 4px;
        margin-left: 4px;
    }


 


    
</style>