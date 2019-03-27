import React from "react";
import styled from "styled-components";

const StyledParagraph = styled.p`
  margin-left: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultText = ({ title }) => {
  return <StyledParagraph title={title}>{title}</StyledParagraph>;
};

export default ResultText;
