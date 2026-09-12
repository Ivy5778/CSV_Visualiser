<nav>
	<a href="/">home</a>
</nav>

<script lang="ts">
    import ApexCharts from 'apexcharts';
    let { form } = $props();

    const options = {
        chart: {
            type: 'line'
        },
        series: [{
            name: 'linear potentiometer 1 rear',
            data: form?.csvData?.filter(row => row.name?.includes('linear_potentiometer_1_rear'))?.map(row => row["value"]) || []
            }, {
            name: 'linear potentiometer 2 rear',
            data: form?.csvData?.filter(row => row.name?.includes('linear_potentiometer_2_rear'))?.map(row => row["value"]) || []
            }
            ,{
            name: 'wss left rear',
            data: form?.csvData?.filter(row => row.name?.includes('wss_left_rear'))?.map(row => row["value"]) || []
            }
        ,{
            name: 'wss right rear',
            data: form?.csvData?.filter(row => row.name?.includes('wss_right_rear'))?.map(row => row["value"]) || []
            }],
        xaxis: {
            categories: [1, 2]
        }
    };

    let chart;
    
    $effect(() => {
        if (typeof document !== 'undefined' && document.querySelector('#chart')) {
            chart = new ApexCharts(document.querySelector('#chart'), options);
        chart.render();
        }
    });
    
    const minimum_value = Math.min(form?.csvData?.filter(row => row.name?.includes('rear'))?.map(row => row["value"]) || [])
</script>

<h1>Rear Graph</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<h2>Upload Files</h2>

{#if form?.error}
    <h2 style="color: red;"> Unable to upload file </h2>
{/if}

{#if form?.success}
    <h2 style="color: green;">File uploaded successfully!</h2>
    {#if form?.fileName}
        <p><strong>File:</strong> {form.fileName}</p>
    {/if}
{/if}

<div class='form'>
    <form method="post" action="?/upload" enctype="multipart/form-data">
        <label for="csvFile">Select a CSV file:</label>
        <input type="file" id="csvFile" name="csvFile" accept=".csv"/>
        <button type="submit">Upload</button>
    </form>
</div>

<div id="chart"></div>

<div id="minimum_value"></div>

<div> const columnValues = form.csvData.map(row => row.value) </div>

{#if form?.success && form?.csvData && Array.isArray(form.csvData) && form.csvData.length > 0}
    <h2>CSV Data Visualization</h2>
    {#if form.totalRows > form.csvData.length}
        <p style="color: #ff6600; font-weight: bold;">Showing first {form.csvData.length} of {form.totalRows} rows</p>
    {:else}
        <p style="color: #666;">Total rows: {form.totalRows || form.csvData.length}</p>
    {/if}
    
    {#if form.csvData[0]}
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
                    {#each form.csvData.filter(row => row.name.includes ("rear")) as row (row)}
                        <tr>
                            {#each Object.keys(form.csvData[0]) as header}
                                <td style="border: 1px solid #ddd; padding: 8px;">{row[header] || '-'}</td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {:else}
        <p style="color: red;">No data to display</p>
    {/if}
{/if}