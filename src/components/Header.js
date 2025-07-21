import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

// Styled component using Emotion
const HeaderContainer = styled.header`
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: white;
  padding: 1.2rem 2rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(6px);
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
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.12);
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #ffe082;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
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
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  background: ${({ active }) => active ? 'rgba(255,255,255,0.18)' : 'transparent'};
  box-shadow: ${({ active }) => active ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'};
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  &:hover, &:focus {
    background: rgba(255,255,255,0.28);
    color: #ffe082;
    outline: none;
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