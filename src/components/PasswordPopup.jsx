import { useState } from 'react';

const PasswordPopup = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkPassword = () => {
    if (password === 'secret123') {
      onSuccess();
    } else {
      setError('Wrong password');
    }
  };

  return (
    <div className="popup">
      <div className="popup-box">
        <h2>Enter password to unlock</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={checkPassword}>Submit</button>
        <p className="link">Don't have the password? <a href="https://your-marketplace-link.com">Buy for $1</a></p>
      </div>
    </div>
  );
};

export default PasswordPopup;
