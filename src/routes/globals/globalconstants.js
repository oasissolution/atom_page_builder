
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
     * Menu bar is located on right side of the editor.
     */
    TABLET: "screenTablet",
    /**
     * Mobile size screen.
     */
    MOBILE: "screenMobile",
});