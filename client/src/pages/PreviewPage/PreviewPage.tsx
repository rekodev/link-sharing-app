import {
  StyledPreview,
  StyledPreviewContainer,
  StyledPreviewLinkWrapper,
} from './style';
import PlatformLink from '../../components/PlatformLink';
import PreviewCard from '../../components/PreviewCard';
import useUserLinks from '../../hooks/useUserLinks';
import { platforms } from '../../utils/platformList';

const PreviewPage = () => {
  const { links: userLinks, isLinksLoading: isUserLinksLoading } =
    useUserLinks();

  if (!userLinks || isUserLinksLoading) return null;

  const atLeastOnePlatform = userLinks.some((link) =>
    platforms.some((platform) => platform.name === link.platform)
  );

  return (
    <>
      <StyledPreview>
        <StyledPreviewContainer>
          <PreviewCard atLeastOnePlatform={atLeastOnePlatform} />
          <StyledPreviewLinkWrapper>
            {userLinks.map((link, idx: number) => {
              const matchedPlatform = platforms.find(
                (platform) => platform.name === link.platform
              );

              if (!matchedPlatform) return null;

              return (
                <PlatformLink
                  key={idx}
                  svgIcon={matchedPlatform.svgIcon}
                  text={matchedPlatform.name}
                  url={link.linkUrl}
                />
              );
            })}
          </StyledPreviewLinkWrapper>
        </StyledPreviewContainer>
      </StyledPreview>
    </>
  );
};

export default PreviewPage;
