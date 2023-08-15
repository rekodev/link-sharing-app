import Button from '../Button';
import {
  StyledIconAndHeading,
  StyledLinkCard,
  StyledLinkCardTextWrapper,
} from './style';

interface ILinkCardProps {
  index: number;
  setLinks: (linkArr: []) => void;
}

const LinkCard = ({ index, setLinks }: ILinkCardProps) => {
  const handleRemove = () => {
    // setLinks((prev) => prev.splice(1, index));
  };

  return (
    <StyledLinkCard>
      <StyledLinkCardTextWrapper>
        <StyledIconAndHeading>
          <h4>Link #{index + 1}</h4>
        </StyledIconAndHeading>
        <Button text='Remove' variant='text' onClick={handleRemove} />
      </StyledLinkCardTextWrapper>
    </StyledLinkCard>
  );
};

export default LinkCard;
