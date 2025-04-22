import React from "react";
import Icon from "./Icon";

const ComingSoonPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-header">
          <div className="popup-icon">
            <Icon type="lock" />
          </div>
          <h2>Coming Soon</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="popup-body">
          <p className="center-text" style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
            This feature is coming soon.<br />
            Thanks for your support!<br/>
            We will bring it to you as soon as possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPopup;
