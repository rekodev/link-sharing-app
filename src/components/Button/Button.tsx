import Svg from '../Svg';
import { StyledButton } from './style';

interface IButtonProps {
  imgSrc?: string;
  text: string;
  variant?: 'outlined' | 'contained' | 'text';
  hideOnMobile?: boolean;
  onClick?: () => void;
  active?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
  imgSrc,
  text,
  variant,
  hideOnMobile,
  onClick,
  active,
  type,
}: IButtonProps) => {
  return (
    <StyledButton
      $hideOnMobile={hideOnMobile}
      $active={active}
      variant={variant}
      onClick={onClick}
      type={type}
    >
      {imgSrc && <Svg url={imgSrc} />}
      <span className='hideOnMobile'>{text}</span>
    </StyledButton>
  );
};

export default Button;
