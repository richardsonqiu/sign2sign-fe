import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import sampleImg from "../imgs/lesson2.png";

const VocabCard = ({
  index,
  word,
  // getLandmarks,
  img,
  checkIndex,
  prevVocab,
  nextVocab,
}) => {
  return (
    <>
      <div className="vocab-card">
        <h3 className="card-title">
          {word}
          {index}
        </h3>
        <div className="model-prevnext">
          <button className="prev-btn" onClick={prevVocab}>
            <FaChevronLeft />
          </button>
          <img src={sampleImg} />
          <button className="next-btn" onClick={nextVocab}>
            <FaChevronRight />
          </button>
        </div>
        <div className="card-footer">
          {/* <p>(Landmarks: {getLandmarks})</p> */}
          <p>(Player Component)</p>
        </div>
      </div>
    </>
  );
};

export default VocabCard;
