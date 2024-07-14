import React, { useState } from 'react';
import axios from 'axios';

interface ScanProjectButtonProps {
  projectId: string;
  onScanComplete: (formattedContent: string) => void;
}

const ScanProjectButton: React.FC<ScanProjectButtonProps> = ({ projectId, onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/scan-project', 
        { project_id: projectId },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Scan response:', response.data);
      onScanComplete(response.data.formatted_content);
    } catch (error) {
      console.error('Error scanning project:', error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <button
      onClick={handleScan}
      disabled={isScanning}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {isScanning ? 'Scanning...' : 'Scan Project'}
    </button>
  );
};

export default ScanProjectButton;