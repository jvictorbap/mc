import styled, { css } from 'styled-components'

const VARIANTS = {
  primary: {
    background: '#ec4899',
    color: '#ffffff',
    hover: '#db2777'
  },
  secondary: {
    background: '#ede9fe',
    color: '#6d28d9',
    hover: '#ddd6fe'
  },
  success: {
    background: '#10b981',
    color: '#ffffff',
    hover: '#059669'
  },
  ghost: {
    background: 'transparent',
    color: '#db2777',
    hover: '#fdf2f8'
  }
}

const StyledButton = styled.button`
  width: 100%;
  border-radius: 9999px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  background: ${({ $variant }) => VARIANTS[$variant].background};
  color: ${({ $variant }) => VARIANTS[$variant].color};

  &:hover {
    background: ${({ $variant }) => VARIANTS[$variant].hover};
  }

  &:focus-visible {
    outline: 2px solid #f9a8d4;
    outline-offset: 2px;
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      cursor: not-allowed;
      background: #e5e7eb;
      color: #9ca3af;

      &:hover {
        background: #e5e7eb;
      }
    `}
`

function Button({ children, variant = 'primary', type = 'button', isDisabled = false, onClick }) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $isDisabled={isDisabled}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

export default Button
