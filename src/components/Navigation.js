import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const NavigationWrapper = styled.nav`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.7rem;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 1rem auto 4rem;
  margin-bottom: 2rem;
  width: fit-content;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem;
    width: 95%;
  }
`;

const NavButton = styled.button`
  background: ${(props) =>
    props.active ? "rgba(66, 220, 255, 0.15)" : "transparent"};
  border: ${(props) =>
    props.active ? "1px solid rgba(66, 220, 255, 0.3)" : "none"};
  padding: 0.5rem 2rem;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: ${(props) => (props.active ? 1 : 0.7)};
  position: relative;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.active ? "0 0 15px rgba(66, 220, 255, 0.2)" : "none"};

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(66, 220, 255, 0.1),
      rgba(120, 255, 215, 0.1)
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: -1;
    border-radius: 25px;
  }

  &:hover {
    opacity: 1;
    background: ${(props) =>
      props.active ? "rgba(66, 220, 255, 0.2)" : "rgba(255, 255, 255, 0.08)"};
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(66, 220, 255, 0.3);
    border: 1px solid rgba(66, 220, 255, 0.3);
    letter-spacing: 0.5px;

    &::before {
      transform: translateX(0);
    }
  }
`;

// Use React.memo to prevent unnecessary re-renders
const Navigation = React.memo((props) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // Determine which section is active based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition < 500) {
        setActiveSection("about");
      } else if (scrollPosition < 1500) {
        setActiveSection("projects");
      } else {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => {
    if (typeof props.scrollToContact === "function") {
      props.scrollToContact();
    } else {
      if (typeof window.scrollToContactSection === "function") {
        window.scrollToContactSection();
      } else {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <NavigationWrapper>
      <NavButton
        onClick={props.scrollToAbout}
        active={activeSection === "about"}
      >
        About
      </NavButton>
      <NavButton
        onClick={props.scrollToProjects}
        active={activeSection === "projects"}
      >
        Projects
      </NavButton>
      <NavButton
        onClick={handleContactClick}
        active={activeSection === "contact"}
      >
        Contact
      </NavButton>
    </NavigationWrapper>
  );
});

// Add display name for debugging
Navigation.displayName = "Navigation";

export default Navigation;
