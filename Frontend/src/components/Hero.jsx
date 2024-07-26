import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Welcome to GrievanceGallery, the official platform for lodging
           complaints related to government services. Our website is a 
           critical tool in our commitment to transparency, accountability,
            and responsive governance. Launched in 2024, this initiative is 
            designed to ensure that every citizen has direct access to voice concerns 
            and request resolutions from their government.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
