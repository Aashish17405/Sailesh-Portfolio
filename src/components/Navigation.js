import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const NavigationWrapper = styled.nav`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0.7rem;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 1rem auto 4rem;
  width: fit-content;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem;
    width: 95%;
  }
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem 2rem;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: all 0.3s;
  opacity: 0.7;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Navigation = ({ scrollToAbout, scrollToProjects }) => {
  const handleContactClick = () => {
    window.location.href = "mailto:saileshatreya@gmail.com";
  };

  return (
    <NavigationWrapper>
      <NavButton onClick={scrollToAbout}>About</NavButton>
      <NavButton onClick={scrollToProjects}>Projects</NavButton>
      <NavButton onClick={handleContactClick}>Contact</NavButton>
    </NavigationWrapper>
  );
};

export default Navigation;
