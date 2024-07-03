import { exec } from 'child_process';
import path from 'path';

export const convertPdfToAzw3 = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const outputFilePath = filePath.replace('.pdf', '.azw3');
    const command = `ebook-convert ${filePath} ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(outputFilePath);
      }
    });
  });
};
