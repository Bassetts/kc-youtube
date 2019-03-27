import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #eee;
  width: 848px;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Placeholder = () => {
  return (
    <Wrapper>
      <p>Select a video</p>
    </Wrapper>
  );
};

export default Placeholder;
