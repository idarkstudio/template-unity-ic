import "./Loader2.scss";

import React from "react";
import logo_icp from "../../assets/img/icp_white.png"
// import anplotion from "../../assets/img/Anplotion.png";
// import capitalcity from "../../assets/img/Capitalcity.png";
// import debastation from "../../assets/img/debastation.png";
// import inner from "../../assets/img/inner.png";
// import monastery from "../../assets/img/monastery.png";
// import rak_keep from "../../assets/img/rak_keep.png";
// import redCity from "../../assets/img/RedCity.png";
// import redcityborder from "../../assets/img/redcityborder.png";
// import ruinroads from "../../assets/img/ruinroads.png";
// import space from "../../assets/img/space.png";
// import imageWithHair from "../../assets/img/Fondo_ConPelo.png";
   import backgroundPlaceholder from "../../assets/img/placeholder.png"
// https://uiverse.io/abrahamcalsin/serious-turkey-52

// const imagePaths = [
//   rak_keep,
//   anplotion,
//   capitalcity,
//   debastation,
//   inner,
//   monastery,
//   redCity,
//   redcityborder,
//   ruinroads,
//   space,
// ];
// const randomIndex = Math.floor(Math.random() * imagePaths.length);
// const selectedImage = imagePaths[randomIndex];
const selectedImage = backgroundPlaceholder  ;

console.log(selectedImage);

const Loader2 = ({ loadingProgression }) => {
  const percentage = () => Math.round(loadingProgression * 100);

  return (
    <div
      style={{
        backgroundImage: `url(${selectedImage})`,
        backgroundSize: "cover",
        
        width: "100%",
        height: "100%",
        zIndex: 10000,
      }}className="body"
    >
      <article className="loader_container">
        <div className="loader-wrapper">
          <div className="loader">
            <div className="roller r1"></div>
            <div className="roller r2"></div>
          </div>

          <div id="loader2" className="loader">
            <div className="roller r3"></div>
            <div className="roller r4"></div>
          </div>

          <div id="loader3" className="loader">
            <div className="roller r5"></div>
            <div className="roller r6"></div>
          </div>
        </div>
        <span className="percent">{percentage()}%</span>
      </article>
      <div className="footer">
        <p>POWERED BY</p>
        <img src={logo_icp} alt="" />
      </div>  
    </div>
  );
};

export default Loader2;
