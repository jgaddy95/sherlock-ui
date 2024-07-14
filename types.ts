export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

export interface Project {
  id: string;
  name: string;
  fileCount: number;
  structure: FileNode;
}