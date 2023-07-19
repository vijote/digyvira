import { writable } from 'svelte/store';
import { EMPTY_ID } from '../entities/enums';

/**
 * @typedef Selection
 * @property {`${string}-${string}-${string}-${string}-${string}`} id
 * @property {string} type
 */

/** @type {import("svelte/store").Writable<Selection>} */
export const selection = writable({ id: EMPTY_ID, type: 'unset' });

export function selectItem(/** @type {Selection} */ newSelection) {
    selection.update(() => newSelection);
}

export function resetSelection() {
    selection.update(() => ({ id: EMPTY_ID, type: 'unset' }));
}