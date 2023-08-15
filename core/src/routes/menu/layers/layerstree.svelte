<script>
    export let component;
    export let level = 0;

    import { globalSelectedElementUuidStore, globalLayersExpansionStatesStore } from "../../globals/selectorstores.js";


    import Body from "../../(modules)/layers/body.svelte";
    import Div from "../../(modules)/layers/div.svelte";
    import Text from "../../(modules)/layers/text.svelte";
    import GridContainer from "../../(modules)/layers/grid-container.svelte";
	import { onMount } from "svelte/internal";
	import EasySection from "../../(modules)/layers/easy-section.svelte";
    import Image from "../../(modules)/layers/img.svelte"

    /**
     * @typedef {Object} ExpansionState
     * @property {string} [uuid] - Unique id of element.
     * @property {boolean} [state] - Specifies whether the element is expanded.
     */

    let globalLayersExpansionStates = $globalLayersExpansionStatesStore;
    $: globalLayersExpansionStatesStore.set(globalLayersExpansionStates);

    /**
     * 
     * @param {string} uuid
     */
    function setSelected(uuid){
        globalSelectedElementUuidStore.set(uuid);
    }
    
    /**
     * 
     * @param {string} uuid
     */
	function toggleExpansion(uuid){
        globalLayersExpansionStates[uuid] = !globalLayersExpansionStates[uuid];
	}


    onMount(()=>{

    });

    let listOfElementsThatCanHaveChildren = ['div', 'gridcontainer', 'easysection']

</script>

<div class:pl-4 = {component.type != "body"}> <!--  -->
    <slot>
        {component}
    </slot>

    {#if $globalLayersExpansionStatesStore[component.uuid] == true || component.type == "body"}
    
    {#each component?.children ?? [] as child}
        
            <svelte:self component={child} level={level + 1}>
                <div class="w-full flex flex-row">
                    <div class="h-8 w-8 flex justify-center items-center">
                        {#if listOfElementsThatCanHaveChildren.includes(child.type)}
                            <button on:click={()=>toggleExpansion(child.uuid)} >
                                {#if $globalLayersExpansionStatesStore[child.uuid] == true}
                                    <i class="bi bi-caret-down-fill"></i>
                                {:else}
                                    <i class="bi bi-caret-right-fill"></i>
                                {/if}
                            </button>
                        {/if}
                    </div>
                    {#if child.type == "div"}
                    <Div uuid={child.uuid} selected={$globalSelectedElementUuidStore === child.uuid} on:click={()=>setSelected(child.uuid)} />

                    {:else if child.type == "text"}
                    <Text uuid={child.uuid} selected={$globalSelectedElementUuidStore === child.uuid} on:click={()=>setSelected(child.uuid)} />

                    {:else if child.type == "gridcontainer"}
                    <GridContainer uuid={child.uuid} selected={$globalSelectedElementUuidStore === child.uuid} on:click={()=>setSelected(child.uuid)} />

                    {:else if child.type == "easysection"}
                    <EasySection uuid={child.uuid} selected={$globalSelectedElementUuidStore === child.uuid} on:click={()=>setSelected(child.uuid)} />

                    {:else if child.type == "img"}
                    <Image uuid={child.uuid} selected={$globalSelectedElementUuidStore === child.uuid} on:click={()=>setSelected(child.uuid)} />



                               {:else}
                    <span class="flex flex-row gap-2 align-middle my-2" class:text-teal-600 = {$globalSelectedElementUuidStore === child.uuid} >
                        <span class="">{child.type}</span>
                        <span class="flex flex-col">
                            <span class="text-[8px] align-middle">{child.uuid}</span><br/> 
                            <span class="text-[8px] align-middle">{child.data.class}</span> 
                        </span> 
                    </span>
                    {/if}
                </div>
            </svelte:self>
            
        
    {/each}
    {/if} 
</div>







<!-- <div style:margin-left="20px">
    <slot>
        {component}
    </slot>

    {#each component?.children ?? [] as child}
    
            <svelte:self component={child} level={level + 1}>
                <span class="flex flex-row gap-2 align-middle my-2" class:text-teal-600 = {$globalSelectedElementUuidStore === child.uuid} >
                    <span class="">{child.type}</span>
                    <span class="flex flex-col">
                        <span class="text-[8px] align-middle">{child.uuid}</span><br/> 
                        <span class="text-[8px] align-middle">{child.data.class}</span> 
                    </span> 
                </span>
            </svelte:self>
        
    {/each}
</div> -->

<!-- <div style:margin-left="{level * 20}px">
    <slot {component} />

    {#each component?.children ?? [] as child}
        <svelte:self component={child} level={level + 1}>
            <slot component={child} /> 
        </svelte:self>
    {/each}
</div> -->