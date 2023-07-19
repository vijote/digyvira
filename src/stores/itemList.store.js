import { writable } from 'svelte/store';
import { ItemType } from '../entities/enums';

/** @typedef Member
     * @property {number} x
     * @property {number} y
     * @property {HTMLElement | null} element
     * @property {string} type
     */

/** @type {import("svelte/store").Writable<Map<string, import('../entities/initialTree').StoredItem>>} */
export const itemTree = writable(new Map([]));

export function initializeTree(/** @type {Map<string, import('../entities/initialTree').StoredItem>} */ newTree) {
    itemTree.update(() => newTree)
}

function addItem(/** @type {import('../entities/initialTree').NewItem} */ newItem) {
    const id = crypto.randomUUID();
    itemTree.update(currentList => {
        currentList.set(id, {...newItem, id});
        return currentList;
    });
}

export function addMember(/** @type {import('../entities/initialTree').NewMember} */ newMember) {
    addItem({
        itemType: ItemType.Member,
        data: newMember
    });
}

export function addLine(/** @type {import('../entities/initialTree').NewLine} */ newLine) {
    addItem({
        itemType: ItemType.Line,
        data: newLine
    });
}

export function moveMemberById(/** @type {{x: number, y: number, id: `${string}-${string}-${string}-${string}-${string}` }} */ movement) {
    itemTree.update(currentTree => {
        /** @type {import('../entities/initialTree').StoredMember} */
        // @ts-ignore
        const member = currentTree.get(movement.id);
        currentTree.set(movement.id, { ...member, data: {...member.data, x: movement.x, y: movement.y } });
        return currentTree;
    });
}

export const changeMemberType = (/** @type {`${string}-${string}-${string}-${string}-${string}`} */ id, /** @type {string} */ newType) => {
    itemTree.update(currentTree => {
        /** @type {import('../entities/initialTree').StoredMember} */
        // @ts-ignore
        const member = currentTree.get(id);

        currentTree.set(id, {...member, data: {...member.data, type: newType}})
        return currentTree;
    });
}

export const moveLineById =
(/** @type {{x: number, y: number, id: `${string}-${string}-${string}-${string}-${string}` }} */ { x, y, id }) => {
    itemTree.update((currentTree) => {
        /** @type {import('../entities/initialTree').StoredLine} */
        // @ts-ignore
        const line = currentTree.get(id);

        const width = line.data.x2 - line.data.x1;
        const height = line.data.y2 - line.data.y1;
        
        currentTree.set(id, {
            ...line,
            data: {
                ...line.data,
                x1: x,
                y1: y,
                x2: x + width,
                y2: y + height
            }
        });

        return currentTree;
    });
};

export const moveHorizontalLineByHandler = (/** @type {{x: number, y: number, id: `${string}-${string}-${string}-${string}-${string}`, handler: string }} */ { x, id, handler }) => {
    itemTree.update((currentTree) => {
        /** @type {import('../entities/initialTree').StoredLine} */
        // @ts-ignore
        const line = currentTree.get(id);

        const dataToUpdate = {};

        if(handler === 'left') {
            dataToUpdate.x1 = x;
        } else if(handler === 'right') {
            dataToUpdate.x2 = x;
        }

        currentTree.set(id, {
            ...line,
            data: {
                ...line.data,
                ...dataToUpdate
            }
        });

        return currentTree;
    });
};

export const moveVerticalLineByHandler = (/** @type {{x: number, y: number, id: `${string}-${string}-${string}-${string}-${string}`, handler: string }} */ { y, id, handler }) => {
    itemTree.update((currentTree) => {
        /** @type {import('../entities/initialTree').StoredLine} */
        // @ts-ignore
        const line = currentTree.get(id);

        const dataToUpdate = {};

        if(handler === 'left') {
            dataToUpdate.y1 = y;
        } else if(handler === 'right') {
            dataToUpdate.y2 = y;
        }

        currentTree.set(id, {
            ...line,
            data: {
                ...line.data,
                ...dataToUpdate
            }
        });

        return currentTree;
    });
};