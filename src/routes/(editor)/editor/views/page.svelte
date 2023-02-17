<script>
    import { onMount, onDestroy } from "svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalVisibilityStore,
        globalRightPanelContentStore, globalLeftPanelContentStore  } from "../../../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSizePx } from "../../../globals/globalconstants.js";
    import jQuery from "jquery";

    let globalComponentCollection = $globalComponentCollectionStore ?? [{}] ;
    $: globalComponentCollectionStore.set(globalComponentCollection);

    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
    $: globalEditorPreferencesStore.set(globalEditorPreferences);









</script>


<div class="container-fluid"> <h1>This is editor</h1></div>



    








<style>

    



</style>