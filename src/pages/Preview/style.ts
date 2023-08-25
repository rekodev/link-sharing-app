import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import { Breakpoints } from '../../styles/Breakpoints';

export const StyledPreview = styled.section`
  padding: 3.75rem;
  background-color: ${themeColors.white};
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  width: 100%;
  flex: 1;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    padding: 0;
    background-color: ${themeColors.lightGray};
  }
`;

export const StyledPreviewLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  z-index: 5;
  margin-top: 56px;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    margin-top: 0;
  }
`;

export const StyledPreviewContainer = styled.div`
  @media screen and (min-width: ${Breakpoints.Tablet}) {
    display: flex;
    flex-direction: column;
    gap: 3.75rem;
    position: relative;
    padding: 48px 56px;
    background-color: ${themeColors.white};
    border-radius: 1.25rem;
    box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
    width: 360px;
    margin: 102px auto 0 auto;
  }

  @media screen and (min-width: ${Breakpoints.TV}) {
    margin: 82px auto 0 auto;
  }
`;
