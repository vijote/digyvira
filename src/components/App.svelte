<script>
    // Entities
    import { EMPTY_ID, ItemType, MemberType } from "../entities/enums";
    import initialTree from "../entities/initialTree";

    // Stores
    import { movement, resetMovement } from "../stores/movement.store";
    import { selection } from "../stores/selection.store";
    import {
        initializeTree,
        itemTree,
        moveLineById,
        moveMemberById,
        moveHorizontalLineByHandler,
        moveVerticalLineByHandler,
        addLine,
        addMember,
    } from "../stores/itemList.store";

    // Lifecycle methods
    import { onMount } from "svelte";

    // Components
    import DragIcon from "./DragIcon.svelte";
    import FemaleIcon from "./icons/FemaleIcon.svelte";
    import Sidebar from "./Sidebar.svelte";
    import HorizontalLineIcon from "./icons/HorizontalLineIcon.svelte";
    import MemberSidebar from "./MemberSidebar.svelte";
    import BodyHandler from "./BodyHandler.svelte";
    import VerticalLineIcon from "./icons/VerticalLineIcon.svelte";
    import Item from "./Item.svelte";

    function addHorizontalLine() {
        addLine({
            x1: 20,
            x2: 200,
            y1: 20,
            y2: 20,
            type: ItemType.HorizontalLine,
        });
    }

    function addVerticalLine() {
        addLine({
            x1: 20,
            x2: 20,
            y1: 20,
            y2: 100,
            type: ItemType.VerticalLine,
        });
    }

    function addNewMember() {
        addMember({
            type: MemberType.Female,
            x: 0,
            y: 0,
        });
    }

    function handleMouseMove(/** @type {MouseEvent} */ event) {
        if (!$movement.isDragging || $movement.itemType === null) return;

        const x = Math.floor((event.clientX - $movement.offsetX) / 20) * 20;
        const y = Math.floor((event.clientY - $movement.offsetY) / 20) * 20;

        const itemDictionary = {
            [ItemType.Line]: moveLineById,
            [ItemType.Member]: moveMemberById,
            [ItemType.HorizontalLineHandler]: moveHorizontalLineByHandler,
            [ItemType.VerticalLineHandler]: moveVerticalLineByHandler,
        };

        return itemDictionary[$movement.itemType]({
            id: $movement.id,
            x,
            y,
            handler: $movement.handlerSelected,
        });
    }

    onMount(() => {
        initializeTree(initialTree);
    });
</script>

<!-- Global listeners -->
<svelte:document on:mouseup={resetMovement} on:mousemove={handleMouseMove} />
<BodyHandler />

<div class="drag-box">
    <DragIcon onClick={addNewMember}>
        <FemaleIcon onClick={() => {}} onMouseDown={() => {}} />
    </DragIcon>
    <DragIcon onClick={addHorizontalLine}>
        <HorizontalLineIcon />
    </DragIcon>
    <DragIcon onClick={addVerticalLine}>
        <VerticalLineIcon />
    </DragIcon>
</div>

{#each [...$itemTree] as [_itemId, item]}
    <Item {item} />
{/each}

{#if $selection.id !== EMPTY_ID}
    <Sidebar>
        {#if $selection.type === "member"}
            <MemberSidebar />
        {/if}
    </Sidebar>
{/if}

<style>
    ::selection {
        background-color: transparent;
        color: inherit;
    }

    .drag-box {
        /* position */
        position: fixed;
        right: 0;
        top: 5%;

        /* style */
        background-color: #fefefe;
        padding: 1rem 2rem;
        border: 1px solid grey;
        border-right: none;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;

        /* layout */
        display: flex;
        row-gap: 2rem;
        flex-direction: column;
    }
</style>
