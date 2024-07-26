import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h3>Biography</h3>
          <h4>Why Use GrievanceGallery</h4>
          <p>
            <b>Accessibility:</b>Our platform is designed to be user-friendly,
            making it easy for everyone to submit complaints directly from their devices.
          </p>
          <p>
            <b>Efficiency:</b> We are committed to handling your concerns quickly
            and effectively, ensuring that government services meet the expectations of the public.</p>
          <p>
            <b>Impact:</b> Your feedback is invaluable.
            It helps us identify areas that need improvement and
            implement changes that enhance our services.</p>
          <h4>How to Use GrievanceGallery</h4>
          <p>
            <b>1.File Your Complaint:</b>
            Easily submit your complaints using our
            structured form. We ask for specific details to fully understand the issue and expedite the process.          </p>
          <p>
            <b>2.Review and Action:</b>  Each submission is carefully reviewed by the
            appropriate department. We prioritize a swift response and take
            necessary actions based on the nature of the complaint.</p>
          <p>
            <b>3.Follow-Up and Resolution: </b>You can track the status of
            your complaint through our system. We provide regular updates as your issue progresses
            towards resolution.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
