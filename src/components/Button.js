import React from 'react';
import styled from '@emotion/styled';

// Base button styles
const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

// Button variants
const PrimaryButton = styled(BaseButton)`
  background-color: #007bff;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #0056b3;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(BaseButton)`
  background-color: #6c757d;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #545b62;
    transform: translateY(-1px);
  }
`;

const SuccessButton = styled(BaseButton)`
  background-color: #28a745;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #1e7e34;
    transform: translateY(-1px);
  }
`;

const DangerButton = styled(BaseButton)`
  background-color: #dc3545;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #c82333;
    transform: translateY(-1px);
  }
`;

const OutlineButton = styled(BaseButton)`
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
  
  &:hover:not(:disabled) {
    background-color: #007bff;
    color: white;
    transform: translateY(-1px);
  }
`;

const Button = React.memo(function Button({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  ...props 
}) {
  // Determine which button component to use based on variant
  const ButtonComponent = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
    success: SuccessButton,
    danger: DangerButton,
    outline: OutlineButton,
  }[variant] || PrimaryButton;

  // Apply size styling
  const StyledButton = size === 'small' 
    ? styled(ButtonComponent)`
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
      `
    : size === 'large'
    ? styled(ButtonComponent)`
        padding: 1rem 2rem;
        font-size: 1rem;
      `
    : ButtonComponent;

  return <StyledButton {...props}>{children}</StyledButton>;
});

export default Button; 