// MergePopup.jsx
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Icon from './Icon';

const MergePopup = ({ onClose }) => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [error, setError] = useState('');
  const [mergedPdfUrl, setMergedPdfUrl] = useState('');

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
    setError('');
    setMergedPdfUrl('');
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
    setError('');
    setMergedPdfUrl('');
  };

  const mergePDFs = async () => {
    if (!file1 || !file2) {
      setError('Please select two PDF files to merge.');
      return;
    }

    const mergedPdf = await PDFDocument.create();

    const files = [file1, file2];
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setMergedPdfUrl(url);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <div className="popup-title">
            <div className="popup-icon"><Icon type="merge" /></div>
            <h2>Merge PDFs</h2>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="popup-body">
          <label className="file-label">Select First PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFile1Change}
            className="file-input"
          />

          <label className="file-label">Select Second PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFile2Change}
            className="file-input"
          />

          {error && <p className="error-msg">{error}</p>}

          <button className="action-btn" onClick={mergePDFs}>Merge PDFs</button>

          {mergedPdfUrl && (
            <a href={mergedPdfUrl} download="merged.pdf" className="download-btn">Download Merged PDF</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MergePopup;
