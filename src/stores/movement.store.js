import { writable } from 'svelte/store';
import { EMPTY_ID } from '../entities/enums';

/**
 * @typedef Movement
 * @property {boolean} isDragging
 * @property {number} offsetY
 * @property {number} offsetX
 * @property {`${string}-${string}-${string}-${string}-${string}`} id
 * @property {string | null} itemType
 * @property {string} handlerSelected
 */

/**
 * @type {import('svelte/store').Writable<Movement>}
 */
export const movement = writable({
    isDragging: false,
    offsetY: 0,
    offsetX: 0,
    id: EMPTY_ID,
    itemType: null,
    handlerSelected: EMPTY_ID
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
        id: EMPTY_ID,
        itemType: null,
        handlerSelected: EMPTY_ID
    }));
}