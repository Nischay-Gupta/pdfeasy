import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import Icon from "./Icon";

const LockPdfPopup = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError("");
    setDownloadUrl(null);
  };

  const handleLock = async () => {
    if (!selectedFile || !password) {
      setError("Please select a file and enter a password.");
      return;
    }

    try {
      const fileBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBuffer);

      await pdfDoc.encrypt({
        userPassword: password,
        ownerPassword: password,
        permissions: {
          printing: "highResolution",
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: false,
          contentAccessibility: false,
          documentAssembly: false,
        },
      });

      const lockedPdfBytes = await pdfDoc.save();
      const blob = new Blob([lockedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Failed to lock PDF.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <div className="popup-icon">
            <Icon type="lock" />
          </div>
          <h2>Lock PDF</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="popup-body">
          <input
            type="file"
            accept="application/pdf"
            className="styled-file-input"
            onChange={handleFileChange}
          />

          <input
            type="password"
            placeholder="Enter password"
            className="styled-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="action-btn" onClick={handleLock}>
            Lock PDF
          </button>

          {error && <p className="error-text">{error}</p>}

          {downloadUrl && (
            <a href={downloadUrl} download="locked.pdf" className="action-btn">
              Download Locked PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default LockPdfPopup;
