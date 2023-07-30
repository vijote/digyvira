<script>
    import { resetSelection } from "../stores/selection.store";
    import { tree, updateItem } from "../stores/tree.store";

    /** @type {SelectedItem} */
    export let member;
    
    const item = $tree.get(member.id);

    const itemData = /** @type {MemberData} */ (item.data);
    
    function handleFormSubmit(/**@type {SubmitEvent} */ event) {
        event.preventDefault();

        const target = /** @type {HTMLFormElement} */ (event.target);
        
        const rawData = new FormData(target);
        const formData = getFormData(rawData);
        updateItem(member.id, formData);
        resetSelection();
    }

    function getFormData(/** @type {FormData} */ formData) {
        const formattedData = {};
        formData.forEach((value, key) => {
            // @ts-ignore
            formattedData[key] = value;
        });

        return formattedData;
    }
</script>

<h3 class="title">Datos</h3>
<form class="data-form" on:submit={handleFormSubmit}>
    <label for="fullName">Nombre completo</label>
    <input class="data-input" value={itemData?.fullName || ""} type="text" name="fullName">
    <div>
        <span class="date-label">Fecha de nacimiento</span>
        <div class="date-input-group">
            <div class="date-input">
                <label for="birthDay">Día</label>
                <input class="data-input" value={itemData?.birthDay || ""} type="number" name="birthDay">
            </div>
            <div class="date-input">
                <label for="birthMonth">Mes</label>
                <input class="data-input" value={itemData?.birthMonth || ""} type="number" name="birthMonth">
            </div>
            <div class="date-input">
                <label for="birthYear">Año</label>
                <input class="data-input" value={itemData?.birthYear || ""} type="number" name="birthYear">
            </div>
        </div>
    </div>

    <div>
        <span class="date-label">Fecha de fallecimiento</span>
        <div class="date-input-group">
            <div class="date-input">
                <label for="deathDay">Día</label>
                <input class="data-input" value={itemData?.deathDay || ""} type="number" name="deathDay">
            </div>
            <div class="date-input">
                <label for="deathMonth">Mes</label>
                <input class="data-input" value={itemData?.deathMonth || ""} type="number" name="deathMonth">
            </div>
            <div class="date-input">
                <label for="deathYear">Año</label>
                <input class="data-input" value={itemData?.deathYear || ""} type="number" name="deathYear">
            </div>
        </div>
    </div>

    <label for="profession">Profesión</label>
    <input class="data-input" value={itemData?.profession || ""} type="text" name="profession">

    <input class="button submit-button" type="submit" value="Actualizar">
</form>

<style>
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

    .date-input-group {
        display: flex;
        margin-top: 0.25rem;
        column-gap: 0.5rem;
    }

    .date-input {
        display: flex;
        max-width: 3.75rem;
        flex-direction: column;
    }

    .date-input label {
        font-size: 0.85rem;
        margin-bottom: 0.1rem;
    }

    .date-label {
        display: inline-block;
        margin-bottom: 0.25rem;
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

    ::selection {
        color: white;
        background: lightseagreen;
    }
</style>