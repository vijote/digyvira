import { writable } from 'svelte/store';

/**
 * @typedef Line
 * @property {number} x1
 * @property {number} x2
 * @property {number} y1
 * @property {number} y2
 * @property {string} type
 * @property {SVGRectElement | null} element
 */

/** @type {import("svelte/store").Writable<Line[]>} */
export const lineList = writable([]);

export function addNewLine(/** @type {Line} */ newLine) {
    lineList.update(currentList => [...currentList, newLine]);
}

export const moveLineByElement =
    (/** @type {{x: number, y: number, element: SVGRectElement }} */ { x, y, element }) => {
        lineList.update((currentList) => {
            const lineIndex = currentList.findIndex(line => line.element === element);
            const currentLine = currentList[lineIndex]
            const width = currentLine.x2 - currentLine.x1;
            const height = currentLine.y2 - currentLine.y1;
            currentList[lineIndex] = {
                ...currentList[lineIndex],
                x1: x,
                y1: y,
                x2: x + width,
                y2: y + height
            };
            return currentList;
        });
    };

export const moveHorizontalLineByHandler = (/** @type {{x: number, y: number, element: SVGRectElement, handler: string }} */ { x, y, element, handler }) => {
    lineList.update((currentList) => {
        const lineIndex = currentList.findIndex(line => line.element === element);
        const dataToUpdate = {};

        if(handler === 'left') {
            dataToUpdate.x1 = x;
        } else if(handler === 'right') {
            dataToUpdate.x2 = x;
        }
        
        const currentLine = currentList[lineIndex];
        
        currentList[lineIndex] = {
            ...currentLine,
            ...dataToUpdate
        };
        return currentList;
    });
};

export const moveVerticalLineByHandler = (/** @type {{x: number, y: number, element: SVGRectElement, handler: string }} */ { x, y, element, handler }) => {
    lineList.update((currentList) => {
        const lineIndex = currentList.findIndex(line => line.element === element);
        const dataToUpdate = {};

        if(handler === 'left') {
            dataToUpdate.y1 = y;
        } else if(handler === 'right') {
            dataToUpdate.y2 = y;
        }
        
        const currentLine = currentList[lineIndex];
        
        currentList[lineIndex] = {
            ...currentLine,
            ...dataToUpdate
        };
        return currentList;
    });
};