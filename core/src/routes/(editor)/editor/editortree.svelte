<script>
    export let component;
    export let JsonOfModules;

    // console.log("tree : " + JSON.stringify(component));
</script>

<slot/>
    


{#each component?.children ?? [] as child}
    <svelte:component this={JsonOfModules[child.type]} data={child.data} uuid={child.uuid}>
        <svelte:self component={child} JsonOfModules={JsonOfModules} >
            <!-- <slot component={child} />  -->
        
        </svelte:self>
    </svelte:component>
{/each}

<!-- <svelte:self component={child} JsonOfModules={JsonOfModules} >
       
        <svelte:component this={JsonOfModules[child.type]} data={child.data} uuid={child.uuid}></svelte:component>
    </svelte:self> -->