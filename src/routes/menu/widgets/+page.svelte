<script>

    import { PanelDisplayStyles } from "../../globals/globalconstants.js";
    import Hover from "./hover.svelte";
    import Floating from "./floating.svelte";
    import Widgets from "./widgets.svelte";
	import Fixed from "./fixed.svelte";

    /**
    * Holds panels visual style, passed from user customize settings.
    *
    * @type String
    */
    export let panelStyle = PanelDisplayStyles.HOVER;

    let widgets = Widgets;

</script>


{#if panelStyle == PanelDisplayStyles.HOVER}
    <Hover>
        {widgets}
    </Hover>
{/if}


{#if panelStyle == PanelDisplayStyles.FLOAT}
    <Floating>
        {widgets}
    </Floating>
{/if}


{#if panelStyle == PanelDisplayStyles.FIXEDLEFT}
    <Fixed>
        {widgets}
    </Fixed>
{/if}


{#if panelStyle == PanelDisplayStyles.FIXEDRIGHT}
    <Fixed>
        {widgets}
    </Fixed>
{/if}

