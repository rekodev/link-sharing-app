import { Alert, Snackbar } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';

import {
  StyledImageUpload,
  StyledImageUploadWrapper,
  StyledPreImageUploadWrapper,
  StyledUploadedImage,
  StyledCardHeading,
  StyledProfilePictureCard,
  UploadedImageWrapper,
} from './style';
import uploadImageIcon from '../../assets/images/icon-upload-image.svg';
import useUser from '../../hooks/useUser';
import Svg from '../shared/Svg';

type Props = {
  onImageUpload: (image: File) => void;
};

const ImageUploadField = ({ onImageUpload }: Props) => {
  const { user } = useUser();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) return;

    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      const img = new Image();

      img.onload = () => {
        if (img.width <= 1200 && img.height <= 1200) {
          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (!(e.target && e.target.result)) return;

            onImageUpload(file);
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
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleClose = () => setError(false);

  if (!user) return;

  const renderImageUploadField = () => (
    <StyledImageUploadWrapper>
      <StyledImageUpload onClick={triggerFileUpload}>
        {!user.profilePictureUrl ? (
          <StyledPreImageUploadWrapper>
            <img src={uploadImageIcon} alt='Upload Image Icon' />
            <p>+ Upload Image</p>
          </StyledPreImageUploadWrapper>
        ) : (
          <>
            <StyledUploadedImage>
              <img
                src={user.profilePictureUrl}
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
            <Alert
              onClose={handleClose}
              severity='error'
              sx={{ width: '100%' }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        )}
      </StyledImageUpload>
      {/* <p>{profilePictureName}</p> */}
    </StyledImageUploadWrapper>
  );

  return (
    <>
      <h2>Profile Details</h2>
      <p>Add your details to create a personal touch to your profile.</p>
      <StyledProfilePictureCard>
        <StyledCardHeading>Profile picture</StyledCardHeading>
        <UploadedImageWrapper>
          {renderImageUploadField()}
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </UploadedImageWrapper>
      </StyledProfilePictureCard>
    </>
  );
};

export default ImageUploadField;
