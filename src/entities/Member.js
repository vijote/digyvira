import { ItemType } from "./enums";
import Item from './Item';

class Member extends Item {
    /** @type {MemberData} */ data;
    /** @type {ItemType} */ itemType = ItemType.Member;

    constructor(/** @type {MemberData} */ data) {
        super();
        this.id = crypto.randomUUID();
        this.data = {
            ...data,
            x: data.x * 20,
            y: data.y * 20
        };
    }
}

/**
 * @returns {[UUID, Item]}
 */
function createMember(/** @type {MemberData} */ memberData) {
    const newMember = new Member(memberData);

    return [
        newMember.id,
        newMember
    ]
}

export default createMember;