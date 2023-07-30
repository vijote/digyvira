<script>
  import { EMPTY_ID, ItemType, MemberType } from "../entities/enums";
  import { setMovement } from "../stores/movement.store";
  import { selectItem } from "../stores/selection.store";
    import Baby from "./icons/Baby.svelte";
    import Cross from "./icons/Cross.svelte";
  import FemaleIcon from "./icons/FemaleIcon.svelte";
    import Job from "./icons/Job.svelte";
  import MaleIcon from "./icons/MaleIcon.svelte";

  /**  @type {MemberData} */
  export let data;

  /**  @type {UUID} */
  export let id;

  let mouseDownTimestamp = 0;

  const memberDictionary = {
    [MemberType.Male]: MaleIcon,
    [MemberType.Female]: FemaleIcon,
  };

  const handleMouseDown = (/** @type {MouseEvent} */ event) => {
    mouseDownTimestamp = Date.now();

    const { target } = /** @type {MouseEvent & { target: SVGSVGElement}} */ (event);

    setMovement(() => ({
      isDragging: true,
      itemType: ItemType.Member,
      id,
      handlerSelected: EMPTY_ID,
      offsetX: event.clientX - target.getBoundingClientRect().left,
      offsetY: event.clientY - target.getBoundingClientRect().top,
    }));
  };

  const handleClick = (/** @type {MouseEvent} */ event) => {
    event.stopPropagation();

    const elapsedTime = Date.now() - mouseDownTimestamp;

    if (elapsedTime > 300) return;

    selectItem({
      id,
      type: ItemType.Member,
    });
  };
</script>

<div
  data-id={id}
  role="cell"
  tabindex="0"
  class="member"
  style="top: {data.y}px; left: {data.x}px"
>
  <svelte:component
    this={memberDictionary[data.type]}
    onMouseDown={handleMouseDown}
    onClick={handleClick}
  />
  <span class="member-name">
    {#if data.fullName}
      <span class="data-span">{data.fullName}</span>
    {/if}

    <span class="data-span">
      {#if data.birthDay || data.birthMonth || data.birthYear}
        <Baby/>
      {/if}
      {#if data.birthDay}
        {data.birthDay}
      {/if}
  
      {#if data.birthMonth}
        {data.birthMonth}
      {/if}
  
      {#if data.birthYear}
        {data.birthYear}
      {/if}
    </span>

    <span class="data-span">
      {#if data.deathDay || data.deathMonth || data.deathYear}
        <Cross/>
      {/if}
      {#if data.deathDay}
        {data.deathDay}
      {/if}
  
      {#if data.deathMonth}
        {data.deathMonth}
      {/if}
  
      {#if data.deathYear}
        {data.deathYear}
      {/if}
    </span>

    <span class="data-span">
      {#if data.profession}
        <Job/> {data.profession}
      {/if}
    </span>
  </span>
</div>

<style>
  .data-span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .member {
    width: 40px;
    height: 40px;
    position: absolute;
    cursor: pointer;
  }

  .member-name {
    /* positioning */
    cursor: text;
    position: relative;
    top: -60%;
    left: 225%;
    transform: translate(-50%, -50%);
    z-index: 1;

    /* style */
    display: inline-block;
    font-size: 0.75rem;
    padding: 0.25rem 0;
    border-radius: 10px;

    /* text handling */
    min-width: 10ch;
    width: max-content;
    max-width: 12ch;
    text-align: center;
    word-wrap: break-word;
  }
</style>
