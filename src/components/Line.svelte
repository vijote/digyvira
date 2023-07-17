<script>
    import { ItemType } from "../entities/enums";
    import HorizontalLine from "./HorizontalLine.svelte";
    import VerticalLine from "./VerticalLine.svelte";

    /** @type {import("../stores/lineList.store").Line} */
    export let data;

    const lineDictionary = {
        [ItemType.HorizontalLineHandler]: HorizontalLine,
        [ItemType.VerticalLineHandler]: VerticalLine,
    };
</script>

<svelte:component this={lineDictionary[data.type]} line={data} />
