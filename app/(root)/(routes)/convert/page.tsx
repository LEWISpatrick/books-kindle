'use client'
import { useState } from 'react';
import axios from 'axios';

const ConvertPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/convert', formData, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response.data);
      setConvertedFile(url);
    } catch (error) {
      console.error('Conversion failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-2xl font-bold mb-4">Convert PDF to AZW3</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleConvert}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!file || loading}
      >
        {loading ? 'Converting...' : 'Convert'}
      </button>
      {convertedFile && (
        <a
          href={convertedFile}
          download="converted.azw3"
          className="mt-4 text-blue-500"
        >
          Download Converted File
        </a>
      )}
    </div>
  );
};

export default ConvertPage;
