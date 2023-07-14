import { writable } from 'svelte/store';

/**
 * @typedef Movement
 * @property {boolean} isDragging
 * @property {number} offsetY
 * @property {number} offsetX
 * @property {HTMLElement | SVGRectElement | null} element
 * @property {string | null} itemType
 * @property {string | false} handlerSelected
 */

/**
 * @type {import('svelte/store').Writable<Movement>}
 */
export const movement = writable({
    isDragging: false,
    offsetY: 0,
    offsetX: 0,
    element: null,
    itemType: null,
    handlerSelected: false
});

export function setMovement( /** @type {(currMovement: Movement) => Movement} */ callback) {
    movement.update(callback);
}

export function setIsDragging(/** @type {boolean} */ newValue) {
    setMovement(currentValue => ({ ...currentValue, isDragging: newValue }));
}

export function setOffset(/** @type {{offsetY: number, offsetX: number}} */ { offsetX, offsetY }) {
    setMovement(currentValue => ({ ...currentValue, offsetX, offsetY }));
}

export function setElement(/** @type {HTMLElement | SVGRectElement | null} */ element) {
    setMovement(currentValue => ({ ...currentValue, element }));
}

export function resetMovement() {
    setMovement(() => ({
        isDragging: false,
        offsetY: 0,
        offsetX: 0,
        element: null,
        itemType: null,
        handlerSelected: false
    }));
}