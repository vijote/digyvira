<script>
    import { ItemType } from "../entities/enums";
    import Line from "./Line.svelte";
    import Member from "./Member.svelte";

    /** @type {import("../entities/Item").default} */
    export let item;

    const itemComponents = {
        [ItemType.Line]: Line,
        [ItemType.Member]: Member
    }
</script>

<svelte:component this={itemComponents[item.itemType]} data={item.data}  id={item.id}/>