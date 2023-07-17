<script>
    import { resetSelection } from "../stores/selection.store";

    let mouseDownTimestamp = 0;

    function handleMouseDown() {
        mouseDownTimestamp = Date.now();
    }

    const handleClick = (/** @type {MouseEvent} */ event) => {
        event.stopPropagation();

        const elapsedTime = Date.now() - mouseDownTimestamp;

        if (elapsedTime > 300) return;

        resetSelection();
    };
</script>

<svelte:body on:mousedown={handleMouseDown} on:click={handleClick}/>