import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Icon from './Icon';

const SplitPdfPopup = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [file, setFile] = useState(null);
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [error, setError] = useState('');
  const [downloadLinks, setDownloadLinks] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setDownloadLinks([]);
  };

  const handleSplit = async () => {
    if (!file) return setError('Please select a PDF file.');
    setError('');
    setDownloadLinks([]);

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    if (selectedOption === 'range') {
      const start = parseInt(startPage);
      const end = parseInt(endPage);

      if (
        isNaN(start) || isNaN(end) ||
        start < 1 || end > pdfDoc.getPageCount() ||
        start > end
      ) {
        return setError('Invalid page range.');
      }

      const newPdf = await PDFDocument.create();
      for (let i = start - 1; i < end; i++) {
        const [page] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(page);
      }
      const blob = new Blob([await newPdf.save()], { type: 'application/pdf' });
      setDownloadLinks([{ name: `split_pages_${start}-${end}.pdf`, blob }]);
    }

    if (selectedOption === 'separate') {
      const count = pdfDoc.getPageCount();
      const links = [];

      for (let i = 0; i < count; i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(page);
        const blob = new Blob([await newPdf.save()], { type: 'application/pdf' });
        links.push({ name: `page_${i + 1}.pdf`, blob });
      }

      setDownloadLinks(links);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <div className="popup-icon"><Icon type="split" /></div>
          <h2>Split PDF</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        

        <div className="split-options">

          <div
            className={`split-btn ${selectedOption === 'range' ? 'active' : ''}`}
            onClick={() => setSelectedOption('range')}
            onMouseEnter={() => setHovered('range')}
            onMouseLeave={() => setHovered(null)}
          >
            Split by Page Range
          </div>
          <div
            className={`split-btn ${selectedOption === 'separate' ? 'active' : ''}`}
            onClick={() => setSelectedOption('separate')}
            onMouseEnter={() => setHovered('separate')}
            onMouseLeave={() => setHovered(null)}
          >
            Split Each Page
          </div>
        </div>

        <div className="hover-info">
          {hovered === 'range' && <p>Extract a specific range of pages</p>}
          {hovered === 'separate' && <p>Split every page into its own PDF</p>}
        </div>

        <div className="popup-body">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />

          {selectedOption === 'range' && (
            <div className="range-inputs">
              <div>
                <label>Start Page</label>
                <input
                  type="number"
                  value={startPage}
                  onChange={(e) => setStartPage(e.target.value)}
                  placeholder="e.g. 2"
                />
              </div>
              <div>
                <label>End Page</label>
                <input
                  type="number"
                  value={endPage}
                  onChange={(e) => setEndPage(e.target.value)}
                  placeholder="e.g. 5"
                />
              </div>
            </div>
          )}

          {error && <p className="error-msg">{error}</p>}

          <button className="action-btn" onClick={handleSplit}>Split PDF</button>

          {downloadLinks.length > 0 && (
            <div className="download-links">
              {downloadLinks.map((link, i) => (
                <a
                  key={i}
                  className="download-btn"
                  href={URL.createObjectURL(link.blob)}
                  download={link.name}
                >
                  Download {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplitPdfPopup;
