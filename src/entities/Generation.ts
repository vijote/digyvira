import type Member from "./Member";
import type { UUID } from "../types";
import type Union from "./Union";
import type { Dependencies } from "./Dependencies";

export type GenerationConstructorOptions = {
    height?: number,
    children: Member[],
    unions?: Union[],
    dependencies: Dependencies
}

class Generation {
    private _height: number = 0;
    private dependencies: Dependencies;

    public readonly id: UUID;
    public readonly members: Map<UUID, Member>;
    public readonly unions: Union[] = [];

    public y: string = "0%";

    constructor(options: GenerationConstructorOptions) {
        if (options.height) {
            this._height = options.height;
            this.y = `${this._height * 35}%`;
        }

        if (options.unions) {
            this.unions = options.unions;
        }

        this.dependencies = options.dependencies;
        this.id = this.dependencies.generateId();
        this.members = this.formatMembers(options.children);
    }

    get height() {
        return this._height;
    }

    private formatMembers(members: Member[]) {
        const formattedMembers: [UUID, Member][] = [];

        members.forEach(member => {
            member.setGeneration(this);
            formattedMembers.push([member.id, member]);
        });

        return new Map(formattedMembers);
    }

    addMember = (newMember: Member) => () => {
        this.members.set(newMember.id, newMember)
    }

    setHeight(newHeight: number) {
        this._height = newHeight;
        this.y = `${this._height * 35}%`;
    }

    addUnion(newUnion: Union) {
        this.unions.push(newUnion);
    }
}

export default Generation;