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
        itemType: ItemType.VerticalLineHandler,
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
      role="button"
      tabindex="0"
      width={Math.abs(line.x2 - line.x1) + 20}
      height={line.y2 - line.y1 + 20}
      fill="transparent"
      on:click={handleClick}
      on:mousedown={handleLineMouseDown}
      on:keypress={handleKeyPress}
      data-id={id}
    />
    {#if isHovered}
      <rect
        x="5"
        y="0"
        width="10"
        height="10"
        fill="grey"
        role="button"
        tabindex="0"
        cursor="move"
        data-handler="left"
        on:mousedown={handleHandlerMouseDown("left")}
      />
      <rect
        x="5"
        y={line.y2 - line.y1}
        role="button"
        tabindex="0"
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
