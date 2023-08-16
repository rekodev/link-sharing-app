import styled from 'styled-components';
import { themeColors } from '../../styles/Theme';

export const StyledImageUpload = styled.div`
  border-radius: 0.75rem;
  background-color: ${themeColors.lightLavender};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.75rem 2.5rem;
  margin: 1rem 0 1.5rem 0;

  && p {
    color: ${themeColors.indigo};
    font-weight: 600;
  }

  img {
    width: 40px;
  }

  width: 200px;
  height: 200px;
`;
