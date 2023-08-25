import Svg from '../Svg';
import { StyledButton } from './style';

interface IButtonProps {
  imgSrc?: string;
  text: string;
  variant?: 'outlined' | 'contained' | 'text';
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  onClick?: () => void;
  active?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
  imgSrc,
  text,
  variant,
  hideOnMobile,
  hideOnTablet,
  onClick,
  active,
  type,
}: IButtonProps) => {
  return (
    <StyledButton
      $hideOnMobile={hideOnMobile}
      $hideOnTablet={hideOnTablet}
      $active={active}
      variant={variant}
      onClick={onClick}
      type={type}
    >
      <span className='hideOnTablet'>{imgSrc && <Svg url={imgSrc} />}</span>
      <span className='hideOnMobile'>{text}</span>
    </StyledButton>
  );
};

export default Button;
