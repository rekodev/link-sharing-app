import { useContext, useRef, useState } from 'react';
import uploadImageIcon from '../../assets/images/icon-upload-image.svg';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import { ProfilePictureContext } from '../../contexts/profilePictureContext';
import {
  StyledImageUpload,
  StyledPreImageUploadWrapper,
  StyledUploadedImage,
} from './style';
import { Snackbar, Alert } from '@mui/material';
import Svg from '../Svg';

const ImageUpload = () => {
  const { profileDetails } = useContext(ProfileDetailsContext);

  const [imageData, setImageData] = useState<string | undefined>(
    profileDetails.profilePicture
  );

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setProfilePictureData } = useContext(ProfilePictureContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      return;
    }

    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      const img = new Image();

      img.onload = () => {
        if (img.width <= 1200 && img.height <= 1200) {
          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
              setImageData(e.target.result as string);
              setProfilePictureData(e.target.result as string);
            }
          };

          reader.readAsDataURL(file);
        } else {
          setError(true);
          setErrorMessage('Image dimensions are too large');
        }
      };

      img.onerror = () => {
        setError(true);
        setErrorMessage('Invalid image');
      };

      img.src = URL.createObjectURL(file);
    } else {
      setError(true);
      setErrorMessage('Invalid file type');
    }
  };

  const triggerFileUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleClose = () => {
    setError(false);
  };

  return (
    <StyledImageUpload onClick={triggerFileUpload}>
      {!imageData ? (
        <StyledPreImageUploadWrapper>
          <img src={uploadImageIcon} alt='Upload Image Icon' />
          <p>+ Upload Image</p>
        </StyledPreImageUploadWrapper>
      ) : (
        <>
          <StyledUploadedImage>
            <img
              src={imageData}
              className='uploaded-image'
              alt='Profile Picture'
            />
          </StyledUploadedImage>
          <StyledPreImageUploadWrapper className='image-wrapper'>
            <Svg url={uploadImageIcon} />
            <p>Change Image</p>
          </StyledPreImageUploadWrapper>
        </>
      )}

      <input type='file' ref={inputRef} onChange={handleFileChange} />

      {error && (
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </StyledImageUpload>
  );
};

export default ImageUpload;
