import { EMPTY_ID } from "./enums";

class Item {
    /** @type {UUID} */ id = EMPTY_ID;
    /** @type {string} */ itemType = '';
    /** @type {object} */ data = {};
}

export default Item;