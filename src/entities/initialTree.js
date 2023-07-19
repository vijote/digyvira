import { ItemType, MemberType } from "./enums";

/**
 * @typedef NewMember
 * @property {number} x
 * @property {number} y
 * @property {string} type
 */

/**
 * @typedef NewLine
 * @property {number} x1
 * @property {number} x2
 * @property {number} y1
 * @property {number} y2
 * @property {string} type
 */

/**
 * @typedef MemberData
 * @property {string} type
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef LineData
 * @property {number} x1
 * @property {number} x2
 * @property {number} y1
 * @property {number} y2
 * @property {string} type
 */

/**
 * @typedef NewItem
 * @property {string} itemType
 * @property {object} data
 */

/**
 * @typedef {NewItem & { id: `${string}-${string}-${string}-${string}-${string}` }} StoredItem
 */

/**
 * @typedef {StoredItem & { data: MemberData }} StoredMember
 */

/**
 * @typedef {StoredItem & { data: LineData }} StoredLine
 */


/**
 * @returns {[`${string}-${string}-${string}-${string}-${string}`, StoredLine]}
 */
function createLine(/** @type {NewLine} */ newLine) {
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
 * @returns {[`${string}-${string}-${string}-${string}-${string}`, StoredMember]}
 */
function createMember(/** @type {NewMember} */ newMember) {
    const id = crypto.randomUUID();

    return [
        id,
        {
            id,
            itemType: ItemType.Member,
            data: {
                type: newMember.type,
                x: newMember.x * 20,
                y: newMember.y * 20
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
        createMember({ x, y, type: MemberType.Male }),
        createMember({ x: x + horizontalPadding, y, type: MemberType.Female }),
        createLine({ type: ItemType.VerticalLine, x1: x + 1, y1: y + 2, x2: x + 1, y2: y + verticalPadding }),
        createLine({ type: ItemType.VerticalLine, x1: x + horizontalPadding + 1, y1: y + 2, x2: x, y2: y + verticalPadding  }),
        createLine({ type: ItemType.HorizontalLine, x1: x + 1, y1: y + verticalPadding, x2: x + horizontalPadding + 1, y2: y + verticalPadding }),
    ]
}

function addGreatGrandParents(/** @type {number} */ x, /** @type {number} */ y) {
    return addPair({ horizontalPadding: 6, verticalPadding: 4, x, y});
}

function addGrandParents(/** @type {number} */ x, /** @type {number} */ y) {
    return addPair({ horizontalPadding: 10, verticalPadding: 5, x, y});
}

function addParents(/** @type {number} */ x, /** @type {number} */ y) {
    return addPair({ horizontalPadding: 20, verticalPadding: 6, x, y});
}

/** @type {Map<`${string}-${string}-${string}-${string}-${string}`, StoredItem>} */
// @ts-ignore
export default new Map([
    ...addGreatGrandParents(7, 4),
    ...addGreatGrandParents(17, 4),
    ...addGreatGrandParents(27, 4),
    ...addGreatGrandParents(37, 4),
    ...addGrandParents(10, 11),
    ...addGrandParents(30, 11),
    ...addParents(15, 20),
    createMember({ x: 25, y: 30, type: MemberType.Male }),
    createLine({ type: ItemType.VerticalLine, x1: 11, y1: 8, x2: 11, y2: 11 }),
    createLine({ type: ItemType.VerticalLine, x1: 21, y1: 8, x2: 21, y2: 11 }),
    createLine({ type: ItemType.VerticalLine, x1: 31, y1: 8, x2: 31, y2: 11 }),
    createLine({ type: ItemType.VerticalLine, x1: 41, y1: 8, x2: 41, y2: 11 }),
    createLine({ type: ItemType.VerticalLine, x1: 16, y1: 16, x2: 16, y2: 20 }),
    createLine({ type: ItemType.VerticalLine, x1: 36, y1: 16, x2: 36, y2: 20 }),
    createLine({ type: ItemType.VerticalLine, x1: 26, y1: 26, x2: 26, y2: 30 }),
]);