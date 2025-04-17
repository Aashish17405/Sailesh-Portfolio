import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projectsData";
import ProjectModal from "./ProjectModal";

const ProjectsSectionWrapper = styled(motion.section)`
  width: 100%;
  max-width: 1200px;
  margin: 6rem auto;
  margin-bottom: 0rem;
  padding: 0 2rem;
`;

const MediaNavbar = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.7rem;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 0 auto 3rem;
  width: fit-content;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem;
    width: 90%;
  }
`;

const MediaNavButton = styled(motion.button)`
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

const CategoryBar = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.7rem;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 1rem;
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
    props.active === "true" ? "rgba(66, 220, 255, 0.15)" : "transparent"};
  border: ${(props) =>
    props.active === "true" ? "1px solid rgba(66, 220, 255, 0.3)" : "none"};
  padding: 0.5rem 2rem;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: ${(props) => (props.active === "true" ? 1 : 0.7)};
  position: relative;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.active === "true" ? "0 0 15px rgba(66, 220, 255, 0.2)" : "none"};

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
      props.active === "true"
        ? "rgba(66, 220, 255, 0.2)"
        : "rgba(255, 255, 255, 0.08)"};
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(66, 220, 255, 0.3);
    border: 1px solid rgba(66, 220, 255, 0.3);
    letter-spacing: 0.5px;

    &::before {
      transform: translateX(0);
    }
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 0rem;
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
  max-width: 280px;
  margin: 0 auto;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid transparent;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: all 0.6s ease;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.6s ease;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-10px);

    img {
      filter: grayscale(0%);
      transform: scale(1.05);
    }
  }
`;

const ImagePlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    110deg,
    rgba(255, 255, 255, 0.03) 30%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(255, 255, 255, 0.03) 70%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 15px;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const VideoSection = styled(motion.div)`
  width: 100%;
  margin: 5rem auto 0;
  margin-top: 0rem;
  margin-bottom: 0rem;
  padding: 3rem 0;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
`;

const VideoTitle = styled(motion.h3)`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: white;
  text-align: center;
  position: relative;
  display: inline-block;
  margin-bottom: 0rem;
  margin-top: 0rem;

  &:after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const VideoContainer = styled(motion.div)`
  width: 100%;
  max-width: 1400px; /* Even larger max-width */
  aspect-ratio: 16/9;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.4);

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 1600px) {
    max-width: 85%;
  }

  @media (max-width: 1200px) {
    max-width: 90%;
  }

  @media (max-width: 768px) {
    max-width: 95%;
    border-radius: 15px;
  }
`;

const VideoDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  max-width: 800px;
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  line-height: 1.6;
  margin-top: 1rem;
`;

const ProjectsSection = ({ forwardedRef }) => {
  const [activeCategory, setActiveCategory] = useState("Wildlife");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMediaTab, setActiveMediaTab] = useState("photography");
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [loadingBatch, setLoadingBatch] = useState(0);

  const photosSectionRef = useRef(null);
  const videoSectionRef = useRef(null);
  const projectRefs = useRef([]);

  const filteredProjects = projectsData.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  // Initialize observer for lazy loading
  useEffect(() => {
    // Create a new observer for each category change
    projectRefs.current = Array(filteredProjects.length)
      .fill()
      .map(() => React.createRef());

    // Reset visible projects when category changes
    setVisibleProjects([]);
    setLoadingBatch(0);

    // First load is immediate for initial visible projects
    const initialBatchSize = 6; // First 6 images (2 rows on desktop)
    const initialVisible = filteredProjects
      .slice(0, initialBatchSize)
      .map((project) => project.id);

    setVisibleProjects(initialVisible);

    // Set up IntersectionObserver for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.dataset.projectId);
            if (!visibleProjects.includes(projectId)) {
              setVisibleProjects((prev) => [...prev, projectId]);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: "100px", // Start loading when element is 100px from viewport
        threshold: 0.1,
      }
    );

    // Load the rest of the images in a staggered manner
    const loadNextBatch = () => {
      const batchSize = 3; // Load 3 more images at a time
      const nextBatch = Math.min(
        loadingBatch + 1,
        Math.ceil((filteredProjects.length - initialBatchSize) / batchSize)
      );

      if (nextBatch > loadingBatch) {
        const startIdx = initialBatchSize + loadingBatch * batchSize;
        const endIdx = Math.min(startIdx + batchSize, filteredProjects.length);

        const newVisible = filteredProjects
          .slice(startIdx, endIdx)
          .map((project) => project.id);

        setVisibleProjects((prev) => [...prev, ...newVisible]);
        setLoadingBatch(nextBatch);

        if (endIdx < filteredProjects.length) {
          setTimeout(loadNextBatch, 200); // Load next batch after 200ms
        }
      }
    };

    // Start loading the next batch after a short delay
    if (filteredProjects.length > initialBatchSize) {
      setTimeout(loadNextBatch, 300);
    }

    // Set up observers for remaining projects that haven't been loaded yet
    projectRefs.current.forEach((ref, index) => {
      if (ref.current && index >= initialBatchSize) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeCategory, filteredProjects.length]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const scrollToSection = (section) => {
    if (section === "photography") {
      setActiveMediaTab("photography");
      photosSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "videography") {
      setActiveMediaTab("videography");
      videoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isProjectVisible = (projectId) => {
    return visibleProjects.includes(projectId);
  };

  return (
    <ProjectsSectionWrapper
      ref={forwardedRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <MediaNavbar
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MediaNavButton
          active={activeMediaTab === "photography"}
          onClick={() => scrollToSection("photography")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Photography
        </MediaNavButton>
        <MediaNavButton
          active={activeMediaTab === "videography"}
          onClick={() => scrollToSection("videography")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Videography
        </MediaNavButton>
      </MediaNavbar>

      <div ref={photosSectionRef}>
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
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                ref={projectRefs.current[index]}
                data-project-id={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isProjectVisible(project.id) ? 1 : 0,
                  y: isProjectVisible(project.id) ? 0 : 20,
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: isProjectVisible(project.id) ? (index % 3) * 0.1 : 0, // Stagger by column
                }}
                layout
                onClick={() => handleProjectClick(project)}
              >
                {!isProjectVisible(project.id) && <ImagePlaceholder />}
                {isProjectVisible(project.id) && (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      if (project.fallbackImage) {
                        e.target.src = project.fallbackImage;
                      } else {
                        e.target.style.display = "none";
                      }
                      console.log(
                        `Image failed to load for project ${project.id}`
                      );
                    }}
                  />
                )}
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </div>

      <VideoSection
        ref={videoSectionRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <VideoTitle
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Featured Videography
        </VideoTitle>
        <VideoContainer
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://www.youtube.com/embed/3D-2snNnGB0"
            title="Featured Videography"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </VideoContainer>
        <VideoDescription
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Experience the visual storytelling expertise through this immersive
          video showcase. This project highlights my cinematography skills,
          including dynamic camera work, atmospheric lighting, and thoughtful
          composition.
        </VideoDescription>
      </VideoSection>

      <ProjectModal selectedProject={selectedProject} closeModal={closeModal} />
    </ProjectsSectionWrapper>
  );
};

export default ProjectsSection;
