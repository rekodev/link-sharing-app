import { InputAdornment } from '@mui/material';
import linkIcon from '../../assets/images/icon-link.svg';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { StyledTextField } from './style';

interface ITextInputProps {
  setNewLinks: React.Dispatch<
    React.SetStateAction<IShareableLinkValues[] | []>
  >;
  link: IShareableLinkValues;
  index: number;
}

const TextInput = ({ setNewLinks, link, index }: ITextInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputtedLink = event.target.value as string;

    setNewLinks((prev) => {
      const updatedLinks = Array.from(prev);

      const linkToUpdate = { ...link };

      linkToUpdate.link = inputtedLink;

      updatedLinks[index] = linkToUpdate;

      return updatedLinks;
    });
  };

  return (
    <StyledTextField
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
    />
  );
};

export default TextInput;
