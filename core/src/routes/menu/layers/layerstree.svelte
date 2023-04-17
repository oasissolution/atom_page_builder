<script>
    export let component;
    export let level = 0;

    import { globalSelectedElementUuidStore } from "../../globals/selectorstores.js";

    // TODO: import all modules dynamically

    import Body from "../../(modules)/modules/body.svelte";
    import Div from "../../(modules)/modules/div.svelte";
    import Text from "../../(modules)/modules/text.svelte";

    /**
     * Definition and list of all modules in a JSON.
     * @returns {JSON}
     * 
     */
    const JsonOfModules = {
        "body": Body,
        "div": Div,
        "text": Text,
    };

    /**
     * Definition and list of all modules in a JSON.
     * @returns {JSON}
     * 
     */
    const JsonOfTypes = {
        "body": {"title": "Body", "data": ""},
        "div": {"title": "Container", "data": ""},
        "text": {"title": "Text", "data": "text"},
    };

</script>

<div style:margin-left="20px"> <!-- {level * 20} -->
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
</div>



<!-- <div style:margin-left="{level * 20}px">
    <slot {component} />

    {#each component?.children ?? [] as child}
        <svelte:self component={child} level={level + 1}>
            <slot component={child} /> 
        </svelte:self>
    {/each}
</div> -->