<script>
    import { resetSelection } from "../stores/selection.store";

    let initialMouseX = 0;
    let initialMouseY = 0;

    function handleMouseDown(/** @type {MouseEvent} */ event) {
        initialMouseX = event.clientX;
        initialMouseY = event.clientY;
    }

    const handleClick = (/** @type {MouseEvent} */ event) => {
        event.stopPropagation();

        const mouseDifference = (initialMouseX == event.clientX) || (initialMouseY == event.clientY);

        if (!mouseDifference) return;

        resetSelection();
    };
</script>

<svelte:body on:mousedown={handleMouseDown} on:click={handleClick}/>