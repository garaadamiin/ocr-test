// pages/index.js
import Link from 'next/link';
import OcrUploader from '../components/OcrUploader';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">OCR System</h1>
          <Link 
            href="/history" 
            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
          >
            Taariikhda →
          </Link>
        </div>

        {/* OCR Component */}
        <OcrUploader />
      </div>
    </div>
  );
}