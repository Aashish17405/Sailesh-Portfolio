import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem 0;
  margin-top: 0rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
`;

const EmailContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  margin: 1rem auto;
  margin-top: 0rem;
  color: white;
  font-size: 1.1rem;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50px;
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.05);
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
    background: linear-gradient(
      90deg,
      rgba(66, 220, 255, 0.1),
      rgba(120, 255, 215, 0.1)
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: -1;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(66, 220, 255, 0.3);
    border: 1px solid rgba(66, 220, 255, 0.3);
    letter-spacing: 0.5px;

    &::before {
      transform: translateX(0);
    }
  }
`;

const EmailLink = styled.a`
  color: white;
  text-decoration: none;
  transition: opacity 0.3s ease;
  font-weight: 400;
  letter-spacing: 0.5px;

  &:hover {
    opacity: 0.9;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin-top: 1.5rem;
`;

const EmailIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = forwardRef((props, ref) => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer ref={ref}>
      <EmailContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <EmailIcon
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 6L12 13L2 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </EmailIcon>
        <EmailLink href="mailto:saileshatreya@gmail.com">
          saileshatreya@gmail.com
        </EmailLink>
      </EmailContainer>
      <Copyright>
        © {currentYear} Sailesh Atreya. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
});

export default Footer;
