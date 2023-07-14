import { writable } from 'svelte/store';

/**
 * @typedef Line
 * @property {number} x1
 * @property {number} x2
 * @property {number} y1
 * @property {number} y2
 * @property {SVGRectElement | null} element
 */

/** @type {import("svelte/store").Writable<Line[]>} */
export const lineList = writable([]);

export function addNewLine(/** @type {Line} */ newLine) {
    lineList.update(currentList => [...currentList, newLine]);
}

export const moveLine =
    (/** @type {number} */ positionIndex) =>
        (/** @type {{x1: number, x2: number, y1: number, y2: number }} */ { x1, x2, y1, y2 }) => {
            lineList.update((currentList) => {
                currentList[positionIndex] = { x1, x2, y1, y2, element: currentList[positionIndex].element };
                return currentList;
            });
        };

export const moveLineByElement =
    (/** @type {{x: number, y: number, element: SVGRectElement }} */ { x, y, element }) => {
        lineList.update((currentList) => {
            const lineIndex = currentList.findIndex(line => line.element === element);
            const currentLine = currentList[lineIndex]
            const width = currentLine.x2 - currentLine.x1;
            const height = currentLine.y2 - currentLine.y1;
            currentList[lineIndex] = {
                x1: x,
                y1: y,
                element: currentList[lineIndex].element,
                x2: x + width,
                y2: y + height
            };
            return currentList;
        });
    };

export const moveLineByHandler = (/** @type {{x: number, y: number, element: SVGRectElement, handler: string }} */ { x, y, element, handler }) => {
    lineList.update((currentList) => {
        const lineIndex = currentList.findIndex(line => line.element === element);
        const dataToUpdate = {};

        if(handler === 'left') {
            dataToUpdate.x1 = x;
            dataToUpdate.y1 = y;
        } else if(handler === 'right') {
            dataToUpdate.x2 = x;
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