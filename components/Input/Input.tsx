import React from "react";
import styled from "styled-components";

import Wrapper from "./Wrapper";
import Button from "./Button";

const StyledInput = styled.input`
  width: 100%;
  position: relative;
  min-height: 36px;
  padding: 4px 8px;
  border: 1px solid #e0e0e0;
  outline: none;

  :focus {
    border-color: #2196f3;
  }
`;

const Input = ({ clearSelection, ...props }) => {
  return (
    <Wrapper>
      <StyledInput {...props} />
      <Button onClick={clearSelection} label="clear selection" />
    </Wrapper>
  );
};

export default Input;
