import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  stroke: #616161;

  :hover {
    background-color: #2196f3;
    stroke: #fff;
  }
`;

const Button = ({ onClick, label }) => {
  return (
    <StyledButton onClick={onClick} aria-label={label}>
      <svg
        viewBox="0 0 20 20"
        preserveAspectRatio="none"
        width={20}
        fill="transparent"
        strokeWidth="2px"
      >
        <path d="M1,1 L19,19" />
        <path d="M19,1 L1,19" />
      </svg>
    </StyledButton>
  );
};

export default Button;
