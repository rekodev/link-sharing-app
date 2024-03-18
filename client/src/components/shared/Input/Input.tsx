import { ChangeEvent } from 'react';

import {
  StyledErrorText,
  StyledImage,
  StyledInput,
  StyledInputFieldWrapper,
  StyledInputWrapper,
  StyledLabel,
} from './style';

type Props = {
  placeholder?: string;
  id: string;
  label?: string;
  name: string;
  type: 'text' | 'email' | 'number' | 'password';
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: boolean;
  errorText?: string;
  imgSrc?: string;
  imgName?: string;
  initialStyle?: boolean;
};

const Input = ({
  placeholder,
  id,
  name,
  required,
  label,
  onChange,
  value,
  error,
  errorText,
  type,
  imgSrc,
  imgName,
  initialStyle,
}: Props) => {
  return (
    <StyledInputWrapper $initialStyle={!!initialStyle}>
      {label && (
        <StyledLabel $initialStyle={!!initialStyle} id={`label-${id}`}>
          {label}
        </StyledLabel>
      )}
      <StyledInputFieldWrapper $initialStyle={!!initialStyle}>
        {imgSrc && <StyledImage src={imgSrc} alt={imgName} />}
        <StyledInput
          aria-labelledby={`label-${id}`}
          type={type}
          placeholder={placeholder}
          id={id}
          name={name}
          required={required}
          onChange={onChange}
          value={value}
          $hasValue={!!value}
          $hasError={!!error}
          $hasImage={!!imgSrc}
        />
      </StyledInputFieldWrapper>
      {error && (type === 'text' || type === 'email') && !value ? (
        <StyledErrorText $initialStyle={!!initialStyle}>
          Can't be empty
        </StyledErrorText>
      ) : (
        error && (
          <StyledErrorText $initialStyle={!!initialStyle}>
            {errorText}
          </StyledErrorText>
        )
      )}
    </StyledInputWrapper>
  );
};

export default Input;
