import { CircularProgress } from '@mui/material';

import { StyledButton } from './style';
import Svg from '../Svg';

interface IButtonProps {
  imgSrc?: string;
  text: string;
  variant?: 'outlined' | 'contained' | 'text';
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  onClick?: () => void;
  active?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isLoading?: boolean;
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
  isLoading,
}: IButtonProps) => {
  return (
    <StyledButton
      $hideOnMobile={hideOnMobile}
      $hideOnTablet={hideOnTablet}
      $active={active}
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={isLoading}
    >
      {isLoading ? (
        <CircularProgress size={24} color='inherit' />
      ) : (
        <>
          <span className='hideOnTablet'>{imgSrc && <Svg url={imgSrc} />}</span>
          <span className='hideOnMobile'>{text}</span>
        </>
      )}
    </StyledButton>
  );
};

export default Button;
