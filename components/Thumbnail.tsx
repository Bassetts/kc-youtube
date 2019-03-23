import React, { useState } from "react";
import LazyLoad from "react-lazy-load";
import styled, { css, keyframes } from "styled-components";

const StyledLazyLoad = styled(LazyLoad)`
  display: inline-block;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Image = styled.img`
  opacity: 0;

  ${loaded =>
    loaded &&
    css`
      animation: ${fadeIn} 0.5s linear;
      animation-fill-mode: forwards;
    `}
`;

const Thumbnail = props => {
  const [loaded, setLoaded] = useState(false);

  return (
    <StyledLazyLoad className="lazy-load img-container">
      <Image {...props} loaded={loaded} onLoad={() => setLoaded(true)} />
    </StyledLazyLoad>
  );
};

export default Thumbnail;
