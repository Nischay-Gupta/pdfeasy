// src/components/Icon.jsx
const icons = {
    merge: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M14 2v5h5" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="15" y2="14" />
      </svg>
      
    ),
    split: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3498db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h8v8H4zM12 4h8v8h-8zM4 12h8v8H4zM12 12h8v8h-8z" />
      </svg>
      
    ),
    compress: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M3 12h18M3 18h18" />
        <path d="M8 6v12M16 6v12" />
      </svg>
      
    ),
    convert: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <polyline points="20 17 14 11 20 5" />
      </svg>
      
      
      ),
      edit: (
    
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
      
      ),
      annotate: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2980b9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16 4l4 4L8 20H4v-4L16 4z" />
      </svg>
      
      
      ),
      organize: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34495e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
      
      
      ),
      protect: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f39c12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      
      
      ),
      unlock: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8e44ad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V9a5 5 0 0 1 9.9-1" />
      </svg>
      
      
      
      ),
      sign: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1abc9c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M12 19l7-7 3 3-7 7H12z" />
  <path d="M18 13l-2-2" />
</svg>

      
      
      ),
      request: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9b59b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
  <circle cx="12" cy="7" r="4" />
  <path d="M22 12h-4m0 0v-4m0 4v4" />
</svg>

      
      
      ),

  };
  
  const Icon = ({ type }) => {
    return <div className="tool-icon">{icons[type]}</div>;
  };
  
  export default Icon;
  