import {fail} from '@sveltejs/kit';
import Papa from 'papaparse';

export const actions = {
    upload: async ({ request }) => {
        const data = await request.formData();
        const file = data.get('csvFile');

        if (!(file instanceof File) || file.size === 0 || !file.name.toLowerCase().endsWith('.csv')) {
            return fail(400, { error: true });
        }

        const fileText = await file.text();
        const parsed = Papa.parse(fileText, { header: true });

        if (parsed.errors.length > 0) {
            return fail(400, { error: true, message: 'Failed to parse CSV' });
        }

        return { success: true, csvData: parsed.data, fileName: file.name };
    }
};

