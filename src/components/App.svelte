<script>
    import {
        lineList,
        addNewLine,
        moveLineByElement,
        moveHorizontalLineByHandler,
        moveVerticalLineByHandler,
    } from "../stores/lineList.store";
    import { moveMemberByElement } from "../stores/memberList.store";
    import { movement, resetMovement } from "../stores/movement.store";
    import { addMember, memberList } from "../stores/memberList.store";
    import Member from "./Member.svelte";
    import { ItemType } from "../entities/enums";
    import DragIcon from "./DragIcon.svelte";
    import FemaleIcon from "./icons/FemaleIcon.svelte";
    import Sidebar from "./Sidebar.svelte";
    import HorizontalLineIcon from "./icons/HorizontalLineIcon.svelte";
    import { selection } from "../stores/selection.store";
    import MemberSidebar from "./MemberSidebar.svelte";
    import BodyHandler from "./BodyHandler.svelte";
    import VerticalLineIcon from "./icons/VerticalLineIcon.svelte";
    import Line from "./Line.svelte";

    function addHorizontalLine() {
        addNewLine({ x1: 20, x2: 200, y1: 20, y2: 20, element: null, type: ItemType.HorizontalLineHandler });
    }

    function addVerticalLine() {
        addNewLine({ x1: 20, x2: 20, y1: 20, y2: 100, element: null, type: ItemType.VerticalLineHandler });
    }

    function handleMouseMove(/** @type {MouseEvent} */ event) {
        if (!$movement.isDragging || $movement.itemType === null) return;

        console.log({clientX: event.clientX, clientY: event.clientY});
        console.log({offsetX: $movement.offsetX, offsetY: $movement.offsetY});
        const x = Math.floor((event.clientX - $movement.offsetX) / 20) * 20;
        const y = Math.floor((event.clientY - $movement.offsetY) / 20) * 20;
        console.log({resultX: x, resultY: y});

        const itemDictionary = {
            [ItemType.Line]: moveLineByElement,
            [ItemType.Member]: moveMemberByElement,
            [ItemType.HorizontalLineHandler]: moveHorizontalLineByHandler,
            [ItemType.VerticalLineHandler]: moveVerticalLineByHandler,
        };

        return itemDictionary[$movement.itemType]({
            element: $movement.element,
            x,
            y,
            handler: $movement.handlerSelected,
        });
    }
</script>

<!-- Global listeners -->
<svelte:document on:mouseup={resetMovement} on:mousemove={handleMouseMove} />
<BodyHandler/>

<div class="drag-box">
    <DragIcon onClick={addMember}>
        <FemaleIcon onClick={() => {}} onMouseDown={() => {}} />
    </DragIcon>
    <DragIcon onClick={addHorizontalLine}>
        <HorizontalLineIcon />
    </DragIcon>
    <DragIcon onClick={addVerticalLine}>
        <VerticalLineIcon />
    </DragIcon>
</div>

{#each $memberList as member}
    <Member data={member} />
{/each}

{#each $lineList as lineData}
    <Line data={lineData}/>
{/each}

<div class="selection-box" />

{#if $selection.element !== null}
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

    .selection-box {
        position: absolute;
        border: 1px dashed #000;
        background-color: rgba(0, 0, 0, 0.2);
        pointer-events: none;
        z-index: 3;
    }
</style>
