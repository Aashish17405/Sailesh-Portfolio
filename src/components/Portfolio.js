import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
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
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0 0 15px rgba(76, 175, 80, 0.8);
    }
    70% {
      transform: scale(0.9);
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
    }
  }
`;

const Name = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0;
  text-align: center;

  span.firstName {
    font-family: "Impact", sans-serif;
    font-weight: 80;
  }

  span.lastName {
    font-family: "Instrument Serif", serif;
    font-style: italic;
    font-weight: 80;
    opacity: 0.9;
  }
`;

const Subtitle = styled(motion.h2)`
  font-style: italic;
  font-weight: normal;
  color: white;
  margin: 0.5rem 0;
`;

const Description = styled(motion.p)`
  color: white;
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
    color: white;

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
  font-family: "Impact", sans-serif;
  font-weight: 80;
  position: relative;
  z-index: 2;
  font-size: clamp(1.7rem, 5vw, 4rem);
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
    font-family: "Instrument Serif", serif;
    font-weight: 80;
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
  color: white;
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
    filter: brightness(1.5) contrast(0.9) saturate(1.1);
    transition: filter 0.5s ease;
  }

  @media (max-width: 768px) {
    height: 300px;
    margin: 0 auto;
  }
`;

const AboutText = styled(motion.div)`
  color: white;
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
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/Adobe_Express_-_file_1_gvpcho",
    fallbackImage: "/assets/wildlife/Adobe Express - file (1).jpg",
  },
  {
    id: 3,
    title: "",
    category: "Wildlife",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/Adobe_Express_-_file_nn7npf",
    fallbackImage: "/assets/wildlife/Adobe Express - file.jpg",
  },
  {
    id: 4,
    title: "",
    category: "Wildlife",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/Adobe_Express_-_file_3_gltg6i",
    fallbackImage: "/assets/wildlife/Adobe Express - file (3).jpg",
  },
  {
    id: 5,
    title: "",
    category: "Wildlife",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/Adobe_Express_-_file_2_bdo4tn",
    fallbackImage: "/assets/wildlife/Adobe Express - file (2).jpg",
  },
  {
    id: 6,
    title: "",
    category: "Wildlife",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC00128_uwutxu",
    fallbackImage: "/assets/wildlife/DSC00128.JPG",
  },
  {
    id: 7,
    title: "",
    category: "Portraits",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSCF6243_ej7niq",
  },
  {
    id: 8,
    title: "",
    category: "Portraits",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC_0522_emzazl",
  },
  {
    id: 9,
    title: "",
    category: "Portraits",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSCF6390_e9uyzj",
  },
  {
    id: 10,
    title: "",
    category: "Portraits",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC00699_nii6am",
  },
  {
    id: 11,
    title: "",
    category: "Portraits",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSCF6369_cu8yfl",
  },
  {
    id: 12,
    title: "",
    category: "Portraits",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC00654_kco0g2",
  },
  {
    id: 13,
    title: "",
    category: "Fashion",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC02181_lxvxxy",
  },
  {
    id: 14,
    title: "",
    category: "Fashion",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC02169_dd8wfq",
  },
  {
    id: 15,
    title: "",
    category: "Fashion",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC02112_hxge86",
  },
  {
    id: 16,
    title: "",
    category: "Fashion",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC02108_zsx1lf",
  },
  {
    id: 17,
    title: "",
    category: "Fashion",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC02195_gcakht",
  },
  {
    id: 18,
    title: "",
    category: "Fashion",
    image:
      "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC02099_j06xyf",
  },
  {
    id: 19,
    title: "",
    category: "Concerts",
    image: "https://res.cloudinary.com/djlgmbop9/image/upload/DSC00554_wsrxfn",
    fallbackImage: "/assets/concerts/DSC00554.JPG",
  },
  {
    id: 20,
    title: "",
    category: "Concerts",
    image: "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC00553_v6awhx",
    fallbackImage: "/assets/concerts/DSC00553.JPG",
  },
  {
    id: 21,
    title: "",
    category: "Concerts",
    image: "https://res.cloudinary.com/djlgmbop9/image/upload/DSC00504_sr3ume",
    fallbackImage: "/assets/concerts/DSC00504.JPG",
  },
  {
    id: 22,
    title: "",
    category: "Concerts",
    image: "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC00494_vy1gmw",
    fallbackImage: "/assets/concerts/DSC00494.JPG",
  },
  {
    id: 23,
    title: "",
    category: "Concerts",
    image: "https://res.cloudinary.com/djlgmbop9/image/upload/q_100/DSC00489_xdqex0",
    fallbackImage: "/assets/concerts/DSC00489.JPG",
  },
  {
    id: 24,
    title: "",
    category: "Concerts",
    image: "/assets/concerts/DSC00487.JPG",
    fallbackImage: "/assets/concerts/DSC00487.JPG",
  },
];

const Portfolio = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Wildlife");
  const [selectedProject, setSelectedProject] = useState(null);
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
    <Container isScrolled={isScrolled}>
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
          src="https://asset.cloudinary.com/djlgmbop9/93242682fbfb969e619bc65f9f48a3cf"
          alt="Profile"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/Profile.JPG";
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
        <span className="firstName">Sailesh</span>{" "}
        <span className="lastName">Atreya</span>
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
          href="https://www.instagram.com/sailu_297/"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src="/assets/socials/icons8-instagram.svg"
            alt="Instagram"
            onError={(e) => {
              e.target.style.display = "none";
              console.log("Instagram icon failed to load");
            }}
          />
        </SocialIcon>
        <SocialIcon
          href="https://www.facebook.com/profile.php?id=61559133179067"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src="/assets/socials/icons8-facebook.svg"
            alt="Facebook"
            onError={(e) => {
              e.target.style.display = "none";
              console.log("Facebook icon failed to load");
            }}
          />
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
              console.log("Background GIF failed to load");
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
          <img
            src="https://asset.cloudinary.com/djlgmbop9/efb9f6b4ba42488497a4c1d2819cf69e"
            alt="About"
            onError={(e) => {
              e.target.src = "/assets/about.jpg";
              console.log("About image failed to load");
            }}
          />
        </AboutImage>

        <AboutText
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
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
          {["Wildlife", "Portraits", "Fashion", "Concert"].map((category) => (
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
                    console.log(
                      `Image failed to load for project ${project.id}`
                    );
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
