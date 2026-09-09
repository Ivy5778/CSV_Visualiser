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
        <button type="submit">Upload</button>
    </form>
</div>

{#if form?.success && form?.csvData && form.csvData.length > 0}
    <h2>CSV Data Visualization</h2>
    <div style="overflow-x: auto; margin-top: 20px;">
        <table style="border-collapse: collapse; width: 100%;">
            <thead>
                <tr style="background-color: #f0f0f0;">
                    {#each Object.keys(form.csvData[0]) as header}
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">{header}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each form.csvData as row}
                    <tr>
                        {#each Object.keys(form.csvData[0]) as header}
                            <td style="border: 1px solid #ddd; padding: 8px;">{row[header] || '-'}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <p style="margin-top: 10px; color: #666;">Total rows: {form.csvData.length}</p>
{/if}

