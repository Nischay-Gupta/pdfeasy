import React, { useState } from 'react';
import Navbar from './components/NavBar';
import Landing from './components/Landing';
import PasswordPopup from './components/PasswordPopup';
import Dashboard from './components/Dashboard';
import "./index.css"


function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <Navbar />
      {!unlocked ? (
        <>
          <Landing onUnlockClick={() => setShowPopup(true)} />
          {showPopup && (
            <PasswordPopup
              onClose={() => setShowPopup(false)}
              onSuccess={() => setUnlocked(true)}
            />
          )}
        </>
      ) : (
        <Dashboard />
      )}
    </div>
   
  );
}

export default App;
