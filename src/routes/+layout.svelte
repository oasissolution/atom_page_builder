<script>
    import { onMount, onDestroy, SvelteComponent } from "svelte";
    import { 
        globalComponentCollectionStore, 
        globalEditorPreferencesStore, 
        globalWidgetsPanelVisibilityStore, 
        globalRightPanelContentStore,
        globalLeftPanelContentStore,
        globalVisibilityStore
     } from "./globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations } from "./globals/globalconstants.js";
    import Menu from "./menu/+page.svelte";
	import Info from "./info.svelte";
    import Customize from "./menu/customize/+page.svelte";


    /**
     * This data comes from server
     *
     * Variable holding data is "pageData" and "editorPreferences"
     * @example
     *      let globalComponents = data.pageData;
     *      let editorPreferences = data.editorPreferences;
     * @default {}
     * @type JSON
     */
    export let data;

    let globalWidgetsPanelVisibility = false;

    //Attach all data from database to this app.
    globalComponentCollectionStore.set(data.serverData);
    globalEditorPreferencesStore.set(data.editorPreferences);

    $: globalWidgetsPanelVisibilityStore.set(globalWidgetsPanelVisibility);

    ///Load all panels in layout
    let rightPanelContentStore = [];
    $: globalRightPanelContentStore.set(rightPanelContentStore);
    let leftPanelContentStore = [];
    $: globalLeftPanelContentStore.set(leftPanelContentStore);

    //Add all panels in this list.
    // let panelsInMenu = [Customize];
    // panelsInMenu.forEach(element => {
    //     rightPanelContentStore.push({"component":element, "name":element.arguments["componentName"]});
    //     leftPanelContentStore.push({"component":element, "name":element.arguments["componentName"]});
    // });

    rightPanelContentStore.push({"component":Customize, "name":"Customize", "ds": "customizePanelDisplayStyle" });
    leftPanelContentStore.push({"component":Customize, "name":"Customize", "ds": "customizePanelDisplayStyle"  });


    
    let topMenuFrameContent = false;
    let bottomMenuFrameContent = false;
    let leftMenuFrameContent = false;
    let rightMenuFrameContent = false;

    let leftPanelContent = false;
    let rightPanelContent = false;

    $: switch($globalEditorPreferencesStore.widgetPanelDisplayStyle){
        case PanelDisplayStyles.FIXEDLEFT:
            if(globalWidgetsPanelVisibility == true) {
                leftPanelContent = true;
            }else{
                leftPanelContent = false;
            }
            break;
        case PanelDisplayStyles.FIXEDRIGHT:
            if(globalWidgetsPanelVisibility == true) {
                rightPanelContent = true;
            }else{
                rightPanelContent = false;
            }
            break;
        default:
            break;
    }


    $: switch($globalEditorPreferencesStore.menuLocation){
        case MenuLocations.TOP:
            topMenuFrameContent = true;
            bottomMenuFrameContent = false;
            leftMenuFrameContent = false;
            rightMenuFrameContent = false;
            break;
        case MenuLocations.BOTTOM:
            topMenuFrameContent = false;
            bottomMenuFrameContent = true;
            leftMenuFrameContent = false;
            rightMenuFrameContent = false;
            break;
        case MenuLocations.LEFT:
            topMenuFrameContent = false;
            bottomMenuFrameContent = false;
            leftMenuFrameContent = true;
            rightMenuFrameContent = false;
            break;
        case MenuLocations.RIGHT:
            topMenuFrameContent = false;
            bottomMenuFrameContent = false;
            leftMenuFrameContent = false;
            rightMenuFrameContent = true;
            break;
        default:
            break;
    }

    onMount(() => {


    });


</script>

<svelte:head>
    <script src={"/js/jquery-3.6.3.min.js"} />
    <script src={"/js/all.js"} />
    <script src={"/js/bootstrap.js"} />

    <link rel="stylesheet" href={"/css/all.css"}>
    <link rel="stylesheet" href={"/css/bootstrap.css"}>
    <link rel="stylesheet" href={"/bootstrap-icons/bootstrap-icons.css"}>
    <title>Atom Page Builder</title>
</svelte:head>


<div id="backgroundFrame" class="" style='--backgroundFrameColor:{$globalEditorPreferencesStore.editorTheme.backgroundFrameColor};'>
    {#if topMenuFrameContent}<div id="topMenuFrame" class="fixed-top"><svelte:component this={Menu}/></div>{/if}
    <div id="middleFrame" class="hstack" >
        {#if leftMenuFrameContent}<div id="leftMenuFrame" class=""><svelte:component this={Menu}/></div>{/if}

        {#if $globalLeftPanelContentStore.length > 0}<div id="leftPanelFrame" class="">
            {#each $globalLeftPanelContentStore as item}
                {#if $globalEditorPreferencesStore[item.ds] == PanelDisplayStyles.FIXEDLEFT}
                    <svelte:component this={item.component}/>
                {/if}
            {/each}
        </div>{/if}
        
        <div id="editorWrapper" class="ms-auto d-flex justify-content-center w-100">
            <div id="editor" 
                style='
                --editorBackgroundColor:{$globalEditorPreferencesStore.editorTheme.editorBackgroundColor}; 
                --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor}; 
                --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth}; 
                '>
                <slot></slot>
            </div>
        </div>
        

        {#if $globalRightPanelContentStore.length > 0}<div id="rightPanelFrame" class="">
            {#each $globalRightPanelContentStore as item}
                {#if $globalEditorPreferencesStore[item.ds] == PanelDisplayStyles.FIXEDRIGHT}
                    <svelte:component this={item.component}/>
                {/if}
            {/each}
        </div>{/if}

        {#if rightMenuFrameContent}<div id="rightMenuFrame" class=""><svelte:component this={Menu}/></div>{/if}
        
    </div>
    {#if bottomMenuFrameContent}<div id="bottomMenuFrame" class="fixed-bottom"><svelte:component this={Menu}/></div>{/if}

</div>

<!-- <div id="infoLayer" class="d-flex justify-content-center align-items-center">
    <svelte:component this={Info}/>
</div> -->






<style>
    #backgroundFrame{
        background-color: var(--backgroundFrameColor); 
        width: 100vw;
        height: 100vh;
        position: relative;
        margin: auto; 
        overflow: hidden;
    }
    #topMenuFrame{
        position: sticky;
        width: 100vw;
    }
    #bottomMenuFrame{
        position: sticky;
        width: 100vw;
    }
    #leftMenuFrame{
        height: 100vh;
    }
    #leftPanelFrame{
        background-color: var(--backgroundColor);
        height: 100vh;
    }

    #rightMenuFrame{
        height: 100vh;
    }
    #rightPanelFrame{
        background-color: var(--backgroundColor);
        height: 100vh;
    }
    #editor{
        width: 100%;
        height: auto;
        max-width: var(--editorWidth);
        max-height: 100vh;
        margin: auto;
        overflow: auto !important;
        background-color: var(--editorBackgroundColor);
    }

    #infoLayer{
        position: absolute;
        left: 30%;
        top: 0;
        z-index: 99999;
        width: 40%;
        min-width: 360px;
        margin: auto;
    }


</style>