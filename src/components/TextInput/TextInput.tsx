import isUrl from 'is-url';
import linkIcon from '../../assets/images/icon-link.svg';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import Input from '../Input';
import { StyledTextFieldWrapper } from './style';

interface ITextInputProps {
  setNewLinks: React.Dispatch<
    React.SetStateAction<IShareableLinkValues[] | []>
  >;
  link: IShareableLinkValues;
  index: number;
  isError: boolean;
}

const TextInput = ({ setNewLinks, link, index, isError }: ITextInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputtedLink = event.target.value as string;

    setNewLinks((prev) => {
      const updatedLinks = Array.from(prev);

      const linkToUpdate = { ...link };

      linkToUpdate.link = inputtedLink;

      if (inputtedLink && isUrl(inputtedLink)) {
        linkToUpdate.errors.link = false;
      } else {
        linkToUpdate.errors.link = true;
      }

      updatedLinks[index] = linkToUpdate;

      return updatedLinks;
    });
  };

  return (
    <StyledTextFieldWrapper>
      {/* <StyledTextField
        error={isError}
        helperText={
          isError && link.link
            ? 'Please check the URL'
            : isError && !link.link
            ? 'URL cannot be empty'
            : ''
        }
        id='outlined-basic'
        label='Link'
        onChange={handleChange}
        variant='outlined'
        value={link.link}
        placeholder='e.g. https://www.github.com/johnappleseed'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <img src={linkIcon} alt='Link' />
            </InputAdornment>
          ),
        }}
      /> */}
      <Input
        type='text'
        label='Link'
        id='link'
        name='link'
        placeholder='e.g. https://www.github.com/johnappleseed'
        onChange={handleChange}
        value={link.link}
        error={isError}
        errorText='Please check the URL'
        imgSrc={linkIcon}
        imgName='Link Icon'
      />
    </StyledTextFieldWrapper>
  );
};

export default TextInput;
