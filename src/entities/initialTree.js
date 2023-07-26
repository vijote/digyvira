import createMember from "./Member";
import { FEMALE_NAME, ItemType, MALE_NAME, MemberType } from "./enums";

/**
 * @returns {[UUID, import("./Line").Line]}
 */
function createLine(/** @type {LineData} */ newLine) {
    const id = crypto.randomUUID();

    return [
        id,
        {
            id,
            itemType: ItemType.Line,
            data: {
                type: newLine.type, 
                x1: newLine.x1 * 20,
                x2: newLine.x2 * 20,
                y1: newLine.y1 * 20,
                y2: newLine.y2 * 20
            }
        }
    ]
}

/**
 * @typedef {object} ParentProps
 * @property {number} x
 * @property {number} y
 * @property {number} horizontalPadding
 * @property {number} verticalPadding
 */

function addPair(/** @type {ParentProps} */ {horizontalPadding, verticalPadding, x, y}) {
    return [
        createMember({ x, y, type: MemberType.Male, name: MALE_NAME }),
        createMember({ x: x + horizontalPadding, y, type: MemberType.Female, name: FEMALE_NAME }),
        createLine({ type: ItemType.VerticalLine, x1: x + 1, y1: y + 2, x2: x + 1, y2: y + verticalPadding }),
        createLine({ type: ItemType.VerticalLine, x1: x + horizontalPadding + 1, y1: y + 2, x2: x, y2: y + verticalPadding  }),
        createLine({ type: ItemType.HorizontalLine, x1: x + 1, y1: y + verticalPadding, x2: x + horizontalPadding + 1, y2: y + verticalPadding }),
    ]
}

function addGreatGrandParents(/** @type {number} */ x, /** @type {number} */ y) {
    return addPair({ horizontalPadding: 7, verticalPadding: 5, x, y});
}

function addGrandParents(/** @type {number} */ x, /** @type {number} */ y) {
    return addPair({ horizontalPadding: 15, verticalPadding: 5, x, y});
}

function addParents(/** @type {number} */ x, /** @type {number} */ y) {
    return addPair({ horizontalPadding: 30, verticalPadding: 5, x, y});
}

/** @type {Map<UUID, import("./Item").default>} */
export default new Map([
    ...addGreatGrandParents(2, 4),
    ...addGreatGrandParents(17, 4),
    ...addGreatGrandParents(32, 4),
    ...addGreatGrandParents(47, 4),
    ...addGrandParents(5, 12),
    ...addGrandParents(35, 12),
    ...addParents(13, 20),
    createMember({ x: 28, y: 28, type: MemberType.Female, name: FEMALE_NAME }),
    createLine({ type: ItemType.VerticalLine, x1: 6, y1: 9, x2: 11, y2: 12 }),
    createLine({ type: ItemType.VerticalLine, x1: 21, y1: 9, x2: 21, y2: 12 }),
    createLine({ type: ItemType.VerticalLine, x1: 36, y1: 9, x2: 31, y2: 12 }),
    createLine({ type: ItemType.VerticalLine, x1: 51, y1: 9, x2: 41, y2: 12 }),
    createLine({ type: ItemType.VerticalLine, x1: 14, y1: 17, x2: 16, y2: 20 }),
    createLine({ type: ItemType.VerticalLine, x1: 44, y1: 17, x2: 36, y2: 20 }),
    createLine({ type: ItemType.VerticalLine, x1: 29, y1: 25, x2: 26, y2: 28 }),
]);