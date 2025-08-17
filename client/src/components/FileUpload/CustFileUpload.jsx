"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { getToastRef, showToast } from '../../utils/ToasterUtils/Toaster';

const CustFileUpload = ({
  allowedFileTypes = [],
  maxSizeInMB = 1,
  onFileSelect = () => {},
  buttonLabel = 'Choose File',
  className = '',
  disabled = false,
  resolution = '',
  currentFile = null,
  value = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const toast = useRef(null);

  const [requiredWidth, requiredHeight] = resolution ? resolution.split('x').map(Number) : [null, null];

  useEffect(() => {
    setSelectedFile(currentFile);
  }, [currentFile]);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(file.type)) {
      const allowedExtensions = allowedFileTypes.map((t) => t.split('/')[1].toUpperCase()).join(', ');
      const msg = `Invalid file type. Allowed types: ${allowedExtensions}`;
      setError(msg);
      setSelectedFile(null);
      showToast(getToastRef(), 'warn', 'warn', msg);
      return;
    }

    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      const msg = `File size exceeds the limit of ${maxSizeInMB}MB`;
      setError(msg);
      setSelectedFile(null);
      showToast(getToastRef(), 'warn', 'warn', msg);
      return;
    }

    if (requiredWidth && requiredHeight && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          const { width, height } = img;
          if (width !== requiredWidth || height !== requiredHeight) {
            const msg = `Invalid resolution. Required: ${requiredWidth}x${requiredHeight}px`;
            setError(msg);
            setSelectedFile(null);
            showToast(getToastRef(), 'warn', 'warn', msg);
          } else {
            setError('');
            setSelectedFile(file);
            onFileSelect(file);
          }
        };
        img.onerror = () => {
          const msg = 'Failed to load image for resolution validation';
          setError(msg);
          setSelectedFile(null);
          showToast(getToastRef(), 'warn', 'warn', msg);
        };
        img.src = URL.createObjectURL(file);
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
          const width = video.videoWidth;
          const height = video.videoHeight;
          if (width !== requiredWidth || height !== requiredHeight) {
            const msg = `Invalid resolution. Required: ${requiredWidth}x${requiredHeight}px`;
            setError(msg);
            setSelectedFile(null);
            showToast(getToastRef(), 'warn', 'warn', msg);
          } else {
            setError('');
            setSelectedFile(file);
            onFileSelect(file);
          }
        };
        video.onerror = () => {
          const msg = 'Failed to load video for resolution validation';
          setError(msg);
          setSelectedFile(null);
          showToast(getToastRef(), 'warn', 'warn', msg);
        };
        video.src = URL.createObjectURL(file);
      }
    } else {
      setError('');
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileSelect(null);
  };

  const handleButtonClick = () => {
    handleRemoveFile();
    fileInputRef.current?.click();
  };

  return (
    <div className={`w-full ${className}`}>
      <Toast ref={toast} position="top-right" />
      <div className="flex w-full items-center">
        <div className={`flex-1 border border-solid border-r-0 rounded-l-md h-11 px-3 flex items-center overflow-hidden bg-white
            ${error ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-700'}
            ${disabled ? 'bg-gray-100' : ''}`}>
          {selectedFile ? (
            <div className="flex items-center justify-between w-full">
              <span className="truncate">{selectedFile?.name}</span>
            </div>
          ) : (
            <span className="text-gray-500">No file chosen</span>
          )}
        </div>

        <Button
          label={buttonLabel}
          icon="pi pi-upload"
          className="p-button-primary rounded-l-none"
          onClick={handleButtonClick}
          disabled={disabled}
        />

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
          accept={allowedFileTypes.join(',')}
        />
      </div>

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default CustFileUpload;
