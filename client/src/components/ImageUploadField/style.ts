import styled from 'styled-components';

import { Breakpoints } from '../../styles/Breakpoints';
import { themeColors } from '../../styles/Theme';

export const StyledProfilePictureCard = styled.div`
  background-color: ${themeColors.lightGray};
  padding: 1.25rem;
  border-radius: 0.75rem;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const StyledCardHeading = styled.h4`
  font-weight: 400;
  font-size: 16px;
  color: ${themeColors.darkGray};
  margin: 0;
  margin-bottom: 0.5rem;
`;

export const UploadedImageWrapper = styled.div`
  > p {
    color: ${themeColors.darkGray};
    margin: 0;
    line-height: 150%;
    font-size: 12px;
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    max-width: 360px;
  }
`;

export const StyledImageUploadWrapper = styled.div`
  margin: 1rem 0 1.5rem 0;

  > p {
    color: ${themeColors.darkGray};
    margin-top: 2px;
    line-height: 125%;
    font-size: 12px;
    max-width: 200px;
    white-space: nowrap;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    margin: 0;
  }
`;

export const StyledImageUpload = styled.div`
  border-radius: 0.75rem;
  background-color: ${themeColors.lightLavender};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;

  height: 200px;
  width: 200px;

  :hover {
    background-color: ${themeColors.lavender};
    cursor: pointer;

    .image-wrapper {
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.5);

      p {
        color: #fff;
      }
    }
  }

  && p {
    color: ${themeColors.indigo};
    font-weight: 600;
  }

  img {
    width: 40px;
  }

  input {
    display: none;
  }

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    margin: 0;
  }
`;

export const StyledPreImageUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;

  svg path {
    fill: #fff;
  }
`;

export const StyledUploadedImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
