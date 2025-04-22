import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Icon from './Icon';

const ConvertPdfPopup = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [files, setFiles] = useState([]);
  const [downloadLink, setDownloadLink] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setDownloadLink('');
    setError('');
  };

  const handleConvertToPdf = async () => {
    if (!files.length) return setError('Please select image files.');
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const image = file.type === 'image/png'
          ? await pdfDoc.embedPng(bytes)
          : await pdfDoc.embedJpg(bytes);

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setDownloadLink(URL.createObjectURL(blob));
    } catch (err) {
      setError('Failed to convert. Try different files.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <div className="popup-icon"><Icon type="convert" /></div>
          <h2>Convert PDF</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="split-options">
          <div
            className={`split-btn ${selectedOption === 'others' ? 'active' : ''}`}
            onClick={() => setSelectedOption('others')}
            onMouseEnter={() => setHovered('others')}
            onMouseLeave={() => setHovered(null)}
          >
            Others to PDF
          </div>
          <div
            className={`split-btn ${selectedOption === 'pdf' ? 'active' : ''}`}
            onClick={() => setSelectedOption('pdf')}
            onMouseEnter={() => setHovered('pdf')}
            onMouseLeave={() => setHovered(null)}
          >
            PDF to Others
          </div>
        </div>

        <div className="hover-info">
          {hovered === 'others' && <p>Select images to create a PDF</p>}
          {hovered === 'pdf' && <p>Convert PDF pages to images (Coming Soon)</p>}
        </div>

        <div className="popup-body">
          {selectedOption === 'others' && (
            <>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              {error && <p className="error-msg">{error}</p>}
              <button className="action-btn" onClick={handleConvertToPdf}>Convert to PDF</button>

              {downloadLink && (
                <a
                  href={downloadLink}
                  className="download-btn"
                  download="converted.pdf"
                >
                  Download PDF
                </a>
              )}
            </>
          )}

          {selectedOption === 'pdf' && (
            <p style={{ textAlign: 'center', marginTop: '20px', color: '#777' }}>
              This feature is <b>Coming Soon</b>!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConvertPdfPopup;
