import { writable } from 'svelte/store';
import { EMPTY_ID } from '../entities/enums';

/**
 * @type {import('svelte/store').Writable<Movement>}
 */
export const movement = writable({
    isDragging: false,
    offsetY: 0,
    offsetX: 0,
    id: EMPTY_ID,
    itemType: EMPTY_ID,
    handlerSelected: EMPTY_ID
});

export function setMovement( /** @type {(currMovement: Movement) => Movement} */ callback) {
    movement.update(callback);
}

export function resetMovement() {
    setMovement(() => ({
        isDragging: false,
        offsetY: 0,
        offsetX: 0,
        id: EMPTY_ID,
        itemType: EMPTY_ID,
        handlerSelected: EMPTY_ID
    }));
}