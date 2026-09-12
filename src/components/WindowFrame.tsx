import React, { useState, useRef, useEffect } from 'react';
import { 
  Minus, 
  Square, 
  Copy, 
  X, 
  Maximize2, 
  Minimize2,
  Compass,
  Sparkles,
  Terminal,
  Bookmark,
  Sliders,
  SplitSquareVertical
} from 'lucide-react';
import { AppId, WindowState } from '../types';

interface WindowFrameProps {
  window: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onUpdatePosition: (x: number, y: number) => void;
  onUpdateSize: (width: number, height: number) => void;
  onSnap: (position: 'left' | 'right' | 'full') => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onUpdatePosition,
  onUpdateSize,
  onSnap,
  children
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showSnapMenu, setShowSnapMenu] = useState<boolean>(false);

  const windowRef = useRef<HTMLDivElement>(null);

  const getIcon = (id: AppId) => {
    switch (id) {
      case 'google-navigator': return <Compass className="w-4 h-4 text-[#4cd7f6]" />;
      case 'query-synthesizer': return <Sparkles className="w-4 h-4 text-[#c0c1ff]" />;
      case 'context-switch': return <span className="material-symbols-outlined text-sm text-[#4edea3]">swap_horiz</span>;
      case 'research-notes': return <Bookmark className="w-4 h-4 text-[#c0c1ff]" />;
      case 'terminal': return <Terminal className="w-4 h-4 text-[#4cd7f6]" />;
      case 'settings': return <Sliders className="w-4 h-4 text-[#e1e2ea]" />;
      default: return <Compass className="w-4 h-4 text-[#4cd7f6]" />;
    }
  };

  // Dragging logic
  const handleMouseDownHeader = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    if ((e.target as HTMLElement).closest('button')) return;
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isMaximized) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, globalThis.innerWidth - 100));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, globalThis.innerHeight - 80));
        onUpdatePosition(newX, newY);
      } else if (isResizing && !window.isMaximized) {
        const newWidth = Math.max(380, e.clientX - window.position.x);
        const newHeight = Math.max(280, e.clientY - window.position.y);
        onUpdateSize(newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, window.position, window.isMaximized, onUpdatePosition, onUpdateSize]);

  if (!window.isOpen || window.isMinimized) {
    return null;
  }

  const windowStyle: React.CSSProperties = window.isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)', // above taskbar
        zIndex: window.zIndex,
        borderRadius: 0
      }
    : {
        top: `${window.position.y}px`,
        left: `${window.position.x}px`,
        width: `${window.size.width}px`,
        height: `${window.size.height}px`,
        zIndex: window.zIndex,
        borderRadius: '12px'
      };

  return (
    <div
      ref={windowRef}
      onMouseDown={onFocus}
      style={windowStyle}
      className={`fixed flex flex-col window-glass overflow-hidden shadow-2xl transition-[box-shadow,border-color] duration-150 ${
        isActive ? 'border-[#4cd7f6]/40 shadow-[0_16px_50px_rgba(0,0,0,0.85)]' : 'border-[#272a30] opacity-95'
      }`}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDownHeader}
        onDoubleClick={onToggleMaximize}
        className={`h-10 px-3 flex items-center justify-between select-none cursor-move border-b ${
          isActive ? 'bg-[#191c21] border-[#32353b]' : 'bg-[#111319] border-[#272a30]'
        }`}
      >
        {/* Title info */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            {getIcon(window.id)}
          </div>
          <span className="text-xs font-semibold text-white truncate">
            {window.title}
          </span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-1 shrink-0 relative">
          {/* Snap layouts hover button */}
          <div
            className="relative"
            onMouseEnter={() => setShowSnapMenu(true)}
            onMouseLeave={() => setShowSnapMenu(false)}
          >
            <button
              onClick={() => onSnap('full')}
              className="w-8 h-7 flex items-center justify-center rounded hover:bg-white/10 text-[#908fa0] hover:text-white transition-colors"
              title="Snap layout"
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
            </button>

            {showSnapMenu && (
              <div className="absolute right-0 top-8 w-36 bg-[#1d2025] border border-[#32353b] rounded-lg p-1.5 shadow-2xl z-50 flex flex-col gap-1 text-[11px] font-mono-code">
                <button
                  onClick={() => {
                    onSnap('left');
                    setShowSnapMenu(false);
                  }}
                  className="flex items-center gap-1.5 p-1 rounded hover:bg-[#272a30] text-left text-white"
                >
                  <span className="w-3 h-3 bg-[#4cd7f6] rounded-xs"></span>
                  <span>Snap Left</span>
                </button>
                <button
                  onClick={() => {
                    onSnap('right');
                    setShowSnapMenu(false);
                  }}
                  className="flex items-center gap-1.5 p-1 rounded hover:bg-[#272a30] text-left text-white"
                >
                  <span className="w-3 h-3 bg-[#c0c1ff] rounded-xs"></span>
                  <span>Snap Right</span>
                </button>
                <button
                  onClick={() => {
                    onSnap('full');
                    setShowSnapMenu(false);
                  }}
                  className="flex items-center gap-1.5 p-1 rounded hover:bg-[#272a30] text-left text-white"
                >
                  <span className="w-3 h-3 bg-[#4edea3] rounded-xs"></span>
                  <span>Full Screen</span>
                </button>
              </div>
            )}
          </div>

          {/* Minimize */}
          <button
            onClick={onMinimize}
            className="w-8 h-7 flex items-center justify-center rounded hover:bg-white/10 text-[#908fa0] hover:text-white transition-colors"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize/Restore */}
          <button
            onClick={onToggleMaximize}
            className="w-8 h-7 flex items-center justify-center rounded hover:bg-white/10 text-[#908fa0] hover:text-white transition-colors"
            title={window.isMaximized ? 'Restore' : 'Maximize'}
          >
            {window.isMaximized ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Square className="w-3 h-3" />
            )}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-8 h-7 flex items-center justify-center rounded hover:bg-[#93000a] text-[#908fa0] hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>

      {/* Corner Resize Handle */}
      {!window.isMaximized && (
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsResizing(true);
          }}
          className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize z-30"
        />
      )}
    </div>
  );
};
