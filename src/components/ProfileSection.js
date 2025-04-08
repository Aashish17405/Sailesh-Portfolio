import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

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

const Description = styled(motion.p)`
  color: white;
  margin-bottom: 2rem;
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.1rem);
  max-width: 600px;
  padding: 0 1rem;
`;

const ProfileSection = () => {
  return (
    <>
      <ProfileImage
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://res.cloudinary.com/djlgmbop9/image/upload/q_100/Profile_swbwsc"
          alt="Profile"
          onError={(e) => {
            e.target.src = "/assets/profile.jpg";
            e.target.onerror = null;
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

      <SocialLinks />
    </>
  );
};

export default ProfileSection;

