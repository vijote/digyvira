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

/** @type {Map<`${string}-${string}-${string}-${string}-${string}`, StoredItem>} */
export default new Map([
    createMember({ x: 7, y: 7, type: MemberType.Male }),
    createLine({ type: ItemType.VerticalLine, x1: 8, y1: 9, x2: 8, y2: 12 })
]);