import { CircularProgress } from '@mui/material';

import { StyledButton } from './style';
import Svg from '../Svg';

type Props = {
  imgSrc?: string;
  text: string;
  variant?: 'outlined' | 'contained' | 'text';
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (arg?: any) => void | Promise<void>;
  active?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  isLoading?: boolean;
};

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
}: Props) => {
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
