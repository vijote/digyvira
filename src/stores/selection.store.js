import { writable } from 'svelte/store';

/**
 * @typedef Selection
 * @property {HTMLElement | SVGRectElement | null} element
 * @property {string} type
 */

/** @type {import("svelte/store").Writable<Selection>} */
export const selection = writable({ element: null, type: 'unset' });

export function selectItem(/** @type {Selection} */ newSelection) {
    selection.update(() => newSelection);
}

export function resetSelection() {
    selection.update(() => ({ element: null, type: 'unset' }));
}