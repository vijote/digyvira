import { writable } from 'svelte/store';
import { EMPTY_ID } from '../entities/enums';

/** @type {import("svelte/store").Writable<SelectedItem>} */
export const selection = writable({ id: EMPTY_ID, type: 'unset' });

export function selectItem(/** @type {SelectedItem} */ newSelection) {
    selection.update(() => newSelection);
}

export function resetSelection() {
    selection.update(() => ({ id: EMPTY_ID, type: 'unset' }));
}