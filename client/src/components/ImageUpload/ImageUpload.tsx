import { Alert, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useRef, useState } from 'react';

import {
  StyledImageUpload,
  StyledImageUploadWrapper,
  StyledPreImageUploadWrapper,
  StyledUploadedImage,
} from './style';
import uploadImageIcon from '../../assets/images/icon-upload-image.svg';
import { ProfileDetailsContext } from '../../contexts/profileDetailsContext';
import { ProfilePicture } from '../../types/profileDetails';
import Svg from '../Svg';

type Props = {
  imageData: ProfilePicture;
  setImageData: Dispatch<SetStateAction<ProfilePicture>>;
};

const ImageUpload = ({ imageData, setImageData }: Props) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setProfileDetails } = useContext(ProfileDetailsContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log(file);

    if (!file) return;

    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      const img = new Image();

      img.onload = () => {
        if (img.width <= 1200 && img.height <= 1200) {
          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (!(e.target && e.target.result)) return;

            setImageData({ name: file.name, id: e.target.result as string });
            setProfileDetails((prev) => ({
              ...prev,
              profilePicture: {
                id: e.target?.result as string,
                name: file.name,
              },
            }));
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
    <StyledImageUploadWrapper>
      <StyledImageUpload onClick={triggerFileUpload}>
        {!imageData?.id ? (
          <StyledPreImageUploadWrapper>
            <img src={uploadImageIcon} alt='Upload Image Icon' />
            <p>+ Upload Image</p>
          </StyledPreImageUploadWrapper>
        ) : (
          <>
            <StyledUploadedImage>
              <img
                src={imageData.id}
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
      <p>{imageData?.name}</p>
    </StyledImageUploadWrapper>
  );
};

export default ImageUpload;
