import React, { useState } from 'react';
import axios from 'axios';
import { Project, FileNode } from '../types';
import ScanProjectButton from './ScanProjectButton';


interface SidebarProps {
  project: Project | null;
  onProjectUpload: (project: Project) => void;
  onScan: () => void;
  onFileSelect: (file: FileNode) => void;
  onProjectScan: (formattedContent: string) => void;
}

const FileTree: React.FC<{ node: FileNode, depth: number, onSelect: (file: FileNode) => void }> = ({ node, depth, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const indent = depth * 20;

  if (node.type === 'file') {
    return (
      <div 
        className="flex items-center p-1 hover:bg-custom-beige-300 cursor-pointer"
        style={{ paddingLeft: `${indent + 20}px` }}
        onClick={() => onSelect(node)}
      >
        <span className="truncate">{node.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div 
        className="flex items-center cursor-pointer hover:bg-custom-beige-300 p-1"
        style={{ paddingLeft: `${indent}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2">{isOpen ? '▼' : '▶'}</span>
        <span className="truncate">{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTree key={`${node.name}-${index}`} node={child} depth={depth + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ project, onProjectUpload, onScan, onFileSelect, onProjectScan }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [projectName, setProjectName] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('project', files[i]);
      }

      try {
        const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const uploadedProject: Project = {
          id: response.data.project_id,
          name: response.data.structure.name,
          fileCount: response.data.file_count,
          structure: response.data.structure
        };

        setProjectName(uploadedProject.name);
        onProjectUpload(uploadedProject);
      } catch (error) {
        console.error('Error uploading project:', error);
      }
    }
  };

  const handleRename = () => {
    setIsRenaming(true);
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRenaming(false);
    if (project && projectName.trim() !== '') {
      onProjectUpload({ ...project, name: projectName.trim() });
    }
  };

  return (
    <div className="h-full bg-custom-beige-200 p-4 flex flex-col overflow-hidden">
      {project ? (
        <>
          {isRenaming ? (
            <form onSubmit={handleRenameSubmit} className="mb-4">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full p-1 bg-custom-beige-100 text-custom-brown"
                autoFocus
              />
            </form>
          ) : (
            <h2 
              className="text-xl font-bold mb-4 text-custom-brown cursor-pointer hover:underline"
              onClick={handleRename}
            >
              {project.name}
            </h2>
          )}
          <div className="mb-4 overflow-auto flex-grow">
            <FileTree node={project.structure} depth={0} onSelect={onFileSelect} />
          </div>
          <ScanProjectButton
            projectId={project.id}
            onScanComplete={onProjectScan}
          />
        </>
      ) : (
        <div>
          <input
            type="file"
            webkitdirectory=""
            directory=""
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="folder-upload"
          />
          <label 
            htmlFor="folder-upload"
            className="bg-custom-brown hover:bg-custom-beige-300 text-custom-beige-100 font-bold py-2 px-4 rounded cursor-pointer block text-center transition duration-300 ease-in-out"
          >
            Upload Project
          </label>
        </div>
      )}
    </div>
  );
};

export default Sidebar;