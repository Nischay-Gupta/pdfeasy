import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Icon from './Icon';

const CompressPdfPopup = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setOriginalSize((selected.size / 1024).toFixed(2));
      setCompressedBlob(null);
      setCompressedSize(null);
      setError('');
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Optimize the PDF (simulate compression)
    const copied = await PDFDocument.create();
    const pages = await copied.copyPages(pdfDoc, pdfDoc.getPageIndices());
    pages.forEach(p => copied.addPage(p));
    const compressedData = await copied.save();
    const compressedBlobData = new Blob([compressedData], { type: 'application/pdf' });

    setCompressedBlob(compressedBlobData);
    setCompressedSize((compressedBlobData.size / 1024).toFixed(2));
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <div className="popup-icon"><Icon type="compress" /></div>
          <h2>Compress PDF</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <p className="beta-warning">⚠️ This feature is in beta. Compression may not significantly reduce file size.</p>
        <div className="popup-body">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          {originalSize && <p>Original Size: {originalSize} KB</p>}
          {error && <p className="error-msg">{error}</p>}

          <button className="action-btn" onClick={handleCompress}>Compress</button>

          {compressedBlob && (
            <div className="download-links">
              <p>Compressed Size: {compressedSize} KB</p>
              <a
                className="download-btn"
                href={URL.createObjectURL(compressedBlob)}
                download="compressed.pdf"
              >
                Download Compressed PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompressPdfPopup;
