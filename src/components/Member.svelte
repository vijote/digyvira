<script>
  import { ItemType, MemberType } from "../entities/enums";
  import { setMovement } from "../stores/movement.store";
  import { selectItem } from "../stores/selection.store";
  import FemaleIcon from "./icons/FemaleIcon.svelte";
  import MaleIcon from "./icons/MaleIcon.svelte";

  /**  @type {import("../stores/memberList.store").Member} */
  export let data;

  let mouseDownTimestamp = 0;

  const memberDictionary = {
    [MemberType.Male]: MaleIcon,
    [MemberType.Female]: FemaleIcon,
  };

  const handleMouseDown = (/** @type {MouseEvent} */ event) => {
    mouseDownTimestamp = Date.now();

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

  const handleClick = (/** @type {MouseEvent} */ event) => {
    event.stopPropagation();

    const elapsedTime = Date.now() - mouseDownTimestamp;

    if (elapsedTime > 300) return;

    selectItem({
      element: data.element,
      type: ItemType.Member,
    });
  };
</script>

<div
  data-item={ItemType.Member}
  role="cell"
  tabindex="0"
  bind:this={data.element}
  class="member"
  style="top: {data.y}px; left: {data.x}px"
>
  <svelte:component
    this={memberDictionary[data.type]}
    onMouseDown={handleMouseDown}
    onClick={handleClick}
  />
</div>

<style>
  .member {
    width: 60px;
    height: 60px;
    position: absolute;
  }
</style>
