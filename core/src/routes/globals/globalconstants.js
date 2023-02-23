
/**
 * Types of panel display styles. This is used for menu panels.
 * @global
 */
export const PanelDisplayStyles = Object.freeze({
    /**
    * Shows panel when mouse is over related button. e.g. Like nav dropdown menu
    */
    HOVER: "panelDisplayStyleHover",
    /**
     * Shows panel when related button is clicked. Panel is located at "left" side of editor.
     */
    FIXEDLEFT: "panelDisplayStyleFixedLeft",
    /**
     * Shows panel when related button is clicked. Panel is located at "right" side of editor.
     */
    FIXEDRIGHT: "panelDisplayStyleFixedRight",
    /**
     * Shows panel when related button is clicked. Panel floats on top of editor.
     */
    FLOAT: "panelDisplayStyleFloat"
});


/**
 * Positions of Menu (NavBar)
 * @global
 */
export const MenuLocations = Object.freeze({
    /**
    * Menu bar is located on top of the editor.
    */
    TOP: "menuLocationTop",
    /**
     * Menu bar is located on left side of the editor.
     */
    LEFT: "menuLocationLeft",
    /**
     * Menu bar is located on right side of the editor.
     */
    RIGHT: "menuLocationRight",
    /**
     * Menu bar is located on bottom of the editor.
     */
    BOTTOM: "menuLocationBottom"
});


/**
 * Editor screen sizes
 * @global
 */
export const ScreenSize = Object.freeze({
    /**
    * Desktop size screen.
    */
    DESKTOP: "screenDesktop",
    /**
     * Tablet size screen.
     */
    TABLET: "screenTablet",
    /**
     * Mobile size screen.
     */
    MOBILE: "screenMobile",
});


/**
 * Editor screen sizes as pixels.
 * @global
 */
export const ScreenSizePx = Object.freeze({
    /**
    * Desktop size screen.
    */
    DESKTOP: "1320px", //1140px
    /**
     * Tablet size screen.
     */
    TABLET: "720px",
    /**
     * Mobile size screen.
     */
    MOBILE: "360px",
    /**
     * Full width screen.
     */
    FULLWIDTH: "100%",
});


/**
 * Editor screen sizes as pixels.
 * @global
 */
export const EditorViews = Object.freeze({
    /**
    * Shows web page visual editor
    */
    PAGE: "page", 
    /**
     * Shows web page code editor
     */
    CODE: "code",
    /**
     * Shows variables used in app.
     */
    DEBUG: "debug",
});


/**
 * Manually created panel definitions. Add any newly added panel to this list.
 *
 * This list is used on "Customize Editor" to programmatically add "Set Panel Location" property.
 *
 * @global
 */
export const PanelDefinitions = [
    {"name":"Customize Panel",  "style": "customizePanelDisplayStyle"   },
    {"name":"Widgets Panel",    "style": "widgetPanelDisplayStyle"      },
    {"name":"Options Panel",    "style": "optionPanelDisplayStyle"      },
    {"name":"Layers Panel",    "style": "layerPanelDisplayStyle"      },
];
