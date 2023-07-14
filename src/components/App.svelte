<script>
    import { lineList, addNewLine, moveLineByElement, moveLineByHandler } from "../stores/lineList.store";
    import { moveMemberByElement } from "../stores/memberList.store";
    import { movement, resetMovement } from "../stores/movement.store";
    import { addMember, memberList } from "../stores/memberList.store";
    import Line from "./Line.svelte";
    import Member from "./Member.svelte";
    import { ItemType } from "../entities/enums";
    import DragIcon from "./DragIcon.svelte";
    import FemaleMember from "./icons/FemaleMember.svelte";
    import Sidebar from "./Sidebar.svelte";
    import LineIcon from "./icons/LineIcon.svelte";

    let sidebarOpen = false;

    function addLine() {
        addNewLine({ x1: 20, x2: 200, y1: 20, y2: 20, element: null });
    }

    function handleMouseUp() {
        resetMovement();
    }

    function handleMouseMove(/** @type {MouseEvent} */ event) {
        if (!$movement.isDragging || $movement.itemType === null) return;

        const x = Math.floor((event.clientX - $movement.offsetX) / 20) * 20;
        const y = Math.floor((event.clientY - $movement.offsetY) / 20) * 20;

        const itemDictionary = {
            [ItemType.Line]: moveLineByElement,
            [ItemType.Member]: moveMemberByElement,
            [ItemType.LineHandler]: moveLineByHandler
        }

        return itemDictionary[$movement.itemType]({ element: $movement.element, x, y, handler: $movement.handlerSelected });
    }
</script>

<!-- Global listeners -->
<svelte:document on:mouseup={handleMouseUp} on:mousemove={handleMouseMove} />

<div class="drag-box">
    <DragIcon onClick={addMember}>
        <FemaleMember onMouseDown={() => {}}/>
    </DragIcon>
    <DragIcon onClick={addLine}>
        <LineIcon/>
    </DragIcon>
</div>

<div class="grid" />
{#each $memberList as member}
    <Member data={member} />
{/each}
<svg width="100%" height="100%">
    {#each $lineList as lineData}
        <Line line={lineData} />
    {/each}
</svg>


{#if sidebarOpen}
    <Sidebar>
        texto
    </Sidebar>
{/if}

<style>
    ::selection {
        background-color: transparent;
        color: inherit;
    }

    .grid {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(
                to right,
                rgb(216, 216, 216) 1px,
                transparent 1px
            ),
            linear-gradient(to bottom, rgb(216, 216, 216) 1px, transparent 1px);
        background-size: 20px 20px; /* Adjust the size based on your grid cell size */
        pointer-events: none;
        z-index: -1;
    }

    .drag-box {
        /* position */
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 0;

        /* style */
        background-color: #fefefe;
        padding: 1rem 2rem;
        border: 1px solid grey;
        border-top: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        font-size: 0.75rem;

        /* layout */
        display: flex;
        column-gap: 2rem;
    }

    .mini-item {
        width: 50px;
        height: 50px;
        border: 1px solid black;
    }
</style>
