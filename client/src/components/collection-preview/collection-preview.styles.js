import styled from 'styled-components';

export const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  // @media screen and (max-width: 580px) {
    // align-items: center;
  // }

`;

export const TitleContainer = styled.h1`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;

export const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  @media only screen and (max-width: 580px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  
  @media only screen and (max-width: 480px) {
      grid-template-columns: 1fr 1fr;
    }
  
  @media only screen and (max-width: 360px) {
      grid-template-columns: 1fr;
    
  }

`;