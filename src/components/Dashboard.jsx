import ToolCard from './ToolCard';
import Icon from './Icon';
import { useState } from 'react';
import MergePDF from './MergePDF';
import SplitPDF from './SplitPDF';
import CompressPDF from './CompressPdfPopup';
import ConvertPDF from './ConvertPdfPopup';
import EditPdfPopup from './EditPdfPopup';
import ComingSoonPopup from './ComingSoonPopup';
import "../index.css";

const tools = [
  { name: 'Merge PDF', icon: 'merge' },
  { name: 'Split PDF', icon: 'split' },
  { name: 'Compress PDF', icon: 'compress' },
  { name: 'Convert PDF', icon: 'convert' },
  { name: 'Edit PDF', icon: 'edit' },
  { name: 'Organize', icon: 'organize' },
  { name: 'Protect PDF', icon: 'protect' },
  { name: 'Unlock PDF', icon: 'unlock' },
  { name: 'Sign PDF', icon: 'sign' },
  { name: 'Request Signatures', icon: 'request' }
];

const Dashboard = () => {
  const [activeTool, setActiveTool] = useState(null);

  const closePopup = () => setActiveTool(null);

  const renderPopup = () => {
    switch (activeTool) {
      case 'Merge PDF':
        return <MergePDF onClose={closePopup} />;
      case 'Split PDF':
        return <SplitPDF onClose={closePopup} />;
      case 'Compress PDF':
        return <CompressPDF onClose={closePopup} />;
      case 'Convert PDF':
        return <ConvertPDF onClose={closePopup} />;
      case 'Edit PDF':
        return <EditPdfPopup onClose={closePopup} />;
      case 'Organize':
        return <EditPdfPopup onClose={closePopup} />;
      default:
        return <ComingSoonPopup onClose={closePopup} />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h2 className="tool-title">PDF Tool Kit</h2>
        <div className="grid">
          {tools.map((tool, i) => (
            <ToolCard
              key={i}
              name={tool.name}
              icon={<Icon type={tool.icon} />}
              onClick={() => setActiveTool(tool.name)}
            />
          ))}
        </div>
      </div>
      {activeTool && renderPopup()}
    </div>
  );
};

export default Dashboard;
