import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { NextApiResponse as ExpressResponse } from 'next';
import { Request } from 'express';

const CLOUDCONVERT_API_KEY = 'YOUR_CLOUDCONVERT_API_KEY';

type NextApiRequestWithFormData = NextApiRequest & Request & {
    files?: any[]; // Optional property for multer files handling
};

// Multer configuration
const upload = multer({
    dest: './public/uploads', // Destination folder for uploaded files
});

// API handler
export default async function handler(req: NextApiRequestWithFormData, res: NextApiResponse<any>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Multer middleware to handle file upload
    upload.single('file')(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: 'Error uploading file' });
        } else if (err) {
            return res.status(500).json({ message: 'Unknown error uploading file' });
        }

        try {
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const formData = new FormData();
            formData.append('file', fs.createReadStream(file.path));
            formData.append('inputformat', 'pdf');
            formData.append('outputformat', 'azw3');

            const response = await axios.post('https://api.cloudconvert.com/v2/jobs', {
                tasks: {
                    'import-1': {
                        operation: 'import/upload'
                    },
                    'convert-1': {
                        operation: 'convert',
                        input: 'import-1',
                        input_format: 'pdf',
                        output_format: 'azw3'
                    },
                    'export-1': {
                        operation: 'export/url',
                        input: 'convert-1',
                        inline: false,
                        archive_multiple_files: false
                    }
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${CLOUDCONVERT_API_KEY}`,
                    ...formData.getHeaders()
                }
            });

            const importTaskId = response.data.data.tasks['import-1'].id;
            const uploadUrl = response.data.data.tasks['import-1'].result.form.url;

            await axios.post(uploadUrl, formData, {
                headers: formData.getHeaders()
            });

            let jobCompleted = false;
            let exportUrl = '';

            while (!jobCompleted) {
                const jobResponse = await axios.get(`https://api.cloudconvert.com/v2/jobs/${response.data.data.id}`, {
                    headers: {
                        'Authorization': `Bearer ${CLOUDCONVERT_API_KEY}`
                    }
                });

                const job = jobResponse.data.data;
                const exportTask = job.tasks.find((task: any) => task.name === 'export-1');

                if (exportTask && exportTask.status === 'finished') {
                    jobCompleted = true;
                    exportUrl = exportTask.result.files[0].url;
                } else {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }

            res.status(200).json({ url: exportUrl });
        } catch (error) {
            console.error('Error during conversion:', error);
            res.status(500).json({ message: 'Error during conversion' });
        }
    });
}
