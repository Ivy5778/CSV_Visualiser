import {fail} from '@sveltejs/kit';

export const actions = {
    upload: async ({ request }) => {
        const data = await request.formData();
        const file = data.get('csvFile');

        if (!(file instanceof File) || file.size === 0 || !file.name.toLowerCase().endsWith('.csv')) {
            return fail(400, { error: true });
        }


        console.log(file);

        return { success: true };
    }
};

