import {
  StyledErrorText,
  StyledImage,
  StyledInput,
  StyledInputFieldWrapper,
  StyledInputWrapper,
  StyledLabel,
} from './style';

interface IInputProps {
  placeholder?: string;
  id: string;
  label?: string;
  name: string;
  type: 'text' | 'email' | 'number' | 'password';
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: boolean;
  errorText?: string;
  imgSrc?: string;
  imgName?: string;
  initialStyle?: boolean;
}

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
}: IInputProps) => {
  return (
    <StyledInputWrapper $initialStyle={initialStyle ? true : false}>
      {label && (
        <StyledLabel
          $initialStyle={initialStyle ? true : false}
          id={`label-${id}`}
        >
          {label}
        </StyledLabel>
      )}
      <StyledInputFieldWrapper $initialStyle={initialStyle ? true : false}>
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
          $hasValue={value ? true : false}
          $hasError={error ? true : false}
          $hasImage={imgSrc ? true : false}
        />
      </StyledInputFieldWrapper>
      {error && (type === 'text' || type === 'email') && !value ? (
        <StyledErrorText $initialStyle={initialStyle ? true : false}>
          Can't be empty
        </StyledErrorText>
      ) : (
        error && (
          <StyledErrorText $initialStyle={initialStyle ? true : false}>
            {errorText}
          </StyledErrorText>
        )
      )}
    </StyledInputWrapper>
  );
};

export default Input;
