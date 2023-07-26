<script>
    import App from "../components/App.svelte";
</script>

<App />

<style>
    :global(::selection) {
        background-color: transparent;
        color: inherit;
    }
    
    :global(html) {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: Helvetica, Arial, sans-serif;
        background-color: #fffef4;
        background-image: linear-gradient(
                to right,
                rgb(216, 216, 216) 1px,
                transparent 1px
            ),
            linear-gradient(to bottom, rgb(216, 216, 216) 1px, transparent 1px);
        background-size: 20px 20px; /* Adjust the size based on your grid cell size */
    }
</style>
