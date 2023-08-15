import Svg from '../Svg';
import { StyledButton } from './style';

interface IButtonProps {
  imgSrc?: string;
  text: string;
  variant?: 'outlined' | 'contained' | 'text';
  hideOnMobile?: boolean;
  onClick?: () => void;
}

const Button = ({
  imgSrc,
  text,
  variant,
  hideOnMobile,
  onClick,
}: IButtonProps) => {
  return (
    <StyledButton
      $hideOnMobile={hideOnMobile}
      variant={variant}
      onClick={onClick}
    >
      {imgSrc && <Svg url={imgSrc} />}
      <span className='hideOnMobile'>{text}</span>
    </StyledButton>
  );
};

export default Button;
