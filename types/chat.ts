export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;  // This can now be HTML for assistant messages
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  scannedProjectContent: string | null;
}