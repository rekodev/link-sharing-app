import styled from 'styled-components';

export const StyledHeader = styled.header`
  padding: 1rem 1.5rem;
`;

export const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 45px;

  .small-logo {
    width: 32px;
  }

  .large-logo {
    display: none;
    height: 32px;
    width: auto;
  }

  @media screen and (min-width: 768px) {
    .small-logo {
      display: none;
    }
    .large-logo {
      display: initial;
    }
  }
`;

export const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
