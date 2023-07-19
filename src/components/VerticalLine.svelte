<script>
  import { ItemType } from "../entities/enums";
  import { setMovement } from "../stores/movement.store";
  import { selectItem } from "../stores/selection.store";

  /**  @type {import("../stores/lineList.store").Line} */
  export let line;

  /**  @type {`${string}-${string}-${string}-${string}-${string}`} */
  export let id;

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
      id,
      handlerSelected: false,
      // @ts-ignore
      offsetX: event.clientX - event.target.getBoundingClientRect().left - 20,
      // @ts-ignore
      offsetY: event.clientY - event.target.getBoundingClientRect().top - 20,
    }));
  };

  const handleHandlerMouseDown =
    (/** @type {"left" | "right"} */ handler) =>
    (/** @type {MouseEvent} */ event) => {
      setMovement(() => ({
        isDragging: true,
        itemType: ItemType.VerticalLineHandler,
        id,
        // @ts-ignore
        offsetX: event.clientX - event.target.getBoundingClientRect().left - 20,
        // @ts-ignore
        offsetY: event.clientY - event.target.getBoundingClientRect().top - 20,
        handlerSelected: handler,
      }));
    };

  const handleClick = (/** @type {MouseEvent} */ event) => {
    event.stopPropagation();

    const elapsedTime = Date.now() - mouseDownTimestamp;

    if (elapsedTime > 300) return;

    selectItem({
      id,
      type: ItemType.Line,
    });
  };
</script>

<svg style="position: absolute;
top: {line.y1 - 5}px;
left: {line.x1}px;
right: {line.x2}px;
bottom: {line.y2 + 10}px;
height: {line.y2 - line.y1 + 10}px;
width: 20px;
transform: translateX(-50%);">
  <line
    x1="50%"
    y1="5"
    x2="50%"
    y2={line.y2 - line.y1 + 5}
    stroke="black"
    stroke-width="2"
  />
  <g
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="group"
  >
    <rect
      x="0"
      y="-5"
      width={Math.abs(line.x2 - line.x1) + 20}
      height={line.y2 - line.y1 + 20}
      fill="transparent"
      on:click={handleClick}
      on:mousedown={handleLineMouseDown}
      data-id={id}
      bind:this={line.element}
    />
    {#if isHovered}
      <rect
        x="5"
        y="0"
        width="10"
        height="10"
        fill="grey"
        cursor="move"
        data-handler="left"
        on:mousedown={handleHandlerMouseDown("left")}
      />
      <rect
        x="5"
        y={line.y2 - line.y1}
        width="10"
        height="10"
        fill="blue"
        cursor="move"
        data-handler="right"
        on:mousedown={handleHandlerMouseDown("right")}
      />
    {/if}
  </g>
</svg>
