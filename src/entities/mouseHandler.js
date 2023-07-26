/**
 * @typedef {object} MouseEventProps
 * @prop {Function} onClick
 */

export default function handleMouseEvents(/** @type {MouseEventProps} */ props) {
    let initialMouseX = 0;
    let initialMouseY = 0;

    function handleMouseDown(/** @type {MouseEvent} */ event) {
        initialMouseX = event.clientX;
        initialMouseY = event.clientY;
    }

    function handleClick(/** @type {MouseEvent} */ event) {
        event.stopPropagation();

        const mouseDifference = (initialMouseX == event.clientX) || (initialMouseY == event.clientY);

        if (!mouseDifference) return;

        props.onClick();
    };

    return { handleClick, handleMouseDown }
}