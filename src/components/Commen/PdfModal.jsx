import React from "react";

export function PdfModal({ pdfUrl, onClose }) {
  const isLocalhost = pdfUrl.includes("localhost") || pdfUrl.includes("127.0.0.1");
  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">PDF Viewer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            ✕
          </button>
        </div>
        
        {!isLocalhost ? (
          <iframe
            src={googleViewerUrl}
            className="w-full h-full bg-white"
            frameBorder="0"
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <p className="mb-4 text-red-500">PDF preview not supported for local files.</p>
            <a
              href={pdfUrl}
              download
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
