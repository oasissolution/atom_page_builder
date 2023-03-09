<script>
    import "../../../app.css";
    import { onMount } from "svelte";
    import { globalEditorPreferencesStore, globalComponentCollectionStore, globalThemeStore } from "../../globals/globalstores.js";
    import { globalSelectedElementStore } from "../../globals/selectorstores.js";
    import { getComponent } from "../../globals/globalfunctions.js";
    import { sendDeletedElement } from "../../(shared)/shared/sharedfunctions.js";
    import Editortree from "./editortree.svelte";
    import Selector from "../../(shared)/shared/selector.svelte";
    import swal from 'sweetalert';

    /// ATTENTION ! 

    /// Editor panel runs in an iframe. Hence, defined stores here are different than main stores in runtime, even if their names and definitions are identical.
    /// You may think this as, same stores running in two different threads with different values.

    let globalEditorPreferences = $globalEditorPreferencesStore;
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    let globalComponentCollection = $globalComponentCollectionStore;
    $: globalComponentCollectionStore.set(globalComponentCollection);

    let globalTheme = $globalThemeStore;
    $: globalThemeStore.set(globalTheme);

      
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

    onMount(() => {

        // Listen for messages from the outer page
        window.addEventListener('message', event => {
            // Check that the message is from a trusted source
            if (event.origin !== window.location.origin) {
                return;
            }
            // Get the data from the message
            const data = event.data.message;

            if(data === undefined){
                console.log("Incoming data do not have message!");
            }else{
                /// Set data as global writables
                globalComponentCollection = data.componentCollection;
                globalEditorPreferences = data.editorPreferences;
                globalTheme = data.globalTheme;
            }
        });

        window.addEventListener("keydown", (e) => {
            if(e.key === 'Delete' && $globalSelectedElementStore !== null){

                const comp = getComponent($globalComponentCollectionStore, $globalSelectedElementStore.id);
                // var question = "Delete \"" + JsonOfTypes[comp.type].title + "\" ?\n\n";
                // question += JsonOfTypes[comp.type].data != "" ? comp.data[JsonOfTypes[comp.type].data] : "";

                // if(confirm(question)) {

                // }
                if(comp.type != "body"){
                    swal({
                        title: "Delete \"" + JsonOfTypes[comp.type].title + "\" ?",
                        text: JsonOfTypes[comp.type].data != "" ? (comp.data[JsonOfTypes[comp.type].data] ?? "") : "",
                        icon: "warning",
                        buttons: ["No, keep it", "Yes, DELETE"],
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            sendDeletedElement(comp.uuid);
                            swal("Element deleted", {
                                icon: "success",
                            });
                        } else {
                            swal("Element kept!");
                        }
                    });
                }

            }
        });

        window.addEventListener("error", (e) => {

            swal({
                title: "Error on Editor Panel",
                text: e.error.toString(),
                icon: "error",
            });

        });

    });

    // import { writable } from "svelte/store";
    // let overlayBackground = writable("#242425");
    // let modalBackground = writable("#242425");
    // let modalBorder = writable("1px solid #242425");
    // let modalCustomCss = writable("");

    // $: $globalThemeStore, (() => {
    //     console.log("$globalThemeStore updated!");
    //     if($globalThemeStore !== undefined){
    //         console.log("$globalThemeStore !== undefined");
    //         overlayBackground.set($globalThemeStore.swal.overlay.backgroundColor != undefined ? $globalThemeStore.swal.overlay.backgroundColor : "#242425");
    //         modalBackground.set($globalThemeStore.swal.modal.backgroundColor != undefined ? $globalThemeStore.swal.modal.backgroundColor : "#242425");
    //         modalBorder.set($globalThemeStore.swal.modal.border != undefined ? $globalThemeStore.swal.modal.border : "1px solid #242425");
    //         modalCustomCss.set($globalThemeStore.swal.modal.customCss != undefined ? $globalThemeStore.swal.modal.customCss : "");

    //     }
    //     console.log('--swalOverlayBackgroundColor:'+$overlayBackground+';');
    //     console.log('--swalModalBackgroundColor:'+$modalBackground+';');
    //     console.log('--swalModalBorder:'+$modalBorder+';');
    //     console.log('--swalModalCustomCss:'+$modalCustomCss+';');
    // })();


</script>

<!-- style='
    --swalOverlayBackgroundColor:{$overlayBackground};
   --swalModalBackgroundColor:{$modalBackground};
   --swalModalBorder:{$modalBorder};
   --swalModalCustomCss:{$modalCustomCss};
' -->

<div id="editorInnerPanel" 

>

    {#if $globalComponentCollectionStore}
    {#each $globalComponentCollectionStore as component}
        <svelte:component this={JsonOfModules[component.type]} data={component.data} uuid={component.uuid} selected={component.selected} childs={component.children}>
        <Editortree component={component} JsonOfModules={JsonOfModules}></Editortree>
        </svelte:component>
    {/each}
    {:else}
    <div class="w-[100vw] h-[100vh] flex justify-center align-middle content-center text-2x" > <span>Loading...</span> </div>
    {/if}


fatih
</div> <!-- editorInnerPanel -->

<!-- <div class="hidden swal-overlay swal-modal"></div> -->
    
<svelte:component this={Selector} />

<style>

    #editorInnerPanel{
        width: 100%; 
        height: 100vh; /* subject to change in following versions */
    }

        
    /* :global(.swal-overlay) {
        background-color: var(--swalOverlayBackgroundColor) !important; 
    }
    
    :global(.swal-modal) {
        background-color: var(--swalModalBackgroundColor) !important;
        border: var(--swalModalBorder) !important;
    } */


</style>