import React from "react";
import styled from "@emotion/styled";

const ContainerWrapper = styled.div`
  background-color: #000000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 7rem;
  color: white;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.95) 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: none;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const Container = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default Container;
