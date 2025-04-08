import React, { useState, useEffect } from "react";
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
    background: ${(props) =>
      props.isScrolled
        ? "none"
        : `
      linear-gradient(
        90deg, 
        transparent 20%, 
        rgba(255, 255, 255, 0.03) 22%, 
        transparent 22.5%,
        transparent 35%,
        rgba(255, 255, 255, 0.02) 36%,
        transparent 36.5%,
        transparent 47%,
        rgba(255, 255, 255, 0.03) 48%,
        transparent 48.5%
      ),
      linear-gradient(
        180deg,
        transparent 0%,
        rgba(0, 0, 0, 0.95) 100%
      )
    `};
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ContainerWrapper isScrolled={isScrolled}>{children}</ContainerWrapper>
  );
};

export default Container;
