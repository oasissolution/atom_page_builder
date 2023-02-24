<script>
    import "../../../app.css";
	import { onMount } from "svelte";

    /**
     * uuid of element
     * @type string
     */
    export let uuid;

    /**
     * Required data to fill attr of html elements
     * @property accesskey
     * @property class
     * @property contenteditable
     * @property dir
     * @property draggable
     * @property hidden
     * @property id
     * @property lang
     * @property spellcheck
     * @property style
     * @property tabindex
     * @property title
     * @type JSON
     */
    export let data;

    /**
     * List of attributes
     * @type [
     *  "accesskey", "class", "contenteditable", "dir", "draggable", "hidden", "id", "lang", "spellcheck", "style", "tabindex", "title"
     * ]
     */
    export const elAttr = ["accesskey", "class", "contenteditable", "dir", "draggable", "hidden", "id", "lang", "spellcheck", "style", "tabindex", "title"];


    /*
    Attribute	    Description

    accesskey	    Specifies a shortcut key to activate the element
    class	        Specifies one or more class names for the element (used to reference the element in CSS)
    contenteditable	Specifies whether the content of the element can be edited by the user
    data-*	        Used to store custom data private to the page or application
    dir	            Specifies the direction of the element's text (left-to-right or right-to-left)
    draggable	    Specifies whether the element is draggable
    hidden	        Specifies that the element should be hidden
    id	            Specifies a unique id for the element (used to reference the element in JavaScript)
    lang	        Specifies the language of the element's content
    spellcheck	    Specifies whether the element should have its spelling and grammar checked
    style	        Specifies inline CSS for the element
    tabindex	    Specifies the tab order of the element
    title	        Specifies extra information about the element (displayed as a tooltip)

    */


    /**
     * @type HTMLElement
     */
    let bindElement;

    /**
     * @type HTMLElement
     */
     let bindElementActions;


    onMount(() => {

        if(data.accesskey           !== undefined) bindElement.setAttribute("accesskey",        data.accesskey);
        if(data.contenteditable     !== undefined) bindElement.setAttribute("contenteditable",  data.contenteditable);
        if(data.draggable           !== undefined) bindElement.setAttribute("draggable",        data.draggable);
        if(data.spellcheck          !== undefined) bindElement.setAttribute("spellcheck",       data.spellcheck);
        if(data.tabindex            !== undefined) bindElement.setAttribute("tabindex",         data.tabindex);


        if(data.class   !== undefined) bindElement.setAttribute("class",    data.class + " atomDiv");
        if(data.dir     !== undefined) bindElement.setAttribute("dir",      data.dir);
        if(data.hidden  !== undefined) bindElement.setAttribute("hidden",   data.hidden);
        if(data.id      !== undefined) bindElement.setAttribute("id",       data.id);
        if(data.lang    !== undefined) bindElement.setAttribute("lang",     data.lang);
        if(data.style   !== undefined) bindElement.setAttribute("style",    data.style);
        if(data.title   !== undefined) bindElement.setAttribute("title",    data.title);



        // jQuery(bindElement)
        //     .on("mouseover", (e) => {
        //         var target = e.target;
        //         if(target.id != "atomBody"){
        //             jQuery(target).addClass("hovered");
        //             // setSelectedElement(jQuery(target).attr("class"));
        //             window.parent.postMessage(jQuery(target).attr("class"), '*');
        //         }
        //     }).on("mouseout", (e) => {
        //         var target = e.target;
        //         jQuery(target).removeClass("hovered");

        //     });

        // function selectElement(){
        //     window.parent.postMessage(uuid, '*');
        // }

        window.addEventListener("mousedown", (ev) => {
            if(ev.target){
                if(ev.target !== bindElement && ev.target !== bindElementActions && ev.target.classList.contains("atomDivCtl") === false){
                    elementSelected = false;
                }
            }
            
        });
        
    });


    let elementSelected = false;

    function selectElement(){
        window.parent.postMessage(uuid, '*');
        elementSelected = true;
        
        const rect = bindElement.getBoundingClientRect();
        var _class = "";
        _class += "atomDivEditor"; //bindElementActions.getAttribute("class");
        _class += " w-["+rect.width+"px]";
        _class += " h-["+rect.height+"px]";
        _class += " top-["+rect.top+"px]";
        _class += " left-["+rect.left+"px]";

        console.log("rect : "+ JSON.stringify(rect.toJSON));
        console.log("class : "+ _class);

        // bindElementActions.setAttribute("class", _class);

        
    }

    function deSelectElement(){
        window.parent.postMessage(uuid, '*');
        elementSelected = false;
    }

    function editButtonPress(){
        alert("Button clicked!");
    }

</script>

<input type="hidden" class="atomDiv" />

<div bind:this={bindElement} data-uuid="{uuid}" class:atomDivSelected={elementSelected} on:mousedown|self={selectElement}>
    <slot>
    <div class="w-full h-full place-content-center text-slate-300">This is a blank div!</div>
    </slot>
</div>

<div bind:this={bindElementActions} class="atomDivEditor" class:invisible={!elementSelected}>

    <div class="bg-white rounded-md absolute top-2 right-2 w-16 h-7 p-0 m-0 atomDivCtl">
        <button class="bg-transparent border-none w-6 h-6 p-0 m-0 text-black atomDivCtl" on:click='{editButtonPress}'><i class="bi bi-pen w-5 h-5 text-black"></i></button>
    </div>

</div>

<style>

    .atomDiv{
        border: none;
    }

    /* .atomDiv:hover {
        border: 2px solid aqua;
    } */

    .atomDivSelected{
        border: 2px dotted aqua;
    }

    .atomDivEditor{
        position: absolute;
        z-index: 100;
        border: 2px dotted aqua;
    }


</style>