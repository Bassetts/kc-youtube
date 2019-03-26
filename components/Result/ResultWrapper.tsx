import styled from "styled-components";

const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ isActive }) => (isActive ? `#eee` : `white`)}
  font-weight: ${({ isSelected }) => (isSelected ? `bold` : `normal`)}
`;

export default ResultWrapper;