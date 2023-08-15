import { useEffect, useState } from 'react';
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
  setLinks: React.Dispatch<React.SetStateAction<[] | IShareableLinkValues[]>>;
}

const LinkCard = ({ index, link, setLinks }: ILinkCardProps) => {
  const [platformAndLink, setPlatformAndLink] = useState({
    id: link.id,
    platform: '',
    link: '',
  });

  const handleRemove = () => {
    setLinks((prev) => prev.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    setLinks((prev: IShareableLinkValues[]) =>
      prev.map((el, idx) => (idx === index ? platformAndLink : el))
    );
  }, [platformAndLink]);

  return (
    <StyledLinkCard>
      <StyledLinkCardTextWrapper>
        <StyledIconAndHeading>
          <h4>Link #{index + 1}</h4>
        </StyledIconAndHeading>
        <Button text='Remove' variant='text' onClick={handleRemove} />
      </StyledLinkCardTextWrapper>
      <SelectInput setPlatformAndLink={setPlatformAndLink} />
      <TextInput setPlatformAndLink={setPlatformAndLink} />
    </StyledLinkCard>
  );
};

export default LinkCard;
