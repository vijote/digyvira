import { writable } from 'svelte/store';
import { MemberType } from '../entities/enums';

/** @typedef Member
     * @property {number} x
     * @property {number} y
     * @property {HTMLElement | null} element
     * @property {string} type
     */

/** @type {import("svelte/store").Writable<Member[]>} */
export const memberList = writable([]);

export function addMember() {
    memberList.update(currentList => [...currentList, {
        x: 0,
        y: 0,
        element: null,
        type: MemberType.Female
    }])
}

export const moveMemberByElement = (/** @type {{x: number, y: number, element: HTMLElement }} */ { x, y, element }) => {
    memberList.update(currentList => {
        const memberIndex = currentList.findIndex(member => member.element === element);
        currentList[memberIndex] = { ...currentList[memberIndex], x, y };
        return currentList;
    });
}

export const updateType = (/** @type {HTMLElement} */ element, /** @type {string} */ newType) => {
    memberList.update(currentList => {
        const memberIndex = currentList.findIndex(member => member.element === element);
        currentList[memberIndex] = { ...currentList[memberIndex], type: newType };
        return currentList;
    });
}