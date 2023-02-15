<script>
    import { globalEditorPreferencesStore, globalVisibilityStore } from "../../../globals/globalstores.js";
    import ColorPicker from 'svelte-awesome-color-picker';

    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

/*
"backgroundFrameColor": "#474e6818",
        "backgroundColor": "#404258",
        "editorBackgroundColor": "#ffffff",
        "foregroundColor": "#aaaebe",
        "buttonActiveBackgroundColor": "#262733",
        "buttonPassiveBackgroundColor": "transparent",
        "buttonActiveForegroundColor": "#aaaebe",
        "buttonPassiveForegroundColor": "#aaaebe",
        "fixedPanelForegroundColor": "#aaaebe",
        "fixedPanelBackgroundColor": "#262733",
        "fixedPanelButtonActiveBackgroundColor": "#404258",
        "fixedPanelButtonPassiveBackgroundColor": "transparent",
        "fixedPanelButtonActiveForegroundColor": "#aaaebe",
        "fixedPanelButtonPassiveForegroundColor": "#aaaebe",
*/

    let themeData = [
        {"title": "Menu Background Color", "key": "backgroundColor"},
        {"title": "Menu Foreground Color", "key": "foregroundColor"},
        {"title": "Editor Background Color", "key": "backgroundFrameColor"},
        {"title": "Menu Button Active Background Color", "key": "buttonActiveBackgroundColor"},
        {"title": "Menu Button Passive Background Color", "key": "buttonPassiveBackgroundColor"},
        {"title": "Menu Button Active Foreground Color", "key": "buttonActiveForegroundColor"},
        {"title": "Menu Button Passive Foreground Color", "key": "buttonPassiveForegroundColor"},
        {"title": "Fixed Panel Foreground Color", "key": "fixedPanelForegroundColor"},
        {"title": "Fixed Panel Background Color", "key": "fixedPanelBackgroundColor"},
        {"title": "Fixed Panel Button Active Background Color", "key": "fixedPanelButtonActiveBackgroundColor"},
        {"title": "Fixed Panel Button Passive Background Color", "key": "fixedPanelButtonPassiveBackgroundColor"},
        {"title": "Fixed Panel Button Active Foreground Color", "key": "fixedPanelButtonActiveForegroundColor"},
        {"title": "Fixed Panel Button Passive Foreground Color", "key": "fixedPanelButtonPassiveForegroundColor"},
    ];

    let hexa;

    function setColor(key, value){
        var {hsv, rgb, hex, color} = value.detail;
        // console.log("setColor : ("+key+","+hex+")");
        globalEditorPreferences.editorTheme[key] = hex;
    }

</script>
 <!-- on:input={(hex) => setColor(data.key, hex)}  -->
 <!-- hex="{$globalEditorPreferencesStore.editorTheme[data.key]}"  -->
<div class="hstack">
    Preset Themes
</div>
<br/>
<div class="vstack">
    {#each themeData as data}
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
    {/each}
</div>

<style>
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
</style>