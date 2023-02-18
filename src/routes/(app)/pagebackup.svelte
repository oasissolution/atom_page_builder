<script>
    import { onMount, onDestroy } from "svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalVisibilityStore,
        globalRightPanelContentStore, globalLeftPanelContentStore, globalEditorViewStore  } from "../../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSizePx, EditorViews } from "../../globals/globalconstants.js";
    import jQuery from "jquery";
	import Page from "./views/page.svelte";
    import Code from "./views/code.svelte";
    import Variables from "./views/variables.svelte";

    let globalComponentCollection = $globalComponentCollectionStore ?? [{}] ;
    $: globalComponentCollectionStore.set(globalComponentCollection);

    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    /// update bootstrap breakpoints each time editor width is changed
    $: updateBootstrapBreakPoints($globalEditorPreferencesStore.editorData.editorWidth);



    let bsWidthSm = "100%";
    let bsWidthMd = "100%";
    let bsWidthLg = "100%";
    let bsWidthXl = "100%";
    let bsWidthXxl = "100%";
    let bsWidthContainer = "100%";

    let bsRatioSm = 1;
    let bsRatioMd = 1;
    let bsRatioLg = 1;
    let bsRatioXl = 1;
    let bsRatioXxl = 1;
  

    /**
     * Width of screen
     */
    let outerWidth = 0;
    let cssEditorWidth = 1320;
    let editorPanelWidth = 0;
    let editorPanelHeight = 0;

    let testPanelWidth = 0;

    /**
     * Updates bootstrap breakpoints; which is specifically derived from original for Editor, located at "editorcss.css" imported below.
     *
     * This is crucial since we make our editor supports bootstrap natively
     * @param {string} width Width of Editor
     */
    function updateBootstrapBreakPoints(width){

        // cssEditorWidth = Math.min(parseInt(width.replace("px","")), parseInt(editorPanelWidth.toString().replace("px",""))).toString()+"px";
        cssEditorWidth = parseInt(width.replace("px",""));

        var xxl = 1320;
        var xl = 1140;
        var lg = 960;
        var md = 720;
        var sm = 540;

        if(width == ScreenSizePx.DESKTOP && $globalEditorPreferencesStore.editorData.fullWidth == true){
            // bsWidthXxl = "100%";
            // bsWidthXl = "100%";
            // bsWidthLg = "100%";
            // bsWidthMd = "100%";
            // bsWidthSm = "100%";
            // bsWidthContainer = "100%";
            // var value = Math.max(xxl, editorWidth);
            //     bsWidthXxl = value+"px";
            //     bsWidthXl = value+"px";
            //     bsWidthLg = value+"px";
            //     bsWidthMd = value+"px";
            //     bsWidthSm = value+"px";
            //     bsWidthContainer = value+"px";

            bsRatioSm = 1;
            bsRatioMd = 1;
            bsRatioLg = 1;
            bsRatioXl = 1;
            bsRatioXxl = 1;
         
        }else{

          
            bsRatioSm = editorPanelWidth / sm;
            bsRatioMd = editorPanelWidth / md;
            bsRatioLg = editorPanelWidth / lg;
            bsRatioXl = editorPanelWidth / xl;
            bsRatioXxl = editorPanelWidth / xxl;
           

          

            // if(editorWidth > 1400){
            //     // var newWidth = Math.round(editorWidth / xxl);
            //     // var value = Math.min(xxl, newWidth % 2 == 0 ? newWidth : newWidth + 1 ); //Resolution must be even.

            //     bsRatioSm = 1;
            //     bsRatioMd = 1;
            //     bsRatioLg = 1;
            //     bsRatioXl = 1;
            //     bsRatioXxl = 1;
            //     bsRatioContainer = 1;


            //     var value = Math.max(xxl, editorWidth);
            //     bsWidthXxl = value+"px";
            //     bsWidthXl = value+"px";
            //     bsWidthLg = value+"px";
            //     bsWidthMd = value+"px";
            //     bsWidthSm = value+"px";
            //     bsWidthContainer = value+"px";
            // }else if( editorWidth <= 1400 && editorWidth > 1200){
            //     // var newWidth = Math.round(editorWidth / xl);
            //     // var value = Math.min(xl, newWidth % 2 == 0 ? newWidth : newWidth + 1 ); //Resolution must be even.


            //     bsRatioSm = 1;
            //     bsRatioMd = 1;
            //     bsRatioLg = 1;
            //     bsRatioXl = 1;
            //     bsRatioXxl = 1;
            //     bsRatioContainer = 1;


            //     var value = Math.max(xl, editorWidth);
            //     bsWidthXxl = "100%";
            //     bsWidthXl = value+"px";
            //     bsWidthLg = value+"px";
            //     bsWidthMd = value+"px";
            //     bsWidthSm = value+"px";
            //     bsWidthContainer = value+"px";
            // }else if( editorWidth <= 1200 && editorWidth > 992){
            //     // var newWidth = Math.round(editorWidth / lg);
            //     // var value = Math.min(lg, newWidth % 2 == 0 ? newWidth : newWidth + 1 ); //Resolution must be even.
            //     var value = Math.max(lg, editorWidth);
            //     bsWidthXxl = "100%";
            //     bsWidthXl = "100%";
            //     bsWidthLg = value+"px";
            //     bsWidthMd = value+"px";
            //     bsWidthSm = value+"px";
            //     bsWidthContainer = value+"px";
            // }else if( editorWidth <= 992 && editorWidth > 768){
            //     // var newWidth = Math.round(editorWidth / md);
            //     // var value = Math.min(md, newWidth % 2 == 0 ? newWidth : newWidth + 1 ); //Resolution must be even.
            //     var value = Math.max(md, editorWidth);
            //     bsWidthXxl = "100%";
            //     bsWidthXl = "100%";
            //     bsWidthLg = "100%";
            //     bsWidthMd = value+"px";
            //     bsWidthSm = value+"px";
            //     bsWidthContainer = value+"px";
            // }else if( editorWidth <= 768 && editorWidth > 576){
            //     // var newWidth = Math.round(editorWidth / sm);
            //     // var value = Math.min(sm, newWidth % 2 == 0 ? newWidth : newWidth + 1 ); //Resolution must be even.
            //     // console.log("editorWidth <= 768 && editorWidth > 576 ||=> newWidth: "+newWidth.toString()+" | sm: "+sm.toString());
            //     console.log("editorWidth <= 768 && editorWidth > 576 ||=> editorWidth: "+editorWidth.toString()+" | sm: "+sm.toString());
            //     var value = Math.max(sm, editorWidth);
            //     bsWidthXxl = "100%";
            //     bsWidthXl = "100%";
            //     bsWidthLg = "100%";
            //     bsWidthMd = "100%";
            //     bsWidthSm = value+"px";
            //     bsWidthContainer = value+"px";
            // }else if( editorWidth <= 576){
            //     console.log("editorWidth <= 576 ||=> editorWidth: "+editorWidth.toString()+" | sm: "+sm.toString());
            //     var value = editorWidth;
            //     bsWidthXxl = value+"px";
            //     bsWidthXl = value+"px";
            //     bsWidthLg = value+"px";
            //     bsWidthMd = value+"px";
            //     bsWidthSm = value+"px";
            //     bsWidthContainer = value+"px";
            //     // bsWidthXxl = "100%";
            //     // bsWidthXl = "100%";
            //     // bsWidthLg = "100%";
            //     // bsWidthMd = "100%";
            //     // bsWidthSm = "100%";
            //     // bsWidthContainer = "100%";
            // }




            


        }



    }



    /**
     * Sets selected element in editor.
     * @param {string | undefined} uuid Unique identity string used in "globalComponentCollectionStore"
     */
    function setSelectedElement(uuid){
        globalEditorPreferences.info = uuid;

    }

    onMount(() => {

        jQuery("#editorInnerPanel > *")
        .on("mouseover", (e) => {
            var target = e.target;
            jQuery(target).addClass("hovered");
            setSelectedElement(jQuery(target).attr("class"));

        }).on("mouseout", (e) => {
            var target = e.target;
            jQuery(target).removeClass("hovered");
        });

        // var list = jQuery("div").hasClass("col-sm-12");

        // jQuery(".col-sm-12").map(function(){
        //     jQuery(this).attr("width", editorPanelWidth);
        // });

        var els = document.getElementsByClassName("col-sm-12");

        Array.prototype.forEach.call(els, function(el) {
            el.setAttribute("width", editorPanelWidth);
        });

    });


</script>

<svelte:window bind:outerWidth={outerWidth}/>



<div id="editorInnerPanel" bind:clientWidth={editorPanelWidth} bind:clientHeight={editorPanelHeight} class="clearfix" style='
    --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};
    --editorMouseOverColor:{$globalEditorPreferencesStore.editorTheme.editorMouseOverColor};
    --bsWidthSm:{bsWidthSm};
    --bsWidthMd:{bsWidthMd};
    --bsWidthLg:{bsWidthLg};
    --bsWidthXl:{bsWidthXl};
    --bsWidthXxl:{bsWidthXxl};
    --bsWidthContainer:{bsWidthContainer};
    --bsRatioSm:{bsRatioSm};
    --bsRatioMd:{bsRatioMd};
    --bsRatioLg:{bsRatioLg};
    --bsRatioXl:{bsRatioXl};
    --bsRatioXxl:{bsRatioXxl};
    --cssEditorWidth:{cssEditorWidth};
    --editorPanelWidth:{editorPanelWidth};

'
>
    <input type="hidden" class="hovered col" />

    {#if $globalEditorViewStore == EditorViews.PAGE}
    <svelte:component this={Page}/>
    {:else if $globalEditorViewStore == EditorViews.CODE }
    <svelte:component this={Code}/>
    {:else}
    <svelte:component this={Variables}/>
    {/if}


</div> <!-- editorInnerPanel -->



<style>

    /* @import "editorcss.css"; */

    #editorInnerPanel{
        width: var(--editorWidth) !important;
        height: 100vh;
        vertical-align: top;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        /* background-color: aliceblue; */

        /* display: flex;
        flex-direction: column;
        flex-wrap: wrap; */
    }

    /* calc(var(--editorPanelWidth)* 25 / 100); */

    .hovered{
        border: 2px solid var(--editorMouseOverColor);
    }

    /* .hovered{
        border: 2px solid aqua;
    } */

    


    /* sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px */





</style>