import {fail} from '@sveltejs/kit';
import Papa from 'papaparse';

export const actions = {
    upload: async ({ request }) => {
        try {
            const data = await request.formData();
            const file = data.get('csvFile');

            if (!(file instanceof File) || file.size === 0 || !file.name.toLowerCase().endsWith('.csv')) {
                return fail(400, { error: true, message: 'Please select a valid CSV file' });
            }

            console.log(`Uploading file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);

            const fileText = await file.text();
            const parsed = Papa.parse(fileText, { 
                header: true, 
                dynamicTyping: false,
                skipEmptyLines: true
            });

            // Log errors but don't reject - filter out malformed rows
            if (parsed.errors.length > 0) {
                console.warn('CSV parse warnings (skipping malformed rows):', parsed.errors.length);
            }

            // Filter out completely empty rows
            const validData = parsed.data.filter(row => 
                Object.values(row).some(v => v !== null && v !== '' && v !== undefined)
            );

            // Return only first 3000 rows to avoid overwhelming the browser
            const rows = validData.filter(row => row.name?.includes('linear_potentiometer_1_rear'))
            const rows2 = validData.filter(row => row.name?.includes('linear_potentiometer_2_rear'))
            const rows3 = validData.filter(row => row.name?.includes('wss_left_rear'))
            const rows4 = validData.filter(row => row.name?.includes('wss_right_rear'))
            const displayData = [...rows.slice(0, 1000), ...rows2.slice(0, 1000), ...rows3.slice(0, 1000), ...rows4.slice(0, 1000)];
            const totalRows = validData.length;


            console.log(`Successfully parsed ${totalRows} rows, displaying first ${displayData.length}`);
            return { success: true, csvData: displayData, fileName: file.name, totalRows };
        } catch (error) {
            console.error('Upload error:', error);
            const message = error instanceof Error ? error.message : 'Unknown error occurred';
            return fail(500, { error: true, message });
        }
    }
};
