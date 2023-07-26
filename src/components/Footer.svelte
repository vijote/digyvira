<script>
    import { tree, initializeTree } from '../stores/tree.store';

    function saveTree() {
        const treeEntries = JSON.stringify([...$tree]);
        const blob = new Blob([treeEntries], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "data.json";
        link.click();

        URL.revokeObjectURL(url);
    }

    function handleFileChange( /** @type {Event} */ event) {
        const { target } = /** @type {Event & { target: HTMLInputElement }} */ (event);

        if(!target.files) return;
        
        const file = target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const jsonData = reader.result;

            if(typeof jsonData !== 'string') throw new Error("No se pudo leer el arbol.");

            /** @type {[UUID, import('../entities/Item').default][]} */
            const treeData = JSON.parse(jsonData);
            
            initializeTree(new Map(treeData));
        };

        reader.readAsText(file);
    }
</script>

<footer class="footer">
    <label class="button upload-button">
        <input class="hidden-input" type="file" on:change={handleFileChange} accept=".json" />
        Importar arbol
    </label>
    <button class="button download-button" on:click={saveTree}>Guardar arbol</button>
</footer>

<style>
    .hidden-input {
        display: none;
    }

    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fffdea;
        padding: 0.75rem 1.5rem;
        display: flex;
        justify-content: flex-end;
        column-gap: 2rem;
        border-top: 1px solid grey;
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

    .button:active {
        transform: scale(0.95);
    }

    .download-button {
        background-color: #fab273;
    }

    .upload-button {
        background-color: #a0dfe6;
    }
</style>
