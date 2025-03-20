// Add this line at the very top of your file
"use client";

import { useState } from 'react';
import Tesseract from "tesseract.js";
import { useDropzone } from 'react-dropzone';

export default function OcrUploader() {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async files => {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));

      setLoading(true);
      try {
        const { data } = await Tesseract.recognize(file, "eng+som", {
          logger: (m) => console.log(m), // Optional: shows progress in console
        });

        setText(data.text);
      } catch (error) {
        console.error("OCR Error:", error);
        alert("An error occurred while processing the image.");
      } finally {
        setLoading(false);
      }
    }
  });

  const handleSave = async () => {
    await fetch('/api/ocr', {
      method: 'POST',
      body: JSON.stringify({ text, imageUrl: imagePreview }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600">OCR Text Extractor</h1>
        <p className="text-gray-600 text-lg mt-2">Upload an image and extract the text using OCR.</p>
      </div>

      {/* Dropzone Area */}
      <div 
        {...getRootProps()} 
        className="border-4 border-dashed p-10 text-center mb-6 cursor-pointer rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
      >
        <input {...getInputProps()} />
        <p className="text-gray-700 text-xl font-semibold">Drag or Click to Upload Image</p>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-6 text-center">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="max-w-full max-h-48 mx-auto rounded-lg shadow-lg border-4 border-gray-300"
          />
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="text-blue-600 text-center text-lg font-semibold">Processing Image...</p>}

      {/* OCR Text Preview */}
      {text && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">OCR Result:</h3>
            <button 
              onClick={() => navigator.clipboard.writeText(text)}
              className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Copy
            </button>
          </div>
          <pre className="bg-gray-100 p-6 rounded-lg text-gray-800 max-h-96 overflow-auto">{text}</pre>
        </div>
      )}

      {/* Save Button */}
      {text && (
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save to Database
        </button>
      )}
    </div>
  );
}
