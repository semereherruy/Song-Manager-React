import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

// Styled component using Emotion
const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  color: white;
  text-decoration: none;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  
  &:hover {
    opacity: 0.8;
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

function Header() {
  const location = useLocation();
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">🎵 Song Manager</Logo>
        <Nav>
          <NavLink to="/songs" active={location.pathname === '/songs' ? 1 : 0}>
            Songs
          </NavLink>
          <NavLink to="/add-song" active={location.pathname === '/add-song' ? 1 : 0}>
            Add Song
          </NavLink>
          <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0}>
            About
          </NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header; 