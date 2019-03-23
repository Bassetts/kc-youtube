import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 47;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Button = ({ onClick, label }) => {
  return (
    <StyledButton onClick={onClick} aria-label={label}>
      <svg
        viewBox="0 0 20 20"
        preserveAspectRatio="none"
        width={20}
        fill="transparent"
        stroke="#999"
        strokeWidth="1.3px"
      >
        <path d="M1,1 L19,19" />
        <path d="M19,1 L1,19" />
      </svg>
    </StyledButton>
  );
};

export default Button;
