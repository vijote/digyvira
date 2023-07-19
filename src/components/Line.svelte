<script>
    import { ItemType } from "../entities/enums";
    import HorizontalLine from "./HorizontalLine.svelte";
    import VerticalLine from "./VerticalLine.svelte";

    /** @type {import("../stores/lineList.store").Line} */
    export let data;

    /**  @type {`${string}-${string}-${string}-${string}-${string}`} */
    export let id;

    const lineDictionary = {
        [ItemType.HorizontalLine]: HorizontalLine,
        [ItemType.VerticalLine]: VerticalLine,
    };
</script>

<svelte:component this={lineDictionary[data.type]} line={data} {id} />
