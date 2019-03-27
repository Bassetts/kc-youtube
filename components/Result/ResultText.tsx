import React from "react";
import styled from "styled-components";

const StyledParagraph = styled.p`
  margin-left: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultText = ({ text }) => {
  return <StyledParagraph title={text}>{text}</StyledParagraph>;
};

export default ResultText;
