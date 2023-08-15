import PlatformLink from '../../components/PlatformLink';
import PreviewCard from '../../components/PreviewCard';
import { LinkContext } from '../../contexts/linkContext';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { platforms } from '../../utils/platformList';
import { StyledPreview, StyledPreviewLinkWrapper } from './style';
import { useContext } from 'react';

const Preview = () => {
  const { links } = useContext(LinkContext);

  return (
    <StyledPreview>
      <PreviewCard />
      <StyledPreviewLinkWrapper>
        {links.map((link: IShareableLinkValues, idx: number) => {
          const matchedPlatform = platforms.find(
            (platform) => platform.name === link.platform
          );

          if (matchedPlatform) {
            return (
              <PlatformLink
                key={idx}
                svgIcon={matchedPlatform.svgIcon}
                text={matchedPlatform.name}
                url={link.link}
              />
            );
          }
        })}
      </StyledPreviewLinkWrapper>
    </StyledPreview>
  );
};

export default Preview;
