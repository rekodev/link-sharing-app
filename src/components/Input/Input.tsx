import { StyledInput, StyledInputWrapper, StyledLabel } from './style';

interface IInputProps {
  placeholder?: string;
  id: string;
  label?: string;
  name: string;
  type: 'text' | 'email' | 'number';
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input = ({
  placeholder,
  id,
  name,
  required,
  label,
  onChange,
  value,
}: IInputProps) => {
  return (
    <StyledInputWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledInput
        placeholder={placeholder}
        id={id}
        name={name}
        required={required}
        onChange={onChange}
        value={value}
      />
    </StyledInputWrapper>
  );
};

export default Input;
