import {
  StyledImageUpload,
  StyledPreImageUploadWrapper,
  StyledUploadedImage,
} from './style';
import uploadImageIcon from '../../assets/images/icon-upload-image.svg';
import { useRef, useState } from 'react';

const ImageUpload = () => {
  const [imageData, setImageData] = useState<string | undefined>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        setImageData(e.target.result as string);
      }
    };

    reader.readAsDataURL(file);
  };

  const triggerFileUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <StyledImageUpload onClick={triggerFileUpload}>
      {!imageData ? (
        <StyledPreImageUploadWrapper>
          <img src={uploadImageIcon} alt='Upload Image Icon' />
          <p>+ Upload Image</p>
        </StyledPreImageUploadWrapper>
      ) : (
        <StyledUploadedImage>
          <img src={imageData} className='uploaded-image' alt='' />
        </StyledUploadedImage>
      )}

      <input type='file' ref={inputRef} onChange={handleFileChange} />
    </StyledImageUpload>
  );
};

export default ImageUpload;
