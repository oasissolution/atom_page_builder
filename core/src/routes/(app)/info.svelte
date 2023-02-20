<script>
    import { globalComponentCollectionStore, globalEditorPreferencesStore } from "../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations } from "../globals/globalconstants.js";

    //Editor Theme settings
    let editorTheme = $globalEditorPreferencesStore.editorTheme;
    // let editorTheme = editorPreferences.editorTheme;
    let backgroundColor = editorTheme.backgroundColor;
    let foregroundColor = editorTheme.foregroundColor;

</script>


<div class="infoLayer flex flex-row pl-2" style='--backgroundColor:{backgroundColor};--foregroundColor:{foregroundColor};'>
    <div class="icon flex items-center"><i class="fa-solid fa-circle-info"></i></div>
    <div class=""> {$globalEditorPreferencesStore.info}</div>
</div>

<style>

.infoLayer{
    width: 100%;
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