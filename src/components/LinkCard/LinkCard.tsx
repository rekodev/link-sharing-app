import { ILinkCardError } from '../../types/errors';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import Button from '../Button';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import {
  StyledIconAndHeading,
  StyledLinkCard,
  StyledLinkCardTextWrapper,
} from './style';

interface ILinkCardProps {
  index: number;
  link: IShareableLinkValues;
  setNewLinks: React.Dispatch<
    React.SetStateAction<[] | IShareableLinkValues[]>
  >;
  isError: ILinkCardError;
  setIsError: React.Dispatch<React.SetStateAction<ILinkCardError>>;
}

const LinkCard = ({
  index,
  link,
  setNewLinks,
  isError,
  setIsError,
}: ILinkCardProps) => {
  const handleRemove = () => {
    setNewLinks((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <StyledLinkCard>
      <StyledLinkCardTextWrapper>
        <StyledIconAndHeading>
          <h4>Link #{index + 1}</h4>
        </StyledIconAndHeading>
        <Button text='Remove' variant='text' onClick={handleRemove} />
      </StyledLinkCardTextWrapper>
      <SelectInput
        link={link}
        index={index}
        setNewLinks={setNewLinks}
        isError={isError}
        setIsError={setIsError}
      />
      <TextInput
        link={link}
        index={index}
        setNewLinks={setNewLinks}
        isError={isError}
        setIsError={setIsError}
      />
    </StyledLinkCard>
  );
};

export default LinkCard;
