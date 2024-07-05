'use client'
import { useState } from 'react';
import axios from 'axios';

const FileUploadForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [conversionResult, setConversionResult] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) return;

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('/api/convert', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setConversionResult(response.data.url);
        } catch (error) {
            console.error('Error during conversion:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-12">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6  shadow-md rounded-md">
                <h1 className="text-xl font-bold mb-4">PDF to AZW3 Converter</h1>
                <input type="file" accept=".pdf" onChange={handleFileChange} className="block w-full p-2 border border-gray-300 rounded-md mb-4" />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    {isLoading ? 'Converting...' : 'Convert'}
                </button>
            </form>
            {conversionResult && (
                <p className="mt-4 text-center">
                    File converted successfully! Download from:{' '}
                    <a href={conversionResult} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        Download
                    </a>
                </p>
            )}
        </div>
    );
};

export default FileUploadForm;
