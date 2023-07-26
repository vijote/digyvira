import { writable } from 'svelte/store';

/** @type {import("svelte/store").Writable<Map<UUID, import("../entities/Item").default>>} */
export const tree = writable(new Map([]));

export function initializeTree(/** @type {Map<UUID, import("../entities/Item").default>} */ newTree) {
    tree.update(() => newTree)
}

export function addItem(/** @type {[UUID, import("../entities/Item").default]} */ [id, item]) {
    tree.update(currentList => {
        currentList.set(id, item);
        return currentList;
    });
}

export function moveMemberById(/** @type {{x: number, y: number, id: UUID }} */ movement) {
    tree.update(currentTree => {
        const member = currentTree.get(movement.id);

        if(!member) throw new Error("Ocurrió un error al mover el miembro");

        currentTree.set(movement.id, { ...member, data: {...member.data, x: movement.x, y: movement.y } });

        return currentTree;
    });
}

export const changeMemberType = (/** @type {`${string}-${string}-${string}-${string}-${string}`} */ id, /** @type {string} */ newType) => {
    tree.update(currentTree => {
        const member = currentTree.get(id);

        if(!member) throw new Error("Ocurrió un error al seleccionar el miembro");

        currentTree.set(id, {...member, data: {...member.data, type: newType}});

        return currentTree;
    });
}

export const moveLineById =
(/** @type {{x: number, y: number, id: UUID }} */ { x, y, id }) => {
    tree.update((currentTree) => {
        const item = currentTree.get(id);

        if(!item) throw new Error("Ocurrió un error al seleccionar la linea");

        const line = /** @type {import('../entities/Line').Line} */ (item); 

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

export const moveHorizontalLineByHandler = (/** @type {{x: number, y: number, id: UUID, handler: string }} */ { x, id, handler }) => {
    tree.update((currentTree) => {
        const line = currentTree.get(id);

        if(!line) throw new Error("Ocurrió un error al seleccionar la linea");

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

export const moveVerticalLineByHandler = (/** @type {{x: number, y: number, id: UUID, handler: string }} */ { y, id, handler }) => {
    tree.update((currentTree) => {
        const line = currentTree.get(id);

        if(!line) throw new Error("Ocurrió un error al seleccionar la linea");

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