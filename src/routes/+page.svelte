<script lang="ts">
    let { form } = $props();
</script>

<h1>Welcome to FEB Data Analysis Website!</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<h2>Upload Files</h2>

{#if form?.error}
<h2> what are you doing bro </h2>
{/if}

{#if form?.success}
    <h2>Yay you!</h2>
{/if}

<div class='form'>
    <form method="post" action="?/upload" enctype="multipart/form-data">
        <label for="csvFile">Select a CSV file:</label>
        <input type="file" id="csvFile" name="csvFile" accept=".csv"/>
        <button type ="submit">Upload</button>
    </form>
</div>

