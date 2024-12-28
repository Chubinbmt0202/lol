'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface UploadDocumentButtonProps {
  onUpload?: (file: File) => void;
}

export const UploadDocumentButton = ({ onUpload }: UploadDocumentButtonProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
      onUpload?.(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      onUpload?.(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <button 
        onClick={() => (window as any).upload_modal.showModal()}
        className="btn btn-outline btn-primary"
      >
        <Upload size={20} />
        Thêm tài liệu
      </button>

      <dialog id="upload_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Tải lên tài liệu</h3>
          
          <div 
            className={`
              border-2 border-dashed rounded-lg p-6
              ${isDragging ? 'border-primary bg-primary/5' : 'border-base-300'}
              ${selectedFile ? 'bg-base-200' : 'hover:bg-base-100'}
              transition-all cursor-pointer
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              id="file-upload"
              accept=".pdf,.doc,.docx,.txt"
            />
            <label 
              htmlFor="file-upload" 
              className="flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              {selectedFile ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm">{selectedFile.name}</span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFile();
                    }}
                    className="btn btn-ghost btn-xs btn-circle"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-primary" />
                  <div className="text-center">
                    <p className="font-medium">Kéo thả file vào đây hoặc</p>
                    <p className="text-sm text-base-content/70">
                      Hỗ trợ PDF, DOC, DOCX, TXT
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-2">
                <button 
                  className="btn btn-ghost"
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                >
                  Huỷ
                </button>
                <button 
                  className="btn btn-primary"
                  disabled={!selectedFile}
                  onClick={() => {
                    if (selectedFile) {
                      onUpload?.(selectedFile);
                      setSelectedFile(null);
                    }
                  }}
                >
                  Tải lên
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};