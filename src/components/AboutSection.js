import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const AboutSectionWrapper = styled(motion.section)`
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
  font-size: clamp(1rem, 1vw, 1.1rem);
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

const AboutSection = ({ forwardedRef }) => {
  return (
    <>
      <AboutSectionWrapper
        ref={forwardedRef}
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
      </AboutSectionWrapper>

      <AboutContent>
        <AboutImage
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://res.cloudinary.com/djlgmbop9/image/upload/q_100/about_zxsrhf"
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
            Hello! I'm Sailesh Atreya, a driven and passionate creative with a
            keen eye for detail and a passion for visual storytelling. With 3
            years of experience in Photography, Cinematography And Graphic
            Design I've been able to work on a diverse variety of projects that
            not only showcase my abilities, but my dedication to creating
            meaningful and impactful work. What gets me going is the power of
            storytelling that resonates. I thrive in a space where I can work
            with others, learn, and build something greater always striving to
            produce work that not only looks good but also feels thoughtful.
            Software Skills in
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <img
              style={{ borderRadius: "12px" }}
              src="/assets/about/ps-image.jpeg"
              alt="ps-image"
              width={50}
            />
            <img
              style={{ borderRadius: "12px" }}
              src="/assets/about/pr.png"
              alt="ps-image"
              width={50}
            />
            <img
              style={{ borderRadius: "12px" }}
              src="/assets/about/lr.png"
              alt="ps-image"
              width={50}
            />
          </div>
        </AboutText>
      </AboutContent>
    </>
  );
};

export default AboutSection;
