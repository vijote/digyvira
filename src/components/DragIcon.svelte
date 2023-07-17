<script>
    /** @type {(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement; }) => any} */
    export let onClick;
</script>

<div class="mini-item" on:click={onClick}>
    <slot/>
</div>

<style>
    .mini-item {
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
</style>