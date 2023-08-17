import {
  StyledErrorText,
  StyledImage,
  StyledInput,
  StyledInputWrapper,
  StyledLabel,
} from './style';

interface IInputProps {
  placeholder?: string;
  id: string;
  label?: string;
  name: string;
  type: 'text' | 'email' | 'number';
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: boolean;
  errorText?: string;
  imgSrc?: string;
  imgName?: string;
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
}: IInputProps) => {
  return (
    <StyledInputWrapper>
      {label && <StyledLabel id={`label-${id}`}>{label}</StyledLabel>}
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
      {error && type === 'text' && !value ? (
        <StyledErrorText>Can't be empty</StyledErrorText>
      ) : (
        error && <StyledErrorText>{errorText}</StyledErrorText>
      )}
    </StyledInputWrapper>
  );
};

export default Input;
