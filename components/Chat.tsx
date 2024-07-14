'use client';

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatInterface from '../components/ChatInterface'
import { Project } from '../types'

export default function Home() {
  const [project, setProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);

  const handleProjectUpload = (newProject: Project) => {
    setProject(newProject);
  };

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: message }]);

    // TODO: Send message to LLM API
    // For now, we'll just echo the message
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: `You said: ${message}` }]);
    }, 1000);
  };

  const handleScan = async () => {
    if (!project) return;

    // TODO: Implement project scanning logic
    setMessages(prev => [...prev, { role: 'assistant', content: `Scanning project: ${project.name}` }]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        project={project}
        onProjectUpload={handleProjectUpload}
        onScan={handleScan}
      />
      <ChatInterface 
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}