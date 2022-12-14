import React from "react";
import image1 from "../assets/Slide/img1.jpg";
import image2 from "../assets/Slide/img2.jpg";
import image3 from "../assets/Slide/img3.jpg";
import image4 from "../assets/Slide/img4.jpg";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  image1,
   image2, 
   image3, 
   image4
  ];


const ExploreSlide = () => {
  return (
   
    <div>
    <SimpleImageSlider
      width={1920}
      height={512}
      images={images}
      showBullets={true}
      showNavs={true}
      autoPlay={true}
      autoPlayDelay= {3}
      slideDuration={1.2}
    />
  </div>
  );
};

export default ExploreSlide;