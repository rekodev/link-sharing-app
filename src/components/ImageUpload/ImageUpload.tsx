import { StyledImageUpload } from './style';
import uploadImageIcon from '../../assets/images/icon-upload-image.svg';

const ImageUpload = () => {
  return (
    <StyledImageUpload>
      <img src={uploadImageIcon} alt='Upload Image Icon' />
      <p>+ Upload Image</p>
    </StyledImageUpload>
  );
};

export default ImageUpload;
