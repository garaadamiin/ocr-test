// pages/history.js
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/history')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-blue-500 text-2xl font-bold">OCR Taariikhda</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            ← Dib ugu laabo
          </Link>
        </div>

        {loading ? (
          <div className="text-center">
            <ClipLoader size={30} color="#3B82F6" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">
            Qalad ayaa dhacay: {error}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            {history.length > 0 ? (
              history.map(item => (
                <div key={item.id} className="p-4 border-b last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-gray-500 text-sm mb-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                      <pre className="text-black whitespace-pre-wrap truncate max-w-2xl">
                        {item.text}
                      </pre>
                    </div>
                    {item.imageUrl && (
                      <a
                        href={item.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 ml-4 whitespace-nowrap"
                      >
                        View Image
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Ma jiro taariikh lagu heli karo
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}