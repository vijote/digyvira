/**
 * @typedef {`${string}-${string}-${string}-${string}-${string}`} UUID
 */

/**
 * @typedef MemberData
 * @property {string} type
 * @property {string} name
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
 * @typedef Movement
 * @property {boolean} isDragging
 * @property {number} offsetY
 * @property {number} offsetX
 * @property {UUID} id
 * @property {string} itemType
 * @property {string} handlerSelected
 */