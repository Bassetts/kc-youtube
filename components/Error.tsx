import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  color: #f44336;
  background-color: #ffffff;
`;

const Error = ({ text }) => {
  return (
    <StyledDiv>
      <p>{text}</p>
    </StyledDiv>
  );
};

export default Error;
