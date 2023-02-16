<script>
    import { globalEditorPreferencesStore } from "../../../globals/globalstores.js";
    import ColorPicker from 'svelte-awesome-color-picker';

    /**
     * Holds "globalEditorPreferencesStore" store as variable
     */
    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
    /// Updates "globalEditorPreferencesStore" whenever variable "globalEditorPreferences" changes.
    $: globalEditorPreferencesStore.set(globalEditorPreferences);


    /**
     * Array of colors used in app.
     * @param {string} title Label of Color
     * @param {string} key Key of color defined in globalEditorPreferencesStore.editorTheme
     */
    const themeData = [
        {"title": "Editor Background Color", "key": "backgroundFrameColor"},
        {"title": "hr", "key": ""},
        {"title": "Menu Background Color", "key": "backgroundColor"},
        {"title": "Menu Foreground Color", "key": "foregroundColor"},
        {"title": "hr", "key": ""},
        {"title": "Menu Button Active Foreground Color", "key": "buttonActiveForegroundColor"},
        {"title": "Menu Button Active Background Color", "key": "buttonActiveBackgroundColor"},
        {"title": "Menu Button Passive Foreground Color", "key": "buttonPassiveForegroundColor"},
        {"title": "Menu Button Passive Background Color", "key": "buttonPassiveBackgroundColor"},
        {"title": "hr", "key": ""},
        {"title": "Fixed Panel Foreground Color", "key": "fixedPanelForegroundColor"},
        {"title": "Fixed Panel Background Color", "key": "fixedPanelBackgroundColor"},
        {"title": "hr", "key": ""},
        {"title": "Fixed Panel Button Active Foreground Color", "key": "fixedPanelButtonActiveForegroundColor"},
        {"title": "Fixed Panel Button Active Background Color", "key": "fixedPanelButtonActiveBackgroundColor"},
        {"title": "Fixed Panel Button Passive Foreground Color", "key": "fixedPanelButtonPassiveForegroundColor"},
        {"title": "Fixed Panel Button Passive Background Color", "key": "fixedPanelButtonPassiveBackgroundColor"},
    ];

    /**
     * Updates selected color from "globalEditorPreferencesStore.editorTheme"
     * @param {string} key Key of color defined in globalEditorPreferencesStore.editorTheme
     * @param {CustomEvent} event This event fires from "ColorPicker"
     */
    function setColor(key, event){
        var {hsv, rgb, hex, color} = event.detail;
        globalEditorPreferences.editorTheme[key] = hex;
    }

</script>


<div class="hstack">
    Preset Themes
</div>
<br/>
<div class="themePanel">
    <div class="vstack" style='
        --fixedPanelBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelBackgroundColor}; 
        --fixedPanelForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelForegroundColor};
        --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveBackgroundColor};
        --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveBackgroundColor};
        --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveForegroundColor};
        --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveForegroundColor};
        ' >
        {#each themeData as data}
            {#if data.title == "hr"}
            <div class="hr"></div>
            {:else}
            <div class="hstack themeRow align-items-center">
                <div class="title">{data.title}</div>
                <div class="ms-auto"></div>
                <div class="picker d-flex justify-content-start">
                <ColorPicker 
                    label="{$globalEditorPreferencesStore.editorTheme[data.key]}" 
                    hex="{$globalEditorPreferencesStore.editorTheme[data.key]}" 
                    on:input={(event) => setColor(data.key, event)}
                /></div>
            </div>
            {/if}
            
        {/each}
    </div>
</div>
<style>
    .themePanel{
        max-height: 70vh;
        overflow-y: auto !important;
        overflow-x: hidden;
    }

    .themeRow{
        min-height: 50px;
    }

    .title{
        font-size: smaller;
        width: 140px;
        min-height: 50px;
        overflow: hidden;
        overflow-wrap: break-word;
    }

    .picker{
        height: 50px;
        width: 140px;
    }

    .hr {
        display: inline-block;
        align-self: stretch;
        height: 1px;
        min-width: 1em;
        background-color: var(--fixedPanelForegroundColor);
        opacity: 0.25;
        margin-top: 8px;
        margin-bottom: 8px;
    }

</style>