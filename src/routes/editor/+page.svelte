<script>
    import { onMount, onDestroy } from "svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalVisibilityStore,
        globalRightPanelContentStore, globalLeftPanelContentStore  } from "../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSizePx } from "../globals/globalconstants.js";
    import jQuery from "jquery";

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

    /**
     * Width of screen
     */
    let outerWidth = 0;

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

        var editorWidth = Math.min(parseInt(width.replace("px","")), parseInt(editorPanelWidth.toString().replace("px","")));


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
            var value = Math.max(xxl, editorWidth);
                bsWidthXxl = value+"px";
                bsWidthXl = value+"px";
                bsWidthLg = value+"px";
                bsWidthMd = value+"px";
                bsWidthSm = value+"px";
                bsWidthContainer = value+"px";
        }else{

            if(editorWidth > 1400){
                // var newWidth = Math.round(editorWidth / xxl);
                // var value = Math.min(xxl, newWidth % 2 == 0 ? newWidth : newWidth + 1 ); //Resolution must be even.
                var value = Math.max(xxl, editorWidth);
                bsWidthXxl = value+"px";
                bsWidthXl = value+"px";
                bsWidthLg = value+"px";
                bsWidthMd = value+"px";
                bsWidthSm = value+"px";
                bsWidthContainer = value+"px";
            }else if( editorWidth <= 1400 && editorWidth > 1200){
                // var newWidth = Math.round(editorWidth / xl);
                // var value = Math.min(xl, newWidth % 2 == 0 ? newWidth : newWidth + 1 ); //Resolution must be even.
                var value = Math.max(xl, editorWidth);
                bsWidthXxl = "100%";
                bsWidthXl = value+"px";
                bsWidthLg = value+"px";
                bsWidthMd = value+"px";
                bsWidthSm = value+"px";
                bsWidthContainer = value+"px";
            }else if( editorWidth <= 1200 && editorWidth > 992){
                // var newWidth = Math.round(editorWidth / lg);
                // var value = Math.min(lg, newWidth % 2 == 0 ? newWidth : newWidth + 1 ); //Resolution must be even.
                var value = Math.max(lg, editorWidth);
                bsWidthXxl = "100%";
                bsWidthXl = "100%";
                bsWidthLg = value+"px";
                bsWidthMd = value+"px";
                bsWidthSm = value+"px";
                bsWidthContainer = value+"px";
            }else if( editorWidth <= 992 && editorWidth > 768){
                // var newWidth = Math.round(editorWidth / md);
                // var value = Math.min(md, newWidth % 2 == 0 ? newWidth : newWidth + 1 ); //Resolution must be even.
                var value = Math.max(md, editorWidth);
                bsWidthXxl = "100%";
                bsWidthXl = "100%";
                bsWidthLg = "100%";
                bsWidthMd = value+"px";
                bsWidthSm = value+"px";
                bsWidthContainer = value+"px";
            }else if( editorWidth <= 768 && editorWidth > 576){
                // var newWidth = Math.round(editorWidth / sm);
                // var value = Math.min(sm, newWidth % 2 == 0 ? newWidth : newWidth + 1 ); //Resolution must be even.
                // console.log("editorWidth <= 768 && editorWidth > 576 ||=> newWidth: "+newWidth.toString()+" | sm: "+sm.toString());
                console.log("editorWidth <= 768 && editorWidth > 576 ||=> editorWidth: "+editorWidth.toString()+" | sm: "+sm.toString());
                var value = Math.max(sm, editorWidth);
                bsWidthXxl = "100%";
                bsWidthXl = "100%";
                bsWidthLg = "100%";
                bsWidthMd = "100%";
                bsWidthSm = value+"px";
                bsWidthContainer = value+"px";
            }else if( editorWidth <= 576){
                console.log("editorWidth <= 576 ||=> editorWidth: "+editorWidth.toString()+" | sm: "+sm.toString());
                var value = editorWidth;
                bsWidthXxl = value+"px";
                bsWidthXl = value+"px";
                bsWidthLg = value+"px";
                bsWidthMd = value+"px";
                bsWidthSm = value+"px";
                bsWidthContainer = value+"px";
                // bsWidthXxl = "100%";
                // bsWidthXl = "100%";
                // bsWidthLg = "100%";
                // bsWidthMd = "100%";
                // bsWidthSm = "100%";
                // bsWidthContainer = "100%";
            }

        }

                //////////////////////////////////////////////////////////////////////////////////////
                //////// TODO: CONTAINER OLCULERI TAMAM AMA YINEDE HER BIR COL ICIN ORAN HESAPLAMAM LAZIM. BOOTSTRAP BAŞTAN BAŞLANACAK
                //////////////////////////////////////////////////////////////////////////////////////

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

    });


</script>

<svelte:window bind:outerWidth={outerWidth}/>


<div id="editorInnerPanel" bind:clientWidth={editorPanelWidth} bind:clientHeight={editorPanelHeight} class="clearfix" style='
    --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};
    --bsWidthSm:{bsWidthSm};
    --bsWidthMd:{bsWidthMd};
    --bsWidthLg:{bsWidthLg};
    --bsWidthXl:{bsWidthXl};
    --bsWidthXxl:{bsWidthXxl};
    --bsWidthContainer:{bsWidthContainer};

'
>
    <input type="hidden" class="hovered col" />


    <div class="container-fluid d-inline">
        <h1>Hello this is editor page</h1>
        <button class="btn btn-info">Test Button</button>
    </div>

    <div class="my-3">
        --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};
        --bsWidthSm:{bsWidthSm};
        --bsWidthMd:{bsWidthMd};
        --bsWidthLg:{bsWidthLg};
        --bsWidthXl:{bsWidthXl};
        --bsWidthXxl:{bsWidthXxl};
        --bsWidthContainer:{bsWidthContainer};
        --testPanelWidth:{testPanelWidth};
    </div>

    <div class="container row">
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12" bind:clientWidth={testPanelWidth} id="cntrtest">
            <h4>Global Editor Preferences</h4>
            <pre>{JSON.stringify($globalEditorPreferencesStore, null, 2)}</pre>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <h4>Global Visibility</h4>
            <pre>{JSON.stringify($globalVisibilityStore, null, 2)}</pre>
            <h4>Global Right Panel Content Store</h4>
            <pre>{JSON.stringify($globalRightPanelContentStore, null, 2)}</pre>
            <h4>Global Left Panel Content Store</h4>
            <pre>{JSON.stringify($globalLeftPanelContentStore, null, 2)}</pre>
        </div>
    </div>


    <div class="container-fluid">
    <br/><br/>
    After globalComponentCollection...

    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>



</div>


</div> <!-- editorInnerPanel -->



<style>

    /* @import "editorcss.css"; */

    #editorInnerPanel{
        width: var(--editorWidth) !important;
        vertical-align: top;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        /* background-color: aliceblue; */

        /* display: flex;
        flex-direction: column;
        flex-wrap: wrap; */
    }

    /* .hovered{
        border: 2px solid aqua;
    } */

    .container{
    max-width: var(--bsWidthContainer) !important;
    }
    .container-sm{
        max-width: var(--bsWidthSm) !important;
    }
    .container-md{
        max-width: var(--bsWidthMd) !important;
    }
    .container-lg{
        max-width: var(--bsWidthLg) !important;
    }
    .container-xl{
        max-width: var(--bsWidthXl) !important;
    }
    .container-xxl{
        max-width: var(--bsWidthXxl) !important;
    }

  .col-sm {
    flex: 1 0 0%;
  }
  .row-cols-sm-auto > * {
    flex: 0 0 auto;
    width: auto;
  }
  .row-cols-sm-1 > * {
    flex: 0 0 auto;
    width: 100%;
  }
  .row-cols-sm-2 > * {
    flex: 0 0 auto;
    width: 50%;
  }
  .row-cols-sm-3 > * {
    flex: 0 0 auto;
    width: 33.3333333333%;
  }
  .row-cols-sm-4 > * {
    flex: 0 0 auto;
    width: 25%;
  }
  .row-cols-sm-5 > * {
    flex: 0 0 auto;
    width: 20%;
  }
  .row-cols-sm-6 > * {
    flex: 0 0 auto;
    width: 16.6666666667%;
  }
  .col-sm-auto {
    flex: 0 0 auto;
    width: auto;
  }
  .col-sm-1 {
    flex: 0 0 auto;
    width: 8.33333333%;
  }
  .col-sm-2 {
    flex: 0 0 auto;
    width: 16.66666667%;
  }
  .col-sm-3 {
    flex: 0 0 auto;
    width: 25%;
  }
  .col-sm-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .col-sm-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }
  .col-sm-6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col-sm-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }
  .col-sm-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }
  .col-sm-9 {
    flex: 0 0 auto;
    width: 75%;
  }
  .col-sm-10 {
    flex: 0 0 auto;
    width: 83.33333333%;
  }
  .col-sm-11 {
    flex: 0 0 auto;
    width: 91.66666667%;
  }
  .col-sm-12 {
    flex: 0 0 auto;
    width: 100%;
  }


    /* sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px */





</style>