import { ReactNode } from 'react';

import {
  StyledPreview,
  StyledPreviewContainer,
  StyledPreviewLinkWrapper,
} from './style';
import arrowIcon from '../../assets/images/icon-arrow-right.svg';
import { StyledPlatformLink } from '../../components/LinksPreview/style';
import PreviewCard from '../../components/PreviewCard';
import { platforms } from '../../constants/platformList';
import useUserLinks from '../../hooks/useUserLinks';

const REVALIDATE_ON_MOUNT = true;

const PreviewPage = () => {
  const { links: userLinks, isLinksLoading: isUserLinksLoading } =
    useUserLinks(REVALIDATE_ON_MOUNT);

  if (!userLinks || isUserLinksLoading) return null;

  const atLeastOnePlatform = userLinks.some((link) =>
    platforms.some((platform) => platform.name === link.platform)
  );

  const renderLink = (
    index: number,
    text: string,
    svgIcon: ReactNode,
    url: string
  ) => (
    <StyledPlatformLink key={index} href={url} $platform={text} target='_blank'>
      {svgIcon}
      {text}
      <img src={arrowIcon} alt='Arrow Right Icon' />
    </StyledPlatformLink>
  );

  return (
    <>
      <StyledPreview>
        <StyledPreviewContainer>
          <PreviewCard atLeastOnePlatform={atLeastOnePlatform} />
          <StyledPreviewLinkWrapper>
            {userLinks.map((link, index: number) => {
              const matchedPlatform = platforms.find(
                (platform) => platform.name === link.platform
              );

              if (!matchedPlatform) return null;

              return renderLink(
                index,
                matchedPlatform.name,
                matchedPlatform.svgIcon,
                link.linkUrl
              );
            })}
          </StyledPreviewLinkWrapper>
        </StyledPreviewContainer>
      </StyledPreview>
    </>
  );
};

export default PreviewPage;
