<script>
    import { MemberType } from "../entities/enums";
    import { changeMemberType } from "../stores/tree.store";
    import { resetSelection, selection } from "../stores/selection.store";
    import FemaleIcon from "./icons/FemaleIcon.svelte";
    import MaleIcon from "./icons/MaleIcon.svelte";

    function setTypeToFemale() {
        changeMemberType($selection.id, MemberType.Female);
        resetSelection();
    }

    function setTypeToMale() {
        changeMemberType($selection.id, MemberType.Male);
        resetSelection();
    }
</script>

<h3 class="title">Datos</h3>
<form class="data-form" action="">
    <label for="fullName">Nombre completo</label>
    <input class="data-input" type="text" name="fullName">
    <label for="birthDate">Fecha de nacimiento</label>
    <input class="data-input" type="date" name="birthDate">
    <label for="deathDate">Fecha de fallecimiento</label>
    <input class="data-input" type="date" name="deathDate">
    <input class="button submit-button" type="submit" value="Actualizar">
</form>

<h3 class="title">Cambiar tipo</h3>
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

    .data-form {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }

    .data-form input {
        margin-bottom: 1rem;
    }

    .data-form label {
        margin-bottom: 0.25rem;
    }

    .data-form input:nth-of-type(3) {
        margin-bottom: 2.25rem;
    }

    .data-input {
        background-color: transparent;
        padding: 0.25rem;
        border-radius: 5px;
        border: 1px solid grey;
    }

    .button {
        all: unset;
        cursor: pointer;
        padding: 0.35rem 1rem;
        border-radius: 5px;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
        font-weight: bold;
    }

    .button:focus {
        outline: revert;
    }

    .submit-button {
        background-color: rgb(255, 239, 167);
        text-align: center;
    }
</style>