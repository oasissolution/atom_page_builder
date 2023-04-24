
<script>
    import { onMount, onDestroy } from 'svelte';
    import jQuery from "jquery";
    import { globalVisibilityStore, globalThemeStore } from "../../globals/globalstores.js";


    /**
     * @type HTMLElement
     */
    let container;

    /**
     * @type HTMLElement
     */
    let titleBar;

    let holdingState = false;

    let mouseDownData = {};

    let reSet = false;

    function titleBarMouseDown(e){
        if(reSet == false){
            holdingState = true;
            mouseDownData.pageX0 = e.pageX;
            mouseDownData.pageY0 = e.pageY;
            mouseDownData.containerLeft = jQuery(container).offset()?.left ?? 0;
            mouseDownData.containerRight = jQuery(container).offset()?.top ?? 0;
            reSet = true;
        }
    }
    function titleBarMouseUp(e){
        holdingState = false;
        mouseDownData = {};
        reSet = false;

        // console.log("\nmouseUP Data: "+JSON.stringify(mouseDownData)
        // +"\nholdingState: "+holdingState.toString()+" | isMouseInElement: "+isMouseInElement(e,titleBar).toString()
        // +"\ne.pageX: " + e.pageX.toString() + " , e.pageY: " + e.pageY.toString());
    }

    function titleBarMouseMove(e){
        if(isMouseInElement(e,titleBar) == false){
            holdingState = false;
            mouseDownData = {};
            reSet = false;
        }

        if(holdingState == true){
            var left = mouseDownData.containerLeft + (e.pageX - mouseDownData.pageX0);
            var top = mouseDownData.containerRight + (e.pageY - mouseDownData.pageY0);
            jQuery(container).offset({top: top, left: left});
        }
        // console.log("\nmouseDownData: "+JSON.stringify(mouseDownData)
        // +"\nholdingState: "+holdingState.toString()+" | isMouseInElement: "+isMouseInElement(e,titleBar).toString()
        // +"\ne.pageX: " + e.pageX.toString() + " , e.pageY: " + e.pageY.toString());
    }

    function isMouseInElement(event, element) {
        let rect = element.getBoundingClientRect();
        let { clientX: x, clientY: y } = event;
        if (x < rect.left || x >= rect.right) return false;
        if (y < rect.top || y >= rect.bottom) return false;
        return true;
    }


    onMount(() => {

        titleBar.addEventListener("mousedown", titleBarMouseDown);
        titleBar.addEventListener("mouseup", titleBarMouseUp);
        titleBar.addEventListener("mousemove", titleBarMouseMove);

    });

    onDestroy(()=>{
        titleBar.removeEventListener("mousedown", titleBarMouseDown);
        titleBar.removeEventListener("mouseup", titleBarMouseUp);
        titleBar.removeEventListener("mousemove", titleBarMouseMove);
    });


</script>


<div class="floatingDialog" bind:this={container} style='
--fixedPanelBackgroundColor:{$globalThemeStore.panel.backgroundColor};
--fixedPanelForegroundColor:{$globalThemeStore.panel.foregroundColor};
--fixedPanelTitleColor:{$globalThemeStore.panel.titleColor};
--fixedPanelTabsDivider: {$globalThemeStore.panel.tabsDivider};
--backgroundColor: {$globalThemeStore.widgetIcon.backgroundColor};
--foregroundColor: {$globalThemeStore.widgetIcon.foregroundColor};
--borderColor: {$globalThemeStore.widgetIcon.borderColor};
--iconColor: {$globalThemeStore.widgetIcon.iconColor};
--textColor: {$globalThemeStore.widgetIcon.textColor};
' >

    <div class="dialogTitle" bind:this={titleBar}></div>

    <slot class="dialogBody">
        <span class="emptyBody d-flex align-items-center justify-content-center">Empty for now!</span>
    </slot>

</div>


<style>

.floatingDialog {
    position:absolute;
    z-index: 99999;
    width: 320px;
    /* height: 60vh; */
    background-color: var(--fixedPanelBackgroundColor);

    min-height: max-content;

    left: 100px;
    top: 50px;

    border-radius: 16px;

    box-shadow: 0px 0px 8px 0px var(--fixedPanelBackgroundColor);

    margin: auto;
    padding-bottom: 20px;

}

.dialogTitle {
    position: relative;
    background-color: var(--fixedPanelTabsDivider);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding-top: 5px;
    padding-left: 5px;
    padding-bottom: 5px;
    height: 24px;
}

.dialogBody{
   position: relative;
   color: var(--fixedPanelForegroundColor);
   padding: 14px;
}

.emptyBody{
   color: var(--fixedPanelForegroundColor);
   width: 100%;
   height: 100%;
}

.closeIcon{
   color: var(--fixedPanelForegroundColor);
   font-size: large;
}

</style>