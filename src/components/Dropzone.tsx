import axios from 'axios';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type TProps = {
  onUpload: (image: string) => void;
};
const Dropzone: React.FC<TProps> = ({ onUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const formData = new FormData();
      formData.append('image', acceptedFiles[0]);
      axios
        .post('/api/v1/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => onUpload(res.data?.metadata?.url || ''));
    },
    [onUpload],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': [],
    },
  });

  return (
    <div
      {...getRootProps({
        className: 'dropzone',
        'data-dragging': isDragActive,
      })}
    >
      <input {...getInputProps()} />
      <p>Drop the files here ...</p>
    </div>
  );
};

export default Dropzone;
