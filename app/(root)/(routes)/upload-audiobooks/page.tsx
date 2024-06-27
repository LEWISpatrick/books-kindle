'use client'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { BookCategory } from '@prisma/client';

type FormData = {
  title: string;
  author: string;
  narrator: string;
  description: string;
  imageUrl: string;
  downloadLink: string;
  category: BookCategory;
};

export default function UploadBook() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await fetch('/api/upload-audiobooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      router.push('/upload-audiobooks');
    } catch (error) {
      console.error('Error uploading audiobook:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Upload a New audiobook</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input {...register('title', { required: true })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          {errors.title && <span className="text-red-600">Title is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Narrator</label>
          <input {...register('narrator', { required: true })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          {errors.narrator && <span className="text-red-600">narrator is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input {...register('author', { required: true })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          {errors.author && <span className="text-red-600">Author is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea {...register('description')} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input {...register('imageUrl', { required: true })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          {errors.imageUrl && <span className="text-red-600">Image URL is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Download Link</label>
          <input {...register('downloadLink', { required: true })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          {errors.downloadLink && <span className="text-red-600">Download Link is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select {...register('category', { required: true })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            {Object.values(BookCategory).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <span className="text-red-600">Category is required</span>}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md">Upload Book</button>
      </form>
    
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-5">Don't know how to upload an audiobook?</h2>
        <p className="mb-5">Watch the video below:</p>
        <div className="aspect-w-16 aspect-h-9">
          <iframe className="rounded-md" src="https://www.youtube.com/embed/your-video-id" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <p className="mt-5">You can also contact support 'patricklewis2009@gmail.com'.</p>
      </div>

    </div>
  );
}
