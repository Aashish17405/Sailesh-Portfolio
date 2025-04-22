import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";

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
  cursor: pointer;

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

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const PopupContent = styled(motion.div)`
  background-color: white;
  width: 90%;
  max-width: 800px;
  height: 90vh;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  font-size: 18px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const PdfContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PdfFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  flex: 1;
`;

const PdfFallback = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;

  h3 {
    margin-bottom: 20px;
    color: #333;
  }

  p {
    margin-bottom: 20px;
    color: #666;
    max-width: 500px;
  }
`;

const ViewerControls = styled.div`
  padding: 10px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  gap: 10px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1002;
`;

const NavButtonStyle = styled.button`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(66, 220, 255, 0.3);
  padding: 0.5rem 2rem;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 1;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

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
      rgba(66, 220, 255, 0.2),
      rgba(120, 255, 215, 0.2)
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: -1;
    border-radius: 25px;
  }

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(66, 220, 255, 0.4);
    border: 1px solid rgba(66, 220, 255, 0.6);
    letter-spacing: 0.5px;

    &::before {
      transform: translateX(0);
    }
  }
`;

const ControlButton = styled(NavButtonStyle)``;

const DownloadButton = styled.a`
  display: inline-block;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(66, 220, 255, 0.3);
  padding: 0.5rem 2rem;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 1;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

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
      rgba(66, 220, 255, 0.2),
      rgba(120, 255, 215, 0.2)
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: -1;
    border-radius: 25px;
  }

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(66, 220, 255, 0.4);
    border: 1px solid rgba(66, 220, 255, 0.6);
    letter-spacing: 0.5px;

    &::before {
      transform: translateX(0);
    }
  }
`;

const SocialLinks = () => {
  const [showCvPopup, setShowCvPopup] = useState(false);
  const [pdfLoadError, setPdfLoadError] = useState(false);
  const pdfUrl = "/assets/CV (1).pdf";

  useEffect(() => {
    console.log("Attempting to load CV icon");

    // Reset PDF load error when popup is closed
    if (!showCvPopup) {
      setPdfLoadError(false);
    }
  }, [showCvPopup]);

  const handleCvClick = (e) => {
    e.preventDefault();
    setShowCvPopup(true);
  };

  const openPdfInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <>
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
        <SocialIcon
          href="mailto:saileshatreya@gmail.com"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 6L12 13L2 6"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SocialIcon>
        <SocialIcon
          as="div"
          onClick={handleCvClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="View CV"
        >
          <svg
            width="30"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2V8H20"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 13H8"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 17H8"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9H9H8"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SocialIcon>
      </SocialLinksContainer>

      <AnimatePresence>
        {showCvPopup && (
          <PopupOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCvPopup(false)}
          >
            <PopupContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setShowCvPopup(false)}>×</CloseButton>

              <PdfContainer>
                {pdfLoadError ? (
                  <PdfFallback>
                    <h3>Unable to display PDF</h3>
                    <p>
                      The PDF viewer couldn't load the CV. You can download the
                      file or open it in a new tab instead.
                    </p>
                    <DownloadButton href={pdfUrl} download>
                      Download CV
                    </DownloadButton>
                  </PdfFallback>
                ) : (
                  <PdfFrame
                    src={`${pdfUrl}#toolbar=0&navpanes=0`}
                    title="CV"
                    type="application/pdf"
                    onError={() => setPdfLoadError(true)}
                  />
                )}
              </PdfContainer>

              <ViewerControls>
                <ControlButton onClick={openPdfInNewTab}>
                  Open in New Tab
                </ControlButton>
                <DownloadButton href={pdfUrl} download>
                  Download
                </DownloadButton>
              </ViewerControls>
            </PopupContent>
          </PopupOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialLinks;
