import React, { useState } from "react";
import "./videoslider.css";

function Videoslider(){
  const videos = [
    {
      id: 1,
      title: "Egg Masala | Cooking | Recipe | Clay/Mud Pot | ...",
      url: "https://www.youtube.com/embed/WmKUIxicXBM?si=HQRjWXLTp5CfIDmE",
    },
    {
      id: 2,
      title: "Making Tea |How to make Tea | Clay Pot| ...",
      url: "https://www.youtube.com/embed/TODe8y6E5Uk?si=p9lP6N0sGEqqW7yh",
    },
    {
      id: 3,
      title: "Coffee Making | How To Make Coffee? | Coffee | ...",
      url: "https://www.youtube.com/embed/2hqSf30sN6A?si=5cWCwusVHy14y2I1",
    },
    {
      id: 4,
      title: " Fish Curry | Cooking |Fish Curry Recipe | Clay/Mud Pot | ...",
      url: "https://www.youtube.com/embed/2NGFvmZvDdI?si=0T4vSJOPtuBLW2oC",
    },
   
  ];

  const [currentIndex, setCurrentIndex] = useState(0);


  return (
    <div className="youtube-slider">
      <h2 className="slider-title"><b>LATEST VIDEOS</b></h2>
      <p className="slider-subtitle">Have a look at the videos</p>
      <div className="slider-container">
       
        <div className="slider-content">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`video-card ${
                index === currentIndex ? "active" : "inactive"
              }`}
            >
              <iframe
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="video-title">{video.title}</p>
            </div>
          ))}
        </div>
    
      </div>
    </div>
  );
};

export default Videoslider;
