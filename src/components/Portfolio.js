import React, { useRef, useState } from "react";
import styled, { keyframes } from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Container = styled.div`
  background-color: #000000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
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
    background: radial-gradient(
      circle at center,
      rgba(40, 40, 40, 0.2) 0%,
      rgba(0, 0, 0, 0.95) 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const NavigationBar = styled.nav`
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

const glowPulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(66, 220, 255, 0.7);
  }
  
  50% {
    transform: scale(1);
    box-shadow: 0 0 0 15px rgba(66, 220, 255, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(66, 220, 255, 0);
  }
`;

const rotateGlow = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const neonFlicker = keyframes`
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 0.99;
    filter: drop-shadow(0 0 10px rgba(66, 220, 255, 0.8)) 
            drop-shadow(0 0 20px rgba(66, 220, 255, 0.5));
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.6;
    filter: drop-shadow(0 0 4px rgba(66, 220, 255, 0.5)) 
            drop-shadow(0 0 10px rgba(66, 220, 255, 0.3));
  }
`;

const glowRotate = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const NeonRing = styled(motion.div)`
  position: absolute;
  width: calc(min(300px, 80vw) + 30px);
  height: calc(min(300px, 80vw) + 30px);
  border-radius: 50%;
  background: transparent;
  border: 3px solid transparent;
  box-shadow: 0 0 15px 5px rgba(66, 220, 255, 0.7),
    0 0 30px 15px rgba(66, 220, 255, 0.3),
    inset 0 0 15px 5px rgba(66, 220, 255, 0.5);
  z-index: 0;
  animation: ${glowPulse} 2s infinite;

  &:before {
    content: "";
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    border-radius: 50%;
    border: 6px solid transparent;
    border-top: 6px solid rgba(120, 255, 215, 0.7);
    border-right: 6px solid rgba(123, 160, 255, 0.7);
    filter: blur(3px);
    animation: ${rotateGlow} 8s linear infinite;
  }

  &:after {
    content: "";
    position: absolute;
    inset: -10px;
    background: linear-gradient(
      90deg,
      rgba(123, 160, 255, 0.8),
      rgba(66, 220, 255, 0.8),
      rgba(120, 255, 215, 0.8),
      rgba(123, 160, 255, 0.8)
    );
    background-size: 400% 400%;
    border-radius: 50%;
    z-index: -1;
    filter: blur(20px);
    opacity: 0.5;
    animation: ${glowRotate} 10s ease infinite,
      ${neonFlicker} 8s linear infinite;
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
`;

const NeonAccent = styled(motion.div)`
  position: absolute;
  width: calc(min(300px, 80vw) + 60px);
  height: calc(min(300px, 80vw) + 60px);
  border-radius: 50%;
  z-index: -1;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: rgba(66, 220, 255, 0.9);
    box-shadow: 0 0 15px 5px rgba(66, 220, 255, 0.7);
    filter: blur(1px);
    animation: ${neonFlicker} 4s linear infinite;
  }

  &:before {
    top: 10%;
    right: 15%;
  }

  &:after {
    bottom: 10%;
    left: 15%;
  }

  @media (max-width: 768px) {
    width: 260px;
    height: 260px;
  }
`;

const ProfileImage = styled(motion.div)`
  position: relative;
  width: min(300px, 80vw);
  height: min(300px, 80vw);
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  z-index: 1;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: all 0.5s ease;
  }

  &:hover {
    transform: translateY(-5px);

    img {
      filter: grayscale(0%);
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #4caf50;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
`;

const Name = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0;
  font-family: "Arial", sans-serif;
  text-align: center;

  span {
    font-style: italic;
    opacity: 0.9;
  }
`;

const Subtitle = styled(motion.h2)`
  font-style: italic;
  font-weight: normal;
  color: #888;
  margin: 0.5rem 0;
`;

const Description = styled(motion.p)`
  color: #888;
  margin-bottom: 2rem;
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.1rem);
  max-width: 600px;
  padding: 0 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const SocialIcon = styled(motion.a)`
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(66, 220, 255, 0.15),
      rgba(120, 255, 215, 0.05)
    );
    transform: scale(0);
    transition: transform 0.5s ease;
    z-index: -1;
    border-radius: 50%;
  }

  img {
    width: 30px;
    height: 30px;
    filter: invert(1);
    transition: all 0.3s ease;
  }

  &:hover {
    color: #888;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(66, 220, 255, 0.3);

    img {
      transform: scale(1.1);
    }

    &::before {
      transform: scale(1.5);
    }
  }
`;

const AboutSection = styled(motion.section)`
  width: 100%;
  margin: 4rem auto;
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  background: #000000;

  @media (max-width: 768px) {
    margin: 2rem auto;
    min-height: auto;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6); /* Reduced opacity for better visibility */
    z-index: 1;
    backdrop-filter: none; /* Ensure no blur is applied */
  }
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1; /* Full opacity */
    transform: none; /* No transform */
    filter: none; /* No filters */
  }
`;

const AboutTitle = styled(motion.h2)`
  position: relative;
  z-index: 2;
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  text-align: left;
  width: 100%;
  padding-left: 2rem;
  color: white;

  span {
    font-style: italic;
    font-size: clamp(2rem, 4vw, 3rem);
    opacity: 0.7;
    color: #a0a0a0;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    gap: 0.5rem;
    padding-left: 1rem;
  }
`;

const AboutDescription = styled(motion.p)`
  position: relative;
  z-index: 2;
  color: #888;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.6;
  max-width: 600px;
  padding-left: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    padding-left: 1rem;
  }
`;

const AboutContent = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-top: 4rem;

  @media (max-width: 1024px) {
    gap: 2rem;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 1.5rem;
  }
`;

const AboutImage = styled(motion.div)`
  width: 100%;
  height: min(400px, 50vh);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    transition: filter 0.5s ease;
  }

  @media (max-width: 768px) {
    height: 300px;
    margin: 0 auto;
  }
`;

const AboutText = styled(motion.div)`
  color: #888;
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  line-height: 1.8;

  p {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 0 1rem;
  }
`;

const ProjectsSection = styled(motion.section)`
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

const projectsData = [
  {
    id: 1,
    title: "",
    category: "Wildlife",
    image: "/assets/wildlife/DSC_0035.JPG",
  },
  {
    id: 2,
    title: "",
    category: "Wildlife",
    image: "/assets/wildlife/DSC00128.JPG",
  },
  {
    id: 3,
    title: "",
    category: "Wildlife",
    image: "/assets/wildlife/Adobe Express - file.jpg",
  },
  {
    id: 4,
    title: "",
    category: "Wildlife",
    image: "/assets/wildlife/Adobe Express - file (3).jpg",
  },
  {
    id: 5,
    title: "",
    category: "Wildlife",
    image: "/assets/wildlife/Adobe Express - file (2).jpg",
  },
  {
    id: 6,
    title: "",
    category: "Wildlife",
    image: "/assets/wildlife/Adobe Express - file (1).jpg",
  },
  {
    id: 7,
    title: "",
    category: "Portraits",
    image: "/assets/portraits/DSCF6369.JPG",
  },
  {
    id: 8,
    title: "",
    category: "Portraits",
    image: "/assets/portraits/DSCF6390.JPG",
  },
  {
    id: 9,
    title: "",
    category: "Portraits",
    image: "/assets/portraits/DSCF6243.JPG",
  },
  {
    id: 10,
    title: "",
    category: "Portraits",
    image: "/assets/portraits/DSC_0522.JPG",
  },
  {
    id: 11,
    title: "",
    category: "Portraits",
    image: "/assets/portraits/DSC00699.JPG",
  },
  {
    id: 12,
    title: "",
    category: "Portraits",
    image: "/assets/portraits/DSC00654.JPG",
  },
  {
    id: 13,
    title: "",
    category: "Fashion",
    image: "/assets/fashion/DSC02195.JPG",
  },
  {
    id: 14,
    title: "",
    category: "Fashion",
    image: "/assets/fashion/DSC02181.JPG",
  },
  {
    id: 15,
    title: "",
    category: "Fashion",
    image: "/assets/fashion/DSC02169.JPG",
  },
  {
    id: 16,
    title: "",
    category: "Fashion",
    image: "/assets/fashion/DSC02112.JPG",
  },
  {
    id: 17,
    title: "",
    category: "Fashion",
    image: "/assets/fashion/DSC02108.JPG",
  },
  {
    id: 18,
    title: "",
    category: "Fashion",
    image: "/assets/fashion/DSC02099.JPG",
  },
];

window.scrollToContactSection = () => {
  console.log("Global scroll to contact called");
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

const Portfolio = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const footerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Wildlife");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    console.log("scrollToContact called in Portfolio.js");

    // Call the global function
    window.scrollToContactSection();

    // Also try the ref method as backup
    setTimeout(() => {
      if (footerRef.current) {
        footerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

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
    <Container>
      <Navigation
        key="navigation-component"
        scrollToAbout={scrollToAbout}
        scrollToProjects={scrollToProjects}
        scrollToContact={scrollToContact}
      />

      <ProfileContainer>
        <NeonRing
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: isProfileHovered ? 1.05 : 1,
            boxShadow: isProfileHovered
              ? "0 0 20px 8px rgba(66, 220, 255, 0.8), 0 0 40px 20px rgba(66, 220, 255, 0.4), inset 0 0 20px 8px rgba(66, 220, 255, 0.6)"
              : "0 0 15px 5px rgba(66, 220, 255, 0.7), 0 0 30px 15px rgba(66, 220, 255, 0.3), inset 0 0 15px 5px rgba(66, 220, 255, 0.5)",
          }}
          transition={{ duration: 0.4 }}
        />
        <NeonAccent
          initial={{ opacity: 0 }}
          animate={{
            opacity: isProfileHovered ? 0.9 : 0.7,
            scale: isProfileHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        <ProfileImage
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
          <img src="/assets/Profile.jpg" alt="Profile" />
        </ProfileImage>
      </ProfileContainer>

      <StatusIndicator>
        <StatusDot />
        <span>available for work</span>
      </StatusIndicator>

      <Name
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Sailesh <span style={{ fontStyle: "italic" }}>Atreya</span>
      </Name>

      <Description
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Photographer, Videographer & Editor Based From INDIA.
      </Description>

      <SocialLinks>
        <SocialIcon
          href="#"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src="/assets/socials/icons8-twitter.svg" alt="Twitter" />
        </SocialIcon>
        <SocialIcon
          href="https://www.instagram.com/sailu_297/"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src="/assets/socials/icons8-instagram.svg" alt="Instagram" />
        </SocialIcon>
        <SocialIcon
          href="https://www.facebook.com/profile.php?id=61559133179067"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src="/assets/socials/icons8-facebook.svg" alt="Facebook" />
        </SocialIcon>
      </SocialLinks>

      <AboutSection
        ref={aboutRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <VideoBackground>
          <img
            src="/assets/aashish.gif"
            alt="Background Animation"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </VideoBackground>

        <AboutTitle>
          More about <span>myself</span>
        </AboutTitle>

        <AboutDescription>
          Hi, I'm Sailesh Atreya, a passionate Photographer, Cinematographer
          with a mission to bring creative ideas to life through exceptional
          designs and content.
        </AboutDescription>
      </AboutSection>

      <AboutContent>
        <AboutImage
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src="/assets/about.jpg" alt="About" />
        </AboutImage>

        <AboutText
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>
            Hi! I'm Sailesh Atreya, a passionate and dedicated creative with a
            strong eye for detail and a love for visual storytelling. With 3
            years of experience in Photography , Cinematography And Graphic
            Design I've had the opportunity to work on a wide range of projects
            that reflect not just my skills, but my commitment to creating
            meaningful and impactful work.
          </p>
          <p>
            I specialize in using softwares like Adobe Photoshop, Premier pro ,
            Creative thinking and I'm constantly exploring new techniques and
            tools to push creative boundaries. Whether it's capturing the raw
            emotion of a moment, designing intuitive digital experiences, or
            crafting compelling visuals, I approach every project with
            enthusiasm, curiosity, and a strong sense of purpose.
          </p>
        </AboutText>
      </AboutContent>

      <ProjectsSection
        ref={projectsRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <CategoryBar>
          {["Wildlife", "Portraits", "Fashion"].map((category) => (
            <CategoryButton
              key={category}
              active={activeCategory === category}
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
                    e.target.onerror = null;
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/800px-Placeholder_view_vector.svg.png";
                  }}
                />
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </ProjectsSection>

      <AnimatePresence>
        {selectedProject && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>
            <ModalImage
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/800px-Placeholder_view_vector.svg.png";
                }}
              />
              <ImageInfo
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.category}</p>
              </ImageInfo>
            </ModalImage>
          </Modal>
        )}
      </AnimatePresence>

      <Footer ref={footerRef} />
    </Container>
  );
};

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

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
    padding: 1rem;
    gap: 1rem;
  }
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 1;
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-10px);

    img {
      filter: grayscale(0%);
      transform: scale(1.05);
    }
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  cursor: pointer;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(66, 220, 255, 0.15),
      rgba(120, 255, 215, 0.05)
    );
    transform: scale(0);
    transition: transform 0.5s ease;
    z-index: -1;
    border-radius: 50%;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(66, 220, 255, 0.3);
    border: 1px solid rgba(66, 220, 255, 0.3);

    &::before {
      transform: scale(1.5);
    }
  }
`;

const ModalImage = styled(motion.div)`
  width: 90%;
  height: 80vh;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: grayscale(0%);
  }
`;

const ImageInfo = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem;
  color: white;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.8;
  }
`;

export default Portfolio;
