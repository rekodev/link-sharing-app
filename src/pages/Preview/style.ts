import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';
import { Breakpoints } from '../../styles/Breakpoints';

export const StyledPreview = styled.section`
  padding: 3.75rem;
  background-color: ${themeColors.white};
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  flex: 1;

  @media screen and (min-width: ${Breakpoints.Tablet}) {
    flex: initial;
    width: 50%;
    margin: 0 auto;
    z-index: 5;
    width: 360px;
    margin: 102px auto 0 auto;
    padding: 48px 56px;
    box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
  }

  @media screen and (min-width: ${Breakpoints.Desktop}) {
    margin-top: 82px;
  }
`;

export const StyledPreviewLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

export const StyledPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
`;
