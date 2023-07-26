<script>
    function handleClick(/** @type {MouseEvent} */ event) {
        event.stopPropagation();
    }
</script>

<aside class="sidebar" on:click={handleClick}>
    <slot/>
</aside>

<style>
    .sidebar {
        padding: 2rem 1rem;
        position: fixed;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        border: 1px solid rgb(92, 92, 92);
        border-right: 0;
        border-top-left-radius: 10px;
        background-color: #fffdea;
        border-bottom-left-radius: 10px;
    }
</style>