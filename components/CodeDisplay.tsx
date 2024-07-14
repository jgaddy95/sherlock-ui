import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeDisplayProps {
  code: string;
  language: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, language }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-[#D0B8A8] mb-4">
      <div className="bg-[#DFD3C3] px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-semibold text-[#8D493A]">{language.charAt(0).toUpperCase() + language.slice(1)}</span>
        <span className="text-xs text-[#8D493A]">Syntax highlighting</span>
      </div>
      <SyntaxHighlighter 
        language={language} 
        style={tomorrow}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          backgroundColor: '#F8EDE3',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;