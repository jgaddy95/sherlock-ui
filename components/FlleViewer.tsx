import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileNode } from '../types';

interface FileViewerProps {
  file: FileNode;
  content: string;
  onBack: () => void;
}

const FileViewer: React.FC<FileViewerProps> = ({ file, content, onBack }) => {
  const getLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js': return 'javascript';
      case 'py': return 'python';
      case 'html': return 'html';
      case 'css': return 'css';
      case 'json': return 'json';
      // Add more cases for other file types as needed
      default: return 'text';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-800 text-gray-200">
      <div className="bg-gray-700 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-200">{file.name}</h2>
        <button 
          onClick={onBack}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Back to Chat
        </button>
      </div>
      <div className="flex-grow overflow-auto p-4">
        <SyntaxHighlighter 
          language={getLanguage(file.name)}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            backgroundColor: 'transparent',
            borderRadius: '0.375rem',
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default FileViewer;