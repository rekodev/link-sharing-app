import Svg from '../Svg';
import { StyledButton } from './style';

interface IButtonProps {
  imgSrc?: string;
  text: string;
  variant?: 'outlined' | 'contained' | 'text';
  hideOnMobile?: boolean;
}

const Button = ({ imgSrc, text, variant, hideOnMobile }: IButtonProps) => {
  return (
    <StyledButton $hideOnMobile={hideOnMobile} variant={variant}>
      {imgSrc && <Svg url={imgSrc} />}
      <span className='hideOnMobile'>{text}</span>
    </StyledButton>
  );
};

export default Button;
