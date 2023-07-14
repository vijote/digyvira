<aside class="sidebar">
    <slot/>
</aside>

<style>
    .sidebar {
        padding: 2rem 1rem;
        position: fixed;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        min-height: 400px;
        min-width: 200px;
        border: 1px solid rgb(92, 92, 92);
        border-right: 0;
        border-top-left-radius: 10px;
        background-color: #fefefe;
        border-bottom-left-radius: 10px;
    }
</style>