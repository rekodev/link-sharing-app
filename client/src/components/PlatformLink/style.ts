import styled from 'styled-components';
import { platformColors, themeColors } from '../../styles/Theme';

interface IStyledPlatformLinkProps {
  $platform: string;
}

export const StyledPlatformLink = styled.a<IStyledPlatformLinkProps>`
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
