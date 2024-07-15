import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execPromise = promisify(exec);

const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};

const convertPdfToAzw3 = async (pdfPath: string, azw3Path: string) => {
  const command = `/Applications/calibre.app/Contents/MacOS/ebook-convert ${pdfPath} ${azw3Path}`;
  await execPromise(command);
};


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  upload.single('file')(req as any, {} as any, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file' });
    }

    const file = (req as any).file;
    const pdfPath = file.path;
    const azw3Path = path.join('uploads', `${path.parse(file.originalname).name}.azw3`);

    try {
      await convertPdfToAzw3(pdfPath, azw3Path);
      const downloadUrl = `${req.headers.origin}/${azw3Path}`;
      res.status(200).json({ downloadUrl });
    } catch (error) {
      console.error('Error converting file:', error);
      res.status(500).json({ error: 'Error converting file' });
    } finally {
      fs.unlink(pdfPath, (err) => {
        if (err) console.error('Error deleting PDF file:', err);
      });
    }
  });
};

export default handler;
