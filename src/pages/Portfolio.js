import React, { useRef } from "react";
import Container from "../components/Container";
import Navigation from "../components/Navigation";
import ProfileSection from "../components/ProfileSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";

const Portfolio = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container>
      <Navigation
        scrollToAbout={scrollToAbout}
        scrollToProjects={scrollToProjects}
      />
      <ProfileSection />
      <AboutSection forwardedRef={aboutRef} />
      <ProjectsSection forwardedRef={projectsRef} />
    </Container>
  );
};

export default Portfolio;
