<script>
  import { ItemType } from "../entities/enums";
  import { setMovement } from "../stores/movement.store";
  import FemaleMember from "./icons/FemaleMember.svelte";

  /**  @type {import("../stores/memberList.store").Member} */
  export let data;

  const handleMouseDown = (/** @type {MouseEvent} */ event) => {
    if (!event.target) return;

    setMovement(() => ({
      isDragging: true,
      itemType: ItemType.Member,
      // @ts-ignore
      element: data.element,
      handlerSelected: false,
      // @ts-ignore
      offsetX: event.clientX - event.target.getBoundingClientRect().left,
      // @ts-ignore
      offsetY: event.clientY - event.target.getBoundingClientRect().top,
    }));
  };
</script>

<div
  data-item={ItemType.Member}
  role="cell"
  tabindex="0"
  bind:this={data.element}
  class="grid-item"
  style="position: absolute; top: {data.y}px; left: {data.x}px"
>
  <FemaleMember onMouseDown={handleMouseDown} />
</div>

<style>
  .grid-item {
    width: 100px;
    height: 100px;
  }
</style>
