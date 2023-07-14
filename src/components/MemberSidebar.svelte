<script>
    import { MemberType } from "../entities/enums";
    import { updateType } from "../stores/memberList.store";
    import { resetSelection, selection } from "../stores/selection.store";
    import FemaleIcon from "./icons/FemaleIcon.svelte";
    import MaleIcon from "./icons/MaleIcon.svelte";

    function setTypeToFemale() {
        updateType($selection.element, MemberType.Female);
        resetSelection();
    }

    function setTypeToMale() {
        updateType($selection.element, MemberType.Male);
        resetSelection();
    }
</script>

<h2 class="title">Cambiar tipo</h2>
<div class="type-container">
    <FemaleIcon onClick={setTypeToFemale} onMouseDown={() => {}}/>
    <MaleIcon onClick={setTypeToMale} onMouseDown={() => {}}/>
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