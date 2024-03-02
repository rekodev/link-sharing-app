import { useContext } from 'react';

import {
  StyledPreview,
  StyledPreviewContainer,
  StyledPreviewLinkWrapper,
} from './style';
import PlatformLink from '../../components/PlatformLink';
import PreviewCard from '../../components/PreviewCard';
import { LinkContext } from '../../contexts/linkContext';
import { IShareableLinkValues } from '../../types/shareableLinkValues';
import { platforms } from '../../utils/platformList';

const Preview = () => {
  const { links } = useContext(LinkContext);

  const atLeastOnePlatform = links.some((link) =>
    platforms.some((platform) => platform.name === link.platform)
  );

  return (
    <>
      <StyledPreview>
        <StyledPreviewContainer>
          <PreviewCard atLeastOnePlatform={atLeastOnePlatform} />
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
              return null;
            })}
          </StyledPreviewLinkWrapper>
        </StyledPreviewContainer>
      </StyledPreview>
    </>
  );
};

export default Preview;
