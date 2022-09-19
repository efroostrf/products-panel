import { NextPage } from 'next';
import { useState, useRef, useEffect, useMemo, } from 'react';
import { Typography, Stack } from '@mui/material';
import dropImageNull from 'assets/dragAndDrop.png';
import styles from 'styles/DragAndDrop.module.scss';

interface Props {
  onUpload: (file: File, data: string | ArrayBuffer) => void;
  multiple?: boolean;
}

const DragAndDrop: NextPage<Props> = ({ onUpload = function() {}, multiple = false }) => {
  const [preview, setPreview] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef(null);

  const onDragEvent = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === 'dragenter' || event.type === 'dragover') setIsDragActive(true);
    if (event.type === 'dragleave') setIsDragActive(false);
  };

  const onDrop = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setUploadedFiles(event.dataTransfer.files);
    }
  };

  const onBrowse = (event: any): void => {
    event.preventDefault();

    if (event.target.files && event.target.files[0]) {
      setUploadedFiles(event.target.files);
    }
  };

  const onButtonClick = (): void => {
    inputRef.current.click();
  };

  const dropImage = useMemo(() => {
    if (preview) return preview;
    else return dropImageNull.src;
  }, [preview]);

  useEffect(() => {
    if (uploadedFiles && uploadedFiles[0]) {
      let reader = new FileReader();
      
      reader.onload = (event) => {
        setPreview(event.target.result);
        onUpload(uploadedFiles[0], event.target.result);
      };

      reader.readAsDataURL(uploadedFiles[0]);
    }
  }, [uploadedFiles]);

  return (
    <form className={styles.form} onDragEnter={onDragEvent} onClick={onButtonClick}>
      <input ref={inputRef} type="file" multiple={multiple} onChange={onBrowse} accept=".jpg,.jpeg,.png,.gif"/>
      <Stack direction="row" spacing={4} justifyContent="center" alignItems="center">
        <img src={dropImage} width="100" height="100"/>
        <div className={styles.textGroup}>
          <Typography variant="subtitle1">
            Drop file here or click
            <Typography variant="subtitle1" color="#638df3" pl={1}>browse</Typography>
          </Typography>
        </div>
      </Stack>
      { 
        isDragActive && 
        <div 
          className={styles.dropElement}
          onDragEnter={onDragEvent} 
          onDragLeave={onDragEvent}
          onDragOver={onDragEvent} 
          onDrop={onDrop}
        ></div> 
        }
    </form>
  )
}

export default DragAndDrop;
