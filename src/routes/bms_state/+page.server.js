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

            if (parsed.errors.length > 0) {
                console.warn('CSV parse warnings (skipping malformed rows):', parsed.errors.length);
            }

            const validData = parsed.data.filter(row => 
                Object.values(row).some(v => v !== null && v !== '' && v !== undefined)
            );

            const rows = validData.filter(row => row.name?.includes('bms_state'))
            const displayData = rows.slice(0, 3000);
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

