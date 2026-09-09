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
            const parsed = Papa.parse(fileText, { header: true, dynamicTyping: false });

            if (parsed.errors.length > 0) {
                console.error('CSV parse errors:', parsed.errors);
                return fail(400, { error: true, message: 'Failed to parse CSV file' });
            }

            // Return only first 1000 rows to avoid overwhelming the browser
            const displayData = parsed.data.slice(0, 1000);
            const totalRows = parsed.data.length;

            console.log(`Successfully parsed ${totalRows} rows, displaying first ${displayData.length}`);
            return { success: true, csvData: displayData, fileName: file.name, totalRows };
        } catch (error) {
            console.error('Upload error:', error);
            return fail(500, { error: true, message: `Error: ${error.message}` });
        }
    }
};

