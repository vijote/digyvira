<script>
  import { EMPTY_ID, ItemType } from "../entities/enums";
  import { setMovement } from "../stores/movement.store";
  import { selectItem } from "../stores/selection.store";

  /**  @type {LineData} */
  export let line;

  /**  @type {UUID} */
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

    const { target } = /** @type {MouseEvent & { target: SVGRectElement }} */ (event);

    setMovement(() => ({
      isDragging: true,
      itemType: ItemType.Line,
      id,
      handlerSelected: EMPTY_ID,
      offsetX: event.clientX - target.getBoundingClientRect().left - 20,
      offsetY: event.clientY - target.getBoundingClientRect().top - 20,
    }));
  };

  const handleHandlerMouseDown =
    (/** @type {"left" | "right"} */ handler) =>
    (/** @type {MouseEvent} */ event) => {

      const { target } = /** @type {MouseEvent & { target: SVGRectElement }} */ (event);

      setMovement(() => ({
        isDragging: true,
        itemType: ItemType.HorizontalLineHandler,
        id,
        offsetX: event.clientX - target.getBoundingClientRect().left - 20,
        offsetY: event.clientY - target.getBoundingClientRect().top - 20,
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

  function handleKeyPress() { }
</script>

<svg style="position: absolute;
top: {line.y1}px;
left: {line.x1}px;
right: {line.x2}px;
bottom: {line.y2 + 10}px;
height: {line.y2 - line.y1 + 10}px;
width: {line.x2 - line.x1}px;
transform: translateY(-50%);">
  <line
    x1="0"
    y1="5"
    x2="100%"
    y2="5"
    stroke="black"
    stroke-width="2"
  />
  <g
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="group"
  >
    <rect
      x="-10"
      y="-5"
      width={Math.abs(line.x2 - line.x1) + 20}
      height={20}
      fill="transparent"
      role="button"
      tabindex="0"
      on:click={handleClick}
      on:keypress={handleKeyPress}
      on:mousedown={handleLineMouseDown}
      data-id={id}
    />
    {#if isHovered}
      <rect
        x="0"
        y="0"
        width="10"
        height="10"
        fill="grey"
        cursor="move"
        role="button"
        tabindex="0"
        data-handler="left"
        on:mousedown={handleHandlerMouseDown("left")}
      />
      <rect
        role="button"
        tabindex="0"
        x={line.x2 - line.x1 - 10}
        y="0"
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
