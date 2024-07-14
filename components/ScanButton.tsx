import React from 'react';

interface ScanButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const ScanButton: React.FC<ScanButtonProps> = ({ onClick, disabled }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Scan Selected File
    </button>
  );
};

export default ScanButton;