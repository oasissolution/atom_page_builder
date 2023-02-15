<script>
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalWidgetsPanelVisibilityStore } from "./globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations } from "./globals/globalconstants.js";

    //Editor Theme settings
    let editorTheme = $globalEditorPreferencesStore.editorTheme;
    // let editorTheme = editorPreferences.editorTheme;
    let backgroundColor = editorTheme.backgroundColor;
    let foregroundColor = editorTheme.foregroundColor;

</script>


<div class="infoLayer d-inline d-flex justify-content-start align-items-center" style='--backgroundColor:{backgroundColor};--foregroundColor:{foregroundColor};'>
    <div class="icon d-flex justify-content-center align-items-center"><i class="fa-solid fa-circle-info"></i></div>
    <div class=""> {$globalEditorPreferencesStore.info}</div>
</div>

<style>

.infoLayer{
    width: 40%;
    min-width: 360px;
    padding-top: 5px;
    padding-bottom: 5px;
    /* margin: auto; */
    background-color: var(--backgroundColor);
    color: var(--foregroundColor);
    /* border: 1px solid var(--foregroundColor); */
    border-radius: 6px;
}

.icon{
    width: 28px;
    height: 28px;
}



</style>