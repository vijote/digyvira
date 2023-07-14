<script>
  import { ItemType } from "../entities/enums";
  import { setMovement } from "../stores/movement.store";

  /**  @type {import("../stores/lineList.store").Line} */
  export let line;

  let mouseDownTimestamp = 0;
  let isHovered = false;

  const handleMouseEnter = () => {
    isHovered = true;
  };

  const handleMouseLeave = () => {
    isHovered = false;
  };

  const handleLineMouseDown = (/** @type {MouseEvent} */ event) => {
    mouseDownTimestamp = Date.now();

    setMovement(() => ({
      isDragging: true,
      itemType: ItemType.Line,
      // @ts-ignore
      element: event.target,
      // @ts-ignore
      offsetX: event.clientX - event.target.getBoundingClientRect().left - 20,
      // @ts-ignore
      offsetY: event.clientY - event.target.getBoundingClientRect().top - 20,
    }));
  };

  const handleHandlerMouseDown = (/** @type {"left" | "right"} */ handler) => (/** @type {MouseEvent} */ event) => {
    setMovement(() => ({
      isDragging: true,
      itemType: ItemType.LineHandler,
      element: line.element,
      // @ts-ignore
      offsetX: event.clientX - event.target.getBoundingClientRect().left - 20,
      // @ts-ignore
      offsetY: event.clientY - event.target.getBoundingClientRect().top - 20,
      handlerSelected: handler
    }));
  }

  const handleLineClick = () => {
    const elapsedTime = Date.now() - mouseDownTimestamp;

    if (elapsedTime > 300) return;
    console.log("line click!");
  };
</script>

<line
  x1={line.x1}
  y1={line.y1}
  x2={line.x2}
  y2={line.y2}
  stroke="black"
  stroke-width="2"
/>
<g on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} role="group">
  <rect
    x={Math.min(line.x1, line.x2) - 10}
    y={Math.min(line.y1, line.y2) - 10}
    width={Math.abs(line.x2 - line.x1) + 20}
    height={Math.abs(line.y2 - line.y1) + 20}
    fill="transparent"
    id="selector"
    on:click={handleLineClick}
    on:mousedown={handleLineMouseDown}
    data-item={ItemType.Line}
    bind:this={line.element}
  />
  {#if isHovered}
    <rect
      x={line.x1 - 5}
      y={line.y1 - 5}
      width="10"
      height="10"
      fill="grey"
      cursor="move"
      data-item={ItemType.LineHandler}
      data-handler="left"
      on:mousedown={handleHandlerMouseDown('left')}
    />
    <rect
      x={line.x2 - 5}
      y={line.y2 - 5}
      width="10"
      height="10"
      fill="blue"
      cursor="move"
      data-item={ItemType.LineHandler}
      data-handler="right"
      on:mousedown={handleHandlerMouseDown('right')}
    />
  {/if}
</g>
