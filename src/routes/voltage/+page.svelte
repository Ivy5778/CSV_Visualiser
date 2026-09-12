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
            name: 'INV DC Bus Voltage',
            data: form?.csvData?.filter(row => row.name?.includes('INV_DC_Bus_Voltage'))?.map(row => row["value"]) || []
        }, {
            name: 'LV 12V Voltage',
            data: form?.csvData?.filter(row => row.name?.includes('lv_12v_voltage'))?.map(row => row["value"]) || []
            }, {
            name: 'LV 24V Voltage',
            data: form?.csvData?.filter(row => row.name?.includes('lv_24v_voltage'))?.map(row => row["value"]) || []
            }, {
            name: 'INV_Output_Voltage',
            data: form?.csvData?.filter(row => row.name?.includes('INV_Output_Voltage'))?.map(row => row["value"]) || []
            }, {
            name: 'INV_VAB_Vd_Voltage',
            data: form?.csvData?.filter(row => row.name?.includes('INV_VAB_Vd_Voltage'))?.map(row => row["value"]) || []
            }, {
            name: 'INV_VBC_Vq_Voltage',
            data: form?.csvData?.filter(row => row.name?.includes('INV_VBC_Vq_Voltage'))?.map(row => row["value"]) || []
            },{
            name: 'max_cell_voltage',
            data: form?.csvData?.filter(row => row.name?.includes('max_cell_voltage'))?.map(row => row["value"]) || []
            },{
            name: 'min_cell_voltage',
            data: form?.csvData?.filter(row => row.name?.includes('min_cell_voltage'))?.map(row => row["value"]) || []
            },{
            name: 'total_pack_voltage',
            data: form?.csvData?.filter(row => row.name?.includes('total_pack_voltage'))?.map(row => row["value"]) || []


        }],
        xaxis: {
            categories: form?.csvData?.filter(row => row.name?.includes('voltage'))?.map(row => row["timestamp"]) || []
        }
    };

    let chart;
    
    $effect(() => {
        if (typeof document !== 'undefined' && document.querySelector('#chart')) {
            chart = new ApexCharts(document.querySelector('#chart'), options);
        chart.render();
        }
    });
</script>
<h1>Voltage Graph</h1>

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
                    {#each form.csvData.filter(row => row.name.includes ("Voltage")) as row (row)}
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