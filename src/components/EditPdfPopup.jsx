import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import Icon from './Icon';

const EditPdfPopup = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState('');
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const buffer = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer);
    const pageCount = pdfDoc.getPageCount();
    const thumbnails = [];

    for (let i = 0; i < pageCount; i++) {
      const singlePdf = await PDFDocument.create();
      const [copiedPage] = await singlePdf.copyPages(pdfDoc, [i]);
      singlePdf.addPage(copiedPage);
      const blob = new Blob([await singlePdf.save()], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      thumbnails.push({ index: i, url });
    }

    setFile(selectedFile);
    setPages(thumbnails);
    setDownloadLink(null);
    setError('');
  };

  const movePage = (from, to) => {
    const newPages = [...pages];
    const [moved] = newPages.splice(from, 1);
    newPages.splice(to, 0, moved);
    setPages(newPages);
  };

  const deletePage = (index) => {
    const newPages = pages.filter((_, i) => i !== index);
    setPages(newPages);
  };

  const handleDownload = async () => {
    if (!file || pages.length === 0) {
      return setError('No pages to export.');
    }

    const buffer = await file.arrayBuffer();
    const originalPdf = await PDFDocument.load(buffer);
    const newPdf = await PDFDocument.create();

    for (let page of pages) {
      const [copiedPage] = await newPdf.copyPages(originalPdf, [page.index]);
      newPdf.addPage(copiedPage);
    }

    const blob = new Blob([await newPdf.save()], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setDownloadLink({ name: 'edited.pdf', url });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <div className="popup-icon"><Icon type="edit" /></div>
          <h2>Edit PDF</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="popup-body">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          
          {file && (
            <>
              <div className="button-labels">
                <p><strong>🗑️</strong> Delete Page &nbsp;&nbsp; <strong>↑</strong> Move Up &nbsp;&nbsp; <strong>↓</strong> Move Down</p>
              </div>

              <div className="thumbnails-scroll">
                {pages.map((page, index) => (
                  <div key={index} className="thumbnail-item">
                    <embed src={page.url} width="100" height="140" type="application/pdf" />
                    <div className="thumbnail-actions">
                      <button onClick={() => deletePage(index)}>🗑️</button>
                      <button onClick={() => index > 0 && movePage(index, index - 1)}>↑</button>
                      <button onClick={() => index < pages.length - 1 && movePage(index, index + 1)}>↓</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {error && <p className="error-msg">{error}</p>}

          <button className="action-btn" onClick={handleDownload}>Download Edited PDF</button>

          {downloadLink && (
            <a
              className="download-btn"
              href={downloadLink.url}
              download={downloadLink.name}
            >
              Download {downloadLink.name}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPdfPopup;
