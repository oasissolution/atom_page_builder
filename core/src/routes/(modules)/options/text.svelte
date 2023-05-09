<script>
    import { onMount } from "svelte";
    import { fade, fly, slide } from 'svelte/transition';
    import { globalSelectedElementUuidStore } from "../../globals/selectorstores.js";
    import { globalEditorPreferencesStore, globalComponentCollectionStore, globalThemeStore } from "../../globals/globalstores.js";
    import { updateGlobalComponentCollectionStore, UpdateActionTypes, getDataFromComponent, getComponent } from "../../globals/globalfunctions.js";
	import Optionsbutton from "../../uicomponents/optionsbutton.svelte";
	import Textarea from "../../uicomponents/textarea.svelte";
	import Textinput from "../../uicomponents/textinput.svelte";
	import Select from "../../uicomponents/select.svelte";
	import LayoutDisplay from "./common/layout-display.svelte";
	import ContentFontSize from "./text/content-font-size.svelte";
	import ContentTextAlignment from "./text/content-text-alignment.svelte";
	import ContentVerticalAlignment from "./common/content-vertical-alignment.svelte";
	import LayoutPosition from "./common/layout-position.svelte";
	import LayoutFloat from "./common/layout-float.svelte";
	import LayoutOverflow from "./common/layout-overflow.svelte";
	import LayoutVisibility from "./common/layout-visibility.svelte";
	import LayoutZIndex from "./common/layout-z-index.svelte";
	import SpacingPadding from "./common/spacing-padding.svelte";
	import SpacingMargin from "./common/spacing-margin.svelte";
	import SizingWidthHeight from "./common/sizing-width-height.svelte";
	import SizingWidthHeightMax from "./common/sizing-width-height-max.svelte";
	import SizingWidthHeightMin from "./common/sizing-width-height-min.svelte";
	import TypographyFontSmoothing from "./text/typography-font-smoothing.svelte";
	import TypographyFontStyle from "./text/typography-font-style.svelte";
	import TypographyFontWeight from "./text/typography-font-weight.svelte";
	import TypographyFontVariantNumeric from "./text/typography-font-variant-numeric.svelte";
	import TypographyLetterSpacing from "./text/typography-letter-spacing.svelte";
	import TypographyLineHeight from "./text/typography-line-height.svelte";
	import SelectColor from "../../uicomponents/select-color.svelte";
	import TypographyTextColor from "./text/typography-text-color.svelte";
	import TypographyTextDecoration from "./text/typography-text-decoration.svelte";
	import TypographyDecorationColor from "./text/typography-decoration-color.svelte";
	import TypographyDecorationStyle from "./text/typography-decoration-style.svelte";
	import TypographyDecorationThickness from "./text/typography-decoration-thickness.svelte";
	import TypographyUnderlineOffset from "./text/typography-underline-offset.svelte";
	import TypographyTextTransform from "./text/typography-text-transform.svelte";
	import TypographyTextOverflow from "./text/typography-text-overflow.svelte";
	import TypographyTextIndent from "./text/typography-text-indent.svelte";
	import TypographyWhitespace from "./text/typography-whitespace.svelte";
	import TypographyWordbreak from "./text/typography-wordbreak.svelte";
    import BorderWidth from "./common/border-width.svelte";
	import BorderRadius from "./common/border-radius.svelte";
	import BorderStyle from "./common/border-style.svelte";
	import BorderColor from "./common/border-color.svelte";
    import EffectsDropShadow from "./common/effects-drop-shadow.svelte";
	import EffectsShadowColor from "./common/effects-shadow-color.svelte";
	import EffectsOpacity from "./common/effects-opacity.svelte";
	import EffectsMixBlendMode from "./common/effects-mix-blend-mode.svelte";
	import EffectsBackgroundBlendMode from "./common/effects-background-blend-mode.svelte";
    import FiltersBlur from "./common/filters-blur.svelte";
	import FiltersBrightness from "./common/filters-brightness.svelte";
	import FiltersContrast from "./common/filters-contrast.svelte";
	import FiltersDropShadow from "./common/filters-drop-shadow.svelte";
	import FiltersGrayscale from "./common/filters-grayscale.svelte";
	import FiltersNoFilter from "./common/filters-no-filter.svelte";
	import FiltersHueRotate from "./common/filters-hue-rotate.svelte";
	import FiltersInvert from "./common/filters-invert.svelte";
	import FiltersSaturate from "./common/filters-saturate.svelte";
	import FiltersSepia from "./common/filters-sepia.svelte";
	import FiltersBackdropBlur from "./common/filters-backdrop-blur.svelte";
	import FiltersBackdropBrightness from "./common/filters-backdrop-brightness.svelte";
	import FiltersBackdropContrast from "./common/filters-backdrop-contrast.svelte";
	import FiltersBackdropGrayscale from "./common/filters-backdrop-grayscale.svelte";
	import FiltersBackdropHueRotate from "./common/filters-backdrop-hue-rotate.svelte";
	import FiltersBackdropInvert from "./common/filters-backdrop-invert.svelte";
	import FiltersBackdropOpacity from "./common/filters-backdrop-opacity.svelte";
	import FiltersBackdropSaturate from "./common/filters-backdrop-saturate.svelte";
    import FiltersBackdropSepia from "./common/filters-backdrop-sepia.svelte";
    import TransitionProperty from "./common/transition-property.svelte";
	import TransitionDuration from "./common/transition-duration.svelte";
    import TransitionTimingFunction from "./common/transition-timing-function.svelte";
	import TransitionDelay from "./common/transition-delay.svelte";
	import TransitionAnimation from "./common/transition-animation.svelte";
    import TransformNoTransform from "./common/transform-no-transform.svelte";
	import TransformScale from "./common/transform-scale.svelte";
	import TransformRotate from "./common/transform-rotate.svelte";
	import TransformTranslate from "./common/transform-translate.svelte";
	import TransformSkewX from "./common/transform-skew-x.svelte";
	import TransformSkewY from "./common/transform-skew-y.svelte";
	import TransformOrigin from "./common/transform-origin.svelte";
    import BackgroundAttachment from "./common/background-attachment.svelte";
	import BackgroundClip from "./common/background-clip.svelte";
	import BackgroundOrigin from "./common/background-origin.svelte";
	import BackgroundPosition from "./common/background-position.svelte";
	import BackgroundRepeat from "./common/background-repeat.svelte";
	import BackgroundSize from "./common/background-size.svelte";
	import BackgroundBackground from "./common/background-background.svelte";


    let globalComponentCollection = $globalComponentCollectionStore;
    $: globalComponentCollectionStore.set(globalComponentCollection);

    /**
     * Required data to fill attributes of HTML elements
     * @typedef {Object} AttrData
     * @property {string} [accesskey] - Specifies a shortcut key to activate the element
     * @property {string} [class] - Specifies one or more class names for the element (used to reference the element in CSS)
     * @property {string} [contenteditable] - Specifies whether the content of the element can be edited by the user
     * @property {string} [dir] - Specifies the direction of the element's text (left-to-right or right-to-left)
     * @property {string} [draggable] - Specifies whether the element is draggable
     * @property {boolean} [hidden] - Specifies that the element should be hidden
     * @property {string} [id] - Specifies a unique id for the element (used to reference the element in JavaScript)
     * @property {string} [lang] - Specifies the language of the element's content
     * @property {boolean} [spellcheck] - Specifies whether the element should have its spelling and grammar checked
     * @property {string} [style] - Specifies inline CSS for the element
     * @property {number} [tabindex] - Specifies the tab order of the element
     * @property {string} [title] - Specifies extra information about the element (displayed as a tooltip)
     * @property {string} [text] - Value of Text Element
     * @property {string} [htmltag] - HTML Tag of Text Element
     */

    /**
     * Data of Atom Element
     * @typedef {Object} ElementData
     * @property {string} [uuid] - Unique id of element.
     * @property {string} [type] - Type of element
     * @property {boolean} [selected] - Specifies whether the element is selected.
     * @property {AttrData} [data] - Element specific data.
     * @property {Array<JSON>} [children] - Child elements.
     */

    /**
     * All data of element
     * @type {ElementData | null}
     */
    let activeElement;


    /**
     * Used for sub elements to update themselves to current values.
     * @type string
    */
    let elementDataLoaded="";

    /**
     * Loads element data from JSON 
     */
    function loadElementData(){
        activeElement = getComponent($globalComponentCollectionStore, $globalSelectedElementUuidStore);

        textInput = activeElement?.data?.text != undefined ? activeElement?.data?.text : "Lorem ipsum...";
        classInput = activeElement?.data?.class != undefined ? activeElement?.data?.class : "";
        htmlTag = activeElement?.data?.htmltag != undefined ? activeElement?.data?.htmltag : "span";

        elementDataLoaded = classInput;

    }

    /**
     * Call this function when selection changes. This is to fix; when switching between two text elements if one has not set a variable then recent
     * variable active is set to that element. If we clear variables and set to default, it will be upto loadElementData function.
     *
     * These are all default values of variables.
     */
    function clearOptionPanelVariables(){
        fontSize = "";
        textAlignment = 0;
        verticalAlignment = "";
        textInput = "Lorem ipsum...";
        classInput = "";
        layoutDisplay = "";
        layoutPosition = "";
        layoutFloat = 0;
        layoutOverflow = "";
        layoutVisibility = "";
        layoutZIndex = "";
        spacingPadding = "";
        spacingMargin = "";
        fontSmoothing = "";
        fontStyle = "";
        fontWeight = "";
        fontVariantNumeric = "";
        letterSpacing = "";
        lineHeight = "";
        textColor = "";
        textDecoration = "";
        decorationColor = "";
        decorationStyle = "";
        decorationThickness = "";
        underlineOffset = "";
        textTransform = "";
        textOverflow = "";
        textIndent = "";
        whitespace = "";
        wordbreak = "";
        borderStyle = "";
        effectsDropShadow = "";
        effectsOpacity = "";
        effectsMixBlendMode = "";
        effectsBackgroundBlendMode = "";
        filtersBlur = "";
        filtersBrightness = "";
        filtersContrast = "";
        filtersDropShadow = "";
        filtersGrayScale = "";
        filtersNoFilter = "";
        filtersHueRotate = "";
        filtersInvert = "";
        filtersSaturate = "";
        filtersSepia = "";
        filtersBackdropBlur = "";
        filtersBackdropBrightness = "";
        filtersBackdropContrast = "";
        filtersBackdropGrayscale = "";
        filtersBackdropHueRotate = "";
        filtersBackdropInvert = "";
        filtersBackdropOpacity = "";
        filtersBackdropSaturate = "";
        filtersBackdropSepia = "";
        transitionProperty = "";
        transitionDuration = "";
        transitionTimingFunction = "";
        transitionDelay = "";
        transitionAnimation = "";
        transformNoTransform = "";
        transformScale = "";
        transformRotate = "";
        transformTranslate = "";
        transformSkewX = "";
        transformSkewY = "";
        transformOrigin = "";
        backgroundAttachment = "";
        backgroundClip = "";
        backgroundOrigin = "";
        backgroundPosition = "";
        backgroundRepeat = "";
        backgroundSize = "";

    }


    /**
     * Update Editor Panel
     */
    function updateEditor(){
        const data = {
            "message": {
                "componentCollection": $globalComponentCollectionStore,
                "editorPreferences": $globalEditorPreferencesStore
            }
        };

        var elm = document.getElementById("editorFrame");
        if(elm != null) if(elm.contentWindow != null) elm.contentWindow.postMessage(data, '*');
    }


    /**
     * Integer variable that holds Tab Page Index.
     */
    let selectedTabPageIndex = 0;

    /**
     * Text Input Value
     * @type string
     */
    let textInput;

    /**
     * Class Value of Text
     * @type string
     */
    let classInput;

    /**
     * Holds state of page load.
     * @type boolean
     */
    let loaded = false;

    /**
     * Update ui whenever uuid changes (new element selected)
    */
    $: $globalSelectedElementUuidStore, (() => {
        clearOptionPanelVariables();
        if(loaded == true){
            loadElementData();
        }
    })();

    // let previousglobalComponentCollectionStore;
    /**
     * Update ui whenever component collection changes (when there is a update in editor by actions panel)
    */
    $: $globalComponentCollectionStore, (() => {
        // if(previousglobalComponentCollectionStore != $globalComponentCollectionStore){
        //     previousglobalComponentCollectionStore = $globalComponentCollectionStore;}
            clearOptionPanelVariables();
            if(loaded == true){
                loadElementData();
            }
        
    })();

    /**
     * Update ui whenever tap page changes
    */
    $: selectedTabPageIndex, (() => {
        clearOptionPanelVariables();
        if(loaded == true){
            loadElementData();
        }
    })();

    onMount(() => {

        loaded = true;

    });

    function checkText(){

        textInput = textInput.replace("<script", "").replace("<\/script>", "").replace("<link", "").replace("<a", "").replace("</a>", "");
        
    }

    function updateText(){
        if(activeElement){
            if(activeElement.data){
                if(textInput != ""){
                    checkText();
                    activeElement.data.text = textInput;
                }else{
                    textInput = "Lorem ipsum...";
                    activeElement.data.text = textInput;
                }
                updateEditor();
            }
        }
    }

    function updateClass(){
        if(activeElement){
            if(activeElement.data){
                activeElement.data.class = classInput;
                // classGlobal = classInput;
                updateEditor();
            }
        }
    }


    /**
     * Actual display class
     * @type string
     */
    let layoutDisplay;

    /**
     * Actual font size class
     * @type string
     */
    let fontSize;

    /**
     * @type number
     */
    let textAlignment;

    /**
     * Vertical Alignment of element
     * @type string
     */
    let verticalAlignment;

    /**
     * Actual position class
     * @type string
     */
    let layoutPosition;

    /**
     * @type number
     */
    let layoutFloat;

    /**
     * @type string
     */
    let layoutOverflow;

    /**
     * @type string
     */
    let layoutVisibility;

    /**
     * @type string
     */
    let layoutZIndex;

    /**
     * @type string
     */
    let spacingPadding;

    /**
     * @type string
     */
    let spacingMargin;

    /**
     * @type string
     */
    let fontSmoothing;

    /**
     * @type string
     */
    let fontStyle;

    /**
     * @type string
     */
    let fontWeight;

    /**
     * @type string
     */
    let fontVariantNumeric;

    /**
     * @type string
     */
    let letterSpacing;

    /**
     * @type string
     */
    let lineHeight;

    /**
     * @type string
     */
    let textColor;
    
    /**
     * @type string
     */
    let textDecoration;
    
    /**
     * @type string
     */
    let decorationColor;

    /**
     * @type string
     */
    let decorationStyle;

    /**
     * @type string
     */
    let decorationThickness;

    /**
     * @type string
     */
    let underlineOffset;

    /**
     * @type string
     */
    let textTransform;

    /**
     * @type string
     */
    let textOverflow;

    /**
     * @type string
     */
    let textIndent;

    /**
     * @type string
     */
    let whitespace;

    /**
     * @type string
     */
    let wordbreak;

    /**
     * @type string
     */
    let borderStyle;

    /**
     * @type string
     */
     let effectsDropShadow;

    /**
     * @type string
     */
    let effectsOpacity;

    /**
     * @type string
     */
    let effectsMixBlendMode;

    /**
     * @type string
     */
    let effectsBackgroundBlendMode;

    /**
     * @type string
     */
    let filtersBlur;

    /**
     * @type string
     */
    let filtersBrightness;

    /**
     * @type string
     */
    let filtersContrast;

    /**
     * @type string
     */
    let filtersDropShadow;

    /**
     * @type string
     */
    let filtersGrayScale;

    /**
     * @type string
     */
    let filtersNoFilter;

    /**
     * @type string
     */
    let filtersHueRotate;

    /**
     * @type string
     */
    let filtersInvert;

    /**
     * @type string
     */
    let filtersSaturate;

    /**
     * @type string
     */
    let filtersSepia;

    /**
     * @type string
     */
    let filtersBackdropBlur;

    /**
     * @type string
     */
    let filtersBackdropBrightness;

    /**
     * @type string
     */
    let filtersBackdropContrast;

    /**
     * @type string
     */
    let filtersBackdropGrayscale;

    /**
     * @type string
     */
    let filtersBackdropHueRotate;

    /**
     * @type string
     */
    let filtersBackdropInvert;

    /**
     * @type string
     */
    let filtersBackdropOpacity;

    /**
     * @type string
     */
    let filtersBackdropSaturate;

    /**
     * @type string
     */
    let filtersBackdropSepia;

    /**
     * @type string
     */
     let transitionProperty;
    
    /**
     * @type string
     */
    let transitionDuration;

    /**
     * @type string
     */
    let transitionTimingFunction;

    /**
     * @type string
     */
    let transitionDelay;

    /**
     * @type string
     */
    let transitionAnimation;

    /**
     * @type string
     */
    let transformNoTransform;

    /**
     * @type string
     */
    let transformScale;

    /**
     * @type string
     */
    let transformRotate;

    /**
     * @type string
     */
    let transformTranslate;

    /**
     * @type string
     */
    let transformSkewX;

    /**
     * @type string
     */
    let transformSkewY;

    /**
     * @type string
     */
    let transformOrigin;

    /**
     * @type string
     */
     let backgroundAttachment;

    /**
     * @type string
     */
    let backgroundClip;

    /**
     * @type string
     */
    let backgroundOrigin;

    /**
     * @type string
     */
    let backgroundPosition;

    /**
     * @type string
     */
    let backgroundRepeat;

    /**
     * @type string
     */
    let backgroundSize;



    
    /**
     * @typedef {Object} SelectOptions
     * @property {string} value
     * @property {string} name
     * @property {string} info
    */


    /**
     * Standard HTML tags that are applied to text element.
     * @type Array<SelectOptions>
     */
    const htmlTags = [
        {name: "h1 (Heading 1)",   value: "h1",          info: "Heading 1"},
        {name: "h2 (Heading 2)",   value: "h2",          info: "Heading 2"},
        {name: "h3 (Heading 3)",   value: "h3",          info: "Heading 3"},
        {name: "h4 (Heading 4)",   value: "h4",          info: "Heading 4"},
        {name: "h5 (Heading 5)",   value: "h5",          info: "Heading 5"},
        {name: "h6 (Heading 6)",   value: "h6",          info: "Heading 6"},
        {name: "div",              value: "div",         info: "div"},
        {name: "span",             value: "span",        info: "span"},
        {name: "p (Paragraph)",    value: "p",           info: "Paragraph"},
        {name: "strong (Bold)",    value: "strong",      info: "Bold"},
    ];

    /**
     * Text of element
     * @type string
     */
    let htmlTag;

    $: htmlTag, (()=>{
        if(loaded == true) {

            if(activeElement){
                if(activeElement.data){
                    activeElement.data.htmltag = htmlTag;
                    updateEditor();
                }
            }

        }
    })();



    let collapseDesignLayout = false;
    function toggleDesignLayout(){
        collapseDesignLayout = !collapseDesignLayout;
    }

    let collapseDesignClass = false;
    function toggleDesignClass(){
        collapseDesignClass = !collapseDesignClass;
    }

    let collapseDesignTypography = false;
    function toggleDesignTypography(){
        collapseDesignTypography = !collapseDesignTypography;
    }

    let collapseDesignSpacing = false;
    function toggleDesignSpacing(){
        collapseDesignSpacing = !collapseDesignSpacing;
    }

    let collapseDesignSizing = false;
    function toggleDesignSizing(){
        collapseDesignSizing = !collapseDesignSizing;
    }

    let collapseDesignBorder = false;
    function toggleDesignBorder(){
        collapseDesignBorder = !collapseDesignBorder;
    }

    let collapseDesignEffects = false;
    function toggleDesignEffects(){
        collapseDesignEffects = !collapseDesignEffects;
    }

    let collapseDesignFilters = false;
    function toggleDesignFilters(){
        collapseDesignFilters = !collapseDesignFilters;
    }

    let collapseAnimationTransition = false;
    function toggleAnimationTransition(){
        collapseAnimationTransition = !collapseAnimationTransition;
    }

    let collapseAnimationTransform = false;
    function toggleAnimationTransform(){
        collapseAnimationTransform = !collapseAnimationTransform;
    }

    let collapseBackground = false;
    function toggleBackground(){
        collapseBackground = !collapseBackground;
    }

</script>

    <div class="widgetPanelSubTitle">Text Options</div>
    <div class="h-4"></div>

    <Optionsbutton items={["Content", "Design", "Animation"]} bind:value={selectedTabPageIndex}></Optionsbutton>

    <div class="widgetPanelTabsDivider"></div>

    {#if selectedTabPageIndex==0}

    <span class="mb-1">Text</span>
    <Textarea bind:text={textInput} on:onSubmit={updateText} ></Textarea>

    <div class="widgetPanelDivider"></div>

    <ContentFontSize bind:fontSize bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

    <div class="widgetPanelDivider"></div>

    <ContentTextAlignment bind:textAlignment bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}  />

    <div class="widgetPanelDivider"></div>

    <ContentVerticalAlignment  bind:verticalAlignment bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

    <div class="widgetPanelDivider"></div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Html container of text.">Html Tag</span>
        <Select options={htmlTags} bind:value={htmlTag}/>
    </div>

    <div class="widgetPanelDivider"></div>



 

    {:else if selectedTabPageIndex==1}

    <button class="collapseButton" on:click={toggleDesignLayout}>
        <span class="collapseHeader">LAYOUT</span>
        {#if collapseDesignLayout}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignLayout}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <LayoutDisplay bind:layoutDisplay bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}/>

        <div class="widgetPanelDivider"></div>

        <LayoutPosition bind:layoutPosition bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <LayoutFloat bind:layoutFloat bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <LayoutOverflow bind:layoutOverflow bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <LayoutVisibility bind:layoutVisibility bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <LayoutZIndex bind:layoutZIndex bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

    </div> <!-- collapseDesignLayout -->
    {/if}

    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignSpacing}>
        <span class="collapseHeader">SPACING</span>
        {#if collapseDesignSpacing}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignSpacing}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <SpacingPadding bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <SpacingMargin bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <!-- <div class="widgetPanelDivider"></div> -->
    </div>
    {/if}

    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignSizing}>
        <span class="collapseHeader">SIZING</span>
        {#if collapseDesignSizing}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignSizing}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <SizingWidthHeight bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <SizingWidthHeightMax bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <SizingWidthHeightMin bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
    </div>
    {/if}

    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignTypography}>
        <span class="collapseHeader">TYPOGRAPHY</span>
        {#if collapseDesignTypography}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignTypography}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <ContentFontSize bind:fontSize bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyFontSmoothing bind:fontSmoothing bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyFontStyle bind:fontStyle bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyFontWeight bind:fontWeight bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyFontVariantNumeric bind:fontVariantNumeric bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyLetterSpacing bind:letterSpacing bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyLineHeight bind:lineHeight bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyTextColor bind:textColor bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass}/>

        <div class="widgetPanelDivider"></div>

        <TypographyTextDecoration bind:textDecoration bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyDecorationColor bind:decorationColor bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyDecorationStyle bind:decorationStyle bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyDecorationThickness bind:decorationThickness bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyUnderlineOffset bind:underlineOffset bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyTextTransform bind:textTransform bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyTextOverflow bind:textOverflow bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyTextIndent bind:textIndent bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyWhitespace bind:whitespace bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TypographyWordbreak bind:wordbreak bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <!-- <div class="widgetPanelDivider"></div> -->

        
    </div>
    {/if}

    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignBorder}>
        <span class="collapseHeader">BORDER</span>
        {#if collapseDesignBorder}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignBorder}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <BorderWidth bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <BorderRadius bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <BorderStyle bind:property={borderStyle} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <BorderColor bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

    </div>
    {/if}


    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleBackground}>
        <span class="collapseHeader">BACKGROUND</span>
        {#if collapseBackground}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseBackground}
    <div class="w-full " in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <BackgroundBackground bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <BackgroundAttachment bind:property={backgroundAttachment} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <BackgroundClip bind:property={backgroundClip} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
        
        <div class="widgetPanelDivider"></div>

        <BackgroundOrigin bind:property={backgroundOrigin} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <BackgroundPosition bind:property={backgroundPosition} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <BackgroundRepeat bind:property={backgroundRepeat} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <BackgroundSize bind:property={backgroundSize} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

    </div>
    {/if}

    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignEffects}>
        <span class="collapseHeader">EFFECTS</span>
        {#if collapseDesignEffects}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignEffects}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <EffectsDropShadow bind:property={effectsDropShadow} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <EffectsShadowColor bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <EffectsOpacity bind:property={effectsOpacity} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <EffectsMixBlendMode bind:property={effectsMixBlendMode} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <EffectsBackgroundBlendMode bind:property={effectsBackgroundBlendMode} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
    </div>
    {/if}

    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignFilters}>
        <span class="collapseHeader">FILTERS</span>
        {#if collapseDesignFilters}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignFilters}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <FiltersNoFilter bind:property={filtersNoFilter} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBlur bind:property={filtersBlur} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBrightness bind:property={filtersBrightness} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersContrast bind:property={filtersContrast} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersDropShadow bind:property={filtersDropShadow} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
    
        <div class="widgetPanelDivider"></div>
    
        <FiltersGrayscale bind:property={filtersGrayScale} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
    
        <div class="widgetPanelDivider"></div>
        
        <FiltersHueRotate bind:property={filtersHueRotate} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersInvert bind:property={filtersInvert} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
        
        <div class="widgetPanelDivider"></div>

        <FiltersSaturate bind:property={filtersSaturate} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
    
        <div class="widgetPanelDivider"></div>

        <FiltersSepia bind:property={filtersSepia} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBackdropBlur bind:property={filtersBackdropBlur} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBackdropBrightness bind:property={filtersBackdropBrightness} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBackdropContrast bind:property={filtersBackdropContrast} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBackdropGrayscale bind:property={filtersBackdropGrayscale} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBackdropHueRotate bind:property={filtersBackdropHueRotate} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBackdropInvert bind:property={filtersBackdropInvert} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBackdropOpacity bind:property={filtersBackdropOpacity} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBackdropSaturate bind:property={filtersBackdropSaturate} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <FiltersBackdropSepia bind:property={filtersBackdropSepia} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />


    </div>
    {/if}





    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleDesignClass}>
        <span class="collapseHeader">CLASS</span>
        {#if collapseDesignClass}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseDesignClass}
    <div class="w-full " in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <div class="mb-1 w-full flex items-end align-bottom place-content-between"><span class="">Class</span><span class="text-[10px]">Tailwind CSS</span></div>
        <Textarea bind:text={classInput} on:onSubmit={updateClass} readonly={true} ></Textarea>

        <!-- <pre class="text-[8px]">{JSON.stringify(activeElement, null, 2)}</pre> -->

    </div>
    {/if}

    <div class="widgetPanelDivider"></div>


    <div class="h-20"></div>




    {:else if selectedTabPageIndex==2}

    <button class="collapseButton" on:click={toggleAnimationTransition}>
        <span class="collapseHeader">TRANSITION</span>
        {#if collapseAnimationTransition}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseAnimationTransition}
    <div class="w-full " in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <TransitionProperty bind:property={transitionProperty} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TransitionDuration bind:property={transitionDuration} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TransitionTimingFunction bind:property={transitionTimingFunction} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TransitionDelay bind:property={transitionDelay} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
        
        <div class="widgetPanelDivider"></div>

        <TransitionAnimation bind:property={transitionAnimation} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

    </div>
    {/if}


    <div class="widgetPanelDivider"></div>

    <button class="collapseButton" on:click={toggleAnimationTransform}>
        <span class="collapseHeader">TRANSFORM</span>
        {#if collapseAnimationTransform}
        <i class="bi bi-dash"></i>
        {:else}
        <i class="bi bi-plus"></i>
        {/if}
    </button>

    {#if collapseAnimationTransform}
    <div class="w-full " in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <TransformNoTransform bind:property={transformNoTransform} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TransformScale bind:property={transformScale} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TransformRotate bind:property={transformRotate} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />
        
        <div class="widgetPanelDivider"></div>

        <TransformTranslate bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TransformSkewX bind:property={transformSkewX} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TransformSkewY bind:property={transformSkewY} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

        <div class="widgetPanelDivider"></div>

        <TransformOrigin bind:property={transformOrigin} bind:loaded bind:classInput elementDataLoaded={elementDataLoaded} on:updateClass={updateClass} />

    </div>
    {/if} 

    <div class="widgetPanelDivider"></div>

    <div class="h-20"></div>



    {/if}


<style>




</style>