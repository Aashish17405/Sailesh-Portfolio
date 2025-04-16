import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const SocialLinksContainer = styled.div`
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

const SocialLinks = () => {
  return (
    <SocialLinksContainer>
      <SocialIcon
        href="https://www.instagram.com/sailuframes_/"
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
    </SocialLinksContainer>
  );
};

export default SocialLinks;
