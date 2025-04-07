import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";

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

const Navigation = styled.nav`
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

const ProfileImage = styled(motion.div)`
  width: min(300px, 80vw);
  height: min(300px, 80vw);
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: all 0.5s ease;
  }

  &:hover img {
    filter: grayscale(0%);
    transform: scale(1.05);
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

  img {
    width: 30px;
    height: 30px;
    filter: invert(1);
    transition: all 0.3s ease;
  }

  &:hover {
    color: #888;

    img {
      transform: scale(1.1);
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
    props.active ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  border: none;
  padding: 0.5rem 2rem;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: all 0.3s;
  opacity: ${(props) => (props.active ? 1 : 0.7)};

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }

  &:hover {
    opacity: 1;
    background: ${(props) =>
      props.active ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"};
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

const Portfolio = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Wildlife");
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
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
      <Navigation>
        <NavButton onClick={scrollToAbout}>About</NavButton>
        <NavButton onClick={scrollToProjects}>Projects</NavButton>
        <NavButton>Contact</NavButton>
      </Navigation>

      <ProfileImage
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://instagram.fhyd1-7.fna.fbcdn.net/v/t51.2885-19/476505443_604084275721309_6952748333016000706_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=instagram.fhyd1-7.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QGn7-yz_MPp42kk89AGVLR4CcyuMDS9bbQmWjJlCw2J8_2Bxwg8Ypuyoz4iv_It-jE&_nc_ohc=A_KfkHMrQqoQ7kNvwETPrpz&_nc_gid=ndFIvTRdeVKxlEBIrMFyIQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfGpGsp7otuuAqEMZjOrw08cuWVBE5NFz4G41PlC-IyQ9w&oe=67F9EA9D&_nc_sid=8b3546"
          alt="Profile"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/Profile.jpg";
          }}
        />
      </ProfileImage>

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
            Hi, I'm Sailesh Atreya, a passionate Photographer, Cinematographer
            with a mission to bring creative ideas to life through exceptional
            designs and content.
          </p>
          <p>
            Hi, I'm Sailesh Atreya, a visual storyteller specializing in
            photography, videography, and editing. With a passion for capturing
            moments that evoke emotion and tell compelling stories, I create
            visuals that leave a lasting impact.
          </p>
          <p>
            From dynamic cinematography to meticulously edited visuals, I bring
            a blend of creativity and technical expertise to every project.
            Whether it's capturing raw authenticity through photography,
            crafting immersive video narratives, or enhancing visuals with
            seamless editing, I strive to make every frame count.
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
    </Container>
  );
};

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
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
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
