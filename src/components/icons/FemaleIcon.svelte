<script>
    /** @type {(event: MouseEvent & { currentTarget: EventTarget & SVGSVGElement; }) => void} */
    export let onMouseDown;

    /** @type {(event: MouseEvent & { currentTarget: EventTarget & SVGSVGElement; }) => void} */
    export let onClick;
</script>

<svg
    on:mousedown={onMouseDown}
    on:click={onClick}
    fill="#000"
    data-testid="female-member-icon"
    version="1.1"
    class="circle-icon"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="-5 -5 455.873 455.872"
    xml:space="preserve"
>
    <g>
        <g>
            <path
                d="M222.937,445.872C100.007,445.872,0,345.862,0,222.936C0,100.007,100.007,0,222.937,0
					c122.926,0,222.936,100.007,222.936,222.936C445.873,345.862,345.863,445.872,222.937,445.872z M222.937,18.157
					c-112.911,0-204.779,91.868-204.779,204.779c0,112.914,91.868,204.779,204.779,204.779c112.913,0,204.778-91.865,204.778-204.779
					C427.715,110.025,335.85,18.157,222.937,18.157z"
            />
        </g>
    </g>
</svg>

<style>
    .circle-icon {
        width: 100%;
        height: 100%;
        fill: #000000;
        stroke: #000000;
        stroke-width: 5;
    }
</style>
