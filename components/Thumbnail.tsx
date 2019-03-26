import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const StyledLazyLoadImage = styled(LazyLoadImage)`
  background-color: #eee;
`;

const Thumbnail = ({ image: { width, height, url } }) => {
  return (
    <StyledLazyLoadImage
      width={width}
      height={height}
      src={url}
      effect="opactiy"
    />
  );
};

export default Thumbnail;
