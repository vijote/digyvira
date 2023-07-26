import { ItemType } from "./enums";
import Item from './Item';

export class Line extends Item {
    constructor(/** @type {LineData} */ data) {
        super();
        this.id = crypto.randomUUID();
        this.itemType = ItemType.Line;
        this.data = {
            ...data,
            x1: data.x1 * 20,
            x2: data.x2 * 20,
            y1: data.y1 * 20,
            y2: data.y2 * 20,
        };
    }
}

/**
 * @returns {[UUID, Item]}
 */
function createLine(/** @type {LineData} */ lineData) {
    const newMember = new Line(lineData);

    return [
        newMember.id,
        newMember
    ]
}

export default createLine;