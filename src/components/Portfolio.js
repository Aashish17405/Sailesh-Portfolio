import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

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
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(40, 40, 40, 0.2) 0%, rgba(0, 0, 0, 0.95) 100%);
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem auto 4rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem;
  width: min(90%, 500px);
  border-radius: 50px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    width: 95%;
    gap: 0.5rem;
    padding: 0.3rem;
  }
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem 2rem;
  color: white;
  font-size: clamp(0.875rem, 2vw, 1rem);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  opacity: 0.8;
  flex: 1;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }

  &:hover {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 60%;
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
  background-color: #4CAF50;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
`;

const Name = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0;
  font-family: 'Arial', sans-serif;
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
  
  &:hover {
    color: #888;
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
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    z-index: 1;
  }
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-left: 200px;
  z-index: 0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transform: scale(1.1);
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
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: none;
  padding: 0.5rem 2rem;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: all 0.3s;
  opacity: ${props => props.active ? 1 : 0.7};

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }

  &:hover {
    opacity: 1;
    background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 2rem;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.02);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  width: 100%;

  @media (max-width: 768px) {
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

const projectsData = [
  {
    id: 1,
    title: 'Bengal Tiger',
    category: 'Wildlife',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Walking_tiger_female.jpg/1280px-Walking_tiger_female.jpg'
  },
  {
    id: 2,
    title: 'Arctic Fox',
    category: 'Wildlife',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Iceland-1979445_%28cropped_3%29.jpg/1280px-Iceland-1979445_%28cropped_3%29.jpg'
  },
  {
    id: 3,
    title: 'African Elephant',
    category: 'Wildlife',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg/1280px-African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg'
  },
  {
    id: 4,
    title: 'Renaissance Portrait',
    category: 'Portraits',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg'
  },
  {
    id: 5,
    title: 'Pearl Earring',
    category: 'Portraits',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg'
  },
  {
    id: 6,
    title: 'Self Portrait',
    category: 'Portraits',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/VanGogh_1887_Selbstbildnis.jpg/800px-VanGogh_1887_Selbstbildnis.jpg'
  },
  {
    id: 7,
    title: 'Victorian Fashion',
    category: 'Fashion',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/La_Toilette_by_Jules-Emile_Saintin%2C_1866.jpg/800px-La_Toilette_by_Jules-Emile_Saintin%2C_1866.jpg'
  },
  {
    id: 8,
    title: 'Belle Époque Fashion',
    category: 'Fashion',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Morin-Paris_Fashion-1906.jpg/800px-Morin-Paris_Fashion-1906.jpg'
  },
  {
    id: 9,
    title: 'Art Deco Fashion',
    category: 'Fashion',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/George_Barbier_-_Vogue_Magazine_Cover_-1926.jpg/800px-George_Barbier_-_Vogue_Magazine_Cover_-1926.jpg'
  }
];

const Portfolio = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('Wildlife');
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProjects = projectsData.filter(
    project => activeCategory === 'All' || project.category === activeCategory
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
        <NavButton>Section</NavButton>
        <NavButton>Contact</NavButton>
      </Navigation>

      <ProfileImage
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Cruise_by_Gage_Skidmore_2.jpg/800px-Tom_Cruise_by_Gage_Skidmore_2.jpg" 
          alt="Profile"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/800px-Default_pfp.svg.png';
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
        Sailesh <span style={{ fontStyle: 'italic' }}>Atreya</span>
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
          𝕏
        </SocialIcon>
        <SocialIcon
          href="#"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          📷
        </SocialIcon>
        <SocialIcon
          href="#"
          target="_blank"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          👤
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
              e.target.style.display = 'none';
            }}
          />
        </VideoBackground>
        
        <AboutTitle>
          More about <span>myself</span>
        </AboutTitle>

        <AboutDescription>
          Hi, I'm Sailesh Atreya, a passionate Photographer,
          Cinematographer with a mission to bring creative ideas to
          life through exceptional designs and content.
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
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/1280px-Hopetoun_falls.jpg" 
            alt="About" 
          />
        </AboutImage>
        
        <AboutText
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>
            Hi, I'm Sailesh Atreya, a passionate Photographer, Cinematographer with a mission to bring creative ideas to life through exceptional designs and content.
          </p>
          <p>
            Hi, I'm Sailesh Atreya, a visual storyteller specializing in photography, videography, and editing. With a passion for capturing moments that evoke emotion and tell compelling stories, I create visuals that leave a lasting impact.
          </p>
          <p>
            From dynamic cinematography to meticulously edited visuals, I bring a blend of creativity and technical expertise to every project. Whether it's capturing raw authenticity through photography, crafting immersive video narratives, or enhancing visuals with seamless editing, I strive to make every frame count.
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
          {['Wildlife', 'Portraits', 'Fashion'].map((category) => (
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
                    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/800px-Placeholder_view_vector.svg.png';
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

export default Portfolio; 