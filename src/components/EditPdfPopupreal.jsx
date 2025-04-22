import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import Icon from "./Icon";

const EditPdfPopup = ({ onClose }) => {
  const [pdfPages, setPdfPages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // Only for preview: render single image thumbnail (fake, until you add full backend logic or Sejda)
    const url = URL.createObjectURL(file);
    setPdfPages([url]); // Just show 1 preview instead of rendering each page
  };

  const handleOpenExternalEditor = () => {
    window.open("https://www.sejda.com/pdf-editor", "_blank");
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box large-scrollable">
        <div className="popup-header">
          <div className="popup-icon">
            <Icon type="edit" />
          </div>
          <h2>Edit PDF</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="popup-body edit-body">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="styled-file-input"
          />

          {selectedFile && (
            <>
              <p className="instruction-text">Preview (first page only):</p>
              <div className="page-thumbnails">
                {pdfPages.map((src, i) => (
                  <iframe
                    key={i}
                    src={src}
                    title={`Page ${i + 1}`}
                    className="thumbnail"
                    style={{ height: "400px", width: "100%", border: "1px solid #ccc" }}
                  />
                ))}
              </div>

              <div className="external-editor-section">
                <p className="note-text">
                  Want to annotate, draw, or add text? Use the full editor:
                </p>
                <button className="action-btn" onClick={handleOpenExternalEditor}>
                  Open in Editor
                </button>
                <p className="small-note">
                  After editing, download the updated PDF and re-upload here if needed.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPdfPopup;
