<script>
    import { onDestroy, onMount } from 'svelte';
    import jQuery from "jquery";
    import { globalVisibilityStore, globalThemeStore } from "../../globals/globalstores.js";
 
    /**
     * @type HTMLElement
     */
    let container;
 
    /**
     * @type boolean
     */
    export let horizontal = false;
 
    /**
     * @type HTMLButtonElement
     */
    export let buttonOfContainer;
 
    function updateLocationOfDialog(){
 
       var containerLeft = jQuery(container).offset()?.left ?? 0;
       var containerTop = jQuery(container).offset()?.top ?? 0;
       var containerWidth = jQuery(container).width() ?? 0;
       var containerHeight = jQuery(container).height() ?? 0;
 
       var buttonOfContainerLeft = jQuery(buttonOfContainer).offset()?.left ?? 0;
       var buttonOfContainerTop = jQuery(buttonOfContainer).offset()?.top ?? 0;
       var buttonOfContainerWidth = jQuery(buttonOfContainer).width() ?? 0;
       var buttonOfContainerHeight = jQuery(buttonOfContainer).height() ?? 0;
 
       var left = 0;
       var top = 0;
 
       if(horizontal==true){
 
          if(buttonOfContainerTop < 100){ //Menu is located at TOP
             top = buttonOfContainerTop + buttonOfContainerHeight + 12;
          }else{ //Menu is located at BOTTOM
             top = buttonOfContainerTop - buttonOfContainerHeight - containerHeight - 20;
          }
 
          if(buttonOfContainerLeft < containerWidth){ // aligned left 
             left = buttonOfContainerLeft;
          }else{
             left = buttonOfContainerLeft + buttonOfContainerWidth - containerWidth;
          }
 
       }else{
 
          if(buttonOfContainerTop < containerHeight){ 
             top = buttonOfContainerTop;
          }else{ 
             top = buttonOfContainerTop - buttonOfContainerHeight - containerHeight - 20;
          }
 
          if(buttonOfContainerLeft < containerWidth){ // aligned left 
             left = buttonOfContainerLeft + buttonOfContainerWidth + 20;
          }else{
             left = buttonOfContainerLeft - containerWidth - 20;
          }
 
       }
 
       if(buttonOfContainer == undefined){
          console.log("buttonOfContainer == undefined");
       }
 
       // console.log(
       //    "\nbuttonOfContainerLeft : "+buttonOfContainerLeft+
       //    "\nbuttonOfContainerTop : "+buttonOfContainerTop+
       //    "\nbuttonOfContainerWidth : "+buttonOfContainerWidth+
       //    "\nbuttonOfContainerHeight : "+buttonOfContainerHeight+
       //    "\n\n"+
       //    "\ncontainerLeft : "+containerLeft+
       //    "\ncontainerTop : "+containerTop+
       //    "\ncontainerWidth : "+containerWidth+
       //    "\n\n"+
       //    "left : " + left + " - top" + top+
       //    "buttonData : " + JSON.stringify(buttonData)
       //    );
 
       jQuery(container).offset({top: top, left: left});
 
    }
 
    onMount(()=>{
 
       updateLocationOfDialog();
 
       container.addEventListener("mouseleave", togglePanel)
 
    });
 
    onDestroy(()=>{
       container.removeEventListener("mouseleave", togglePanel)
    });
 
    import { createEventDispatcher } from 'svelte';
 
    const dispatch = createEventDispatcher();
 
    function togglePanel() {
       dispatch('togglePanel');
    }
 
 </script>
 
 
 <div class="hoverDialog" bind:this={container} style='
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
 
    <slot class="hoverBody ">
        <span class="emptyBody d-flex align-items-center justify-content-center">Empty for now!</span>
    </slot>
 
 </div>
 
 
 <style>
 
    .hoverDialog {
       position:absolute;
       z-index: 99999;
       width: 320px;
       height: 60vh;
       background-color: var(--fixedPanelBackgroundColor);
    
       left: 100px;
       top: 54px;
    
       border-radius: 16px;
    
       box-shadow: 0px 0px 8px 0px var(--fixedPanelBackgroundColor);
    
       margin: auto;
       padding-bottom: 20px;
       padding-top: 20px;
       scroll-behavior: smooth;
       overflow: scroll;
       scroll-margin-bottom: 20px;
       scroll-margin-top: 20px;
 
    
    }
    
    .hoverBody{
       position: relative;
       color: var(--fixedPanelForegroundColor);
       padding: 14px;
    }
    
    .emptyBody{
       color: var(--fixedPanelForegroundColor);
       width: 100%;
       height: 100%;
    }
 
 
 </style>
 
 