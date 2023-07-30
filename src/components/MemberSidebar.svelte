<script>
    import { MemberSidebar } from "../entities/enums";
    import { selection } from "../stores/selection.store";
    import MemberDataSidebar from "./MemberDataSidebar.svelte";
    import MemberTypeSidebar from "./MemberTypeSidebar.svelte";

    let sidebar = MemberSidebar.Data;

    const SidebarComponents = {
        [MemberSidebar.Data]: MemberDataSidebar,
        [MemberSidebar.Type]: MemberTypeSidebar
    }

    function setDataSidebar() {
        sidebar = MemberSidebar.Data;
    }

    function setTypeSidebar() {
        sidebar = MemberSidebar.Type;
    }
</script>

<div class="tab-group">
    <button class="tab" class:active={sidebar === MemberSidebar.Data} on:click={setDataSidebar}>Datos</button>
    <button class="tab" class:active={sidebar === MemberSidebar.Type} on:click={setTypeSidebar}>Tipo</button>
</div>

<svelte:component this={SidebarComponents[sidebar]} member={$selection}/>

<style>
    .tab {
        all: unset;
        padding: 0.25rem 0.5rem;
        background-color: #eae8ce;
        border-radius: 5px;
        cursor: pointer;
    }

    .tab:hover:not(.active) {
        background-color: #fbf0c6;
        transition: all ease-in 0.15s;
    }

    .active {
        background-color: #eed782;
    }

    .tab:focus {
        outline: revert;
    }

    .tab-group {
        display: flex;
        column-gap: 0.25rem;
        margin-bottom: 1rem;
    }
</style>