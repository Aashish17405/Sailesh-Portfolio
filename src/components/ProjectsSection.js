import React, { useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projectsData";
import ProjectModal from "./ProjectModal";

const ProjectsSectionWrapper = styled(motion.section)`
  width: 100%;
  max-width: 1200px;
  margin: 6rem auto;
  padding: 0 2rem;
`;

const CategoryBar = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0.7rem;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 4rem;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem;
    width: 95%;
  }
`;

const CategoryButton = styled(motion.button)`
  background: ${(props) =>
    props.active === "true" ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  border: none;
  padding: 0.5rem 2rem;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: all 0.3s;
  opacity: ${(props) => (props.active === "true" ? 1 : 0.7)};

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }

  &:hover {
    opacity: 1;
    background: ${(props) =>
      props.active === "true"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(255, 255, 255, 0.05)"};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.02);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    padding: 1rem;
    gap: 1rem;
  }
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  aspect-ratio: 1;
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 100%;
  max-width: 320px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: all 0.6s ease;
  }

  &:hover {
    img {
      filter: grayscale(0%);
      transform: scale(1.1);
    }
  }
`;

const ProjectsSection = ({ forwardedRef }) => {
  const [activeCategory, setActiveCategory] = useState("Wildlife");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projectsData.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <ProjectsSectionWrapper
      ref={forwardedRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <CategoryBar>
        {["Wildlife", "Portraits", "Fashion", "Concerts"].map((category) => (
          <CategoryButton
            key={category}
            active={activeCategory === category ? "true" : "false"}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryBar>

      <ProjectsGrid>
        <AnimatePresence mode="wait">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              layout
              onClick={() => handleProjectClick(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                onError={(e) => {
                  if (project.fallbackImage) {
                    e.target.src = project.fallbackImage;
                  } else {
                    e.target.style.display = "none";
                  }
                  console.log(`Image failed to load for project ${project.id}`);
                }}
              />
            </ProjectCard>
          ))}
        </AnimatePresence>
      </ProjectsGrid>

      <ProjectModal selectedProject={selectedProject} closeModal={closeModal} />
    </ProjectsSectionWrapper>
  );
};

export default ProjectsSection;
