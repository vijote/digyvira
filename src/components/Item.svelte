<script>
    import { ItemType } from "../entities/enums";
    import Line from "./Line.svelte";
    import Member from "./Member.svelte";

    /** @type {import("../entities/initialTree").StoredItem} */
    export let item;

    const itemDictionary = {
        [ItemType.Line]: Line,
        [ItemType.Member]: Member
    }
</script>

<svelte:component this={itemDictionary[item.itemType]} data={item.data}  id={item.id}/>