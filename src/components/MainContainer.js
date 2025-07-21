import React from 'react';
import styled from '@emotion/styled';

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px); // Account for header height
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Content = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

function MainContainer({ title, description, children }) {
  return (
    <Container>
      <Content>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        {children}
      </Content>
    </Container>
  );
}

export default MainContainer; 