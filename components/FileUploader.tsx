import React, { ChangeEvent } from 'react';
import axios from 'axios';

interface File {
  id: string;
  name: string;
}

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const uploadedFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        try {
          const response = await axios.post('/api/upload', formData);
          uploadedFiles.push({
            id: response.data.file_id,
            name: files[i].name
          });
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
      onUpload(uploadedFiles);
    }
  };

  return (
    <div className="mb-4">
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
};

export default FileUploader;