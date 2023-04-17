<script>
    import { globalEditorPreferencesStore, globalThemeStore } from "../../../globals/globalstores.js";
	import Select from "../../../uicomponents/select.svelte";

    /**
     * Holds "globalEditorPreferencesStore" store as variable
     */
    let globalEditorPreferences = $globalEditorPreferencesStore;
    /// Updates "globalEditorPreferencesStore" whenever variable "globalEditorPreferences" changes.
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    /**
     * @typedef {Object} SelectOptions
     * @property {string} value
     * @property {string} name
     * @property {string} info
    */

    /**
     * Value of element
     * @type Array<SelectOptions>
     */
     let presetThemes = [
        
        {name: "Dark",     value: "dark",     info: "Dark Theme"},
        {name: "Light",     value: "light",     info: "Light Theme"},

        // {name: "",     value: "",     info: ""},
       
    ];

    import { themeColors as DarkTheme } from "../../../themes/dark.js";
    import { themeColors as LightTheme } from "../../../themes/light.js";




    /**
     * @type string
     */
    let selectedTheme = globalEditorPreferences.theme;

    $: selectedTheme, (()=>{

        globalEditorPreferences.theme = selectedTheme;

        switch(selectedTheme){
            case "light":
                globalThemeStore.set(LightTheme);
                break;
            default:
                globalThemeStore.set(DarkTheme);
                break;
        }
        

    })();

    

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <div>Preset Themes</div>
    <div>
        <Select bind:value={selectedTheme} options={presetThemes} filled/>
    </div>
</div>
<br/>
<!-- <div class="themePanel">
    <div class="flex flex-col" style='
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
            <div class="flex flex-row themeRow items-center">
                <div class="title">{data.title}</div>
                <div class="mx-auto"></div>
                <div class="picker justify-start">
                <ColorPicker 
                    label="{$globalEditorPreferencesStore.editorTheme[data.key]}" 
                    hex="{$globalEditorPreferencesStore.editorTheme[data.key]}" 
                    on:input={(event) => setColor(data.key, event)}
                /></div>
            </div>
            {/if}
            
        {/each}
    </div>
</div> -->


<style>
    /* .themePanel{
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
    } */

</style>