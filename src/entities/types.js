/**
 * @typedef {`${string}-${string}-${string}-${string}-${string}`} UUID
 */

/**
 * @typedef SelectedItem
 * @property {UUID} id
 * @property {string} type
 */

/**
 * @typedef MemberData
 * @property {string} type
 * @property {number} x
 * @property {number} y
 * @property {string | undefined} fullName
 * @property {string | undefined} birthYear
 * @property {string | undefined} birthMonth
 * @property {string | undefined} birthDay
 * @property {string | undefined} deathDay
 * @property {string | undefined} deathMonth
 * @property {string | undefined} deathYear
 * @property {string | undefined} profession
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