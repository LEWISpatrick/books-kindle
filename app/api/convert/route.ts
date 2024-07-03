import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { convertPdfToAzw3 } from '../../../utils/conversion';

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => cb(null, `uploaded-${Date.now()}.pdf`),
  }),
});

export const config = {
  api: {
    bodyParser: false, // Disables the built-in body parser
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Wrap multer middleware with a promise for better error handling
    await new Promise<void>((resolve, reject) => {
      upload.single('file')(req as any, res as any, (err: any) => {
        if (err instanceof multer.MulterError) {
          reject({ status: 400, message: 'File upload error' });
        } else if (err) {
          reject({ status: 500, message: 'Internal server error' });
        } else {
          resolve();
        }
      });
    }).catch((error) => {
      res.status(error.status).json({ message: error.message });
      return;
    });

    const filePath = (req as any).file.path;

    try {
      const convertedFilePath = await convertPdfToAzw3(filePath);

      res.setHeader('Content-Type', 'application/vnd.amazon.ebook');
      res.setHeader('Content-Disposition', 'attachment; filename="converted.azw3"');
      fs.createReadStream(convertedFilePath).pipe(res);
    } catch (error) {
      console.error('Conversion error:', error);
      res.status(500).json({ message: 'Conversion error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
