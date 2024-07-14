import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './Sidebar';  // Import your existing Sidebar component

interface ResizableSidebarProps {
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  children: React.ReactNode;
}

const ResizableSidebar: React.FC<ResizableSidebarProps> = ({
  minWidth = 200,
  maxWidth = 600,
  defaultWidth = 250,
  children
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        const newWidth = mouseMoveEvent.clientX;
        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing, minWidth, maxWidth]
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className="flex h-full">
      <div style={{ width: sidebarWidth }} className="flex-shrink-0">
        {children}
      </div>
      <div
        className="w-1 bg-custom-beige-300 cursor-col-resize"
        onMouseDown={startResizing}
      />
    </div>
  );
};

export default ResizableSidebar;