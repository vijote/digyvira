<script>
    import { ItemType } from "../entities/enums";
    import HorizontalLine from "./HorizontalLine.svelte";
    import VerticalLine from "./VerticalLine.svelte";

    /** @type {LineData} */
    export let data;

    /**  @type {`${string}-${string}-${string}-${string}-${string}`} */
    export let id;

    const lineComponents = {
        [ItemType.HorizontalLine]: HorizontalLine,
        [ItemType.VerticalLine]: VerticalLine,
    };
</script>

<svelte:component this={lineComponents[data.type]} line={data} {id} />
