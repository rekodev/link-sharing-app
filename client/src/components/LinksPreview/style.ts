import styled from 'styled-components';

import { Breakpoints } from '../../styles/Breakpoints';
import { platformColors, themeColors } from '../../styles/Theme';

type Props = {
  $profilePicture: boolean;
};

export const StyledLinksPreview = styled.aside`
  display: none;
  min-width: 560px;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;

  @media screen and (min-width: ${Breakpoints.TV}) {
    display: flex;
    justify-content: center;
  }
`;

export const StyledLinksPreviewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  width: 560px;
  background-color: ${themeColors.white};
  padding: 50px 0;
  border-radius: 12px;
`;

export const StyledPhoneImageWrapper = styled.div`
  width: 308px;
  margin: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const StyledPlatformWrapper = styled.div`
  position: absolute;
  width: calc(100% - 8px);
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 12px;
  padding: 0 2rem;
  bottom: 3rem;
  top: 17rem;
  height: 50%;
  min-height: 300px;
`;

export const StyledProfileDetailsWrapper = styled.div`
  position: absolute;
  top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  min-height: 170px;
  overflow: hidden;
`;

export const StyledProfilePictureWrapper = styled.div<Props>`
  width: 96px;
  height: 96px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: ${(props) =>
    props.$profilePicture ? `4px solid ${themeColors.indigo}` : 'none'};
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledProfileDetailsTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50%;
  min-height: 56px;
  text-align: center;

  h3 {
    background-color: ${themeColors.white};
    width: 100%;
  }

  p {
    position: absolute;
    bottom: 7px;
    width: 100%;
    background-color: ${themeColors.white};
  }
`;

export const StyledPlatformLink = styled.a<{ $platform: string }>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border: ${(props) =>
    props.$platform === 'Frontend Mentor'
      ? `1px solid ${themeColors.gray}`
      : 'none'};
  max-width: 15rem;
  padding: 1rem;
  border-radius: 0.5rem;
  color: ${(props) =>
    props.$platform === 'Frontend Mentor' ? 'initial' : themeColors.white};
  gap: 0.5rem;
  background-color: ${(props) =>
    props.$platform === 'Codewars'
      ? platformColors.codewars
      : props.$platform === 'GitHub'
      ? platformColors.gitHub
      : props.$platform === 'Frontend Mentor'
      ? platformColors.frontEndMentor
      : props.$platform === 'Twitter'
      ? platformColors.twitter
      : props.$platform === 'LinkedIn'
      ? platformColors.linkedIn
      : props.$platform === 'YouTube'
      ? platformColors.youTube
      : props.$platform === 'Facebook'
      ? platformColors.facebook
      : props.$platform === 'Twitch'
      ? platformColors.twitch
      : props.$platform === 'Dev.to'
      ? platformColors.devTo
      : props.$platform === 'freeCodeCamp'
      ? platformColors.freeCodeCamp
      : props.$platform === 'Codepen'
      ? platformColors.codepen
      : props.$platform === 'GitLab'
      ? platformColors.gitLab
      : props.$platform === 'Hashnode'
      ? platformColors.hashnode
      : props.$platform === 'Stack Overflow'
      ? platformColors.stackOverflow
      : 'initial'};

  cursor: pointer;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 16px;

    svg path {
      fill: ${(props) =>
        props.$platform === 'Frontend Mentor' ? '#67BECE' : '#fff'};
      background-color: red;
    }

    svg path:nth-child(2),
    svg path:nth-child(3),
    svg path:nth-child(4) {
      fill: #333;
    }
  }

  img {
    width: 16px;
  }

  img:last-child {
    position: absolute;
    right: 1rem;
  }
`;
