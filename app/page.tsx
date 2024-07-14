'use client'
import React, { useState } from 'react';
import { ChatStateProvider } from '../contexts/ChatStateContext';
import ResizableSidebar from '../components/ResizableSidebar';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import FileViewer from '../components/FlleViewer';
import { Project, FileNode } from '../types';
import axios from 'axios';

const Home: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [scannedProjectContent, setScannedProjectContent] = useState<string | null>(null);

  const handleProjectUpload = (newProject: Project) => {
    setProject(newProject);
  };

  const handleScan = async () => {
    if (!project) return;
    // This function is kept for backwards compatibility, but you may remove it if it's no longer needed
    console.log(`Scanning project: ${project.name}`);
  };

  const handleFileSelect = async (file: FileNode) => {
    if (file.type === 'file' && project) {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/file/${project.id}/${file.name}`);
        setFileContent(response.data.content);
        setSelectedFile(file);
      } catch (error) {
        console.error('Error fetching file content:', error);
      }
    }
  };

  const handleBackToChat = () => {
    setSelectedFile(null);
    setFileContent('');
  };

  const handleProjectScan = (formattedContent: string) => {
    setScannedProjectContent(formattedContent);
    // Here you might want to update the chat context with the scanned project data
    // For example, you could pass this to the ChatInterface component
  };

  return (
    <ChatStateProvider>
      <div className="flex h-screen bg-custom-beige-100">
        <ResizableSidebar minWidth={200} maxWidth={400} defaultWidth={250}>
          <Sidebar 
            project={project}
            onProjectUpload={handleProjectUpload}
            onScan={handleScan}
            onFileSelect={handleFileSelect}
            onProjectScan={handleProjectScan}
          />
        </ResizableSidebar>
        <div className="flex-grow flex">
          {selectedFile ? (
            <FileViewer 
              file={selectedFile}
              content={fileContent}
              onBack={handleBackToChat}
            />
          ) : (
            <ChatInterface scannedProjectContent={scannedProjectContent} />
          )}
        </div>
      </div>
    </ChatStateProvider>
  );
};

export default Home;