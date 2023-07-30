<script>
    import { MemberType } from "../entities/enums";
    import { changeMemberType } from "../stores/tree.store";
    import { resetSelection } from "../stores/selection.store";
    import FemaleIcon from "./icons/FemaleIcon.svelte";
    import MaleIcon from "./icons/MaleIcon.svelte";

    /** @type {SelectedItem} */
    export let member;

    function setTypeToFemale() {
        changeMemberType(member.id, MemberType.Female);
        resetSelection();
    }

    function setTypeToMale() {
        changeMemberType(member.id, MemberType.Male);
        resetSelection();
    }

    function handleMouseDown() { }
</script>

<h3 class="title">Cambiar tipo</h3>
<div class="type-container">
    <FemaleIcon onClick={setTypeToFemale} onMouseDown={handleMouseDown}/>
    <MaleIcon onClick={setTypeToMale} onMouseDown={handleMouseDown}/>
</div>

<style>
    .title {
        margin: 0;
        margin-bottom: 2rem;
    }

    .type-container {
        display: grid;
        max-width: 200px;
        grid-template-columns: 1fr 1fr;
        column-gap: 1rem;
    }
</style>