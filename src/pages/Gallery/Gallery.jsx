import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../../styles/Gallery.css";
import { useTheme } from "../../context/ThemeProvider";
import { Zoom } from "react-awesome-reveal";


const initialImages = [
  { src: "https://i.imgur.com/fOGUeBE.jpg", alt: "Image 1" },
  { src: "https://i.imgur.com/CnBohWE.jpg", alt: "Image 2" },
  { src: "https://i.imgur.com/zlNTDmP.jpg", alt: "Image 3" },
  { src: "https://i.imgur.com/DBnOsPq.jpg", alt: "Image 4" },
  { src: "https://i.imgur.com/PHL82Hs.jpg", alt: "Image 5" },
  { src: "https://i.imgur.com/Tj0m0aq.jpg", alt: "Image 6" },
  { src: "https://i.imgur.com/NLo7Esf.jpg", alt: "Image 7" },
  { src: "https://i.imgur.com/CnCoo56.jpg", alt: "Image 8" },
  { src: "https://i.imgur.com/fjvm0PV.jpg", alt: "Image 9" },
  { src: "https://i.imgur.com/E2yZKc5.jpg", alt: "Image 10" },
  { src: "https://i.imgur.com/bPliXvx.jpg", alt: "Image 11" },
  { src: "https://i.imgur.com/0FRwrg3.jpg", alt: "Image 12" },
];


const additionalImages = [
  { src: "https://i.imgur.com/nGItydx.jpg", alt: "Image 13" },
  { src: "https://i.imgur.com/RJFITIj.jpg", alt: "Image 14" },
  { src: "https://i.imgur.com/X1J6JOP.jpg", alt: "Image 15" },
  { src: "https://i.imgur.com/TLXEXzJ.jpg", alt: "Image 16" },
  { src: "https://i.imgur.com/owgUpEP.jpg", alt: "Image 17" },
  { src: "https://i.imgur.com/GTqjfew.jpg", alt: "Image 18" },
  { src: "https://i.imgur.com/FJycbSZ.jpg", alt: "Image 19" },
  { src: "https://i.imgur.com/duI2EDE.jpg", alt: "Image 20" },
  { src: "https://i.imgur.com/Iq5dr1g.jpg", alt: "Image 21" },
  { src: "https://i.imgur.com/zpvoSvI.jpg", alt: "Image 22" },
  { src: "https://i.imgur.com/TRkP4tj.jpg", alt: "Image 23" },
];

const Gallery = () => {
  const { theme } = useTheme();
  const [images, setImages] = useState(initialImages);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const loadMoreImages = () => {
    setImages((prevImages) => [...prevImages, ...additionalImages]);
  };

  const handleImageClick = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        loadMoreImages();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`gallery-page ${theme}`}>
      <h1 className="gallery-title">Gallery</h1>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <Zoom key={index}>
            <div
              className="gallery-item"
              onClick={() => handleImageClick(index)}
            >
              <img src={image.src} alt={image.alt} className="gallery-image" />
            </div>
          </Zoom>
        ))}
      </div>
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={images}
          index={currentImage}
        />
      )}
    </div>
  );
};

export default Gallery;